import { useState } from 'react'
import { useRouter } from '../../context/RouterContext.jsx'
import Img from '../../components/shared/Img.jsx'
import BESTSELLERS from '../../data/homePages/bestSellers.json'

export default function BestSellers() {
  const { go } = useRouter()
  const [hovered, setHovered] = useState(null)

  return (
    <section style={{ background: 'var(--paper)', padding: '160px 0', position: 'relative' }}>
      <div className="container">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 80 }}>
          <div>
            <p className="eyebrow" style={{ color: 'var(--emerald)', marginBottom: 18 }}>★★★★★ · OUR MOST LOVED</p>
            <h2 className="display" style={{ fontSize: 'clamp(56px, 7vw, 104px)', lineHeight: 1, fontWeight: 400 }}>Best sellers.</h2>
          </div>
          <button className="btn btn-ghost-dark" onClick={() => go('products')}>View All Products →</button>
        </header>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {BESTSELLERS.map((p, i) => {
            const isHov = hovered === i
            return (
              <article key={i} onClick={() => go('product')} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ cursor: 'pointer', position: 'relative' }}>
                <div style={{ position: 'relative', overflow: 'hidden', marginBottom: 24, aspectRatio: '3/4' }}>
                  <Img label={`${p.name.toUpperCase()} · FRONT`} src={p.src} style={{ height: '100%', transition: 'all 0.6s var(--ease-out)', transform: isHov ? 'scale(1.04)' : 'scale(1)', opacity: isHov ? 0 : 1 }}/>
                  <Img label={`${p.name.toUpperCase()} · DETAIL`} src={p.src} variant="dark" style={{ position: 'absolute', inset: 0, height: '100%', opacity: isHov ? 1 : 0, transition: 'opacity 0.5s var(--ease-out)' }}/>
                  <div style={{
                    position: 'absolute', top: 16, left: 16,
                    background: p.tag === 'BEST SELLER' ? 'var(--ink)' : p.tag === 'NEW' ? 'var(--emerald)' : p.tag === 'MADE TO ORDER' ? 'var(--gold)' : 'var(--ivory)',
                    color: p.tag === 'MADE TO ORDER' ? 'var(--ink)' : p.tag === "EDITORS' PICK" ? 'var(--ink)' : 'var(--ivory)',
                    padding: '6px 12px', fontSize: 9, letterSpacing: '0.2em', fontWeight: 600,
                  }}>{p.tag}</div>
                  <button style={{ position: 'absolute', top: 16, right: 16, width: 38, height: 38, borderRadius: '50%', background: 'rgba(245,239,227,0.92)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M8 14 C8 14 1 9.5 1 5 C1 3 2.5 1.5 4.5 1.5 C6 1.5 7.2 2.5 8 3.8 C8.8 2.5 10 1.5 11.5 1.5 C13.5 1.5 15 3 15 5 C15 9.5 8 14 8 14 Z"/></svg>
                  </button>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'var(--ink)', color: 'var(--ivory)', padding: '14px 16px', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', textAlign: 'center', fontWeight: 500, transform: isHov ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.5s var(--ease-out)' }}>
                    + Quick Add
                  </div>
                </div>
                <div data-product-meta>
                  <div data-product-cat style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                    <span className="mono" style={{ opacity: 0.55, fontSize: 10 }}>{p.cat}</span>
                    <span className="arabic" style={{ fontSize: 18, color: 'var(--emerald)', opacity: 0.8, flexShrink: 0 }}>{p.arabic}</span>
                  </div>
                  <h3 className="display" style={{ fontSize: 22, lineHeight: 1.15, marginBottom: 14, fontWeight: 500 }}>{p.name}</h3>
                  <div data-product-price-row style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                      <span style={{ fontSize: 18, fontWeight: 600 }}>${p.price.toLocaleString()}</span>
                      {p.old && <span style={{ fontSize: 13, textDecoration: 'line-through', opacity: 0.45 }}>${p.old}</span>}
                    </div>
                    <div data-product-sizes style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {p.sizes.slice(0, 3).map(s => (<span key={s} className="mono" style={{ padding: '3px 7px', border: '1px solid rgba(10,9,8,0.18)', fontSize: 10 }}>{s}</span>))}
                      <span className="mono" style={{ opacity: 0.5, fontSize: 10 }}>+{p.sizes.length - 3}</span>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}