import { motion, type Variants } from 'motion/react'

const ease = [0.16, 1, 0.3, 1] as const

const charV: Variants = {
  hidden: { y: '105%', rotate: 8, opacity: 0 },
  show: (i: number) => ({ y: 0, rotate: 0, opacity: 1, transition: { duration: 0.9, ease, delay: i * 0.045 } }),
}

/** Tekst rozbity na litery, które wskakują po kolei. */
export function SplitText({ text, className, delay = 0, inView = false }: { text: string; className?: string; delay?: number; inView?: boolean }) {
  const trigger = inView ? { whileInView: 'show', viewport: { once: true, amount: 0.4 } } : { animate: 'show' }
  return (
    <motion.span className={className} aria-label={text} initial="hidden" {...trigger} transition={{ delayChildren: delay }}>
      {[...text].map((c, i) =>
        c === ' ' ? (
          <span key={i} aria-hidden="true"> </span>
        ) : (
          <motion.span key={i} className="char" aria-hidden="true" variants={charV} custom={i + delay * 20}>
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

export function SectionHead({ eyebrow, title, id }: { eyebrow: string; title: string; id?: string }) {
  return (
    <div className="section-head">
      <Reveal as="span" className="eyebrow">{eyebrow}</Reveal>
      <h2 className="heading-lg" id={id}>
        <SplitText text={title} inView />
      </h2>
    </div>
  )
}

export const Caret = () => (
  <svg className="caret" viewBox="0 0 12 12" aria-hidden="true">
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
