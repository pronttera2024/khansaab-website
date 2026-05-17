import { useState, useEffect } from 'react'
import { useRouter } from '../context/RouterContext.jsx'
import { useModals } from '../context/ModalsContext.jsx'
import { useViewport } from '../hooks/useViewport.js'
import Img from '../components/shared/Img.jsx'
import { openWhatsApp } from '../utils/whatsapp.js'

const ALL_PRODUCTS = [
  { name: 'Ivory Sovereign Thobe', arabic: 'الثوب الملكي', cat: 'thobes', fabric: 'cotton', price: 1240, old: 1380, tag: 'BEST SELLER', occasion: 'everyday' },
  { name: 'Pearl Emirati Kandura', arabic: 'كندورة اللؤلؤ', cat: 'kanduras', fabric: 'cotton', price: 980, tag: "EDITORS' PICK", occasion: 'everyday' },
  { name: 'Obsidian Royal Bisht', arabic: 'بشت أسود', cat: 'bishts', fabric: 'wool', price: 4280, tag: 'MADE TO ORDER', occasion: 'wedding' },
  { name: 'Emerald Hooded Jubba', arabic: 'جبة خضراء', cat: 'jubbas', fabric: 'wool-blend', price: 1640, old: 1840, tag: 'NEW', occasion: 'festive' },
  { name: 'Sand Linen Thobe', arabic: 'ثوب الرمل', cat: 'thobes', fabric: 'linen', price: 890, occasion: 'everyday' },
  { name: 'Charcoal Diplomat', arabic: 'الدبلوماسي', cat: 'thobes', fabric: 'cotton', price: 1180, tag: 'DIPLOMATIC', occasion: 'business' },
  { name: 'Cream Festive Kandura', arabic: 'كندورة العيد', cat: 'kanduras', fabric: 'silk-blend', price: 1480, occasion: 'festive' },
  { name: 'Navy Ceremonial Bisht', arabic: 'بشت كحلي', cat: 'bishts', fabric: 'wool', price: 3680, tag: 'WEDDING', occasion: 'wedding' },
  { name: 'Sage Hooded Jubba', arabic: 'جبة بحرية', cat: 'jubbas', fabric: 'wool-blend', price: 1540, occasion: 'festive' },
  { name: 'Royal Saudi Thobe', arabic: 'ثوب سعودي', cat: 'thobes', fabric: 'cotton', price: 1060, tag: 'BEST SELLER', occasion: 'everyday' },
  { name: 'Black Eid Kandura', arabic: 'كندورة العيد', cat: 'kanduras', fabric: 'cotton', price: 1120, tag: 'EID', occasion: 'festive' },
  { name: 'Beige Camel Bisht', arabic: 'بشت جمل', cat: 'bishts', fabric: 'wool', price: 3940, occasion: 'wedding' },
]

