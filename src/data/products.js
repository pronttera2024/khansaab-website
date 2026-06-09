// ─── Product Catalog ─────────────────────────────────────────────────────────
// Normalized product data. Single source of truth.
// Products in other pages reference this via helper functions.

export const ALL_PRODUCTS = [
  {
    id: "classic-white-thobe",
    name: "Classic White Thobe",
    arabic: "ثوب أبيض كلاسيكي",
    category: "thobes",
    catLabel: "Saudi Thobe · Cotton",
    price: 2400,
    oldPrice: 3000,
    tag: "NEW",
    occasion: "everyday",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "A timeless Saudi thobe in pure white premium cotton. Features a clean mandarin collar, straight-cut silhouette, and hidden placket for a refined, minimalist look. Perfect for daily wear and Friday prayers.",
    features: [
      {
        icon: "✦",
        title: "Mandarin collar",
        desc: "Clean-cut stand collar with concealed button closure.",
      },
      {
        icon: "✦",
        title: "Premium cotton",
        desc: "100% long-staple cotton, breathable and soft against skin.",
      },
      {
        icon: "✦",
        title: "Hidden placket",
        desc: "Concealed front buttons for a seamless, polished finish.",
      },
      {
        icon: "✦",
        title: "Straight-cut fit",
        desc: "Classic Saudi silhouette with ankle-length drape.",
      },
    ],
    images: {
      primary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1780923243/14_cp0flx.png",
      secondary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779384379/15_tlfxx3.png",
    },
    gallery: [
      {
        label: "CLASSIC WHITE · FRONT",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1780923243/14_cp0flx.png",
      },
      {
        label: "CLASSIC WHITE · BACK",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779384255/13_gvtz7o.png",
      },
      {
        label: "CLASSIC WHITE · DETAIL",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779384379/15_tlfxx3.png",
      },
    ],
  },
  {
    id: "grey-taupe-thobe",
    name: "Grey Taupe Thobe",
    arabic: "ثوب رمادي",
    category: "thobes",
    catLabel: "Emirati · Long sleeve · Tarboosh",
    price: 2400,
    oldPrice: 3000,
    tag: "EDITORS' PICK",
    occasion: "everyday",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "An elegant Emirati-style thobe in sophisticated grey taupe. Features a signature tarboosh collar, full-length sleeves with French cuffs, and a tailored drape that commands presence in any gathering.",
    features: [
      {
        icon: "✦",
        title: "Tarboosh collar",
        desc: "Signature Emirati collar with structured stand and elegant fold.",
      },
      {
        icon: "✦",
        title: "French cuffs",
        desc: "Double-fold cuffs with premium cufflink-ready buttonholes.",
      },
      {
        icon: "✦",
        title: "Tailored drape",
        desc: "Precision-cut through the shoulders for a commanding silhouette.",
      },
      {
        icon: "✦",
        title: "Full-length sleeves",
        desc: "Extended sleeves with clean finishing at the wrist.",
      },
    ],
    images: {
      primary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1780996532/KhanSaab_1_rty95o.png",
      secondary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779381502/17_b2r6nr.png",
    },
    gallery: [
      {
        label: "GREY TAUPE · FRONT",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1780996532/KhanSaab_1_rty95o.png",
      },
      {
        label: "GREY TAUPE · BACK",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779381502/17_b2r6nr.png",
      },
      {
        label: "GREY TAUPE · WORN",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779381499/18_vcyece.png",
      },
    ],
  },
  {
    id: "obsidian-royal-bisht",
    name: "Obsidian Royal Bisht",
    arabic: "بشت أسود",
    category: "thobes",
    catLabel: "Ceremonial · Hand embroidered",
    price: 2400,
    oldPrice: 3000,
    tag: "MADE TO ORDER",
    occasion: "wedding",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "A majestic ceremonial bisht in deep obsidian black, adorned with intricate hand embroidery along the edges. Reserved for weddings, Eid celebrations, and occasions of the highest honour.",
    features: [
      {
        icon: "✦",
        title: "Hand embroidery",
        desc: "Hand-stitched border crafted by our master artisans.",
      },
      {
        icon: "✦",
        title: "Ceremonial weight",
        desc: "Premium heavyweight fabric with a regal drape.",
      },
      {
        icon: "✦",
        title: "Made to order",
        desc: "Individually crafted to your measurements over 21 days.",
      },
      {
        icon: "✦",
        title: "Obsidian black",
        desc: "Deep, lustrous black that holds its richness wear after wear.",
      },
    ],
    images: {
      primary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779381186/10_svmpp3.png",
      secondary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779381190/9_fm8dci.png",
    },
    gallery: [
      {
        label: "OBSIDIAN BISHT · BACK",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779381186/10_svmpp3.png",
      },
      {
        label: "OBSIDIAN BISHT · FRONT",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779381190/9_fm8dci.png",
      },
      {
        label: "OBSIDIAN BISHT · DETAIL",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779381189/11_kgkcdt.png",
      },
      {
        label: "OBSIDIAN BISHT · SIDE",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779381189/12_eq8dyb.png",
      },
    ],
  },
  {
    id: "mustard-gold-thobe",
    name: "Mustard Gold Thobe",
    arabic: "ثوب ذهبي",
    category: "thobes",
    catLabel: "Moroccan cut · Wool blend",
    price: 2600,
    oldPrice: 3200,
    tag: "NEW",
    occasion: "festive",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "A statement-making Moroccan-cut thobe in rich mustard gold. Crafted from a premium wool blend for texture and warmth, with ornate embroidery along the neckline and a relaxed, flowing silhouette.",
    features: [
      {
        icon: "✦",
        title: "Moroccan embroidery",
        desc: "Intricate hand-embroidered motifs along the neckline and chest.",
      },
      {
        icon: "✦",
        title: "Wool blend fabric",
        desc: "Premium wool-cotton blend for warmth with breathability.",
      },
      {
        icon: "✦",
        title: "Relaxed silhouette",
        desc: "Flowing Moroccan cut with generous ease through the body.",
      },
      {
        icon: "✦",
        title: "Festive palette",
        desc: "Rich mustard gold that radiates warmth and celebration.",
      },
    ],
    images: {
      primary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779381861/34_cjch2t.png",
      secondary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1780930335/KhanSaab_toq0t2.png",
    },
    gallery: [
      {
        label: "MUSTARD GOLD · FRONT",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779381861/34_cjch2t.png",
      },
      {
        label: "MUSTARD GOLD · BACK",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1780930335/KhanSaab_toq0t2.png",
      },
      {
        label: "MUSTARD GOLD · DETAIL",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779381861/32_fkpwyw.png",
      },
    ],
  },
  {
    id: "onion-pink-thobe",
    name: "Onion Pink Thobe",
    arabic: "ثوب وردي",
    category: "thobes",
    catLabel: "Saudi Thobe · Cotton",
    price: 2600,
    oldPrice: 3200,
    tag: null,
    occasion: "everyday",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "A contemporary Saudi thobe in a distinctive onion pink hue. Made from breathable premium cotton with a classic collar, concealed buttons, and a modern slim fit for the fashion-forward gentleman.",
    features: [
      {
        icon: "✦",
        title: "Modern colour",
        desc: "Distinctive onion pink — subtle, warm, and contemporary.",
      },
      {
        icon: "✦",
        title: "Slim fit",
        desc: "Tapered modern cut through the body and sleeves.",
      },
      {
        icon: "✦",
        title: "Breathable cotton",
        desc: "Premium long-staple cotton for all-day comfort.",
      },
      {
        icon: "✦",
        title: "Concealed closure",
        desc: "Hidden button placket for a clean, unbroken front.",
      },
    ],
    images: {
      primary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1780921967/6_oemus4.png",
      secondary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1780921966/7_foebc1.png",
    },
  },
  {
    id: "ivory-sovereign-thobe",
    name: "The Ivory Sovereign Thobe",
    arabic: "الثوب الملكي",
    category: "thobes",
    catLabel: "Saudi Thobe · Hand-stitched",
    price: 2400,
    oldPrice: 3000,
    tag: "BEST SELLER",
    occasion: "everyday",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviewCount: 247,
    description:
      "Our signature ankle-length Saudi thobe in heavyweight ivory Japanese cotton. Hand-cut by a single artisan, finished over 14 working days, and signed on the inner placket. The Sovereign features our quartet collar, mother-of-pearl tarboosh and pearl-stitched cuffs.",
    images: {
      primary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779381796/24_u7vudz.png",
      secondary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779381795/26_kh13ma.png",
    },
    gallery: [
      {
        label: "IVORY SOVEREIGN · FRONT FULL",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779381796/24_u7vudz.png",
      },
      {
        label: "IVORY SOVEREIGN · COLLAR DETAIL",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779381795/26_kh13ma.png",
      },
      {
        label: "IVORY SOVEREIGN · CUFF + TARBOOSH",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779381795/25_kcdcxd.png",
      },
      {
        label: "IVORY SOVEREIGN · BACK · STUDIO",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779381807/27_ezze0a.png",
      },
    ],
    features: [
      {
        icon: "✦",
        title: "Quartet collar",
        desc: "Four-piece tailored collar with mother-of-pearl tarboosh.",
      },
      {
        icon: "✦",
        title: "Hand-stitched cuffs",
        desc: "60 stitches per cm in pearl-grey silk thread.",
      },
      {
        icon: "✦",
        title: "Signed placket",
        desc: "The maker's name stitched on the inside.",
      },
      {
        icon: "✦",
        title: "14-day finish",
        desc: "From cutting bench to your box, signed and dated.",
      },
    ],
  },
  {
    id: "black-thobe",
    name: "Black Thobe",
    arabic: "ثوب أسود",
    category: "thobes",
    catLabel: "Saudi Thobe · Cotton",
    price: 2600,
    oldPrice: 3200,
    tag: null,
    occasion: "everyday",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "A timeless Saudi thobe in deep, lustrous black, crafted from premium breathable cotton. Featuring a clean mandarin collar, concealed button placket, and a refined straight-cut silhouette suited for everyday elegance and formal gatherings alike.",
    features: [
      {
        icon: "✦",
        title: "Lustrous black",
        desc: "A deep, rich black that holds its colour wash after wash.",
      },
      {
        icon: "✦",
        title: "Mandarin collar",
        desc: "Clean-cut stand collar with concealed button closure.",
      },
      {
        icon: "✦",
        title: "Breathable cotton",
        desc: "Premium long-staple cotton, soft and comfortable all day.",
      },
      {
        icon: "✦",
        title: "Straight-cut fit",
        desc: "Classic Saudi silhouette with a clean, ankle-length drape.",
      },
    ],
    images: {
      primary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779384599/31_k9xdcs.png",
      secondary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779384562/30_xr1fl4.png",
    },
    gallery: [
      {
        label: "BLACK · FRONT",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779384599/31_k9xdcs.png",
      },
      {
        label: "BLACK · BACK",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779384562/30_xr1fl4.png",
      },
      {
        label: "BLACK · DETAIL",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779384558/29_h2jtvi.png",
      },
      {
        label: "BLACK · SIDE",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779384554/28_qape2d.png",
      },
    ],
  },
  {
    id: "dusty-blue-thobe",
    name: "Dusty Blue Thobe",
    arabic: "ثوب أزرق",
    category: "thobes",
    catLabel: "Travel · Japanese cotton",
    price: 2600,
    oldPrice: 3200,
    tag: "DIPLOMATIC",
    occasion: "business",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Designed for the travelling professional, this dusty blue thobe is crafted from wrinkle-resistant Japanese cotton. Lightweight, breathable, and impeccably structured — it arrives at your destination as crisp as when you left.",
    features: [
      {
        icon: "✦",
        title: "Japanese cotton",
        desc: "Wrinkle-resistant fabric that stays crisp through travel.",
      },
      {
        icon: "✦",
        title: "Travel-ready",
        desc: "Lightweight construction that packs flat and shakes out fresh.",
      },
      {
        icon: "✦",
        title: "Structured collar",
        desc: "Stays sharp without ironing, even after hours of wear.",
      },
      {
        icon: "✦",
        title: "Diplomatic blue",
        desc: "A refined muted blue suited for professional settings.",
      },
    ],
    images: {
      primary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779381963/3_usamfa.png",
      secondary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779381988/1_mwafaa.png",
    },
    gallery: [
      {
        label: "DUSTY BLUE · FRONT",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779381963/3_usamfa.png",
      },
      {
        label: "DUSTY BLUE · BACK",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779381988/1_mwafaa.png",
      },
      {
        label: "DUSTY BLUE · DETAIL",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779381973/4_jd24ya.png",
      },
      {
        label: "DUSTY BLUE · SIDE",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779381967/2_lgcclb.png",
      },
    ],
  },
  {
    id: "stone-grey-thobe",
    name: "Stone Grey Thobe",
    arabic: "ثوب رمادي فاتح",
    category: "thobes",
    catLabel: "Emirati · Festive",
    price: 2400,
    oldPrice: 3000,
    tag: null,
    occasion: "festive",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "A refined Emirati thobe in understated stone grey, ideal for festive occasions. Features a structured collar, precision tailoring through the shoulders, and a subtle sheen that catches the light beautifully.",
    features: [
      {
        icon: "✦",
        title: "Emirati tailoring",
        desc: "Precision-cut shoulders with a structured, confident drape.",
      },
      {
        icon: "✦",
        title: "Subtle sheen",
        desc: "Premium fabric with a gentle lustre for festive occasions.",
      },
      {
        icon: "✦",
        title: "Structured collar",
        desc: "Holds its shape throughout long celebrations.",
      },
      {
        icon: "✦",
        title: "Stone grey tone",
        desc: "A versatile neutral that pairs with any accessory.",
      },
    ],
    images: {
      primary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779382389/9_bmqbnt.png",
      secondary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779383434/KhanSaab_yry8gu.png",
    },
    gallery: [
      {
        label: "STONE GREY · FRONT",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779382389/9_bmqbnt.png",
      },
      {
        label: "STONE GREY · BACK",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779382390/8_pbobzl.png",
      },
      {
        label: "STONE GREY · DETAIL",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779382402/10_jifepo.png",
      },
      {
        label: "STONE GREY · SIDE",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779383434/KhanSaab_yry8gu.png",
      },
    ],
  },
  {
    id: "olive-green-thobe",
    name: "Olive Green Thobe",
    arabic: "ثوب زيتوني",
    category: "thobes",
    catLabel: "Ceremonial · Navy",
    price: 2400,
    oldPrice: 3000,
    tag: "WEDDING",
    occasion: "wedding",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "A distinguished ceremonial thobe in deep olive green. Tailored with military-inspired precision, featuring reinforced seams, a structured collar, and a drape suited for formal gatherings and wedding celebrations.",
    features: [
      {
        icon: "✦",
        title: "Ceremonial grade",
        desc: "Heavyweight fabric with a formal, distinguished drape.",
      },
      {
        icon: "✦",
        title: "Reinforced seams",
        desc: "Double-stitched at stress points for lasting durability.",
      },
      {
        icon: "✦",
        title: "Deep olive tone",
        desc: "A rich, earthy green that exudes confidence and calm.",
      },
      {
        icon: "✦",
        title: "Wedding-ready",
        desc: "Designed for grooms and guests at life’s grandest moments.",
      },
    ],
    images: {
      primary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779382605/18_zs4h83.png",
      secondary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779382620/15_xwxov1.png",
    },
  },
  {
    id: "golden-beige-thobe",
    name: "Golden Beige Thobe",
    arabic: "ثوب بيج ذهبي",
    category: "thobes",
    catLabel: "Moroccan cut · Sage",
    price: 2400,
    oldPrice: 3000,
    tag: null,
    occasion: "festive",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "A luxurious Moroccan-cut thobe in warm golden beige with sage undertones. Features intricate neckline embroidery, a relaxed silhouette, and premium fabric that drapes gracefully for festive occasions.",
    features: [
      {
        icon: "✦",
        title: "Sage undertones",
        desc: "Golden beige with a subtle green warmth in natural light.",
      },
      {
        icon: "✦",
        title: "Neckline embroidery",
        desc: "Hand-finished Moroccan motifs along the collar and chest.",
      },
      {
        icon: "✦",
        title: "Premium drape",
        desc: "Fabric weight chosen for an effortless, flowing fall.",
      },
      {
        icon: "✦",
        title: "Moroccan cut",
        desc: "Generous, relaxed silhouette true to North African tradition.",
      },
    ],
    images: {
      primary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1780922307/22_njfic9.png",
      secondary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779382839/21_zmi8ct.png",
    },
    gallery: [
      {
        label: "GOLDEN BEIGE · FRONT",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1780922307/22_njfic9.png",
      },
      {
        label: "GOLDEN BEIGE · BACK",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779382839/21_zmi8ct.png",
      },
      {
        label: "GOLDEN BEIGE · DETAIL",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779382812/19_qynbvo.png",
      },
      {
        label: "GOLDEN BEIGE · SIDE",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779382812/20_kijrep.png",
      },
    ],
  },
  {
    id: "khaki-thobe",
    name: "Khaki Thobe",
    arabic: "ثوب خاكي",
    category: "thobes",
    catLabel: "Saudi Thobe · Cotton",
    price: 2400,
    oldPrice: 3000,
    tag: "BEST SELLER",
    occasion: "everyday",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "A versatile Saudi thobe in earthy khaki, perfect for everyday sophistication. Made from durable premium cotton with a classic mandarin collar, reinforced stitching, and a comfortable relaxed fit.",
    features: [
      {
        icon: "✦",
        title: "Durable cotton",
        desc: "Heavy-duty premium cotton built for daily wear.",
      },
      {
        icon: "✦",
        title: "Earthy khaki",
        desc: "A warm, grounding neutral that works with everything.",
      },
      {
        icon: "✦",
        title: "Reinforced stitching",
        desc: "Double-needle construction at seams for long-lasting wear.",
      },
      {
        icon: "✦",
        title: "Relaxed fit",
        desc: "Comfortable ease through the body for all-day movement.",
      },
    ],
    images: {
      primary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779383396/26_dyv2hu.png",
      secondary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779382873/23_ezsxgf.png",
    },
    gallery: [
      {
        label: "KHAKI · FRONT",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779383396/26_dyv2hu.png",
      },
      {
        label: "KHAKI · BACK",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779382873/23_ezsxgf.png",
      },
      {
        label: "KHAKI · DETAIL",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779383400/24_pbqifh.png",
      },
    ],
  },
  {
    id: "dusty-grey-kuwaiti-thobe",
    name: "Dusty Grey Kuwaiti Thobe",
    arabic: "ثوب كويتي رمادي",
    category: "thobes",
    catLabel: "Emirati · Eid",
    price: 2800,
    oldPrice: 3600,
    tag: "EID",
    occasion: "festive",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "A distinguished Kuwaiti-style thobe in muted dusty grey, designed for Eid celebrations. Features a characteristic front pleat, button cuffs, and a lightweight fabric that keeps you comfortable through long festivities.",
    features: [
      {
        icon: "✦",
        title: "Kuwaiti front pleat",
        desc: "Signature centre pleat for a sharp, structured front.",
      },
      {
        icon: "✦",
        title: "Button cuffs",
        desc: "Adjustable cuffs with mother-of-pearl buttons.",
      },
      {
        icon: "✦",
        title: "Eid-ready",
        desc: "Lightweight fabric perfect for celebrating through the day.",
      },
      {
        icon: "✦",
        title: "Dusty grey",
        desc: "A soft, muted tone that photographs beautifully.",
      },
    ],
    images: {
      primary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779383586/29_ol0rem.png",
      secondary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779387526/KhanSaab_1_vpmasz.png",
    },
  },
  {
    id: "dark-grey-thobe",
    name: "Dark Grey Thobe",
    arabic: "ثوب رمادي داكن",
    category: "thobes",
    catLabel: "Ceremonial · Camel wool",
    price: 2400,
    oldPrice: 3000,
    tag: null,
    occasion: "wedding",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "A luxurious ceremonial thobe in rich dark grey, woven from premium camel wool for exceptional warmth and softness. The fabric’s natural drape and subtle texture make it ideal for weddings and formal winter events.",
    features: [
      {
        icon: "✦",
        title: "Camel wool",
        desc: "Rare, ultra-soft fibre prized for warmth without bulk.",
      },
      {
        icon: "✦",
        title: "Natural texture",
        desc: "Subtle weave variation that adds depth and character.",
      },
      {
        icon: "✦",
        title: "Winter weight",
        desc: "Insulating warmth for cooler evenings and seasons.",
      },
      {
        icon: "✦",
        title: "Formal drape",
        desc: "Falls with a gravity that suits life’s grandest occasions.",
      },
    ],
    images: {
      primary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779383698/34_go5vto.png",
      secondary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779383703/36_h3sv87.png",
    },
    gallery: [
      {
        label: "DARK GREY · FRONT",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779383698/34_go5vto.png",
      },
      {
        label: "DARK GREY · BACK",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779383703/36_h3sv87.png",
      },
      {
        label: "DARK GREY · DETAIL",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779383698/33_h7yupa.png",
      },
      {
        label: "DARK GREY · SIDE",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779383714/35_dkntqh.png",
      },
    ],
  },
  {
    id: "violet-kuwaiti-thobe",
    name: "Violet Kuwaiti Thobe",
    arabic: "ثوب بنفسجي",
    category: "thobes",
    catLabel: "Saudi Thobe · Cotton",
    price: 2800,
    oldPrice: 3600,
    tag: null,
    occasion: "everyday",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "A bold Saudi thobe in regal violet, crafted from soft premium cotton. Features a modern collar design, tapered silhouette, and meticulous finishing for the gentleman who dares to stand apart.",
    features: [
      {
        icon: "✦",
        title: "Regal violet",
        desc: "A rich, confident hue inspired by royal heritage.",
      },
      {
        icon: "✦",
        title: "Modern collar",
        desc: "Updated design that bridges tradition and contemporary style.",
      },
      {
        icon: "✦",
        title: "Tapered cut",
        desc: "Slim through the body for a sharp, modern silhouette.",
      },
      {
        icon: "✦",
        title: "Soft cotton",
        desc: "Premium-grade cotton that softens further with each wash.",
      },
    ],
    images: {
      primary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1780922692/12_txlvvv.png",
      secondary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1780922689/11_iljdvn.png",
    },
    gallery: [
      {
        label: "VIOLET · FRONT",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1780922692/12_txlvvv.png",
      },
      {
        label: "VIOLET · BACK",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1780922689/11_iljdvn.png",
      },
      {
        label: "VIOLET · DETAIL",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1780922686/9_asdczm.png",
      },
      {
        label: "VIOLET · SIDE",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1780922688/10_hkj9mv.png",
      },
    ],
  },
  {
    id: "powder-blue-kuwaiti-thobe",
    name: "Powder Blue Kuwaiti Thobe",
    arabic: "ثوب كويتي أزرق",
    category: "thobes",
    catLabel: "Kuwaiti · Cotton blend",
    price: 2800,
    oldPrice: 3600,
    tag: null,
    occasion: "everyday",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "A fresh Kuwaiti-style thobe in serene powder blue. Made from a breathable cotton blend with a characteristic front pleat, tailored shoulders, and a relaxed fit perfect for warm-weather gatherings.",
    features: [
      {
        icon: "✦",
        title: "Cotton blend",
        desc: "Breathable cotton-poly blend that resists creasing.",
      },
      {
        icon: "✦",
        title: "Front pleat",
        desc: "Kuwaiti-style centre pleat for structured elegance.",
      },
      {
        icon: "✦",
        title: "Powder blue",
        desc: "A calming, fresh tone ideal for daytime occasions.",
      },
      {
        icon: "✦",
        title: "Tailored shoulders",
        desc: "Clean shoulder line for a polished, put-together look.",
      },
    ],
    images: {
      primary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1780931035/8_z5gw1p.png",
      secondary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779383971/6_c8d2jy.png",
    },
    gallery: [
      {
        label: "POWDER BLUE · FRONT",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1780931035/8_z5gw1p.png",
      },
      {
        label: "POWDER BLUE · BACK",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779383971/6_c8d2jy.png",
      },
      {
        label: "POWDER BLUE · DETAIL",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779384023/7_efy37e.png",
      },
      {
        label: "POWDER BLUE · SIDE",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779383957/5_w1dbbs.png",
      },
    ],
  },
  {
    id: "mocha-beige-thobe",
    name: "Mocha Beige Thobe",
    arabic: "ثوب موكا بيج",
    category: "thobes",
    catLabel: "Linen blend · Lightweight",
    price: 2400,
    oldPrice: 3000,
    tag: null,
    occasion: "everyday",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "A breezy thobe in warm mocha beige, crafted from a premium linen blend for exceptional breathability. Lightweight and naturally textured, it’s the perfect companion for summer days and casual occasions.",
    features: [
      {
        icon: "✦",
        title: "Linen blend",
        desc: "Natural linen-cotton mix for superior breathability.",
      },
      {
        icon: "✦",
        title: "Lightweight",
        desc: "Featherlight construction for peak summer comfort.",
      },
      {
        icon: "✦",
        title: "Natural texture",
        desc: "Linen’s signature slub adds effortless character.",
      },
      {
        icon: "✦",
        title: "Mocha beige",
        desc: "A warm, earthy neutral that pairs with any sandal or shoe.",
      },
    ],
    images: {
      primary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779384401/20_itqljk.png",
      secondary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779384447/23_nbvekl.png",
    },
    gallery: [
      {
        label: "MOCHA BEIGE · FRONT",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779384401/20_itqljk.png",
      },
      {
        label: "MOCHA BEIGE · BACK",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779384447/23_nbvekl.png",
      },
      {
        label: "MOCHA BEIGE · DETAIL",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779384444/21_nqtsjb.png",
      },
      {
        label: "MOCHA BEIGE · SIDE",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779384443/22_mphchu.png",
      },
    ],
  },
  {
    id: "icy-blue-thobe",
    name: "Icy Blue Thobe",
    arabic: "ثوب أزرق جليدي",
    category: "thobes",
    catLabel: "Saudi Thobe · Cotton",
    price: 2600,
    oldPrice: 3200,
    tag: null,
    occasion: "everyday",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "A crisp Saudi thobe in cool icy blue, crafted from premium breathable cotton. Features a clean-cut silhouette, structured collar, and subtle tone-on-tone stitching for a polished, contemporary look.",
    features: [
      {
        icon: "✦",
        title: "Icy blue tone",
        desc: "A cool, refreshing hue that stands out with quiet confidence.",
      },
      {
        icon: "✦",
        title: "Tone-on-tone stitching",
        desc: "Subtle matching thread work for refined detailing.",
      },
      {
        icon: "✦",
        title: "Structured collar",
        desc: "Crisp collar that holds its shape throughout the day.",
      },
      {
        icon: "✦",
        title: "Breathable cotton",
        desc: "Premium cotton for comfort in warm climates.",
      },
    ],
    images: {
      primary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779384497/27_deunyz.png",
      secondary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779388135/KhanSaab_3_gfj7qi.png",
    },
    gallery: [
      {
        label: "ICY BLUE · FRONT",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779384497/27_deunyz.png",
      },
      {
        label: "ICY BLUE · BACK",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779388135/KhanSaab_3_gfj7qi.png",
      },
      {
        label: "ICY BLUE · DETAIL",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779384493/25_gbwnlg.png",
      },
      {
        label: "ICY BLUE · SIDE",
        src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779384488/24_ayzvx4.png",
      },
    ],
  },
  {
    id: "cream-beige-shemag",
    name: "Cream Beige Shemag",
    arabic: "شماغ بيج",
    category: "shimag",
    catLabel: "Shemag · Cotton",
    price: 999,
    oldPrice: 1500,
    tag: null,
    occasion: "everyday",
    description:
      "A classic shemag in soft cream beige, woven from 100% premium cotton. Lightweight yet warm, with traditional geometric patterns and hand-finished edges that honour centuries of craftsmanship.",
    features: [
      {
        icon: "✦",
        title: "100% cotton",
        desc: "Pure premium cotton for softness and breathability.",
      },
      {
        icon: "✦",
        title: "Traditional patterns",
        desc: "Geometric motifs rooted in centuries of heritage.",
      },
      {
        icon: "✦",
        title: "Hand-finished edges",
        desc: "Carefully hemmed borders that resist fraying.",
      },
      {
        icon: "✦",
        title: "Versatile drape",
        desc: "Generous size for multiple styling options.",
      },
    ],
    images: {
      primary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779386808/40_uucmgp.png",
      secondary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779386808/40_uucmgp.png",
    },
  },
  {
    id: "light-grey-shemag",
    name: "Light Grey Shemag",
    arabic: "شماغ رمادي",
    category: "shimag",
    catLabel: "Shemag · Cotton",
    price: 999,
    oldPrice: 1500,
    tag: null,
    occasion: "everyday",
    description:
      "A versatile shemag in refined light grey, crafted from premium woven cotton. Features traditional motifs with a modern palette, soft hand-feel, and generous dimensions for multiple styling options.",
    features: [
      {
        icon: "✦",
        title: "Premium weave",
        desc: "Tightly woven cotton for durability and drape.",
      },
      {
        icon: "✦",
        title: "Modern palette",
        desc: "Light grey that complements any thobe or outfit.",
      },
      {
        icon: "✦",
        title: "Soft hand-feel",
        desc: "Pre-washed fabric that feels worn-in from day one.",
      },
      {
        icon: "✦",
        title: "Generous size",
        desc: "Full dimensions for traditional or contemporary wrapping.",
      },
    ],
    images: {
      primary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779386798/39_zvff9k.png",
      secondary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779386798/39_zvff9k.png",
    },
  },
  {
    id: "brown-shemag",
    name: "Brown Shemag",
    arabic: "شماغ بني",
    category: "shimag",
    catLabel: "Shemag · Cotton",
    price: 999,
    oldPrice: 1500,
    tag: null,
    occasion: "everyday",
    description:
      "A rich brown shemag woven from premium cotton with traditional patterns. Earthy and distinguished, with reinforced edges and a soft drape perfect for everyday wear or special occasions.",
    features: [
      {
        icon: "✦",
        title: "Earthy brown",
        desc: "A warm, grounding tone inspired by desert landscapes.",
      },
      {
        icon: "✦",
        title: "Reinforced edges",
        desc: "Double-stitched borders built to last.",
      },
      {
        icon: "✦",
        title: "Traditional weave",
        desc: "Time-honoured pattern passed through generations.",
      },
      {
        icon: "✦",
        title: "All-season weight",
        desc: "Balanced weight suitable for year-round wear.",
      },
    ],
    images: {
      primary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779386795/38_i4pjuv.png",
      secondary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779386795/38_i4pjuv.png",
    },
  },
  {
    id: "royal-red-keffiyah",
    name: "Royal Red Keffiyah",
    arabic: "كوفية حمراء",
    category: "keffiyah",
    catLabel: "Keffiyah · Woven",
    price: 800,
    oldPrice: 1200,
    tag: "OUT OF STOCK",
    occasion: "everyday",
    outOfStock: true,
    description:
      "A striking keffiyah in deep royal red with intricate woven patterns. Made from premium yarn with traditional technique, featuring bold geometric motifs and hand-tied tassels along the border.",
    features: [
      {
        icon: "✦",
        title: "Royal red",
        desc: "A bold, striking hue that commands attention.",
      },
      {
        icon: "✦",
        title: "Intricate weave",
        desc: "Traditional loom-woven geometric patterns throughout.",
      },
      {
        icon: "✦",
        title: "Hand-tied tassels",
        desc: "Decorative border tassels finished by hand.",
      },
      {
        icon: "✦",
        title: "Premium yarn",
        desc: "High-quality thread for colour fastness and durability.",
      },
    ],
    images: {
      primary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779386831/41_bhavvz.png",
      secondary:
        "https://res.cloudinary.com/dljg7vpso/image/upload/v1779386831/41_bhavvz.png",
    },
  },
];

