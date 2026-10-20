import { motion, type Variants } from 'motion/react'
import { cx, eyebrow } from '../lib/styles'

const ease = [0.16, 1, 0.3, 1] as const

const TAG = {
  pcs: 'bg-ink text-paper-light',
  veg: 'bg-rust-strong text-white',
  raw: 'bg-transparent text-red-deep shadow-[inset_0_0_0_1.5px_var(--color-red-deep)]',
  hot: 'bg-red text-white',
}

export function Tag({ kind, className, children }: { kind: keyof typeof TAG; className?: string; children: React.ReactNode }) {
  return <span className={cx('inline-block rounded-btn px-[9px] py-1 text-[11px] font-bold uppercase tracking-[.08em]', TAG[kind], className)}>{children}</span>
}

/** Kropka + napis „Otwarte / Zamknięte”; gdy otwarte, kropka pulsuje. */
export function Status({ open, label, className }: { open: boolean; label: string; className?: string }) {
  return (
    <span className={cx('inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[.06em]', open ? 'text-ink' : 'text-ink-soft', className)}>
      <span
        aria-hidden="true"
        className={cx('size-2 rounded-full', open ? 'animate-pulse-dot bg-red motion-reduce:animate-none' : 'shadow-[inset_0_0_0_1.5px_currentColor]')}
      />
      {label}
    </span>
  )
}

const charV: Variants = {
  hidden: { y: '105%', rotate: 8, opacity: 0 },
  show: (i: number) => ({ y: 0, rotate: 0, opacity: 1, transition: { duration: 0.9, ease, delay: i * 0.045 } }),
}

/** Tekst rozbity na litery, które wskakują po kolei. */
export function SplitText({ text, className, delay = 0, inView = false }: { text: string; className?: string; delay?: number; inView?: boolean }) {
  const trigger = inView ? { whileInView: 'show', viewport: { once: true, amount: 0.4 } } : { animate: 'show' }
  return (
    <motion.span className={className} initial="hidden" {...trigger} transition={{ delayChildren: delay }}>
      <span className="sr-only">{text}</span>
      {[...text].map((c, i) =>
        c === ' ' ? (
          <span key={i} aria-hidden="true"> </span>
        ) : (
          <motion.span key={i} className="inline-block will-change-transform" aria-hidden="true" variants={charV} custom={i + delay * 20}>
            {c}
          </motion.span>
        ),
      )}
    </motion.span>
  )
}

export function Reveal({ children, delay = 0, className, as = 'div' }: { children: React.ReactNode; delay?: number; className?: string; as?: 'div' | 'span' | 'p' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </M>
  )
}

export function SectionHead({ eyebrow: label, title, id }: { eyebrow: string; title: string; id?: string }) {
  return (
    <div className="mb-12 grid justify-items-center gap-5 text-center">
      <Reveal as="span" className={eyebrow}>
        {label}
      </Reveal>
      <h2 className="font-display text-[clamp(56px,9vw,126px)] leading-[.82] tracking-[.03em] text-red uppercase" id={id}>
        <SplitText text={title} inView />
      </h2>
    </div>
  )
}

export const Caret = () => (
  <svg className="transition-transform duration-250 ease-out-expo group-hover/btn:translate-x-[3px]" viewBox="0 0 12 12" aria-hidden="true">
    <path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
export const Pin = () => (
  <svg viewBox="0 0 12 12" aria-hidden="true">
    <path d="M6 11s4-3.6 4-6.4A4 4 0 0 0 2 4.6C2 7.4 6 11 6 11z" fill="none" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="6" cy="4.7" r="1.4" fill="currentColor" />
  </svg>
)
export const Phone = () => (
  <svg viewBox="0 0 12 12" aria-hidden="true">
    <path d="M3.2 1.2l1.6 2.4-1 1.2a6.5 6.5 0 0 0 3.4 3.4l1.2-1 2.4 1.6-.8 1.8C6 10.6 1.4 6 1.4 2z" fill="currentColor" />
  </svg>
)
