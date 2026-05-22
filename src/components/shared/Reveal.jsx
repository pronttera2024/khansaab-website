import { useRef, useState, useEffect } from 'react'
import { useReveal } from '../../hooks/useReveal.js'

/**
 * Word-by-word text reveal. Splits children/text on whitespace,
 * wraps each word in a clipping span, and translates from below on view.
 */
export function RevealText({ text, children, as: Tag = 'span', className, style, delay = 0, stagger = 0.05, threshold = 0.15 }) {
  const [ref, visible] = useReveal(threshold)
  const source = text ?? (typeof children === 'string' ? children : '')
  const words = source.split(' ')
  return (
    <Tag ref={ref} className={className} style={style}>
      {words.map((w, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            marginRight: '0.25em',
            transform: visible ? 'translateY(0)' : 'translateY(0.4em)',
            opacity: visible ? 1 : 0,
            transition: `transform 0.9s var(--ease-out) ${delay + i * stagger}s, opacity 0.9s var(--ease-out) ${delay + i * stagger}s`,
            willChange: 'transform, opacity',
          }}
        >
          {w}
        </span>
      ))}
    </Tag>
  )
}

/**
 * Simple fade-up wrapper for any block (paragraphs, buttons, images).
 */
export function Reveal({ children, delay = 0, distance = 24, duration = 0.9, threshold = 0.15, as: Tag = 'div', style, className }) {
  const [ref, visible] = useReveal(threshold)
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: visible ? 'translateY(0)' : `translateY(${distance}px)`,
        opacity: visible ? 1 : 0,
        transition: `transform ${duration}s var(--ease-out) ${delay}s, opacity ${duration}s var(--ease-out) ${delay}s`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </Tag>
  )
}

/**
 * Parallax wrapper — translates inner content vertically as the element
 * passes through the viewport. `speed` is the fraction of scroll distance
 * (0.2 = gentle, 0.5 = strong). Negative reverses direction.
 */
export function Parallax({ children, speed = 0.2, style, className }) {
  const ref = useRef(null)
  const innerRef = useRef(null)
  const frame = useRef(0)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const el = ref.current
    const inner = innerRef.current
    if (!el || !inner) return

    const update = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // Progress: -1 when element is just below viewport, 0 at center, +1 above
      const center = rect.top + rect.height / 2
      const progress = (center - vh / 2) / (vh / 2 + rect.height / 2)
      const offset = -progress * speed * 100
      inner.style.transform = `translate3d(0, ${offset}px, 0)`
    }

    const onScroll = () => {
      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [speed])

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden', ...style }}>
      <div ref={innerRef} style={{ willChange: 'transform', height: '100%', width: '100%' }}>
        {children}
      </div>
    </div>
  )
}
