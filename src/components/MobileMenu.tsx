import { AnimatePresence, motion, type Variants } from 'motion/react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { CONTACT } from '../data/menu'
import { useOpenStatus } from '../lib/hours'
import { btn, cx } from '../lib/styles'
import { Panda } from './Mascots'
import { Phone, Status } from './ui'

const ease = [0.16, 1, 0.3, 1] as const
const spring = { type: 'spring', stiffness: 260, damping: 20 } as const

/** Jedna pałeczka: grubsza u góry, cieńsza przy czubku, z czerwonym paskiem jak na logo. */
function Stick({ x, rotate }: { x: number; rotate: number }) {
  return (
    <motion.g initial={false} animate={{ x, rotate }} transition={spring}>
      <path d="M14.6 3h2.8l-.65 26h-1.5z" fill="currentColor" />
      <rect x="14.65" y="6" width="2.7" height="2.2" fill="var(--color-red)" />
    </motion.g>
  )
}

/** Przycisk menu: dwie równoległe pałeczki, które po otwarciu krzyżują się w „X”. */
export function MenuToggle({ open, onClick, className }: { open: boolean; onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
      className={cx('-mr-2 grid size-11 place-items-center rounded-full text-ink', className)}
    >
      <svg viewBox="0 0 32 32" className="size-8 overflow-visible" aria-hidden="true">
        <Stick x={open ? 0 : -3.5} rotate={open ? 45 : 28} />
        <Stick x={open ? 0 : 3.5} rotate={open ? -45 : 28} />
      </svg>
    </button>
  )
}

const list: Variants = {
  hidden: { transition: { staggerChildren: 0.035, staggerDirection: -1 } },
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.22 } },
}
const item: Variants = {
  hidden: { y: '110%', rotate: 4, transition: { duration: 0.3, ease: [0.7, 0, 0.84, 0] } },
  show: { y: 0, rotate: 0, transition: { duration: 0.7, ease } },
}

type Props = {
  open: boolean
  onClose: () => void
  links: string[][]
  /** środek koła, z którego rozwija się panel — pozycja przycisku na ekranie */
  origin: string
}

/** Pełnoekranowe menu na telefon: panel rozwija się kołem od przycisku, linki wjeżdżają po kolei. */
export function MobileMenu({ open, onClose, links, origin }: Props) {
  const { open: isOpen, label } = useOpenStatus()
  const firstLink = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) return
    const html = document.documentElement
    html.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    // menu jest tylko na wąskim ekranie — po obróceniu / poszerzeniu okna zamykamy je
    const wide = matchMedia('(min-width: 900px)')
    const onWide = () => wide.matches && onClose()
    window.addEventListener('keydown', onKey)
    wide.addEventListener('change', onWide)
    const focus = setTimeout(() => firstLink.current?.focus({ preventScroll: true }), 350)
    return () => {
      html.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      wide.removeEventListener('change', onWide)
      clearTimeout(focus)
    }
  }, [open, onClose])

  const circle = (r: number) => `circle(${r}vmax at ${origin})`

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-65 flex flex-col overflow-x-hidden overflow-y-auto bg-paper px-(--gutter) pt-[calc(var(--nav-h)+28px)] pb-8 md:hidden"
          initial={{ clipPath: circle(0) }}
          animate={{ clipPath: circle(150), transition: { duration: 0.75, ease: [0.7, 0, 0.2, 1] } }}
          exit={{ clipPath: circle(0), transition: { duration: 0.55, ease: [0.7, 0, 0.2, 1], delay: 0.18 } }}
        >
          <motion.nav aria-label="Główna nawigacja" variants={list} initial="hidden" animate="show" exit="hidden">
            <ul className="grid gap-1">
              {links.map(([href, text], i) => (
                <li key={href} className="overflow-hidden">
                  <motion.a
                    ref={i ? undefined : firstLink}
                    href={href}
                    onClick={onClose}
                    variants={item}
                    className="flex origin-bottom-left items-baseline gap-3 py-1 font-display text-[clamp(44px,13vw,76px)] leading-none tracking-[.02em] text-ink uppercase transition-colors hover:text-red focus-visible:text-red"
                  >
                    <span className="font-ui text-xs font-bold tracking-[.1em] text-red">{String(i + 1).padStart(2, '0')}</span>
                    {text}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div
            className="mt-auto grid justify-items-start gap-4 pt-10 pr-28"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.55 } }}
            exit={{ opacity: 0, y: 12, transition: { duration: 0.2 } }}
          >
            <Status open={isOpen} label={label} />
            <a href={CONTACT.phoneHref} className={btn('primary', 'lg')}>
              <Phone /> {CONTACT.phone}
            </a>
            <div className="flex gap-5 text-xs tracking-[.06em] text-ink-soft uppercase">
              <a href={CONTACT.facebook} target="_blank" rel="noreferrer" className="hover:text-red">
                Facebook
              </a>
              <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="hover:text-red">
                Instagram
              </a>
            </div>
          </motion.div>

          {/* panda wygląda zza dolnej krawędzi ekranu */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed right-3 -bottom-10 w-[110px]"
            initial={{ y: '100%', rotate: 8 }}
            animate={{ y: 0, rotate: -4, transition: { type: 'spring', stiffness: 120, damping: 13, delay: 0.5 } }}
            exit={{ y: '100%', transition: { duration: 0.25, ease: [0.7, 0, 0.84, 0] } }}
          >
            <Panda sizes="110px" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
