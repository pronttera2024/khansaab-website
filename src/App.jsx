import { useState, useEffect } from 'react'
import { RouterContext } from './context/RouterContext.jsx'
import { ModalsContext } from './context/ModalsContext.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import StoryPage from './pages/StoryPage.jsx'
import LegalPage, { LEGAL_PAGES } from './pages/LegalPage.jsx'
import TweaksPanel from './components/TweaksPanel.jsx'
import AtelierDialog from './components/AtelierDialog.jsx'
import SizeGuideDrawer from './components/SizeGuideDrawer.jsx'

const TWEAK_DEFAULTS = {
  accent: '#0F3B2E',
  rtl: false,
}

export default function App() {
  const [route, setRoute] = useState('home')
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS)
  const [atelierOpen, setAtelierOpen] = useState(false)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)

  const setTweak = (key, val) => setTweaks(prev => ({ ...prev, [key]: val }))

  useEffect(() => {
    document.documentElement.style.setProperty('--emerald', tweaks.accent)
  }, [tweaks.accent])

  useEffect(() => {
    document.documentElement.dir = tweaks.rtl ? 'rtl' : 'ltr'
  }, [tweaks.rtl])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [route])

  const isLegal = route.startsWith('legal-')
  const screenLabel =
    route === 'home' ? '01 Home' :
    route === 'products' ? '02 Products' :
    route === 'product' ? '03 Product Detail' :
    route === 'story' ? '04 Story' :
    `05 ${(LEGAL_PAGES[route] || {}).title || 'Legal'}`

  const modalsValue = {
    openAtelier: () => setAtelierOpen(true),
    openSizeGuide: () => setSizeGuideOpen(true),
  }

  return (
    <RouterContext.Provider value={{ route, go: setRoute }}>
      <ModalsContext.Provider value={modalsValue}>
        <div data-screen-label={screenLabel}>
          <Nav light={route !== 'home'} />

          {route === 'home' && <HomePage />}
          {route === 'products' && <ProductsPage />}
          {route === 'product' && <ProductDetailPage />}
          {route === 'story' && <StoryPage />}
          {isLegal && <LegalPage slug={route} />}

          <Footer />
        </div>

        <AtelierDialog open={atelierOpen} onClose={() => setAtelierOpen(false)} />
        <SizeGuideDrawer open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />

        <TweaksPanel title="Tweaks" tweaks={{ ...tweaks, currentRoute: route }} setTweak={setTweak} setRoute={setRoute} />
      </ModalsContext.Provider>
    </RouterContext.Provider>
  )
}
