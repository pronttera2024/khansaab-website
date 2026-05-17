import { createContext, useContext } from 'react'

export const ModalsContext = createContext({
  openAtelier: () => {},
  openSizeGuide: () => {}
})

export function useModals() {
  return useContext(ModalsContext)
}
