import { useState, useEffect, useRef } from 'react'
import { useViewport } from '../../hooks/useViewport.js'
import Img from '../../components/shared/Img.jsx'
import REELS_DATA from '../../data/homePages/reelsData.json'

export default function Reels() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = REELS_DATA.length
  const { isPhone, width } = useViewport()
  const cardW = isPhone ? Math.min(260, Math.max(220, width - 80)) : 320
  const cardGap = isPhone ? 14 : 24
  const cardH = isPhone ? 460 : 560
  const scrollerRef = useRef(null)

  useEffect(() => {
    if (paused || isPhone) return
    const t = setInterval(() => setActive(a => (a + 1) % n), 4000)
    return () => clearInterval(t)
  }, [paused, n, isPhone])

  useEffect(() => {
    if (!isPhone) return
    const el = scrollerRef.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const center = el.scrollLeft + el.clientWidth / 2
        const idx = Math.round((center - cardW / 2) / (cardW + cardGap))
        const clamped = Math.max(0, Math.min(n - 1, idx))
        setActive(clamped)
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => { el.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [isPhone, cardW, cardGap, n])

  const scrollTo = (i) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollTo({ left: i * (cardW + cardGap), behavior: 'smooth' })
  }

  return (
    <section style={{ background: 'var(--ink)', color: 'var(--ivory)', padding: '140px 0', position: 'relative', overflow: 'hidden' }}>
      <div className="geo-overlay" style={{ opacity: 0.06 }}/>
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
          <div>
            <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 16 }}>FROM THE ATELIER · @KHANSAAB</p>
            <h2 className="display" style={{ fontSize: 'clamp(56px, 6.5vw, 96px)', lineHeight: 1, fontWeight: 400 }}>The reels.</h2>
            <p style={{ marginTop: 14, opacity: 0.65, maxWidth: 480, fontSize: 15 }}>A weekly window into the studio. Tap a reel to watch — or follow along on Instagram.</p>
          </div>
          {!isPhone && (
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <button onClick={() => setPaused(p => !p)} style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(201,169,97,0.4)', color: 'var(--gold-light)', fontSize: 12 }}>
                {paused ? '▶' : '❚❚'}
              </button>
              <div style={{ width: 1, height: 24, background: 'rgba(201,169,97,0.25)' }}/>
              <button onClick={() => setActive(a => (a - 1 + n) % n)} style={{ width: 52, height: 52, borderRadius: '50%', border: '1px solid rgba(201,169,97,0.4)', color: 'var(--gold-light)' }}>←</button>
              <button onClick={() => setActive(a => (a + 1) % n)} style={{ width: 52, height: 52, borderRadius: '50%', border: '1px solid rgba(201,169,97,0.4)', color: 'var(--gold-light)' }}>→</button>
            </div>
          )}
        </div>
      </div>

      {isPhone ? (
        <div
          ref={scrollerRef}
          data-reels-scroller
          style={{
            display: 'flex', gap: cardGap,
            overflowX: 'auto', overflowY: 'hidden',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            padding: `0 calc((100% - ${cardW}px) / 2)`,
            height: cardH + 20,
            alignItems: 'center',
          }}>
          {REELS_DATA.map((r, i) => {
            const isActive = i === active
            return (
              <article key={i} onClick={() => scrollTo(i)} style={{
                flex: `0 0 ${cardW}px`, height: cardH,
                scrollSnapAlign: 'center', position: 'relative', overflow: 'hidden',
                background: 'var(--ink-soft)',
                boxShadow: isActive ? '0 20px 50px rgba(0,0,0,0.5)' : 'none',
                borderRadius: 6,
                transform: isActive ? 'scale(1)' : 'scale(0.94)',
                transition: 'transform 0.4s var(--ease-out), box-shadow 0.4s',
                cursor: 'pointer',
              }}>
                <Img variant="dark" label={r.label} src={r.src} style={{ height: '100%' }}/>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 35%, rgba(10,9,8,0.9) 100%)' }}/>
                <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold-warm))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)', fontSize: 11, fontWeight: 600, fontFamily: 'var(--f-display)' }}>K</div>
                    <span style={{ fontSize: 11, fontWeight: 500 }}>khansaab</span>
                  </div>
                  <div style={{ background: 'rgba(10,9,8,0.6)', padding: '4px 9px', borderRadius: 4, fontSize: 10, fontFamily: 'var(--f-mono)', color: 'var(--gold-light)' }}>{r.duration}</div>
                </div>
                {isActive && (
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 60, height: 60, borderRadius: '50%', border: '1px solid var(--gold)', background: 'rgba(201,169,97,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5 L20 12 L8 19 Z"/></svg>
                  </div>
                )}
                <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 4, lineHeight: 1.25, color: 'var(--ivory)' }}>{r.label}</p>
                  <p style={{ fontSize: 11, opacity: 0.75, marginBottom: 6, color: 'var(--ivory)' }}>{r.caption}</p>
                  <p className="mono" style={{ opacity: 0.55, fontSize: 10, color: 'var(--ivory)' }}>{r.views} views · ♡ {r.likes}</p>
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        <div data-reels-viewport onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
          style={{ position: 'relative', height: 640, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {REELS_DATA.map((r, i) => {
            let off = i - active
            if (off > n / 2) off -= n
            if (off < -n / 2) off += n
            const isActive = off === 0
            const absOff = Math.abs(off)
            const visible = absOff <= 2
            const x = off * (cardW + cardGap)
            const scale = isActive ? 1 : absOff === 1 ? 0.82 : 0.65
            const opacity = !visible ? 0 : isActive ? 1 : absOff === 1 ? 0.7 : 0.3
            return (
              <article key={i} onClick={() => setActive(i)} style={{
                position: 'absolute', width: cardW, height: 560,
                transform: `translateX(${x}px) scale(${scale})`,
                opacity, filter: `blur(${isActive ? 0 : absOff}px)`,
                transition: 'all 0.7s var(--ease-out)',
                cursor: 'pointer', zIndex: isActive ? 5 : 5 - absOff,
                overflow: 'hidden', background: 'var(--ink-soft)',
                boxShadow: isActive ? '0 30px 80px rgba(0,0,0,0.5)' : 'none', borderRadius: 6,
              }}>
                <Img variant="dark" label={r.label} src={r.src} style={{ height: '100%' }}/>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 35%, rgba(10,9,8,0.9) 100%)' }}/>
                <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold-warm))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)', fontSize: 11, fontWeight: 600, fontFamily: 'var(--f-display)' }}>K</div>
                    <span style={{ fontSize: 11, fontWeight: 500 }}>khansaab</span>
                  </div>
                  <div style={{ background: 'rgba(10,9,8,0.6)', backdropFilter: 'blur(8px)', padding: '4px 9px', borderRadius: 4, fontSize: 10, fontFamily: 'var(--f-mono)', color: 'var(--gold-light)' }}>{r.duration}</div>
                </div>
                {isActive && (
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 72, height: 72, borderRadius: '50%', border: '1px solid var(--gold)', background: 'rgba(201,169,97,0.18)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', animation: 'fadeIn 0.5s var(--ease-out) 0.3s both' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5 L20 12 L8 19 Z"/></svg>
                  </div>
                )}
                {isActive && (
                  <div style={{ position: 'absolute', right: 14, bottom: 100, display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center', color: 'var(--ivory)', animation: 'fadeUp 0.7s var(--ease-out) 0.4s both' }}>
                    <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 21s-7-4.5-9.5-9C1 8 3 5 6 5c2 0 3.5 1 6 3.5C14.5 6 16 5 18 5c3 0 5 3 3.5 7-2.5 4.5-9.5 9-9.5 9z"/></svg>
                      <span style={{ fontSize: 10, fontFamily: 'var(--f-mono)' }}>{r.likes}</span>
                    </button>
                    <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.5A9 9 0 1 1 21 12z"/></svg>
                      <span style={{ fontSize: 10, fontFamily: 'var(--f-mono)' }}>248</span>
                    </button>
                  </div>
                )}
                <div style={{ position: 'absolute', bottom: 18, left: 18, right: isActive ? 70 : 18 }}>
                  <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 4, lineHeight: 1.25 }}>{r.label}</p>
                  <p style={{ fontSize: 12, opacity: 0.75, marginBottom: 8 }}>{r.caption}</p>
                  <p className="mono" style={{ opacity: 0.55, fontSize: 10 }}>{r.views} views</p>
                </div>
                {isActive && !paused && (
                  <div key={`p-${active}`} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'rgba(245,239,227,0.2)' }}>
                    <div style={{ height: '100%', background: 'var(--gold)', animation: 'heroProgress 4s linear forwards' }}/>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      )}

      <div className="container" style={{ marginTop: 32, display: 'flex', justifyContent: 'center', gap: 8 }}>
        {REELS_DATA.map((_, i) => (
          <button key={i} onClick={() => isPhone ? scrollTo(i) : setActive(i)} style={{ width: i === active ? 36 : 8, height: 4, borderRadius: 2, background: i === active ? 'var(--gold)' : 'rgba(245,239,227,0.2)', transition: 'all 0.4s' }}/>
        ))}
      </div>
    </section>
  )
}