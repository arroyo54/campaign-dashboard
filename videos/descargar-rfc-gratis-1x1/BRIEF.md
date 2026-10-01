---
workflow: faceless-explainer
flow: automation
storyboard: yes
message: "Tu RFC se descarga gratis y en minutos: es la constancia de situación fiscal, y así la sacas"
destination: ig-linkedin-feed
aspect: 1080x1080
language: es
audience: "Personas físicas en México a quienes les piden su RFC: nuevo empleo, banco, plataformas (Uber, DiDi, Rappi) y trámites"
length: 60s
angle: how-to
narration: no
---

## Intent

Explainer animado con la marca heru a partir del artículo del blog
[Descargar RFC gratis: cómo obtener tu constancia con RFC en 2026](https://www.heru.app/blog/descargar-rfc-gratis/).
Pedido del usuario: "hazme un video animado con branding heru de este blog… sin audio, puro texto
visual, animaciones, transiciones", hecho con HyperFrames de HeyGen ("aquí ya habíamos usado
heygen"), igual que el promo `heru-mensual`.

Es una guía práctica: quien lo ve acaba de recibir la petición de "tu RFC" y sale sabiendo que es
gratis, que el documento es la constancia de situación fiscal y cómo sacarla por el portal del SAT o
por la app SAT ID. Cierra en heru como el siguiente paso. Tono claro, tranquilizador y competente,
el mismo registro de heru: nada de alarmismo fiscal.

Plan aprobado en el chat: 8 frames (gancho · constancia · no es la cédula · método portal ·
método SAT ID · si algo falla · dato heru 64.8% · CTA), ~57 s.

## Assets

- ../../logo-heru-white.png — logo heru blanco con el lema "impuestos sin estrés" (2787x1347, PNG con alfa); cierre sobre azul.
- Wordmark heru en SVG de https://www.heru.app/heru-logo.svg (#1790EC); marca sobre fondos claros.

## Customizations

- Video completamente mudo: sin narración, sin música, sin SFX (`music: none` y sin `SCRIPT.md`).
  Sin subtítulos: no hay audio que subtitular, todo el texto es texto en pantalla diseñado.
- Sistema de diseño de `heru-mensual` (preset `blue-professional` remezclado sobre los tokens de
  heru.app, Lexend Deca), para que los videos de heru se vean como una sola familia.
- Hoja de bocetos (`storyboard.html`) antes de animar.

## Notes

- Español de México. "SAT" siempre como sigla, nunca expandido en pantalla.
- Todo dato sale del artículo (actualizado el 23 de septiembre de 2026): gratis, 2 a 5 minutos por
  el portal, 1 a 5 días hábiles por SAT ID, 13 caracteres, antes de 9 a.m. o después de 6 p.m.,
  máximo 3 meses de antigüedad, 64.8% de 334,124 conexiones. No inventar cifras.
- El RFC en pantalla es de ejemplo (`ABCD850101XY1`).
- Pantallas del SAT y de SAT ID como maquetas genéricas: sin logos ni identidad gráfica oficial del SAT.
- Evitar promociones con fecha (heru Days, primer mes gratis): envejecen mal. CTA: "Empieza gratis".
- La versión 9:16 hecha a mano antes de este proyecto (sin HyperFrames) vive aparte en `../descargar-rfc-gratis/`.
