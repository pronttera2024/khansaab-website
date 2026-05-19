// src/components/productsP/BottomSheet.jsx
import { useEffect } from 'react'

export default function BottomSheet({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open, onClose])

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 150,
          background: 'rgba(10,9,8,0.55)',
          opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s',
        }}
      />
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 151,
        background: 'var(--ivory)', borderTopLeftRadius: 16, borderTopRightRadius: 16,
        maxHeight: '88vh',
        transform: open ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.4s var(--ease-out)',
        boxShadow: '0 -20px 60px rgba(0,0,0,0.25)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}>
        {/* Drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
          <div style={{ width: 44, height: 4, borderRadius: 2, background: 'rgba(10,9,8,0.2)' }} />
        </div>

        {/* Header */}
        <div style={{ padding: '8px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(10,9,8,0.08)' }}>
          <h3 className="display" style={{ fontSize: 22, fontWeight: 500 }}>{title}</h3>
          <button onClick={onClose} style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6 }}>Close</button>
        </div>

        {/* Body */}
        <div style={{ overflowY: 'auto', padding: '12px 20px', flex: 1 }}>{children}</div>

        {/* Optional footer */}
        {footer && <div style={{ padding: 16, borderTop: '1px solid rgba(10,9,8,0.08)' }}>{footer}</div>}
      </div>
    </>
  )
}