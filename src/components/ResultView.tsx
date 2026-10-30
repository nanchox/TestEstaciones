import { useState } from 'react'
import { motion } from 'framer-motion'
import { LETTERS, QUESTIONS, SEASONS, joinNames, resultTitle, type Result } from '../data'
import { renderShareImage } from '../shareImage'

interface Props {
  name: string
  result: Result
  onRestart: () => void
}

export default function ResultView({ name, result, onRestart }: Props) {
  const [busy, setBusy] = useState(false)
  const seasons = result.winners.map((l) => SEASONS[l])
  const main = seasons[0]
  const title = resultTitle(result)
  const transition = seasons.length > 1
  const url = window.location.origin

  const shareText = `${seasons.map((s) => s.emoji).join('')} Hice el test de *Las 4 Estaciones del Matrimonio* y salí en *${title}*. ¿Y ustedes en qué estación están? 👉 ${url}`

  const shareImage = async () => {
    setBusy(true)
    try {
      const blob = await renderShareImage(name, result, url)
      const file = new File([blob], `mi-estacion-${main.name.toLowerCase()}.png`, { type: 'image/png' })
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: shareText.replace(/\*/g, '') })
      } else {
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = file.name
        a.click()
        setTimeout(() => URL.revokeObjectURL(a.href), 5000)
      }
    } catch {
      // El usuario canceló el diálogo de compartir.
    } finally {
      setBusy(false)
    }
  }

  return (
    <motion.main
      key="result"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 mx-auto max-w-xl px-4 py-8"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 140, damping: 14 }}
        className="glass rounded-[2rem] p-6 text-center shadow-2xl sm:p-8"
      >
        <p className="font-display text-lg font-semibold text-slate-600">{name}, tu matrimonio está en</p>
        <motion.div
          className="my-3 text-8xl sm:text-9xl"
          animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          aria-hidden
        >
          {seasons.map((s) => s.emoji).join('')}
        </motion.div>
        <h1 className="font-display text-4xl font-bold text-slate-900 sm:text-5xl">{title}</h1>
        <p className="mt-2 font-display text-xl font-bold" style={{ color: main.accent }}>
          {transition ? 'Estación en transición' : main.headline}
        </p>

        {transition && (
          <p className="mt-4 text-left text-base text-slate-700">
            Sus respuestas quedaron empatadas entre {joinNames(seasons.map((s) => `${s.emoji} ${s.name}`))}. Su relación
            está cambiando de estación, así que les aplica un poquito de cada una:
          </p>
        )}

        <div className="mt-5 space-y-4 text-left">
          {seasons.map((s) => (
            <div key={s.letter} className="rounded-2xl bg-white/80 p-4 shadow-sm" style={{ borderLeft: `6px solid ${s.accent}` }}>
              {transition && (
                <h2 className="mb-1 font-display text-lg font-bold" style={{ color: s.accent }}>
                  {s.emoji} {s.name}: {s.headline}
                </h2>
              )}
              <p className="text-base leading-relaxed text-slate-700 sm:text-lg">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3 text-left">
          <h3 className="font-display text-lg font-semibold text-slate-800">Así quedaron tus respuestas</h3>
          {LETTERS.map((l, i) => {
            const s = SEASONS[l]
            const pct = (result.counts[l] / QUESTIONS.length) * 100
            return (
              <div key={l}>
                <div className="flex justify-between text-sm font-semibold text-slate-700">
                  <span>
                    {s.emoji} {s.name}
                  </span>
                  <span>
                    {result.counts[l]} de {QUESTIONS.length}
                  </span>
                </div>
                <div className="mt-1 h-3 overflow-hidden rounded-full bg-slate-900/10">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: s.accent }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      <div className="mt-6 grid gap-3">
        <motion.a
          whileTap={{ scale: 0.97 }}
          href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noopener"
          className="rounded-2xl bg-[#25D366] px-6 py-4 text-center font-display text-lg font-bold text-white shadow-lg"
        >
          💬 Compartir por WhatsApp
        </motion.a>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={shareImage}
          disabled={busy}
          className="rounded-2xl px-6 py-4 font-display text-lg font-bold text-white shadow-lg disabled:opacity-60"
          style={{ background: main.accent }}
        >
          {busy ? 'Creando imagen…' : '📸 Imagen para tus historias'}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onRestart}
          className="glass rounded-2xl px-6 py-4 font-display text-lg font-bold text-slate-800 shadow"
        >
          🔄 Hacer el test otra vez
        </motion.button>
      </div>

      <p className="mt-6 text-center text-xs text-slate-700/80">
        Test orientativo adaptado de <em>Las Cuatro Estaciones del Matrimonio</em> (Gary Chapman). No reemplaza la ayuda de
        un profesional.
      </p>
    </motion.main>
  )
}
