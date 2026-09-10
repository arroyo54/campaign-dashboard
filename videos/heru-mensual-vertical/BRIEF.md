---
workflow: product-launch-video
flow: automation
storyboard: yes
message: "Heru hace tus impuestos ante el SAT, mes a mes"
destination: tiktok
aspect: 1080x1920
language: es
audience: "Personas físicas en México que facturan: RESICO, plataformas tecnológicas (Uber, Rappi, DiDi, Mercado Libre), honorarios y actividad empresarial"
length: 31.5s
narration: no
angle: "Mes a mes, en automático — el ciclo fiscal recurrente que se resuelve solo"
---

## Intent

Versión **vertical** (9:16) del promo de heru, derivada del corte 16:9 en `../heru-mensual/`.
Mismo arco, mismo copy, misma marca: lo que cambia es la composición, porque los beats con
teléfono estaban lado a lado y en vertical se apilan — y el teléfono puede ir mucho más grande,
así que la UI real gana legibilidad.

Promo de presentación de Heru, ahora para TikTok / Reels / Shorts. El video existe para plantar
una sola frase en la cabeza de quien lo ve: **"Heru, hacemos tus impuestos ante
el SAT mes a mes."**

El ángulo elegido es la **recurrencia**: no es un trámite que resuelves una vez
al año, es un ciclo que vuelve cada mes — y ese ciclo es justo el diferenciador
de Heru. La estructura visual nace del calendario: los meses avanzan, y cada uno
se cierra solo.

Tono: claro, tranquilizador, competente. Nada de humor fiscal ni de alarmismo.
El registro es el que Heru ya usa en sus propios correos — "te quitamos ese
pendiente", "un paso más cerca de quitarte el estrés fiscal".

## Assets

- ../../logo-heru-white.png — logo de Heru en blanco (2787x1347, PNG con alfa); cierre del video.
- 6 capturas de la app entregadas por el usuario (1080x2108), en `capture/assets/`. Sustituyen a la
  captura automática de heru.app, que quedó bloqueada por el proxy (`capture/CAPTURE-FAILED.md`).
  Los tokens de marca sí salieron del HTML real del sitio.
- No usar `02-inicio-primeros-pasos.jpg`: contiene el nombre real "Andres" de una cuenta viva.
- No usar precios de `05-plan-resico.jpg` ($799 / $2,397): envejecen mal en un promo de marca.

## Customizations

- Video **completamente mudo**: sin narración, sin música, sin SFX (`music: none` + sin
  `SCRIPT.md`). El mensaje se sostiene solo con tipografía cinética y ritmo de corte.
  Pensado para reproducirse sin sonido; se le puede montar voz o cama musical después.
- Sin subtítulos: no hay audio que subtitular. Todo el texto es texto en pantalla, diseñado.
- Beat de facturación incluido a petición del usuario en la revisión del plan (Frame 5,
  "Y facturar, gratis", con la captura real de Facturación). El objetivo de 30s sube a 31.5s:
  con siete beats cada frame ya está en el piso de duración de su blueprint, y comprimir más
  rompería las formas.
- Preset `blue-professional`, remixado sobre los tokens reales del sitio (#1D8FF3, Lexend Deca).
  Corrección manual: el remix mapeó el verde de marca (#00B67A) a `text-muted`, lo que dejaba el
  cuerpo de texto en verde; se devolvió a la escala de grises y el verde pasó a `positive`.

## Notes

- Español de México. "SAT" se dice como sigla, nunca se expande en pantalla.
- Vocabulario real del producto, tomado de los correos transaccionales del repo:
  declaración mensual, RESICO, vincular SAT, facturación, e.firma, RFC,
  constancia de situación fiscal, deducciones.
- Sitio de origen para marca y capturas: https://www.heru.app
- Evitar: promesas de monto de ahorro, cifras de clientes o claims de resultados
  que no estén respaldados por el sitio capturado.
