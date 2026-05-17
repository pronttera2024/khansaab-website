export const WHATSAPP_NUMBER = '918975048440'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

export function openWhatsApp(msg) {
  const u = msg ? `${WHATSAPP_URL}?text=${encodeURIComponent(msg)}` : WHATSAPP_URL
  window.open(u, '_blank', 'noopener,noreferrer')
}
