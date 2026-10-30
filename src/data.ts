export type Letter = 'A' | 'B' | 'C' | 'D'

export interface Question {
  text: string
  options: Record<Letter, string>
}

export interface Season {
  letter: Letter
  name: string
  emoji: string
  headline: string
  text: string
  /** Fondo de la pantalla (gradiente CSS). */
  gradient: string
  /** Color de acento para botones y barras. */
  accent: string
  /** Partículas que caen en el fondo. */
  particles: string[]
}

export const QUESTIONS: Question[] = [
  {
    text: 'Cuando pensamos en el futuro de nosotros dos, ¿qué se nos viene a la cabeza?',
    options: {
      A: 'Pura emoción, tenemos un montón de planes, proyectos y sueños por cumplir juntos.',
      B: 'Nos sentimos tranquilos y seguros de lo que hemos construido, vamos por buen camino.',
      C: 'Nos da un poquito de susto o incertidumbre; como que ya no planeamos tanto a futuro.',
      D: 'Desaliento total. Es difícil ver un futuro bonito o dan ganas de tirar la toalla.',
    },
  },
  {
    text: '¿Cómo manejamos los desacuerdos o las peleas últimamente?',
    options: {
      A: 'Hablamos de una, buscamos soluciones y quedamos súper parchados.',
      B: 'Nos entendemos bien, respetamos las diferencias y resolvemos las cosas con madurez.',
      C: 'Preferimos barrer las cosas debajo de la alfombra y no decir nada para evitar el rayón.',
      D: 'O nos agarramos de las mechas con gritos y reclamos, o nos clavamos la ley del hielo absoluta.',
    },
  },
  {
    text: 'Si hablamos de los detalles, el romance y las demostraciones de afecto...',
    options: {
      A: 'Estamos en pleno idilio: nos buscamos harto, hay carticas, mensajitos y muchas ganas.',
      B: 'Hay estabilidad; nos consentimos seguido y mantenemos viva la chispa en el día a día.',
      C: 'La verdad, la rutina nos está ganando y nos hemos descuidado un montón.',
      D: 'Eso ya ni existe. Hay un frío tenaz entre los dos y cero ganas de tocarnos.',
    },
  },
  {
    text: 'En la convivencia diaria y las responsabilidades de la casa o el dinero:',
    options: {
      A: 'Hacemos un equipo tremendo, nos apoyamos con toda y con buena actitud.',
      B: 'Todo fluye relajado, cada quien sabe qué hacer y nos coordinamos súper bien.',
      C: 'Nos sentimos cansados, a veces pesa llevar la carga y se siente monotonía.',
      D: 'Vivimos como extraños bajo el mismo techo, cada uno metido en su propio cuento y peleando por todo.',
    },
  },
  {
    text: 'Cuando mi pareja me habla o me cuenta algo, mi reacción es:',
    options: {
      A: 'Le pongo toda la atención del mundo, me emociona mucho escucharle.',
      B: 'Le escucho con respeto, empatía y nos entendemos perfectamente.',
      C: 'A veces lo oigo por encima, ando en mis cosas y me cuesta concentrarme en lo que dice.',
      D: 'Me da fastidio, me defiendo de una vez o simplemente me entra por un oído y me sale por el otro.',
    },
  },
  {
    text: 'La palabra que mejor describe el ambiente en nuestra casa hoy es:',
    options: {
      A: 'Entusiasmo y alegría.',
      B: 'Paz y seguridad.',
      C: 'Distancia y rutina.',
      D: 'Tensión y frialdad.',
    },
  },
  {
    text: '¿Cómo nos sentimos frente a los defectos del otro?',
    options: {
      A: 'Los vemos pequeños y nos enfocamos en todas sus virtudes.',
      B: 'Los aceptamos con tranquilidad, entendemos que nadie es perfecto.',
      C: 'Nos empiezan a tallar e incomodar cosas que antes no nos importaban.',
      D: 'Nos da una mamera tenaz; criticamos y juzgamos todo lo que el otro hace.',
    },
  },
  {
    text: 'Si nos pasa algo difícil o un problema externo, ¿cómo reaccionamos?',
    options: {
      A: 'Nos unimos más que nunca, listos para arrancar con toda a solucionarlo.',
      B: 'Lo afrontamos con calma y madurez, confiando en el apoyo mutuo.',
      C: 'Nos estresamos y terminamos distanciándonos un poco mientras pasa el bache.',
      D: 'Nos echamos la culpa el uno al otro y el problema nos termina de hundir.',
    },
  },
]

