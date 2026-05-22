import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useModals } from '../context/ModalsContext.jsx'
import KhanSaabLogo from './shared/KhanSaabLogo.jsx'
import AnnouncementBar from './AnnouncementBar.jsx'

const WHATSAPP_NUMBER = '918975048440'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

function openWhatsApp(msg) {
  const u = msg ? `${WHATSAPP_URL}?text=${encodeURIComponent(msg)}` : WHATSAPP_URL
  window.open(u, '_blank', 'noopener,noreferrer')
}

export default function Nav({ light = false }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { openAtelier } = useModals()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const links = [
  { path: '/', label: 'Home', num: '01' },
  { path: '/products', label: 'Collection', num: '02' },
  { path: '/story', label: 'Our Story', num: '03' },
]

  const forceSolid = location.pathname !== '/'
  const transparent = !scrolled && !light && !forceSolid
  const tone = transparent ? 'var(--ivory)' : 'var(--ink)'

  const goAndClose = (path) => {
  navigate(path)
  setOpen(false)
}

  return (
    <>
      <header data-nav-header style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 100,
      }}>
        <AnnouncementBar />
        <div style={{
          background: transparent ? 'linear-gradient(180deg, rgba(10,9,8,0.55), transparent)' : 'rgba(245,239,227,0.92)',
          backdropFilter: scrolled ? 'blur(16px) saturate(150%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(150%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(10,9,8,0.08)' : '1px solid transparent',
          transition: 'all 0.5s var(--ease-out)',
          color: tone,
        }}>
          <div className="container-wide" style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            padding: '14px 0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <nav className="nav-desktop" style={{ display: 'flex', gap: 36 }}>
                {links.map(l => (
                  <button
  key={l.path}
  onClick={() => navigate(l.path)}
                    style={{
                      fontSize: 11, letterSpacing: '0.26em', textTransform: 'uppercase', fontWeight: 500,
                      color: location.pathname === l.path ? 'var(--gold)' : 'inherit',
                      position: 'relative',
                      paddingBottom: 4,
                    }}>
                    {l.label}
                    {location.pathname === l.path && (
                      <span style={{
                        position: 'absolute', left: 0, right: 0, bottom: 0, height: 1,
                        background: 'var(--gold)'
                      }} />
                    )}
                  </button>
                ))}
                <button onClick={openAtelier} style={{ fontSize: 11, letterSpacing: '0.26em', textTransform: 'uppercase', fontWeight: 500, color: 'var(--gold)' }}>
                  Atelier
                </button>
              </nav>
            </div>

            <button onClick={() => navigate('/')}style={{ display: 'flex', justifyContent: 'center' }} data-logo>
              <span data-logo-word><KhanSaabLogo size={44} color={tone} invert={transparent} /></span>
              <span style={{ display: 'none' }} data-logo-mark className="mobile-only-logo">
                <KhanSaabLogo size={32} color={tone} invert={transparent} />
              </span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, minHeight: 44 }}>
              <button onClick={openAtelier} className="nav-desktop btn btn-ghost"
                style={{
                  fontSize: 11, letterSpacing: '0.24em',
                  padding: '10px 22px', height: 'auto',
                  borderColor: transparent ? 'rgba(245,239,227,0.45)' : 'rgba(10,9,8,0.35)',
                  color: 'inherit',
                }}>
                Custom Tailoring
              </button>

              <button className="mobile-tailoring-btn" onClick={openAtelier} aria-label="Custom tailoring"
                style={{ borderColor: transparent ? 'rgba(245,239,227,0.35)' : 'rgba(10,9,8,0.25)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3 L12 12 L18 3" />
                  <path d="M12 12 L12 21" />
                  <circle cx="9" cy="6" r="1.6" />
                  <circle cx="15" cy="6" r="1.6" />
                  <path d="M8 21 L16 21" />
                </svg>
              </button>

              <button className="mobile-menu-btn" onClick={() => setOpen(true)} aria-label="Open menu"
                style={{ borderColor: transparent ? 'rgba(245,239,227,0.35)' : 'rgba(10,9,8,0.25)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="13" x2="20" y2="13" />
                  <line x1="4" y1="19" x2="14" y2="19" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className={`mobile-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <button className="close" onClick={() => setOpen(false)} aria-label="Close menu">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="3" y1="3" x2="13" y2="13" />
            <line x1="13" y1="3" x2="3" y2="13" />
          </svg>
        </button>

        <div style={{ marginTop: 8 }}>
          <KhanSaabLogo size={40} color="var(--ivory)" invert />
        </div>

        <p className="eyebrow" style={{ color: 'var(--gold)', marginTop: 36, marginBottom: 8, letterSpacing: '0.32em' }}>
          Menu
        </p>

        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          {links.map(l => (
            <button
              key={l.path}
              onClick={() => goAndClose(l.path)}
              className={`mobile-drawer-link ${location.pathname === l.path ? 'active' : ''}`}>
              <span>{l.label}</span>
              <span className="num">{l.num}</span>
            </button>
          ))}
          <button onClick={() => { setOpen(false); openAtelier() }} className="mobile-drawer-link" style={{ color: 'var(--gold)' }}>
            <span>Atelier</span>
            <span className="num">04</span>
          </button>
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: 32 }}>
          <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 12, letterSpacing: '0.32em' }}>
            Contact
          </p>
          <p style={{ fontSize: 14, opacity: 0.7, lineHeight: 1.8 }}>
            12 Al Wasl Road, Dubai<br />
            +971 4 555 0911<br />
            concierge@khansaab.com
          </p>
          <button onClick={() => openWhatsApp("Hello KhanSaab — I'm interested in custom tailoring.")}
            className="btn btn-gold" style={{ marginTop: 20, height: 44, fontSize: 11 }}>
            Chat on WhatsApp
          </button>
          <div style={{ display: 'flex', gap: 18, marginTop: 28, fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', opacity: 0.55 }}>
            <span>Instagram</span><span>YouTube</span><span>TikTok</span>
          </div>
        </div>
      </div>
    </>
  )
}