function FilterGroup({ title, options, value, onChange }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 14 }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {options.map(([v, label]) => {
          const active = v === value
          return (
            <button key={v} onClick={() => onChange(v)} style={{ textAlign: 'left', fontSize: 14, padding: '8px 0', color: active ? 'var(--emerald)' : 'rgba(10,9,8,0.7)', fontWeight: active ? 600 : 400, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 16, height: 16, borderRadius: '50%', border: `1px solid ${active ? 'var(--emerald)' : 'rgba(10,9,8,0.25)'}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {active && <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--emerald)' }}/>}
              </span>
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ProductCard({ p, view, compact }) {
  const [hov, setHov] = useState(false)
  const { go } = useRouter()

  if (view === 'list') {
    return (
      <article onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={() => go('product')}
        style={{ display: 'grid', gridTemplateColumns: '240px 1fr auto', gap: 32, padding: 20, border: '1px solid rgba(10,9,8,0.08)', background: 'var(--paper)', cursor: 'pointer', transition: 'all 0.4s' }}>
        <Img label={p.name.toUpperCase()} style={{ aspectRatio: '3/4' }}/>
        <div style={{ paddingTop: 12 }}>
          {p.tag && <span style={{ fontSize: 9, letterSpacing: '0.2em', fontWeight: 600, color: 'var(--emerald)', marginBottom: 8, display: 'inline-block' }}>{p.tag}</span>}
          <h3 className="display" style={{ fontSize: 28, marginBottom: 8 }}>{p.name}</h3>
          <p className="arabic" style={{ fontSize: 22, color: 'var(--emerald)', opacity: 0.7, marginBottom: 12 }}>{p.arabic}</p>
          <p className="mono" style={{ opacity: 0.55 }}>{p.fabric.toUpperCase()} · {p.cat.toUpperCase()} · {p.occasion.toUpperCase()}</p>
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

  return (
    <article onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={() => go('product')} style={{ cursor: 'pointer', position: 'relative' }}>
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4', marginBottom: compact ? 10 : 20 }}>
        <Img label={p.name.toUpperCase()} style={{ height: '100%', transform: hov ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.6s var(--ease-out)', opacity: hov && !compact ? 0 : 1 }}/>
        {!compact && <Img variant="dark" label={`${p.name.toUpperCase()} · DETAIL`} style={{ position: 'absolute', inset: 0, height: '100%', opacity: hov ? 1 : 0, transition: 'opacity 0.5s' }}/>}
        {p.tag && <div style={{ position: 'absolute', top: compact ? 8 : 14, left: compact ? 8 : 14, background: 'var(--ink)', color: 'var(--ivory)', padding: compact ? '3px 7px' : '5px 10px', fontSize: compact ? 8 : 9, letterSpacing: '0.18em', fontWeight: 600 }}>{p.tag}</div>}
        {!compact && <button style={{ position: 'absolute', top: 14, right: 14, width: 34, height: 34, borderRadius: '50%', background: 'rgba(245,239,227,0.92)' }}>♡</button>}
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4, gap: 6 }}>
          <span className="mono" style={{ opacity: 0.55, fontSize: compact ? 9 : 10 }}>{p.fabric.toUpperCase()}</span>
          <span className="arabic" style={{ fontSize: compact ? 13 : 16, color: 'var(--emerald)', opacity: 0.7 }}>{p.arabic}</span>
        </div>
        <h3 className="display" style={{ fontSize: compact ? 16 : 22, lineHeight: 1.15, marginBottom: 6, fontWeight: 500 }}>{p.name}</h3>
        <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
          <span style={{ fontSize: compact ? 14 : 17, fontWeight: 600 }}>${p.price.toLocaleString()}</span>
          {p.old && <span style={{ fontSize: compact ? 11 : 13, textDecoration: 'line-through', opacity: 0.4 }}>${p.old}</span>}
        </div>
      </div>
    </article>
  )
}

function FilterSheet({ open, onClose, count, children }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open, onClose])

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 150, background: 'rgba(10,9,8,0.55)', opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity 0.3s' }}/>
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 151, background: 'var(--ivory)', borderTopLeftRadius: 16, borderTopRightRadius: 16, maxHeight: '88vh', transform: open ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.4s var(--ease-out)', boxShadow: '0 -20px 60px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
          <div style={{ width: 44, height: 4, borderRadius: 2, background: 'rgba(10,9,8,0.2)' }}/>
        </div>
        <div style={{ padding: '8px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(10,9,8,0.08)' }}>
          <h3 className="display" style={{ fontSize: 22, fontWeight: 500 }}>Filter</h3>
          <button onClick={onClose} style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6 }}>Close</button>
        </div>
        <div style={{ overflowY: 'auto', padding: '20px 20px 100px', flex: 1 }}>{children}</div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, background: 'var(--ivory)', borderTop: '1px solid rgba(10,9,8,0.08)' }}>
          <button onClick={onClose} className="btn btn-ink" style={{ width: '100%', height: 52, fontSize: 13 }}>
            Show {count} {count === 1 ? 'garment' : 'garments'}
          </button>
        </div>
      </div>
    </>
  )
}

function ContactStrip() {
  const { openAtelier } = useModals()
  return (
    <section style={{ background: 'var(--emerald)', color: 'var(--ivory)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
      <div className="geo-overlay" style={{ opacity: 0.08 }}/>
      <div className="container" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 60, alignItems: 'center' }}>
        <div>
          <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 12 }}>Can't find what you're looking for?</p>
          <h3 className="display" style={{ fontSize: 'clamp(36px, 4vw, 60px)', lineHeight: 1, fontWeight: 400 }}>
            Speak to our <span className="display-italic" style={{ color: 'var(--gold)' }}>concierge.</span>
          </h3>
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <button onClick={() => openWhatsApp('Hello KhanSaab — I\'d like concierge help.')} className="btn btn-gold">WhatsApp Concierge</button>
          <button onClick={openAtelier} className="btn btn-ghost">Book a Call</button>
        </div>
      </div>
    </section>
  )
}

export { ContactStrip }

export default function ProductsPage() {
  const { isPhone } = useViewport()
  const [filters, setFilters] = useState({ category: 'all', fabric: 'all', price: 'all', occasion: 'all' })
  const [sort, setSort] = useState('featured')
  const [view, setView] = useState('grid')
  const [filterOpen, setFilterOpen] = useState(false)

  const matches = ALL_PRODUCTS.filter(p =>
    (filters.category === 'all' || p.cat === filters.category) &&
    (filters.fabric === 'all' || p.fabric === filters.fabric) &&
    (filters.price === 'all' ||
      (filters.price === 'u1000' && p.price < 1000) ||
      (filters.price === '1000-2000' && p.price >= 1000 && p.price <= 2000) ||
      (filters.price === '2000+' && p.price > 2000)) &&
    (filters.occasion === 'all' || p.occasion === filters.occasion)
  )

  const activeFilterCount = Object.values(filters).filter(v => v !== 'all').length

  const filterRail = (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <p className="eyebrow" style={{ color: 'var(--emerald)' }}>Refine</p>
        <button onClick={() => setFilters({ category: 'all', fabric: 'all', price: 'all', occasion: 'all' })} style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.55 }}>Reset</button>
      </div>
      <FilterGroup title="Category" value={filters.category} onChange={v => setFilters({ ...filters, category: v })}
        options={[['all', 'All garments'], ['thobes', 'Thobes'], ['kanduras', 'Kanduras'], ['bishts', 'Bishts'], ['jubbas', 'Jubbas']]}/>
      <FilterGroup title="Fabric" value={filters.fabric} onChange={v => setFilters({ ...filters, fabric: v })}
        options={[['all', 'All fabrics'], ['cotton', 'Cotton'], ['linen', 'Linen'], ['wool', 'Wool'], ['wool-blend', 'Wool blend'], ['silk-blend', 'Silk blend']]}/>
      <FilterGroup title="Price" value={filters.price} onChange={v => setFilters({ ...filters, price: v })}
        options={[['all', 'Any'], ['u1000', 'Under $1,000'], ['1000-2000', '$1,000 – $2,000'], ['2000+', '$2,000 and above']]}/>
      <FilterGroup title="Occasion" value={filters.occasion} onChange={v => setFilters({ ...filters, occasion: v })}
        options={[['all', 'Any occasion'], ['everyday', 'Everyday'], ['festive', 'Festive · Eid'], ['wedding', 'Wedding'], ['business', 'Business · Diplomatic']]}/>
      <div style={{ marginTop: 40, padding: 20, background: 'var(--emerald)', color: 'var(--ivory)', position: 'relative', overflow: 'hidden' }}>
        <div className="geo-overlay" style={{ opacity: 0.1 }}/>
        <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 10 }}>Need help?</p>
        <p style={{ fontSize: 14, opacity: 0.85, marginBottom: 18, lineHeight: 1.55 }}>Our concierge will pick three pieces tailored to your event.</p>
        <button onClick={() => openWhatsApp("Hi! I'd like help finding a garment.")} style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', paddingBottom: 4, borderBottom: '1px solid var(--gold)' }}>Chat with concierge →</button>
      </div>
    </>
  )

  return (
    <main style={{ background: 'var(--ivory)', paddingTop: isPhone ? 96 : 120, minHeight: '100vh' }}>
      <section style={{ padding: isPhone ? '28px 0 24px' : '60px 0 60px', borderBottom: '1px solid rgba(10,9,8,0.08)' }}>
        <div className="container">
          <div className="mono" style={{ opacity: 0.55, marginBottom: isPhone ? 14 : 20, fontSize: 11 }}>Home  /  Collection  /  All</div>
          <span className="arabic" style={{ fontSize: isPhone ? 26 : 44, color: 'var(--emerald)', display: 'block', marginBottom: 8 }}>المجموعة الكاملة</span>
          <h1 className="display" style={{ fontSize: 'clamp(40px, 8vw, 128px)', lineHeight: 0.95, fontWeight: 400 }}>
            The full <span className="display-italic" style={{ color: 'var(--emerald)' }}>collection.</span>
          </h1>
          <p style={{ marginTop: isPhone ? 12 : 20, maxWidth: 540, fontSize: isPhone ? 14 : 16, opacity: 0.65 }}>
            <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{matches.length}</span> of <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{ALL_PRODUCTS.length}</span> hand-finished garments. Updated weekly.
          </p>
        </div>
      </section>

      {isPhone && (
        <div style={{ position: 'sticky', top: 64, zIndex: 30, background: 'var(--ivory)', borderBottom: '1px solid rgba(10,9,8,0.08)', display: 'flex', gap: 8, padding: '10px 16px' }}>
          <button onClick={() => setFilterOpen(true)} style={{ flex: 1, height: 44, border: '1px solid rgba(10,9,8,0.2)', borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, background: activeFilterCount ? 'var(--ink)' : 'transparent', color: activeFilterCount ? 'var(--ivory)' : 'inherit' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4"><line x1="2" y1="4" x2="12" y2="4"/><line x1="2" y1="10" x2="12" y2="10"/><circle cx="5" cy="4" r="1.5" fill="currentColor"/><circle cx="9" cy="10" r="1.5" fill="currentColor"/></svg>
            Filter {activeFilterCount > 0 && `· ${activeFilterCount}`}
          </button>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ flex: 1, height: 44, padding: '0 14px', border: '1px solid rgba(10,9,8,0.2)', background: 'transparent', fontFamily: 'var(--f-body)', fontSize: 12, borderRadius: 999, cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>
            <option value="featured">Sort · Featured</option>
            <option value="new">Sort · Newest</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
          </select>
        </div>
      )}

      {!isPhone && (
        <div className="container" style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 28, gap: 12, alignItems: 'center' }}>
          <span className="mono" style={{ opacity: 0.55 }}>Sort by</span>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ height: 42, padding: '0 16px', border: '1px solid rgba(10,9,8,0.18)', background: 'transparent', fontFamily: 'var(--f-body)', fontSize: 13, borderRadius: 999, cursor: 'pointer' }}>
            <option value="featured">Featured</option>
            <option value="new">Newest</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
          <div style={{ display: 'flex', border: '1px solid rgba(10,9,8,0.18)', borderRadius: 999 }}>
            <button onClick={() => setView('grid')} style={{ padding: '10px 14px', borderRadius: 999, background: view === 'grid' ? 'var(--ink)' : 'transparent', color: view === 'grid' ? 'var(--ivory)' : 'inherit' }}>⊞</button>
            <button onClick={() => setView('list')} style={{ padding: '10px 14px', borderRadius: 999, background: view === 'list' ? 'var(--ink)' : 'transparent', color: view === 'list' ? 'var(--ivory)' : 'inherit' }}>☰</button>
          </div>
        </div>
      )}

      <div className="container" style={{ display: 'grid', gridTemplateColumns: isPhone ? '1fr' : '260px 1fr', gap: isPhone ? 0 : 56, padding: isPhone ? '16px 0 64px' : '32px 0 120px' }}>
        {!isPhone && (
          <aside style={{ position: 'sticky', top: 120, alignSelf: 'start' }}>{filterRail}</aside>
        )}
        <div>
          {activeFilterCount > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: isPhone ? 16 : 24, padding: isPhone ? '0 16px' : 0 }}>
              {Object.entries(filters).filter(([_, v]) => v !== 'all').map(([k, v]) => (
                <button key={k} onClick={() => setFilters({ ...filters, [k]: 'all' })} style={{ padding: isPhone ? '6px 12px' : '8px 16px', borderRadius: 999, background: 'var(--ink)', color: 'var(--ivory)', fontSize: isPhone ? 10 : 11, letterSpacing: '0.16em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  {v.replace('-', ' – ')} ×
                </button>
              ))}
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: isPhone ? 'repeat(2, 1fr)' : (view === 'grid' ? 'repeat(3, 1fr)' : '1fr'), gap: isPhone ? 12 : (view === 'grid' ? 28 : 16), padding: isPhone ? '0 12px' : 0 }}>
            {matches.map((p, i) => <ProductCard key={i} p={p} view={isPhone ? 'grid' : view} compact={isPhone}/>)}
            {matches.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 60, opacity: 0.5 }}>
                <p className="display" style={{ fontSize: 28 }}>No garments match.</p>
                <p className="mono" style={{ marginTop: 12 }}>Try widening your filters.</p>
              </div>
            )}
          </div>
          {matches.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: isPhone ? 40 : 80, paddingTop: isPhone ? 24 : 40, borderTop: '1px solid rgba(10,9,8,0.08)', flexWrap: 'wrap', padding: isPhone ? '24px 16px 0' : '40px 0 0' }}>
              {['←', '1', '2', '3', '…', '8', '→'].map((b, i) => (
                <button key={i} style={{ minWidth: isPhone ? 38 : 44, height: isPhone ? 38 : 44, border: '1px solid rgba(10,9,8,0.15)', background: b === '1' ? 'var(--ink)' : 'transparent', color: b === '1' ? 'var(--ivory)' : 'inherit', fontSize: 13, borderRadius: 999 }}>{b}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      {isPhone && (
        <FilterSheet open={filterOpen} onClose={() => setFilterOpen(false)} count={matches.length}>
          {filterRail}
        </FilterSheet>
      )}

      <ContactStrip/>
    </main>
  )
}
