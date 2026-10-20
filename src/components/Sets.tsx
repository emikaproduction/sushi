import { motion } from 'motion/react'
import { SETS } from '../data/menu'
import { pieces, wrap } from '../lib/styles'
import { Slider } from './Slider'
import { SectionHead, Tag } from './ui'

function SetCard({ s, i }: { s: (typeof SETS)[number]; i: number }) {
  return (
    <motion.article
      data-hover
      className="flex w-[min(400px,82vw)] flex-col overflow-hidden rounded-card border-2 border-ink bg-paper-light"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: Math.min(i, 3) * 0.08 }}
      whileHover="hover"
    >
      <div className="relative grid h-[clamp(220px,34vh,320px)] place-items-center overflow-hidden border-b-2 border-ink bg-paper-deep p-5">
        <motion.img className="size-full object-contain" src={`/img/${s.img}.webp`} alt={`${s.name} — ${s.pcs} sztuk`} loading="lazy" variants={{ hover: { scale: 1.06, rotate: -2 } }} transition={{ type: 'spring', stiffness: 200, damping: 16 }} />
        {s.tag && (
          <Tag kind="hot" className="absolute top-3.5 left-3.5">
            {s.tag}
          </Tag>
        )}
      </div>
      <div className="grid flex-1 content-start gap-2.5 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-[34px] leading-none tracking-[.03em] text-ink uppercase">{s.name}</h3>
          <span className="font-display text-[34px] leading-none tracking-[.02em] text-red">{s.price} zł</span>
        </div>
        <span className={pieces}>{s.pcs} sztuk</span>
        <ul className="flex flex-wrap gap-x-3.5 gap-y-1 text-sm text-ink-soft">
          {s.items.map((x) => (
            <li key={x} className="before:text-[10px] before:text-red before:content-['✕_']">
              {x}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

export function Sets() {
  return (
    <section className="py-section" id="zestawy" aria-labelledby="sets-title">
      <div className={wrap}>
        <SectionHead eyebrow="Na randkę, na imprezę, na wieczór" title="Zestawy" id="sets-title" />
      </div>
      <Slider label="Zestawy sushi">
        {SETS.map((s, i) => (
          <SetCard key={s.name} s={s} i={i} />
        ))}
      </Slider>
    </section>
  )
}
