import { useState } from 'react'
import { useRouter } from '../../context/RouterContext.jsx'
import { useViewport } from '../../hooks/useViewport.js'
import Img from '../../components/shared/Img.jsx'
import { Ornament } from '../../components/shared/Ornament.jsx'
import BENTO_CATS from '../../data/homePages/bentoCategories.json'

function BentoCard({ cat, span }) {
  const [hover, setHover] = useState(false)
  const { go } = useRouter()
  const isDark = cat.color === 'var(--ivory)'
  return (
    <article
      onClick={() => go('products')}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...span, background: cat.bg, color: cat.color, position: 'relative',
        overflow: 'hidden', cursor: 'pointer',
        transition: 'transform 0.6s var(--ease-out)', transform: hover ? 'scale(0.995)' : 'scale(1)',
      }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <Img variant={isDark ? 'dark' : 'default'} label={cat.img} src={cat.src} style={{ height: '100%' }}/>
        <div style={{
          position: 'absolute', inset: 0,
          background: isDark
            ? 'linear-gradient(160deg, rgba(10,9,8,0.4) 0%, rgba(10,9,8,0.85) 100%)'
            : `linear-gradient(160deg, ${cat.bg}66 0%, ${cat.bg}DD 100%)`,
          transition: 'all 0.6s',
        }}/>
      </div>
      <div className="geo-overlay" style={{ opacity: isDark ? 0.10 : 0.06 }}/>
      <div style={{ position: 'relative', height: '100%', padding: 'clamp(20px, 4vw, 36px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
          <span className="arabic" style={{ fontSize: 'clamp(26px, 4.5vw, 36px)', color: isDark ? 'var(--gold)' : 'var(--emerald)', lineHeight: 1 }}>{cat.arabic}</span>
          <span className="mono" style={{ opacity: 0.6 }}>{String(cat.count).padStart(3, '0')} PIECES</span>
        </div>
        <div>
          <h3 className="display" style={{ fontSize: span.gridRow ? 56 : 'clamp(28px, 5vw, 40px)', lineHeight: 0.95, marginBottom: 10, fontWeight: 400 }}>{cat.name}</h3>
          <p style={{ fontSize: 13.5, opacity: 0.75, maxWidth: 320, lineHeight: 1.55 }}>{cat.desc}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{
            fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 500,
            paddingBottom: 6, borderBottom: `1px solid ${isDark ? 'var(--gold)' : 'currentColor'}`,
            color: isDark ? 'var(--gold)' : 'inherit',
          }}>Explore {cat.name}</span>
          <span style={{ transform: hover ? 'translateX(6px)' : 'translateX(0)', transition: 'transform 0.4s var(--ease-out)', color: isDark ? 'var(--gold)' : 'inherit' }}>→</span>
        </div>
      </div>
    </article>
  )
}

export default function CategoriesBento() {
  const { isPhone } = useViewport()
  const mobileSpan = { gridColumn: '1 / -1', aspectRatio: '16 / 9' }
  return (
    <section style={{ background: 'var(--paper)', padding: '140px 0 160px', position: 'relative' }}>
      <div className="container">
        <header style={{ textAlign: 'center', marginBottom: 80 }}>
          <Ornament/>
          <p className="eyebrow" style={{ color: 'var(--emerald)', marginTop: 20, marginBottom: 18 }}>BROWSE THE HOUSE</p>
          <h2 className="display" style={{ fontSize: 'clamp(56px, 7vw, 96px)', lineHeight: 1, marginBottom: 20 }}>
            Six garments. <span className="display-italic" style={{ color: 'var(--emerald)' }}>One tradition.</span>
          </h2>
          <p style={{ maxWidth: 540, margin: '0 auto', fontSize: 16, opacity: 0.65 }}>
            Every category is curated by our head tailor. No drop-shipping, no compromise — only what we'd wear ourselves.
          </p>
        </header>
        {isPhone ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14 }}>
            {BENTO_CATS.map((cat, i) => (
              <BentoCard key={i} cat={cat} span={mobileSpan}/>
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridAutoRows: '300px', gap: 16 }}>
            <BentoCard cat={BENTO_CATS[0]} span={{ gridColumn: 'span 6', gridRow: 'span 2' }}/>
            <BentoCard cat={BENTO_CATS[1]} span={{ gridColumn: 'span 6' }}/>
            <BentoCard cat={BENTO_CATS[2]} span={{ gridColumn: 'span 3' }}/>
            <BentoCard cat={BENTO_CATS[3]} span={{ gridColumn: 'span 3' }}/>
            <BentoCard cat={BENTO_CATS[4]} span={{ gridColumn: 'span 6' }}/>
            <BentoCard cat={BENTO_CATS[5]} span={{ gridColumn: 'span 6' }}/>
          </div>
        )}
      </div>
    </section>
  )
}