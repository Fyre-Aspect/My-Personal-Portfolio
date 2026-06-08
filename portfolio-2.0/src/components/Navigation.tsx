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
            setRevealed(true)
            setHoverOpen(true)
          }}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <span className={styles.line} />
          <span className={styles.line} />
          <span className={styles.line} />
        </button>

        <nav
          className={`${styles.panel} ${open ? styles.open : ''} ${
            chatting ? styles.chatting : ''
          }`}
          aria-hidden={!open}
          onMouseEnter={() => setHoverOpen(true)}
        >
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
        </nav>
      </div>
    </>
  )
}
