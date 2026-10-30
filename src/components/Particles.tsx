import { useMemo } from 'react'

interface Props {
  emojis: string[]
  count?: number
}

export default function Particles({ emojis, count = 18 }: Props) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        emoji: emojis[i % emojis.length],
        left: Math.random() * 100,
        size: 16 + Math.random() * 22,
        duration: 9 + Math.random() * 10,
        delay: -Math.random() * 18,
        sway: `${(Math.random() - 0.5) * 120}px`,
        opacity: 0.55 + Math.random() * 0.4,
      })),
    [emojis, count],
  )

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {items.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={
            {
              left: `${p.left}%`,
              fontSize: p.size,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              '--sway': p.sway,
            } as React.CSSProperties
          }
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}
