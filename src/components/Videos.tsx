import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { CONTACT, REELS } from '../data/menu'
import { Caret, SectionHead } from './ui'

// Okładki-zaślepki: wideo z Facebooka ładuje się dopiero po kliknięciu
// (szybsza strona i brak ciasteczek Facebooka, dopóki ktoś nie zechce obejrzeć).
const COVERS = ['set-yellow', 'mango-roll', 'set-orange', 'red-devil', 'set-4', 'dragon-roll']

function Reel({ id, i }: { id: string; i: number }) {
  const [play, setPlay] = useState(false)
  const href = `https://www.facebook.com/reel/${id}/`
  const src = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(href)}&show_text=false&width=320&height=568&autoplay=true`
  return (
    <motion.div
      className="reel"
      initial={{ opacity: 0, y: 60, rotate: i % 2 ? 2 : -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.1 }}
    >
      <AnimatePresence mode="wait">
        {play ? (
          <motion.iframe
            key="v"
            src={src}
            title={`Film z fanpage'a Sushi dla Ciebie #${i + 1}`}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        ) : (
          <motion.button key="c" className="reel-cover" onClick={() => setPlay(true)} exit={{ opacity: 0, scale: 1.05 }} whileHover="hover" aria-label={`Odtwórz film #${i + 1} z Facebooka`}>
            <motion.img src={`/img/${COVERS[i % COVERS.length]}.webp`} alt="" loading="lazy" variants={{ hover: { scale: 1.1, rotate: 4 } }} />
            <motion.span className="play" variants={{ hover: { scale: 1.15 } }}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
            </motion.span>
            <span className="reel-label">Rolka #{String(i + 1).padStart(2, '0')}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function Videos() {
  return (
    <section className="videos" id="wideo" aria-labelledby="video-title">
      <div className="wrap">
        <SectionHead eyebrow="Prosto z fanpage'a" title="Zza lady" id="video-title" />
        <div className="reels">
          {REELS.map((id, i) => (
            <Reel key={id} id={id} i={i} />
          ))}
        </div>
        <div className="center">
          <a href={CONTACT.facebook} className="btn btn-ghost btn-lg" target="_blank" rel="noreferrer">
            Więcej na Facebooku <Caret />
          </a>
        </div>
      </div>
    </section>
  )
}
