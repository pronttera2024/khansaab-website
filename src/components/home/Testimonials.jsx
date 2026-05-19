import { useState, useEffect } from 'react'
import { Ornament } from '../../components/shared/Ornament.jsx'
import TESTIMONIALS from '../../data/homePages/testimonials.json'

export default function Testimonials() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = TESTIMONIALS.length

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setI(x => (x + 1) % n), 6000)
    return () => clearInterval(t)
  }, [paused, n])

  const current = TESTIMONIALS[i]

  return (
    <section onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} style={{ background: 'var(--paper)', padding: '160px 0', position: 'relative', overflow: 'hidden' }}>
      <div className="arabic" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 480, color: 'var(--emerald)', opacity: 0.04, lineHeight: 1, fontWeight: 400, pointerEvents: 'none' }}>✦</div>
      <div className="container" style={{ position: 'relative', textAlign: 'center', maxWidth: 980, margin: '0 auto' }}>
        <p className="eyebrow" style={{ color: 'var(--emerald)', marginBottom: 18 }}>TESTIMONIALS · ★★★★★</p>
        <h2 className="display" style={{ fontSize: 'clamp(48px, 5vw, 72px)', lineHeight: 1.05, marginBottom: 56, fontWeight: 400 }}>
          From those who <span className="display-italic" style={{ color: 'var(--emerald)' }}>wear it.</span>
        </h2>
        <div style={{ position: 'relative', minHeight: 220 }}>
          <div className="display-italic" style={{ fontSize: 160, color: 'var(--gold)', opacity: 0.4, position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)', lineHeight: 1 }}>"</div>
          <blockquote key={i} className="display" style={{ fontSize: 'clamp(26px, 2.6vw, 38px)', lineHeight: 1.35, fontWeight: 400, color: 'var(--ink)', fontStyle: 'italic', maxWidth: 880, margin: '0 auto', animation: 'fadeUp 0.7s var(--ease-out) both', position: 'relative' }}>
            {current.quote}
          </blockquote>
        </div>
        <Ornament/>
        <div style={{ marginTop: 24 }}>
          <p className="display" style={{ fontSize: 22, marginBottom: 6 }}>{current.name}</p>
          <p className="mono" style={{ opacity: 0.55 }}>{current.role}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24, marginTop: 56 }}>
          <button onClick={() => setI(x => (x - 1 + n) % n)}
            style={{ width: 48, height: 48, borderRadius: '50%', border: '1px solid rgba(10,9,8,0.2)', color: 'var(--ink)', fontSize: 14, transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--emerald)'; e.currentTarget.style.color = 'var(--ivory)'; e.currentTarget.style.borderColor = 'var(--emerald)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'rgba(10,9,8,0.2)' }}>←</button>
          <div style={{ display: 'flex', gap: 8 }}>
            {TESTIMONIALS.map((_, idx) => (
              <button key={idx} onClick={() => setI(idx)} style={{ width: idx === i ? 36 : 8, height: 4, background: idx === i ? 'var(--emerald)' : 'rgba(10,9,8,0.15)', transition: 'all 0.4s', position: 'relative', overflow: 'hidden' }}>
                {idx === i && !paused && <span key={`p-${i}-${paused}`} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, background: 'var(--gold)', animation: 'heroProgress 6s linear forwards' }}/>}
              </button>
            ))}
          </div>
          <button onClick={() => setI(x => (x + 1) % n)}
            style={{ width: 48, height: 48, borderRadius: '50%', border: '1px solid rgba(10,9,8,0.2)', color: 'var(--ink)', fontSize: 14, transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--emerald)'; e.currentTarget.style.color = 'var(--ivory)'; e.currentTarget.style.borderColor = 'var(--emerald)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'rgba(10,9,8,0.2)' }}>→</button>
        </div>
        <div style={{ marginTop: 80, padding: '32px 40px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, borderTop: '1px solid rgba(10,9,8,0.1)', borderBottom: '1px solid rgba(10,9,8,0.1)' }}>
          {[{ v: '12,400+', l: 'Five-star reviews' }, { v: '47', l: 'Countries shipped' }, { v: '98%', l: 'Re-order rate' }, { v: '4–6 wks', l: 'MTM turnaround' }].map((s, k) => (
            <div key={k} style={{ textAlign: 'center' }}>
              <div className="display" style={{ fontSize: 40, color: 'var(--emerald)', marginBottom: 4 }}>{s.v}</div>
              <div className="mono" style={{ opacity: 0.55 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}