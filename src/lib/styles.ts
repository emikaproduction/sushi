// wspólne klasy Tailwinda używane w kilku komponentach

/** Skleja klasy Tailwinda, pomijając puste i warunkowe `false`. */
export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ')

export const wrap = 'mx-auto max-w-(--page-max) px-(--gutter)'
export const center = 'mt-10 flex justify-center'
export const pieces = 'text-xs font-bold uppercase tracking-[.1em] text-ink'
export const eyebrow =
  "inline-flex items-center gap-2.5 text-sm font-medium uppercase tracking-[.08em] text-red-deep before:text-red before:content-['◂'] after:text-red after:content-['▸']"
export const ctas = 'flex flex-wrap justify-center gap-2'

const BTN = {
  primary: 'border-transparent bg-red text-white hover:bg-ink hover:text-white',
  ghost: 'border-ink text-ink hover:bg-ink hover:text-paper',
}

export function btn(variant: keyof typeof BTN, size: 'md' | 'lg' = 'md') {
  return cx(
    'group/btn inline-flex items-center gap-2 whitespace-nowrap rounded-btn border font-medium uppercase tracking-[.02em]',
    'transition-[transform,background-color,color,border-color] duration-250 ease-out-expo active:scale-95',
    '[&_svg]:size-[13px] [&_svg]:flex-none',
    size === 'lg' ? 'px-5 py-3.5 text-base' : 'px-3.5 py-2.5 text-sm',
    BTN[variant],
  )
}
