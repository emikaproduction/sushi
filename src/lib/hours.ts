import { useEffect, useState } from 'react'
import { HOURS } from '../data/menu'

function warsawNow() {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Warsaw', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date())
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  return { day, min: +get('hour') * 60 + +get('minute') }
}

const fmt = (m: number) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`

/** Czy lokal jest teraz otwarty (czas warszawski) + tekst statusu. */
export function useOpenStatus() {
  const [now, setNow] = useState(warsawNow)
  useEffect(() => {
    const t = setInterval(() => setNow(warsawNow()), 60_000)
    return () => clearInterval(t)
  }, [])
  const today = HOURS.find((h) => h.idx === now.day)
  const open = !!today?.open && now.min >= today.open[0] && now.min < today.open[1]
  let label: string
  if (open) label = `Otwarte do ${fmt(today!.open![1])}`
  else if (today?.open && now.min < today.open[0]) label = `Dziś od ${fmt(today.open[0])}`
  else {
    const next = HOURS.find((h) => h.open && h.idx > now.day) ?? HOURS.find((h) => h.idx === 0)!
    label = `Zamknięte · ${next.day.toLowerCase()} od ${fmt(next.open![0])}`
  }
  return { open, label, today: now.day }
}

export const hoursText = (o?: [number, number]) => (o ? `${fmt(o[0])} – ${fmt(o[1])}` : 'nieczynne')
