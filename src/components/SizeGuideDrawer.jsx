import { useEffect } from 'react'
import { openWhatsApp } from '../utils/whatsapp.js'

const ROWS = [
  { eu: '46', chest: '92',  waist: '76',  hip: '94',  shoulder: '44', sleeve: '62', length: '139', height: '5\'7" – 5\'9"' },
  { eu: '48', chest: '96',  waist: '80',  hip: '98',  shoulder: '45', sleeve: '63', length: '142', height: '5\'8" – 5\'10"' },
  { eu: '50', chest: '100', waist: '84',  hip: '102', shoulder: '46', sleeve: '64', length: '145', height: '5\'9" – 5\'11"' },
  { eu: '52', chest: '104', waist: '88',  hip: '106', shoulder: '47', sleeve: '65', length: '148', height: '5\'10" – 6\'1"' },
  { eu: '54', chest: '108', waist: '92',  hip: '110', shoulder: '48', sleeve: '66', length: '151', height: '6\'0" – 6\'2"' },
  { eu: '56', chest: '112', waist: '96',  hip: '114', shoulder: '49', sleeve: '67', length: '154', height: '6\'1" – 6\'3"' },
  { eu: '58', chest: '116', waist: '100', hip: '118', shoulder: '50', sleeve: '68', length: '157', height: '6\'2" – 6\'4"' },
]

export default function SizeGuideDrawer({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [open, onClose])

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(10,9,8,0.55)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 0.35s var(--ease-out)',
      }}/>

      <aside aria-hidden={!open} role="dialog" aria-modal="true" style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(620px, 100vw)',
        background: 'var(--ivory)',
        color: 'var(--ink)',
        zIndex: 201,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.45s var(--ease-out)',
        boxShadow: '-40px 0 80px rgba(0,0,0,0.3)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <header style={{
          padding: '28px 32px 20px',
          borderBottom: '1px solid rgba(10,9,8,0.1)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexShrink: 0,
        }}>
          <div>
            <p className="eyebrow" style={{ color: 'var(--emerald)', marginBottom: 4 }}>Reference</p>
            <h2 className="display" style={{ fontSize: 28, fontWeight: 400 }}>Size Guide</h2>
          </div>
          <button onClick={onClose} aria-label="Close size guide" style={{
            width: 40, height: 40,
            border: '1px solid rgba(10,9,8,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="2" y1="2" x2="12" y2="12"/><line x1="12" y1="2" x2="2" y2="12"/>
            </svg>
          </button>
        </header>

        <div style={{ overflowY: 'auto', padding: '24px 32px 40px', flex: 1 }}>
          <p style={{ fontSize: 14, lineHeight: 1.7, opacity: 0.75, marginBottom: 24 }}>
            All measurements are in <strong>centimetres</strong> unless noted. Measure over a thin shirt,
            standing relaxed. When between sizes, choose the larger for comfort or contact our atelier for
            <button onClick={() => openWhatsApp("Hi! I'd like help picking my size.")}
              style={{ color: 'var(--emerald)', textDecoration: 'underline', marginLeft: 4 }}>
              made-to-measure
            </button>.
          </p>

          <div style={{ overflowX: 'auto', marginBottom: 32, border: '1px solid rgba(10,9,8,0.1)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'var(--ink)', color: 'var(--ivory)' }}>
                  {['EU', 'Chest', 'Waist', 'Hip', 'Shoulder', 'Sleeve', 'Length', 'Fits height'].map(h => (
                    <th key={h} style={{ padding: '12px 10px', textAlign: 'left', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr key={r.eu} style={{ background: i % 2 ? 'transparent' : 'rgba(15,59,46,0.04)' }}>
                    <td style={{ padding: '12px 10px', fontWeight: 600 }}>{r.eu}</td>
                    <td style={{ padding: '12px 10px' }}>{r.chest}</td>
                    <td style={{ padding: '12px 10px' }}>{r.waist}</td>
                    <td style={{ padding: '12px 10px' }}>{r.hip}</td>
                    <td style={{ padding: '12px 10px' }}>{r.shoulder}</td>
                    <td style={{ padding: '12px 10px' }}>{r.sleeve}</td>
                    <td style={{ padding: '12px 10px' }}>{r.length}</td>
                    <td style={{ padding: '12px 10px', fontFamily: 'var(--f-mono)', fontSize: 11, opacity: 0.75 }}>{r.height}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="eyebrow" style={{ color: 'var(--emerald)', marginBottom: 14 }}>How to measure</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
            {[
              { t: 'Chest', d: 'Around the fullest part, under the arms, tape level across the back.' },
              { t: 'Waist', d: 'Around your natural waistline — keep the tape slightly loose.' },
              { t: 'Shoulder', d: 'From the outer edge of one shoulder bone to the other, across the back.' },
              { t: 'Sleeve', d: 'From shoulder seam over the bent elbow to the wrist bone.' },
              { t: 'Length', d: 'From the base of the neck to your preferred hem (ankle for classical fit).' },
            ].map(m => (
              <li key={m.t} style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 14 }}>
                <span style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--emerald)' }}>{m.t}</span>
                <span style={{ fontSize: 13, opacity: 0.78, lineHeight: 1.65 }}>{m.d}</span>
              </li>
            ))}
          </ul>

          <button onClick={() => openWhatsApp("Hi! I'd like help with my measurements.")}
            className="btn btn-gold" style={{ width: '100%', height: 52 }}>
            Need help? Chat on WhatsApp
          </button>
        </div>
      </aside>
    </>
  )
}
