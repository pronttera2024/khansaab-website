// src/components/productsP/ContactStrip.jsx
import { useModals } from '../../context/ModalsContext.jsx'
import { openWhatsApp } from '../../utils/whatsapp.js'

export default function ContactStrip() {
  const { openAtelier } = useModals()

  return (
    <section style={{ background: 'var(--emerald)', color: 'var(--ivory)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
      <div className="geo-overlay" style={{ opacity: 0.08 }} />
      <div className="container" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 60, alignItems: 'center' }}>
        <div>
          <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 12 }}>Can't find what you're looking for?</p>
          <h3 className="display" style={{ fontSize: 'clamp(36px, 4vw, 60px)', lineHeight: 1, fontWeight: 400 }}>
            Speak to our <span className="display-italic" style={{ color: 'var(--gold)' }}>concierge.</span>
          </h3>
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <button onClick={() => openWhatsApp("Hello KhanSaab — I'd like concierge help.")} className="btn btn-gold">
            WhatsApp Concierge
          </button>
          <button onClick={openAtelier} className="btn btn-ghost">
            Book a Call
          </button>
        </div>
      </div>
    </section>
  )
}