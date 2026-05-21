// ─── Site-wide configuration ─────────────────────────────────────────────────
// Single source of truth for contact info, social links, and brand metadata.
// Ready to be replaced by a CMS or env variables.

export const CLOUDINARY_BASE = `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD}/image/upload`

export const WHATSAPP_NUMBER = '919834449478'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

export const CONTACT = {
  phone: ['+91 9834449478'],
  phoneDisplay: '+91 98344 49478',
  email: {
    concierge: 'khansaabstoreoffical@gmail.com',
    press: 'khansaabstoreoffical@gmail.com',
    privacy: 'khansaabstoreoffical@gmail.com',
    returns: 'khansaabstoreoffical@gmail.com',
    accessibility: 'khansaabstoreoffical@gmail.com',
  },
  address: {
    street: 'Kausar Bhagh',
    area: 'Kondwha, Pune',
    country: 'India',
  },
  hours: {
    weekday: 'Mon — Sat',
    time: '10:00 — 21:00 IST',
    weekend: 'Sunday by appointment',
  },
  sla: 'Replies within an hour',
}

export const SOCIAL = {
  instagram: 'https://www.instagram.com/khansaabstore/',
  youtube: '#',
  tiktok: '#',
}

export const PAYMENT_METHODS = ['Visa', 'Mastercard', 'UPI', 'RuPay', 'Paytm', 'COD']

export const BRAND = {
  name: 'KhanSaab',
  legalName: 'KhanSaab Atelier',
  taglineArabic: 'فنّ اللباس الرفيع',
  established: 2014,
  copyright: `© ${new Date().getFullYear()} KhanSaab Atelier. All rights reserved.`,
  description: 'Heritage menswear rooted in Indian craftsmanship — designed in Pune, hand-finished by master tailors of Old Hyderabad. Established 2014.',
}

export const WHATSAPP_MESSAGES = {
  general: "Hello KhanSaab — I'd like to chat.",
  bespoke: "Hello KhanSaab — I'd like to start a custom tailoring order.",
  bespokeOrder: "Hello KhanSaab — I'd like to discuss a bespoke order.",
  concierge: "Hello KhanSaab — I'd like concierge help.",
  findGarment: "Hi! I'd like help finding a garment.",
  sizeHelp: "Hi! I'd like help picking my size.",
  measureHelp: "Hi! I'd like help with my measurements.",
  customTailoring: "Hello KhanSaab — I'm interested in custom tailoring.",
  fitting: (productName, size) => `Hello KhanSaab — I'd like to book a fitting for the ${productName} (size ${size}).`,
}
