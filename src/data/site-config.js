// ─── Site-wide configuration ─────────────────────────────────────────────────
// Single source of truth for contact info, social links, and brand metadata.
// Ready to be replaced by a CMS or env variables.

export const WHATSAPP_NUMBER = '918975048440'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

export const CONTACT = {
  phone: ['+971 4 555 0911', '+44 20 7946 0011'],
  phoneDisplay: '+91 89750 48440',
  email: {
    concierge: 'concierge@khansaab.com',
    press: 'press@khansaab.com',
    privacy: 'privacy@khansaab.com',
    returns: 'returns@khansaab.com',
    accessibility: 'access@khansaab.com',
  },
  address: {
    street: '12 Al Wasl Road',
    area: 'Jumeirah, Dubai',
    country: 'United Arab Emirates',
  },
  hours: {
    weekday: 'Mon — Sat',
    time: '10:00 — 21:00 GST',
    weekend: 'Sunday by appointment',
  },
  sla: 'Replies within an hour',
}

export const SOCIAL = {
  instagram: '#',
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
  description: 'Heritage menswear of the Khaleej — designed in Dubai, hand-finished by master tailors of the old quarters. Established 2014.',
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
