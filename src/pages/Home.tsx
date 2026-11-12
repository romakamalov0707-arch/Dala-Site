import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { formatPrice, useLang } from '../i18n/LangContext'
import { destinations, img } from '../data/destinations'
import { faqs } from '../data/gallery'
import { tourById } from '../data/tours'
import { Accordion, addDays, Avatars, BookingCard, formatDate, Lightbox, type LightboxItem } from '../components/ui'
import { Socials } from '../components/Footer'
import { ArrowLeft, ArrowRight, Chevron, Gift, Leaf, Ornament, Play } from '../components/Icons'

const RESERVE_SLIDES = [
  { bg: 'yurt-3', tour: 'assy', start: '2026-06-12', place: { ru: 'Плато Ассы, Алматинская обл.', kz: 'Асы жайлауы, Алматы облысы' } },
  { bg: 'bozjyra-1', tour: 'mangystau', start: '2026-09-18', place: { ru: 'Бозжыра, Мангистау', kz: 'Бозжыра, Маңғыстау' } },
  { bg: 'kolsay-1', tour: 'charyn-kolsay', start: '2026-07-03', place: { ru: 'Кольсай, Алматинская обл.', kz: 'Көлсай, Алматы облысы' } },
]

const MOSAIC = ['yurt-3', 'bao-3', 'bozjyra-1', 'kolsay-2', 'altynemel-2']
const MOSAIC_CAPTIONS: Record<string, { ru: string; kz: string }> = {
  'yurt-3': { ru: 'Убранство юрты', kz: 'Киіз үйдің жасауы' },
  'bao-3': { ru: 'Большое Алматинское озеро', kz: 'Үлкен Алматы көлі' },
  'bozjyra-1': { ru: 'Бозжыра', kz: 'Бозжыра' },
  'kolsay-2': { ru: 'Кольсай', kz: 'Көлсай' },
  'altynemel-2': { ru: 'Поющий бархан', kz: 'Әнші құм' },
}

