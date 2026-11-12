import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import { destinationById, destinations, img } from '../data/destinations'
import { Modal, PageHero } from '../components/ui'
import { ArrowRight, Calendar, Check } from '../components/Icons'
import type { Destination, RegionId } from '../types'

const REGIONS: RegionId[] = ['almaty', 'south', 'north', 'west', 'capital']

function DestinationModal({ d, onClose }: { d: Destination; onClose: () => void }) {
  const { t, tr } = useLang()
  const [active, setActive] = useState(0)
  return (
    <Modal onClose={onClose} label={tr(d.name)}>
      <div className="modal__media">
        <img key={d.images[active]} src={img(d.images[active])} alt={tr(d.name)} />
        {d.images.length > 1 && (
          <div className="modal__thumbs">
            {d.images.map((s, i) => (
              <button key={s} type="button" aria-pressed={i === active} onClick={() => setActive(i)} aria-label={`${i + 1}`}>
                <img src={img(s)} alt="" />
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="modal__body">
        <span className="eyebrow" style={{ fontSize: 16 }}>
          {t[`region_${d.region}`]}
        </span>
        <h2 className="h2">{tr(d.name)}</h2>
        <p>{tr(d.description)}</p>
        <div className="facts">
          <div className="fact">
            <small>{t.bestTime}</small>
            {tr(d.bestTime)}
          </div>
          <div className="fact">
            <small>{t.duration}</small>
            {tr(d.duration)}
          </div>
          <div className="fact" style={{ gridColumn: '1 / -1' }}>
            <small>{t.fromCity}</small>
            {tr(d.fromCity)}
          </div>
        </div>
        <h3 style={{ fontWeight: 600, fontSize: 14 }}>{t.whatToSee}</h3>
        <ul className="highlights">
          {d.highlights.map((h, i) => (
            <li key={i}>
              <Check />
              {tr(h)}
            </li>
          ))}
        </ul>
        <Link to="/tours" className="btn btn--olive" style={{ alignSelf: 'flex-start', marginTop: 8 }}>
          {t.findTour}
          <span className="btn__icon">
            <ArrowRight />
          </span>
        </Link>
      </div>
    </Modal>
  )
}

export default function Destinations() {
  const { t, tr } = useLang()
  const [params, setParams] = useSearchParams()
  const [region, setRegion] = useState<RegionId | 'all'>('all')

  const list = region === 'all' ? destinations : destinations.filter((d) => d.region === region)
  const opened = destinationById(params.get('open') ?? '')

  const open = (id: string) => setParams({ open: id }, { replace: false, preventScrollReset: true })
  const close = () => setParams({}, { replace: false, preventScrollReset: true })

  const stats = [
    { n: '2,7 млн', label: t.stat1 },
    { n: '6', label: t.stat2 },
    { n: '48 000', label: t.stat3 },
    { n: '3 000', label: t.stat4 },
  ]

  return (
    <>
      <PageHero image={img('charyn-3')} title={t.destTitle} text={t.destText} crumb={t.navDestinations} />

      <section className="section--tight container">
        <div className="stats">
          {stats.map((s, i) => (
            <div key={i} className="stat reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <b>{s.n}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section container" style={{ paddingTop: 24 }}>
        <div className="toolbar">
          <div className="chips" role="group">
            <button type="button" className="chip" aria-pressed={region === 'all'} onClick={() => setRegion('all')}>
              {t.regionAll}
            </button>
            {REGIONS.map((r) => (
              <button key={r} type="button" className="chip" aria-pressed={region === r} onClick={() => setRegion(r)}>
                {t[`region_${r}`]}
              </button>
            ))}
          </div>
          <span className="result-count">
            {list.length} {t.places}
          </span>
        </div>

        <div className="dest-grid">
          {list.map((d, i) => (
            <button
              key={d.id}
              type="button"
              className="dest-card reveal"
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              onClick={() => open(d.id)}
            >
              <div className="dest-card__img">
                <img src={img(d.images[0])} alt={tr(d.name)} loading="lazy" />
                <span className="tag">{t[`region_${d.region}`]}</span>
              </div>
              <div className="dest-card__body">
                <h3 className="h3">{tr(d.name)}</h3>
                <p>{tr(d.short)}</p>
                <div className="dest-card__meta">
                  <span>
                    <Calendar />
                    {tr(d.bestTime)}
                  </span>
                  <span className="arrow-link">
                    <ArrowRight />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {opened && <DestinationModal key={opened.id} d={opened} onClose={close} />}
    </>
  )
}
