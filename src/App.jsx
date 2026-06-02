import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { RouterProvider } from "./context/RouterContext.jsx";
import { ModalsProvider, useModals } from "./context/ModalsContext.jsx";
import { useAutoPopup } from "./hooks/useAutoPopup.js";
import { useSmoothScroll } from "./hooks/useSmoothScroll.js";

import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import collectionDialog from "./components/collectionDialog.jsx";
import SizeGuideDrawer from "./components/SizeGuideDrawer.jsx";
import TweaksPanel from "./components/TweaksPanel.jsx";

import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import StoryPage from "./pages/StoryPage.jsx";
import LegalPage from "./pages/LegalPage.jsx";
import WholesalePage from "./pages/WholesalePage.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Reads modal state from context and renders the dialogs.
// Must be a child of ModalsProvider.
function Modals() {
  const {
    collectionOpen,
    closecollection,
    opencollection,
    sizeGuideOpen,
    closeSizeGuide,
  } = useModals();

  // Auto-popup disabled for now — uncomment to re-enable
  // const { pathname } = useLocation()
  // useAutoPopup(collectionOpen, opencollection, pathname === '/')

  return (
    <>
      <collectionDialog open={collectionOpen} onClose={closecollection} />
      <SizeGuideDrawer open={sizeGuideOpen} onClose={closeSizeGuide} />
    </>
  );
}

// TweaksPanel route dropdown → real path
const ROUTE_MAP = {
  home: "/",
  products: "/products",
  product: "/product/ivory-sovereign-thobe",
  story: "/story",
  "legal-terms": "/legal/legal-terms",
  "legal-privacy": "/legal/legal-privacy",
  "legal-cookies": "/legal/legal-cookies",
  "legal-accessibility": "/legal/legal-accessibility",
  "legal-shipping": "/legal/legal-shipping",
  "legal-returns": "/legal/legal-returns",
  "legal-care": "/legal/legal-care",
};

// Inner shell — needs useNavigate, which requires BrowserRouter above it.
// RouterProvider also needs BrowserRouter, so both live here.
function AppShell() {
  useSmoothScroll();
  const navigate = useNavigate();
  const [tweaks, setTweaks] = useState({
    rtl: false,
    accent: "#0F3B2E",
    currentRoute: "home",
  });
  const setTweak = (key, val) => setTweaks((t) => ({ ...t, [key]: val }));
  const setRoute = (name) => {
    setTweak("currentRoute", name);
    navigate(ROUTE_MAP[name] ?? "/");
  };

  return (
    <RouterProvider>
      <ModalsProvider>
        {/* Nav sits above all pages — always visible */}
        <Nav />

        <ScrollToTop />

        {/* Page-level routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/wholesale" element={<WholesalePage />} />
          <Route path="/legal/:slug" element={<LegalPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>

        {/* Footer sits below all pages — always visible */}
        <Footer />

        {/* Global overlays — rendered once, controlled by ModalsContext */}
        <Modals />

        {/* Dev helper — TweaksPanel */}
        <TweaksPanel tweaks={tweaks} setTweak={setTweak} setRoute={setRoute} />
      </ModalsProvider>
    </RouterProvider>
  );
}

export default function App() {
  return <AppShell />;
}
