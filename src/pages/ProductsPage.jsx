
import { useState, useEffect } from 'react'
import { useViewport } from '../hooks/useViewport.js'
import { openWhatsApp } from '../utils/whatsapp.js'

// Data
import ALL_PRODUCTS from '../data/productPage/products.json'
import {
  CATEGORY_OPTIONS,
  FABRIC_OPTIONS,
  PRICE_OPTIONS,
  OCCASION_OPTIONS,
  SORT_OPTIONS,
  SEARCH_PLACEHOLDERS,
  DEFAULT_FILTERS,
} from '../data/productPage/filterOptions.js'

// Sub-components
import ProductCard   from '../components/productsP/ProductCard.jsx'
import FilterGroup   from '../components/productsP/FilterGroup.jsx'
import BottomSheet   from '../components/productsP/BottomSheet.jsx'
import FilterSheet   from '../components/productsP/FilterSheet.jsx'
import ContactStrip  from '../components/productsP/ContactStrip.jsx'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function applyFilters(products, filters, query) {
  const q = query.trim().toLowerCase()
  return products.filter(p =>
    (filters.category === 'all' || p.cat === filters.category) &&
    (filters.fabric   === 'all' || p.fabric === filters.fabric) &&
    (filters.price    === 'all' ||
      (filters.price === 'u1000'     && p.price < 1000) ||
      (filters.price === '1000-2000' && p.price >= 1000 && p.price <= 2000) ||
      (filters.price === '2000+'     && p.price > 2000)) &&
    (filters.occasion === 'all' || p.occasion === filters.occasion) &&
    (q === '' || p.name.toLowerCase().includes(q) || p.cat.includes(q) || p.fabric.includes(q))
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const { isPhone } = useViewport()

  // Filter / sort / view state
  const [filters,     setFilters]     = useState(DEFAULT_FILTERS)
  const [sort,        setSort]        = useState('featured')
  const [view,        setView]        = useState('grid')
  const [filterOpen,  setFilterOpen]  = useState(false)
  const [sortOpen,    setSortOpen]    = useState(false)
  const [query,       setQuery]       = useState('')

  // Animated search placeholder
  const [phIdx, setPhIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setPhIdx(i => (i + 1) % SEARCH_PLACEHOLDERS.length), 2800)
    return () => clearInterval(t)
  }, [])

  // Compact header on scroll (mobile)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Derived
  const matches         = applyFilters(ALL_PRODUCTS, filters, query)
  const activeFilterCount = Object.values(filters).filter(v => v !== 'all').length
  const sortLabel       = SORT_OPTIONS.find(s => s.v === sort)?.label || 'Featured'

  // ── Reusable filter rail (used in sidebar + FilterSheet) ──────────────────
  const filterRail = (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <p className="eyebrow" style={{ color: 'var(--emerald)' }}>Refine</p>
        <button
          onClick={() => setFilters(DEFAULT_FILTERS)}
          style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.55 }}
        >
          Reset
        </button>
      </div>

      <FilterGroup title="Category" value={filters.category} onChange={v => setFilters({ ...filters, category: v })} options={CATEGORY_OPTIONS} />
      <FilterGroup title="Fabric"   value={filters.fabric}   onChange={v => setFilters({ ...filters, fabric: v })}   options={FABRIC_OPTIONS}   />
      <FilterGroup title="Price"    value={filters.price}    onChange={v => setFilters({ ...filters, price: v })}    options={PRICE_OPTIONS}    />
      <FilterGroup title="Occasion" value={filters.occasion} onChange={v => setFilters({ ...filters, occasion: v })} options={OCCASION_OPTIONS} />

      {/* Concierge promo block */}
      <div style={{ marginTop: 40, padding: 20, background: 'var(--emerald)', color: 'var(--ivory)', position: 'relative', overflow: 'hidden' }}>
        <div className="geo-overlay" style={{ opacity: 0.1 }} />
        <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 10 }}>Need help?</p>
        <p style={{ fontSize: 14, opacity: 0.85, marginBottom: 18, lineHeight: 1.55 }}>
          Our concierge will pick three pieces tailored to your event.
        </p>
        <button
          onClick={() => openWhatsApp("Hi! I'd like help finding a garment.")}
          style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', paddingBottom: 4, borderBottom: '1px solid var(--gold)' }}
        >
          Chat with concierge →
        </button>
      </div>
    </>
  )

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <main style={{ background: 'var(--ivory)', paddingTop: isPhone ? 96 : 120, minHeight: '100vh' }}>

      {/* ── Desktop hero header ───────────────────────────────────────────── */}
      {!isPhone && (
        <section style={{ padding: '60px 0', borderBottom: '1px solid rgba(10,9,8,0.08)' }}>
          <div className="container">
            <div className="mono" style={{ opacity: 0.55, marginBottom: 20, fontSize: 11 }}>Home / Collection / All</div>
            <span className="arabic" style={{ fontSize: 44, color: 'var(--emerald)', display: 'block', marginBottom: 8 }}>المجموعة الكاملة</span>
            <h1 className="display" style={{ fontSize: 'clamp(40px, 8vw, 128px)', lineHeight: 0.95, fontWeight: 400 }}>
              The full <span className="display-italic" style={{ color: 'var(--emerald)' }}>collection.</span>
            </h1>
            <p style={{ marginTop: 20, maxWidth: 540, fontSize: 16, opacity: 0.65 }}>
              <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{matches.length}</span>
              {' '}of{' '}
              <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{ALL_PRODUCTS.length}</span>
              {' '}hand-finished garments. Updated weekly.
            </p>
          </div>
        </section>
      )}

      {/* ── Mobile sticky toolbar ─────────────────────────────────────────── */}
      {isPhone && (
        <div style={{ position: 'sticky', top: 102, zIndex: 30, background: 'var(--ivory)', borderBottom: '1px solid rgba(10,9,8,0.08)' }}>

          {/* Row 1: search + filter icon + sort icon */}
          <div style={{ display: 'flex', gap: 8, padding: scrolled ? '8px 12px' : '10px 12px', transition: 'padding 0.25s var(--ease-out)' }}>

            {/* Search input */}
            <label style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 8, height: 42, padding: '0 14px', background: 'var(--paper)', border: '1px solid rgba(10,9,8,0.12)', borderRadius: 999, position: 'relative' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.55, flexShrink: 0 }}>
                <circle cx="7" cy="7" r="5"/><path d="M11 11l3 3"/>
              </svg>
              <div style={{ flex: 1, minWidth: 0, position: 'relative', height: '100%' }}>
                <input
                  type="search" inputMode="search"
                  value={query} onChange={e => setQuery(e.target.value)}
                  aria-label="Search garments"
                  style={{ width: '100%', height: '100%', border: 0, outline: 0, background: 'transparent', fontFamily: 'var(--f-body)', fontSize: 14, color: 'var(--ink)', position: 'relative', zIndex: 1 }}
                />
                {!query && (
                  <span key={phIdx} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', fontSize: 14, color: 'rgba(10,9,8,0.4)', pointerEvents: 'none', animation: 'fadeUp 0.5s var(--ease-out)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {SEARCH_PLACEHOLDERS[phIdx]}
                  </span>
                )}
              </div>
              {query && (
                <button onClick={() => setQuery('')} aria-label="Clear search" style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(10,9,8,0.12)', color: 'var(--ink)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>×</button>
              )}
            </label>

            {/* Filter button */}
            <button onClick={() => setFilterOpen(true)} aria-label="Filter" style={{ flexShrink: 0, width: 42, height: 42, borderRadius: '50%', border: '1px solid rgba(10,9,8,0.18)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: activeFilterCount ? 'var(--ink)' : 'transparent', color: activeFilterCount ? 'var(--ivory)' : 'var(--ink)', position: 'relative' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="2" y1="5" x2="14" y2="5"/><line x1="2" y1="11" x2="14" y2="11"/>
                <circle cx="6" cy="5" r="1.8" fill="currentColor"/><circle cx="10" cy="11" r="1.8" fill="currentColor"/>
              </svg>
              {activeFilterCount > 0 && (
                <span style={{ position: 'absolute', top: -2, right: -2, minWidth: 16, height: 16, padding: '0 4px', borderRadius: 999, background: 'var(--gold)', color: 'var(--ink)', fontSize: 10, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort button */}
            <button onClick={() => setSortOpen(true)} aria-label={`Sort: ${sortLabel}`} style={{ flexShrink: 0, width: 42, height: 42, borderRadius: '50%', border: '1px solid rgba(10,9,8,0.18)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 3v10M4 13l-2-2M4 13l2-2"/>
                <path d="M12 13V3M12 3l-2 2M12 3l2 2"/>
              </svg>
            </button>
          </div>

          {/* Row 2: active filter chips */}
          {activeFilterCount > 0 && (
            <div style={{ display: 'flex', gap: 6, overflowX: 'auto', padding: '0 12px 10px', scrollbarWidth: 'none' }} data-no-scrollbar>
              <button onClick={() => setFilters(DEFAULT_FILTERS)} style={{ flex: '0 0 auto', height: 28, padding: '0 12px', borderRadius: 999, border: '1px solid rgba(10,9,8,0.18)', background: 'transparent', color: 'rgba(10,9,8,0.6)', fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' }}>
                Clear all
              </button>
              {Object.entries(filters).filter(([, v]) => v !== 'all').map(([k, v]) => (
                <button key={k} onClick={() => setFilters({ ...filters, [k]: 'all' })} style={{ flex: '0 0 auto', height: 28, padding: '0 10px 0 12px', borderRadius: 999, background: 'var(--ink)', color: 'var(--ivory)', fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  {v.replace('-', ' – ')} <span style={{ opacity: 0.7 }}>×</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Desktop sort / view-toggle bar ───────────────────────────────── */}
      {!isPhone && (
        <div className="container" style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 28, gap: 12, alignItems: 'center' }}>
          <span className="mono" style={{ opacity: 0.55 }}>Sort by</span>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ height: 42, padding: '0 16px', border: '1px solid rgba(10,9,8,0.18)', background: 'transparent', fontFamily: 'var(--f-body)', fontSize: 13, borderRadius: 999, cursor: 'pointer' }}>
            {SORT_OPTIONS.map(s => <option key={s.v} value={s.v}>{s.label}</option>)}
          </select>
          <div style={{ display: 'flex', border: '1px solid rgba(10,9,8,0.18)', borderRadius: 999 }}>
            <button onClick={() => setView('grid')} style={{ padding: '10px 14px', borderRadius: 999, background: view === 'grid' ? 'var(--ink)' : 'transparent', color: view === 'grid' ? 'var(--ivory)' : 'inherit' }}>⊞</button>
            <button onClick={() => setView('list')} style={{ padding: '10px 14px', borderRadius: 999, background: view === 'list' ? 'var(--ink)' : 'transparent', color: view === 'list' ? 'var(--ivory)' : 'inherit' }}>☰</button>
          </div>
        </div>
      )}

      {/* ── Main content: sidebar + product grid ─────────────────────────── */}
      <div className="container" style={{ display: 'grid', gridTemplateColumns: isPhone ? '1fr' : '260px 1fr', gap: isPhone ? 0 : 56, padding: isPhone ? '16px 0 64px' : '32px 0 120px' }}>

        {/* Desktop filter sidebar */}
        {!isPhone && (
          <aside style={{ position: 'sticky', top: 120, alignSelf: 'start' }}>{filterRail}</aside>
        )}

        {/* Product area */}
        <div>
          {/* Active filter chips (desktop) */}
          {activeFilterCount > 0 && !isPhone && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {Object.entries(filters).filter(([, v]) => v !== 'all').map(([k, v]) => (
                <button key={k} onClick={() => setFilters({ ...filters, [k]: 'all' })} style={{ padding: '8px 16px', borderRadius: 999, background: 'var(--ink)', color: 'var(--ivory)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  {v.replace('-', ' – ')} ×
                </button>
              ))}
            </div>
          )}

          {/* Grid / list */}
          <div style={{ display: 'grid', gridTemplateColumns: isPhone ? 'repeat(2, 1fr)' : (view === 'grid' ? 'repeat(3, 1fr)' : '1fr'), gap: isPhone ? 12 : (view === 'grid' ? 28 : 16), padding: isPhone ? '0 12px' : 0 }}>
            {matches.map((p, i) => (
              <ProductCard key={i} p={p} view={isPhone ? 'grid' : view} compact={isPhone} />
            ))}
            {matches.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 60, opacity: 0.5 }}>
                <p className="display" style={{ fontSize: 28 }}>No garments match.</p>
                <p className="mono" style={{ marginTop: 12 }}>Try widening your filters.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {matches.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: isPhone ? 40 : 80, paddingTop: isPhone ? 24 : 40, borderTop: '1px solid rgba(10,9,8,0.08)', flexWrap: 'wrap', padding: isPhone ? '24px 16px 0' : '40px 0 0' }}>
              {['←', '1', '2', '3', '…', '8', '→'].map((b, i) => (
                <button key={i} style={{ minWidth: isPhone ? 38 : 44, height: isPhone ? 38 : 44, border: '1px solid rgba(10,9,8,0.15)', background: b === '1' ? 'var(--ink)' : 'transparent', color: b === '1' ? 'var(--ivory)' : 'inherit', fontSize: 13, borderRadius: 999 }}>
                  {b}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile sheets ─────────────────────────────────────────────────── */}
      {isPhone && (
        <>
          <FilterSheet open={filterOpen} onClose={() => setFilterOpen(false)} count={matches.length}>
            {filterRail}
          </FilterSheet>

          <BottomSheet open={sortOpen} onClose={() => setSortOpen(false)} title="Sort by">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {SORT_OPTIONS.map(s => {
                const active = s.v === sort
                return (
                  <button key={s.v} onClick={() => { setSort(s.v); setSortOpen(false) }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 4px', borderBottom: '1px solid rgba(10,9,8,0.06)', fontSize: 15, color: active ? 'var(--emerald)' : 'var(--ink)', fontWeight: active ? 600 : 400 }}>
                    {s.label}
                    {active && <span style={{ color: 'var(--emerald)' }}>✓</span>}
                  </button>
                )
              })}
            </div>
          </BottomSheet>
        </>
      )}

      {/* ── Footer contact strip ──────────────────────────────────────────── */}
      <ContactStrip />
    </main>
  )
}