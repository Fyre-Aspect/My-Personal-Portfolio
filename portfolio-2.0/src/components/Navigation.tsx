'use client'
import Link from 'next/link'
import { useState, useEffect, useCallback, useRef, FormEvent } from 'react'
import { usePathname } from 'next/navigation'
import { useChat } from '@/hooks/useChat'
import styles from './Navigation.module.css'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/activities', label: 'Experiences' },
  { href: '/achievements', label: 'Achievements' },
  { href: '/contact', label: 'Contact' },
]

// Strip the tour navigation tags the model sometimes emits; we're chat-only now.
const cleanAnswer = (content: string) =>
  content.replace(/{{\s*(?:BUTTON|REDIRECT):[^}]+}}/g, '').trim()

export default function Navigation() {
  const [pinned, setPinned] = useState(false) // click / chat-locked open
  const [revealed, setRevealed] = useState(false) // burger faded in
  const [hoverOpen, setHoverOpen] = useState(false) // cursor parked in the corner
  const [isTouch, setIsTouch] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const pathname = usePathname()

  const { messages, isLoading, error, sendMessage, clearChat } = useChat()
  const logEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const wasOpen = useRef(false)

  const open = pinned || hoverOpen
  const chatting = messages.length > 0

  const isActiveLink = useCallback(
    (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href)),
    [pathname]
  )

  // Desktop: fade the burger in as the cursor nears the top-right corner and
  // open the menu once it's parked over the nav's area. Touch taps to open.
  useEffect(() => {
    const touch = window.matchMedia('(hover: none)').matches
    setIsTouch(touch)
    if (touch) {
      setRevealed(true)
      return
    }

    const onMove = (e: MouseEvent) => {
      const dx = window.innerWidth - e.clientX
      const dy = e.clientY
      const nearCorner = dx < 240 && dy < 240
      const overArea = dx < 340 && dy < 520 // includes the open panel + chat
      setRevealed(nearCorner || window.scrollY < 80)
      setHoverOpen(overArea)
    }
    const onScroll = () => {
      if (window.scrollY < 80) setRevealed(true)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    setRevealed(true)
    const settle = setTimeout(() => {
      if (window.scrollY >= 80) setRevealed(false)
    }, 2200)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      clearTimeout(settle)
    }
  }, [])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPinned(false)
        setHoverOpen(false)
        inputRef.current?.blur()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Keep the latest answer in view
  useEffect(() => {
    if (chatting) logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, chatting])

  // Forget the conversation once the menu closes — reopening starts fresh.
  // While it stays open the history is kept so you can keep asking.
  useEffect(() => {
    if (wasOpen.current && !open) {
      clearChat()
      setInputValue('')
    }
    wasOpen.current = open
  }, [open, clearChat])

  const handleSend = (e: FormEvent) => {
    e.preventDefault()
    const text = inputValue.trim()
    if (!text || isLoading) return
    setPinned(true)
    sendMessage(text)
    setInputValue('')
  }

  return (
    <>
      {/* Liquid-glass refraction filter — bends the live background behind the
          glass layers so they read as real glass, not a flat blur. Rendered
          once; referenced by .glassWarp via filter: url(#liquidGlassFilter). */}
      <svg
        aria-hidden="true"
        width="0"
        height="0"
        style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}
      >
        <filter
          id="liquidGlassFilter"
          x="-35%"
          y="-35%"
          width="170%"
          height="170%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.009 0.013"
            numOctaves="2"
            seed="42"
            result="noise"
          >
            {/* Slowly drift the noise field so the refraction behind the glass
                visibly flows like liquid instead of sitting frozen. */}
            <animate
              attributeName="baseFrequency"
              dur="20s"
              values="0.008 0.012; 0.013 0.018; 0.010 0.014; 0.008 0.012"
              keyTimes="0; 0.4; 0.7; 1"
              calcMode="spline"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feGaussianBlur in="noise" stdDeviation="2.2" result="softMap" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale="72"
            xChannelSelector="R"
            yChannelSelector="G"
            result="warped"
          >
            {/* Gentle breathing on the displacement amount adds a second, slower
                wave so the flow never looks like a single looping cycle. */}
            <animate
              attributeName="scale"
              dur="14s"
              values="60; 84; 68; 60"
              keyTimes="0; 0.45; 0.75; 1"
              repeatCount="indefinite"
            />
          </feDisplacementMap>
          {/* Wet, glossy sheen — a soft point light grazes the refracted glass
              and slowly drifts across it. This is the highlight that sells the
              "liquid glass" read on the 21st.dev reference; it's composited
              lightly on top so it brightens edges without washing the panel. */}
          <feSpecularLighting
            in="softMap"
            surfaceScale="2.4"
            specularConstant="0.7"
            specularExponent="85"
            lightingColor="#d4ecff"
            result="sheen"
          >
            <fePointLight x="20" y="-40" z="140">
              <animate
                attributeName="x"
                dur="9s"
                values="-60; 240; -60"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                dur="13s"
                values="-60; 70; -60"
                repeatCount="indefinite"
              />
            </fePointLight>
          </feSpecularLighting>
          <feComposite
            in="sheen"
            in2="warped"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="0.4"
            k4="0"
          />
        </filter>
      </svg>

      {open && (pinned || isTouch) && (
        <div className={styles.backdrop} onClick={() => setPinned(false)} />
      )}

      <div className={styles.root}>
        <button
          type="button"
          className={`${styles.burger} ${revealed || open ? styles.revealed : ''} ${
            open ? styles.open : ''
          }`}
          onClick={() => setPinned((v) => !v)}
          onMouseEnter={() => {
            // Touch devices fire a synthetic mouseenter on tap, which used to
            // latch the menu open (and then it couldn't be tapped closed). On
            // phones the burger is click-only — proximity/hover never opens it.
            if (isTouch) return
            setRevealed(true)
            setHoverOpen(true)
          }}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <span className={styles.glassBlur} aria-hidden="true" />
          <span className={styles.glassWarp} aria-hidden="true" />
          <span className={styles.glassTint} aria-hidden="true" />
          <span className={styles.glassEdge} aria-hidden="true" />
          <span className={styles.lines}>
            <span className={styles.line} />
            <span className={styles.line} />
            <span className={styles.line} />
          </span>
        </button>

        <nav
          className={`${styles.panel} ${open ? styles.open : ''} ${
            chatting ? styles.chatting : ''
          }`}
          aria-hidden={!open}
          onMouseEnter={() => {
            if (!isTouch) setHoverOpen(true)
          }}
        >
          <span className={styles.glassBlur} aria-hidden="true" />
          <span className={styles.glassWarp} aria-hidden="true" />
          <span className={styles.glassTint} aria-hidden="true" />
          <span className={styles.glassEdge} aria-hidden="true" />
          <div className={styles.panelInner}>
          <ul className={styles.list}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => {
                    setPinned(false)
                    setHoverOpen(false)
                  }}
                  className={`${styles.link} ${isActiveLink(link.href) ? styles.active : ''}`}
                >
                  {link.label}
                  <span className={styles.dot} />
                </Link>
              </li>
            ))}
          </ul>

          {/* Embedded AI assistant */}
          <div className={styles.chat}>
            {chatting && (
              <div className={styles.chatLog}>
                {messages.map((m) => {
                  const text = cleanAnswer(m.content)
                  return (
                    <div
                      key={m.id}
                      className={`${styles.msg} ${
                        m.role === 'user' ? styles.msgUser : styles.msgAI
                      }`}
                    >
                      {m.role === 'assistant' && !text ? (
                        <span className={styles.typing}>
                          <span />
                          <span />
                          <span />
                        </span>
                      ) : (
                        <span
                          className={styles.msgText}
                          dangerouslySetInnerHTML={{ __html: text }}
                        />
                      )}
                    </div>
                  )
                })}
                {error && <div className={styles.chatError}>{error}</div>}
                <div ref={logEndRef} />
              </div>
            )}

            <form className={styles.chatBar} onSubmit={handleSend}>
              <input
                ref={inputRef}
                type="text"
                className={styles.chatInput}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setPinned(true)}
                placeholder="Ask my AI anything…"
                aria-label="Ask the AI assistant"
                disabled={isLoading}
              />
              <button
                type="submit"
                className={styles.chatSend}
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </button>
            </form>
          </div>
          </div>
        </nav>
      </div>
    </>
  )
}
