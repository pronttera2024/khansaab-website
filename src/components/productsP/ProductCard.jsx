// src/components/productsP/ProductCard.jsx
import { useState } from 'react'
import { useRouter } from '../../context/RouterContext.jsx'
import Img from '../shared/Img.jsx'

export default function ProductCard({ p, view, compact }) {
  const [hov, setHov] = useState(false)
  const [wish, setWish] = useState(false)
  const { go } = useRouter()

  // ── Compact (mobile 2-col grid) ────────────────────────────────────────────
  if (compact) {
    const rating   = 4.6 + ((p.price % 4) / 10)
    const reviews  = 40 + (p.price % 280)
    const discount = p.old ? Math.round(((p.old - p.price) / p.old) * 100) : 0

    return (
      <article
        onClick={() => go('product')}
        style={{
          cursor: 'pointer', position: 'relative',
          background: 'var(--paper)', borderRadius: 10,
          overflow: 'hidden', border: '1px solid rgba(10,9,8,0.06)',
        }}
      >
        <div style={{ position: 'relative', aspectRatio: '4/5', background: 'var(--bone)' }}>
          <Img src={p.src} label={p.name.toUpperCase()} style={{ height: '100%' }} />

          {p.tag && (
            <div style={{
              position: 'absolute', top: 8, left: 8,
              background: 'var(--ink)', color: 'var(--ivory)',
              padding: '3px 7px', fontSize: 8, letterSpacing: '0.16em', fontWeight: 700, borderRadius: 3,
            }}>
              {p.tag}
            </div>
          )}

          {discount > 0 && (
            <div style={{
              position: 'absolute', top: 8, right: 8,
              background: 'var(--gold)', color: 'var(--ink)',
              padding: '3px 7px', fontSize: 10, fontWeight: 700, borderRadius: 3,
            }}>
              -{discount}%
            </div>
          )}

          <button
            onClick={(e) => { e.stopPropagation(); setWish(w => !w) }}
            aria-label="Add to wishlist"
            style={{
              position: 'absolute', bottom: 8, right: 8,
              width: 32, height: 32, borderRadius: '50%',
              background: 'rgba(245,239,227,0.95)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
              color: wish ? 'var(--emerald)' : 'rgba(10,9,8,0.55)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill={wish ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.4">
              <path d="M8 14 C8 14 1 9.5 1 5 C1 3 2.5 1.5 4.5 1.5 C6 1.5 7.2 2.5 8 3.8 C8.8 2.5 10 1.5 11.5 1.5 C13.5 1.5 15 3 15 5 C15 9.5 8 14 8 14 Z" />
            </svg>
          </button>
        </div>

        <div style={{ padding: '10px 10px 12px' }}>
          <h3 style={{
            fontFamily: 'var(--f-body)', fontSize: 13, fontWeight: 500,
            lineHeight: 1.3, color: 'var(--ink)',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
            overflow: 'hidden', minHeight: 34, marginBottom: 6,
          }}>{p.name}</h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
            <span style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '0.04em' }}>★★★★★</span>
            <span className="mono" style={{ fontSize: 10, opacity: 0.55 }}>({reviews})</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>${p.price.toLocaleString()}</span>
            {p.old && <span style={{ fontSize: 11, textDecoration: 'line-through', opacity: 0.45 }}>${p.old}</span>}
          </div>

          <p style={{ fontSize: 10, color: 'var(--emerald)', marginTop: 6, fontWeight: 600 }}>
            ✦ Free express delivery
          </p>
        </div>
      </article>
    )
  }

  // ── List view ──────────────────────────────────────────────────────────────
  if (view === 'list') {
    return (
      <article
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={() => go('product')}
        style={{
          display: 'grid', gridTemplateColumns: '240px 1fr auto',
          gap: 32, padding: 20,
          border: '1px solid rgba(10,9,8,0.08)',
          background: 'var(--paper)', cursor: 'pointer', transition: 'all 0.4s',
        }}
      >
        <Img src={p.src} label={p.name.toUpperCase()} style={{ aspectRatio: '3/4' }} />

        <div style={{ paddingTop: 12 }}>
          {p.tag && (
            <span style={{ fontSize: 9, letterSpacing: '0.2em', fontWeight: 600, color: 'var(--emerald)', marginBottom: 8, display: 'inline-block' }}>
              {p.tag}
            </span>
          )}
          <h3 className="display" style={{ fontSize: 28, marginBottom: 8 }}>{p.name}</h3>
          <p className="arabic" style={{ fontSize: 22, color: 'var(--emerald)', opacity: 0.7, marginBottom: 12 }}>{p.arabic}</p>
          <p className="mono" style={{ opacity: 0.55 }}>
            {p.fabric.toUpperCase()} · {p.cat.toUpperCase()} · {p.occasion.toUpperCase()}
          </p>
        </div>

        <div style={{ textAlign: 'right', paddingTop: 12, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 14 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
            <span style={{ fontSize: 24, fontWeight: 600 }}>${p.price.toLocaleString()}</span>
            {p.old && <span style={{ fontSize: 14, textDecoration: 'line-through', opacity: 0.4 }}>${p.old}</span>}
          </div>
        </div>
      </article>
    )
  }

  // ── Default grid card ──────────────────────────────────────────────────────
  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => go('product')}
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4', marginBottom: 20 }}>
        <Img
          src={p.src} label={p.name.toUpperCase()}
          style={{ height: '100%', transform: hov ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.6s var(--ease-out)', opacity: hov ? 0 : 1 }}
        />
        <Img
          variant="dark" src={p.src} label={`${p.name.toUpperCase()} · DETAIL`}
          style={{ position: 'absolute', inset: 0, height: '100%', opacity: hov ? 1 : 0, transition: 'opacity 0.5s' }}
        />
        {p.tag && (
          <div style={{ position: 'absolute', top: 14, left: 14, background: 'var(--ink)', color: 'var(--ivory)', padding: '5px 10px', fontSize: 9, letterSpacing: '0.18em', fontWeight: 600 }}>
            {p.tag}
          </div>
        )}
        <button style={{ position: 'absolute', top: 14, right: 14, width: 34, height: 34, borderRadius: '50%', background: 'rgba(245,239,227,0.92)' }}>♡</button>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4, gap: 6 }}>
          <span className="mono" style={{ opacity: 0.55, fontSize: 10 }}>{p.fabric.toUpperCase()}</span>
          <span className="arabic" style={{ fontSize: 16, color: 'var(--emerald)', opacity: 0.7 }}>{p.arabic}</span>
        </div>
        <h3 className="display" style={{ fontSize: 22, lineHeight: 1.15, marginBottom: 6, fontWeight: 500 }}>{p.name}</h3>
        <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
          <span style={{ fontSize: 17, fontWeight: 600 }}>${p.price.toLocaleString()}</span>
          {p.old && <span style={{ fontSize: 13, textDecoration: 'line-through', opacity: 0.4 }}>${p.old}</span>}
        </div>
      </div>
    </article>
  )
}