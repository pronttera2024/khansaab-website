import { useState, useRef, useEffect } from 'react'
import { useModals } from '../context/ModalsContext.jsx'
import { useViewport } from '../hooks/useViewport.js'
import Img from '../components/shared/Img.jsx'
import { openWhatsApp } from '../utils/whatsapp.js'
import { ContactStrip, ProductCard } from './ProductsPage.jsx'

function imgSeed(label) {
  const s = String(label || 'khansaab')
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h % 1000
}

function MagnifyImage({ label, src, zoom = 2.5, lensSize = 220, aspectRatio = '3/4', children }) {
  const containerRef = useRef(null)
  const lensRef = useRef(null)
  const [active, setActive] = useState(false)
  const seed = imgSeed(label)
  const hiResUrl = src || `https://picsum.photos/seed/khansaab-${seed}/1600/2000`

  const handleMove = (e) => {
    const el = containerRef.current
    const lens = lensRef.current
    if (!el || !lens) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      setActive(false)
      return
    }
    const half = lensSize / 2
    const bgW = rect.width * zoom
    const bgH = rect.height * zoom
    lens.style.left = `${x - half}px`
    lens.style.top = `${y - half}px`
    lens.style.backgroundSize = `${bgW}px ${bgH}px`
    lens.style.backgroundPosition = `${-(x * zoom - half)}px ${-(y * zoom - half)}px`
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onMouseMove={handleMove}
      style={{ position: 'relative', aspectRatio, width: '100%', cursor: active ? 'crosshair' : 'zoom-in', overflow: 'hidden' }}
    >
      <Img label={label} src={src} style={{ aspectRatio, width: '100%', height: '100%' }}/>
      {children}
      <div
        ref={lensRef}
        aria-hidden
        style={{
          position: 'absolute', pointerEvents: 'none', left: 0, top: 0,
          width: lensSize, height: lensSize, borderRadius: '50%',
          border: '2px solid var(--gold)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.6) inset',
          backgroundImage: `url(${hiResUrl})`,
          backgroundRepeat: 'no-repeat',
          opacity: active ? 1 : 0,
          transform: active ? 'scale(1)' : 'scale(0.6)',
          transition: 'opacity 0.2s var(--ease-out), transform 0.25s var(--ease-out)',
          willChange: 'left, top, background-position',
        }}
      />
    </div>
  )
}

const PRODUCT = {
  name: 'The Ivory Sovereign Thobe',
  arabic: 'الثوب الملكي',
  cat: 'Saudi Thobe · Hand-stitched',
  sku: 'KS-TH-IVS-2026',
  price: 1240, old: 1380,
  rating: 4.9, reviews: 247,
  tag: 'BEST SELLER',
  desc: 'Our signature ankle-length Saudi thobe in heavyweight ivory Japanese cotton. Hand-cut by a single artisan, finished over 14 working days, and signed on the inner placket. The Sovereign features our quartet collar, mother-of-pearl tarboosh and pearl-stitched cuffs.',
  fabrics: [
    { name: 'Heavyweight cotton', arabic: 'قطن ثقيل', desc: '260 GSM · Suruga, Japan' },
    { name: 'Lightweight linen', arabic: 'كتان خفيف', desc: 'Belgium · Summer cut' },
    { name: 'Silk-cotton blend', arabic: 'حرير و قطن', desc: '70/30 · Ceremonial' },
  ],
  sizes: ['48', '50', '52', '54', '56', '58'],
  colors: [
    { name: 'Ivory', hex: '#F5EFE3' }, { name: 'Pearl', hex: '#EAE2D1' },
    { name: 'Sand', hex: '#D4C2A1' }, { name: 'Stone', hex: '#9A8B6F' },
  ],
  gallery: [
    { label: 'IVORY SOVEREIGN · FRONT FULL', src: '/assets/thobe_ivory.png' },
    { label: 'IVORY SOVEREIGN · COLLAR DETAIL', src: '/assets/about_2.png' },
    { label: 'IVORY SOVEREIGN · CUFF + TARBOOSH', src: '/assets/reel_1.png' },
    { label: 'IVORY SOVEREIGN · BACK · STUDIO', src: '/assets/ref_1.jpg' },
    { label: 'IVORY SOVEREIGN · WORN · OUTDOOR', src: '/assets/about_3.png' },
  ],
  features: [
    { i: '✦', t: 'Quartet collar', d: 'Four-piece tailored collar with mother-of-pearl tarboosh.' },
    { i: '✦', t: 'Hand-stitched cuffs', d: '60 stitches per cm in pearl-grey silk thread.' },
    { i: '✦', t: 'Signed placket', d: "The maker's name stitched on the inside." },
    { i: '✦', t: '14-day finish', d: 'From cutting bench to your box, signed and dated.' },
  ],
}

