import { useViewport } from '../hooks/useViewport.js'
import { openWhatsApp } from '../utils/whatsapp.js'
import { ContactStrip } from './ProductsPage.jsx'
import Img from '../components/shared/Img.jsx'
import { Ornament } from '../components/shared/Ornament.jsx'
import {
  WHOLESALE_HERO,
  WHOLESALE_STATS,
  WHOLESALE_BENEFITS,
  WHOLESALE_TIERS,
  WHOLESALE_PROCESS,
  WHOLESALE_CTA,
  WHOLESALE_FAQ,
} from '../data/wholesale.js'

export default function WholesalePage() {
  const { isPhone } = useViewport()

  return (
    <main style={{ background: 'var(--ivory)' }}>
      {/* Hero */}
      <section style={{
        background: 'var(--emerald)',
        color: 'var(--ivory)',
        padding: isPhone ? '120px 0 80px' : '180px 0 120px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="geo-overlay" style={{ opacity: 0.05 }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
            <Ornament color="var(--gold)" width={40} />
          </div>
          <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 18 }}>
            {WHOLESALE_HERO.eyebrow}
          </p>
          <h1 className="display" style={{
            fontSize: isPhone ? 'clamp(36px, 10vw, 56px)' : 'clamp(64px, 7vw, 112px)',
            lineHeight: 0.98,
            fontWeight: 400,
            marginBottom: 28,
          }}>
            {WHOLESALE_HERO.heading}{' '}
            <span className="display-italic" style={{ color: 'var(--gold)' }}>{WHOLESALE_HERO.headingAccent}</span>
          </h1>
          <p style={{
            fontSize: isPhone ? 15 : 18,
            opacity: 0.82,
            maxWidth: 640,
            margin: '0 auto',
            lineHeight: 1.7,
            marginBottom: 44,
          }}>
            {WHOLESALE_HERO.body}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <button className="btn btn-gold" onClick={() => openWhatsApp(WHOLESALE_HERO.ctaEnquire)}>
              Enquire Now
            </button>
            <button className="btn btn-ghost" onClick={() => openWhatsApp(WHOLESALE_HERO.ctaCatalogue)}>
              Request Catalogue
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: isPhone ? '56px 0' : '80px 0', background: 'var(--ink)', color: 'var(--ivory)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: isPhone ? 'repeat(2, 1fr)' : 'repeat(6, 1fr)',
            gap: isPhone ? 28 : 32,
          }}>
            {WHOLESALE_STATS.map((s, k) => (
              <div key={k} style={{ textAlign: 'center' }}>
                <div className="display" style={{ fontSize: isPhone ? 28 : 36, color: 'var(--gold)', marginBottom: 4 }}>
                  {s.v}
                </div>
                <div className="mono" style={{ opacity: 0.6, fontSize: 10 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: isPhone ? '72px 0' : '120px 0', background: 'var(--paper)' }}>
        <div className="container">
          <header style={{ textAlign: 'center', marginBottom: isPhone ? 48 : 80 }}>
            <p className="eyebrow" style={{ color: 'var(--emerald)', marginBottom: 14 }}>WHY PARTNER WITH US</p>
            <h2 className="display" style={{
              fontSize: isPhone ? 'clamp(28px, 8vw, 42px)' : 'clamp(48px, 5vw, 72px)',
              lineHeight: 1.05,
              fontWeight: 400,
            }}>
              Built for <span className="display-italic" style={{ color: 'var(--emerald)' }}>retailers.</span>
            </h2>
          </header>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isPhone ? '1fr' : 'repeat(3, 1fr)',
            gap: isPhone ? 20 : 24,
          }}>
            {WHOLESALE_BENEFITS.map((b) => (
              <div key={b.n} style={{
                padding: isPhone ? '28px 24px' : '36px 32px',
                border: '1px solid rgba(10,9,8,0.08)',
                background: 'var(--ivory)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}>
                <span className="display-italic" style={{ fontSize: 28, color: 'var(--gold)', lineHeight: 1 }}>{b.n}</span>
                <h3 className="display" style={{ fontSize: isPhone ? 20 : 22, fontWeight: 400 }}>{b.t}</h3>
                <p style={{ fontSize: 14, opacity: 0.72, lineHeight: 1.65 }}>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section style={{ padding: isPhone ? '72px 0' : '120px 0', background: 'var(--ivory)' }}>
        <div className="container">
          <header style={{ textAlign: 'center', marginBottom: isPhone ? 48 : 72 }}>
            <p className="eyebrow" style={{ color: 'var(--emerald)', marginBottom: 14 }}>TIERED PRICING</p>
            <h2 className="display" style={{
              fontSize: isPhone ? 'clamp(28px, 8vw, 42px)' : 'clamp(48px, 5vw, 72px)',
              lineHeight: 1.05,
              fontWeight: 400,
            }}>
              Volume <span className="display-italic" style={{ color: 'var(--emerald)' }}>rewards.</span>
            </h2>
            <p style={{ fontSize: 15, opacity: 0.7, maxWidth: 500, margin: '16px auto 0', lineHeight: 1.7 }}>
              The more you order, the better your margins. Simple, transparent pricing with no hidden fees.
            </p>
          </header>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isPhone ? '1fr' : 'repeat(4, 1fr)',
            gap: isPhone ? 16 : 20,
            maxWidth: 900,
            margin: '0 auto',
          }}>
            {WHOLESALE_TIERS.map((tier, i) => (
              <div key={i} style={{
                padding: isPhone ? '28px 24px' : '36px 28px',
                border: tier.featured ? '2px solid var(--gold)' : '1px solid rgba(10,9,8,0.1)',
                background: tier.featured ? 'var(--ink)' : 'var(--paper)',
                color: tier.featured ? 'var(--ivory)' : 'var(--ink)',
                textAlign: 'center',
                position: 'relative',
              }}>
                {tier.featured && (
                  <span style={{
                    position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--gold)', color: 'var(--ink)',
                    padding: '4px 14px', fontSize: 9, letterSpacing: '0.2em', fontWeight: 700,
                  }}>
                    MOST POPULAR
                  </span>
                )}
                <p className="mono" style={{ opacity: 0.6, fontSize: 10, marginBottom: 12 }}>{tier.note}</p>
                <p className="display" style={{ fontSize: isPhone ? 18 : 22, marginBottom: 8 }}>{tier.qty}</p>
                <p style={{ fontSize: 15, fontWeight: 600, color: tier.featured ? 'var(--gold)' : 'var(--emerald)' }}>{tier.discount}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: isPhone ? '72px 0' : '120px 0', background: 'var(--paper)' }}>
        <div className="container">
          <header style={{ textAlign: 'center', marginBottom: isPhone ? 48 : 72 }}>
            <p className="eyebrow" style={{ color: 'var(--emerald)', marginBottom: 14 }}>HOW IT WORKS</p>
            <h2 className="display" style={{
              fontSize: isPhone ? 'clamp(28px, 8vw, 42px)' : 'clamp(48px, 5vw, 72px)',
              lineHeight: 1.05,
              fontWeight: 400,
            }}>
              Five steps to your{' '}
              <span className="display-italic" style={{ color: 'var(--emerald)' }}>first order.</span>
            </h2>
          </header>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isPhone ? '1fr' : 'repeat(5, 1fr)',
            gap: isPhone ? 24 : 20,
            maxWidth: 1100,
            margin: '0 auto',
          }}>
            {WHOLESALE_PROCESS.map((step) => (
              <div key={step.n} style={{ textAlign: 'center' }}>
                <span className="display-italic" style={{
                  fontSize: 36, color: 'var(--gold)', lineHeight: 1, display: 'block', marginBottom: 14,
                }}>
                  {step.n}
                </span>
                <h3 className="display" style={{ fontSize: 18, marginBottom: 8, fontWeight: 400 }}>{step.t}</h3>
                <p style={{ fontSize: 13, opacity: 0.7, lineHeight: 1.6 }}>{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        background: 'var(--ink)',
        color: 'var(--ivory)',
        padding: isPhone ? '72px 0' : '100px 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="geo-overlay" style={{ opacity: 0.06 }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 18 }}>{WHOLESALE_CTA.eyebrow}</p>
          <h2 className="display" style={{
            fontSize: isPhone ? 'clamp(28px, 8vw, 42px)' : 'clamp(48px, 5vw, 72px)',
            lineHeight: 1.05,
            fontWeight: 400,
            marginBottom: 24,
          }}>
            {WHOLESALE_CTA.heading}{' '}<span className="display-italic" style={{ color: 'var(--gold)' }}>{WHOLESALE_CTA.headingAccent}</span>
          </h2>
          <p style={{ fontSize: 16, opacity: 0.75, maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.7 }}>
            {WHOLESALE_CTA.body}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <button className="btn btn-gold" onClick={() => openWhatsApp(WHOLESALE_CTA.ctaEnquire)}>
              Enquire on WhatsApp
            </button>
            <button className="btn btn-ghost" onClick={() => openWhatsApp(WHOLESALE_CTA.ctaCatalogue)}>
              Request Catalogue
            </button>
          </div>
          <p className="mono" style={{ marginTop: 20, fontSize: 11, opacity: 0.5 }}>
            {WHOLESALE_CTA.phone}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: isPhone ? '72px 0' : '120px 0', background: 'var(--ivory)' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <header style={{ textAlign: 'center', marginBottom: isPhone ? 40 : 64 }}>
            <p className="eyebrow" style={{ color: 'var(--emerald)', marginBottom: 14 }}>FREQUENTLY ASKED</p>
            <h2 className="display" style={{
              fontSize: isPhone ? 'clamp(28px, 8vw, 42px)' : 'clamp(40px, 4vw, 56px)',
              lineHeight: 1.1,
              fontWeight: 400,
            }}>
              Common <span className="display-italic" style={{ color: 'var(--emerald)' }}>questions.</span>
            </h2>
          </header>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {WHOLESALE_FAQ.map((item, i) => (
              <details key={i} style={{
                borderTop: '1px solid rgba(10,9,8,0.1)',
                padding: '20px 0',
              }}>
                <summary style={{
                  cursor: 'pointer',
                  fontSize: 15,
                  fontWeight: 500,
                  lineHeight: 1.4,
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  {item.q}
                  <span style={{ fontSize: 18, opacity: 0.4, marginLeft: 16, flexShrink: 0 }}>+</span>
                </summary>
                <p style={{ fontSize: 14, opacity: 0.72, lineHeight: 1.7, marginTop: 12, paddingRight: 40 }}>
                  {item.a}
                </p>
              </details>
            ))}
            <div style={{ borderTop: '1px solid rgba(10,9,8,0.1)' }} />
          </div>
        </div>
      </section>

      <ContactStrip />
    </main>
  )
}
