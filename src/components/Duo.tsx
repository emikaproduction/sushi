import { motion } from 'motion/react'
import type { Filter } from './Menu'
import { Panda, RedPanda } from './Mascots'
import { btn, pieces, wrap } from '../lib/styles'
import { Caret, SectionHead } from './ui'

const ease = [0.16, 1, 0.3, 1] as const

const CARDS = [
  {
    who: 'Panda',
    Mascot: Panda,
    title: 'Pilnuje działu wege',
    text: 'Panda je głównie bambus, więc to ona testuje nasze roślinne rolki: kalafior w panko, cukinię w tempurze, mango kalaf. Nie lubisz ryb? Ona też nie zawsze.',
    filter: 'veg' as Filter,
    cta: 'Pokaż pozycje wege',
  },
  {
    who: 'Pandka Ruda',
    Mascot: RedPanda,
    title: 'Ma oko na każdą rybę',
    text: 'Pandka ruda odpowiada za klasykę — łososia, węgorza i halibuta. A dla tych, którzy wolą bez surowizny, ma grillowanego łososia i krewetki w tempurze.',
    filter: 'noraw' as Filter,
    cta: 'Bez surowej ryby',
  },
]

export function Duo({ onPick }: { onPick: (f: Filter) => void }) {
  return (
    <section className="py-section" id="o-nas" aria-labelledby="duo-title">
      <div className={wrap}>
        <SectionHead eyebrow="Poznaj naszą ekipę" title="Panda & Pandka Ruda" id="duo-title" />
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          {CARDS.map(({ who, Mascot, title, text, filter, cta }, i) => (
            <motion.article
              key={who}
              className="grid grid-cols-2 items-end gap-6 overflow-hidden rounded-feature border-2 border-ink bg-paper-light p-[clamp(24px,3vw,40px)] max-sm:grid-cols-1"
              initial={{ opacity: 0, y: 60, rotate: i ? 3 : -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease, delay: i * 0.15 }}
            >
              <motion.div className="-mb-[clamp(24px,3vw,40px)] w-[min(100%,260px)] origin-bottom self-end justify-self-center max-sm:order-2 max-sm:w-[46%]" whileHover={{ scale: 1.06, rotate: i ? 4 : -4 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }}>
                <Mascot />
              </motion.div>
              <div className="grid justify-items-start gap-3.5 self-center">
                <span className={pieces}>{who}</span>
                <h3 className="font-display text-[clamp(32px,3.4vw,48px)] leading-[.92] tracking-[.02em] text-ink uppercase">{title}</h3>
                <p className="text-base text-ink-soft">{text}</p>
                <a
                  href="#menu"
                  className={btn('primary')}
                  onClick={() => onPick(filter)}
                >
                  {cta} <Caret />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
