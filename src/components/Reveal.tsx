import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LETTERS, SEASONS } from '../data'

const LINES = ['Consultando el clima de su relación…', 'Midiendo la temperatura del corazón…', 'Revisando el pronóstico…']

export default function Reveal({ name, onDone }: { name: string; onDone: () => void }) {
  const [line, setLine] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setLine((l) => (l + 1) % LINES.length), 800)
    const done = setTimeout(onDone, 2500)
    return () => {
      clearInterval(t)
      clearTimeout(done)
    }
  }, [onDone])

  return (
    <motion.main
      key="reveal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center"
      aria-live="polite"
    >
      <motion.div
        className="relative h-48 w-48"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
      >
        {LETTERS.map((l, i) => {
          const angle = (i / 4) * Math.PI * 2
          return (
            <span
              key={l}
              className="absolute text-6xl"
              style={{ left: `calc(50% + ${Math.cos(angle) * 70}px - 0.6em)`, top: `calc(50% + ${Math.sin(angle) * 70}px - 0.6em)` }}
            >
              {SEASONS[l].emoji}
            </span>
          )
        })}
      </motion.div>
      <p className="mt-8 font-display text-2xl font-bold text-slate-900">{name}, un momentico…</p>
      <motion.p key={line} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-lg text-slate-700">
        {LINES[line]}
      </motion.p>
    </motion.main>
  )
}
