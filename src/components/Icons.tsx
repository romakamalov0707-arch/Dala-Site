import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>

const base = (props: P) => ({
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...props,
})

export const ArrowRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
export const ArrowLeft = (p: P) => (
  <svg {...base(p)}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
)
export const Chevron = (p: P) => (
  <svg {...base(p)}>
    <path d="M9 6l6 6-6 6" />
  </svg>
)
export const Plus = (p: P) => (
  <svg {...base({ strokeWidth: 2.2, ...p })}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)
export const Close = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)
export const Menu = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 8h16M4 16h16" />
  </svg>
)
export const Play = (p: P) => (
  <svg {...base({ fill: 'currentColor', stroke: 'none', ...p })}>
    <path d="M7 4.5v15l12.5-7.5z" />
  </svg>
)
export const Check = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12.5l2.6 2.5L16 9.5" />
  </svg>
)
export const Pin = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
)
export const Calendar = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
)
export const Clock = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)
export const Phone = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" />
  </svg>
)
export const Mail = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M3.5 6.5l8.5 6 8.5-6" />
  </svg>
)
export const Gift = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.5" y="8" width="17" height="4" rx="1" />
    <path d="M5 12v8h14v-8M12 8v12M12 8S10.5 3.5 8 4.2 8.5 8 12 8zM12 8s1.5-4.5 4-3.8S15.5 8 12 8z" />
  </svg>
)
export const Sun = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
  </svg>
)
export const Route = (p: P) => (
  <svg {...base(p)}>
    <circle cx="6" cy="18" r="2.5" />
    <circle cx="18" cy="6" r="2.5" />
    <path d="M8.5 18H16a3 3 0 000-6H8a3 3 0 010-6h7.5" />
  </svg>
)
export const Users = (p: P) => (
  <svg {...base(p)}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0113 0M16 4.5a3.5 3.5 0 010 7M18 14a6 6 0 013.5 6" />
  </svg>
)

/** Brand mark: steppe sun over hills */
export const Logo = (p: P) => (
  <svg {...base({ strokeWidth: 1.4, ...p })}>
    <circle cx="12" cy="10" r="4.2" />
    <path d="M2.5 18.5c3.4-3.6 6.2-4.7 9.5-4.7s6.1 1.1 9.5 4.7" />
    <path d="M12 2.5v1.6M5.2 5.2l1.1 1.1M18.8 5.2l-1.1 1.1" />
  </svg>
)

/** Shanyrak-inspired ornament used as a section accent */
export const Ornament = (p: P) => (
  <svg {...base({ strokeWidth: 1.4, ...p })}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 3.5v17M3.5 12h17M6 6l12 12M18 6L6 18" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

export const Leaf = (p: P) => (
  <svg viewBox="0 0 120 220" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden {...p}>
    <path d="M60 215C58 160 62 90 80 10" />
    <path d="M62 170c-22-6-36-22-40-44 22 4 36 20 40 44zM64 135c22-8 34-26 34-48-20 8-32 26-34 48zM66 100C46 92 36 74 36 54c18 8 28 26 30 46zM70 68c18-10 26-28 24-46-16 10-24 28-24 46z" />
  </svg>
)

export const Instagram = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
  </svg>
)
export const Telegram = (p: P) => (
  <svg {...base(p)}>
    <path d="M21 4L3 11l6 2.2M21 4l-3 16-9-6.8M21 4L9 13.2V19l3-3.3" />
  </svg>
)
export const Youtube = (p: P) => (
  <svg {...base(p)}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="M10 9.3v5.4l4.6-2.7z" fill="currentColor" />
  </svg>
)
export const Tiktok = (p: P) => (
  <svg {...base(p)}>
    <path d="M14 3.5v11.5a3.8 3.8 0 11-3.8-3.8M14 3.5c.5 2.7 2.4 4.5 5 4.7" />
  </svg>
)
