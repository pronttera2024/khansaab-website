// ─── Product Catalog ─────────────────────────────────────────────────────────
// Normalized product data. Single source of truth.
// Products in other pages reference this via helper functions.

export const ALL_PRODUCTS = [
  {
    id: 'ivory-sovereign-thobe',
    name: 'The Ivory Sovereign Thobe',
    arabic: 'الثوب الملكي',
    category: 'thobes',
    catLabel: 'Saudi Thobe · Hand-stitched',
    price: 2200,
    oldPrice: 3000,
    tag: 'BEST SELLER',
    occasion: 'everyday',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviewCount: 247,
    description: 'Our signature ankle-length Saudi thobe in heavyweight ivory Japanese cotton. Hand-cut by a single artisan, finished over 14 working days, and signed on the inner placket. The Sovereign features our quartet collar, mother-of-pearl tarboosh and pearl-stitched cuffs.',
    images: {
      primary: '/src/data/images/set-1/1.png',
      secondary: '/src/data/images/set-1/2.png',
    },
    gallery: [
      { label: 'IVORY SOVEREIGN · FRONT FULL', src: '/src/data/product-details/1.png' },
      { label: 'IVORY SOVEREIGN · COLLAR DETAIL', src: '/src/data/product-details/2.png' },
      { label: 'IVORY SOVEREIGN · CUFF + TARBOOSH', src: '/src/data/product-details/3.png' },
      { label: 'IVORY SOVEREIGN · BACK · STUDIO', src: '/src/data/product-details/4.png' },
      { label: 'IVORY SOVEREIGN · WORN · OUTDOOR', src: '/src/data/product-details/5.png' },
      { label: 'IVORY SOVEREIGN · DETAIL · ATELIER', src: '/src/data/product-details/6.png' },
    ],
    features: [
      { icon: '✦', title: 'Quartet collar', desc: 'Four-piece tailored collar with mother-of-pearl tarboosh.' },
      { icon: '✦', title: 'Hand-stitched cuffs', desc: '60 stitches per cm in pearl-grey silk thread.' },
      { icon: '✦', title: 'Signed placket', desc: "The maker's name stitched on the inside." },
      { icon: '✦', title: '14-day finish', desc: 'From cutting bench to your box, signed and dated.' },
    ],
  },
  {
    id: 'pearl-emirati-kandura',
    name: 'Pearl Emirati Kandura',
    arabic: 'كندورة اللؤلؤ',
    category: 'thobes',
    catLabel: 'Emirati · Long sleeve · Tarboosh',
    price: 2200,
    oldPrice: 3000,
    tag: "EDITORS' PICK",
    occasion: 'everyday',
    sizes: ['S', 'M', 'L', 'XL'],
    images: {
      primary: '/src/data/images/set-2/1.png',
      secondary: '/src/data/images/set-2/2.png',
    },
  },
  {
    id: 'obsidian-royal-bisht',
    name: 'Obsidian Royal Bisht',
    arabic: 'بشت أسود',
    category: 'thobes',
    catLabel: 'Ceremonial · 24k gold thread',
    price: 2200,
    oldPrice: 3000,
    tag: 'MADE TO ORDER',
    occasion: 'wedding',
    sizes: ['L', 'XL', 'XXL'],
    images: {
      primary: '/src/data/images/set-3/1.png',
      secondary: '/src/data/images/set-3/2.png',
    },
  },
  {
    id: 'emerald-hooded-jubba',
    name: 'Emerald Hooded Jubba',
    arabic: 'جبة خضراء',
    category: 'thobes',
    catLabel: 'Moroccan cut · Wool blend',
    price: 2200,
    oldPrice: 3000,
    tag: 'NEW',
    occasion: 'festive',
    sizes: ['M', 'L', 'XL'],
    images: {
      primary: '/src/data/images/set-4/1.png',
      secondary: '/src/data/images/set-4/2.png',
    },
  },
  {
    id: 'sand-linen-thobe',
    name: 'Sand Linen Thobe',
    arabic: 'ثوب الرمل',
    category: 'thobes',
    catLabel: 'Saudi Thobe · Cotton',
    price: 2200,
    oldPrice: 3000,
    tag: null,
    occasion: 'everyday',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: {
      primary: '/src/data/images/set-5/1.png',
      secondary: '/src/data/images/set-5/2.png',
    },
  },
  {
    id: 'charcoal-diplomat',
    name: 'Charcoal Diplomat',
    arabic: 'الدبلوماسي',
    category: 'thobes',
    catLabel: 'Travel · Japanese cotton',
    price: 2200,
    oldPrice: 3000,
    tag: 'DIPLOMATIC',
    occasion: 'business',
    images: {
      primary: '/src/data/images/set-3/1.png',
      secondary: '/src/data/images/set-3/2.png',
    },
  },
  {
    id: 'cream-festive-kandura',
    name: 'Cream Festive Kandura',
    arabic: 'كندورة العيد',
    category: 'thobes',
    catLabel: 'Emirati · Festive',
    price: 2200,
    oldPrice: 3000,
    tag: null,
    occasion: 'festive',
    images: {
      primary: '/src/data/images/set-4/1.png',
      secondary: '/src/data/images/set-4/2.png',
    },
  },
  {
    id: 'navy-ceremonial-bisht',
    name: 'Navy Ceremonial Bisht',
    arabic: 'بشت كحلي',
    category: 'thobes',
    catLabel: 'Ceremonial · Navy',
    price: 2200,
    oldPrice: 3000,
    tag: 'WEDDING',
    occasion: 'wedding',
    images: {
      primary: '/src/data/images/set-2/1.png',
      secondary: '/src/data/images/set-2/2.png',
    },
  },
  {
    id: 'sage-hooded-jubba',
    name: 'Sage Hooded Jubba',
    arabic: 'جبة بحرية',
    category: 'thobes',
    catLabel: 'Moroccan cut · Sage',
    price: 2200,
    oldPrice: 3000,
    tag: null,
    occasion: 'festive',
    images: {
      primary: '/src/data/images/set-5/1.png',
      secondary: '/src/data/images/set-5/2.png',
    },
  },
  {
    id: 'royal-saudi-thobe',
    name: 'Royal Saudi Thobe',
    arabic: 'ثوب سعودي',
    category: 'thobes',
    catLabel: 'Saudi Thobe · Cotton',
    price: 2200,
    oldPrice: 3000,
    tag: 'BEST SELLER',
    occasion: 'everyday',
    images: {
      primary: '/src/data/images/set-1/1.png',
      secondary: '/src/data/images/set-1/2.png',
    },
  },
  {
    id: 'black-eid-kandura',
    name: 'Black Eid Kandura',
    arabic: 'كندورة العيد',
    category: 'kanduras',
    catLabel: 'Emirati · Eid',
    price: 2200,
    oldPrice: 3000,
    tag: 'EID',
    occasion: 'festive',
    images: {
      primary: '/src/data/images/set-4/1.png',
      secondary: '/src/data/images/set-4/2.png',
    },
  },
  {
    id: 'beige-camel-bisht',
    name: 'Beige Camel Bisht',
    arabic: 'بشت جمل',
    category: 'bishts',
    catLabel: 'Ceremonial · Camel wool',
    price: 2200,
    oldPrice: 3000,
    tag: null,
    occasion: 'wedding',
    images: {
      primary: '/src/data/images/set-2/1.png',
      secondary: '/src/data/images/set-2/2.png',
    },
  },
]