// ─── Related / cross-sell products (for PDP) ─────────────────────────────────
export const RELATED_PRODUCTS = [
  {
    id: "grey-taupe-thobe",
    name: "Grey Taupe Thobe",
    arabic: "ثوب رمادي",
    cat: "thobes",
    price: 2200,
    old: 3000,
    tag: "EDITORS' PICK",
    src: "https://res.cloudinary.com/dljg7vpso/image/upload/v1779381505/20_x1ksly.png",
  },
  {
    id: "obsidian-royal-bisht",
    name: "Obsidian Royal Bisht",
    arabic: "بشت أسود",
    cat: "bishts",
    price: 2200,
    old: 3000,
    tag: "MADE TO ORDER",
    src: "/assets/bisht_black.png",
  },
  {
    id: "white-yemeni-shemagh",
    name: "White Yemeni Shemagh",
    arabic: "شماغ يمني",
    cat: "accessories",
    price: 2200,
    old: 3000,
    src: "/assets/shemagh.png",
  },
  {
    id: "amber-misbaha-set",
    name: "Amber Misbaha Set",
    arabic: "مسبحة عنبر",
    cat: "accessories",
    price: 2200,
    old: 3000,
    tag: "NEW",
    src: "/assets/accessories.png",
  },
];

// ─── Helper functions ─────────────────────────────────────────────────────────

