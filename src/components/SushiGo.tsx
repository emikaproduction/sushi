import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import { CONTACT } from '../data/menu'
import { Caret, Phone } from './ui'

// Nowy produkt z fanpage'a: SushiGO — sushi w tubie „na drogę” (reel z 2026 r.).
const REEL = '1394267902599868'
const ease = [0.16, 1, 0.3, 1] as const

function Stamp() {
  return (
    <motion.svg
      className="sg-stamp"
      viewBox="0 0 120 120"
      aria-hidden="true"
      animate={{ rotate: 360 }}
      transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
    >
      <defs>
        <path id="sg-circle" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
      </defs>
      <circle cx="60" cy="60" r="58" fill="var(--red)" />
      <text fontSize="13" fontWeight="700" letterSpacing="3.2" fill="var(--white)">
        <textPath href="#sg-circle">NOWOŚĆ · SUSHIGO · NOWOŚĆ · SUSHIGO ·</textPath>
      </text>
      <text x="60" y="68" textAnchor="middle" fontSize="24" fill="var(--white)" style={{ fontFamily: 'var(--font-display)' }}>
        GO!
      </text>
    </motion.svg>
  )
}

export function SushiGo() {
  const ref = useRef<HTMLElement>(null)
  const [play, setPlay] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const src = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(`https://www.facebook.com/reel/${REEL}/`)}&show_text=false&width=360&height=640&autoplay=true`

  return (
    <section className="sushigo" id="sushigo" ref={ref} aria-labelledby="sg-title">
      <div className="wrap sg-grid">
        <div className="sg-copy">
          <motion.span className="eyebrow" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            Nowość od pand
          </motion.span>
          <h2 className="sg-title" id="sg-title" aria-label="SushiGO">
            <motion.span initial={{ x: -80, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }}>
              Sushi
            </motion.span>
            <motion.span
              className="go"
              initial={{ x: 120, opacity: 0, rotate: 8 }}
              whileInView={{ x: 0, opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 140, damping: 12, delay: 0.25 }}
            >
              GO
            </motion.span>
          </h2>
          <motion.p className="sg-tagline" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease, delay: 0.4 }}>
            Zabierz nas ze sobą
          </motion.p>
          <motion.div className="sg-text" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease, delay: 0.5 }}>
            <p>Sushi zapakowane w poręczną tubę — z pałeczkami i sosem sojowym pod ręką. Do auta, na plażę, w drogę.</p>
            <p className="sg-note">O dostępność, skład i cenę SushiGO zapytaj przy zamówieniu telefonicznym.</p>
          </motion.div>
          <motion.div className="hero-ctas sg-ctas" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease, delay: 0.6 }}>
            <a href={CONTACT.phoneHref} className="btn btn-primary btn-lg">
              <Phone /> Zapytaj o SushiGO <Caret />
            </a>
            <button className="btn btn-ghost btn-lg" onClick={() => setPlay(true)}>
              Zobacz film
            </button>
          </motion.div>
        </div>

        <motion.div
          className="sg-visual"
          initial={{ opacity: 0, rotate: 4, scale: 0.92 }}
          whileInView={{ opacity: 1, rotate: -2, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease }}
        >
          <motion.div className={`sg-card ${play ? 'is-playing' : ''}`} style={{ y: imgY }}>
            <AnimatePresence mode="wait">
              {play ? (
                <motion.iframe
                  key="v"
                  src={src}
                  title="Film SushiGO z fanpage'a Sushi dla Ciebie"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              ) : (
                <motion.img
                  key="i"
                  src="/img/sushigo.webp"
                  alt="Panda i pandka ruda z tubami SushiGO"
                  width={532}
                  height={560}
                  loading="lazy"
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>
          </motion.div>
          <Stamp />
        </motion.div>
      </div>
    </section>
  )
}
