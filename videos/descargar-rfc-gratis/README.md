# Video: Descargar RFC gratis (9:16, sin audio)

Video animado con la marca heru basado en el blog
[Descargar RFC gratis: cómo obtener tu constancia con RFC en 2026](https://www.heru.app/blog/descargar-rfc-gratis/).
Solo usa texto, animaciones y transiciones; no tiene pista de audio.

| Archivo | Qué es |
|---|---|
| `heru-descargar-rfc-gratis-9x16.mp4` | Video final: 1080×1920, 30 fps, H.264, 68 s, sin audio |
| `portada.jpg` | Cuadro del segundo 3.6 para usarlo como portada en Reels o TikTok |
| `index.html` | La animación (HTML + GSAP). Aquí se editan los textos y los tiempos |
| `render.js` | Convierte `index.html` en el MP4, cuadro por cuadro |
| `assets/` | Lexend Deca (fuente de heru.app), logo, íconos Lucide y GSAP |

Marca: tipografía Lexend Deca y los colores de heru.app (`#0b74cf`, `#1790ec`, `#4aa5f5` y `#0c3961`).
El logo viene de `heru.app/heru-logo.svg`.

## Guion

| Inicio | Escena | Texto en pantalla |
|---|---|---|
| 0:00 | Gancho | Guía 2026 · ¿Necesitas tu RFC? · Descárgalo **GRATIS** en minutos y sin cita |
| 0:04 | El documento | Lo que necesitas se llama **Constancia de Situación Fiscal** · PDF oficial del SAT · 100% gratis · Las veces que quieras |
| 0:10 | Qué incluye | RFC con homoclave (13 caracteres), nombre, CURP, domicilio fiscal, régimen, actividades, obligaciones y estatus |
| 0:16 | Constancia vs. cédula | Tabla comparativa · "La que te piden es la constancia" |
| 0:22 | Método 1: portal del SAT | 4 pasos en un navegador animado (sat.gob.mx → iniciar sesión → generar → descargar PDF) · Tiempo total: 2 a 5 minutos |
| 0:35 | Método 2: app SAT ID | 4 pasos en un teléfono (descargar → elegir trámite → INE + video-selfie → llega por correo en 1 a 5 días hábiles) |
| 0:47 | Para qué te la piden | Empleo, bancos, plataformas (Uber, DiDi, Rappi), trámites (IMSS, Infonavit) · Tip: máximo 3 meses de antigüedad |
| 0:53 | Si no puedes descargarla | RFC olvidado → CURP en rfc.sat.gob.mx · Contraseña → SAT ID sin cita · Portal saturado → antes de 9 a.m. o después de 6 p.m. |
| 1:01 | Cierre | Deja que heru se encargue de tus impuestos · logo · Vincula tu RFC en 2 minutos · **Empieza gratis** · heru.app |

Todos los datos vienen del artículo (revisado al 23 de septiembre de 2026). El RFC `ABCD850101XY1` que aparece en pantalla es de ejemplo.

## Ver la animación sin renderizar

Abre `index.html?play` en Chrome. Para ver un instante fijo usa `index.html?t=25`.
La fuente va embebida, así que funciona sin servidor.

## Volver a generar el MP4

Necesitas Node 18 o superior, ffmpeg y Playwright con Chromium:

```bash
npm i playwright && npx playwright install chromium
node render.js                    # genera heru-descargar-rfc-gratis-9x16.mp4 (~5 min con 4 procesos)
node render.js --stills 3.6,25    # genera PNG de esos segundos en ./stills para revisarlos
```

Para cambiar un texto, edítalo en `index.html`. Para cambiar cuánto dura cada escena, ajusta los números de
la sección `// ---------- montaje ----------`. Los pasos de cada método usan `sd`, en segundos por paso.
La línea de tiempo es determinista, así que el video sale idéntico cada vez que se renderiza.
