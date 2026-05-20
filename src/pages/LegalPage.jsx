import { Link, useParams } from 'react-router-dom'
import { openWhatsApp } from '../utils/whatsapp.js'
import { LEGAL_PAGES } from '../data/legal.js'

export default function LegalPage() {
  const { slug } = useParams()
  const data = LEGAL_PAGES[slug] || LEGAL_PAGES['legal-terms']
  

  return (
    <main style={{ background: 'var(--ivory)', paddingTop: 140, paddingBottom: 120, minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <div className="mono" style={{ opacity: 0.55, marginBottom: 32 }}>
          <Link to="/" style={{ color: 'inherit', padding: 0 }}>
  Home
</Link>
          <span> / Legal / <span style={{ color: 'var(--ink)' }}>{data.title}</span></span>
        </div>

        <header style={{ marginBottom: 56, paddingBottom: 32, borderBottom: '1px solid rgba(10,9,8,0.1)' }}>
          <p className="eyebrow" style={{ color: 'var(--emerald)', marginBottom: 14 }}>{data.eyebrow}</p>
          <h1 className="display" style={{ fontSize: 'clamp(48px, 6vw, 88px)', lineHeight: 1, fontWeight: 400, marginBottom: 24 }}>
            {data.title}
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, opacity: 0.78, maxWidth: 640 }}>
            {data.intro}
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 56 }}>
          <aside style={{ position: 'sticky', top: 140, alignSelf: 'start' }}>
            <p className="eyebrow" style={{ color: 'var(--gold-warm)', marginBottom: 16, opacity: 0.65 }}>Contents</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {data.sections.map((s, i) => (
                <li key={i} style={{ fontSize: 13, opacity: 0.7 }}>
                  <a href={`#sec-${i}`} style={{ color: 'inherit', textDecoration: 'none' }}>{s.h}</a>
                </li>
              ))}
            </ul>
          </aside>
          <div>
            {data.sections.map((s, i) => (
              <section key={i} id={`sec-${i}`} style={{ marginBottom: 40 }}>
                <h2 className="display" style={{ fontSize: 28, fontWeight: 500, marginBottom: 12 }}>{s.h}</h2>
                <p style={{ fontSize: 15, lineHeight: 1.8, opacity: 0.8 }}>{s.b}</p>
              </section>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 64, padding: 28, background: 'var(--paper)', border: '1px solid rgba(10,9,8,0.08)' }}>
          <p className="eyebrow" style={{ color: 'var(--emerald)', marginBottom: 8 }}>Questions?</p>
          <p style={{ fontSize: 14, opacity: 0.75, marginBottom: 16 }}>
            Our concierge team replies to every message within an hour.
          </p>
          <button className="btn btn-gold" onClick={() => openWhatsApp('Hi! I have a question about your ' + data.title + '.')}>
            Chat with us on WhatsApp
          </button>
        </div>
      </div>
    </main>
  )
}
