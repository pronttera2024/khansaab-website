import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useModals } from '../context/ModalsContext.jsx'
import { useViewport } from '../hooks/useViewport.js'
import Img from '../components/shared/Img.jsx'
import { openWhatsApp } from '../utils/whatsapp.js'
import { ContactStrip, ProductCard } from './ProductsPage.jsx'
import { getProductById, getProductForPDP, getRelatedProducts } from '../data/products.js'
import { PRODUCT_REVIEWS, REVIEW_HISTOGRAM } from '../data/testimonials.js'
import { SHIPPING_BADGES, PDP_MAKING_STEPS } from '../data/content.js'
import { WHATSAPP_MESSAGES, CONTACT } from '../data/site-config.js'

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
  const { id } = useParams()
  const PRODUCT = getProductForPDP(getProductById(id))
  const RELATED = getRelatedProducts(PRODUCT.id)
  const { openSizeGuide, openAtelier } = useModals()
  const { isPhone } = useViewport()
  const [activeImg, setActiveImg] = useState(0)
  const [activeSize, setActiveSize] = useState((PRODUCT.sizes && PRODUCT.sizes[0]) || '')
  const [acc, setAcc] = useState('details')

  const ctaHandler = () => openWhatsApp(WHATSAPP_MESSAGES.fitting(PRODUCT.name, activeSize))

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
              <div style={{ position: 'relative', aspectRatio: '3/4', width: '100%', overflow: 'hidden' }}>
                <Img label={PRODUCT.gallery[activeImg].label} src={PRODUCT.gallery[activeImg].src} style={{ aspectRatio: '3/4', width: '100%', height: '100%' }}/>
                {PRODUCT.tag && <div style={{ position: 'absolute', top: 16, left: 16, background: 'var(--ink)', color: 'var(--ivory)', padding: '8px 14px', fontSize: 10, letterSpacing: '0.22em', fontWeight: 600, zIndex: 2, pointerEvents: 'none' }}>{PRODUCT.tag}</div>}
                <div style={{ position: 'absolute', bottom: 16, right: 16, padding: '6px 12px', background: 'rgba(10,9,8,0.65)', color: 'var(--ivory)', fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.15em', backdropFilter: 'blur(6px)', zIndex: 2, pointerEvents: 'none' }}>
                  {String(activeImg + 1).padStart(2, '0')} / {String(PRODUCT.gallery.length).padStart(2, '0')}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: isPhone ? 8 : 14, marginBottom: 14, flexWrap: 'wrap' }}>
            <div style={{ color: 'var(--gold)', letterSpacing: '0.1em', fontSize: 14 }}>★★★★★</div>
            <span className="mono" style={{ opacity: 0.6, fontSize: isPhone ? 10 : 11 }}>{PRODUCT.rating} · {PRODUCT.reviews} reviews</span>
          </div>

          <p className="arabic" style={{ fontSize: isPhone ? 22 : 28, color: 'var(--emerald)', opacity: 0.85, marginBottom: 6 }}>{PRODUCT.arabic}</p>
          <h1 className="display" style={{ fontSize: 'clamp(30px, 7vw, 64px)', lineHeight: 1.05, fontWeight: 400, marginBottom: 12, letterSpacing: '-0.01em' }}>{PRODUCT.name}</h1>
          <p className="mono" style={{ opacity: 0.55, marginBottom: 20, fontSize: isPhone ? 10 : 11 }}>{PRODUCT.cat}</p>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12, paddingBottom: isPhone ? 20 : 28, borderBottom: '1px solid rgba(10,9,8,0.1)', flexWrap: 'wrap' }}>
            <span style={{ fontSize: isPhone ? 28 : 36, fontWeight: 600, fontFamily: 'var(--f-display)' }}>₹{PRODUCT.price.toLocaleString()}</span>
            {PRODUCT.old && <span style={{ fontSize: isPhone ? 15 : 18, textDecoration: 'line-through', opacity: 0.45 }}>₹{PRODUCT.old.toLocaleString()}</span>}
            <span style={{ marginLeft: 'auto', padding: '4px 10px', background: 'var(--emerald)', color: 'var(--ivory)', fontSize: 10, letterSpacing: '0.2em', fontWeight: 600 }}>SAVE ₹{PRODUCT.old - PRODUCT.price}</span>
          </div>

          <p style={{ fontSize: isPhone ? 14 : 15, lineHeight: 1.7, opacity: 0.78, marginTop: 20, marginBottom: 28 }}>{PRODUCT.desc}</p>

          {PRODUCT.sizes.length > 0 && (
          <Selector label="Size" sub={isPhone ? `${activeSize}` : `${activeSize}`}
            action={<button onClick={openSizeGuide} style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'underline' }}>Size guide ↗</button>}>
            <div style={{ display: 'grid', gridTemplateColumns: isPhone ? 'repeat(6, 1fr)' : 'none', gap: 8, gridAutoFlow: isPhone ? 'row' : undefined }}>
              {!isPhone ? (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {PRODUCT.sizes.map(s => (
                    <button key={s} onClick={() => setActiveSize(s)} style={{ minWidth: 56, height: 48, border: s === activeSize ? '1px solid var(--ink)' : '1px solid rgba(10,9,8,0.15)', background: s === activeSize ? 'var(--ink)' : 'transparent', color: s === activeSize ? 'var(--ivory)' : 'var(--ink)', fontSize: 13, fontWeight: 500, transition: 'all 0.3s' }}>{s}</button>
                  ))}
                  <button onClick={openAtelier} style={{ minWidth: 110, height: 48, border: '1px dashed rgba(10,9,8,0.3)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--emerald)' }}>+ Made to measure</button>
                </div>
              ) : (
                <>
                  {PRODUCT.sizes.map(s => (
                    <button key={s} onClick={() => setActiveSize(s)} style={{ height: 50, border: s === activeSize ? '1px solid var(--ink)' : '1px solid rgba(10,9,8,0.15)', background: s === activeSize ? 'var(--ink)' : 'transparent', color: s === activeSize ? 'var(--ivory)' : 'var(--ink)', fontSize: 14, fontWeight: 500, transition: 'all 0.3s' }}>{s}</button>
                  ))}
                  <button onClick={openAtelier} style={{ gridColumn: '1 / -1', height: 46, border: '1px dashed rgba(10,9,8,0.3)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--emerald)' }}>+ Made to measure</button>
                </>
              )}
            </div>
          </Selector>
          )}

          {!isPhone && (
            <>
              <button onClick={ctaHandler}
                className="btn btn-gold"
                style={{ width: '100%', marginTop: 36, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Book a Fitting Appointment
              </button>
              <p className="mono" style={{ marginTop: 10, fontSize: 11, opacity: 0.55, textAlign: 'center' }}>Opens WhatsApp · {CONTACT.phoneDisplay} · {CONTACT.sla}</p>
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
            {SHIPPING_BADGES.map((s, i) => (
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
              { id: 'ship', t: 'Shipping & returns', body: <p style={{ fontSize: 14, lineHeight: 1.7, opacity: 0.75, paddingTop: 8 }}>Free shipping across India. Delivery within 5-7 business days. Metro cities may receive earlier. Returns accepted within 10 days of delivery in original condition. Made-to-measure orders are final sale.</p> },
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
            {PDP_MAKING_STEPS.map((s, i) => (
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
              {REVIEW_HISTOGRAM.distribution.map(([n, c]) => (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span className="mono" style={{ minWidth: 32, fontSize: isPhone ? 10 : 11 }}>{n}★</span>
                  <div style={{ flex: 1, height: 6, background: 'rgba(10,9,8,0.08)' }}><div style={{ width: `${(c / REVIEW_HISTOGRAM.total) * 100}%`, height: '100%', background: 'var(--emerald)' }}/></div>
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
              {PRODUCT_REVIEWS.map((r, i) => (
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
              {PRODUCT_REVIEWS.map((r, i) => (
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
            {RELATED.map((p, i) => (
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
            <p className="mono" style={{ fontSize: 9.5, opacity: 0.55, letterSpacing: '0.18em' }}>{activeSize}</p>
            <p style={{ fontSize: 18, fontWeight: 600, fontFamily: 'var(--f-display)', lineHeight: 1.1 }}>₹{PRODUCT.price.toLocaleString()}</p>
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
