import { motion } from 'motion/react'
import type { Filter } from './Menu'
import { Panda, RedPanda } from './Mascots'
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
    <section className="duo" aria-labelledby="duo-title">
      <div className="wrap">
        <SectionHead eyebrow="Poznaj naszą ekipę" title="Panda (i pandka)" id="duo-title" />
        <div className="duo-grid">
          {CARDS.map(({ who, Mascot, title, text, filter, cta }, i) => (
            <motion.article
              key={who}
              className="duo-card"
              initial={{ opacity: 0, y: 60, rotate: i ? 3 : -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease, delay: i * 0.15 }}
            >
              <motion.div className="duo-art" whileHover={{ scale: 1.06, rotate: i ? 4 : -4 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }}>
                <Mascot />
              </motion.div>
              <div className="duo-copy">
                <span className="pieces">{who}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <a
                  href="#menu"
                  className="btn btn-primary"
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
