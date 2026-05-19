import { useState, useEffect, useRef } from 'react'
import { useViewport } from '../../hooks/useViewport.js'
import Img from '../../components/shared/Img.jsx'
import ABOUT_PANELS from '../../data/homePages/aboutPanels.json'

export default function HorizontalAbout() {
  const trackRef = useRef(null)
  const wrapRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const { isPhone } = useViewport()

  useEffect(() => {
    const onScroll = () => {
      const wrap = wrapRef.current
      const track = trackRef.current
      if (!wrap || !track) return
      const rect = wrap.getBoundingClientRect()
      const total = wrap.offsetHeight - window.innerHeight
      const scrolled = Math.min(Math.max(-rect.top, 0), total)
      const p = total > 0 ? scrolled / total : 0
      setProgress(p)
      track.style.transform = `translateX(${-p * (track.scrollWidth - window.innerWidth)}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={wrapRef} data-horizontal-about style={{ height: '300vh', position: 'relative', background: 'var(--ink)' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', color: 'var(--ivory)' }}>
        <div data-horizontal-about-progress style={{
          position: 'absolute', top: 96, left: 48, right: 48,
          display: 'flex', alignItems: 'center', gap: 16, zIndex: 5,
        }}>
          <span className="eyebrow" style={{ color: 'var(--gold)' }}>ABOUT THE HOUSE</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(245,239,227,0.15)', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${progress * 100}%`, background: 'var(--gold)', transition: 'width 0.1s linear' }}/>
          </div>
          <span className="mono" style={{ opacity: 0.6 }}>
            {String(Math.min(ABOUT_PANELS.length, Math.floor(progress * ABOUT_PANELS.length) + 1)).padStart(2, '0')} / {String(ABOUT_PANELS.length).padStart(2, '0')}
          </span>
        </div>

        <div ref={trackRef} data-horizontal-about-track style={{ display: 'flex', height: '100%', transition: 'transform 0.05s linear' }}>
          {ABOUT_PANELS.map((p, i) => (
            <div key={i} style={{
              width: '100vw', height: '100%', background: p.bg,
              display: 'grid', gridTemplateColumns: '1.1fr 1fr',
              alignItems: 'center', padding: '120px 80px 80px', gap: 80,
              flexShrink: 0, position: 'relative',
            }}>
              <div className="geo-overlay" style={{ opacity: 0.07 }}/>
              <div style={{ position: 'relative', maxWidth: 620 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginBottom: 32 }}>
                  <span className="display" style={{ fontSize: 96, color: 'var(--gold)', fontStyle: 'italic', lineHeight: 1 }}>{p.no}</span>
                  <span className="arabic" style={{ fontSize: 36, color: 'var(--gold-light)', opacity: 0.85 }}>{p.arabic}</span>
                </div>
                <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 20 }}>{p.kicker}</p>
                <h2 className="display" style={{ fontSize: 'clamp(56px, 7vw, 104px)', lineHeight: 0.95, marginBottom: 32, fontWeight: 400 }}>{p.title}.</h2>
                <p style={{ fontSize: 18, lineHeight: 1.7, opacity: 0.78, marginBottom: 36, maxWidth: 520 }}>{p.body}</p>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 12,
                  padding: '12px 22px', border: '1px solid rgba(201,169,97,0.35)', borderRadius: 999,
                  fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.18em', color: 'var(--gold-light)',
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)' }}/>
                  {p.stat}
                </div>
              </div>
              <div data-horizontal-about-image style={{ position: 'relative', height: '70vh' }}>
                <Img variant="dark" label={p.img} src={p.src} style={{ height: '100%' }}/>
                <div style={{
                  position: 'absolute', bottom: -24, right: -24, width: 120, height: 120,
                  border: '1px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 32, color: 'var(--gold)', background: p.bg,
                }}>
                  Chapter<br/>&nbsp;{p.no}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div data-horizontal-about-hint style={{
          position: 'absolute', bottom: 48, left: 48,
          fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', opacity: 0.55,
        }}>{isPhone ? '↓  Keep scrolling →' : '↓  Continue scrolling — content moves horizontally'}</div>
      </div>
    </div>
  )
}