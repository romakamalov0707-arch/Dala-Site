import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import { ArrowRight, Close, Logo, Menu } from './Icons'
import type { Dict } from '../i18n/ru'

export const NAV: { to: string; key: keyof Dict }[] = [
  { to: '/', key: 'navHome' },
  { to: '/destinations', key: 'navDestinations' },
  { to: '/tours', key: 'navTours' },
  { to: '/gallery', key: 'navGallery' },
  { to: '/contacts', key: 'navContacts' },
]

function LangSwitch() {
  const { lang, setLang } = useLang()
  return (
    <div className="lang-switch" role="group" aria-label="Language">
      <button type="button" aria-pressed={lang === 'ru'} onClick={() => setLang('ru')}>
        RU
      </button>
      <button type="button" aria-pressed={lang === 'kz'} onClick={() => setLang('kz')}>
        ҚАЗ
      </button>
    </div>
  )
}

export default function Header() {
  const { t } = useLang()
  const { pathname } = useLocation()
  const [floating, setFloating] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setFloating(window.scrollY > 260)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <header className={`header${floating ? ' is-floating' : ''}`}>
        <div className="header__inner">
          <Link to="/" className="logo" aria-label="Dala">
            <Logo />
            dala
          </Link>

          <nav className="nav" aria-label="Main">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'}>
                {t[n.key]}
              </NavLink>
            ))}
          </nav>

          <div className="header__actions">
            <LangSwitch />
            <Link to="/tours#booking" className="btn btn--white btn--sm">
              {t.book}
            </Link>
            <button type="button" className="burger" aria-label={t.menu} onClick={() => setOpen(true)}>
              <Menu />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label={t.menu}>
          <div className="mobile-menu__top">
            <Link to="/" className="logo">
              <Logo />
              dala
            </Link>
            <button type="button" className="burger" aria-label={t.close} onClick={() => setOpen(false)}>
              <Close />
            </button>
          </div>
          <nav>
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'}>
                {t[n.key]}
              </NavLink>
            ))}
          </nav>
          <LangSwitch />
          <Link to="/tours#booking" className="btn btn--white" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
            {t.book}
            <span className="btn__icon">
              <ArrowRight />
            </span>
          </Link>
        </div>
      )}
    </>
  )
}