export const SEASONS: Record<Letter, Season> = {
  A: {
    letter: 'A',
    name: 'Primavera',
    emoji: '🌸',
    headline: '¡Están con toda!',
    text: 'Su relación está llena de ilusión, nuevos comienzos y planes sabrosos. Hay mucha energía positiva. El único consejo: no se confíen, rieguen esa matica todos los días para que las raíces se vuelvan fuertes antes de que lleguen los tiempos difíciles.',
    gradient: 'linear-gradient(160deg, #ffd1e8 0%, #ffb3d9 40%, #c9f2c7 100%)',
    accent: '#e84393',
    particles: ['🌸', '🌷', '🌼', '💗'],
  },
  B: {
    letter: 'B',
    name: 'Verano',
    emoji: '☀️',
    headline: '¡Qué momento tan bacano!',
    text: 'Están en un momento una chimba, lleno de estabilidad, paz y madurez. Ya se conocen, se aceptan y disfrutan los frutos de lo que han cosechado. ¡Ojo! El peligro aquí es volverse cómodos y caer en el aburrimiento. Sigan saliendo a parchar solos y mantengan la chispa viva.',
    gradient: 'linear-gradient(160deg, #fff3b0 0%, #ffd56b 45%, #ffa45b 100%)',
    accent: '#e67e22',
    particles: ['☀️', '🌻', '✨', '🍉'],
  },
  C: {
    letter: 'C',
    name: 'Otoño',
    emoji: '🍂',
    headline: '¡Pilas!',
    text: "La rutina y el descuido silencioso les están ganando terreno. Hacia afuera todo se ve bien, pero por dentro se están alejando y dejando las cosas sin hablar por 'evitar peleas'. Es el momento exacto para sentarse a conversar con el corazón, admitir los descuidos y reconectar antes de que se enfríe el rancho.",
    gradient: 'linear-gradient(160deg, #ffe0b8 0%, #f4a261 45%, #c8553d 100%)',
    accent: '#b5462a',
    particles: ['🍂', '🍁', '🍃', '🌰'],
  },
  D: {
    letter: 'D',
    name: 'Invierno',
    emoji: '❄️',
    headline: '¡No se rindan!',
    text: 'Están pasando por un momento muy duro, con mucha frialdad, discusiones cansonas o un silencio gélido tenaz. Se sienten solos y frustrados viviendo juntos. Pero el invierno no dura para siempre. Alguien tiene que dar el primer paso bajándole a la defensiva, pidiendo perdón por los errores del pasado y, si lo necesitan, buscando ayuda de un consejero o terapeuta de parejas para derretir ese hielo.',
    gradient: 'linear-gradient(160deg, #eef6ff 0%, #b8d8f8 45%, #7fa7e0 100%)',
    accent: '#2f6fd6',
    particles: ['❄️', '⛄', '🧊', '✨'],
  },
}

export const LETTERS: Letter[] = ['A', 'B', 'C', 'D']

export const CHEERS = [
  '¡Vas volando, {name}! 🚀',
  '¡Eso es, {name}, con toda la sinceridad! 💯',
  '¡Ya casi, {name}! 🙌',
  '¡Qué berraquera, {name}! 💪',
  'Honestidad ante todo 😉',
  '¡Sigue así, {name}! ✨',
  '¡La última, {name}! 🎯',
]

export interface Result {
  counts: Record<Letter, number>
  /** Letras ganadoras en orden A→D. Más de una = estación en transición. */
  winners: Letter[]
}

export function computeResult(answers: Letter[]): Result {
  const counts: Record<Letter, number> = { A: 0, B: 0, C: 0, D: 0 }
  for (const a of answers) counts[a]++
  const max = Math.max(...LETTERS.map((l) => counts[l]))
  return { counts, winners: LETTERS.filter((l) => counts[l] === max) }
}

export function joinNames(names: string[]): string {
  if (names.length <= 1) return names.join('')
  return `${names.slice(0, -1).join(', ')} y ${names[names.length - 1]}`
}

export function resultTitle(r: Result): string {
  const seasons = r.winners.map((l) => SEASONS[l])
  if (seasons.length === 1) return seasons[0].name
  return `Entre ${joinNames(seasons.map((s) => s.name))}`
}
