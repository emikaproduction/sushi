import { Children, useEffect, useRef, useState } from 'react'
import { cx, wrap } from '../lib/styles'
import { Caret } from './ui'

const arrow =
  'grid size-12 place-items-center rounded-full border border-ink text-ink transition-colors duration-200 hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-25 [&_svg]:size-4'


/** Poziomy slider kart: natywne przewijanie ze snapem (dotyk, gładzik), strzałki, kropki i przeciąganie myszą.
 *  Szerokość slajdu wyznacza sama karta. */
export function Slider({ label, children }: { label: string; children: React.ReactNode }) {
  const slides = Children.toArray(children)
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [edges, setEdges] = useState({ start: true, end: false })
  // liczba pozycji — na szerokim ekranie widać kilka kart naraz, więc pozycji jest mniej niż kart
  const [count, setCount] = useState(slides.length)

  // szerokość jednego kroku = karta + odstęp
  const step = () => {
    const el = track.current!
    const [a, b] = el.children as unknown as HTMLElement[]
    return b ? b.offsetLeft - a.offsetLeft : el.clientWidth
  }
  const go = (i: number) => track.current!.scrollTo({ left: Math.max(0, i) * step(), behavior: 'smooth' })

  useEffect(() => {
    const el = track.current!
    const update = () => {
      const max = el.scrollWidth - el.clientWidth
      const n = Math.ceil((max - 4) / step()) + 1
      const end = el.scrollLeft > max - 4
      setCount(n)
      setActive(end ? n - 1 : Math.round(el.scrollLeft / step()))
      setEdges({ start: el.scrollLeft < 4, end })
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    // przeciąganie myszą (dotyk i gładzik przewijają natywnie)
    let drag: { x: number; left: number; moved: boolean } | null = null
    const down = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return
      drag = { x: e.clientX, left: el.scrollLeft, moved: false }
    }
    const move = (e: PointerEvent) => {
      if (!drag) return
      const dx = e.clientX - drag.x
      if (!drag.moved && Math.abs(dx) < 5) return
      if (!drag.moved) {
        drag.moved = true
        el.style.scrollSnapType = 'none'
        el.style.cursor = 'grabbing'
      }
      el.scrollLeft = drag.left - dx
    }
    const up = () => {
      if (!drag) return
      const moved = drag.moved
      drag = null
      el.style.cursor = ''
      if (!moved) return
      el.scrollTo({ left: Math.round(el.scrollLeft / step()) * step(), behavior: 'smooth' })
      // snap wraca dopiero po dojechaniu, inaczej przeskoczyłby bez animacji
      setTimeout(() => (el.style.scrollSnapType = ''), 400)
      // po przeciągnięciu nie klikamy w to, co jest pod kursorem (np. odtwarzanie filmu)
      el.addEventListener('click', (ev) => ev.stopPropagation(), { capture: true, once: true })
    }
    el.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      el.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [])

  return (
    <div role="region" aria-roledescription="karuzela" aria-label={label}>
      {/* tor na całą szerokość ekranu, ale pierwsza karta zaczyna się równo z treścią strony */}
      <div
        ref={track}
        className="flex snap-x snap-mandatory scroll-px-[max(var(--gutter),calc((100vw_-_var(--page-max))/2_+_var(--gutter)))] gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain px-[max(var(--gutter),calc((100vw_-_var(--page-max))/2_+_var(--gutter)))] pb-2 select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <div key={i} role="group" aria-roledescription="slajd" aria-label={`${i + 1} z ${slides.length}`} className="flex flex-none snap-start">
            {slide}
          </div>
        ))}
      </div>

      <div className={cx(wrap, 'mt-6 flex items-center justify-between gap-4')}>
        <div className="flex">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Pozycja ${i + 1} z ${count}`}
              aria-current={i === active}
              className={cx(
                'grid h-8 w-7 place-items-center before:size-2 before:rounded-[4px] before:transition-[transform,background-color] before:duration-400 before:ease-out-expo',
                i === active ? 'before:scale-x-[3] before:bg-red' : 'before:bg-paper-deep hover:before:bg-ink-soft',
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" className={arrow} onClick={() => go(active - 1)} disabled={edges.start} aria-label="Przewiń w lewo">
            <span className="grid rotate-180">
              <Caret />
            </span>
          </button>
          <button type="button" className={arrow} onClick={() => go(active + 1)} disabled={edges.end} aria-label="Przewiń w prawo">
            <Caret />
          </button>
        </div>
      </div>
    </div>
  )
}
