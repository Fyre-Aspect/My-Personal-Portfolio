/**
 * Lightweight in-memory, fixed-window rate limiter.
 *
 * Keyed by an arbitrary identifier (typically the client IP). Each key gets a
 * counter that resets once its window expires. This lives in the module scope,
 * so it persists for the lifetime of a warm serverless instance.
 *
 * NOTE: On a serverless platform (Vercel) state is NOT shared across instances
 * and resets on cold starts, so this is a best-effort throttle rather than a
 * hard global guarantee. It is intentionally dependency-free and is paired with
 * the other defenses in the contact route (validation, honeypot, size limits).
 * If you ever need a hard cross-instance guarantee, swap the Map for Vercel KV
 * or Upstash Redis behind the same `rateLimit()` signature.
 */

interface Bucket {
  count: number
  /** Epoch ms at which this window expires and the count resets. */
  resetAt: number
}

const buckets = new Map<string, Bucket>()

/** How often (ms) we sweep expired buckets to keep memory bounded. */
const SWEEP_INTERVAL_MS = 60_000
let lastSweep = 0

function sweep(now: number): void {
  if (now - lastSweep < SWEEP_INTERVAL_MS) return
  lastSweep = now
  for (const [key, bucket] of buckets) {
    if (now >= bucket.resetAt) buckets.delete(key)
  }
}

export interface RateLimitOptions {
  /** Max allowed requests within the window. */
  limit: number
  /** Window length in milliseconds. */
  windowMs: number
}

export interface RateLimitResult {
  allowed: boolean
  limit: number
  remaining: number
  /** Epoch ms when the current window resets. */
  resetAt: number
  /** Seconds the caller should wait before retrying (0 when allowed). */
  retryAfterSeconds: number
}

export function rateLimit(
  key: string,
  { limit, windowMs }: RateLimitOptions
): RateLimitResult {
  const now = Date.now()
  sweep(now)

  const bucket = buckets.get(key)

  // No active window (or it expired) -> start a fresh one.
  if (!bucket || now >= bucket.resetAt) {
    const resetAt = now + windowMs
    buckets.set(key, { count: 1, resetAt })
    return {
      allowed: true,
      limit,
      remaining: limit - 1,
      resetAt,
      retryAfterSeconds: 0,
    }
  }

  // Window is active and the limit is already spent -> block.
  if (bucket.count >= limit) {
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetAt: bucket.resetAt,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    }
  }

  // Window is active and there is budget left -> consume one.
  bucket.count += 1
  return {
    allowed: true,
    limit,
    remaining: limit - bucket.count,
    resetAt: bucket.resetAt,
    retryAfterSeconds: 0,
  }
}

/**
 * Best-effort client IP extraction for requests behind Vercel's proxy.
 * Falls back to a shared "unknown" bucket in local dev where no proxy
 * headers are present.
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) {
    // May be a comma-separated list: client, proxy1, proxy2 ... take the first.
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  const realIp = headers.get('x-real-ip')
  if (realIp) return realIp.trim()
  return 'unknown'
}
