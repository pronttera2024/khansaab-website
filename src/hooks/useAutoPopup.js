import { useEffect, useRef } from 'react'

const STORAGE_KEY = 'khansaab_atelier_dismissed_at'
const COOLDOWN_DAYS = 1
const DELAY_MS = 15000 // 15 seconds before showing

/**
 * Auto-shows the custom tailoring popup with regulation:
 * - Waits DELAY_MS before triggering
 * - Only fires once per page session
 * - Won't show again for COOLDOWN_DAYS after user dismisses
 * - Won't fire if popup is already open
 */
export function useAutoPopup(isOpen, openFn, enabled = true) {
  const hasFired = useRef(false)

  useEffect(() => {
    if (!enabled || hasFired.current || isOpen) return

    // Check cooldown in localStorage
    const lastDismissed = localStorage.getItem(STORAGE_KEY)
    if (lastDismissed) {
      const daysSince = (Date.now() - Number(lastDismissed)) / (1000 * 60 * 60 * 24)
      if (daysSince < COOLDOWN_DAYS) return
    }

    const timer = setTimeout(() => {
      if (!hasFired.current) {
        hasFired.current = true
        openFn()
      }
    }, DELAY_MS)

    return () => clearTimeout(timer)
  }, [isOpen, openFn, enabled])
}

/** Call this when user dismisses the popup to reset the cooldown */
export function markAtelierDismissed() {
  localStorage.setItem(STORAGE_KEY, String(Date.now()))
}
