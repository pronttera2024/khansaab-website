import { useEffect } from 'react'
import { openWhatsApp } from '../utils/whatsapp.js'
import { SIZE_ROWS, SIZE_COLUMNS, HOW_TO_MEASURE } from '../data/size-guide.js'
import { WHATSAPP_MESSAGES } from '../data/site-config.js'

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
      <div onClick={onClose} data-modal-backdrop style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(10,9,8,0.55)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 0.35s var(--ease-out)',
      }}/>

      <aside aria-hidden={!open} role="dialog" aria-modal="true" data-mobile-sheet data-sheet-type="drawer" data-open={open ? 'true' : 'false'} style={{
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
        <span data-sheet-handle aria-hidden="true"/>
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
            <button onClick={() => openWhatsApp(WHATSAPP_MESSAGES.sizeHelp)}
              style={{ color: 'var(--emerald)', textDecoration: 'underline', marginLeft: 4 }}>
              made-to-measure
            </button>.
          </p>

          <div style={{ overflowX: 'auto', marginBottom: 32, border: '1px solid rgba(10,9,8,0.1)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'var(--ink)', color: 'var(--ivory)' }}>
                  {SIZE_COLUMNS.map(h => (
                    <th key={h} style={{ padding: '12px 10px', textAlign: 'left', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SIZE_ROWS.map((r, i) => (
                  <tr key={r.size} style={{ background: i % 2 ? 'transparent' : 'rgba(15,59,46,0.04)' }}>
                    <td style={{ padding: '12px 10px', fontWeight: 600 }}>{r.size}</td>
                    <td style={{ padding: '12px 10px' }}>{r.chest}</td>
                    <td style={{ padding: '12px 10px' }}>{r.waist}</td>
                    <td style={{ padding: '12px 10px' }}>{r.hip}</td>
                    <td style={{ padding: '12px 10px' }}>{r.shoulder}</td>
                    <td style={{ padding: '12px 10px' }}>{r.sleeve}</td>
                    <td style={{ padding: '12px 10px' }}>{r.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="eyebrow" style={{ color: 'var(--emerald)', marginBottom: 14 }}>How to measure</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
            {HOW_TO_MEASURE.map(m => (
              <li key={m.t} style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 14 }}>
                <span style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--emerald)' }}>{m.t}</span>
                <span style={{ fontSize: 13, opacity: 0.78, lineHeight: 1.65 }}>{m.d}</span>
              </li>
            ))}
          </ul>

          <div data-sheet-footer>
            <button onClick={() => openWhatsApp(WHATSAPP_MESSAGES.measureHelp)}
              className="btn btn-gold" style={{ width: '100%', height: 52 }}>
              Need help? Chat on WhatsApp
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
