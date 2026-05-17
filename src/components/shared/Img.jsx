function imgSeed(label) {
  const s = String(label || 'khansaab')
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h % 1000
}

export default function Img({ label, variant = 'default', style, children, aspect, src, showLabel = true, ...rest }) {
  const cls = `placeholder has-image ${variant === 'dark' ? 'dark' : variant === 'emerald' ? 'emerald' : ''}`
  const s = { ...style }
  if (aspect) s.aspectRatio = aspect
  const seed = imgSeed(label)
  const w = 800
  const h = 1000
  const url = src || `https://picsum.photos/seed/khansaab-${seed}/${w}/${h}`

  return (
    <div className={cls} style={s} {...rest}>
      <img
        src={url}
        alt={label || ''}
        loading="lazy"
        className="placeholder-img"
        onError={(e) => { e.currentTarget.style.display = 'none' }}
      />
      {variant !== 'default' && <div className="placeholder-tint" />}
      {label && showLabel && <div className="label">{label}</div>}
      {children}
    </div>
  )
}
