import { Link, useParams } from 'react-router-dom'
import { openWhatsApp } from '../utils/whatsapp.js'

export const LEGAL_PAGES = {
  'legal-terms': {
    title: 'Terms of Service',
    eyebrow: 'Last updated · March 2026',
    intro: 'These Terms govern your use of KhanSaab.com and the purchase of any garment from our atelier. By placing an order you accept the terms below.',
    sections: [
      { h: '1. About us', b: 'KhanSaab is a heritage menswear atelier registered in the Emirate of Dubai. Our principal place of business is 12 Al Wasl Road, Jumeirah, Dubai, United Arab Emirates.' },
      { h: '2. Orders & acceptance', b: 'Every order placed through our website constitutes an offer to purchase. Orders are accepted only when we confirm dispatch by email. Made-to-measure orders enter production once your measurements have been received and confirmed.' },
      { h: '3. Pricing & payment', b: 'Prices are listed in US dollars unless otherwise stated and include VAT where applicable. We accept Visa, Mastercard, Amex, Apple Pay, Tabby and Tamara. Payment is captured at the time of order.' },
      { h: '4. Made-to-measure', b: 'Bespoke garments are final sale. We may, at our discretion, offer one complimentary re-fit within 30 days of delivery. After this period a nominal alteration fee will apply.' },
      { h: '5. Intellectual property', b: 'All photography, text, patterns and trademarks on this site are the property of KhanSaab Atelier and may not be reproduced without prior written consent.' },
      { h: '6. Liability', b: 'We accept no liability for indirect, consequential or special losses arising from use of our garments or website, save where required by applicable consumer law.' },
      { h: '7. Governing law', b: 'These terms are governed by the laws of the United Arab Emirates. Disputes shall be resolved by the courts of Dubai.' },
    ],
  },
  'legal-privacy': {
    title: 'Privacy Policy',
    eyebrow: 'Last updated · March 2026',
    intro: 'We respect your privacy. This policy explains what personal data we collect, how we use it, and the rights you have over it.',
    sections: [
      { h: '1. What we collect', b: 'Name, email, shipping address, phone number, measurements (for made-to-measure), order history and basic analytics (page views, device type). We do not collect or store full card details — payments are handled by our PCI-DSS-compliant processors.' },
      { h: '2. How we use it', b: 'To fulfil orders, schedule fittings, provide concierge service, send transactional emails, and — only with your consent — occasional Diwan newsletters.' },
      { h: '3. Sharing', b: 'We share data with logistics partners (DHL, Aramex), payment processors (Stripe, Tabby) and our email platform. We never sell your data to third parties.' },
      { h: '4. Retention', b: 'Order and measurement data is retained for 7 years for tax, alteration and lifetime-service purposes. Marketing data is retained until you unsubscribe.' },
      { h: '5. Your rights', b: 'You may request access, correction or deletion of your data at any time by writing to privacy@khansaab.com. EU/UK residents enjoy additional rights under the GDPR.' },
      { h: '6. Contact', b: 'Data Protection Officer · privacy@khansaab.com · 12 Al Wasl Road, Jumeirah, Dubai, UAE.' },
    ],
  },
  'legal-cookies': {
    title: 'Cookie Policy',
    eyebrow: 'Last updated · March 2026',
    intro: 'We use a small number of cookies to make this site work and to understand how it is used. You can disable non-essential cookies at any time from the consent banner.',
    sections: [
      { h: 'Strictly necessary', b: 'Session cookies that remember your basket, login state and language preference. Cannot be disabled.' },
      { h: 'Analytics', b: 'Anonymised usage statistics via Plausible Analytics. No personal data is sent. Helps us improve the journey.' },
      { h: 'Marketing', b: 'Optional — pixels from Meta, Google and Pinterest are loaded only with your consent and help us measure campaign performance.' },
      { h: 'Managing cookies', b: 'Most browsers let you block or delete cookies via Settings → Privacy. Blocking strictly-necessary cookies may break checkout.' },
    ],
  },
  'legal-accessibility': {
    title: 'Accessibility Statement',
    eyebrow: 'Last updated · March 2026',
    intro: 'KhanSaab is committed to making khansaab.com accessible to the widest possible audience, regardless of ability or technology.',
    sections: [
      { h: 'Standards', b: 'We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. Our site is regularly audited and continually improved.' },
      { h: 'Features', b: 'Keyboard navigation, descriptive alt text, sufficient colour contrast, resizable text up to 200%, and ARIA labels on interactive components.' },
      { h: 'Known limitations', b: 'Some legacy photography is missing extended captions, and one third-party video embed lacks captions. We are working with our partners to address these.' },
      { h: 'Contact', b: 'If you encounter an accessibility issue please write to access@khansaab.com — we aim to respond within 2 working days.' },
    ],
  },
  'legal-shipping': {
    title: 'Shipping',
    eyebrow: 'Express, worldwide',
    intro: 'Complimentary express shipping on every order. Each garment travels in a hand-folded heirloom box, tissue-wrapped and signed.',
    sections: [
      { h: 'UAE', b: 'Next-day delivery to all 7 Emirates. Orders placed before 14:00 GST ship the same day.' },
      { h: 'GCC', b: '2 – 4 working days to KSA, Qatar, Kuwait, Bahrain and Oman via DHL Express.' },
      { h: 'International', b: '3 – 7 working days to 47 countries. Duties and taxes are pre-paid; nothing further to settle on arrival.' },
      { h: 'Made-to-measure', b: 'Bespoke orders ship 14 – 21 days from your final fitting. Wedding parties enjoy priority production.' },
    ],
  },
  'legal-returns': {
    title: 'Returns',
    eyebrow: '30-day window',
    intro: 'If a ready-to-wear garment isn\'t quite right, return it within 30 days for a full refund — no questions, no restocking fees.',
    sections: [
      { h: 'Eligibility', b: 'Garments must be unworn, unaltered, with all tags attached and returned in the original heirloom box.' },
      { h: 'How to return', b: 'Email returns@khansaab.com with your order number. We\'ll arrange a free DHL pickup at a time that suits you.' },
      { h: 'Refunds', b: 'Refunds are issued to the original payment method within 5 working days of the garment arriving at our atelier.' },
      { h: 'Made-to-measure', b: 'Bespoke orders are final sale, however every garment is covered by our Lifetime Alterations guarantee — free re-fits at any age.' },
    ],
  },
  'legal-care': {
    title: 'Care Guide',
    eyebrow: 'Looking after your garment',
    intro: 'A KhanSaab thobe is made to last a lifetime. A little care will keep it looking as crisp as the day it arrived.',
    sections: [
      { h: 'Washing', b: 'Dry-clean only for thobes, kanduras and bishts. Hand-wash shemaghs in cold water with a mild detergent.' },
      { h: 'Pressing', b: 'Press inside-out on a medium setting with a press cloth. Avoid pressing directly over embroidery.' },
      { h: 'Storage', b: 'Hang on a wide wooden hanger inside a breathable garment bag. Avoid direct sunlight and damp areas.' },
      { h: 'Atelier service', b: 'Bring or post your garment to any KhanSaab atelier once a year — we will steam, press and inspect it free of charge.' },
    ],
  },
}

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
