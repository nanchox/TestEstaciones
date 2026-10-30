import { useState } from 'react'
import { motion } from 'framer-motion'
import { LETTERS, SEASONS } from '../data'

interface Props {
  initialName: string
  onStart: (name: string) => void
}

export default function Welcome({ initialName, onStart }: Props) {
  const [name, setName] = useState(initialName)
  const valid = name.trim().length > 0

  return (
    <motion.main
      key="welcome"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      className="relative z-10 mx-auto flex min-h-[100dvh] max-w-md flex-col items-center justify-center px-5 py-10 text-center"
    >
      <div className="mb-6 flex gap-3">
        {LETTERS.map((l, i) => (
          <motion.span
            key={l}
            className="text-5xl drop-shadow sm:text-6xl"
            animate={{ y: [0, -14, 0], rotate: [0, i % 2 ? 8 : -8, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
          >
            {SEASONS[l].emoji}
          </motion.span>
        ))}
      </div>

      <h1 className="font-display text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
        ¿En qué <span className="bg-gradient-to-r from-pink-500 via-orange-500 to-sky-500 bg-clip-text text-transparent">estación</span> está tu matrimonio?
      </h1>
      <p className="mt-4 text-lg text-slate-700">
        8 preguntas · 2 minuticos · resultado al instante.
        <br />
        Basado en <em>Las Cuatro Estaciones del Matrimonio</em> de Gary Chapman.
      </p>

      <form
        className="glass mt-8 w-full rounded-3xl p-5 shadow-xl"
        onSubmit={(e) => {
          e.preventDefault()
          if (valid) onStart(name.trim())
        }}
      >
        <label htmlFor="name" className="block text-left font-display text-lg font-semibold text-slate-800">
          ¿Cómo te llamas?
        </label>
        <input
          id="name"
          autoFocus
          autoComplete="given-name"
          maxLength={30}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Escribe tu nombre"
          className="mt-2 w-full rounded-2xl border-2 border-pink-200 bg-white px-4 py-3 text-lg outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-200"
        />
        <motion.button
          type="submit"
          disabled={!valid}
          whileHover={valid ? { scale: 1.03 } : undefined}
          whileTap={valid ? { scale: 0.97 } : undefined}
          className="mt-4 w-full rounded-2xl bg-gradient-to-r from-pink-500 via-orange-400 to-amber-400 px-6 py-4 font-display text-xl font-bold text-white shadow-lg shadow-pink-300/50 transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          ¡Arranquemos! 🚀
        </motion.button>
        <p className="mt-3 text-sm text-slate-500">
          Responde con total honestidad. No guardamos tus respuestas 🔒
        </p>
      </form>
    </motion.main>
  )
}
