export function Ornament({ color = 'var(--gold)', width = 56 }) {
  return (
    <div className="ornament" style={{ color }}>
      <div className="line" style={{ width }} />
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 1 L13 7 L19 10 L13 13 L10 19 L7 13 L1 10 L7 7 Z" fill={color} opacity="0.9" />
      </svg>
      <div className="line" style={{ width }} />
    </div>
  )
}

export function CornerOrnament({ size = 60, color = 'var(--gold)' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <g stroke={color} strokeWidth="0.8" fill="none" opacity="0.6">
        <path d="M0 30 L30 0 L60 30 L30 60 Z" />
        <path d="M10 30 L30 10 L50 30 L30 50 Z" />
        <circle cx="30" cy="30" r="3" fill={color} />
      </g>
    </svg>
  )
}
