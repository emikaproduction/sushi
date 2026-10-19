import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { CONTACT } from '../data/menu'
import { Panda, RedPanda } from './Mascots'
import { Caret, Phone, SplitText } from './ui'
import { useOpenStatus } from '../lib/hours'

const ease = [0.16, 1, 0.3, 1] as const

function introPending() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return !sessionStorage.getItem('intro-seen')
  } catch {
    return true
  }
}
// animacje hero startują dopiero, gdy intro zjedzie z ekranu
const D = introPending() ? 1.5 : 0

export function Nav() {
  const { open, label } = useOpenStatus()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 12))
  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#top" className="logo" aria-label="Sushi dla Ciebie — początek strony">
          <img src="/img/logo-mark.webp" alt="" width="40" height="40" />
          <span>Sushi dla Ciebie</span>
        </a>
        <nav className="nav-links" aria-label="Główna nawigacja">
          <a href="#menu">Menu</a>
          <a href="#sushigo">SushiGO</a>
          <a href="#zestawy">Zestawy</a>
          <a href="#wideo">Wideo</a>
          <a href="#o-nas">O nas</a>
          <a href="#kontakt">Kontakt</a>
        </nav>
        <div className="nav-actions">
          <span className={`status ${open ? 'is-open' : ''}`}>{label}</span>
          <a href={CONTACT.phoneHref} className="btn btn-primary">
            <Phone />
            {CONTACT.phone}
          </a>
        </div>
      </div>
    </header>
  )
}

// tło hero: pociągnięcia pędzla czarnym i zielonym tuszem, jak na grafikach z pandami
const STROKES = [
  { d: 'M-40 770 C 120 700 270 712 430 618', w: 74, c: 'var(--ink)', o: 0.88, t: 0 },
  { d: 'M-40 832 C 150 790 310 800 480 700', w: 18, c: 'var(--ink)', o: 0.45, t: 0.15 },
  { d: 'M70 128 C 200 98 300 116 430 74', w: 9, c: 'var(--ink)', o: 0.3, t: 0.35 },
  { d: 'M1490 150 C 1330 210 1230 192 1060 272', w: 64, c: 'var(--matcha)', o: 0.8, t: 0.1 },
  { d: 'M1490 222 C 1350 270 1270 262 1120 330', w: 16, c: 'var(--matcha)', o: 0.5, t: 0.25 },
  { d: 'M1140 838 C 1250 806 1330 812 1470 748', w: 26, c: 'var(--matcha)', o: 0.6, t: 0.4 },
]
const DOTS = [
  { x: 250, y: 210, r: 9, c: 'var(--matcha)' }, { x: 282, y: 188, r: 5, c: 'var(--matcha)' }, { x: 222, y: 240, r: 4, c: 'var(--matcha)' },
  { x: 1180, y: 380, r: 7, c: 'var(--matcha)' }, { x: 1210, y: 404, r: 4, c: 'var(--matcha)' },
  { x: 1290, y: 700, r: 8, c: 'var(--ink)' }, { x: 1320, y: 676, r: 4, c: 'var(--ink)' }, { x: 470, y: 720, r: 6, c: 'var(--ink)' },
]

// węższa kompozycja na telefon, żeby pociągnięcia nie wypadały poza ekran
const STROKES_SM = [
  { d: 'M-20 770 C 60 728 140 738 232 686', w: 40, c: 'var(--ink)', o: 0.85, t: 0 },
  { d: 'M-20 812 C 80 790 160 794 252 740', w: 10, c: 'var(--ink)', o: 0.45, t: 0.15 },
  { d: 'M24 64 C 84 52 134 60 194 44', w: 5, c: 'var(--ink)', o: 0.3, t: 0.35 },
  { d: 'M424 122 C 344 152 294 142 204 192', w: 34, c: 'var(--matcha)', o: 0.8, t: 0.1 },
  { d: 'M424 164 C 354 190 304 186 234 224', w: 9, c: 'var(--matcha)', o: 0.5, t: 0.25 },
  { d: 'M262 868 C 312 848 362 854 422 818', w: 14, c: 'var(--matcha)', o: 0.6, t: 0.4 },
]
const DOTS_SM = [
  { x: 70, y: 150, r: 5, c: 'var(--matcha)' }, { x: 88, y: 138, r: 3, c: 'var(--matcha)' },
  { x: 322, y: 252, r: 4, c: 'var(--matcha)' }, { x: 332, y: 700, r: 5, c: 'var(--ink)' },
]

