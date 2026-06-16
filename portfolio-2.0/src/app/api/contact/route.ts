import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getClientIp, rateLimit } from '@/lib/rate-limit';

// --- Tunables ---------------------------------------------------------------
// Max contact submissions allowed per IP within the long window.
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
// Burst guard: a much tighter short window so a script can't fire several in a
// row before the 10-minute counter even matters.
const BURST_LIMIT = 2;
const BURST_WINDOW_MS = 45 * 1000; // 45 seconds
// Reject bodies larger than this many bytes outright (before parsing).
const MAX_BODY_BYTES = 16 * 1024; // 16 KB
// Timing trap: a real person can't read the page, fill four fields and submit
// in under a couple of seconds. The client reports how long the form was open;
// anything faster is treated as a bot. Client-controlled, so it's a filter that
// raises the bar, not a guarantee — it sits alongside the honeypot + limits.
const MIN_FILL_MS = 2500;
// A genuine message rarely carries a pile of links; spam usually does.
const MAX_LINKS = 4;
const LINK_RE = /(https?:\/\/|www\.)/gi;
// Crude markup/bbcode spam markers that never appear in a real plaintext note.
const SPAM_MARKERS = [/\[url[=\]]/i, /\[\/url\]/i, /<a\s+href/i, /\[link[=\]]/i];

// Per-field length bounds (trimmed). Keep generous for humans, tight for bots.
const LIMITS = {
  name: { min: 1, max: 100 },
  email: { min: 3, max: 254 }, // 254 = RFC 5321 max address length
  subject: { min: 1, max: 150 },
  message: { min: 1, max: 5000 },
} as const;

// Pragmatic email shape check (not full RFC, deliberately): no spaces, a single
// @, and a dotted domain. The `email` `type` on the input is advisory only;
// this is the authoritative check.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- Helpers ----------------------------------------------------------------

/** Escape HTML so user input can't inject markup/links into the email body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Collapse CR/LF (header-injection guard) and trim single-line fields. */
function cleanLine(value: string): string {
  return value.replace(/[\r\n\t]+/g, ' ').trim();
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string';
}

// --- Route ------------------------------------------------------------------

