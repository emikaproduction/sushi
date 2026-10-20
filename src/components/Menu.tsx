import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { MENU, type Item, type Price } from '../data/menu'
import { cx, wrap } from '../lib/styles'
import { SectionHead, Tag } from './ui'

export type Filter = 'all' | 'veg' | 'noraw'

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Wszystko' },
  { id: 'veg', label: 'Wege' },
  { id: 'noraw', label: 'Bez surowej ryby' },
]

const pass = (f: Filter) => (it: Item) => (f === 'veg' ? !!it.veg : f === 'noraw' ? !it.raw : true)

function PriceTag({ price }: { price: Price }) {
  if (typeof price === 'number') return <span className="mt-1 text-xl font-bold">{price} zł</span>
  return (
    <span className="mt-1 grid gap-0.5 text-sm text-ink-soft">
      {price.map((p) => (
        <span key={p.label}>
          {p.label} <b className="text-base text-ink">{p.price} zł</b>
        </span>
      ))}
    </span>
  )
}

function Card({ it, pcs }: { it: Item; pcs?: string }) {
  return (
    <motion.article
      layout
      data-hover
      className={cx('flex flex-col overflow-hidden rounded-card border-2 border-ink bg-paper-light', !it.img && 'min-h-[200px] justify-between')}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      whileHover="hover"
    >
      {it.img && (
        <div className="relative grid aspect-4/3 place-items-center overflow-hidden border-b-2 border-ink bg-paper-deep before:absolute before:aspect-square before:w-[72%] before:rounded-full before:bg-paper before:opacity-90 before:shadow-[inset_0_0_0_10px_var(--color-rust)]">
          <motion.img
            src={`/img/${it.img}.webp`}
            alt={it.name}
            className="relative h-[84%] w-[74%] object-contain"
            loading="lazy"
            variants={{ hover: { scale: 1.12, rotate: -8 } }}
            transition={{ type: 'spring', stiffness: 220, damping: 14 }}
          />
        </div>
      )}
      <div className={cx('grid flex-1 content-start gap-2 px-5 pb-5', it.img ? 'pt-[18px]' : 'pt-6')}>
        <div className="flex min-h-[22px] flex-wrap gap-1.5">
          {pcs && <Tag kind="pcs">{pcs}</Tag>}
          {it.veg && <Tag kind="veg">wege</Tag>}
          {it.raw && <Tag kind="raw">surowa ryba</Tag>}
        </div>
        <h3 className="font-display text-[26px] leading-none tracking-[.03em] text-ink uppercase">{it.name}</h3>
        <p className="flex-1 text-sm leading-[1.45] text-ink-soft">{it.desc}</p>
        <PriceTag price={it.price} />
      </div>
    </motion.article>
  )
}

export function Menu({ filter, setFilter, cat, setCat }: { filter: Filter; setFilter: (f: Filter) => void; cat: string; setCat: (c: string) => void }) {
  const cats = MENU.map((c) => ({ ...c, visible: c.items.filter(pass(filter)) }))
  const current = cats.find((c) => c.id === cat && c.visible.length) ?? cats.find((c) => c.visible.length)!

  return (
    <section className="py-[100px]" id="menu" aria-labelledby="menu-title">
      <div className={wrap}>
        <SectionHead eyebrow="Wybierz coś dla siebie" title="Menu" id="menu-title" />

        <LayoutGroup id="filters">
          <div className="mb-7 flex flex-wrap justify-center gap-1.5" role="group" aria-label="Filtr menu">
            {FILTERS.map((f) => (
              <button key={f.id} className={cx(
                  'relative rounded-btn border px-4 py-2.5 text-sm font-medium tracking-[.02em] uppercase transition-colors duration-250 hover:bg-paper-light',
                  filter === f.id ? 'border-red text-white' : 'border-ink text-ink',
                )} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                {filter === f.id && <motion.span layoutId="pill-bg" className="absolute -inset-px rounded-btn bg-red" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className="relative">{f.label}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>

        <LayoutGroup id="tabs">
          <div className="mb-10 flex flex-wrap justify-center gap-x-7 gap-y-1 max-sm:gap-x-[18px] max-sm:gap-y-0.5" role="tablist" aria-label="Kategorie menu">
            {cats.map((c) => (
              <button
                key={c.id}
                role="tab"
                className="group/tab relative inline-flex items-center gap-2 py-2 text-lg font-medium tracking-[.02em] text-ink-soft uppercase transition-[color,opacity] duration-200 hover:text-ink disabled:opacity-30 aria-selected:text-ink max-sm:text-[15px]"
                aria-selected={current.id === c.id}
                disabled={!c.visible.length}
                onClick={() => setCat(c.id)}
              >
                {c.name}
                <motion.span key={c.visible.length} className="inline-grid h-[22px] min-w-[22px] place-items-center rounded-[11px] bg-paper-deep px-1.5 text-xs font-bold text-ink group-aria-selected/tab:bg-red group-aria-selected/tab:text-white" initial={{ scale: 1.6 }} animate={{ scale: 1 }}>
                  {c.visible.length}
                </motion.span>
                {current.id === c.id && <motion.span layoutId="tab-line" className="absolute inset-x-0 bottom-0 h-[3px] rounded-[2px] bg-red" />}
              </button>
            ))}
          </div>
        </LayoutGroup>

        <div className="mb-6 min-h-12 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h3 key={current.id} className="font-display text-[clamp(32px,4vw,48px)] leading-[.9] tracking-[.02em] text-red uppercase" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.3 }}>
              {current.name}
              {current.pcs && <small className="font-ui text-base font-medium tracking-[.06em] text-ink-soft"> · {current.pcs}</small>}
            </motion.h3>
          </AnimatePresence>
        </div>

        <motion.div layout className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4" role="tabpanel">
          <AnimatePresence mode="popLayout">
            {current.visible.map((it) => (
              <Card key={current.id + it.name} it={it} pcs={current.pcs} />
            ))}
          </AnimatePresence>
        </motion.div>
        <p className="mx-auto mt-10 max-w-[560px] text-center text-sm text-ink-soft">Sushi przygotowujemy wyłącznie na wynos. Każdy zestaw powstaje od podstaw — prosimy o chwilę cierpliwości.</p>
      </div>
    </section>
  )
}
