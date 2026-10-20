import { motion, type MotionValue } from 'motion/react'
import { IMG } from '../lib/assets'

// Postacie klienta (panda i pandka ruda w strojach kucharzy) — pliki od klienta, przycięte do WebP.
type Props = {
  className?: string
  /** obrót w stopniach — np. sprężyna podpięta pod kursor */
  tilt?: MotionValue<number>
  /** szerokość na ekranie — przeglądarka dobiera z niej mniejszy lub pełny plik */
  sizes?: string
}

const SIZES = '(max-width: 600px) 150px, 300px'

export function Panda({ className, tilt, sizes = SIZES }: Props) {
  return (
    <motion.img
      className={`block h-auto w-full select-none ${className ?? ''}`}
      src={`${IMG}panda.webp`}
      srcSet={`${IMG}panda-320.webp 320w, ${IMG}panda.webp 638w`}
      sizes={sizes}
      alt="Panda — maskotka Sushi dla Ciebie"
      width={638}
      height={966}
      draggable={false}
      style={{ rotate: tilt, originY: 1 }}
    />
  )
}

export function RedPanda({ className, tilt, sizes = SIZES }: Props) {
  return (
    <motion.img
      className={`block h-auto w-full select-none ${className ?? ''}`}
      src={`${IMG}pandka.webp`}
      srcSet={`${IMG}pandka-300.webp 300w, ${IMG}pandka.webp 574w`}
      sizes={sizes}
      alt="Pandka ruda — maskotka Sushi dla Ciebie"
      width={574}
      height={1000}
      draggable={false}
      style={{ rotate: tilt, originY: 1 }}
    />
  )
}
