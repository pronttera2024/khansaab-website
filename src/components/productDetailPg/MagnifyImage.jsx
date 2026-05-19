import { useState, useRef } from 'react'
import Img from '../shared/Img.jsx'

function imgSeed(label) {
  const s = String(label || 'khansaab')
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h % 1000
}

export default function MagnifyImage({ label, src, zoom = 2.5, lensSize = 220, aspectRatio = '3/4', children }) {
  const containerRef = useRef(null)
  const lensRef = useRef(null)
  const [active, setActive] = useState(false)
  const seed = imgSeed(label)
  const hiResUrl = src || `https://picsum.photos/seed/khansaab-${seed}/1600/2000`

  const handleMove = (e) => {
    const el = containerRef.current
    const lens = lensRef.current
    if (!el || !lens) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      setActive(false)
      return
    }
    const half = lensSize / 2
    const bgW = rect.width * zoom
    const bgH = rect.height * zoom
    lens.style.left = `${x - half}px`
    lens.style.top = `${y - half}px`
    lens.style.backgroundSize = `${bgW}px ${bgH}px`
    lens.style.backgroundPosition = `${-(x * zoom - half)}px ${-(y * zoom - half)}px`
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onMouseMove={handleMove}
      style={{ position: 'relative', aspectRatio, width: '100%', cursor: active ? 'crosshair' : 'zoom-in', overflow: 'hidden' }}
    >
      <Img label={label} src={src} style={{ aspectRatio, width: '100%', height: '100%' }}/>
      {children}
      <div
        ref={lensRef}
        aria-hidden
        style={{
          position: 'absolute', pointerEvents: 'none', left: 0, top: 0,
          width: lensSize, height: lensSize, borderRadius: '50%',
          border: '2px solid var(--gold)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.6) inset',
          backgroundImage: `url(${hiResUrl})`,
          backgroundRepeat: 'no-repeat',
          opacity: active ? 1 : 0,
          transform: active ? 'scale(1)' : 'scale(0.6)',
          transition: 'opacity 0.2s var(--ease-out), transform 0.25s var(--ease-out)',
          willChange: 'left, top, background-position',
        }}
      />
    </div>
  )
}