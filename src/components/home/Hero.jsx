import { useState, useEffect } from 'react'
import { useRouter } from '../../context/RouterContext.jsx'
import HERO_SLIDES from '../../data/homePages/heroSlides.json'

export default function Hero() {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = HERO_SLIDES.length
  const { go } = useRouter()

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIdx(i => (i + 1) % n), 5500)
    return () => clearInterval(t)
  }, [paused, n])

  const advance = (delta) => setIdx(i => (i + delta + n) % n)

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: 'relative', height: '100vh', minHeight: 720,
        background: 'var(--ink)', color: 'var(--ivory)', overflow: 'hidden',
      }}>
      {HERO_SLIDES.map((slide, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          opacity: i === idx ? 1 : 0,
          transition: 'opacity 1.2s var(--ease-out)',
          pointerEvents: i === idx ? 'auto' : 'none',
        }}>
          <div style={{
            position: 'absolute', inset: 0, overflow: 'hidden', background: slide.bg,
            transform: i === idx ? 'scale(1)' : 'scale(1.06)',
            transition: 'transform 6s var(--ease-out)',
          }}>
            {slide.image && (
              <img
                src={slide.image}
                alt={slide.label}
                loading={i === 0 ? 'eager' : 'lazy'}
                onError={(e) => { e.currentTarget.style.display = 'none' }}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%', objectFit: 'cover',
                  filter: 'brightness(0.7) saturate(0.95)',
                }}
              />
            )}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(10,9,8,0.25) 0%, rgba(10,9,8,0.55) 100%)',
            }}/>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'><g fill='none' stroke='%23C9A961' stroke-width='0.4' opacity='0.5'><path d='M40 0 L80 40 L40 80 L0 40 Z'/><circle cx='40' cy='40' r='3'/></g></svg>\")",
              backgroundSize: '80px', opacity: 0.12,
            }}/>
            <div className="label" style={{
              position: 'absolute', top: 24, left: 24,
              background: 'rgba(10,9,8,0.55)', color: 'rgba(245,239,227,0.6)',
              border: '1px solid rgba(201,169,97,0.25)', padding: '5px 10px',
              fontFamily: 'var(--f-mono)', fontSize: 9, letterSpacing: '0.18em',
            }}>{slide.label}</div>
          </div>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(10,9,8,0.55) 0%, rgba(10,9,8,0.25) 35%, rgba(10,9,8,0.85) 100%)',
          }}/>
        </div>
      ))}

      <div className="geo-overlay" style={{ opacity: 0.06 }}/>

      <div style={{
        position: 'absolute', left: 32, top: '50%', transform: 'translateY(-50%) rotate(-90deg)',
        transformOrigin: 'left center', display: 'flex', gap: 28, alignItems: 'center',
        opacity: 0.7, zIndex: 3,
      }}>
        <span className="eyebrow">SCROLL TO DISCOVER</span>
        <div style={{ width: 80, height: 1, background: 'var(--gold)' }}/>
      </div>

      {/* Slide dots (right) */}
      <div style={{
        position: 'absolute', right: 40, top: '50%', transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', zIndex: 3,
      }}>
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} style={{
            width: i === idx ? 4 : 6, height: i === idx ? 28 : 6,
            borderRadius: i === idx ? 2 : 3,
            background: i === idx ? 'var(--gold)' : 'rgba(245,239,227,0.3)',
            transition: 'all 0.5s var(--ease-out)', cursor: 'pointer',
          }}/>
        ))}
      </div>

      {/* Slide content */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end',
        paddingBottom: 110, zIndex: 2,
      }}>
        <div className="container" style={{ textAlign: 'center', width: '100%' }}>
          {HERO_SLIDES.map((slide, i) => (
            <div key={i} style={{
              position: i === idx ? 'relative' : 'absolute', left: 0, right: 0,
              opacity: i === idx ? 1 : 0,
              transform: i === idx ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 1.2s var(--ease-out)',
              pointerEvents: i === idx ? 'auto' : 'none',
            }}>
              <p className="arabic" style={{
                fontSize: 'clamp(28px, 3vw, 44px)', color: 'var(--gold)', marginBottom: 20, letterSpacing: 0,
                animation: i === idx ? 'fadeUp 1s var(--ease-out) 0.2s both' : 'none',
              }}>{slide.arabic}</p>
              <p className="eyebrow" style={{
                color: 'var(--gold)', letterSpacing: '0.45em', marginBottom: 24,
                animation: i === idx ? 'fadeUp 1s var(--ease-out) 0.3s both' : 'none',
              }}>{slide.eyebrow}</p>
              <h1 className="display" style={{
                fontSize: 'clamp(64px, 10vw, 160px)', fontWeight: 400, letterSpacing: '-0.02em',
                lineHeight: 0.95, marginBottom: 28,
                animation: i === idx ? 'fadeUp 1.1s var(--ease-out) 0.4s both' : 'none',
              }}>
                {slide.titleTop} <span className="display-italic" style={{ color: 'var(--gold)' }}>{slide.titleAccent}</span>
                <br/>{slide.titleBot} <span className="display-italic">{slide.titleBotAccent}</span>
              </h1>
              <p style={{
                maxWidth: 560, margin: '0 auto 36px', fontSize: 16, lineHeight: 1.7, opacity: 0.78,
                animation: i === idx ? 'fadeUp 1.1s var(--ease-out) 0.55s both' : 'none',
              }}>{slide.body}</p>
              <div style={{
                display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap',
                animation: i === idx ? 'fadeUp 1.1s var(--ease-out) 0.7s both' : 'none',
              }}>
                <button className="btn btn-gold" onClick={() => go('products')}>{slide.cta1}</button>
                <button className="btn btn-ghost">{slide.cta2}</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        position: 'absolute', bottom: 28, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 40px', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase',
        opacity: 0.85, zIndex: 3,
      }}>
        <span style={{ minWidth: 200 }}>{String(idx + 1).padStart(2, '0')} — {HERO_SLIDES[idx].chapter}</span>
        <span style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <button onClick={() => advance(-1)} style={{
            width: 44, height: 44, borderRadius: '50%',
            border: '1px solid rgba(245,239,227,0.3)', color: 'var(--ivory)',
          }}>←</button>
          <div style={{ width: 220, height: 1, background: 'rgba(245,239,227,0.2)', position: 'relative' }}>
            <div key={`bar-${idx}-${paused}`} style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, background: 'var(--gold)',
              animation: paused ? 'none' : 'heroProgress 5.5s linear forwards',
            }}/>
          </div>
          <span className="mono" style={{ opacity: 0.7 }}>{String(idx + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
          <button onClick={() => advance(1)} style={{
            width: 44, height: 44, borderRadius: '50%',
            border: '1px solid rgba(245,239,227,0.3)', color: 'var(--ivory)',
          }}>→</button>
        </span>
        <span style={{ minWidth: 200, textAlign: 'right' }}>{HERO_SLIDES[idx].season}</span>
      </div>
    </section>
  )
}