import { SEASONS, type Letter, type Season } from './data'

export function gradientColors(s: Season): string[] {
  return s.gradient.match(/#[0-9a-f]{6}/gi) ?? []
}

/** Fondo para una o varias estaciones (las de transición se mezclan). */
export function backgroundFor(letters: Letter[]): string {
  if (letters.length === 1) return SEASONS[letters[0]].gradient
  const colors = letters.flatMap((l) => gradientColors(SEASONS[l]).slice(1, 3))
  return `linear-gradient(160deg, ${colors.join(', ')})`
}
