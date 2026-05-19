// components/legal/LegalContactBanner.jsx
// Bottom CTA banner — "Questions? Chat with us on WhatsApp"

import { openWhatsApp } from '../../utils/whatsapp.js'

export default function LegalContactBanner({ pageTitle }) {
  const message = `Hi! I have a question about your ${pageTitle}.`

  return (
    <div
      style={{
        marginTop: 64,
        padding: 28,
        background: 'var(--paper)',
        border: '1px solid rgba(10,9,8,0.08)',
      }}
    >
      <p className="eyebrow" style={{ color: 'var(--emerald)', marginBottom: 8 }}>
        Questions?
      </p>
      <p style={{ fontSize: 14, opacity: 0.75, marginBottom: 16 }}>
        Our concierge team replies to every message within an hour.
      </p>
      <button className="btn btn-gold" onClick={() => openWhatsApp(message)}>
        Chat with us on WhatsApp
      </button>
    </div>
  )
}