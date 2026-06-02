// ─── Navigation ──────────────────────────────────────────────────────────────
// Main nav links and footer link structure.

export const NAV_LINKS = [
  { path: "/", label: "Home", num: "01" },
  { path: "/products", label: "Collection", num: "02" },
  { path: "/story", label: "Our Story", num: "03" },
];

// Footer link groups — paths are used; callbacks are resolved in the component.
export const FOOTER_LINKS = {
  collection: {
    title: "Collection",
    items: [
      { label: "Thobes", path: "/products" },
      { label: "Kanduras", path: "/products" },
      { label: "Bishts", path: "/products" },
      { label: "Jubbas", path: "/products" },
      { label: "Shemaghs", path: "/products" },
      { label: "Gift Cards", path: "/products" },
    ],
  },
  house: {
    title: "House",
    items: [
      { label: "Our Story", path: "/story" },
      { label: "The collection", action: "opencollection" },
      { label: "Craftsmanship", path: "/story" },
      { label: "Journal", path: "/story" },
      { label: "Press", path: "/story" },
    ],
  },
  service: {
    title: "Service",
    items: [
      { label: "Made to Measure", action: "opencollection" },
      { label: "Size Guide", action: "openSizeGuide" },
      { label: "Shipping", path: "/legal/legal-shipping" },
      { label: "Returns", path: "/legal/legal-returns" },
      { label: "Care Guide", path: "/legal/legal-care" },
    ],
  },
  legal: {
    title: "Legal",
    items: [
      { label: "Terms", path: "/legal/legal-terms" },
      { label: "Privacy", path: "/legal/legal-privacy" },
      { label: "Cookies", path: "/legal/legal-cookies" },
      { label: "Accessibility", path: "/legal/legal-accessibility" },
    ],
  },
};
