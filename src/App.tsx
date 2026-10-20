import { MotionConfig } from 'motion/react'
import { useState } from 'react'
import { Cursor } from './components/Cursor'
import { Duo } from './components/Duo'
import { Hero, Intro, Marquee, Nav } from './components/Hero'
import { About, CallFab, Contact, Footer } from './components/Info'
import { Menu, type Filter } from './components/Menu'
import { Sets } from './components/Sets'
import { SushiGo } from './components/SushiGo'
import { Videos } from './components/Videos'

export default function App() {
  const [filter, setFilter] = useState<Filter>('all')
  const [cat, setCat] = useState('futomaki')

  const pick = (f: Filter) => {
    setFilter(f)
    setCat(f === 'veg' ? 'futomaki' : 'premium')
  }

  return (
    <MotionConfig reducedMotion="user">
      <Intro />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Duo onPick={pick} />
        <Menu filter={filter} setFilter={setFilter} cat={cat} setCat={setCat} />
        <SushiGo />
        <Sets />
        <About />
        <Videos />
        <Contact />
      </main>
      <Footer />
      <CallFab />
      <Cursor />
    </MotionConfig>
  )
}
