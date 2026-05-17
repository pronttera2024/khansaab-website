export default function KhanSaabLogo({ size = 56, color = 'currentColor', showWord = true }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, color }}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
        <g stroke={color} strokeWidth="1.1" fill="none">
          <path d="M32 4 L40 12 L52 12 L52 24 L60 32 L52 40 L52 52 L40 52 L32 60 L24 52 L12 52 L12 40 L4 32 L12 24 L12 12 L24 12 Z" opacity="0.85" />
          <rect x="18" y="18" width="28" height="28" transform="rotate(45 32 32)" opacity="0.55" />
        </g>
        <text x="32" y="40" textAnchor="middle" fontFamily="Cormorant Garamond, serif"
          fontSize="22" fontWeight="500" fill={color} letterSpacing="0.04em">K</text>
      </svg>
      {showWord && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span className="display" style={{ fontSize: 22, letterSpacing: '0.06em', fontWeight: 500 }}>
            KHAN<span style={{ color: 'var(--gold)' }}>SAAB</span>
          </span>
          <span className="arabic" style={{ fontSize: 13, opacity: 0.7, marginTop: 2, letterSpacing: 0 }}>
            خان صاحب
          </span>
        </div>
      )}
    </div>
  )
}
