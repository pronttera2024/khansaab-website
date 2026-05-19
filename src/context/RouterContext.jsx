import { createContext, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const RouterContext = createContext(null)

const ROUTES = {
  home:        '/',
  products:    '/products',
  product:     '/product',
  story:       '/story',
  collections: '/products',   // alias → products until Collections page exists
  about:       '/story',      // alias → story until About page exists
  contact:     '/story',      // alias → story until Contact page exists
}

export function RouterProvider({ children }) {
  const navigate = useNavigate()
  const location = useLocation()

  const go = (nameOrPath) => {
    const path = ROUTES[nameOrPath] ?? nameOrPath
    navigate(path)
  }

  return (
    <RouterContext.Provider value={{ go, currentRoute: location.pathname, location }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRouter() {
  const ctx = useContext(RouterContext)
  if (!ctx) throw new Error('useRouter must be used inside <RouterProvider>')
  return ctx
}