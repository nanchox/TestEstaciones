import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Welcome from './components/Welcome'
import Quiz from './components/Quiz'
import Reveal from './components/Reveal'
import ResultView from './components/ResultView'
import Particles from './components/Particles'
import { SEASONS, computeResult, type Letter, type Result } from './data'
import { backgroundFor } from './theme'

type Step = 'welcome' | 'quiz' | 'reveal' | 'result'

const ALL_PARTICLES = ['🌸', '☀️', '🍂', '❄️']

export default function App() {
  const [step, setStep] = useState<Step>('welcome')
  const [name, setName] = useState('')
  const [result, setResult] = useState<Result | null>(null)

  const showResult = useCallback(() => {
    setStep('result')
    window.scrollTo({ top: 0 })
  }, [])

  const finish = (answers: Letter[]) => {
    setResult(computeResult(answers))
    setStep('reveal')
  }

  const themed = step === 'result' && result
  const particles = themed ? result.winners.flatMap((l) => SEASONS[l].particles) : ALL_PARTICLES

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden">
      <div className="bg-shift fixed inset-0" />
      <AnimatePresence>
        {themed && (
          <motion.div
            key="theme"
            className="fixed inset-0"
            style={{ background: backgroundFor(result.winners) }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>
      <Particles key={particles.join('')} emojis={particles} count={themed ? 24 : 14} />

      <AnimatePresence mode="wait">
        {step === 'welcome' && (
          <Welcome
            key="welcome"
            initialName={name}
            onStart={(n) => {
              setName(n)
              setStep('quiz')
            }}
          />
        )}
        {step === 'quiz' && <Quiz key="quiz" name={name} onFinish={finish} onExit={() => setStep('welcome')} />}
        {step === 'reveal' && <Reveal key="reveal" name={name} onDone={showResult} />}
        {step === 'result' && result && (
          <ResultView key="result" name={name} result={result} onRestart={() => setStep('welcome')} />
        )}
      </AnimatePresence>
    </div>
  )
}
