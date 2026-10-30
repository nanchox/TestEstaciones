import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CHEERS, LETTERS, QUESTIONS, type Letter } from '../data'

interface Props {
  name: string
  onFinish: (answers: Letter[]) => void
  onExit: () => void
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Quiz({ name, onFinish, onExit }: Props) {
  // Se baraja el orden de las opciones para que no se note el patrón A→D.
  const orders = useMemo(() => QUESTIONS.map(() => shuffle(LETTERS)), [])
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<(Letter | undefined)[]>([])
  const [picked, setPicked] = useState<Letter | null>(null)
  const [direction, setDirection] = useState(1)

  const question = QUESTIONS[index]
  const order = orders[index]
  const progress = (answers.filter(Boolean).length / QUESTIONS.length) * 100
  const cheer = index > 0 ? CHEERS[(index - 1) % CHEERS.length].replace('{name}', name) : `¡Hola, ${name}! 👋`

  const choose = (letter: Letter) => {
    if (picked) return
    setPicked(letter)
    const next = [...answers]
    next[index] = letter
    setAnswers(next)
    setTimeout(() => {
      setPicked(null)
      if (index === QUESTIONS.length - 1) {
        onFinish(next as Letter[])
      } else {
        setDirection(1)
        setIndex(index + 1)
      }
    }, 380)
  }

  const back = () => {
    if (picked) return
    if (index === 0) return onExit()
    setDirection(-1)
    setIndex(index - 1)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key)
      if (n >= 1 && n <= 4) choose(order[n - 1])
      if (e.key === 'Backspace' || e.key === 'ArrowLeft') back()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <motion.main
      key="quiz"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 mx-auto flex min-h-[100dvh] max-w-xl flex-col px-4 pb-8 pt-5"
    >
      <header className="flex items-center gap-3">
        <button
          onClick={back}
          aria-label="Pregunta anterior"
          className="glass grid h-11 w-11 shrink-0 place-items-center rounded-full text-xl shadow transition hover:scale-105 active:scale-95"
        >
          ←
        </button>
        <div className="flex-1">
          <div className="mb-1 flex justify-between font-display text-sm font-semibold text-slate-700">
            <span>
              Pregunta {index + 1} de {QUESTIONS.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/60 shadow-inner">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-pink-400 via-amber-400 via-60% to-sky-400"
              animate={{ width: `${Math.max(progress, 4)}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            />
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.section
          key={index}
          custom={direction}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -60 }}
          transition={{ duration: 0.28 }}
          className="mt-6 flex flex-1 flex-col"
        >
          <motion.p
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring' }}
            className="mb-3 self-start rounded-full bg-white/80 px-4 py-1.5 font-display text-sm font-semibold text-pink-600 shadow"
          >
            {cheer}
          </motion.p>
          <h2 className="font-display text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">{question.text}</h2>

          <div className="mt-6 flex flex-col gap-3" role="radiogroup" aria-label={question.text}>
            {order.map((letter, i) => {
              const selected = picked === letter || (!picked && answers[index] === letter)
              return (
                <motion.button
                  key={letter}
                  role="radio"
                  aria-checked={selected}
                  onClick={() => choose(letter)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0, scale: picked === letter ? [1, 1.04, 1] : 1 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-start gap-3 rounded-2xl border-2 p-4 text-left text-base shadow-md transition-colors sm:text-lg ${
                    selected
                      ? 'border-pink-400 bg-gradient-to-r from-pink-50 to-amber-50 ring-4 ring-pink-200'
                      : 'glass border-white/80 hover:border-pink-200'
                  }`}
                >
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-display text-sm font-bold ${
                      selected ? 'bg-pink-500 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {selected ? '✓' : i + 1}
                  </span>
                  <span className="pt-0.5 text-slate-800">{question.options[letter]}</span>
                </motion.button>
              )
            })}
          </div>
        </motion.section>
      </AnimatePresence>
    </motion.main>
  )
}
