import { animate, motion, useInView, useMotionValue, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { CONTACT, HOURS } from '../data/menu'
import { Panda, RedPanda } from './Mascots'
import { btn, center, cx, pieces, wrap } from '../lib/styles'
import { Caret, Phone, Pin, Reveal, SectionHead, SplitText, Status } from './ui'
import { hoursText, useOpenStatus } from '../lib/hours'
import { IMG } from '../lib/assets'

const YEAR = new Date().getFullYear()

function Counter({ to, suffix = '', group = true }: { to: number; suffix?: string; group?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const v = useMotionValue(0)
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(v, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (x) => setN(Math.round(x)) })
    return () => c.stop()
  }, [inView, to, v])
  return (
    <span ref={ref}>
      {group ? n.toLocaleString('pl-PL') : n}
      {suffix}
    </span>
  )
}

const stat = 'grid gap-2 border-t-2 border-ink pt-5'
const statLabel = 'text-sm font-medium tracking-[.06em] text-ink-soft uppercase'

export function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const words =
    'Działamy od 2021 roku, spełniając marzenie o tym, by mieszkańcy Pisza i okolic mogli jeść sushi najwyższej jakości. Klasyczne rolki, autorskie pozycje wegańskie i alternatywy dla tych, którzy nie lubią surowej ryby.'.split(' ')
  return (
    <section className="py-section" ref={ref} aria-labelledby="about-title">
      <div className={wrap}>
        <p className="mx-auto max-w-[1100px] text-center font-display text-[clamp(32px,5.4vw,72px)] leading-[.98] tracking-[.02em] uppercase">
          {words.map((w, i) => (
            <Word key={i} w={w} i={i} total={words.length} progress={scrollYProgress} />
          ))}
        </p>
        <div className="mt-20 grid grid-cols-3 gap-4 max-sm:mt-14 max-sm:grid-cols-1">
          <Reveal className={stat}>
            <b className="font-display text-[clamp(56px,7vw,103px)] leading-[.85] font-normal tracking-[.03em] text-red">
              <Counter to={2021} group={false} />
            </b>
            <span className={statLabel}>od tego roku zwijamy w Piszu</span>
          </Reveal>
          <Reveal className={stat} delay={0.1}>
            <b className="font-display text-[clamp(56px,7vw,103px)] leading-[.85] font-normal tracking-[.03em] text-red">
              <Counter to={100} suffix="%" />
            </b>
            <span className={statLabel}>poleca nas na Facebooku (37 opinii)</span>
          </Reveal>
          <Reveal className={stat} delay={0.2}>
            <b className="font-display text-[clamp(56px,7vw,103px)] leading-[.85] font-normal tracking-[.03em] text-red">
              <Counter to={2700} suffix="+" />
            </b>
            <span className={statLabel}>osób obserwuje fanpage</span>
          </Reveal>
        </div>
        <Reveal className={center}>
          <a href={`${CONTACT.facebook}reviews/`} className={btn('ghost', 'lg')} target="_blank" rel="noreferrer">
            Przeczytaj opinie <Caret />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

function Word({ w, i, total, progress }: { w: string; i: number; total: number; progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const start = 0.18 + (i / total) * 0.4
  const color = useTransform(progress, [start, start + 0.04], ['rgba(226, 26, 9, 0)', 'rgba(226, 26, 9, 1)'])
  return (
    <>
      <motion.span className="[-webkit-text-stroke:1.5px_var(--color-red)]" style={{ color }}>
        {w}
      </motion.span>{' '}
    </>
  )
}

const contactCard = 'grid content-start gap-3.5 rounded-card border-2 border-ink bg-paper-light p-[clamp(20px,3vw,32px)]'

export function Contact() {
  const { open, label, today } = useOpenStatus()
  return (
    <section className="py-section" id="kontakt" aria-labelledby="contact-title">
      <div className={wrap}>
        <SectionHead eyebrow="Zamówienia tylko telefonicznie" title="Zadzwoń" id="contact-title" />
        <motion.a
          href={CONTACT.phoneHref}
          className="mx-auto mb-14 block w-fit font-display text-[clamp(64px,13vw,190px)] leading-[.85] tracking-[.04em] whitespace-nowrap text-ink hover:text-red"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.04, rotate: -1.5 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 160, damping: 14 }}
        >
          {CONTACT.phone}
        </motion.a>
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          <Reveal className={contactCard}>
            <span className={pieces}>Godziny otwarcia</span>
            <Status open={open} label={label} />
            <ul>
              {HOURS.map((h) => (
                <li key={h.day} className={cx('flex justify-between border-b border-paper-deep py-2.5 text-base', h.idx === today ? 'font-bold text-ink' : !h.open && 'text-ink-soft')}>
                  <span className={cx(h.idx === today && "after:text-red-deep after:content-['_·_dziś']")}>{h.day}</span>
                  <span>{hoursText(h.open)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className={contactCard} delay={0.1}>
            <span className={pieces}>Odbiór osobisty</span>
            <h3 className="font-display text-[clamp(40px,5vw,64px)] leading-[.9] tracking-[.03em] text-red uppercase">
              {CONTACT.street}
              <br />
              {CONTACT.city}
            </h3>
            <p className="text-base text-ink-soft">Sushi przygotowujemy wyłącznie na wynos — gotowe do odbioru lub dostawy w Twojej okolicy.</p>
            <div className="flex flex-wrap gap-2">
              <a href={CONTACT.maps} className={btn('ghost')} target="_blank" rel="noreferrer">
                <Pin /> Jak do nas trafić
              </a>
              <a href={CONTACT.phoneHref} className={btn('primary')}>
                <Phone /> Zadzwoń
              </a>
            </div>
            <p className="text-sm text-ink-soft">
              <a href={`mailto:${CONTACT.email}`} className="underline underline-offset-[3px]">{CONTACT.email}</a>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

const TILT = 16

// głębia liter jak w hero: kilka warstw cienia w coraz ciemniejszej czerwieni / czerni
const SHADOW_W1 =
  '0 .01em 0 #c8170a, 0 .02em 0 #b4160b, 0 .03em 0 #a1150c, 0 .04em 0 #8f150e, 0 .05em 0 #7e1410, 0 .06em 0 #6e1311, 0 .08em .04em rgb(31 27 24 / .35), 0 .16em .14em rgb(111 53 23 / .25)'
const SHADOW_W2 = '0 .02em 0 #3b332e, 0 .04em 0 #2b2521, 0 .07em .05em rgb(31 27 24 / .3)'

// postacie stoją na górnej krawędzi liter i „odwracają” pochylenie napisu, żeby stały pionowo
const stand = 'pointer-events-none absolute origin-bottom'
const standShadow =
  'after:absolute after:inset-x-[4%] after:-bottom-[.07em] after:-z-1 after:h-[.16em] after:rounded-full after:bg-[radial-gradient(closest-side,rgb(31_27_24/.42),rgb(31_27_24/.18)_55%,transparent)] after:blur-[.085em]'

/** Stopka: napis jak w hero w 3D, na którym stoją panda, logo i pandka. */
export function Footer() {
  const drop = (delay: number) => ({
    style: { rotateX: -TILT },
    initial: { y: '-60%', opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, amount: 0.4 },
    transition: { type: 'spring' as const, stiffness: 160, damping: 11, delay },
  })

  return (
    <footer className="overflow-hidden border-t-2 border-ink bg-paper-deep pb-24 text-ink">
      <div className="grid justify-items-center px-(--gutter) pt-[clamp(110px,20vw,290px)] pb-10 perspective-[1100px]">
        <motion.div className="grid origin-[50%_70%] justify-items-center transform-3d" style={{ rotateX: TILT }}>
          <div className="relative font-brand text-[clamp(110px,27vw,340px)] leading-[.8] transform-3d">
            <span className="block font-brand tracking-[.02em] whitespace-nowrap text-red uppercase" style={{ textShadow: SHADOW_W1 }}>
              <SplitText text="Sushi" inView />
            </span>
            <motion.div className={cx(stand, 'bottom-[80%] left-0 w-[.56em]', standShadow)} aria-hidden="true" {...drop(0.5)}>
              <Panda />
            </motion.div>
            <motion.div className={cx(stand, 'bottom-[calc(80%+.24em)] left-1/2 -ml-[.2em] w-[.4em]')} aria-hidden="true" {...drop(0.6)}>
              <motion.img
                className="block h-auto w-full"
                src={`${IMG}logo-mark-240.webp`}
                alt=""
                width="240"
                height="226"
                loading="lazy"
                animate={{ y: ['0%', '-6%', '0%'] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
            <motion.div className={cx(stand, 'right-[1%] bottom-[80%] w-[.5em]', standShadow)} aria-hidden="true" {...drop(0.7)}>
              <RedPanda />
            </motion.div>
          </div>
          <span className="mt-[.32em] block font-brand text-[clamp(42px,10.6vw,134px)] leading-[.8] tracking-[.02em] whitespace-nowrap text-ink uppercase" style={{ textShadow: SHADOW_W2 }}>
            <SplitText text="dla Ciebie" inView delay={0.25} />
          </span>
        </motion.div>
      </div>
      <div className={cx(wrap, 'mt-6 flex flex-wrap justify-between gap-4 text-xs tracking-[.06em] text-ink-soft uppercase')}>
        <span>© {YEAR} Sushi dla Ciebie · {CONTACT.street}, {CONTACT.city}</span>
        <nav className="flex flex-wrap gap-5 [&_a:hover]:text-red" aria-label="Media społecznościowe">
          <a href={CONTACT.facebook} target="_blank" rel="noreferrer">Facebook</a>
          <a href={CONTACT.instagram} target="_blank" rel="noreferrer">Instagram</a>
          <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
        </nav>
      </div>
    </footer>
  )
}

/** Pływający przycisk „Zadzwoń” — pojawia się po zjechaniu z hero. */
export function CallFab() {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useEffect(() => scrollY.on('change', (v) => setShow(v > window.innerHeight * 0.8)), [scrollY])
  return (
    <motion.a
      href={CONTACT.phoneHref}
      className="fixed right-5 bottom-5 z-60 inline-flex items-center gap-2.5 rounded-btn bg-red px-5 py-3.5 text-[15px] font-bold tracking-[.03em] text-white uppercase max-sm:inset-x-4 max-sm:bottom-4 max-sm:justify-center [&>svg]:size-4"
      aria-label={`Zadzwoń i zamów: ${CONTACT.phone}`}
      initial={false}
      animate={show ? { y: 0, opacity: 1 } : { y: 120, opacity: 0 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      <motion.span className="pointer-events-none absolute inset-0 rounded-btn border-2 border-red" animate={{ scale: [1, 1.5], opacity: [0.6, 0] }} transition={{ duration: 1.8, repeat: Infinity }} />
      <Phone />
      <span>Zamów: {CONTACT.phone}</span>
    </motion.a>
  )
}
