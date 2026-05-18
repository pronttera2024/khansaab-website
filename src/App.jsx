import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { RouterProvider } from './context/RouterContext.jsx'
import { ModalsProvider, useModals } from './context/ModalsContext.jsx'

import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import AtelierDialog from './components/AtelierDialog.jsx'
import SizeGuideDrawer from './components/SizeGuideDrawer.jsx'
import TweaksPanel from './components/TweaksPanel.jsx'

import HomePage from './pages/HomePage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import StoryPage from './pages/StoryPage.jsx'
import LegalPage from './pages/LegalPage.jsx'

// Reads modal state from context and renders the dialogs.
// Must be a child of ModalsProvider.
function Modals() {
  const { atelierOpen, closeAtelier, sizeGuideOpen, closeSizeGuide } = useModals()
  return (
    <>
      <AtelierDialog   open={atelierOpen}   onClose={closeAtelier} />
      <SizeGuideDrawer open={sizeGuideOpen} onClose={closeSizeGuide} />
    </>
  )
}

// TweaksPanel route dropdown → real path
const ROUTE_MAP = {
  home:                  '/',
  products:              '/products',
  product:               '/product',
  story:                 '/story',
  'legal-terms':         '/legal/legal-terms',
  'legal-privacy':       '/legal/legal-privacy',
  'legal-cookies':       '/legal/legal-cookies',
  'legal-accessibility': '/legal/legal-accessibility',
  'legal-shipping':      '/legal/legal-shipping',
  'legal-returns':       '/legal/legal-returns',
  'legal-care':          '/legal/legal-care',
}

// Inner shell — needs useNavigate, which requires BrowserRouter above it.
// RouterProvider also needs BrowserRouter, so both live here.
function AppShell() {
  const navigate = useNavigate()
  const [tweaks, setTweaks] = useState({ rtl: false, accent: '#0F3B2E', currentRoute: 'home' })
  const setTweak = (key, val) => setTweaks(t => ({ ...t, [key]: val }))
  const setRoute = (name) => {
    setTweak('currentRoute', name)
    navigate(ROUTE_MAP[name] ?? '/')
  }

  return (
    <RouterProvider>
      <ModalsProvider>
        {/* Nav sits above all pages — always visible */}
        <Nav />

        {/* Page-level routes */}
        <Routes>
          <Route path="/"            element={<HomePage />} />
          <Route path="/products"    element={<ProductsPage />} />
          <Route path="/product"     element={<ProductDetailPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/story"       element={<StoryPage />} />
          <Route path="/legal/:slug" element={<LegalPage />} />
          <Route path="*"            element={<HomePage />} />
        </Routes>

        {/* Footer sits below all pages — always visible */}
        <Footer />

        {/* Global overlays — rendered once, controlled by ModalsContext */}
        <Modals />

        {/* Dev helper — TweaksPanel */}
        <TweaksPanel tweaks={tweaks} setTweak={setTweak} setRoute={setRoute} />
      </ModalsProvider>
    </RouterProvider>
  )
}

export default function App() {
  return <AppShell />
}