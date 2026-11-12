import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Adds `is-in` to every `.reveal` element once it scrolls into view.
 * Re-scans on route change and when the DOM changes (filters, language).
 */
export function useReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    const scan = () => document.querySelectorAll('.reveal:not(.is-in)').forEach((el) => io.observe(el))
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [pathname])
}
