import { useState, useEffect } from 'react'

export function useViewport() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

  useEffect(() => {
    const onR = () => setW(window.innerWidth)
    window.addEventListener('resize', onR)
    return () => window.removeEventListener('resize', onR)
  }, [])

  return { width: w, isMobile: w <= 720, isTablet: w <= 1024, isPhone: w <= 900 }
}