function Selector({ label, sub, action, children }) {
  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12, gap: 12, flexWrap: 'wrap' }}>
        <div>
          <span style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600 }}>{label}</span>
          {sub && <span className="mono" style={{ marginLeft: 12, opacity: 0.55 }}>{sub}</span>}
        </div>
        {action}
      </div>
      {children}
    </div>
  )
}

function MobileGallery({ images, tag, active, setActive }) {
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
        <div style={{ position: 'absolute', top: 14, left: 14, background: 'var(--ink)', color: 'var(--ivory)', padding: '7px 12px', fontSize: 9.5, letterSpacing: '0.22em', fontWeight: 600 }}>{tag}</div>
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

export default function ProductDetailPage() {
  const { openSizeGuide } = useModals()
  const { isPhone } = useViewport()
  const [activeImg, setActiveImg] = useState(0)
  const [activeFabric, setActiveFabric] = useState(0)
  const [activeSize, setActiveSize] = useState('52')
  const [activeColor, setActiveColor] = useState(0)
  const [acc, setAcc] = useState('details')

  const ctaHandler = () => openWhatsApp(`Hello KhanSaab — I'd like to book a fitting for the ${PRODUCT.name} (size EU ${activeSize}).`)

  return (
    <main style={{
      background: 'var(--ivory)',
      paddingTop: isPhone ? 84 : 110,
      paddingBottom: isPhone ? 88 : 0,
      minHeight: '100vh',
    }}>
      <div className="container" style={{ padding: isPhone ? '12px 0 4px' : '20px 0' }}>
        <div className="mono" style={{ opacity: 0.55, fontSize: isPhone ? 10 : 11, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {isPhone ? (
            <>← Thobes  /  <span style={{ color: 'var(--ink)' }}>{PRODUCT.name}</span></>
          ) : (
            <>Home  /  Collection  /  Thobes  /  <span style={{ color: 'var(--ink)' }}>{PRODUCT.name}</span></>
          )}
        </div>
      </div>

      <section className="container" style={{
        display: 'grid',
        gridTemplateColumns: isPhone ? '1fr' : '1.3fr 1fr',
        gap: isPhone ? 28 : 64,
        padding: isPhone ? '12px 0 40px' : '20px 0 80px',
      }}>
        {/* Gallery */}
        {isPhone ? (
          <MobileGallery images={PRODUCT.gallery} tag={PRODUCT.tag} active={activeImg} setActive={setActiveImg}/>
        ) : (
          <div data-product-gallery style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 16 }}>
            <div data-thumb-rail style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {PRODUCT.gallery.map((g, i) => (
                <button key={i} onClick={() => setActiveImg(i)} style={{ aspectRatio: '3/4', border: i === activeImg ? '1px solid var(--ink)' : '1px solid transparent', padding: 3, opacity: i === activeImg ? 1 : 0.6, transition: 'all 0.3s' }}>
                  <Img label={`${String(i + 1).padStart(2, '0')}`} src={g.src} style={{ height: '100%', width: '100%' }}/>
                </button>
              ))}
            </div>
            <div style={{ position: 'sticky', top: 110, alignSelf: 'start' }}>
              <MagnifyImage label={PRODUCT.gallery[activeImg].label} src={PRODUCT.gallery[activeImg].src} aspectRatio="3/4">
                {PRODUCT.tag && <div style={{ position: 'absolute', top: 16, left: 16, background: 'var(--ink)', color: 'var(--ivory)', padding: '8px 14px', fontSize: 10, letterSpacing: '0.22em', fontWeight: 600, zIndex: 2, pointerEvents: 'none' }}>{PRODUCT.tag}</div>}
                <button onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', top: 16, right: 16, width: 44, height: 44, borderRadius: '50%', background: 'rgba(245,239,227,0.92)', backdropFilter: 'blur(6px)', fontSize: 16, zIndex: 2 }}>♡</button>
                <div style={{ position: 'absolute', bottom: 16, right: 16, padding: '6px 12px', background: 'rgba(10,9,8,0.65)', color: 'var(--ivory)', fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.15em', backdropFilter: 'blur(6px)', zIndex: 2, pointerEvents: 'none' }}>
                  {String(activeImg + 1).padStart(2, '0')} / {String(PRODUCT.gallery.length).padStart(2, '0')}
                </div>
                <div style={{ position: 'absolute', bottom: 16, left: 16, padding: '6px 12px', background: 'rgba(10,9,8,0.65)', color: 'var(--ivory)', fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.15em', backdropFilter: 'blur(6px)', zIndex: 2, pointerEvents: 'none' }}>
                  ⊕ MOVE TO ZOOM
                </div>
              </MagnifyImage>
            </div>
          </div>
        )}

        {/* Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: isPhone ? 8 : 14, marginBottom: 14, flexWrap: 'wrap' }}>
            <div style={{ color: 'var(--gold)', letterSpacing: '0.1em', fontSize: 14 }}>★★★★★</div>
            <span className="mono" style={{ opacity: 0.6, fontSize: isPhone ? 10 : 11 }}>{PRODUCT.rating} · {PRODUCT.reviews} reviews</span>
            {!isPhone && <span className="mono" style={{ opacity: 0.45 }}>· SKU {PRODUCT.sku}</span>}
          </div>

          <p className="arabic" style={{ fontSize: isPhone ? 22 : 28, color: 'var(--emerald)', opacity: 0.85, marginBottom: 6 }}>{PRODUCT.arabic}</p>
          <h1 className="display" style={{ fontSize: 'clamp(30px, 7vw, 64px)', lineHeight: 1.05, fontWeight: 400, marginBottom: 12, letterSpacing: '-0.01em' }}>{PRODUCT.name}</h1>
          <p className="mono" style={{ opacity: 0.55, marginBottom: 20, fontSize: isPhone ? 10 : 11 }}>{PRODUCT.cat}</p>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12, paddingBottom: isPhone ? 20 : 28, borderBottom: '1px solid rgba(10,9,8,0.1)', flexWrap: 'wrap' }}>
            <span style={{ fontSize: isPhone ? 28 : 36, fontWeight: 600, fontFamily: 'var(--f-display)' }}>${PRODUCT.price.toLocaleString()}</span>
            {PRODUCT.old && <span style={{ fontSize: isPhone ? 15 : 18, textDecoration: 'line-through', opacity: 0.45 }}>${PRODUCT.old.toLocaleString()}</span>}
            <span style={{ marginLeft: 'auto', padding: '4px 10px', background: 'var(--emerald)', color: 'var(--ivory)', fontSize: 10, letterSpacing: '0.2em', fontWeight: 600 }}>SAVE ${PRODUCT.old - PRODUCT.price}</span>
          </div>

          <p style={{ fontSize: isPhone ? 14 : 15, lineHeight: 1.7, opacity: 0.78, marginTop: 20, marginBottom: 28 }}>{PRODUCT.desc}</p>

          <Selector label="Colour" sub={PRODUCT.colors[activeColor].name}>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {PRODUCT.colors.map((c, i) => (
                <button key={i} onClick={() => setActiveColor(i)} title={c.name} aria-label={c.name} style={{ width: 40, height: 40, borderRadius: '50%', background: c.hex, border: i === activeColor ? '2px solid var(--ink)' : '1px solid rgba(10,9,8,0.15)', boxShadow: i === activeColor ? '0 0 0 3px var(--ivory) inset' : 'none', transition: 'all 0.3s' }}/>
              ))}
            </div>
          </Selector>

          <Selector label="Fabric" sub={PRODUCT.fabrics[activeFabric].name}>
            <div style={{ display: 'grid', gridTemplateColumns: isPhone ? '1fr' : '1fr 1fr 1fr', gap: 8 }}>
              {PRODUCT.fabrics.map((f, i) => (
                <button key={i} onClick={() => setActiveFabric(i)} style={{ padding: '14px 16px', border: i === activeFabric ? '1px solid var(--ink)' : '1px solid rgba(10,9,8,0.15)', background: i === activeFabric ? 'var(--ink)' : 'transparent', color: i === activeFabric ? 'var(--ivory)' : 'var(--ink)', textAlign: 'left', transition: 'all 0.3s', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{f.name}</div>
                    <div style={{ fontSize: 10, opacity: 0.65, fontFamily: 'var(--f-mono)' }}>{f.desc}</div>
                  </div>
                  {isPhone && i === activeFabric && <span style={{ color: 'var(--gold)' }}>✓</span>}
                </button>
              ))}
            </div>
          </Selector>

          <Selector label="Size" sub={isPhone ? `EU ${activeSize}` : `EU ${activeSize} · 6 ft 1 in fits ${activeSize}`}
            action={<button onClick={openSizeGuide} style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'underline' }}>Size guide ↗</button>}>
            <div style={{ display: 'grid', gridTemplateColumns: isPhone ? 'repeat(6, 1fr)' : 'none', gap: 8, gridAutoFlow: isPhone ? 'row' : undefined }}>
              {!isPhone ? (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {PRODUCT.sizes.map(s => (
                    <button key={s} onClick={() => setActiveSize(s)} style={{ minWidth: 56, height: 48, border: s === activeSize ? '1px solid var(--ink)' : '1px solid rgba(10,9,8,0.15)', background: s === activeSize ? 'var(--ink)' : 'transparent', color: s === activeSize ? 'var(--ivory)' : 'var(--ink)', fontSize: 13, fontWeight: 500, transition: 'all 0.3s' }}>{s}</button>
                  ))}
                  <button style={{ minWidth: 110, height: 48, border: '1px dashed rgba(10,9,8,0.3)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--emerald)' }}>+ Made to measure</button>
                </div>
              ) : (
                <>
                  {PRODUCT.sizes.map(s => (
                    <button key={s} onClick={() => setActiveSize(s)} style={{ height: 50, border: s === activeSize ? '1px solid var(--ink)' : '1px solid rgba(10,9,8,0.15)', background: s === activeSize ? 'var(--ink)' : 'transparent', color: s === activeSize ? 'var(--ivory)' : 'var(--ink)', fontSize: 14, fontWeight: 500, transition: 'all 0.3s' }}>{s}</button>
                  ))}
                  <button style={{ gridColumn: '1 / -1', height: 46, border: '1px dashed rgba(10,9,8,0.3)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--emerald)' }}>+ Made to measure</button>
                </>
              )}
            </div>
          </Selector>

          {!isPhone && (
            <>
              <button onClick={ctaHandler}
                className="btn btn-gold"
                style={{ width: '100%', marginTop: 36, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.5 3.5A11 11 0 0 0 3.7 17.8L2.5 22l4.3-1.1A11 11 0 1 0 20.5 3.5Zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-2.6.7.7-2.5-.2-.3A9 9 0 1 1 12 20.5Zm5-6.7c-.3-.2-1.6-.8-1.9-.9-.3-.1-.5-.1-.7.2l-.9 1.2c-.2.2-.4.2-.7.1-1-.4-2-1-2.8-2-.2-.3-.2-.5 0-.7l.3-.4c.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5l-.7-1.8c-.2-.5-.5-.4-.7-.4h-.5c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.2.2 2.1 3.2 5 4.4 1.5.6 2.1.6 2.9.5.5-.1 1.6-.7 1.9-1.4.2-.7.2-1.2.2-1.4 0-.2-.2-.3-.5-.5Z"/>
                </svg>
                Book a Fitting Appointment
              </button>
              <p className="mono" style={{ marginTop: 10, fontSize: 11, opacity: 0.55, textAlign: 'center' }}>Opens WhatsApp · +91 89750 48440 · Replies within an hour</p>
            </>
          )}

          <div style={{
            marginTop: isPhone ? 28 : 32,
            display: 'grid',
            gridTemplateColumns: isPhone ? '1fr 1fr' : '1fr 1fr',
            gap: isPhone ? 14 : 8,
            padding: '20px 0',
            borderTop: '1px solid rgba(10,9,8,0.1)',
            borderBottom: '1px solid rgba(10,9,8,0.1)',
          }}>
            {[
              { i: '✦', t: 'Free worldwide shipping', d: 'Express · 3-5 days' },
              { i: '✦', t: 'Lifetime alterations', d: 'Free re-fit at any age' },
              { i: '✦', t: '30-day returns', d: 'Full refund · No questions' },
              { i: '✦', t: 'Heirloom box', d: 'Hand-folded in tissue' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--gold)' }}>{s.i}</span>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{s.t}</p>
                  <p className="mono" style={{ opacity: 0.55, fontSize: 10, marginTop: 2 }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: isPhone ? 24 : 32 }}>
            {[
              { id: 'details', t: 'The detail', body: (
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 8 }}>
                  {PRODUCT.features.map((f, i) => (
                    <li key={i} style={{ display: 'flex', gap: 14 }}>
                      <span style={{ color: 'var(--gold)' }}>{f.i}</span>
                      <div><p style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{f.t}</p><p style={{ fontSize: 13, opacity: 0.7 }}>{f.d}</p></div>
                    </li>
                  ))}
                </ul>
              )},
              { id: 'fit', t: 'Fit & sizing', body: <p style={{ fontSize: 14, lineHeight: 1.7, opacity: 0.75, paddingTop: 8 }}>The Sovereign sits true to size. A six-foot-one wearer with a 102 cm chest fits EU 52. For a roomier silhouette, size up one. For made-to-measure, book a 30-minute video appointment.</p> },
              { id: 'care', t: 'Care', body: <p style={{ fontSize: 14, lineHeight: 1.7, opacity: 0.75, paddingTop: 8 }}>Dry-clean only. Press inside out on a low setting. Avoid direct sunlight when stored. We will press and refresh your garment free of charge at any KhanSaab atelier.</p> },
              { id: 'ship', t: 'Shipping & returns', body: <p style={{ fontSize: 14, lineHeight: 1.7, opacity: 0.75, paddingTop: 8 }}>Complimentary express shipping worldwide. UAE: 1-2 days. Gulf: 2-4 days. Rest of world: 3-7 days. Returns accepted within 30 days. Made-to-measure orders are final sale.</p> },
            ].map(a => (
              <div key={a.id} style={{ borderTop: '1px solid rgba(10,9,8,0.1)' }}>
                <button onClick={() => setAcc(acc === a.id ? '' : a.id)} style={{ width: '100%', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {a.t}
                  <span style={{ fontSize: 18, transition: 'transform 0.3s', transform: acc === a.id ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                </button>
                {acc === a.id && <div style={{ paddingBottom: 24, animation: 'fadeIn 0.4s var(--ease-out)' }}>{a.body}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The making */}
      <section style={{ background: 'var(--paper)', padding: isPhone ? '72px 0' : '120px 0', position: 'relative' }}>
        <div className="container">
          <header style={{ textAlign: 'center', marginBottom: isPhone ? 40 : 64 }}>
            <p className="eyebrow" style={{ color: 'var(--emerald)', marginBottom: 14 }}>HOW IT IS MADE</p>
            <h2 className="display" style={{ fontSize: 'clamp(32px, 7vw, 72px)', lineHeight: 1.05, fontWeight: 400 }}>
              Fourteen days. <span className="display-italic" style={{ color: 'var(--emerald)' }}>One garment.</span>
            </h2>
          </header>
          <div style={{ display: 'grid', gridTemplateColumns: isPhone ? '1fr 1fr' : 'repeat(4, 1fr)', gap: isPhone ? 18 : 24 }}>
            {[
              { d: 'Day 01', t: 'Pattern', body: 'A paper pattern is cut to your measurements.', src: '/assets/reel_6.png' },
              { d: 'Day 02-04', t: 'Cloth', body: 'Heavyweight cotton is laid, marked and cut by hand.', src: '/assets/about_1.png' },
              { d: 'Day 05-11', t: 'Stitch', body: '60 stitches per cm. By a single artisan.', src: '/assets/reel_1.png' },
              { d: 'Day 12-14', t: 'Finish', body: 'Pressed, packed and signed on the inner placket.', src: '/assets/reel_7.png' },
            ].map((s, i) => (
              <div key={i}>
                <Img label={`STEP ${i + 1}`} src={s.src} style={{ aspectRatio: '16/9', marginBottom: 14 }}/>
                <p className="mono" style={{ color: 'var(--gold-warm)', marginBottom: 6, fontSize: isPhone ? 10 : 11 }}>{s.d}</p>
                <h3 className="display" style={{ fontSize: isPhone ? 20 : 26, marginBottom: 6 }}>{s.t}</h3>
                <p style={{ fontSize: 13, opacity: 0.7, lineHeight: 1.55 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section style={{ padding: isPhone ? '72px 0' : '120px 0', background: 'var(--ivory)' }}>
        <div className="container">
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: isPhone ? 32 : 56, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <p className="eyebrow" style={{ color: 'var(--emerald)', marginBottom: 14 }}>247 REVIEWS · ★★★★★ 4.9</p>
              <h2 className="display" style={{ fontSize: 'clamp(32px, 7vw, 72px)', lineHeight: 1.05, fontWeight: 400 }}>
                What men <span className="display-italic" style={{ color: 'var(--emerald)' }}>say.</span>
              </h2>
            </div>
            <button className="btn btn-ghost-dark">Write a review</button>
          </header>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isPhone ? '1fr' : '320px 1fr',
            gap: isPhone ? 24 : 64,
            padding: isPhone ? '24px 0' : '32px 0',
            borderTop: '1px solid rgba(10,9,8,0.1)',
            borderBottom: '1px solid rgba(10,9,8,0.1)',
            marginBottom: isPhone ? 32 : 56,
          }}>
            <div style={{ display: 'flex', alignItems: isPhone ? 'center' : 'flex-start', gap: isPhone ? 20 : 0, flexDirection: isPhone ? 'row' : 'column' }}>
              <p className="display" style={{ fontSize: isPhone ? 64 : 96, color: 'var(--emerald)', lineHeight: 0.95 }}>4.9</p>
              <div>
                <p style={{ color: 'var(--gold)', letterSpacing: '0.18em', fontSize: isPhone ? 16 : 18 }}>★★★★★</p>
                <p className="mono" style={{ opacity: 0.55, marginTop: 8, fontSize: isPhone ? 10 : 11 }}>Based on 247 reviews</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignSelf: 'center', width: '100%' }}>
              {[[5, 218], [4, 22], [3, 5], [2, 1], [1, 1]].map(([n, c]) => (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span className="mono" style={{ minWidth: 32, fontSize: isPhone ? 10 : 11 }}>{n}★</span>
                  <div style={{ flex: 1, height: 6, background: 'rgba(10,9,8,0.08)' }}><div style={{ width: `${(c / 247) * 100}%`, height: '100%', background: 'var(--emerald)' }}/></div>
                  <span className="mono" style={{ opacity: 0.55, minWidth: 32, textAlign: 'right', fontSize: isPhone ? 10 : 11 }}>{c}</span>
                </div>
              ))}
            </div>
          </div>
          {isPhone ? (
            <div style={{
              display: 'flex', gap: 14, overflowX: 'auto', scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none',
              marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)',
              padding: '0 24px',
            }}>
              {[
                { stars: 5, t: 'Worth every dirham', b: 'The fit is impeccable. Three fittings, one perfect garment. I will not buy a thobe elsewhere again.', n: 'Hassan A.', v: 'Verified · Bought EU 52' },
                { stars: 5, t: 'Wedding-ready in 14 days', b: "Ordered in a panic for my brother's wedding. Arrived on day 12, signed and pressed. Made me cry, honestly.", n: 'Tariq M.', v: 'Verified · Bought EU 50' },
                { stars: 5, t: 'Best thobe I have owned', b: "Compared side by side with three other 'luxury' brands. KhanSaab wins on cloth, stitch and shoulder. Effortless.", n: 'Omar K.', v: 'Verified · Bought EU 54' },
              ].map((r, i) => (
                <article key={i} style={{ flex: '0 0 82%', scrollSnapAlign: 'center', padding: 22, background: 'var(--paper)', border: '1px solid rgba(10,9,8,0.06)' }}>
                  <p style={{ color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: 14 }}>{'★'.repeat(r.stars)}</p>
                  <h3 className="display" style={{ fontSize: 20, marginBottom: 12 }}>{r.t}</h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.65, opacity: 0.78, marginBottom: 20 }}>"{r.b}"</p>
                  <div style={{ paddingTop: 14, borderTop: '1px solid rgba(10,9,8,0.08)' }}>
                    <p style={{ fontSize: 13, fontWeight: 600 }}>{r.n}</p>
                    <p className="mono" style={{ opacity: 0.55, marginTop: 2, fontSize: 10 }}>{r.v}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {[
                { stars: 5, t: 'Worth every dirham', b: 'The fit is impeccable. Three fittings, one perfect garment. I will not buy a thobe elsewhere again.', n: 'Hassan A.', v: 'Verified · Bought EU 52' },
                { stars: 5, t: 'Wedding-ready in 14 days', b: "Ordered in a panic for my brother's wedding. Arrived on day 12, signed and pressed. Made me cry, honestly.", n: 'Tariq M.', v: 'Verified · Bought EU 50' },
                { stars: 5, t: 'Best thobe I have owned', b: "Compared side by side with three other 'luxury' brands. KhanSaab wins on cloth, stitch and shoulder. Effortless.", n: 'Omar K.', v: 'Verified · Bought EU 54' },
              ].map((r, i) => (
                <article key={i} style={{ padding: 28, background: 'var(--paper)', border: '1px solid rgba(10,9,8,0.06)' }}>
                  <p style={{ color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: 16 }}>{'★'.repeat(r.stars)}</p>
                  <h3 className="display" style={{ fontSize: 22, marginBottom: 14 }}>{r.t}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, opacity: 0.78, marginBottom: 24 }}>"{r.b}"</p>
                  <div style={{ paddingTop: 16, borderTop: '1px solid rgba(10,9,8,0.08)' }}>
                    <p style={{ fontSize: 13, fontWeight: 600 }}>{r.n}</p>
                    <p className="mono" style={{ opacity: 0.55, marginTop: 2 }}>{r.v}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* You may also love */}
      <section style={{ padding: isPhone ? '72px 0' : '120px 0', background: 'var(--paper)' }}>
        <div className="container">
          <header style={{ textAlign: 'center', marginBottom: isPhone ? 36 : 56 }}>
            <p className="eyebrow" style={{ color: 'var(--emerald)', marginBottom: 14 }}>YOU MAY ALSO LOVE</p>
            <h2 className="display" style={{ fontSize: 'clamp(32px, 7vw, 72px)', lineHeight: 1.05, fontWeight: 400 }}>
              Pair the <span className="display-italic" style={{ color: 'var(--emerald)' }}>Sovereign.</span>
            </h2>
          </header>
          <div style={{ display: 'grid', gridTemplateColumns: isPhone ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isPhone ? 12 : 24 }}>
            {[
              { name: 'Pearl Emirati Kandura', arabic: 'كندورة اللؤلؤ', cat: 'kanduras', fabric: 'cotton', price: 980, tag: "EDITORS' PICK", src: '/assets/hero_1.png' },
              { name: 'Obsidian Royal Bisht', arabic: 'بشت أسود', cat: 'bishts', fabric: 'wool', price: 4280, tag: 'MADE TO ORDER', src: '/assets/bisht_black.png' },
              { name: 'White Yemeni Shemagh', arabic: 'شماغ يمني', cat: 'accessories', fabric: 'cotton', price: 240, src: '/assets/shemagh.png' },
              { name: 'Amber Misbaha Set', arabic: 'مسبحة عنبر', cat: 'accessories', fabric: 'amber', price: 380, old: 440, tag: 'NEW', src: '/assets/accessories.png' },
            ].map((p, i) => (
              <ProductCard key={i} p={p} view="grid" compact={isPhone}/>
            ))}
          </div>
        </div>
      </section>

      <ContactStrip/>

      {/* Mobile sticky CTA bar */}
      {isPhone && (
        <div style={{
          position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 80,
          background: 'rgba(245,239,227,0.96)',
          backdropFilter: 'blur(14px)',
          borderTop: '1px solid rgba(10,9,8,0.1)',
          padding: '10px 16px calc(10px + env(safe-area-inset-bottom))',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ flex: '0 0 auto', minWidth: 0 }}>
            <p className="mono" style={{ fontSize: 9.5, opacity: 0.55, letterSpacing: '0.18em' }}>EU {activeSize} · {PRODUCT.colors[activeColor].name}</p>
            <p style={{ fontSize: 18, fontWeight: 600, fontFamily: 'var(--f-display)', lineHeight: 1.1 }}>${PRODUCT.price.toLocaleString()}</p>
          </div>
          <button onClick={ctaHandler} className="btn btn-gold" style={{
            flex: 1, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 10, fontSize: 13, letterSpacing: '0.14em',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.5 3.5A11 11 0 0 0 3.7 17.8L2.5 22l4.3-1.1A11 11 0 1 0 20.5 3.5Zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-2.6.7.7-2.5-.2-.3A9 9 0 1 1 12 20.5Zm5-6.7c-.3-.2-1.6-.8-1.9-.9-.3-.1-.5-.1-.7.2l-.9 1.2c-.2.2-.4.2-.7.1-1-.4-2-1-2.8-2-.2-.3-.2-.5 0-.7l.3-.4c.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5l-.7-1.8c-.2-.5-.5-.4-.7-.4h-.5c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.2.2 2.1 3.2 5 4.4 1.5.6 2.1.6 2.9.5.5-.1 1.6-.7 1.9-1.4.2-.7.2-1.2.2-1.4 0-.2-.2-.3-.5-.5Z"/>
            </svg>
            Book Fitting
          </button>
        </div>
      )}
    </main>
  )
}