/** Get a product by its slug id */
export function getProductById(id) {
  return ALL_PRODUCTS.find((p) => p.id === id) || ALL_PRODUCTS[0];
}

/** Get bestseller products (first 4 with BEST SELLER or EDITORS' PICK tags) */
export function getBestsellers() {
  return ALL_PRODUCTS.slice(0, 4);
}

/** Get related products for the PDP — excludes current product, returns up to 4 in card format */
export function getRelatedProducts(currentId, limit = 4) {
  return ALL_PRODUCTS.filter((p) => p.id !== currentId)
    .slice(0, limit)
    .map(toCardFormat);
}

/** Get collection products (first 6 for homepage collection grid) */
export function getCollectionProducts() {
  return ALL_PRODUCTS.slice(0, 6);
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
    outOfStock: product.outOfStock || false,
    src: product.images.primary,
    src2: product.images.secondary,
  };
}

/** Get the featured PDP product (currently only one detail page) */
export function getFeaturedProduct() {
  return getProductForPDP(ALL_PRODUCTS[0]);
}

/** Transform a raw product into the PDP display shape */
export function getProductForPDP(p) {
  if (!p) return null;
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
    desc: p.description || "",
    sizes: p.sizes || [],
    gallery: p.gallery || [{ label: p.name, src: p.images.primary }],
    features: (p.features || []).map((f) => ({
      i: f.icon,
      t: f.title,
      d: f.desc,
    })),
  };
}
