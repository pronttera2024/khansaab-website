import { useRouter } from '../context/RouterContext.jsx'
import { useModals } from '../context/ModalsContext.jsx'
import KhanSaabLogo from './shared/KhanSaabLogo.jsx'

const WHATSAPP_NUMBER = '918975048440'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

function openWhatsApp(msg) {
  const u = msg ? `${WHATSAPP_URL}?text=${encodeURIComponent(msg)}` : WHATSAPP_URL
  window.open(u, '_blank', 'noopener,noreferrer')
}

function FooterBlock({ label, lines }) {
  return (
    <div>
      <div className="eyebrow" style={{ color: 'var(--gold)', opacity: 0.85, marginBottom: 14 }}>{label}</div>
      <div style={{ fontSize: 14, opacity: 0.8, lineHeight: 1.8 }}>
        {lines.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  )
}

function FooterLinks({ title, items }) {
  return (
    <div>
      <div className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 18 }}>{title}</div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map(it => (
          <li key={it.label}>
            <button onClick={it.onClick}
              style={{
                fontSize: 14, opacity: 0.7, cursor: 'pointer',
                transition: 'opacity 0.3s, color 0.3s',
                color: 'inherit', textAlign: 'left', padding: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.color = 'var(--gold)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = 0.7; e.currentTarget.style.color = 'inherit' }}>
              {it.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  const { go } = useRouter()
  const { openAtelier, openSizeGuide } = useModals()

  return (
    <footer data-footer style={{
      background: 'var(--ink)',
      color: 'var(--ivory)',
      position: 'relative',
      paddingTop: 100,
      overflow: 'hidden',
    }}>
      <div className="geo-overlay" />

      <div className="container" style={{ position: 'relative' }}>
        <div data-footer-top style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 80,
          paddingBottom: 80,
          borderBottom: '1px solid rgba(201,169,97,0.18)',
        }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 24 }}>Contact Us</div>
            <h2 className="display" style={{ fontSize: 'clamp(48px, 5.5vw, 84px)', marginBottom: 28, lineHeight: 0.98 }}>
              A garment that speaks <span className="display-italic" style={{ color: 'var(--gold)' }}>your story.</span>
            </h2>
            <p style={{ fontSize: 16, opacity: 0.7, maxWidth: 520, marginBottom: 36 }}>
              Our atelier team is available across timezones. For made-to-measure consultations, private appointments
              or wholesale inquiries — please write to us.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button className="btn btn-gold" onClick={openAtelier}>Book an Appointment</button>
              <button className="btn btn-ghost" onClick={() => openWhatsApp("Hello KhanSaab — I'd like to chat.")}>Send a Message</button>
            </div>
          </div>

          <div data-footer-info style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <FooterBlock label="Atelier" lines={['12 Al Wasl Road', 'Jumeirah, Dubai', 'United Arab Emirates']} />
            <FooterBlock label="Studio Hours" lines={['Mon — Sat', '10:00 — 21:00 GST', 'Sunday by appointment']} />
            <FooterBlock label="Phone" lines={['+971 4 555 0911', '+44 20 7946 0011']} />
            <FooterBlock label="Email" lines={['concierge@khansaab.com', 'press@khansaab.com']} />
          </div>
        </div>

        <div data-footer-links style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr',
          gap: 56,
          padding: '72px 0',
        }}>
          <div>
            <KhanSaabLogo size={48} color="var(--ivory)" />
            <p style={{ marginTop: 24, opacity: 0.55, fontSize: 14, lineHeight: 1.7, maxWidth: 320 }}>
              Heritage menswear of the Khaleej — designed in Dubai, hand-finished by master tailors of the
              old quarters. Established 2014.
            </p>
            <p className="arabic" style={{ marginTop: 18, fontSize: 22, color: 'var(--gold)' }}>
              فنّ اللباس الرفيع
            </p>
          </div>
          <FooterLinks title="Collection" items={[
            { label: 'Thobes', onClick: () => go('products') },
            { label: 'Kanduras', onClick: () => go('products') },
            { label: 'Bishts', onClick: () => go('products') },
            { label: 'Jubbas', onClick: () => go('products') },
            { label: 'Shemaghs', onClick: () => go('products') },
            { label: 'Gift Cards', onClick: () => go('products') },
          ]} />
          <FooterLinks title="House" items={[
            { label: 'Our Story', onClick: () => go('story') },
            { label: 'The Atelier', onClick: openAtelier },
            { label: 'Craftsmanship', onClick: () => go('story') },
            { label: 'Journal', onClick: () => go('story') },
            { label: 'Press', onClick: () => go('story') },
          ]} />
          <FooterLinks title="Service" items={[
            { label: 'Made to Measure', onClick: openAtelier },
            { label: 'Size Guide', onClick: openSizeGuide },
            { label: 'Shipping', onClick: () => go('legal-shipping') },
            { label: 'Returns', onClick: () => go('legal-returns') },
            { label: 'Care Guide', onClick: () => go('legal-care') },
          ]} />
          <FooterLinks title="Legal" items={[
            { label: 'Terms', onClick: () => go('legal-terms') },
            { label: 'Privacy', onClick: () => go('legal-privacy') },
            { label: 'Cookies', onClick: () => go('legal-cookies') },
            { label: 'Accessibility', onClick: () => go('legal-accessibility') },
          ]} />
        </div>

        <div data-footer-newsletter style={{
          padding: '44px 0',
          borderTop: '1px solid rgba(201,169,97,0.18)',
          borderBottom: '1px solid rgba(201,169,97,0.18)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
        }}>
          <div>
            <h3 className="display" style={{ fontSize: 32, marginBottom: 8 }}>The Khansaab Diwan</h3>
            <p style={{ opacity: 0.6, fontSize: 14 }}>
              Quarterly notes on craft, new collections and private trunk shows. No spam — only what's worth your time.
            </p>
          </div>
          <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', gap: 12 }}>
            <input type="email" placeholder="Your email address"
              style={{
                flex: 1, height: 52,
                background: 'transparent',
                border: '1px solid rgba(201,169,97,0.25)',
                color: 'var(--ivory)',
                padding: '0 20px',
                fontFamily: 'var(--f-body)',
                fontSize: 14,
                outline: 'none',
                borderRadius: 999,
              }} />
            <button type="submit" className="btn btn-gold">Subscribe</button>
          </form>
        </div>

        <div data-footer-bottom style={{
          padding: '32px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          fontSize: 12,
          opacity: 0.55,
        }}>
          <div>© 2026 KhanSaab Atelier. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 20 }}>
            <span>Visa</span><span>Mastercard</span><span>Amex</span>
            <span>Apple Pay</span><span>Tabby</span><span>Tamara</span>
          </div>
          <div style={{ display: 'flex', gap: 18 }}>
            <span>Instagram</span><span>YouTube</span><span>TikTok</span><span>Pinterest</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
