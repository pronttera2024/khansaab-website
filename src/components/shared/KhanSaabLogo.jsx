export default function KhanSaabLogo({ size = 56, color = 'currentColor', showWord = true, invert = false }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, color }}>
      <img
        src="/logo.svg"
        alt="KhanSaab"
        width={size}
        height={size}
        style={{
          display: 'block',
          objectFit: 'contain',
          filter: invert ? 'invert(1) brightness(1.6)' : 'none',
          transition: 'filter 0.4s var(--ease-out)',
        }}
      />
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
