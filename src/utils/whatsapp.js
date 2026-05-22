import { WHATSAPP_NUMBER, WHATSAPP_URL } from '../data/site-config.js'

export { WHATSAPP_NUMBER, WHATSAPP_URL }

export function openWhatsApp(msg) {
  const u = msg ? `${WHATSAPP_URL}?text=${encodeURIComponent(msg)}` : WHATSAPP_URL
  window.open(u, '_blank', 'noopener,noreferrer')
}
