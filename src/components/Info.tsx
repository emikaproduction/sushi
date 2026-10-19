import { animate, motion, useInView, useMotionValue, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { CONTACT, HOURS } from '../data/menu'
import { Panda, RedPanda } from './Mascots'
import { Caret, Phone, Pin, Reveal, SectionHead, SplitText } from './ui'
import { hoursText, useOpenStatus } from '../lib/hours'

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

export function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const words =
    'Działamy od 2021 roku, spełniając marzenie o tym, by mieszkańcy Pisza i okolic mogli jeść sushi najwyższej jakości. Klasyczne rolki, autorskie pozycje wegańskie i alternatywy dla tych, którzy nie lubią surowej ryby.'.split(' ')
  return (
    <section className="about" id="o-nas" ref={ref} aria-labelledby="about-title">
      <div className="wrap">
        <SectionHead eyebrow="O nas" title="Nie fast food" id="about-title" />
        <p className="manifesto">
          {words.map((w, i) => (
            <Word key={i} w={w} i={i} total={words.length} progress={scrollYProgress} />
          ))}
        </p>
        <div className="stats">
          <Reveal className="stat">
            <b>
              <Counter to={2021} group={false} />
            </b>
            <span>od tego roku zwijamy w Piszu</span>
          </Reveal>
          <Reveal className="stat" delay={0.1}>
            <b>
              <Counter to={100} suffix="%" />
            </b>
            <span>poleca nas na Facebooku (37 opinii)</span>
          </Reveal>
          <Reveal className="stat" delay={0.2}>
            <b>
              <Counter to={2700} suffix="+" />
            </b>
            <span>osób obserwuje fanpage</span>
          </Reveal>
        </div>
        <Reveal className="center">
          <a href={`${CONTACT.facebook}reviews/`} className="btn btn-ghost btn-lg" target="_blank" rel="noreferrer">
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
      <motion.span className="w" style={{ color }}>
        {w}
      </motion.span>{' '}
    </>
  )
}

export function Contact() {
  const { open, label, today } = useOpenStatus()
  return (
    <section className="contact" id="kontakt" aria-labelledby="contact-title">
      <div className="wrap">
        <SectionHead eyebrow="Zamówienia tylko telefonicznie" title="Zadzwoń" id="contact-title" />
        <motion.a
          href={CONTACT.phoneHref}
          className="big-phone"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.04, rotate: -1.5 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 160, damping: 14 }}
        >
          {CONTACT.phone}
        </motion.a>
        <div className="contact-grid">
          <Reveal className="contact-card">
            <span className="pieces">Godziny otwarcia</span>
            <span className={`status ${open ? 'is-open' : ''}`}>{label}</span>
            <ul className="hours">
              {HOURS.map((h) => (
                <li key={h.day} className={`${h.idx === today ? 'today' : ''} ${h.open ? '' : 'closed'}`}>
                  <span>{h.day}</span>
                  <span>{hoursText(h.open)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="contact-card" delay={0.1}>
            <span className="pieces">Odbiór osobisty</span>
            <h3>
              {CONTACT.street}
              <br />
              {CONTACT.city}
            </h3>
            <p>Sushi przygotowujemy wyłącznie na wynos — gotowe do odbioru lub dostawy w Twojej okolicy.</p>
            <div className="row">
              <a href={CONTACT.maps} className="btn btn-ghost" target="_blank" rel="noreferrer">
                <Pin /> Jak do nas trafić
              </a>
              <a href={CONTACT.phoneHref} className="btn btn-primary">
                <Phone /> Zadzwoń
              </a>
            </div>
            <p className="small">
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

const TILT = 16

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
    <footer>
      <div className="foot-stage">
        <motion.div className="foot-word" style={{ rotateX: TILT }}>
          <div className="w1-wrap">
            <span className="w1" aria-label="Sushi">
              <SplitText text="Sushi" inView />
            </span>
            <motion.div className="stand stand-left" aria-hidden="true" {...drop(0.5)}>
              <Panda />
            </motion.div>
            <motion.div className="stand stand-logo" aria-hidden="true" {...drop(0.6)}>
              <motion.img
                src="/img/logo-mark.webp"
                alt=""
                width="466"
                height="439"
                animate={{ y: ['0%', '-6%', '0%'] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
            <motion.div className="stand stand-right" aria-hidden="true" {...drop(0.7)}>
              <RedPanda />
            </motion.div>
          </div>
          <span className="w2">
            <SplitText text="dla Ciebie" inView delay={0.25} />
          </span>
        </motion.div>
      </div>
      <div className="wrap foot-bottom">
        <span>© {YEAR} Sushi dla Ciebie · {CONTACT.street}, {CONTACT.city}</span>
        <nav aria-label="Media społecznościowe">
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
      className="fab"
      aria-label={`Zadzwoń i zamów: ${CONTACT.phone}`}
      initial={false}
      animate={show ? { y: 0, opacity: 1 } : { y: 120, opacity: 0 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      <motion.span className="fab-ring" animate={{ scale: [1, 1.5], opacity: [0.6, 0] }} transition={{ duration: 1.8, repeat: Infinity }} />
      <Phone />
      <span>Zamów: {CONTACT.phone}</span>
    </motion.a>
  )
}
