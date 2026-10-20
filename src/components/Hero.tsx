import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { CONTACT } from '../data/menu'
import { Panda, RedPanda } from './Mascots'
import { btn, ctas, cx, eyebrow, wrap } from '../lib/styles'
import { Caret, Phone, SplitText, Status } from './ui'
import { useOpenStatus } from '../lib/hours'

const ease = [0.16, 1, 0.3, 1] as const

// intro jest w index.html; skrypt w <head> dodaje .no-intro, gdy ma się nie pokazać
// animacje hero startują dopiero, gdy intro zjedzie z ekranu
const D = document.documentElement.classList.contains('no-intro') ? 0 : 1.5

const NAV_LINKS = [
  ['#menu', 'Menu'],
  ['#sushigo', 'SushiGO'],
  ['#zestawy', 'Zestawy'],
  ['#wideo', 'Wideo'],
  ['#o-nas', 'O nas'],
  ['#kontakt', 'Kontakt'],
]

export function Nav() {
  const { open, label } = useOpenStatus()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 12))
  return (
    // na górze strony przezroczysty i nałożony na hero; po przewinięciu półprzezroczysty, rozmyty, z cieniem
    <header
      className={cx(
        'sticky top-0 z-50 -mb-(--nav-h) text-ink transition-[background-color,box-shadow,backdrop-filter] duration-350',
        scrolled && 'bg-paper-light/72 shadow-[0_1px_0_rgb(31_27_24/0.08),0_10px_30px_-12px_rgb(111_53_23/0.35)] backdrop-blur-[16px] backdrop-saturate-[1.3]',
      )}
    >
      <div className={cx(wrap, 'flex h-(--nav-h) items-center justify-between gap-5')}>
        <a href="#top" className="inline-flex items-center gap-2.5 font-brand text-[22px] leading-none tracking-[.02em] text-red uppercase" aria-label="Sushi dla Ciebie — początek strony">
          <img src="/img/logo-mark-96.webp" alt="" width="40" height="40" className="size-10 object-contain" />
          <span className="max-sm:hidden">Sushi dla Ciebie</span>
        </a>
        <nav className="flex gap-[26px] text-sm font-medium uppercase max-lg:gap-[18px] max-md:hidden" aria-label="Główna nawigacja">
          {NAV_LINKS.map(([href, text]) => (
            <a
              key={href}
              href={href}
              className="relative py-1.5 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-right after:scale-x-0 after:bg-red after:transition-transform after:duration-350 after:ease-out-expo hover:after:origin-left hover:after:scale-x-100"
            >
              {text}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Status open={open} label={label} className="max-lg:hidden" />
        </div>
      </div>
    </header>
  )
}

// tło hero: pociągnięcia pędzla czarnym i zielonym tuszem, jak na grafikach z pandami
const STROKES = [
  { d: 'M-40 770 C 120 700 270 712 430 618', w: 74, c: 'var(--color-ink)', o: 0.88, t: 0 },
  { d: 'M-40 832 C 150 790 310 800 480 700', w: 18, c: 'var(--color-ink)', o: 0.45, t: 0.15 },
  { d: 'M70 128 C 200 98 300 116 430 74', w: 9, c: 'var(--color-ink)', o: 0.3, t: 0.35 },
  { d: 'M1490 150 C 1330 210 1230 192 1060 272', w: 64, c: 'var(--color-matcha)', o: 0.8, t: 0.1 },
  { d: 'M1490 222 C 1350 270 1270 262 1120 330', w: 16, c: 'var(--color-matcha)', o: 0.5, t: 0.25 },
  { d: 'M1140 838 C 1250 806 1330 812 1470 748', w: 26, c: 'var(--color-matcha)', o: 0.6, t: 0.4 },
]
const DOTS = [
  { x: 250, y: 210, r: 9, c: 'var(--color-matcha)' }, { x: 282, y: 188, r: 5, c: 'var(--color-matcha)' }, { x: 222, y: 240, r: 4, c: 'var(--color-matcha)' },
  { x: 1180, y: 380, r: 7, c: 'var(--color-matcha)' }, { x: 1210, y: 404, r: 4, c: 'var(--color-matcha)' },
  { x: 1290, y: 700, r: 8, c: 'var(--color-ink)' }, { x: 1320, y: 676, r: 4, c: 'var(--color-ink)' }, { x: 470, y: 720, r: 6, c: 'var(--color-ink)' },
]

// węższa kompozycja na telefon, żeby pociągnięcia nie wypadały poza ekran
const STROKES_SM = [
  { d: 'M-20 770 C 60 728 140 738 232 686', w: 40, c: 'var(--color-ink)', o: 0.85, t: 0 },
  { d: 'M-20 812 C 80 790 160 794 252 740', w: 10, c: 'var(--color-ink)', o: 0.45, t: 0.15 },
  { d: 'M24 64 C 84 52 134 60 194 44', w: 5, c: 'var(--color-ink)', o: 0.3, t: 0.35 },
  { d: 'M424 122 C 344 152 294 142 204 192', w: 34, c: 'var(--color-matcha)', o: 0.8, t: 0.1 },
  { d: 'M424 164 C 354 190 304 186 234 224', w: 9, c: 'var(--color-matcha)', o: 0.5, t: 0.25 },
  { d: 'M262 868 C 312 848 362 854 422 818', w: 14, c: 'var(--color-matcha)', o: 0.6, t: 0.4 },
]
const DOTS_SM = [
  { x: 70, y: 150, r: 5, c: 'var(--color-matcha)' }, { x: 88, y: 138, r: 3, c: 'var(--color-matcha)' },
  { x: 322, y: 252, r: 4, c: 'var(--color-matcha)' }, { x: 332, y: 700, r: 5, c: 'var(--color-ink)' },
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
    <motion.svg key={narrow ? 'sm' : 'lg'} className="pointer-events-none absolute inset-0 z-0 size-full" viewBox={narrow ? '0 0 400 900' : '0 0 1440 900'} preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ y }}>
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
    <section
      className="relative grid min-h-svh place-items-center overflow-hidden px-(--gutter) pt-[calc(64px+var(--nav-h))] pb-[clamp(180px,26vw,300px)] text-center max-sm:min-h-auto max-sm:pb-[250px] lg:pb-16"
      ref={ref}
      id="top"
    >
      <BrushBg y={brushY} />
      <motion.div className="relative z-2 grid justify-items-center gap-[26px]" style={{ scale: titleScale, y: titleY }}>
        <motion.img
          className="-mb-1.5 h-auto w-[clamp(84px,9vw,120px)] cursor-pointer"
          src="/img/logo-mark-240.webp"
          srcSet="/img/logo-mark-96.webp 96w, /img/logo-mark-240.webp 240w"
          sizes="clamp(84px, 9vw, 120px)"
          alt=""
          width={240}
          height={226}
          initial={{ scale: 0, rotate: -200, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ delay: D + 0.15, type: 'spring', stiffness: 120, damping: 12 }}
          whileHover={{ rotate: [0, -12, 10, -6, 0], transition: { duration: 0.6 } }}
        />
        <motion.span className={eyebrow} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: D + 0.2, duration: 0.8, ease }}>
          Pisz · na wynos · od 2021
        </motion.span>
        <h1 className="grid justify-items-center gap-[.08em] font-brand leading-[.8] whitespace-nowrap uppercase">
          <SplitText text="Sushi" className="text-[clamp(96px,34vw,270px)] tracking-[.02em] text-red" delay={D + 0.25} />
          <SplitText text="dla Ciebie" className="text-[clamp(36px,11vw,112px)] tracking-[.02em] text-ink" delay={D + 0.55} />
        </h1>
        <motion.p className="max-w-[480px] text-ink-soft" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: D + 1.1, duration: 0.8, ease }}>
          Przeżyj z nami swoją azjatycką przygodę. Każdy zestaw robimy od podstaw — świeży, ręcznie zwijany, gotowy do odbioru lub dostawy.
        </motion.p>
        <motion.div className={ctas} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: D + 1.25, duration: 0.8, ease }}>
          <a href={CONTACT.phoneHref} className={btn('primary', 'lg')}>
            <Phone /> Zadzwoń i zamów <Caret />
          </a>
          <a href="#menu" className={btn('ghost', 'lg')}>
            Zobacz menu
          </a>
        </motion.div>
      </motion.div>

      <motion.div className="absolute bottom-0 left-[max(0px,calc(50%_-_var(--page-max)/2))] z-1 w-[clamp(150px,24vw,320px)] max-sm:left-1 max-sm:w-[150px] lg:w-[min(19vw,300px)]" style={{ x: spreadNeg }} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: D + 0.9, type: 'spring', stiffness: 70, damping: 14 }}>
        <motion.div animate={reduce ? undefined : { y: [0, -10, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}>
          <Panda />
        </motion.div>
      </motion.div>
      <motion.div className="absolute right-[max(0px,calc(50%_-_var(--page-max)/2))] bottom-0 z-1 w-[clamp(140px,22vw,290px)] max-sm:right-1 max-sm:w-[132px] lg:w-[min(17vw,270px)]" style={{ x: spread }} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: D + 1.1, type: 'spring', stiffness: 70, damping: 14 }}>
        <motion.div animate={reduce ? undefined : { y: [0, -10, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: D + 0.6 }}>
          <RedPanda />
        </motion.div>
      </motion.div>
    </section>
  )
}

