import { createContext, useContext, useState, useCallback } from 'react'
import { markAtelierDismissed } from '../hooks/useAutoPopup.js'

const ModalsContext = createContext(null)

export function ModalsProvider({ children }) {
  const [atelierOpen,   setAtelierOpen]   = useState(false)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)

  const openAtelier    = useCallback(() => setAtelierOpen(true),    [])
  const closeAtelier   = useCallback(() => { setAtelierOpen(false); markAtelierDismissed() }, [])
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