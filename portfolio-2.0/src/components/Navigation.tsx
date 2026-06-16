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
  const [hoverOpen, setHoverOpen] = useState(false) // cursor parked at the right edge
  const [isTouch, setIsTouch] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const pathname = usePathname()

  const { messages, isLoading, error, sendMessage, clearChat } = useChat()
  const logEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const wasOpen = useRef(false)
  const hoverRef = useRef(false)

  const open = pinned || hoverOpen
  const chatting = messages.length > 0

  const isActiveLink = useCallback(
    (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href)),
    [pathname]
  )

  // Desktop: the flyout opens when the cursor reaches the right edge (over the
  // rail), stays open while the cursor is inside the panel zone, and closes once
  // it moves away — unless it's pinned open by a click or an active chat. Touch
  // devices just tap the rail.
  useEffect(() => {
    const touch = window.matchMedia('(hover: none)').matches
    setIsTouch(touch)
    if (touch) return

    const onMove = (e: MouseEvent) => {
      const fromRight = window.innerWidth - e.clientX
      const trigger = fromRight < 56 // reached the rail at the edge
      const keep = fromRight < 360 // still inside the panel zone
      const next = trigger || (hoverRef.current && keep)
      hoverRef.current = next
      setHoverOpen(next)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPinned(false)
        setHoverOpen(false)
        hoverRef.current = false
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
  useEffect(() => {
    if (wasOpen.current && !open) {
      clearChat()
      setInputValue('')
    }
    wasOpen.current = open
  }, [open, clearChat])

  const close = () => {
    setPinned(false)
    setHoverOpen(false)
    hoverRef.current = false
  }

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
          glass layers so they read as real glass, not a flat blur. */}
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
            <animate
              attributeName="scale"
              dur="14s"
              values="60; 84; 68; 60"
              keyTimes="0; 0.45; 0.75; 1"
              repeatCount="indefinite"
            />
          </feDisplacementMap>
          <feSpecularLighting
            in="softMap"
            surfaceScale="2.4"
            specularConstant="0.7"
            specularExponent="85"
            lightingColor="#d4ecff"
            result="sheen"
          >
            <fePointLight x="20" y="-40" z="140">
              <animate attributeName="x" dur="9s" values="-60; 240; -60" repeatCount="indefinite" />
              <animate attributeName="y" dur="13s" values="-60; 70; -60" repeatCount="indefinite" />
            </fePointLight>
          </feSpecularLighting>
          <feComposite in="sheen" in2="warped" operator="arithmetic" k1="0" k2="1" k3="0.4" k4="0" />
        </filter>
      </svg>

      {open && (pinned || isTouch) && (
        <div className={styles.backdrop} onClick={close} />
      )}

      <div className={styles.root}>
        {/* Right-edge rail handle — the little "opening" tab, always present. */}
        <button
          type="button"
          className={`${styles.rail} ${open ? styles.open : ''}`}
          onClick={() => setPinned((v) => !v)}
          onMouseEnter={() => {
            if (isTouch) return
            hoverRef.current = true
            setHoverOpen(true)
          }}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <span className={styles.glassBlur} aria-hidden="true" />
          <span className={styles.glassWarp} aria-hidden="true" />
          <span className={styles.glassTint} aria-hidden="true" />
          <span className={styles.glassEdge} aria-hidden="true" />
          <span className={styles.railIcon} aria-hidden="true">
            <span className={styles.line} />
            <span className={styles.line} />
            <span className={styles.line} />
          </span>
          <span className={styles.railLabel} aria-hidden="true">MENU</span>
        </button>

        {/* Sliding glass flyout panel */}
        <aside
          className={`${styles.panel} ${open ? styles.open : ''} ${chatting ? styles.chatting : ''}`}
          aria-hidden={!open}
          onMouseEnter={() => {
            if (isTouch) return
            hoverRef.current = true
            setHoverOpen(true)
          }}
        >
          <span className={styles.glassBlur} aria-hidden="true" />
          <span className={styles.glassWarp} aria-hidden="true" />
          <span className={styles.glassTint} aria-hidden="true" />
          <span className={styles.glassEdge} aria-hidden="true" />

          <div className={styles.panelInner}>
            <div className={styles.panelHead}>
              <span className={styles.brand}>Aamir Tinwala</span>
              <button type="button" className={styles.close} onClick={close} aria-label="Close menu">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>

            <ul className={styles.list}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className={`${styles.link} ${isActiveLink(link.href) ? styles.active : ''}`}
                  >
                    <span className={styles.linkBar} aria-hidden="true" />
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
                        className={`${styles.msg} ${m.role === 'user' ? styles.msgUser : styles.msgAI}`}
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
        </aside>
      </div>
    </>
  )
}
