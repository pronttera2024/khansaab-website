import { useState, useRef, useEffect } from 'react'
import Img from '../shared/Img.jsx'

export default function MobileGallery({ images, tag, active, setActive }) {
  const scrollerRef = useRef(null)

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    let raf = null
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        const i = Math.round(el.scrollLeft / el.clientWidth)
        if (i !== active) setActive(i)
        raf = null
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [active, setActive])

  return (
    <div style={{ position: 'relative', marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}>
      <div
        ref={scrollerRef}
        style={{
          display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none',
        }}
      >
        {images.map((g, i) => (
          <div key={i} style={{ flex: '0 0 100%', scrollSnapAlign: 'center', aspectRatio: '3/4' }}>
            <Img label={g.label} src={g.src} style={{ width: '100%', height: '100%' }}/>
          </div>
        ))}
      </div>

      {tag && (
        <div style={{
          position: 'absolute', top: 14, left: 14,
          background: 'var(--ink)', color: 'var(--ivory)',
          padding: '7px 12px', fontSize: 9.5, letterSpacing: '0.22em', fontWeight: 600,
        }}>{tag}</div>
      )}

      <button aria-label="Save" style={{
        position: 'absolute', top: 12, right: 14, width: 40, height: 40, borderRadius: '50%',
        background: 'rgba(245,239,227,0.92)', backdropFilter: 'blur(6px)', fontSize: 16,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>♡</button>

      <div style={{
        position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 6, padding: '6px 10px',
        background: 'rgba(10,9,8,0.55)', backdropFilter: 'blur(6px)', borderRadius: 999,
      }}>
        {images.map((_, i) => (
          <span key={i} style={{
            width: i === active ? 18 : 6, height: 6, borderRadius: 3,
            background: i === active ? 'var(--gold)' : 'rgba(245,239,227,0.45)',
            transition: 'all 0.3s var(--ease-out)',
          }}/>
        ))}
      </div>
    </div>
  )
}