function Hero() {
  const { t } = useLang()
  return (
    <section className="hero">
      <img className="hero__bg" src={img('bao-3')} alt="" />
      <div className="hero__content">
        <div>
          <h1 className="h1 hero__title">
            <span>{t.heroLine1}</span>
            <span>{t.heroLine2}</span>
            <span>{t.heroLine3}</span>
          </h1>
          <p className="hero__text">{t.heroText}</p>
          <div className="hero__cta">
            <Link to="/tours" className="btn btn--olive">
              {t.heroCta}
              <span className="btn__icon">
                <ArrowRight />
              </span>
            </Link>
          </div>
        </div>

        <div className="orbit">
          <div className="orbit__ring">
            <i />
            <i />
            <i />
            <i />
          </div>
          <span className="orbit__label orbit__label--t">{t.orbitTop}</span>
          <span className="orbit__label orbit__label--l">{t.orbitLeft}</span>
          <span className="orbit__label orbit__label--r">{t.orbitRight}</span>
          <span className="orbit__label orbit__label--b">{t.orbitBottom}</span>
          <Link to="/gallery" className="orbit__center" aria-label={t.orbitPlay}>
            <img src={img('kolsay-2')} alt="" />
            <span className="play">
              <Play />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

function Features() {
  const { t } = useLang()
  const cards = [
    { slug: 'kaindy-2', label: t.feature1, to: '/destinations?open=kolsay' },
    { slug: 'turkestan-1', label: t.feature2, to: '/destinations?open=turkestan' },
    { slug: 'yurt-3', label: t.feature3, to: '/destinations?open=assy' },
  ]
  return (
    <section className="section--tight container" style={{ paddingTop: 20 }}>
      <div className="features">
        {cards.map((c, i) => (
          <Link key={c.slug} to={c.to} className="photo-card reveal" style={{ transitionDelay: `${i * 90}ms` }}>
            <img src={img(c.slug)} alt="" loading="lazy" />
            <div className="photo-card__meta">
              <span className="photo-card__num">0{i + 1}</span>
              {c.label}
            </div>
          </Link>
        ))}
        <div className="about-block reveal" style={{ transitionDelay: '270ms' }}>
          <span className="eyebrow">
            <Ornament />
            {t.aboutEyebrow}
          </span>
          <p>
            {t.aboutA}
            <em>{t.aboutEm}</em>
            {t.aboutB}
          </p>
          <div className="social-proof">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatars names={['А', 'Д', 'М', 'Ж']} />
              <small>
                {t.trusted}
                <br />
                {t.trustedCount}
              </small>
            </div>
            <div className="rating">
              <strong>4.9</strong>
              <span className="stars">★★★★★</span>
              <small>{t.reviews}</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Discover() {
  const { t, tr } = useLang()
  const track = useRef<HTMLDivElement>(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  const update = () => {
    const el = track.current
    if (!el) return
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 })
  }
  const scroll = (dir: number) => {
    const el = track.current
    if (el) el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 560), behavior: 'smooth' })
  }

  useEffect(update, [])

  return (
    <section className="section container">
      <hr className="divider" style={{ width: 120, marginBottom: 48 }} />
      <div className="discover">
        <div className="discover__text reveal">
          <h2 className="h2">{t.discoverTitle}</h2>
          <span className="underline-accent" />
          <p className="lead">{t.discoverText}</p>
          <div className="slider-controls">
            <button type="button" className="round-btn" aria-label={t.prev} disabled={edge.start} onClick={() => scroll(-1)}>
              <ArrowLeft />
            </button>
            <button type="button" className="round-btn" aria-label={t.next} disabled={edge.end} onClick={() => scroll(1)}>
              <ArrowRight />
            </button>
          </div>
        </div>
        <div className="slider reveal">
          <div className="slider__track" ref={track} onScroll={update}>
            {destinations.map((d, i) => (
              <Link
                key={d.id}
                to={`/destinations?open=${d.id}`}
                className={`slide${i % 3 === 0 ? ' slide--wide' : ''}`}
              >
                <img src={img(d.images[0])} alt={tr(d.name)} loading="lazy" />
                <span className="slide__label">{tr(d.name)}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Reserve() {
  const { t, tr, lang } = useLang()
  const navigate = useNavigate()
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = window.setTimeout(() => setI((v) => (v + 1) % RESERVE_SLIDES.length), 6000)
    return () => window.clearTimeout(id)
  }, [i])

  const s = RESERVE_SLIDES[i]
  const tour = tourById(s.tour)!

  return (
    <section className="container">
      <div className="reserve reveal">
        {RESERVE_SLIDES.map((r, k) => (
          <img
            key={r.bg}
            src={img(r.bg)}
            alt=""
            style={{ opacity: k === i ? 1 : 0, transition: 'opacity 1.2s ease' }}
            loading="lazy"
          />
        ))}
        <BookingCard
          onDetails={() => navigate('/tours')}
          info={{
            title: tr(tour.title),
            place: tr(s.place),
            image: tour.image,
            checkIn: formatDate(s.start, lang),
            checkOut: formatDate(addDays(s.start, tour.days), lang),
            guests: 2,
            total: formatPrice(tour.price * 2),
            confirmed: true,
          }}
        />
        <div className="reserve__body">
          <span className="reserve__icon">
            <Gift />
          </span>
          <h2 className="h2">{t.reserveTitle}</h2>
          <p>{t.reserveText}</p>
          <Link to="/contacts" className="community">
            <Avatars names={['А', 'Н', 'Е']} />
            <span className="btn btn--olive btn--sm" style={{ paddingRight: 8 }}>
              {t.joinCommunity}
              <span className="btn__icon" style={{ width: 22, height: 22 }}>
                <Chevron />
              </span>
            </span>
          </Link>
          <div className="reserve__foot">
            <div className="counter">
              {String(i + 1).padStart(2, '0')}
              <span className="counter__line">
                <i key={i} />
              </span>
              <small>{String(RESERVE_SLIDES.length).padStart(2, '0')}</small>
              <div className="reserve__slides">
                {RESERVE_SLIDES.map((r, k) => (
                  <button key={r.bg} type="button" aria-label={`${k + 1}`} aria-pressed={k === i} onClick={() => setI(k)} />
                ))}
              </div>
            </div>
            <Link to="/tours" className="btn btn--ghost-light">
              {t.exploreTours}
              <span className="btn__icon">
                <Chevron />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function Spaces() {
  const { t } = useLang()
  return (
    <section className="section container">
      <div className="spaces">
        <div className="spaces__left reveal">
          <Leaf className="leaf-deco" />
          <h2 className="h2">{t.spacesTitle}</h2>
          <Link to="/gallery" className="video-thumb" aria-label={t.orbitPlay}>
            <img src={img('steppe-1')} alt="" loading="lazy" />
            <span className="play">
              <Play />
            </span>
          </Link>
          <p>{t.spacesText}</p>
        </div>
        <div className="reveal">
          <Accordion items={faqs} firstImage={img('assy-1')} />
        </div>
      </div>
    </section>
  )
}

function GalleryBand() {
  const { t, tr } = useLang()
  const [open, setOpen] = useState<number | null>(null)
  const items: LightboxItem[] = MOSAIC.map((s) => ({ src: img(s), caption: tr(MOSAIC_CAPTIONS[s]) }))
  return (
    <section className="container">
      <div className="gallery-band reveal">
        <div className="gallery-band__title">
          <Ornament />
          <h2 className="h3">{t.galleryTitle}</h2>
        </div>
        <div className="gallery-band__grid">
          <div className="follow">
            <small>{t.followUs}</small>
            <Socials />
          </div>
          <div className="mosaic">
            {items.map((it, k) => (
              <button key={it.src} type="button" onClick={() => setOpen(k)} aria-label={it.caption}>
                <img src={it.src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
          <p className="gallery-band__note">{t.galleryNote}</p>
        </div>
        <div className="gallery-band__more">
          <Link to="/gallery" className="btn btn--outline btn--sm">
            {t.morePhotos}
          </Link>
        </div>
      </div>
      {open !== null && <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Discover />
      <Reserve />
      <Spaces />
      <GalleryBand />
    </>
  )
}
