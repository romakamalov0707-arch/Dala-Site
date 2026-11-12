import { useState } from 'react'
import { useLang } from '../i18n/LangContext'
import { img } from '../data/destinations'
import { photos } from '../data/gallery'
import { Lightbox, PageHero } from '../components/ui'
import type { GalleryCategory } from '../types'

const CATS: GalleryCategory[] = ['mountains', 'lakes', 'steppe', 'culture', 'cities']

export default function Gallery() {
  const { t, tr } = useLang()
  const [cat, setCat] = useState<GalleryCategory | 'all'>('all')
  const [open, setOpen] = useState<number | null>(null)

  const list = cat === 'all' ? photos : photos.filter((p) => p.category === cat)
  const items = list.map((p) => ({ src: p.src, caption: tr(p.title) }))

  return (
    <>
      <PageHero image={img('altynemel-2')} title={t.galleryTitle} text={t.galleryPageText} crumb={t.navGallery} />

      <section className="section container">
        <div className="toolbar">
          <div className="chips" role="group">
            <button type="button" className="chip" aria-pressed={cat === 'all'} onClick={() => setCat('all')}>
              {t.all}
            </button>
            {CATS.map((c) => (
              <button key={c} type="button" className="chip" aria-pressed={cat === c} onClick={() => setCat(c)}>
                {t[`cat_${c}`]}
              </button>
            ))}
          </div>
          <span className="result-count">{list.length}</span>
        </div>

        <div className="masonry" key={cat}>
          {list.map((p, i) => (
            <button key={p.src} type="button" className="masonry__item reveal" onClick={() => setOpen(i)}>
              <figure style={{ margin: 0 }}>
                <img src={p.src} alt={tr(p.title)} loading="lazy" />
                <figcaption>{tr(p.title)}</figcaption>
              </figure>
            </button>
          ))}
        </div>
      </section>

      {open !== null && <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </>
  )
}