export async function POST(request: NextRequest) {
  // 1) Rate limit per client IP — first line of defense against scripts.
  const ip = getClientIp(request.headers);
  const limit = rateLimit(`contact:${ip}`, {
    limit: RATE_LIMIT,
    windowMs: RATE_WINDOW_MS,
  });
  const rateHeaders: Record<string, string> = {
    'X-RateLimit-Limit': String(limit.limit),
    'X-RateLimit-Remaining': String(limit.remaining),
    'X-RateLimit-Reset': String(Math.ceil(limit.resetAt / 1000)),
  };

  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many messages. Please wait a few minutes and try again.' },
      {
        status: 429,
        headers: { ...rateHeaders, 'Retry-After': String(limit.retryAfterSeconds) },
      }
    );
  }

  // Burst guard: blocks rapid-fire submissions inside a short window even when
  // the 10-minute budget still has room.
  const burst = rateLimit(`contact-burst:${ip}`, {
    limit: BURST_LIMIT,
    windowMs: BURST_WINDOW_MS,
  });
  if (!burst.allowed) {
    return NextResponse.json(
      { error: 'You just sent a message. Please wait a moment before sending another.' },
      {
        status: 429,
        headers: { ...rateHeaders, 'Retry-After': String(burst.retryAfterSeconds) },
      }
    );
  }

  try {
    // 2) Only accept JSON.
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Unsupported content type.' },
        { status: 415, headers: rateHeaders }
      );
    }

    // 3) Reject oversized payloads before doing any work.
    const declaredLength = Number(request.headers.get('content-length') || '0');
    if (declaredLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: 'Message is too large.' },
        { status: 413, headers: rateHeaders }
      );
    }
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: 'Message is too large.' },
        { status: 413, headers: rateHeaders }
      );
    }

    // 4) Parse JSON safely (malformed body -> 400, not 500).
    let body: unknown;
    try {
      body = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body.' },
        { status: 400, headers: rateHeaders }
      );
    }
    if (typeof body !== 'object' || body === null) {
      return NextResponse.json(
        { error: 'Invalid request body.' },
        { status: 400, headers: rateHeaders }
      );
    }

    const { name, email, subject, message, website, elapsedMs } = body as Record<string, unknown>;

    // 5) Honeypot: real users never see/fill `website`. If it's filled, this is
    //    almost certainly a bot — pretend success so it doesn't probe further.
    if (isNonEmptyString(website) && website.trim() !== '') {
      return NextResponse.json(
        { success: true, message: 'Email sent successfully' },
        { status: 200, headers: rateHeaders }
      );
    }

    // 5b) Timing trap: the client reports how long the form was open. A submit
    //     faster than a human possibly could is treated as a bot — silently
    //     "succeed" so it doesn't learn why it was dropped.
    if (typeof elapsedMs === 'number' && Number.isFinite(elapsedMs) && elapsedMs < MIN_FILL_MS) {
      return NextResponse.json(
        { success: true, message: 'Email sent successfully' },
        { status: 200, headers: rateHeaders }
      );
    }

    // 6) Type + presence check on every field.
    if (
      !isNonEmptyString(name) ||
      !isNonEmptyString(email) ||
      !isNonEmptyString(subject) ||
      !isNonEmptyString(message)
    ) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400, headers: rateHeaders }
      );
    }

    // 7) Normalize: single-line fields get CR/LF stripped; message keeps its
    //    line breaks but is trimmed.
    const cleanName = cleanLine(name);
    const cleanEmail = cleanLine(email).toLowerCase();
    const cleanSubject = cleanLine(subject);
    const cleanMessage = message.trim();

    // 8) Length validation.
    const fields = {
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
    };
    for (const [key, value] of Object.entries(fields)) {
      const bound = LIMITS[key as keyof typeof LIMITS];
      if (value.length < bound.min) {
        return NextResponse.json(
          { error: 'All fields are required.' },
          { status: 400, headers: rateHeaders }
        );
      }
      if (value.length > bound.max) {
        return NextResponse.json(
          { error: `${key} is too long.` },
          { status: 400, headers: rateHeaders }
        );
      }
    }

    // 9) Email must be valid — it's mandatory and replies are sent to it.
    if (!EMAIL_RE.test(cleanEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400, headers: rateHeaders }
      );
    }

    // 9b) Content spam heuristics: link floods and markup/bbcode are the giveaway
    //     of automated spam. Silently "succeed" so the bot doesn't adapt.
    const linkCount = (`${cleanMessage} ${cleanSubject}`.match(LINK_RE) || []).length;
    const hasSpamMarkup = SPAM_MARKERS.some((re) => re.test(cleanMessage) || re.test(cleanSubject));
    if (linkCount > MAX_LINKS || hasSpamMarkup) {
      return NextResponse.json(
        { success: true, message: 'Email sent successfully' },
        { status: 200, headers: rateHeaders }
      );
    }

    // 10) Ensure mail credentials are configured before attempting to send.
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    if (!emailUser || !emailPass) {
      console.error('Contact API: EMAIL_USER / EMAIL_PASS not configured');
      return NextResponse.json(
        { error: 'Email service is not configured.' },
        { status: 500, headers: rateHeaders }
      );
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass, // Use App Password, not regular password
      },
    });

    const safeName = escapeHtml(cleanName);
    const safeEmail = escapeHtml(cleanEmail);
    const safeSubject = escapeHtml(cleanSubject);
    const safeMessage = escapeHtml(cleanMessage);

    // The envelope is sent from the authenticated Gmail account (Gmail won't let
    // us spoof another From, and doing so would tank deliverability). We instead
    // set replyTo to the visitor so hitting "Reply" goes straight back to them,
    // and surface their name/email in the From display name.
    const mailOptions = {
      // Envelope is the authenticated Gmail account; nodemailer encodes the
      // display name safely (object form), so a stray quote in the name can't
      // break or inject headers.
      from: { name: `${cleanName} (Portfolio)`, address: emailUser },
      to: 'aamirtinwala7@gmail.com',
      replyTo: { name: cleanName, address: cleanEmail },
      subject: `Portfolio Contact: ${cleanSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e86b13; border-bottom: 2px solid #e86b13; padding-bottom: 10px;">
            New Portfolio Message
          </h2>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>From:</strong> ${safeName}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${safeEmail}</p>
            <p style="margin: 0;"><strong>Subject:</strong> ${safeSubject}</p>
          </div>

          <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
          </div>

          <p style="color: #888; font-size: 12px; margin-top: 20px; text-align: center;">
            This message was sent from your portfolio website contact form.
          </p>
        </div>
      `,
      text: `New Portfolio Message

From: ${cleanName}
Email: ${cleanEmail}
Subject: ${cleanSubject}

Message:
${cleanMessage}

---
This message was sent from your portfolio website contact form.`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200, headers: rateHeaders }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500, headers: rateHeaders }
    );
  }
}
