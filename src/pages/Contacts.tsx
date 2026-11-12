import { useState, type FormEvent } from 'react'
import { useLang } from '../i18n/LangContext'
import { img } from '../data/destinations'
import { faqs } from '../data/gallery'
import { Accordion, PageHero } from '../components/ui'
import { Socials } from '../components/Footer'
import { ArrowRight, Check, Clock, Mail, Phone, Pin } from '../components/Icons'

type Errors = Partial<Record<'name' | 'email' | 'message', string>>

export default function Contacts() {
  const { t } = useLang()
  const [form, setForm] = useState({ name: '', email: '', subject: 'subj1', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }))
    setSent(false)
    if (k in errors) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const errs: Errors = {}
    if (form.name.trim().length < 2) errs.name = t.errName
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = t.errEmail
    if (form.message.trim().length < 5) errs.message = t.errMessage
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      setSent(true)
      setForm({ name: '', email: '', subject: 'subj1', message: '' })
    }
  }

  const info = [
    { icon: <Pin />, label: t.address, value: t.addressValue },
    { icon: <Phone />, label: t.phone, value: '+7 (700) 000-00-00' },
    { icon: <Mail />, label: t.email, value: 'hello@dala.example' },
    { icon: <Clock />, label: t.hours, value: t.hoursValue },
  ]

  return (
    <>
      <PageHero image={img('assy-1')} title={t.contactsTitle} text={t.contactsText} crumb={t.navContacts} />

      <section className="section container">
        <div className="contact-grid">
          <div className="contact-form reveal">
            <h2 className="h2">{t.writeUs}</h2>
            <span className="underline-accent" />
            <p className="lead">{t.writeUsText}</p>
            <form className="form" onSubmit={submit} noValidate>
              <label className={`field${errors.name ? ' has-error' : ''}`}>
                {t.fName}
                <input value={form.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" />
                {errors.name && <span className="field__error">{errors.name}</span>}
              </label>
              <label className={`field${errors.email ? ' has-error' : ''}`}>
                {t.fEmail}
                <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" />
                {errors.email && <span className="field__error">{errors.email}</span>}
              </label>
              <label className="field field--full">
                {t.fSubject}
                <select value={form.subject} onChange={(e) => set('subject', e.target.value)}>
                  {(['subj1', 'subj2', 'subj3', 'subj4'] as const).map((s) => (
                    <option key={s} value={s}>
                      {t[s]}
                    </option>
                  ))}
                </select>
              </label>
              <label className={`field field--full${errors.message ? ' has-error' : ''}`}>
                {t.fMessage}
                <textarea value={form.message} onChange={(e) => set('message', e.target.value)} />
                {errors.message && <span className="field__error">{errors.message}</span>}
              </label>
              <div className="form__actions">
                <button type="submit" className="btn btn--olive">
                  {t.send}
                  <span className="btn__icon">
                    <ArrowRight />
                  </span>
                </button>
                <span className="form__note">{t.demoNote}</span>
              </div>
              {sent && (
                <div className="success" role="status">
                  <Check />
                  {t.sent}
                </div>
              )}
            </form>
          </div>

          <div className="contact-info">
            {info.map((it, i) => (
              <div key={i} className="info-card reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="info-card__icon">{it.icon}</span>
                <div>
                  <small>{it.label}</small>
                  <b>{it.value}</b>
                </div>
              </div>
            ))}
            <div className="info-card info-card--dark reveal">
              <h3 className="h3">{t.supportTitle}</h3>
              <p>{t.supportText}</p>
              <div style={{ color: '#fff' }}>
                <Socials />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <h2 className="h2 reveal" style={{ marginBottom: 24 }}>
          {t.mapTitle}
        </h2>
        <iframe
          className="map reveal"
          title={t.mapTitle}
          loading="lazy"
          src="https://www.openstreetmap.org/export/embed.html?bbox=76.80%2C43.18%2C77.05%2C43.30&layer=mapnik&marker=43.238%2C76.945"
        />
      </section>

      <section className="section container">
        <div className="two-col">
          <div className="reveal">
            <h2 className="h2">{t.faqTitle}</h2>
            <span className="underline-accent" />
            <p className="lead">{t.spacesText}</p>
          </div>
          <div className="reveal">
            <Accordion items={faqs.slice(1)} />
          </div>
        </div>
      </section>
    </>
  )
}
