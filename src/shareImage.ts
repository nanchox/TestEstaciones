import { LETTERS, QUESTIONS, SEASONS, resultTitle, type Result } from './data'
import { gradientColors } from './theme'

const W = 1080
const H = 1920

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let line = ''
  for (const w of words) {
    const test = line ? `${line} ${w}` : w
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line)
      line = w
    } else line = test
  }
  if (line) lines.push(line)
  return lines
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
  ctx.fill()
}

/** Dibuja una imagen tipo historia (1080×1920) con el resultado. */
export async function renderShareImage(name: string, result: Result, url: string): Promise<Blob> {
  await document.fonts.ready
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!
  const seasons = result.winners.map((l) => SEASONS[l])

  const colors = seasons.flatMap((s) => gradientColors(s))
  const g = ctx.createLinearGradient(0, 0, W * 0.4, H)
  colors.forEach((c, i) => g.addColorStop(i / (colors.length - 1), c))
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)

  // Partículas decorativas
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  const emojis = seasons.flatMap((s) => s.particles)
  for (let i = 0; i < 26; i++) {
    ctx.globalAlpha = 0.35
    ctx.font = `${40 + ((i * 37) % 50)}px serif`
    ctx.fillText(emojis[i % emojis.length], (i * 397) % W, (i * 613) % H)
  }
  ctx.globalAlpha = 1

  // Tarjeta
  ctx.fillStyle = 'rgba(255,255,255,0.85)'
  roundRect(ctx, 70, 260, W - 140, 1400, 60)

  ctx.fillStyle = '#334155'
  ctx.font = '600 52px Fredoka, sans-serif'
  ctx.fillText(`El matrimonio de ${name} está en`, W / 2, 380)

  ctx.font = '220px serif'
  ctx.fillText(seasons.map((s) => s.emoji).join(''), W / 2, 600)

  const title = resultTitle(result)
  ctx.fillStyle = '#0f172a'
  let size = 130
  ctx.font = `700 ${size}px Fredoka, sans-serif`
  while (ctx.measureText(title).width > W - 220 && size > 60) {
    size -= 6
    ctx.font = `700 ${size}px Fredoka, sans-serif`
  }
  ctx.fillText(title, W / 2, 820)

  ctx.fillStyle = seasons[0].accent
  ctx.font = '700 60px Fredoka, sans-serif'
  ctx.fillText(seasons.length === 1 ? seasons[0].headline : 'Estación en transición', W / 2, 950)

  // Barras
  const total = QUESTIONS.length
  LETTERS.forEach((l, i) => {
    const s = SEASONS[l]
    const y = 1080 + i * 130
    const pct = result.counts[l] / total
    ctx.textAlign = 'left'
    ctx.fillStyle = '#334155'
    ctx.font = '600 46px Nunito, sans-serif'
    ctx.fillText(`${s.emoji} ${s.name}`, 150, y)
    ctx.textAlign = 'right'
    ctx.fillText(`${Math.round(pct * 100)}%`, W - 150, y)
    ctx.fillStyle = 'rgba(15,23,42,0.08)'
    roundRect(ctx, 150, y + 34, W - 300, 30, 15)
    if (pct > 0) {
      ctx.fillStyle = s.accent
      roundRect(ctx, 150, y + 34, Math.max((W - 300) * pct, 30), 30, 15)
    }
  })

  ctx.textAlign = 'center'
  ctx.fillStyle = '#0f172a'
  ctx.font = '700 52px Fredoka, sans-serif'
  wrap(ctx, '¿Y ustedes en qué estación están?', W - 160).forEach((line, i) => ctx.fillText(line, W / 2, 1740 + i * 64))
  ctx.font = '600 42px Nunito, sans-serif'
  ctx.fillStyle = '#334155'
  ctx.fillText(url.replace(/^https?:\/\//, ''), W / 2, 1860)

  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob'))), 'image/png'))
}
