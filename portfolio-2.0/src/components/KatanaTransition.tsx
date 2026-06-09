'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from './KatanaTransition.module.css'

type Status = 'idle' | 'cover' | 'reveal'

/**
 * A page-transition interstitial: vibrant dusk panels close over the screen, a
 * gyroscopic energy core spins up (rings orbiting a pulsing orb) while the next
 * page loads, then the panels part along a diagonal to reveal it.
 */
export default function KatanaTransition({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<Status>('idle')
  const statusRef = useRef<Status>('idle')
  const isTest = useRef(false)
  const coverStart = useRef(0)
  const timers = useRef<number[]>([])
  const pathname = usePathname()

  // One full unsheathe-and-resheathe cycle; we hold the cover at least this long
  // so the draw always reads even when the next page loads instantly.
  const MIN_COVER = 2200

  statusRef.current = status

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => clearTimeout(t))
    timers.current = []
  }, [])

  const after = useCallback((ms: number, fn: () => void) => {
    const t = window.setTimeout(fn, ms)
    timers.current.push(t)
  }, [])

  const toReveal = useCallback(() => {
    setStatus('reveal')
    after(680, () => setStatus('idle'))
  }, [after])

  const cover = useCallback(
    (test: boolean) => {
      if (statusRef.current !== 'idle') return
      clearTimers()
      isTest.current = test
      coverStart.current = performance.now()
      setStatus('cover')
      // Test: show a full draw + sheathe, then reveal. Real nav: loop until the
      // route commits (handled below), with a long safety cap so it can't hang.
      after(test ? 2700 : 9000, toReveal)
    },
    [after, clearTimers, toReveal]
  )

  // When a real navigation commits (pathname changes mid-cover), reveal the
  // freshly painted page.
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (statusRef.current === 'cover' && !isTest.current) {
      clearTimers()
      // Let the current draw/sheathe cycle finish before revealing.
      const elapsed = performance.now() - coverStart.current
      after(Math.max(MIN_COVER - elapsed, 160), toReveal)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Intercept internal link clicks so the slash starts the instant you navigate.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const anchor = (e.target as HTMLElement | null)?.closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      const target = anchor.getAttribute('target')
      if (!href || target === '_blank' || anchor.hasAttribute('download')) return
      if (!href.startsWith('/') || href.startsWith('//')) return
      const url = new URL(href, window.location.href)
      if (url.pathname === window.location.pathname) return // same page / hash
      cover(false)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [cover])

  useEffect(() => () => clearTimers(), [clearTimers])

  return (
    <>
      {children}

      <div
        className={`${styles.overlay} ${status !== 'idle' ? styles.active : ''} ${
          status === 'cover' ? styles.cover : ''
        } ${status === 'reveal' ? styles.reveal : ''}`}
        aria-hidden={status === 'idle'}
      >
        <div className={`${styles.half} ${styles.halfTop}`} />
        <div className={`${styles.half} ${styles.halfBottom}`} />

        <div className={styles.aura} aria-hidden="true" />

        {/* The loader: a gyroscopic energy core — rings orbit a pulsing orb on
            three axes while the next page loads, then it flares and clears. */}
        <div className={styles.loader} aria-hidden="true">
          <div className={styles.core}>
            <span className={`${styles.ring} ${styles.ring1}`} />
            <span className={`${styles.ring} ${styles.ring2}`} />
            <span className={`${styles.ring} ${styles.ring3}`} />
            <span className={styles.dot} />
            <span className={styles.orb} />
          </div>
        </div>
      </div>
    </>
  )
}
