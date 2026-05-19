import { useState } from 'react'
import { useModals } from '../context/ModalsContext.jsx'
import { useViewport } from '../hooks/useViewport.js'
import Img from '../components/shared/Img.jsx'
import { openWhatsApp } from '../utils/whatsapp.js'
import  ProductCard from './ProductsPage.jsx'
import ContactStrip from '../components/productsP/ContactStrip.jsx'

import MagnifyImage from '../components/productDetailPg/MagnifyImage.jsx'
import MobileGallery from '../components/productDetailPg/MobileGallery.jsx'
import Selector from '../components/productDetailPg/Selector.jsx'
import PRODUCT from '../data/productDetailPage/productData.json'

export default function ProductDetailPage() {
  const { openSizeGuide } = useModals()
  const { isPhone } = useViewport()
  const [activeImg, setActiveImg] = useState(0)
  const [activeFabric, setActiveFabric] = useState(0)
  const [activeSize, setActiveSize] = useState('52')
  const [activeColor, setActiveColor] = useState(0)
  const [acc, setAcc] = useState('details')

  const ctaHandler = () =>
    openWhatsApp(`Hello KhanSaab — I'd like to book a fitting for the ${PRODUCT.name} (size EU ${activeSize}).`)

  // Accordion body renderer — "details" tab renders feature list, others render plain text
  const renderAccordionBody = (a) => {
    if (a.type === 'features') {
      return (
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 8 }}>
          {PRODUCT.features.map((f, i) => (
            <li key={i} style={{ display: 'flex', gap: 14 }}>
              <span style={{ color: 'var(--gold)' }}>{f.i}</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{f.t}</p>
                <p style={{ fontSize: 13, opacity: 0.7 }}>{f.d}</p>
              </div>
            </li>
          ))}
        </ul>
      )
    }
    return <p style={{ fontSize: 14, lineHeight: 1.7, opacity: 0.75, paddingTop: 8 }}>{a.body}</p>
  }

  return (
    <main style={{
      background: 'var(--ivory)',
      paddingTop: isPhone ? 84 : 110,
      paddingBottom: isPhone ? 88 : 0,
      minHeight: '100vh',
    }}>

      {/* Breadcrumb */}
      <div className="container" style={{ padding: isPhone ? '12px 0 4px' : '20px 0' }}>
        <div className="mono" style={{ opacity: 0.55, fontSize: isPhone ? 10 : 11, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {isPhone ? (
            <>← Thobes  /  <span style={{ color: 'var(--ink)' }}>{PRODUCT.name}</span></>
          ) : (
            <>Home  /  Collection  /  Thobes  /  <span style={{ color: 'var(--ink)' }}>{PRODUCT.name}</span></>
          )}
        </div>
      </div>

      {/* Hero: Gallery + Info */}
      <section className="container" style={{
        display: 'grid',
        gridTemplateColumns: isPhone ? '1fr' : '1.3fr 1fr',
        gap: isPhone ? 28 : 64,
        padding: isPhone ? '12px 0 40px' : '20px 0 80px',
      }}>

        {/* ── Gallery ── */}
        {isPhone ? (
          <MobileGallery images={PRODUCT.gallery} tag={PRODUCT.tag} active={activeImg} setActive={setActiveImg}/>
        ) : (
          <div data-product-gallery style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 16 }}>
            {/* Thumbnail rail */}
            <div data-thumb-rail style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {PRODUCT.gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  style={{
                    aspectRatio: '3/4',
                    border: i === activeImg ? '1px solid var(--ink)' : '1px solid transparent',
                    padding: 3, opacity: i === activeImg ? 1 : 0.6, transition: 'all 0.3s',
                  }}
                >
                  <Img label={`${String(i + 1).padStart(2, '0')}`} src={g.src} style={{ height: '100%', width: '100%' }}/>
                </button>
              ))}
            </div>

            {/* Main image with magnifier */}
            <div style={{ position: 'sticky', top: 110, alignSelf: 'start' }}>
              <MagnifyImage label={PRODUCT.gallery[activeImg].label} src={PRODUCT.gallery[activeImg].src} aspectRatio="3/4">
                {PRODUCT.tag && (
                  <div style={{
                    position: 'absolute', top: 16, left: 16,
                    background: 'var(--ink)', color: 'var(--ivory)',
                    padding: '8px 14px', fontSize: 10, letterSpacing: '0.22em', fontWeight: 600,
                    zIndex: 2, pointerEvents: 'none',
                  }}>{PRODUCT.tag}</div>
                )}
                <button
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: 'absolute', top: 16, right: 16,
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'rgba(245,239,227,0.92)', backdropFilter: 'blur(6px)',
                    fontSize: 16, zIndex: 2,
                  }}
                >♡</button>
                <div style={{
                  position: 'absolute', bottom: 16, right: 16, padding: '6px 12px',
                  background: 'rgba(10,9,8,0.65)', color: 'var(--ivory)',
                  fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.15em',
                  backdropFilter: 'blur(6px)', zIndex: 2, pointerEvents: 'none',
                }}>
                  {String(activeImg + 1).padStart(2, '0')} / {String(PRODUCT.gallery.length).padStart(2, '0')}
                </div>
                <div style={{
                  position: 'absolute', bottom: 16, left: 16, padding: '6px 12px',
                  background: 'rgba(10,9,8,0.65)', color: 'var(--ivory)',
                  fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.15em',
                  backdropFilter: 'blur(6px)', zIndex: 2, pointerEvents: 'none',
                }}>
                  ⊕ MOVE TO ZOOM
                </div>
              </MagnifyImage>
            </div>
          </div>
        )}

        {/* ── Product Info ── */}
        <div>
          {/* Rating row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: isPhone ? 8 : 14, marginBottom: 14, flexWrap: 'wrap' }}>
            <div style={{ color: 'var(--gold)', letterSpacing: '0.1em', fontSize: 14 }}>★★★★★</div>
            <span className="mono" style={{ opacity: 0.6, fontSize: isPhone ? 10 : 11 }}>{PRODUCT.rating} · {PRODUCT.reviews} reviews</span>
            {!isPhone && <span className="mono" style={{ opacity: 0.45 }}>· SKU {PRODUCT.sku}</span>}
          </div>

          <p className="arabic" style={{ fontSize: isPhone ? 22 : 28, color: 'var(--emerald)', opacity: 0.85, marginBottom: 6 }}>{PRODUCT.arabic}</p>
          <h1 className="display" style={{ fontSize: 'clamp(30px, 7vw, 64px)', lineHeight: 1.05, fontWeight: 400, marginBottom: 12, letterSpacing: '-0.01em' }}>{PRODUCT.name}</h1>
          <p className="mono" style={{ opacity: 0.55, marginBottom: 20, fontSize: isPhone ? 10 : 11 }}>{PRODUCT.cat}</p>

          {/* Price */}
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12,
            paddingBottom: isPhone ? 20 : 28, borderBottom: '1px solid rgba(10,9,8,0.1)', flexWrap: 'wrap',
          }}>
            <span style={{ fontSize: isPhone ? 28 : 36, fontWeight: 600, fontFamily: 'var(--f-display)' }}>${PRODUCT.price.toLocaleString()}</span>
            {PRODUCT.old && (
              <span style={{ fontSize: isPhone ? 15 : 18, textDecoration: 'line-through', opacity: 0.45 }}>${PRODUCT.old.toLocaleString()}</span>
            )}
            <span style={{ marginLeft: 'auto', padding: '4px 10px', background: 'var(--emerald)', color: 'var(--ivory)', fontSize: 10, letterSpacing: '0.2em', fontWeight: 600 }}>
              SAVE ${PRODUCT.old - PRODUCT.price}
            </span>
          </div>

          <p style={{ fontSize: isPhone ? 14 : 15, lineHeight: 1.7, opacity: 0.78, marginTop: 20, marginBottom: 28 }}>{PRODUCT.desc}</p>

          {/* Colour selector */}
          <Selector label="Colour" sub={PRODUCT.colors[activeColor].name}>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {PRODUCT.colors.map((c, i) => (
                <button
                  key={i} onClick={() => setActiveColor(i)}
                  title={c.name} aria-label={c.name}
                  style={{
                    width: 40, height: 40, borderRadius: '50%', background: c.hex,
                    border: i === activeColor ? '2px solid var(--ink)' : '1px solid rgba(10,9,8,0.15)',
                    boxShadow: i === activeColor ? '0 0 0 3px var(--ivory) inset' : 'none',
                    transition: 'all 0.3s',
                  }}
                />
              ))}
            </div>
          </Selector>

          {/* Fabric selector */}
          <Selector label="Fabric" sub={PRODUCT.fabrics[activeFabric].name}>
            <div style={{ display: 'grid', gridTemplateColumns: isPhone ? '1fr' : '1fr 1fr 1fr', gap: 8 }}>
              {PRODUCT.fabrics.map((f, i) => (
                <button
                  key={i} onClick={() => setActiveFabric(i)}
                  style={{
                    padding: '14px 16px',
                    border: i === activeFabric ? '1px solid var(--ink)' : '1px solid rgba(10,9,8,0.15)',
                    background: i === activeFabric ? 'var(--ink)' : 'transparent',
                    color: i === activeFabric ? 'var(--ivory)' : 'var(--ink)',
                    textAlign: 'left', transition: 'all 0.3s',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{f.name}</div>
                    <div style={{ fontSize: 10, opacity: 0.65, fontFamily: 'var(--f-mono)' }}>{f.desc}</div>
                  </div>
                  {isPhone && i === activeFabric && <span style={{ color: 'var(--gold)' }}>✓</span>}
                </button>
              ))}
            </div>
          </Selector>

          {/* Size selector */}
          <Selector
            label="Size"
            sub={isPhone ? `EU ${activeSize}` : `EU ${activeSize} · 6 ft 1 in fits ${activeSize}`}
            action={
              <button onClick={openSizeGuide} style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'underline' }}>
                Size guide ↗
              </button>
            }
          >
            <div style={{ display: 'grid', gridTemplateColumns: isPhone ? 'repeat(6, 1fr)' : 'none', gap: 8, gridAutoFlow: isPhone ? 'row' : undefined }}>
              {!isPhone ? (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {PRODUCT.sizes.map(s => (
                    <button
                      key={s} onClick={() => setActiveSize(s)}
                      style={{
                        minWidth: 56, height: 48,
                        border: s === activeSize ? '1px solid var(--ink)' : '1px solid rgba(10,9,8,0.15)',
                        background: s === activeSize ? 'var(--ink)' : 'transparent',
                        color: s === activeSize ? 'var(--ivory)' : 'var(--ink)',
                        fontSize: 13, fontWeight: 500, transition: 'all 0.3s',
                      }}
                    >{s}</button>
                  ))}
                  <button style={{ minWidth: 110, height: 48, border: '1px dashed rgba(10,9,8,0.3)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--emerald)' }}>
                    + Made to measure
                  </button>
                </div>
              ) : (
                <>
                  {PRODUCT.sizes.map(s => (
                    <button
                      key={s} onClick={() => setActiveSize(s)}
                      style={{
                        height: 50,
                        border: s === activeSize ? '1px solid var(--ink)' : '1px solid rgba(10,9,8,0.15)',
                        background: s === activeSize ? 'var(--ink)' : 'transparent',
                        color: s === activeSize ? 'var(--ivory)' : 'var(--ink)',
                        fontSize: 14, fontWeight: 500, transition: 'all 0.3s',
                      }}
                    >{s}</button>
                  ))}
                  <button style={{ gridColumn: '1 / -1', height: 46, border: '1px dashed rgba(10,9,8,0.3)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--emerald)' }}>
                    + Made to measure
                  </button>
                </>
              )}
            </div>
          </Selector>

          {/* Desktop CTA */}
          {!isPhone && (
            <>
              <button
                onClick={ctaHandler}
                className="btn btn-gold"
                style={{ width: '100%', marginTop: 36, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}
              >
                <WhatsAppIcon size={18}/>
                Book a Fitting Appointment
              </button>
              <p className="mono" style={{ marginTop: 10, fontSize: 11, opacity: 0.55, textAlign: 'center' }}>
                Opens WhatsApp · +91 89750 48440 · Replies within an hour
              </p>
            </>
          )}

          {/* Shipping perks grid */}
          <div style={{
            marginTop: isPhone ? 28 : 32,
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: isPhone ? 14 : 8,
            padding: '20px 0',
            borderTop: '1px solid rgba(10,9,8,0.1)',
            borderBottom: '1px solid rgba(10,9,8,0.1)',
          }}>
            {PRODUCT.shippingPerks.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--gold)' }}>{s.i}</span>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{s.t}</p>
                  <p className="mono" style={{ opacity: 0.55, fontSize: 10, marginTop: 2 }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Accordion */}
          <div style={{ marginTop: isPhone ? 24 : 32 }}>
            {PRODUCT.accordion.map(a => (
              <div key={a.id} style={{ borderTop: '1px solid rgba(10,9,8,0.1)' }}>
                <button
                  onClick={() => setAcc(acc === a.id ? '' : a.id)}
                  style={{
                    width: '100%', padding: '20px 0',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    fontSize: 13, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}
                >
                  {a.t}
                  <span style={{ fontSize: 18, transition: 'transform 0.3s', transform: acc === a.id ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                </button>
                {acc === a.id && (
                  <div style={{ paddingBottom: 24, animation: 'fadeIn 0.4s var(--ease-out)' }}>
                    {renderAccordionBody(a)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Making */}
      <section style={{ background: 'var(--paper)', padding: isPhone ? '72px 0' : '120px 0', position: 'relative' }}>
        <div className="container">
          <header style={{ textAlign: 'center', marginBottom: isPhone ? 40 : 64 }}>
            <p className="eyebrow" style={{ color: 'var(--emerald)', marginBottom: 14 }}>HOW IT IS MADE</p>
            <h2 className="display" style={{ fontSize: 'clamp(32px, 7vw, 72px)', lineHeight: 1.05, fontWeight: 400 }}>
              Fourteen days. <span className="display-italic" style={{ color: 'var(--emerald)' }}>One garment.</span>
            </h2>
          </header>
          <div style={{ display: 'grid', gridTemplateColumns: isPhone ? '1fr 1fr' : 'repeat(4, 1fr)', gap: isPhone ? 18 : 24 }}>
            {PRODUCT.makingSteps.map((s, i) => (
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
          <header style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            marginBottom: isPhone ? 32 : 56, flexWrap: 'wrap', gap: 20,
          }}>
            <div>
              <p className="eyebrow" style={{ color: 'var(--emerald)', marginBottom: 14 }}>
                {PRODUCT.reviews.total} REVIEWS · ★★★★★ {PRODUCT.reviews.rating}
              </p>
              <h2 className="display" style={{ fontSize: 'clamp(32px, 7vw, 72px)', lineHeight: 1.05, fontWeight: 400 }}>
                What men <span className="display-italic" style={{ color: 'var(--emerald)' }}>say.</span>
              </h2>
            </div>
            <button className="btn btn-ghost-dark">Write a review</button>
          </header>

          {/* Rating breakdown */}
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
              <p className="display" style={{ fontSize: isPhone ? 64 : 96, color: 'var(--emerald)', lineHeight: 0.95 }}>{PRODUCT.reviews.rating}</p>
              <div>
                <p style={{ color: 'var(--gold)', letterSpacing: '0.18em', fontSize: isPhone ? 16 : 18 }}>★★★★★</p>
                <p className="mono" style={{ opacity: 0.55, marginTop: 8, fontSize: isPhone ? 10 : 11 }}>Based on {PRODUCT.reviews.total} reviews</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignSelf: 'center', width: '100%' }}>
              {PRODUCT.reviews.breakdown.map(([n, c]) => (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span className="mono" style={{ minWidth: 32, fontSize: isPhone ? 10 : 11 }}>{n}★</span>
                  <div style={{ flex: 1, height: 6, background: 'rgba(10,9,8,0.08)' }}>
                    <div style={{ width: `${(c / PRODUCT.reviews.total) * 100}%`, height: '100%', background: 'var(--emerald)' }}/>
                  </div>
                  <span className="mono" style={{ opacity: 0.55, minWidth: 32, textAlign: 'right', fontSize: isPhone ? 10 : 11 }}>{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Review cards */}
          {isPhone ? (
            <div style={{
              display: 'flex', gap: 14, overflowX: 'auto', scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none',
              marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)',
              padding: '0 24px',
            }}>
              {PRODUCT.reviews.items.map((r, i) => (
                <ReviewCard key={i} r={r} isPhone={isPhone}/>
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {PRODUCT.reviews.items.map((r, i) => (
                <ReviewCard key={i} r={r} isPhone={isPhone}/>
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
            {PRODUCT.relatedProducts.map((p, i) => (
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
          <button
            onClick={ctaHandler}
            className="btn btn-gold"
            style={{ flex: 1, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 13, letterSpacing: '0.14em' }}
          >
            <WhatsAppIcon size={16}/>
            Book Fitting
          </button>
        </div>
      )}
    </main>
  )
}

// ─── Local helpers ────────────────────────────────────────────────────────────

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.5 3.5A11 11 0 0 0 3.7 17.8L2.5 22l4.3-1.1A11 11 0 1 0 20.5 3.5Zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-2.6.7.7-2.5-.2-.3A9 9 0 1 1 12 20.5Zm5-6.7c-.3-.2-1.6-.8-1.9-.9-.3-.1-.5-.1-.7.2l-.9 1.2c-.2.2-.4.2-.7.1-1-.4-2-1-2.8-2-.2-.3-.2-.5 0-.7l.3-.4c.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5l-.7-1.8c-.2-.5-.5-.4-.7-.4h-.5c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.2.2 2.1 3.2 5 4.4 1.5.6 2.1.6 2.9.5.5-.1 1.6-.7 1.9-1.4.2-.7.2-1.2.2-1.4 0-.2-.2-.3-.5-.5Z"/>
    </svg>
  )
}

function ReviewCard({ r, isPhone }) {
  const style = isPhone
    ? { flex: '0 0 82%', scrollSnapAlign: 'center', padding: 22, background: 'var(--paper)', border: '1px solid rgba(10,9,8,0.06)' }
    : { padding: 28, background: 'var(--paper)', border: '1px solid rgba(10,9,8,0.06)' }

  return (
    <article style={style}>
      <p style={{ color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: isPhone ? 14 : 16 }}>{'★'.repeat(r.stars)}</p>
      <h3 className="display" style={{ fontSize: isPhone ? 20 : 22, marginBottom: isPhone ? 12 : 14 }}>{r.t}</h3>
      <p style={{ fontSize: isPhone ? 13.5 : 14, lineHeight: isPhone ? 1.65 : 1.7, opacity: 0.78, marginBottom: isPhone ? 20 : 24 }}>"{r.b}"</p>
      <div style={{ paddingTop: isPhone ? 14 : 16, borderTop: '1px solid rgba(10,9,8,0.08)' }}>
        <p style={{ fontSize: 13, fontWeight: 600 }}>{r.n}</p>
        <p className="mono" style={{ opacity: 0.55, marginTop: 2, fontSize: isPhone ? 10 : undefined }}>{r.v}</p>
      </div>
    </article>
  )
}