function useNarrow() {
  const q = '(max-width: 700px)'
  const [narrow, setNarrow] = useState(() => matchMedia(q).matches)
  useEffect(() => {
    const m = matchMedia(q)
    const on = () => setNarrow(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return narrow
}

function BrushBg({ y }: { y: MotionValue<number> }) {
  const narrow = useNarrow()
  const strokes = narrow ? STROKES_SM : STROKES
  const dots = narrow ? DOTS_SM : DOTS
  return (
    <motion.svg key={narrow ? 'sm' : 'lg'} className="hero-brush" viewBox={narrow ? '0 0 400 900' : '0 0 1440 900'} preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ y }}>
      <defs>
        <filter id="brush-rough" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale={narrow ? 8 : 16} />
        </filter>
      </defs>
      <g filter="url(#brush-rough)">
        {strokes.map((st, i) => (
          <motion.path
            key={i}
            d={st.d}
            fill="none"
            stroke={st.c}
            strokeWidth={st.w}
            strokeLinecap="round"
            opacity={st.o}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1], delay: D + 0.2 + st.t }}
          />
        ))}
        {dots.map((dt, i) => (
          <motion.circle
            key={i}
            cx={dt.x}
            cy={dt.y}
            r={dt.r}
            fill={dt.c}
            opacity={0.6}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 12, delay: D + 0.9 + i * 0.05 }}
          />
        ))}
      </g>
    </motion.svg>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const spread = useTransform(scrollYProgress, [0, 1], [0, 160])
  const spreadNeg = useTransform(spread, (v) => -v)
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.86])
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const brushY = useTransform(scrollYProgress, [0, 1], [0, 200])

  return (
    <section className="hero" ref={ref} id="top">
      <BrushBg y={brushY} />
      <motion.div className="hero-copy" style={{ scale: titleScale, y: titleY }}>
        <motion.img
          className="hero-logo"
          src="/img/logo-mark.webp"
          alt=""
          initial={{ scale: 0, rotate: -200, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ delay: D + 0.15, type: 'spring', stiffness: 120, damping: 12 }}
          whileHover={{ rotate: [0, -12, 10, -6, 0], transition: { duration: 0.6 } }}
        />
        <motion.span className="eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: D + 0.2, duration: 0.8, ease }}>
          Pisz · na wynos · od 2021
        </motion.span>
        <h1 className="hero-title">
          <SplitText text="Sushi" className="display l1" delay={D + 0.25} />
          <SplitText text="dla Ciebie" className="display l2" delay={D + 0.55} />
        </h1>
        <motion.p className="hero-sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: D + 1.1, duration: 0.8, ease }}>
          Przeżyj z nami swoją azjatycką przygodę. Każdy zestaw robimy od podstaw — świeży, ręcznie zwijany, gotowy do odbioru lub dostawy.
        </motion.p>
        <motion.div className="hero-ctas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: D + 1.25, duration: 0.8, ease }}>
          <a href={CONTACT.phoneHref} className="btn btn-primary btn-lg">
            <Phone /> Zadzwoń i zamów <Caret />
          </a>
          <a href="#menu" className="btn btn-ghost btn-lg">
            Zobacz menu
          </a>
        </motion.div>
      </motion.div>

      <motion.div className="mascot mascot-left" style={{ x: spreadNeg }} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: D + 0.9, type: 'spring', stiffness: 70, damping: 14 }}>
        <motion.div animate={reduce ? undefined : { y: [0, -10, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}>
          <Panda />
        </motion.div>
      </motion.div>
      <motion.div className="mascot mascot-right" style={{ x: spread }} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: D + 1.1, type: 'spring', stiffness: 70, damping: 14 }}>
        <motion.div animate={reduce ? undefined : { y: [0, -10, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: D + 0.6 }}>
          <RedPanda />
        </motion.div>
      </motion.div>
    </section>
  )
}

/** Krótkie intro jak na początku filmików: logo wskakuje na kremowym tle i odjeżdża w górę. */
export function Intro() {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(() => D > 0)
  useEffect(() => {
    if (!show) return
    try {
      sessionStorage.setItem('intro-seen', '1')
    } catch {
      /* brak dostępu do storage — intro pokaże się ponownie */
    }
    const t = setTimeout(() => setShow(false), reduce ? 0 : 1300)
    return () => clearTimeout(t)
  }, [show, reduce])
  return (
    <AnimatePresence>
      {show && !reduce && (
        <motion.div className="intro" aria-hidden="true" exit={{ y: '-100%' }} transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}>
          <motion.img
            src="/img/logo.webp"
            alt=""
            initial={{ scale: 0.3, rotate: -120, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 140, damping: 14 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Marquee() {
  const rows = [
    { cls: 'red', dir: -1, words: ['Zawsze świeże', 'Tylko na wynos', 'Wege też', 'Zwijane ręcznie', 'Zamówienia telefoniczne'] },
    { cls: 'black', dir: 1, words: ['Futomaki', 'California', 'Uramaki premium', 'Tamago', 'Nigiri', 'Gyoza'] },
  ]
  return (
    <div className="marquee-zone" aria-hidden="true">
      {rows.map((r) => (
        <div key={r.cls} className={`marquee ${r.cls}`}>
          <motion.div
            className="marquee-track"
            animate={{ x: r.dir < 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
            transition={{ duration: r.cls === 'red' ? 26 : 32, repeat: Infinity, ease: 'linear' }}
          >
            {[...r.words, ...r.words].map((w, i) => (
              <span key={i}>{w}</span>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  )
}
