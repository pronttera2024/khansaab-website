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
      primary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381796/24_u7vudz.png',
      secondary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381795/26_kh13ma.png',
    },
    gallery: [
      { label: 'IVORY SOVEREIGN · FRONT FULL', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381796/24_u7vudz.png' },
      { label: 'IVORY SOVEREIGN · COLLAR DETAIL', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381795/26_kh13ma.png' },
      { label: 'IVORY SOVEREIGN · CUFF + TARBOOSH', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381795/25_kcdcxd.png' },
      { label: 'IVORY SOVEREIGN · BACK · STUDIO', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381807/27_ezze0a.png' },
    ],
    features: [
      { icon: '✦', title: 'Quartet collar', desc: 'Four-piece tailored collar with mother-of-pearl tarboosh.' },
      { icon: '✦', title: 'Hand-stitched cuffs', desc: '60 stitches per cm in pearl-grey silk thread.' },
      { icon: '✦', title: 'Signed placket', desc: "The maker's name stitched on the inside." },
      { icon: '✦', title: '14-day finish', desc: 'From cutting bench to your box, signed and dated.' },
    ],
  },
  {
    id: 'grey-taupe-thobe',
    name: 'Grey Taupe Thobe',
    arabic: 'ثوب رمادي',
    category: 'thobes',
    catLabel: 'Emirati · Long sleeve · Tarboosh',
    price: 2200,
    oldPrice: 3000,
    tag: "EDITORS' PICK",
    occasion: 'everyday',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: {
      primary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381505/20_x1ksly.png',
      secondary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381502/17_b2r6nr.png',
    },
    gallery: [
      { label: 'GREY TAUPE · FRONT', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381505/20_x1ksly.png' },
      { label: 'GREY TAUPE · BACK', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381502/17_b2r6nr.png' },
      { label: 'GREY TAUPE · DETAIL', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381507/19_ewzqsq.png' },
      { label: 'GREY TAUPE · SIDE', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381509/16_midnc6.png' },
      { label: 'GREY TAUPE · WORN', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381499/18_vcyece.png' },
    ],
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
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: {
      primary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381186/10_svmpp3.png',
      secondary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381190/9_fm8dci.png',
    },
    gallery: [
      { label: 'OBSIDIAN BISHT · BACK', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381186/10_svmpp3.png' },
      { label: 'OBSIDIAN BISHT · FRONT', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381190/9_fm8dci.png' },
      { label: 'OBSIDIAN BISHT · DETAIL', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381189/11_kgkcdt.png' },
      { label: 'OBSIDIAN BISHT · SIDE', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381189/12_eq8dyb.png' },
    ],
  },
  {
    id: 'mustard-gold-thobe',
    name: 'Mustard Gold Thobe',
    arabic: 'ثوب ذهبي',
    category: 'thobes',
    catLabel: 'Moroccan cut · Wool blend',
    price: 2200,
    oldPrice: 3000,
    tag: 'NEW',
    occasion: 'festive',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: {
      primary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381861/34_cjch2t.png',
      secondary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381864/33_pcjtqr.png',
    },
    gallery: [
      { label: 'MUSTARD GOLD · FRONT', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381861/34_cjch2t.png' },
      { label: 'MUSTARD GOLD · BACK', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381864/33_pcjtqr.png' },
      { label: 'MUSTARD GOLD · DETAIL', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381861/32_fkpwyw.png' },
      { label: 'MUSTARD GOLD · SIDE', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381861/32_fkpwyw.png' },
    ],
  },
  {
    id: 'onion-pink-thobe',
    name: 'Onion Pink Thobe',
    arabic: 'ثوب وردي',
    category: 'thobes',
    catLabel: 'Saudi Thobe · Cotton',
    price: 2200,
    oldPrice: 3000,
    tag: null,
    occasion: 'everyday',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: {
      primary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779382017/5_ayyilv.png',
      secondary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779382017/5_ayyilv.png',
    },
  },
  {
    id: 'dusty-blue-thobe',
    name: 'Dusty Blue Thobe',
    arabic: 'ثوب أزرق',
    category: 'thobes',
    catLabel: 'Travel · Japanese cotton',
    price: 2200,
    oldPrice: 3000,
    tag: 'DIPLOMATIC',
    occasion: 'business',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: {
      primary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381963/3_usamfa.png',
      secondary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381988/1_mwafaa.png',
    },
    gallery: [
      { label: 'DUSTY BLUE · FRONT', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381963/3_usamfa.png' },
      { label: 'DUSTY BLUE · BACK', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381988/1_mwafaa.png' },
      { label: 'DUSTY BLUE · DETAIL', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381973/4_jd24ya.png' },
      { label: 'DUSTY BLUE · SIDE', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381967/2_lgcclb.png' },
    ],
  },
  {
    id: 'stone-grey-thobe',
    name: 'Stone Grey Thobe',
    arabic: 'ثوب رمادي فاتح',
    category: 'thobes',
    catLabel: 'Emirati · Festive',
    price: 2200,
    oldPrice: 3000,
    tag: null,
    occasion: 'festive',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: {
      primary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779382389/9_bmqbnt.png',
      secondary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779383434/KhanSaab_yry8gu.png',
    },
    gallery: [
      { label: 'STONE GREY · FRONT', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779382389/9_bmqbnt.png' },
      { label: 'STONE GREY · BACK', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779382390/8_pbobzl.png' },
      { label: 'STONE GREY · DETAIL', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779382402/10_jifepo.png' },
      { label: 'STONE GREY · SIDE', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779383434/KhanSaab_yry8gu.png' },
    ],
  },
  {
    id: 'olive-green-thobe',
    name: 'Olive Green Thobe',
    arabic: 'ثوب زيتوني',
    category: 'thobes',
    catLabel: 'Ceremonial · Navy',
    price: 2200,
    oldPrice: 3000,
    tag: 'WEDDING',
    occasion: 'wedding',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: {
      primary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779382605/18_zs4h83.png',
      secondary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779382620/15_xwxov1.png',
    },
  },
  {
    id: 'golden-beige-thobe',
    name: 'Golden Beige Thobe',
    arabic: 'ثوب بيج ذهبي',
    category: 'thobes',
    catLabel: 'Moroccan cut · Sage',
    price: 2200,
    oldPrice: 3000,
    tag: null,
    occasion: 'festive',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: {
      primary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779382835/22_oxlh5v.png',
      secondary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779382839/21_zmi8ct.png',
    },
    gallery: [
      { label: 'GOLDEN BEIGE · FRONT', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779382835/22_oxlh5v.png' },
      { label: 'GOLDEN BEIGE · BACK', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779382839/21_zmi8ct.png' },
      { label: 'GOLDEN BEIGE · DETAIL', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779382812/19_qynbvo.png' },
      { label: 'GOLDEN BEIGE · SIDE', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779382812/20_kijrep.png' },
    ],
  },
  {
    id: 'khaki-thobe',
    name: 'Khaki Thobe',
    arabic: 'ثوب خاكي',
    category: 'thobes',
    catLabel: 'Saudi Thobe · Cotton',
    price: 2200,
    oldPrice: 3000,
    tag: 'BEST SELLER',
    occasion: 'everyday',
    images: {
      primary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779383396/26_dyv2hu.png',
      secondary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779382873/23_ezsxgf.png',
    },
    gallery: [
      { label: 'KHAKI · FRONT', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779383396/26_dyv2hu.png' },
      { label: 'KHAKI · BACK', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779382873/23_ezsxgf.png' },
      { label: 'KHAKI · DETAIL', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779383400/24_pbqifh.png' },
    ],
  },
  {
    id: 'dusty-grey-kuwaiti-thobe',
    name: 'Dusty Grey Kuwaiti Thobe',
    arabic: 'ثوب كويتي رمادي',
    category: 'kanduras',
    catLabel: 'Emirati · Eid',
    price: 2200,
    oldPrice: 3000,
    tag: 'EID',
    occasion: 'festive',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: {
      primary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779383586/29_ol0rem.png',
      secondary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779383582/27_kiypyw.png',
    },
  },
  {
    id: 'dark-grey-thobe',
    name: 'Dark Grey Thobe',
    arabic: 'ثوب رمادي داكن',
    category: 'bishts',
    catLabel: 'Ceremonial · Camel wool',
    price: 2200,
    oldPrice: 3000,
    tag: null,
    occasion: 'wedding',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: {
      primary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779383698/34_go5vto.png',
      secondary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779383703/36_h3sv87.png',
    },
    gallery: [
      { label: 'DARK GREY · FRONT', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779383698/34_go5vto.png' },
      { label: 'DARK GREY · BACK', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779383703/36_h3sv87.png' },
      { label: 'DARK GREY · DETAIL', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779383698/33_h7yupa.png' },
      { label: 'DARK GREY · SIDE', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779383714/35_dkntqh.png' },
    ],
  },
  {
    id: 'violet-kuwaiti-thobe',
    name: 'Violet Kuwaiti Thobe',
    arabic: 'ثوب بنفسجي',
    category: 'thobes',
    catLabel: 'Saudi Thobe · Cotton',
    price: 2200,
    oldPrice: 3000,
    tag: null,
    occasion: 'everyday',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: {
      primary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779384157/12_mvjkjh.png',
      secondary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779384153/11_q1sjxx.png',
    },
    gallery: [
      { label: 'VIOLET · FRONT', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779384157/12_mvjkjh.png' },
      { label: 'VIOLET · BACK', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779384153/11_q1sjxx.png' },
      { label: 'VIOLET · DETAIL', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779384077/9_sptq6a.png' },
      { label: 'VIOLET · SIDE', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779384155/10_zefjuz.png' },
    ],
  },
  {
    id: 'powder-blue-kuwaiti-thobe',
    name: 'Powder Blue Kuwaiti Thobe',
    arabic: 'ثوب كويتي أزرق',
    category: 'thobes',
    catLabel: 'Kuwaiti · Cotton blend',
    price: 2200,
    oldPrice: 3000,
    tag: null,
    occasion: 'everyday',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: {
      primary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779384020/8_cnfmih.png',
      secondary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779383971/6_c8d2jy.png',
    },
    gallery: [
      { label: 'POWDER BLUE · FRONT', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779384020/8_cnfmih.png' },
      { label: 'POWDER BLUE · BACK', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779383971/6_c8d2jy.png' },
      { label: 'POWDER BLUE · DETAIL', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779384023/7_efy37e.png' },
      { label: 'POWDER BLUE · SIDE', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779383957/5_w1dbbs.png' },
    ],
  },
  {
    id: 'mocha-beige-thobe',
    name: 'Mocha Beige Thobe',
    arabic: 'ثوب موكا بيج',
    category: 'thobes',
    catLabel: 'Linen blend · Lightweight',
    price: 2200,
    oldPrice: 3000,
    tag: null,
    occasion: 'everyday',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: {
      primary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779384401/20_itqljk.png',
      secondary: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779384447/23_nbvekl.png',
    },
    gallery: [
      { label: 'MOCHA BEIGE · FRONT', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779384401/20_itqljk.png' },
      { label: 'MOCHA BEIGE · BACK', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779384447/23_nbvekl.png' },
      { label: 'MOCHA BEIGE · DETAIL', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779384444/21_nqtsjb.png' },
      { label: 'MOCHA BEIGE · SIDE', src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779384443/22_mphchu.png' },
    ],
  },
]

// ─── Related / cross-sell products (for PDP) ─────────────────────────────────
export const RELATED_PRODUCTS = [
  { id: 'grey-taupe-thobe', name: 'Grey Taupe Thobe', arabic: 'ثوب رمادي', cat: 'thobes', price: 2200, old: 3000, tag: "EDITORS' PICK", src: 'https://res.cloudinary.com/dljg7vpso/image/upload/v1779381505/20_x1ksly.png' },
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
