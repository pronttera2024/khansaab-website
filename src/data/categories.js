// ─── Categories ──────────────────────────────────────────────────────────────
// Category taxonomy with metadata for the bento grid on the homepage.

export const CATEGORIES = [
  {
    id: 'thobes',
    name: 'Thobes',
    arabic: 'ثوب',
    desc: 'Classical ankle-length robes in cotton, linen and silk-blends.',
    count: 64,
    bg: 'var(--ivory)',
    color: 'var(--ink)',
    img: 'IVORY THOBE · FULL BODY',
    src: '/assets/thobe_ivory.png',
    featured: true,
  },
  {
    id: 'shimag',
    name: 'Shimag',
    arabic: 'شماغ',
    desc: 'Premium headwraps in the finest Yemeni and Kashmiri weaves.',
    count: 38,
    bg: 'var(--sand)',
    color: 'var(--ink)',
    img: 'WHITE GHUTRA + AGAL',
    src: '/assets/shemagh.png',
  },
  {
    id: 'keffiyah',
    name: 'Keffiyah',
    arabic: 'كوفية',
    desc: 'Traditional woven headdress — a symbol of heritage and identity.',
    count: 24,
    bg: 'var(--ink)',
    color: 'var(--ivory)',
    img: 'BLACK BISHT · GOLD TRIM',
    src: '/assets/bisht_black.png',
  },
]

// Filter / taxonomy options for the products page
export const FILTER_OPTIONS = {
  category: [['all', 'All garments'], ['thobes', 'Thobes'], ['shimag', 'Shimag'], ['keffiyah', 'Keffiyah']],
}

export const SORT_OPTIONS = [
  { v: 'featured', label: 'Featured' },
  { v: 'new', label: 'Newest' },
  { v: 'price-asc', label: 'Price: Low to High' },
  { v: 'price-desc', label: 'Price: High to Low' },
]
