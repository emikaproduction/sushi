import { motion, type MotionValue } from 'motion/react'

// Postacie klienta (panda i pandka ruda w strojach kucharzy) — pliki od klienta, przycięte do WebP.
type Props = {
  className?: string
  /** obrót w stopniach — np. sprężyna podpięta pod kursor */
  tilt?: MotionValue<number>
}

export function Panda({ className, tilt }: Props) {
  return (
    <motion.img
      className={`mascot-img ${className ?? ''}`}
      src="/img/panda.webp"
      alt="Panda — maskotka Sushi dla Ciebie"
      width={638}
      height={966}
      draggable={false}
      style={{ rotate: tilt, originY: 1 }}
    />
  )
}

export function RedPanda({ className, tilt }: Props) {
  return (
    <motion.img
      className={`mascot-img ${className ?? ''}`}
      src="/img/pandka.webp"
      alt="Pandka ruda — maskotka Sushi dla Ciebie"
      width={574}
      height={1000}
      draggable={false}
      style={{ rotate: tilt, originY: 1 }}
    />
  )
}
