import { Link } from 'react-router-dom'
import { useModals } from '../context/ModalsContext.jsx'
import KhanSaabLogo from './shared/KhanSaabLogo.jsx'
import { openWhatsApp } from '../utils/whatsapp.js'
import { CONTACT, BRAND, PAYMENT_METHODS, WHATSAPP_MESSAGES } from '../data/site-config.js'
import { FOOTER_LINKS } from '../data/navigation.js'

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
  const linkStyle = {
    fontSize: 14, opacity: 0.7, cursor: 'pointer',
    transition: 'opacity 0.3s, color 0.3s',
    color: 'inherit', textAlign: 'left', padding: 0,
    background: 'none', border: 0, font: 'inherit',
    display: 'inline-block',
  }
  const hover = e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.color = 'var(--gold)' }
  const leave = e => { e.currentTarget.style.opacity = 0.7; e.currentTarget.style.color = 'inherit' }
  return (
    <div>
      <div className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 18 }}>{title}</div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, padding: 0, margin: 0 }}>
        {items.map(it => (
          <li key={it.label}>
            {it.path ? (
              <Link to={it.path} style={linkStyle} onMouseEnter={hover} onMouseLeave={leave}>
                {it.label}
              </Link>
            ) : (
              <button type="button" onClick={it.onClick} style={linkStyle} onMouseEnter={hover} onMouseLeave={leave}>
                {it.label}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
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
              From our atelier in Pune, we serve discerning gentlemen across India and beyond.
              Whether it's a bespoke thobe, bulk orders or a private fitting — we'd love to hear from you.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button className="btn btn-gold" onClick={openAtelier}>Book an Appointment</button>
              <button className="btn btn-ghost" onClick={() => openWhatsApp(WHATSAPP_MESSAGES.general)}>Send a Message</button>
            </div>
          </div>

          <div data-footer-info style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <FooterBlock label="Atelier" lines={[CONTACT.address.street, CONTACT.address.area, CONTACT.address.country]} />
            <FooterBlock label="Studio Hours" lines={[CONTACT.hours.weekday, CONTACT.hours.time, CONTACT.hours.weekend]} />
            <FooterBlock label="Phone" lines={CONTACT.phone} />
            <FooterBlock label="Email" lines={[CONTACT.email.concierge]} />
          </div>
        </div>

        <div data-footer-links style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr',
          gap: 56,
          padding: '72px 0',
        }}>
          <div>
            <KhanSaabLogo size={48} color="var(--ivory)" invert />
            <p style={{ marginTop: 24, opacity: 0.55, fontSize: 14, lineHeight: 1.7, maxWidth: 320 }}>
              {BRAND.description}
            </p>
            <p className="arabic" style={{ marginTop: 18, fontSize: 22, color: 'var(--gold)' }}>
              {BRAND.taglineArabic}
            </p>
          </div>
          {Object.values(FOOTER_LINKS).map(group => {
            const actions = { openAtelier, openSizeGuide }
            return (
              <FooterLinks key={group.title} title={group.title} items={group.items.map(item => ({
                label: item.label,
                path: item.action ? undefined : item.path,
                onClick: item.action ? actions[item.action] : undefined,
              }))} />
            )
          })}
        </div>

        {/* <div data-footer-newsletter style={{
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
        </div> */}

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
          <div>{BRAND.copyright}</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {PAYMENT_METHODS.map(m => <span key={m}>{m}</span>)}
          </div>
          <div style={{ display: 'flex', gap: 18 }}>
            <a href="https://www.instagram.com/khansaabstore/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  )
}