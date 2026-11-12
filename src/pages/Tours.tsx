import { useState, type FormEvent } from 'react'
import { formatPrice, useLang } from '../i18n/LangContext'
import { img } from '../data/destinations'
import { tourById, tours } from '../data/tours'
import { addDays, BookingCard, formatDate, PageHero } from '../components/ui'
import { ArrowRight, Check } from '../components/Icons'
import type { Tour } from '../types'

type Season = Tour['season'] | 'any'
const SEASONS: Tour['season'][] = ['summer', 'all', 'winter']

interface FormState {
  name: string
  phone: string
  tour: string
  date: string
  guests: number
  comment: string
}

type Errors = Partial<Record<'name' | 'phone' | 'date', string>>

function Level({ value }: { value: Tour['difficulty'] }) {
  const { t } = useLang()
  const label = [t.level1, t.level2, t.level3][value - 1]
  return (
    <span className="level" title={t.difficulty}>
      {[1, 2, 3].map((n) => (
        <i key={n} className={n <= value ? 'on' : ''} />
      ))}
      {label}
    </span>
  )
}

export default function Tours() {
  const { t, tr, lang } = useLang()
  const [season, setSeason] = useState<Season>('any')
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    tour: tours[0].id,
    date: '',
    guests: 2,
    comment: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [confirmed, setConfirmed] = useState(false)

  const list = season === 'any' ? tours : tours.filter((x) => x.season === season)
  const selected = tourById(form.tour) ?? tours[0]

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }))
    setConfirmed(false)
    if (k in errors) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const choose = (id: string) => {
    set('tour', id)
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const errs: Errors = {}
    if (form.name.trim().length < 2) errs.name = t.errName
    if (form.phone.replace(/\D/g, '').length < 10) errs.phone = t.errPhone
    if (!form.date) errs.date = t.errDate
    setErrors(errs)
    setConfirmed(Object.keys(errs).length === 0)
  }

  const now = new Date()
  const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10)

  return (
    <>
      <PageHero image={img('kolsay-1')} title={t.toursTitle} text={t.toursText} crumb={t.navTours} />

      <section className="section container">
        <div className="toolbar">
          <div className="chips" role="group">
            <button type="button" className="chip" aria-pressed={season === 'any'} onClick={() => setSeason('any')}>
              {t.all}
            </button>
            {SEASONS.map((s) => (
              <button key={s} type="button" className="chip" aria-pressed={season === s} onClick={() => setSeason(s)}>
                {t[`season_${s}`]}
              </button>
            ))}
          </div>
          <span className="result-count">{list.length}</span>
        </div>

        <div className="tour-grid">
          {list.map((x, i) => (
            <article key={x.id} className="tour-card reveal" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
              <div className="tour-card__img">
                <img src={x.image} alt={tr(x.title)} loading="lazy" />
                <span className="tag">{t[`season_${x.season}`]}</span>
                <span className="tour-card__days">
                  {x.days} {t.days}
                </span>
              </div>
              <div className="tour-card__body">
                <span className="tour-card__route">{tr(x.route)}</span>
                <h3 className="h3">{tr(x.title)}</h3>
                <p>{tr(x.summary)}</p>
                <ul className="highlights" style={{ fontSize: 13 }}>
                  {x.includes.map((inc, k) => (
                    <li key={k}>
                      <Check />
                      {tr(inc)}
                    </li>
                  ))}
                </ul>
                <Level value={x.difficulty} />
                <div className="tour-card__foot">
                  <div className="price">
                    <small>{t.from}</small>
                    <b>{formatPrice(x.price)}</b>
                  </div>
                  <button type="button" className="btn btn--olive btn--sm" onClick={() => choose(x.id)}>
                    {t.choose}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container">
        <div className="booking-section reveal" id="booking">
          <div>
            <h2 className="h2">{t.bookTitle}</h2>
            <span className="underline-accent" />
            <p className="lead">{t.bookText}</p>

            <form className="form" onSubmit={submit} noValidate>
              <label className={`field${errors.name ? ' has-error' : ''}`}>
                {t.fName}
                <input value={form.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" />
                {errors.name && <span className="field__error">{errors.name}</span>}
              </label>
              <label className={`field${errors.phone ? ' has-error' : ''}`}>
                {t.fPhone}
                <input
                  type="tel"
                  placeholder="+7 7__ ___ __ __"
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  autoComplete="tel"
                />
                {errors.phone && <span className="field__error">{errors.phone}</span>}
              </label>
              <label className="field field--full">
                {t.fTour}
                <select value={form.tour} onChange={(e) => set('tour', e.target.value)}>
                  {tours.map((x) => (
                    <option key={x.id} value={x.id}>
                      {tr(x.title)} — {x.days} {t.days}, {formatPrice(x.price)}
                    </option>
                  ))}
                </select>
              </label>
              <label className={`field${errors.date ? ' has-error' : ''}`}>
                {t.fDate}
                <input type="date" min={today} value={form.date} onChange={(e) => set('date', e.target.value)} />
                {errors.date && <span className="field__error">{errors.date}</span>}
              </label>
              <label className="field">
                {t.fGuests}
                <select value={form.guests} onChange={(e) => set('guests', Number(e.target.value))}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field field--full">
                {t.fComment}
                <textarea value={form.comment} onChange={(e) => set('comment', e.target.value)} />
              </label>
              <div className="form__actions">
                <button type="submit" className="btn btn--olive">
                  {t.sendRequest}
                  <span className="btn__icon">
                    <ArrowRight />
                  </span>
                </button>
                <span className="form__note">{t.demoNote}</span>
              </div>
              {confirmed && (
                <div className="success" role="status">
                  <Check />
                  {t.bookSuccess}
                </div>
              )}
            </form>
          </div>

          <div className="booking-preview" style={{ backgroundImage: `url(${selected.image})` }}>
            <BookingCard
              info={{
                title: tr(selected.title),
                place: tr(selected.route),
                image: selected.image,
                checkIn: formatDate(form.date, lang),
                checkOut: form.date ? formatDate(addDays(form.date, selected.days), lang) : '—',
                guests: form.guests,
                total: formatPrice(selected.price * form.guests),
                confirmed,
              }}
            />
          </div>
        </div>
      </section>
    </>
  )
}
