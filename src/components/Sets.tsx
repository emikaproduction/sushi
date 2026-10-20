import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'
import { SETS } from '../data/menu'
import { cx, pieces, wrap } from '../lib/styles'
import { SectionHead, Tag } from './ui'

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
      data-hover
      className="flex w-[min(440px,82vw)] flex-none snap-center flex-col overflow-hidden rounded-card border-2 border-ink bg-paper-light"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.08 }}
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
    <div ref={outer} className="relative" style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="sticky top-(--nav-h) flex h-[calc(100vh_-_var(--nav-h))] flex-col justify-center overflow-hidden">
        <motion.div ref={track} className="flex w-max gap-5 px-[max(var(--gutter),calc((100vw_-_var(--page-max))/2_+_var(--gutter)))]" style={{ x }}>
          {SETS.map((s, i) => (
            <SetCard key={s.name} s={s} i={i} />
          ))}
        </motion.div>
        <div className="mt-7 flex justify-center" aria-hidden="true">
          {SETS.map((s, i) => (
            <span
              key={s.name}
              className={cx(
                'grid h-2 w-8 place-items-center before:size-2 before:rounded-[4px] before:transition-[transform,background-color] before:duration-400 before:ease-out-expo',
                i === active ? 'before:scale-x-[3.5] before:bg-red' : 'before:bg-paper-deep',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function Sets() {
  const wide = useWide()
  return (
    <section className="pt-[100px]" id="zestawy" aria-labelledby="sets-title">
      <div className={wrap}>
        <SectionHead eyebrow="Na randkę, na imprezę, na wieczór" title="Zestawy" id="sets-title" />
      </div>
      {wide ? (
        <SetsPinned />
      ) : (
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain px-(--gutter) pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SETS.map((s, i) => (
            <SetCard key={s.name} s={s} i={i} />
          ))}
        </div>
      )}
    </section>
  )
}
