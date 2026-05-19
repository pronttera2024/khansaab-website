import Img from '../../components/shared/Img.jsx'
import COLLECTIONS_DATA from '../../data/homePages/collectionsData.json'

export default function Collections() {
  return (
    <section style={{ background: 'var(--ivory)' }}>
      {COLLECTIONS_DATA.map((c, i) => (
        <div key={i} style={{ background: c.bg, color: 'var(--ivory)', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
          <div className="geo-overlay" style={{ opacity: 0.07 }}/>
          <div className="container" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', direction: c.align === 'right' ? 'rtl' : 'ltr' }}>
            <div data-collection-image style={{ direction: 'ltr' }}>
              <Img variant="dark" label={c.img} src={c.src} style={{ aspectRatio: '4/5', height: 'auto' }}/>
            </div>
            <div data-collection-content style={{ direction: 'ltr', maxWidth: 540 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 28 }}>
                <span className="display-italic" style={{ fontSize: 80, color: 'var(--gold)', lineHeight: 1 }}>{c.no}</span>
                <div style={{ width: 60, height: 1, background: 'var(--gold)', opacity: 0.5 }}/>
                <span className="arabic" style={{ fontSize: 26, color: 'var(--gold-light)' }}>{c.arabic}</span>
              </div>
              <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 18 }}>{c.subtitle}</p>
              <h2 data-collection-title className="display" style={{ fontSize: 'clamp(64px, 7vw, 112px)', lineHeight: 0.95, marginBottom: 32, fontWeight: 400 }}>{c.name}</h2>
              <p data-collection-desc style={{ fontSize: 17, opacity: 0.75, lineHeight: 1.75, marginBottom: 40 }}>{c.desc}</p>
              <button className="btn btn-gold">{c.cta} →</button>
              <div style={{ marginTop: 56, display: 'flex', gap: 32 }}>
                {[{ v: '12', l: 'Pieces' }, { v: '4-6', l: 'Weeks lead' }, { v: '100%', l: 'Hand-finished' }].map(s => (
                  <div key={s.l}>
                    <div className="display" style={{ fontSize: 36, color: 'var(--gold)' }}>{s.v}</div>
                    <div className="mono" style={{ opacity: 0.55 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}