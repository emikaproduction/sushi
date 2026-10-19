import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'
import { CONTACT, SETS } from '../data/menu'
import { Caret, Phone, SectionHead } from './ui'

function useWide() {
  const q = '(min-width: 900px) and (prefers-reduced-motion: no-preference)'
  const [wide, setWide] = useState(() => matchMedia(q).matches)
  useLayoutEffect(() => {
    const m = matchMedia(q)
    const on = () => setWide(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [q])
  return wide
}

function SetCard({ s, i }: { s: (typeof SETS)[number]; i: number }) {
  return (
    <motion.article
      className="set-card"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.08 }}
      whileHover="hover"
    >
      <div className="set-img">
        <motion.img src={`/img/${s.img}.webp`} alt={`${s.name} — ${s.pcs} sztuk`} loading="lazy" variants={{ hover: { scale: 1.06, rotate: -2 } }} transition={{ type: 'spring', stiffness: 200, damping: 16 }} />
        {s.tag && <span className="tag tag-hot">{s.tag}</span>}
      </div>
      <div className="set-body">
        <div className="card-top">
          <h3>{s.name}</h3>
          <span className="set-price">{s.price} zł</span>
        </div>
        <span className="pieces">{s.pcs} sztuk</span>
        <ul>
          {s.items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <a href={CONTACT.phoneHref} className="btn btn-ghost">
          <Phone /> Zamów {s.name} <Caret />
        </a>
      </div>
    </motion.article>
  )
}

function SetsPinned() {
  const outer = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [dist, setDist] = useState(0)
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    const el = track.current!
    const measure = () => setDist(Math.max(0, el.scrollWidth - window.innerWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist])
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.round(v * (SETS.length - 1))))

  return (
    <div ref={outer} className="sets-pin" style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="sets-sticky">
        <motion.div ref={track} className="sets-track" style={{ x }}>
          {SETS.map((s, i) => (
            <SetCard key={s.name} s={s} i={i} />
          ))}
        </motion.div>
        <div className="sets-progress" aria-hidden="true">
          {SETS.map((s, i) => (
            <span key={s.name} className={i === active ? 'on' : ''} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function Sets() {
  const wide = useWide()
  return (
    <section className="sets" id="zestawy" aria-labelledby="sets-title">
      <div className="wrap">
        <SectionHead eyebrow="Na randkę, na imprezę, na wieczór" title="Zestawy" id="sets-title" />
      </div>
      {wide ? (
        <SetsPinned />
      ) : (
        <div className="sets-scroll">
          {SETS.map((s, i) => (
            <SetCard key={s.name} s={s} i={i} />
          ))}
        </div>
      )}
    </section>
  )
}
