import { useModals } from '../../context/ModalsContext.jsx'
import Img from '../../components/shared/Img.jsx'
import { openWhatsApp } from '../../utils/whatsapp.js'

export default function CustomizeCTA() {
  const { openAtelier } = useModals()
  return (
    <section style={{ background: 'var(--ink)', color: 'var(--ivory)', padding: '140px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.35 }}>
        <Img variant="dark" label="MASTER TAILOR · CHALK MARKING · STUDIO" style={{ height: '100%' }}/>
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, var(--ink) 0%, rgba(10,9,8,0.5) 100%)' }}/>
      <div className="geo-overlay" style={{ opacity: 0.06 }}/>
      <div className="container" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 80, alignItems: 'center' }}>
        <div>
          <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 20 }}>BESPOKE · MADE TO MEASURE</p>
          <h2 className="display" style={{ fontSize: 'clamp(64px, 7vw, 112px)', lineHeight: 0.95, marginBottom: 32, fontWeight: 400 }}>
            Don't see <span className="display-italic" style={{ color: 'var(--gold)' }}>your garment?</span><br/>We'll build it.
          </h2>
          <p style={{ fontSize: 18, opacity: 0.78, maxWidth: 520, lineHeight: 1.7, marginBottom: 40 }}>
            Any fabric. Any silhouette. Any embroidery you can describe — or any heirloom you can show us. Our master tailor will sketch, fit and finish it over four weeks.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <button className="btn btn-gold" onClick={openAtelier}>Start a Bespoke Order</button>
            <button className="btn btn-ghost" onClick={() => openWhatsApp('Hello KhanSaab — I\'d like to discuss a bespoke order.')}>Connect on WhatsApp</button>
          </div>
          <div style={{ marginTop: 48, display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            {['✦ 4 fittings included', '✦ Choose from 240+ fabrics', '✦ Worldwide shipping', '✦ Lifetime alterations'].map(t => (
              <span key={t} className="mono" style={{ color: 'var(--gold-light)' }}>{t}</span>
            ))}
          </div>
        </div>
        <div className="glass-dark" style={{ padding: 40, borderRadius: 4 }}>
          <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 28 }}>THE BESPOKE PROCESS</p>
          <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 22 }}>
            {[
              { n: '01', t: 'Consultation', d: 'Visit our atelier or schedule a video call. Tell us your story.' },
              { n: '02', t: 'Fabric & Sketch', d: 'We propose three swatches and a hand-drawn sketch within 48 hours.' },
              { n: '03', t: 'First Fitting', d: 'A muslin garment is cut for your body. Adjustments begin.' },
              { n: '04', t: 'Final Delivery', d: 'Your finished piece arrives in a Khansaab heirloom box.' },
            ].map(s => (
              <li key={s.n} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <span className="display-italic" style={{ fontSize: 32, color: 'var(--gold)', lineHeight: 1, minWidth: 40 }}>{s.n}</span>
                <div>
                  <p className="display" style={{ fontSize: 20, marginBottom: 4 }}>{s.t}</p>
                  <p style={{ fontSize: 13, opacity: 0.65, lineHeight: 1.6 }}>{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}