/** Krótkie intro jak na początku filmików: logo wskakuje na kremowym tle i odjeżdża w górę.
 *  Samo intro jest statycznym HTML-em w index.html (szybki LCP); tu tylko je chowamy po starcie aplikacji. */
export function Intro() {
  useEffect(() => {
    const el = document.getElementById('intro')
    if (!el) return
    if (!D) {
      el.remove()
      return
    }
    try {
      sessionStorage.setItem('intro-seen', '1')
    } catch {
      /* brak dostępu do storage — intro pokaże się ponownie */
    }
    const out = setTimeout(() => el.classList.add('out'), 1300)
    const gone = setTimeout(() => el.remove(), 2100)
    return () => {
      clearTimeout(out)
      clearTimeout(gone)
    }
  }, [])
  return null
}

export function Marquee() {
  const rows = [
    { cls: 'red', dir: -1, look: '-mx-5 -rotate-2 bg-red text-white', words: ['Zawsze świeże', 'Tylko na wynos', 'Zwijane ręcznie', 'Zamówienia telefoniczne'] },
    { cls: 'black', dir: 1, look: '-mx-5 -mt-2.5 rotate-[1.5deg] bg-ink text-paper', words: ['Futomaki', 'California', 'Uramaki premium', 'Tamago', 'Nigiri', 'Gyoza'] },
  ]
  return (
    <div className="overflow-hidden pt-2 pb-10" aria-hidden="true">
      {rows.map((r) => (
        <div key={r.cls} className={cx('overflow-hidden py-3.5 font-display text-[clamp(30px,5vw,64px)] leading-none tracking-[.04em] whitespace-nowrap uppercase', r.look)}>
          <motion.div
            className="flex w-max"
            animate={{ x: r.dir < 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
            transition={{ duration: r.cls === 'red' ? 26 : 32, repeat: Infinity, ease: 'linear' }}
          >
            {[...r.words, ...r.words].map((w, i) => (
              <span key={i} className="inline-flex items-center gap-10 pr-10 after:text-[.5em] after:content-['✕']">
                {w}
              </span>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  )
}