// ─── Related / cross-sell products (for PDP) ─────────────────────────────────
export const RELATED_PRODUCTS = [
  { id: 'pearl-emirati-kandura', name: 'Pearl Emirati Kandura', arabic: 'كندورة اللؤلؤ', cat: 'kanduras', price: 2200, old: 3000, tag: "EDITORS' PICK", src: '/assets/hero_1.png' },
  { id: 'obsidian-royal-bisht', name: 'Obsidian Royal Bisht', arabic: 'بشت أسود', cat: 'bishts', price: 2200, old: 3000, tag: 'MADE TO ORDER', src: '/assets/bisht_black.png' },
  { id: 'white-yemeni-shemagh', name: 'White Yemeni Shemagh', arabic: 'شماغ يمني', cat: 'accessories', price: 2200, old: 3000, src: '/assets/shemagh.png' },
  { id: 'amber-misbaha-set', name: 'Amber Misbaha Set', arabic: 'مسبحة عنبر', cat: 'accessories', price: 2200, old: 3000, tag: 'NEW', src: '/assets/accessories.png' },
]

// ─── Helper functions ─────────────────────────────────────────────────────────

/** Get a product by its slug id */
export function getProductById(id) {
  return ALL_PRODUCTS.find(p => p.id === id) || ALL_PRODUCTS[0]
}

/** Get bestseller products (first 4 with BEST SELLER or EDITORS' PICK tags) */
export function getBestsellers() {
  return ALL_PRODUCTS.slice(0, 4)
}

/** Get collection products (first 6 for homepage collection grid) */
export function getCollectionProducts() {
  return ALL_PRODUCTS.slice(0, 6)
}

/** Adapt a product to the legacy format used by ProductCard components */
export function toCardFormat(product) {
  return {
    id: product.id,
    name: product.name,
    arabic: product.arabic,
    cat: product.category,
    price: product.price,
    old: product.oldPrice,
    tag: product.tag,
    occasion: product.occasion,
    sizes: product.sizes || [],
    src: product.images.primary,
    src2: product.images.secondary,
  }
}

/** Get the featured PDP product (currently only one detail page) */
export function getFeaturedProduct() {
  return getProductForPDP(ALL_PRODUCTS[0])
}

/** Transform a raw product into the PDP display shape */
export function getProductForPDP(p) {
  if (!p) return null
  return {
    id: p.id,
    name: p.name,
    arabic: p.arabic,
    cat: p.catLabel || p.category,
    price: p.price,
    old: p.oldPrice,
    rating: p.rating || 4.9,
    reviews: p.reviewCount || 0,
    tag: p.tag,
    desc: p.description || '',
    sizes: p.sizes || [],
    gallery: p.gallery || [{ label: p.name, src: p.images.primary }],
    features: (p.features || []).map(f => ({ i: f.icon, t: f.title, d: f.desc })),
  }
}
