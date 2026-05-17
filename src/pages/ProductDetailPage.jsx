import { useState } from 'react'
import { useModals } from '../context/ModalsContext.jsx'
import Img from '../components/shared/Img.jsx'
import { openWhatsApp } from '../utils/whatsapp.js'
import { ContactStrip } from './ProductsPage.jsx'

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
    'IVORY SOVEREIGN · FRONT FULL', 'IVORY SOVEREIGN · COLLAR DETAIL',
    'IVORY SOVEREIGN · CUFF + TARBOOSH', 'IVORY SOVEREIGN · BACK · STUDIO',
    'IVORY SOVEREIGN · WORN · OUTDOOR',
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
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

export default function ProductDetailPage() {
  const { openSizeGuide } = useModals()
  const [activeImg, setActiveImg] = useState(0)
  const [activeFabric, setActiveFabric] = useState(0)
  const [activeSize, setActiveSize] = useState('52')
  const [activeColor, setActiveColor] = useState(0)
  const [acc, setAcc] = useState('details')

  return (
    <main style={{ background: 'var(--ivory)', paddingTop: 110, minHeight: '100vh' }}>
      <div className="container" style={{ padding: '20px 0' }}>
        <div className="mono" style={{ opacity: 0.55 }}>
          Home  /  Collection  /  Thobes  /  <span style={{ color: 'var(--ink)' }}>{PRODUCT.name}</span>
        </div>
      </div>

      <section className="container" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 64, padding: '20px 0 80px' }}>
        {/* Gallery */}
        <div data-product-gallery style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 16 }}>
          <div data-thumb-rail style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PRODUCT.gallery.map((g, i) => (
              <button key={i} onClick={() => setActiveImg(i)} style={{ aspectRatio: '3/4', border: i === activeImg ? '1px solid var(--ink)' : '1px solid transparent', padding: 3, opacity: i === activeImg ? 1 : 0.6, transition: 'all 0.3s' }}>
                <Img label={`${String(i + 1).padStart(2, '0')}`} style={{ height: '100%', width: '100%' }}/>
              </button>
            ))}
          </div>
          <div style={{ position: 'sticky', top: 110, alignSelf: 'start' }}>
            <div style={{ position: 'relative' }}>
              <Img label={PRODUCT.gallery[activeImg]} style={{ aspectRatio: '3/4', width: '100%' }}/>
              {PRODUCT.tag && <div style={{ position: 'absolute', top: 16, left: 16, background: 'var(--ink)', color: 'var(--ivory)', padding: '8px 14px', fontSize: 10, letterSpacing: '0.22em', fontWeight: 600 }}>{PRODUCT.tag}</div>}
              <button style={{ position: 'absolute', top: 16, right: 16, width: 44, height: 44, borderRadius: '50%', background: 'rgba(245,239,227,0.92)', backdropFilter: 'blur(6px)', fontSize: 16 }}>♡</button>
              <div style={{ position: 'absolute', bottom: 16, right: 16, padding: '6px 12px', background: 'rgba(10,9,8,0.65)', color: 'var(--ivory)', fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.15em', backdropFilter: 'blur(6px)' }}>
                {String(activeImg + 1).padStart(2, '0')} / {String(PRODUCT.gallery.length).padStart(2, '0')}
              </div>
              <div style={{ position: 'absolute', bottom: 16, left: 16, padding: '6px 12px', background: 'rgba(10,9,8,0.65)', color: 'var(--ivory)', fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.15em', backdropFilter: 'blur(6px)' }}>
                ⊕ HOVER TO ZOOM
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <div style={{ color: 'var(--gold)', letterSpacing: '0.1em', fontSize: 14 }}>★★★★★</div>
            <span className="mono" style={{ opacity: 0.6 }}>{PRODUCT.rating} · {PRODUCT.reviews} reviews</span>
            <span className="mono" style={{ opacity: 0.45 }}>· SKU {PRODUCT.sku}</span>
          </div>

          <p className="arabic" style={{ fontSize: 28, color: 'var(--emerald)', opacity: 0.85, marginBottom: 8 }}>{PRODUCT.arabic}</p>
          <h1 className="display" style={{ fontSize: 'clamp(40px, 4vw, 64px)', lineHeight: 1.02, fontWeight: 400, marginBottom: 14, letterSpacing: '-0.01em' }}>{PRODUCT.name}</h1>
          <p className="mono" style={{ opacity: 0.55, marginBottom: 24 }}>{PRODUCT.cat}</p>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 12, paddingBottom: 28, borderBottom: '1px solid rgba(10,9,8,0.1)' }}>
            <span style={{ fontSize: 36, fontWeight: 600, fontFamily: 'var(--f-display)' }}>${PRODUCT.price.toLocaleString()}</span>
            {PRODUCT.old && <span style={{ fontSize: 18, textDecoration: 'line-through', opacity: 0.45 }}>${PRODUCT.old.toLocaleString()}</span>}
            <span style={{ marginLeft: 'auto', padding: '4px 10px', background: 'var(--emerald)', color: 'var(--ivory)', fontSize: 10, letterSpacing: '0.2em', fontWeight: 600 }}>SAVE ${PRODUCT.old - PRODUCT.price}</span>
          </div>

          <p style={{ fontSize: 15, lineHeight: 1.75, opacity: 0.75, marginTop: 24, marginBottom: 32 }}>{PRODUCT.desc}</p>

          <Selector label="Colour" sub={PRODUCT.colors[activeColor].name}>
            <div style={{ display: 'flex', gap: 10 }}>
              {PRODUCT.colors.map((c, i) => (
                <button key={i} onClick={() => setActiveColor(i)} title={c.name} style={{ width: 38, height: 38, borderRadius: '50%', background: c.hex, border: i === activeColor ? '2px solid var(--ink)' : '1px solid rgba(10,9,8,0.15)', boxShadow: i === activeColor ? '0 0 0 3px var(--ivory) inset' : 'none', transition: 'all 0.3s' }}/>
              ))}
            </div>
          </Selector>

          <Selector label="Fabric" sub={PRODUCT.fabrics[activeFabric].name}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {PRODUCT.fabrics.map((f, i) => (
                <button key={i} onClick={() => setActiveFabric(i)} style={{ padding: '12px 14px', border: i === activeFabric ? '1px solid var(--ink)' : '1px solid rgba(10,9,8,0.15)', background: i === activeFabric ? 'var(--ink)' : 'transparent', color: i === activeFabric ? 'var(--ivory)' : 'var(--ink)', textAlign: 'left', transition: 'all 0.3s' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{f.name}</div>
                  <div style={{ fontSize: 10, opacity: 0.65, fontFamily: 'var(--f-mono)' }}>{f.desc}</div>
                </button>
              ))}
            </div>
          </Selector>

          <Selector label="Size" sub={`EU ${activeSize} · 6 ft 1 in fits ${activeSize}`}
            action={<button onClick={openSizeGuide} style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'underline' }}>Size guide ↗</button>}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {PRODUCT.sizes.map(s => (
                <button key={s} onClick={() => setActiveSize(s)} style={{ minWidth: 56, height: 48, border: s === activeSize ? '1px solid var(--ink)' : '1px solid rgba(10,9,8,0.15)', background: s === activeSize ? 'var(--ink)' : 'transparent', color: s === activeSize ? 'var(--ivory)' : 'var(--ink)', fontSize: 13, fontWeight: 500, transition: 'all 0.3s' }}>{s}</button>
              ))}
              <button style={{ minWidth: 110, height: 48, border: '1px dashed rgba(10,9,8,0.3)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--emerald)' }}>+ Made to measure</button>
            </div>
          </Selector>

          <button onClick={() => openWhatsApp(`Hello KhanSaab — I'd like to book a fitting for the ${PRODUCT.name} (size EU ${activeSize}).`)}
            className="btn btn-gold"
            style={{ width: '100%', marginTop: 36, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.5 3.5A11 11 0 0 0 3.7 17.8L2.5 22l4.3-1.1A11 11 0 1 0 20.5 3.5Zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-2.6.7.7-2.5-.2-.3A9 9 0 1 1 12 20.5Zm5-6.7c-.3-.2-1.6-.8-1.9-.9-.3-.1-.5-.1-.7.2l-.9 1.2c-.2.2-.4.2-.7.1-1-.4-2-1-2.8-2-.2-.3-.2-.5 0-.7l.3-.4c.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5l-.7-1.8c-.2-.5-.5-.4-.7-.4h-.5c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.2.2 2.1 3.2 5 4.4 1.5.6 2.1.6 2.9.5.5-.1 1.6-.7 1.9-1.4.2-.7.2-1.2.2-1.4 0-.2-.2-.3-.5-.5Z"/>
            </svg>
            Book a Fitting Appointment
          </button>
          <p className="mono" style={{ marginTop: 10, fontSize: 11, opacity: 0.55, textAlign: 'center' }}>Opens WhatsApp · +91 89750 48440 · Replies within an hour</p>

          <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '20px 0', borderTop: '1px solid rgba(10,9,8,0.1)', borderBottom: '1px solid rgba(10,9,8,0.1)' }}>
            {[
              { i: '✦', t: 'Free worldwide shipping', d: 'Express · 3-5 days' },
              { i: '✦', t: 'Lifetime alterations', d: 'Free re-fit at any age' },
              { i: '✦', t: '30-day returns', d: 'Full refund · No questions' },
              { i: '✦', t: 'Heirloom box', d: 'Hand-folded in tissue' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--gold)' }}>{s.i}</span>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600 }}>{s.t}</p>
                  <p className="mono" style={{ opacity: 0.55, fontSize: 10 }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32 }}>
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
                <button onClick={() => setAcc(acc === a.id ? '' : a.id)} style={{ width: '100%', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
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
      <section style={{ background: 'var(--paper)', padding: '120px 0', position: 'relative' }}>
        <div className="container">
          <header style={{ textAlign: 'center', marginBottom: 64 }}>
            <p className="eyebrow" style={{ color: 'var(--emerald)', marginBottom: 14 }}>HOW IT IS MADE</p>
            <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 1, fontWeight: 400 }}>
              Fourteen days. <span className="display-italic" style={{ color: 'var(--emerald)' }}>One garment.</span>
            </h2>
          </header>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
              { d: 'Day 01', t: 'Pattern', body: 'A paper pattern is cut to your measurements.' },
              { d: 'Day 02-04', t: 'Cloth', body: 'Heavyweight cotton is laid, marked and cut by hand.' },
              { d: 'Day 05-11', t: 'Stitch', body: '60 stitches per cm. By a single artisan.' },
              { d: 'Day 12-14', t: 'Finish', body: 'Pressed, packed and signed on the inner placket.' },
            ].map((s, i) => (
              <div key={i}>
                <Img label={`STEP ${i + 1}`} style={{ aspectRatio: '4/5', marginBottom: 18 }}/>
                <p className="mono" style={{ color: 'var(--gold-warm)', marginBottom: 6 }}>{s.d}</p>
                <h3 className="display" style={{ fontSize: 26, marginBottom: 8 }}>{s.t}</h3>
                <p style={{ fontSize: 13, opacity: 0.7, lineHeight: 1.6 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section style={{ padding: '120px 0', background: 'var(--ivory)' }}>
        <div className="container">
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <p className="eyebrow" style={{ color: 'var(--emerald)', marginBottom: 14 }}>247 REVIEWS · ★★★★★ 4.9</p>
              <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 1, fontWeight: 400 }}>
                What men <span className="display-italic" style={{ color: 'var(--emerald)' }}>say.</span>
              </h2>
            </div>
            <button className="btn btn-ghost-dark">Write a review</button>
          </header>
          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 64, padding: '32px 0', borderTop: '1px solid rgba(10,9,8,0.1)', borderBottom: '1px solid rgba(10,9,8,0.1)', marginBottom: 56 }}>
            <div>
              <p className="display" style={{ fontSize: 96, color: 'var(--emerald)', lineHeight: 0.95 }}>4.9</p>
              <p style={{ color: 'var(--gold)', letterSpacing: '0.18em', fontSize: 18 }}>★★★★★</p>
              <p className="mono" style={{ opacity: 0.55, marginTop: 8 }}>Based on 247 reviews</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignSelf: 'center' }}>
              {[[5, 218], [4, 22], [3, 5], [2, 1], [1, 1]].map(([n, c]) => (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span className="mono" style={{ minWidth: 32 }}>{n}★</span>
                  <div style={{ flex: 1, height: 6, background: 'rgba(10,9,8,0.08)' }}><div style={{ width: `${(c / 247) * 100}%`, height: '100%', background: 'var(--emerald)' }}/></div>
                  <span className="mono" style={{ opacity: 0.55, minWidth: 32, textAlign: 'right' }}>{c}</span>
                </div>
              ))}
            </div>
          </div>
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
        </div>
      </section>

      {/* You may also love */}
      <section style={{ padding: '120px 0', background: 'var(--paper)' }}>
        <div className="container">
          <header style={{ textAlign: 'center', marginBottom: 56 }}>
            <p className="eyebrow" style={{ color: 'var(--emerald)', marginBottom: 14 }}>YOU MAY ALSO LOVE</p>
            <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 1, fontWeight: 400 }}>
              Pair the <span className="display-italic" style={{ color: 'var(--emerald)' }}>Sovereign.</span>
            </h2>
          </header>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
              { name: 'Pearl Emirati Kandura', arabic: 'كندورة اللؤلؤ', price: 980 },
              { name: 'Obsidian Royal Bisht', arabic: 'بشت أسود', price: 4280 },
              { name: 'White Yemeni Shemagh', arabic: 'شماغ يمني', price: 240 },
              { name: 'Amber Misbaha Set', arabic: 'مسبحة عنبر', price: 380 },
            ].map((p, i) => (
              <article key={i} style={{ cursor: 'pointer' }}>
                <div style={{ aspectRatio: '3/4', marginBottom: 16 }}><Img label={p.name.toUpperCase()} style={{ height: '100%' }}/></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                  <span className="arabic" style={{ fontSize: 16, color: 'var(--emerald)', opacity: 0.75 }}>{p.arabic}</span>
                  <span style={{ fontSize: 15, fontWeight: 600 }}>${p.price.toLocaleString()}</span>
                </div>
                <h3 className="display" style={{ fontSize: 18, lineHeight: 1.2, fontWeight: 500 }}>{p.name}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactStrip/>
    </main>
  )
}
