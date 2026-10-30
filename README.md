# Test: Las Cuatro Estaciones del Matrimonio 🌸☀️🍂❄️

App web rápida donde el usuario ingresa su nombre, responde 8 preguntas y descubre en qué
estación emocional está su relación (Primavera, Verano, Otoño o Invierno), basada en el
libro de Gary Chapman.

- Una pregunta por pantalla, opciones barajadas y avance automático.
- Si hay empate, el resultado es una "estación en transición" con los textos de ambas.
- Compartir por WhatsApp e imagen tipo historia (1080×1920) generada en el navegador.
- No guarda datos: todo ocurre en el dispositivo del usuario.

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # genera dist/
```

Stack: Vite + React + TypeScript + Tailwind CSS + Framer Motion. Se publica en Vercel como sitio estático.
Las preguntas y resultados están en `src/data.ts`.
