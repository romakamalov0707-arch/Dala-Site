import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import { destinations } from '../data/destinations'
import { NAV } from './Header'
import { ArrowRight, Instagram, Logo, Telegram, Tiktok, Youtube } from './Icons'

export function Socials() {
  return (
    <div className="socials">
      <a href="#" aria-label="Instagram">
        <Instagram />
      </a>
      <a href="#" aria-label="Telegram">
        <Telegram />
      </a>
      <a href="#" aria-label="YouTube">
        <Youtube />
      </a>
      <a href="#" aria-label="TikTok">
        <Tiktok />
      </a>
    </div>
  )
}

export default function Footer() {
  const { t, tr } = useLang()
  const [done, setDone] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setDone(true)
  }

  return (
    <>
      <section className="section--tight reveal" style={{ paddingTop: 72 }}>
        <p className="cta-line">{t.ctaLine}</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link to="/tours#booking" className="btn btn--olive">
            {t.book}
            <span className="btn__icon">
              <ArrowRight />
            </span>
          </Link>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__grid">
          <div>
            <Link to="/" className="logo">
              <Logo />
              dala
            </Link>
            <p>{t.footerTagline}</p>
            <Socials />
          </div>
          <div>
            <h4>{t.footerNav}</h4>
            <ul>
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to}>{t[n.key]}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{t.footerPlaces}</h4>
            <ul>
              {destinations.slice(0, 6).map((d) => (
                <li key={d.id}>
                  <Link to={`/destinations?open=${d.id}`}>{tr(d.name)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{t.footerNews}</h4>
            <p style={{ marginBottom: 14 }}>{t.footerNewsText}</p>
            {done ? (
              <p style={{ color: '#fff' }}>{t.subscribed}</p>
            ) : (
              <form className="subscribe" onSubmit={submit}>
                <input type="email" required placeholder={t.emailPlaceholder} aria-label={t.emailPlaceholder} />
                <button type="submit" className="btn btn--white btn--sm">
                  {t.subscribe}
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="footer__bottom">
          <span>{t.rights}</span>
          <a href="/images/CREDITS.md" target="_blank" rel="noreferrer">
            {t.photoCredit}
          </a>
        </div>
      </footer>
    </>
  )
}
