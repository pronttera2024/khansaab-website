import { useEffect } from 'react'
import { Ornament } from './shared/Ornament.jsx'
import { openWhatsApp } from '../utils/whatsapp.js'

export default function AtelierDialog({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [open, onClose])

  if (!open) return null
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(10,9,8,0.72)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
      animation: 'fadeIn 0.3s var(--ease-out)',
    }}>
      <div onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" style={{
        background: 'var(--ivory)',
        color: 'var(--ink)',
        maxWidth: 560, width: '100%',
        position: 'relative',
        padding: '56px 48px 48px',
        border: '1px solid rgba(201,169,97,0.4)',
        boxShadow: '0 40px 120px rgba(0,0,0,0.5)',
        animation: 'fadeUp 0.5s var(--ease-out)',
      }}>
        <button onClick={onClose} aria-label="Close"
          style={{
            position: 'absolute', top: 14, right: 14,
            width: 36, height: 36,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, opacity: 0.6,
          }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="2" y1="2" x2="12" y2="12"/><line x1="12" y1="2" x2="2" y2="12"/>
          </svg>
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <Ornament color="var(--emerald)" width={36}/>
        </div>

        <p className="arabic" style={{ fontSize: 28, color: 'var(--emerald)', textAlign: 'center', marginBottom: 6 }}>
          خياطة على المقاس
        </p>
        <p className="eyebrow" style={{ color: 'var(--emerald)', textAlign: 'center', marginBottom: 18 }}>
          The KhanSaab Atelier
        </p>
        <h2 className="display" style={{
          fontSize: 'clamp(36px, 4.5vw, 52px)', lineHeight: 1.05,
          textAlign: 'center', marginBottom: 16, fontWeight: 400,
        }}>
          Make custom-size <span className="display-italic" style={{ color: 'var(--emerald)' }}>cloth.</span>
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.75, textAlign: 'center', marginBottom: 32 }}>
          Tell us your measurements, choose your fabric and silhouette — our master tailors will hand-finish a
          garment cut entirely for you. Hand-stitched, signed, and delivered to your door.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
          {['Measure', 'Fabric', 'Stitch', 'Deliver'].map((s, i) => (
            <span key={s} style={{
              padding: '8px 14px',
              border: '1px solid rgba(15,59,46,0.25)',
              fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600,
              color: 'var(--emerald)', borderRadius: 999,
            }}>
              {String(i + 1).padStart(2, '0')} · {s}
            </span>
          ))}
        </div>

        <button onClick={() => openWhatsApp("Hello KhanSaab — I'd like to start a custom tailoring order.")}
          className="btn btn-gold"
          style={{ width: '100%', height: 56, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M20.5 3.5A11 11 0 0 0 3.7 17.8L2.5 22l4.3-1.1A11 11 0 1 0 20.5 3.5Zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-2.6.7.7-2.5-.2-.3A9 9 0 1 1 12 20.5Zm5-6.7c-.3-.2-1.6-.8-1.9-.9-.3-.1-.5-.1-.7.2l-.9 1.2c-.2.2-.4.2-.7.1-1-.4-2-1-2.8-2-.2-.3-.2-.5 0-.7l.3-.4c.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5l-.7-1.8c-.2-.5-.5-.4-.7-.4h-.5c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.2.2 2.1 3.2 5 4.4 1.5.6 2.1.6 2.9.5.5-.1 1.6-.7 1.9-1.4.2-.7.2-1.2.2-1.4 0-.2-.2-.3-.5-.5Z"/>
          </svg>
          Contact us on WhatsApp
        </button>

        <p className="mono" style={{ marginTop: 14, fontSize: 11, opacity: 0.5, textAlign: 'center' }}>
          +91 89750 48440 · Replies within an hour
        </p>
      </div>
    </div>
  )
}
