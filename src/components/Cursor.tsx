import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

const HOVER = 'a, button, .card, .set-card, .reel, input'

/** Czerwona kropka za kursorem; nad linkami, przyciskami i kartami rośnie w obręcz (jak w sushi-v1). */
export function Cursor() {
  const reduce = useReducedMotion()
  const [fine] = useState(() => matchMedia('(hover: hover) and (pointer: fine)').matches)
  const [big, setBig] = useState(false)
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })

  useEffect(() => {
    if (reduce || !fine) return
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const over = (e: PointerEvent) => setBig(!!(e.target as Element).closest?.(HOVER))
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move)
    document.addEventListener('pointerover', over)
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [reduce, fine, x, y])

  if (reduce || !fine) return null
  return (
    <motion.div className="cursor" aria-hidden="true" style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}>
      <motion.span
        className="cursor-dot"
        animate={big ? { scale: 4, backgroundColor: 'rgba(226, 26, 9, 0)', boxShadow: 'inset 0 0 0 0.45px rgba(226, 26, 9, 1), 0 0 0 0.35px rgba(251, 243, 232, 0.9)' } : { scale: 1, backgroundColor: 'rgba(226, 26, 9, 1)', boxShadow: 'inset 0 0 0 0px rgba(226, 26, 9, 0), 0 0 0 0px rgba(251, 243, 232, 0)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      />
    </motion.div>
  )
}
