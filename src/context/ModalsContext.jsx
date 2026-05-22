import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const ModalsContext = createContext(null)

const ATELIER_DAILY_KEY = 'khansaab:atelier-last-shown'
const todayStamp = () => new Date().toISOString().slice(0, 10)

export function ModalsProvider({ children }) {
  const [atelierOpen,   setAtelierOpen]   = useState(false)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)

  const openAtelier    = useCallback(() => setAtelierOpen(true),    [])

  useEffect(() => {
    try {
      if (localStorage.getItem(ATELIER_DAILY_KEY) === todayStamp()) return
    } catch { return }
    const t = setTimeout(() => {
      setAtelierOpen(true)
      try { localStorage.setItem(ATELIER_DAILY_KEY, todayStamp()) } catch {}
    }, 2500)
    return () => clearTimeout(t)
  }, [])

  const closeAtelier   = useCallback(() => setAtelierOpen(false),   [])
  const openSizeGuide  = useCallback(() => setSizeGuideOpen(true),  [])
  const closeSizeGuide = useCallback(() => setSizeGuideOpen(false), [])

  return (
    <ModalsContext.Provider value={{
      atelierOpen,   openAtelier,   closeAtelier,
      sizeGuideOpen, openSizeGuide, closeSizeGuide,
    }}>
      {children}
    </ModalsContext.Provider>
  )
}

export function useModals() {
  const ctx = useContext(ModalsContext)
  if (!ctx) throw new Error('useModals must be used inside <ModalsProvider>')
  return ctx
}