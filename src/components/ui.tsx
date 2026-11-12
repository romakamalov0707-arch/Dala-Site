import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import { creditFor } from '../data/gallery'
import type { Faq } from '../types'
import { ArrowLeft, ArrowRight, Calendar, Check, Close, Mail, Pin, Plus } from './Icons'

/* ---------- Avatars (initials, no real faces) ---------- */

const AVATAR_COLORS = ['#7b6a4f', '#4f5a2e', '#a0643b', '#3f5560', '#8a7a5c']

export function Avatars({ names }: { names: string[] }) {
  return (
    <div className="avatars" aria-hidden>
      {names.map((n, i) => (
        <img
          key={n}
          alt=""
          src={`data:image/svg+xml;utf8,${encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="${
              AVATAR_COLORS[i % AVATAR_COLORS.length]
            }"/><text x="20" y="25" font-family="Georgia,serif" font-size="15" fill="#f3efe7" text-anchor="middle">${n}</text></svg>`,
          )}`}
        />
      ))}
    </div>
  )
}

/* ---------- Page hero for inner pages ---------- */

export function PageHero({ image, title, text, crumb }: { image: string; title: string; text: string; crumb: string }) {
  const { t } = useLang()
  return (
    <section className="page-hero">
      <img src={image} alt="" />
      <div className="page-hero__content">
        <div>
          <div className="crumbs">
            <Link to="/">{t.navHome}</Link>
            <span>/</span>
            <span>{crumb}</span>
          </div>
          <h1 className="page-hero__title">{title}</h1>
        </div>
        <p className="page-hero__text">{text}</p>
      </div>
    </section>
  )
}

/* ---------- Booking card (as in the mockup) ---------- */

export interface BookingInfo {
  title: string
  place: string
  image: string
  checkIn: string
  checkOut: string
  guests: number
  total?: string
  confirmed: boolean
}

export function BookingCard({ info, onDetails }: { info: BookingInfo; onDetails?: () => void }) {
  const { t } = useLang()
  return (
    <div className="booking-card">
      <div className="booking-card__head">
        <div>
          <Check className="booking-card__check" />
          <div className="booking-card__title">{info.confirmed ? t.bookingConfirmed : t.bookingDraft}</div>
        </div>
        <div className="booking-card__thumb">
          <img src={info.image} alt="" />
          {onDetails ? (
            <button type="button" onClick={onDetails} style={{ all: 'unset' }}>
              <span>{t.details}</span>
            </button>
          ) : (
            <span>{t.details}</span>
          )}
        </div>
      </div>
      <div className="booking-card__rows">
        <div className="booking-card__row">
          {t.checkIn}
          <b>{info.checkIn}</b>
        </div>
        <div className="booking-card__row">
          {t.checkOut}
          <b>{info.checkOut}</b>
        </div>
        <div className="booking-card__row">
          {t.guests}
          <b>
            {info.guests} {t.adults}
          </b>
        </div>
        {info.total && (
          <div className="booking-card__row">
            {t.total}
            <b>{info.total}</b>
          </div>
        )}
      </div>
      <div className="booking-card__cal">
        {t.addToCalendar}
        <div className="booking-card__cal-icons">
          <span title="Google">
            <b style={{ fontFamily: 'Arial', fontSize: 14 }}>G</b>
          </span>
          <span title="iCal">
            <Calendar />
          </span>
          <span title="E-mail">
            <Mail />
          </span>
        </div>
      </div>
      <div className="booking-card__place">
        <span className="booking-card__pin">
          <Pin />
        </span>
        <div>
          <b>{info.title}</b>
          <small>{info.place}</small>
        </div>
      </div>
      <Link to="/tours#booking" className="btn btn--dark btn--block btn--sm" style={{ height: 40 }}>
        {t.manageBooking}
      </Link>
    </div>
  )
}

/* ---------- Accordion ---------- */

export function Accordion({ items, firstImage }: { items: Faq[]; firstImage?: string }) {
  const { t, tr } = useLang()
  const [open, setOpen] = useState(0)
  return (
    <div className="accordion">
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={i} className={`acc-item${isOpen ? ' is-open' : ''}`}>
            <button
              type="button"
              className="acc-item__head"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span className="acc-item__num">{String(i + 1).padStart(2, '0')}</span>
              <span>{tr(it.q)}</span>
              <span className="acc-item__plus">
                <Plus />
              </span>
            </button>
            <div className="acc-item__panel">
              <div>
                <div className="acc-item__body">
                  <div>
                    <p>{tr(it.a)}</p>
                    {i === 0 && <Link to="/tours">{t.more}</Link>}
                  </div>
                  {i === 0 && firstImage && <img src={firstImage} alt="" />}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ---------- Lightbox ---------- */

export interface LightboxItem {
  src: string
  caption: string
}

export function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: LightboxItem[]
  index: number
  onClose: () => void
  onIndex: (i: number) => void
}) {
  const { t } = useLang()
  const item = items[index]
  const credit = creditFor(item.src)
  const go = (d: number) => onIndex((index + d + items.length) % items.length)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  })

  return (
    <div className="lightbox" role="dialog" aria-modal="true" onClick={onClose}>
      <button type="button" className="round-btn" aria-label={t.prev} onClick={(e) => (e.stopPropagation(), go(-1))}>
        <ArrowLeft />
      </button>
      <figure onClick={(e) => e.stopPropagation()}>
        <img key={item.src} src={item.src} alt={item.caption} />
        <figcaption>
          {item.caption} · {index + 1}/{items.length}
          {credit && (
            <small>
              {t.photoBy}: {credit.author || '—'} ·{' '}
              <a href={credit.page} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>
                {credit.license}
              </a>
            </small>
          )}
        </figcaption>
      </figure>
      <button type="button" className="round-btn" aria-label={t.next} onClick={(e) => (e.stopPropagation(), go(1))}>
        <ArrowRight />
      </button>
      <button type="button" className="round-btn lightbox__close" aria-label={t.close} onClick={onClose}>
        <Close />
      </button>
    </div>
  )
}

/* ---------- Simple modal shell ---------- */

export function Modal({ onClose, children, label }: { onClose: () => void; children: ReactNode; label: string }) {
  const { t } = useLang()
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={label} onClick={onClose}>
      <div className="modal__panel" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" aria-label={t.close} onClick={onClose}>
          <Close />
        </button>
        {children}
      </div>
    </div>
  )
}

/* ---------- Date helpers ---------- */

export function addDays(iso: string, days: number): string {
  // work in UTC so the user's time zone (e.g. UTC+5) can't shift the date
  const d = new Date(iso + 'T00:00:00Z')
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

const MONTHS = {
  ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
  kz: ['қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым', 'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан'],
}

/** "18 сентября 2026 г." / "18 қыркүйек 2026 ж." — built by hand because browsers often lack Kazakh month names. */
export function formatDate(iso: string, lang: 'ru' | 'kz'): string {
  if (!iso) return '—'
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${MONTHS[lang][m - 1]} ${y} ${lang === 'kz' ? 'ж.' : 'г.'}`
}
