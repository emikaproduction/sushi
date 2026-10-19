import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { MENU, type Item, type Price } from '../data/menu'
import { SectionHead } from './ui'

export type Filter = 'all' | 'veg' | 'noraw'

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Wszystko' },
  { id: 'veg', label: 'Wege' },
  { id: 'noraw', label: 'Bez surowej ryby' },
]

const pass = (f: Filter) => (it: Item) => (f === 'veg' ? !!it.veg : f === 'noraw' ? !it.raw : true)

function PriceTag({ price }: { price: Price }) {
  if (typeof price === 'number') return <span className="price">{price} zł</span>
  return (
    <span className="price-list">
      {price.map((p) => (
        <span key={p.label}>
          {p.label} <b>{p.price} zł</b>
        </span>
      ))}
    </span>
  )
}

function Card({ it, pcs }: { it: Item; pcs?: string }) {
  return (
    <motion.article
      layout
      className={`card ${it.img ? '' : 'card-text'}`}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      whileHover="hover"
    >
      {it.img && (
        <div className="card-img">
          <motion.img
            src={`/img/${it.img}.webp`}
            alt={it.name}
            loading="lazy"
            variants={{ hover: { scale: 1.12, rotate: -8 } }}
            transition={{ type: 'spring', stiffness: 220, damping: 14 }}
          />
        </div>
      )}
      <div className="card-body">
        <div className="tags">
          {pcs && <span className="tag">{pcs}</span>}
          {it.veg && <span className="tag tag-veg">wege</span>}
          {it.raw && <span className="tag tag-raw">surowa ryba</span>}
        </div>
        <h3>{it.name}</h3>
        <p>{it.desc}</p>
        <PriceTag price={it.price} />
      </div>
    </motion.article>
  )
}

export function Menu({ filter, setFilter, cat, setCat }: { filter: Filter; setFilter: (f: Filter) => void; cat: string; setCat: (c: string) => void }) {
  const cats = MENU.map((c) => ({ ...c, visible: c.items.filter(pass(filter)) }))
  const current = cats.find((c) => c.id === cat && c.visible.length) ?? cats.find((c) => c.visible.length)!

  return (
    <section className="menu" id="menu" aria-labelledby="menu-title">
      <div className="wrap">
        <SectionHead eyebrow="Wybierz coś dla siebie" title="Menu" id="menu-title" />

        <LayoutGroup id="filters">
          <div className="pills" role="group" aria-label="Filtr menu">
            {FILTERS.map((f) => (
              <button key={f.id} className={`pill ${filter === f.id ? 'on' : ''}`} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                {filter === f.id && <motion.span layoutId="pill-bg" className="pill-bg" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span>{f.label}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>

        <LayoutGroup id="tabs">
          <div className="tabs" role="tablist" aria-label="Kategorie menu">
            {cats.map((c) => (
              <button
                key={c.id}
                role="tab"
                className="tab"
                aria-selected={current.id === c.id}
                disabled={!c.visible.length}
                onClick={() => setCat(c.id)}
              >
                {c.name}
                <motion.span key={c.visible.length} className="badge" initial={{ scale: 1.6 }} animate={{ scale: 1 }}>
                  {c.visible.length}
                </motion.span>
                {current.id === c.id && <motion.span layoutId="tab-line" className="tab-line" />}
              </button>
            ))}
          </div>
        </LayoutGroup>

        <div className="cat-head">
          <AnimatePresence mode="wait">
            <motion.h3 key={current.id} className="heading" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.3 }}>
              {current.name}
              {current.pcs && <small> · {current.pcs}</small>}
            </motion.h3>
          </AnimatePresence>
        </div>

        <motion.div layout className="menu-grid" role="tabpanel">
          <AnimatePresence mode="popLayout">
            {current.visible.map((it) => (
              <Card key={current.id + it.name} it={it} pcs={current.pcs} />
            ))}
          </AnimatePresence>
        </motion.div>
        <p className="menu-note">Sushi przygotowujemy wyłącznie na wynos. Każdy zestaw powstaje od podstaw — prosimy o chwilę cierpliwości.</p>
      </div>
    </section>
  )
}
