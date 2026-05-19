// components/legal/LegalHeader.jsx
// Eyebrow label + large title + intro paragraph

export default function LegalHeader({ eyebrow, title, intro }) {
  return (
    <header
      style={{
        marginBottom: 56,
        paddingBottom: 32,
        borderBottom: '1px solid rgba(10,9,8,0.1)',
      }}
    >
      <p className="eyebrow" style={{ color: 'var(--emerald)', marginBottom: 14 }}>
        {eyebrow}
      </p>
      <h1
        className="display"
        style={{
          fontSize: 'clamp(48px, 6vw, 88px)',
          lineHeight: 1,
          fontWeight: 400,
          marginBottom: 24,
        }}
      >
        {title}
      </h1>
      <p style={{ fontSize: 17, lineHeight: 1.7, opacity: 0.78, maxWidth: 640 }}>
        {intro}
      </p>
    </header>
  )
}