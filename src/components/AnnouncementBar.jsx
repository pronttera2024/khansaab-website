import { ANNOUNCEMENTS } from '../data/announcements.js'

export default function AnnouncementBar() {
  const seq = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS, ...ANNOUNCEMENTS]

  return (
    <div style={{
      background: 'var(--ink)',
      color: 'var(--gold-light)',
      borderBottom: '1px solid rgba(201,169,97,0.18)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{
        display: 'flex',
        gap: 48,
        padding: '10px 0',
        whiteSpace: 'nowrap',
        animation: 'ribbonScroll 40s linear infinite',
        fontFamily: 'var(--f-body)',
        fontSize: 11,
        letterSpacing: '0.28em',
      }}>
        {seq.map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  )
}
