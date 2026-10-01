---
format: 1080x1080
duration: 57s
message: "Tu RFC se descarga gratis y en minutos: es la constancia de situación fiscal, y así la sacas"
arc: how-to-process — gancho → nombrar el documento → 2 métodos paso a paso → si algo falla → dato heru → CTA
audience: Personas físicas en México a quienes les piden su RFC (empleo, banco, plataformas como Uber, DiDi o Rappi)
mode: collaborative
music: none
---

## Decisiones

- **Formato**: 1080×1080, ~57 s, sin voz, sin música ni efectos (`music: none`, sin `SCRIPT.md`), sin subtítulos.
- **Hilo conductor**: la constancia en PDF. Se arma en el 02, se genera y descarga en el 04, llega por correo en el 05 y se nombra en el 08 ("Ya tienes tu constancia").
- **Marca**: `frame.md` de heru-mensual (tokens de heru.app: #1D8FF3, #1772C2 en texto chico, #1A1A1A; Lexend Deca en todos los roles).
- **Prohibido**: sombras, rebote o elastic, un segundo color de acento, logos o identidad gráfica del SAT, cifras inventadas; ni slideshow (todo de golpe y luego congelado) ni salvapantallas (movimiento sin mensaje).
- **Frame sostenido**: el 07 (el dato aterriza y se queda quieto); el 08 termina quieto.
- **Veracidad**: las pantallas del portal del SAT y de SAT ID son esquemas genéricos dibujados, no capturas. El URL, los pasos, los tiempos, los requisitos y el 64.8% salen del artículo; el RFC `ABCD850101XY1` es de ejemplo.
- **Bocetos**: `storyboard.html` v1 (una celda por frame, `#frame-NN`).

## Locked

- Plan de 8 frames aprobado en el chat (2026-10-01).
- Layouts de `storyboard.html` v1 confirmados por el usuario sin cambios ("Se ve bien, anima"): composición, jerarquía y copy de cada celda `#frame-01`…`#frame-08` quedan fijos; el build los viste y anima, no los redibuja.

## Video direction

**Paleta** (de `frame.md`, nada inventado). Lienzo `bg` blanco en los frames 01–07; el cierre 08 invierte
a campo sólido `#1772C2` con texto blanco. Titulares en `text` casi negro, nunca en azul; cuerpo en
`text-muted`; terciario en `text-light`. `primary` #1D8FF3 es el único acento: numerales, estado activo,
la palabra de énfasis ("gratis."), círculos de paso encendidos y la barra de progreso. En texto chico o
sobre tinte baja a `#1772C2` para no romper AA. `positive` #047857 solo marca "Activo" y "Descargado";
`negative` #dc2626 solo como ícono en línea (✗ de la cédula, ícono del problema en el 06), nunca de
relleno. Tarjetas: relleno azul 4%, borde azul 20% de 1.5px, radio 10–14px, **sin sombra**. Chrome en
píldora (100px). Atmósfera (panel diagonal, rejilla de puntos, anillos) solo en el 01 y el 08.

**Escala tipográfica 1:1.** El preset está en `cqw` contra 1920 de ancho; a 1080 se reescala como en
heru-mensual-vertical: h1 ≈ 96px/700 · h2 ≈ 68px/600 · h3 ≈ 44px/500 · cuerpo ≈ 34px/400 · eyebrow ≈ 25px/600
en mayúsculas con tracking 0.08em · chrome de píldora ≈ 22px. Ningún texto que cargue mensaje baja de
28px. Lexend Deca en todos los roles, desde `assets/fonts/lexend-deca.woff2`.

**Gramática de movimiento.** Asentamiento largo `power3` por defecto; suave le gana a rebotón. Prohibidos
`bounce.out`, `elastic.out` y `back.out` como entrada; la única recuperación con resorte es la del botón
que recibe el clic (`press-release-spring`, registro liso). Toda entrada es `fromTo` con estado inicial
explícito. Nada de `repeat`/`yoyo`, `Math.random` ni reloj: render determinista. Primera moción visible
dentro de los primeros 0.2s de cada frame.

**Modelo de revelado — video mudo.** No hay voz que marque el pulso: las revelaciones se pacen a la
**cadencia de lectura**. Cada línea entra, aterriza y sostiene antes de la siguiente pieza (~0.5–0.9s
entre revelaciones; una línea de 5–7 palabras se gana ~2s de lectura). En t=0 solo entra lo que el ojo
necesita primero; el resto se reparte hacia la segunda mitad. Al resolverse, el frame se sostiene quieto:
la quietud aquí es lectura, no vacío.

**Hilo conductor y escenario.** La constancia es el objeto que vuelve: tarjeta-documento en el 02,
mini-documento generado en el 04 (mismos renglones), PDF que llega por correo en el 05. Los frames 04 y
05 comparten escenario: carril de 4 pasos a la izquierda (círculos numerados que se encienden) y
superficie a la derecha (navegador en el 04, teléfono en el 05), en la misma geometría, para que se lean
como una sola secuencia.

**Corriente** — IZQUIERDA. Los seams 02→03→04→05→06 son `push-slide LEFT`; `zoom-through` solo en
fronteras de capítulo (01→02 y 07→08); `crossfade` para entrar al dato (06→07).

**Ritmo y frames sostenidos.** El 07 es el respiro: el número aterriza y todo se queda quieto. El 08
cierra quieto (único final real; sin fundido). El 01, 03 y 06 revelan rápido; el 04 y 05 son los largos
de demostración.

**Lista negativa.** Nada de rebote ni overshoot; nada de respiración ociosa ni pan/push en la segunda
mitad; nada de degradados decorativos tipo "IA", bokeh ni formas genéricas en lugar de un visual
diseñado; nada de chrome de sistema operativo (semáforos de ventana) ni scrollbars; ninguna marca,
sello o color oficial del SAT. Los dos modos de falla vetados: **slideshow** (todo en el primer 25% y
luego congelado) y **salvapantallas** (elementos flotando por su cuenta). Contenido importante en el 83%
superior del lienzo; en el borde inferior solo la barra de progreso de 3px.

**Audio** — ninguno. Ningún frame nombra `sfx`.

## Frame 1 — ¿Te pidieron tu RFC?

- scene: Una línea fija "¿Te pidieron tu RFC?" mientras el lugar donde te lo piden va cambiando; remata en "Descárgalo gratis."
- voiceover: ""
- on_screen: "¿Te pidieron tu RFC?" (fijo) · "en tu nuevo trabajo" → "en el banco" → "en Uber, DiDi o Rappi" (ciclando) · "Descárgalo gratis." · micro: "Nadie debe cobrarte por él."
- duration: 5s
- transition_in: cut
- status: animated
- src: compositions/frames/01-te-pidieron-tu-rfc.html
- type: hook
- persuasion: Direct address + counterintuitive claim (es gratis; si te cobran, desconfía)
- beat: recognition + relief
- blueprint: fixed-anchor-cycle (Adapt)
- focal: la línea ancla "¿Te pidieron tu RFC?"
- roles: ancla = foreground subject · píldora del lugar = supporting · "Descárgalo gratis." = foreground (pago) · panel diagonal azul 8% + rejilla de puntos 3×3 = background (atmósfera de portada)
- sfx: none

narrativeRole: Abre en la situación que el espectador ya vive (le acaban de pedir su RFC) y la resuelve en el mismo plano: es gratis.
keyMessage: Tu RFC se saca gratis; no le pagues a nadie por él.

Adapt: se conserva la firma — **ancla fija que nunca se mueve mientras la región de al lado cicla por
estados a corte duro** (sub-forma A). Cambia: el ancla es la pregunta, no un wordmark; el cierre no es una
firma de marca sino la línea de pago "Descárgalo gratis." debajo.

Scene 1 (0.0–1.1s): campo blanco con la atmósfera de portada ya presente (panel diagonal a la derecha,
rejilla de puntos abajo a la derecha, quietos). La `accent-line` se dibuja y aparece el eyebrow "GUÍA 2026";
el ancla "¿Te pidieron / tu RFC?" entra con **revelado escalonado por palabra** (`dynamic-content-sequencing`)
arriba a la izquierda y queda **clavada**: cero movimiento después. Regla de tercios a la izquierda, ~60%
del ancho.

Scene 2 (1.1–2.9s): el motor del plano. Bajo el ancla, la píldora del lugar hace **ciclo de token en sitio
a corte duro** (`discrete-text-sequence`): "en tu nuevo trabajo" → "en el banco" → "en Uber, DiDi o Rappi",
cadencia constante ~0.6s por estado. El ancho de la píldora se fija por estado (nunca se anima) y crece hacia
la derecha, lejos del ancla.

Scene 3 (2.9–3.9s): el ciclo se detiene y **sostiene** en "en Uber, DiDi o Rappi". "Descárgalo gratis." entra
por palabra (`dynamic-content-sequencing`) en h2 casi negro, con "gratis." en `primary`.

Scene 4 (3.9–5.0s): "Nadie debe cobrarte por él." sube en cuerpo `text-muted` con fundido corto
(`gsap-effects`). Todo queda quieto hasta el seam.

## Frame 2 — Se llama constancia de situación fiscal

- scene: Una constancia en PDF se arma renglón por renglón mientras el nombre del documento aterriza a su lado
- voiceover: ""
- on_screen: "Lo que te piden se llama" · "Constancia de Situación Fiscal" · renglones: "RFC con homoclave · 13 caracteres" · "Régimen fiscal" · "Domicilio fiscal" · "Obligaciones" · "Estatus: activo" · píldoras: "PDF oficial del SAT" · "Gratis" · "Las veces que quieras"
- duration: 6.5s
- transition_in: zoom-through
- status: built
- src: compositions/frames/02-constancia.html
- type: product_intro
- persuasion: Concretization + progressive disclosure
- beat: clarity
- blueprint: grid-card-assemble (Adapt)
- focal: la tarjeta-documento "CONSTANCIA DE SITUACIÓN FISCAL" (el hilo conductor del video)
- roles: título "Constancia de Situación Fiscal" = foreground · tarjeta-documento con 5 renglones = foreground subject · 3 píldoras = supporting · eyebrow + tag-pill "heru · Guía 2026" = chrome
- sfx: none

narrativeRole: Pone nombre al documento que en realidad se busca cuando alguien dice "bajar mi RFC" y lo vuelve tangible: qué trae, que es oficial y que no cuesta.
keyMessage: Lo que necesitas es la constancia de situación fiscal, un PDF oficial y gratis.

Adapt: se conserva la firma — **los ítems se autoensamblan en cascada escalonada en una lista vertical que
se acumula y sostiene** (variante Benefits vertical-list, modo BUILD). Cambia: la lista vive dentro de una
tarjeta-documento con encabezado; el título del documento es el héroe tipográfico arriba.

Scene 1 (0.0–1.2s): el frame llega por el seam `zoom-through`. Eyebrow "LO QUE TE PIDEN SE LLAMA" y
tag-pill "heru · Guía 2026" asientan en el slide-header; "Constancia de / Situación Fiscal" entra **por
palabra** (`dynamic-content-sequencing`) en h2 casi negro, arriba a la izquierda. Apilado, ~90% del ancho.

Scene 2 (1.2–2.0s): la tarjeta-documento (relleno 4%, borde 20%, sin sombra) sube a su lugar con
asentamiento largo; su encabezado con ícono de archivo, "CONSTANCIA DE SITUACIÓN FISCAL" y
la píldora "PDF" aparece con un pop liso (`spring-pop-entrance`, sin overshoot).

Scene 3 (2.0–4.6s): los 5 renglones se **ensamblan de arriba abajo** directo a su lugar
(`center-outward-expansion`, forma directa-al-slot), ~0.5s entre uno y otro: "RFC con homoclave" con su
píldora "13 caracteres" revelada por máscara (`techniques.md`), "Régimen fiscal", "Domicilio fiscal",
"Obligaciones" y "Estatus" con la píldora "Activo" en `positive`.

Scene 4 (4.6–6.5s): las tres píldoras "PDF oficial del SAT" · "Gratis" · "Las veces que quieras" entran
escalonadas de izquierda a derecha. El frame se sostiene quieto.

## Frame 3 — No es la cédula

- scene: Dos tarjetas lado a lado, constancia contra cédula; la constancia se queda con el sello de "la que te piden"
- voiceover: ""
- on_screen: "Ojo: no es la cédula" · Constancia: "Se genera cuando quieras" · "Datos al día" · "Con régimen y obligaciones" · sello "La que te piden" · Cédula: "Se emite una sola vez" · "Sin régimen ni obligaciones" · "Rara vez la piden"
- duration: 5s
- transition_in: push-slide LEFT
- status: built
- src: compositions/frames/03-no-es-la-cedula.html
- type: social_proof
- persuasion: Comparison of two options
- beat: "aha"
- blueprint: comparison-split (Adapt)
- focal: la tarjeta "Constancia" (izquierda)
- roles: tarjeta Constancia (tinte azul 15%, borde azul 45%) = foreground subject · tarjeta Cédula (gris claro, texto `text-light`) = supporting · título "No es la cédula" = foreground · eyebrow "OJO" + tag-pill = chrome
- sfx: none

narrativeRole: Desarma la confusión más común (hay dos documentos con el RFC) para que el espectador descargue el correcto.
keyMessage: La que te piden casi siempre es la constancia, no la cédula.

Adapt: se conserva la firma — **dos tarjetas del mismo peso entran desde alas opuestas con inclinación
espejo de "libro que se abre" y asientan lado a lado; las insignias puntúan al final**. Cambia: sin sombras
(el `frame.md` las prohíbe; el tinte y el borde hacen el relieve); la inclinación termina casi plana para que
el texto se lea; las insignias van arriba en cada tarjeta y entran sin overshoot.

Scene 1 (0.0–0.8s): el frame llega por `push-slide LEFT`. "No es la cédula" baja a su lugar desde un poco
más arriba (`gsap-effects`); eyebrow "OJO" y tag-pill asientan.

Scene 2 (0.5–1.8s): la firma — **entrada split-tilt** (`split-tilt-cards`): la tarjeta "Constancia" entra
desde la izquierda y la "Cédula" desde la derecha ~0.2s detrás, con `rotateY` espejo que se abre y escala
~0.9→1 al asentar. Pantalla dividida 50/50.

Scene 3 (1.8–3.6s): los renglones aparecen **en pares**, izquierda y luego derecha, ~0.45s entre par y par
(`dynamic-content-sequencing`): "Se genera cuando quieras" / "Se emite una sola vez" → "Datos al día" /
"Sin régimen ni obligaciones" → "Con régimen y obligaciones" (solo izquierda). Palomas en `primary`, ✗ en
`negative` en línea.

Scene 4 (3.6–5.0s): la insignia sólida "La que te piden" asienta arriba de la Constancia con un pop liso
(`spring-pop-entrance`, sin overshoot) y, 0.3s después, la insignia gris "Rara vez la piden" en la Cédula.
El frame se sostiene quieto.

## Frame 4 — Método 1: portal del SAT

- scene: A la izquierda una lista de 4 pasos que se va encendiendo; a la derecha un navegador que un cursor recorre de punta a punta: URL, inicio de sesión, generar, descargar el PDF
- voiceover: ""
- on_screen: "Método 1 · Portal del SAT" · pasos: "1 Entra a sat.gob.mx" · "2 Inicia sesión con tu RFC y contraseña (o e.firma)" · "3 Genera tu constancia" · "4 Descarga el PDF" · navegador: "sat.gob.mx/aplicacion/53027" · RFC de ejemplo "ABCD850101XY1" · "Constancia.pdf · Descargado" · sello final: "Listo en 2 a 5 minutos"
- duration: 12s
- transition_in: push-slide LEFT
- status: built
- src: compositions/frames/04-metodo-portal-sat.html
- type: feature_showcase
- persuasion: Numbered enumeration + demonstration
- beat: confidence
- blueprint: cursor-ui-demo (Adapt)
- focal: el navegador esquemático — instalar y personalizar el componente del registro `browser-device-stage` (cromo de navegador genérico con ranura de pantalla para la UI reconstruida)
- roles: navegador = foreground subject (columna derecha) · carril de 4 pasos = supporting (columna izquierda) · cursor = supporting actor, componente `oversized-cursor` · sello "Listo en 2 a 5 minutos" = foreground (cierre) · eyebrow "MÉTODO 1" + tag-pill "El más rápido" + h2 "Desde el portal del SAT" = header
- sfx: none

narrativeRole: El cuerpo del how-to: el camino más rápido, demostrado de principio a fin, con cada paso nombrado en el momento en que el cursor lo ejecuta.
keyMessage: Con tu RFC y tu contraseña la descargas en 2 a 5 minutos.

Adapt: se conserva la firma — **un cursor visible conduce una UI reconstruida con clics y la pantalla
responde en vivo, en el mismo tiempo de cada acción**. Cambia: cámara **fija** (escenario estático; la UI
hace todo el movimiento), y un carril de pasos a la izquierda se enciende con cada acción. El navegador es un
esquema genérico: barra de URL en píldora con candado, sin semáforos de sistema, sin identidad del SAT.

Scene 1 (0.0–1.2s): el frame llega por `push-slide LEFT`. Slide-header: eyebrow "MÉTODO 1" y tag-pill
"El más rápido"; "Desde el portal del SAT" entra por palabra (escalonado simple). El navegador
sube a la columna derecha (asimétrico 40/60) y el carril de 4 pasos aparece atenuado (todos al ~35%).

Scene 2 (1.2–3.6s) — paso 1: se enciende el paso 1 (círculo a `primary`, texto a `text`). En la barra
"sat.gob.mx/aplicacion/53027" se **escribe con caret** (`discrete-text-sequence`, con caret que parpadea en pasos discretos);
una barra de carga fina se llena (`stat-bars-and-fills`) y aparece la página: kicker "TRÁMITES DEL SAT",
"Genera tu Constancia de Situación Fiscal" y el botón "Iniciar".

Scene 3 (3.6–6.2s) — paso 2: se enciende el paso 2; la pantalla cambia al inicio de sesión (pestañas
"Contraseña · e.firma", campo RFC, campo contraseña). Se escribe "ABCD850101XY1" y luego los puntos de la
contraseña (`discrete-text-sequence`). El cursor (`oversized-cursor`) llega con desaceleración al botón
"Enviar" y hace **clic con onda** (`cursor-click-ripple`; el botón se hunde y recupera sin overshoot); la punta cae en la orilla
derecha del botón para no tapar la palabra.

Scene 4 (6.2–8.6s) — paso 3: se enciende el paso 3; un spinner gira una vuelta y media (finito) y el
mini-documento "CONSTANCIA DE SITUACIÓN FISCAL" se arma renglón por renglón (los mismos del 02: RFC
"ABCD850101XY1", Régimen, Domicilio, Estatus "Activo") en cascada.

Scene 5 (8.6–10.6s) — paso 4: se enciende el paso 4; el cursor hace clic en "Descargar PDF"; aparece la
tarjeta del archivo "Constancia.pdf" y su barra se llena a 100% (`stat-bars-and-fills`); "Descargado" con
paloma que se dibuja (trazo por stroke-dashoffset) en `positive`.

Scene 6 (10.6–12.0s): el sello "Listo en 2 a 5 minutos" asienta centrado bajo el escenario con
asentamiento largo. Todo queda quieto hasta el seam.

## Frame 5 — Método 2: app SAT ID

- scene: El mismo esquema de pasos a la izquierda; a la derecha un teléfono recorre la app: descarga, elegir trámite, INE y video-selfie, el correo con el PDF
- voiceover: ""
- on_screen: "Método 2 · App SAT ID" · "Si no tienes contraseña" · pasos: "1 Descarga SAT ID" · "2 Elige “Genera tu constancia”" · "3 Valida con tu INE y un video-selfie" · "4 Te llega por correo" · sello final: "En 1 a 5 días hábiles"
- duration: 9.5s
- transition_in: push-slide LEFT
- status: built
- src: compositions/frames/05-metodo-sat-id.html
- type: feature_showcase
- persuasion: Numbered enumeration + before/after (sin contraseña → con constancia)
- beat: momentum
- blueprint: device-surface-showcase (Adapt)
- focal: el teléfono — instalar y personalizar el componente del registro `device-frame-stage` (maqueta de teléfono con ranura de pantalla para UI reconstruida)
- roles: teléfono = foreground subject (columna derecha) · carril de 4 pasos = supporting (columna izquierda, misma geometría que el 04) · notificación "SAT · Tu constancia de situación fiscal (PDF)" = foreground (llegada) · píldora "1 a 5 días hábiles" = foreground (cierre) · eyebrow "MÉTODO 2" + tag-pill "Si no tienes contraseña" + h2 "Con la app SAT ID" = header
- sfx: none

narrativeRole: Cubre al que no tiene contraseña con la segunda vía oficial, en el mismo escenario de pasos para que se lea como continuación, y deja claro su costo: no es inmediata.
keyMessage: Sin contraseña también se puede, con SAT ID, pero llega por correo en días.

Adapt: se conserva la firma — **un dispositivo sostenido como héroe mientras sus pantallas recorren un
flujo real hasta completarlo** (variante stepwise-flow, sin cursor). Cambia: el carril de pasos del 04 vuelve
a la izquierda en la misma geometría; la selección se marca con una onda de toque, no con cursor. Las
pantallas son esquemas genéricos: ícono de app genérico (credencial en tile azul), sin el ícono ni el color
oficial de SAT ID.

Scene 1 (0.0–1.2s): el frame llega por `push-slide LEFT`. Slide-header: eyebrow "MÉTODO 2" y tag-pill
"Si no tienes contraseña"; "Con la app SAT ID" entra por palabra (escalonado simple). El teléfono
sube y asienta en la columna derecha; el carril de 4 pasos aparece atenuado.

Scene 2 (1.2–3.0s) — paso 1: se enciende el paso 1; la pantalla muestra la ficha de la app (tile de ícono,
"SAT ID", "Servicio de Administración Tributaria", "Gratis · iOS y Android"); el botón "Obtener" se hunde al
toque (compresión y recuperación lisa), pasa a un anillo de progreso (giro finito) y cambia a "Abrir"
(`discrete-text-sequence`).

Scene 3 (3.0–4.8s) — paso 2: se enciende el paso 2; la pantalla cambia al menú "¿Qué trámite quieres hacer?"
con tres opciones; una onda de toque (`cursor-click-ripple`, sin cursor) cae en "Genera tu constancia de
situación fiscal", que se resalta en azul.

Scene 4 (4.8–7.0s) — paso 3: se enciende el paso 3; la credencial INE aparece en un marco punteado y una
línea de escaneo la recorre una vez, de bajada y de subida (finita); paloma verde. Después el óvalo de la
cara con su escaneo y su paloma. Etiquetas "INE frente y reverso" y "Video-selfie".

Scene 5 (7.0–8.6s) — paso 4: se enciende el paso 4; baja la notificación "SAT · Tu constancia de situación
fiscal (PDF)" y aparece el sobre con su píldora "PDF" (la constancia vuelve: el hilo conductor llega).

Scene 6 (8.6–9.5s): la píldora "1 a 5 días hábiles" asienta bajo el sobre. Quieto hasta el seam.

## Frame 6 — Si algo falla

- scene: Tres tarjetas de problema → solución que se acumulan en lista; cierra con un tip al pie
- voiceover: ""
- on_screen: "¿No puedes descargarla?" · "¿Olvidaste tu RFC?" → "Consúltalo con tu CURP en rfc.sat.gob.mx" · "¿Sin contraseña?" → "Restablécela en SAT ID, sin cita" · "¿El portal no carga?" → "Entra antes de 9 a.m. o después de 6 p.m." · tip: "Pídela reciente: casi siempre la aceptan con máximo 3 meses"
- duration: 8.5s
- transition_in: push-slide LEFT
- status: built
- src: compositions/frames/06-si-algo-falla.html
- type: feature_showcase
- persuasion: Question→answer pairing + rule of three
- beat: reassurance
- blueprint: grid-card-assemble (Adapt)
- focal: la pila de tres tarjetas problema → solución
- roles: tarjetas = foreground subject · tip con regla izquierda azul (split-highlight) = supporting · título "¿No puedes descargarla?" = foreground · eyebrow "SI ALGO FALLA" + tag-pill = chrome
- sfx: none

narrativeRole: Quita los tres bloqueos reales que impiden terminar el trámite, para que nadie se quede a medias.
keyMessage: Cada bloqueo tiene salida, y casi todas son en línea y gratis.

Adapt: se conserva la firma — **los ítems pueblan una lista vertical uno a uno y se acumulan** (Benefits
vertical-list, modo BUILD). Cambia: cada ítem es una tarjeta de dos tiempos (primero el problema, luego su
solución), con tiempo de lectura entre tarjeta y tarjeta.

Scene 1 (0.0–1.0s): el frame llega por `push-slide LEFT`. Eyebrow "SI ALGO FALLA" y tag-pill asientan;
"¿No puedes descargarla?" entra por palabra (`dynamic-content-sequencing`).

Scene 2 (1.0–3.2s): la tarjeta 1 entra desde la derecha directo a su lugar (`center-outward-expansion`,
forma directa-al-slot) con el problema "¿Olvidaste tu RFC?" (ícono de lupa en `negative`); 0.6s después la
solución "Consúltalo con tu CURP · en rfc.sat.gob.mx" se revela tras una flecha que se dibuja
(`svg-path-draw`).

Scene 3 (3.2–5.2s): igual con la tarjeta 2: "¿Sin contraseña?" → "Restablécela en SAT ID · sin cita".

Scene 4 (5.2–7.2s): igual con la tarjeta 3: "¿El portal no carga?" → "Entra antes de 9 a.m. o después de 6 p.m.".

Scene 5 (7.2–8.5s): el tip sube con su regla azul a la izquierda: "Tip: pídela reciente, casi siempre la
aceptan con máximo 3 meses." Quieto hasta el seam.

## Frame 7 — El dato de heru

- scene: Un número sube hasta 64.8% y se asienta sobre la línea que explica qué significa
- voiceover: ""
- on_screen: "64.8%" · "vincula su cuenta del SAT / al primer intento" (dos renglones) · fuente: "Análisis heru de 334,124 conexiones"
- duration: 4.5s
- transition_in: crossfade
- status: built
- src: compositions/frames/07-dato-heru.html
- type: social_proof
- persuasion: Statistical proof
- beat: conviction
- blueprint: dataviz-countup (Adapt)
- focal: el numeral "64.8%" — instalar y personalizar el bloque del registro `mk-progress-stat` (numeral grande con conteo, pista de progreso y pie)
- roles: numeral en `primary` = foreground subject · pista de progreso (8% → relleno `primary`) = supporting · "vincula su cuenta del SAT / al primer intento" = foreground · fuente "334,124 conexiones de credenciales SAT analizadas por heru" = supporting (`text-light`)
- sfx: none

narrativeRole: Respalda "en minutos" con el único número propio del artículo y tiende el puente al CTA: vincular tu cuenta es fácil.
keyMessage: La mayoría lo logra al primer intento.

Adapt: se conserva la firma — **el número es el héroe y el conteo es el plano**. Cambia: sin cámara que
atraviese gráficas (una sola métrica centrada, estática); la pista de progreso acompaña al conteo.

Scene 1 (0.0–0.6s): el frame llega por `crossfade`. Eyebrow "ANÁLISIS HERU" y el numeral parado en "0%",
centrados (centro óptico ~42% de la altura); la pista vacía debajo.

Scene 2 (0.6–2.4s): **contador escalado por valor** (`counting-dynamic-scale`, crecimiento contenido)
0 → 64.8%, con `tabular-nums`, mientras la pista se llena a 64.8% en el mismo tiempo (`stat-bars-and-fills`).

Scene 3 (2.4–4.5s): al aterrizar, "vincula su cuenta del SAT / al primer intento" sube debajo y luego la
fuente en `text-light`. **Todo se queda absolutamente quieto**: es el frame sostenido del video.

## Frame 8 — heru se encarga del resto

- scene: Sobre el azul de heru, una línea de cierre da paso al logo que se arma, el lema y el botón "Empieza gratis"
- voiceover: ""
- on_screen: "Ya tienes tu constancia. Lo que sigue, déjaselo a heru." · logo heru · "impuestos sin estrés" · "Vincula tu RFC en 2 minutos" · botón "Empieza gratis" · "heru.app"
- duration: 6s
- transition_in: zoom-through
- status: built
- src: compositions/frames/08-heru-cta.html
- type: cta
- persuasion: Friction reduction + callback (vincular, igual que el dato)
- beat: resolve
- blueprint: logo-assemble-lockup (Adapt)
- focal: el wordmark heru en blanco (`assets/heru-wordmark-white.svg`); tomar como base el bloque del registro `logo-outro` (logo + lema + píldora de URL) sin su glow
- roles: wordmark = foreground subject · anillos concéntricos blancos al 16% = background (atmósfera de cierre) · "Vincula tu RFC en 2 minutos" = foreground · botón blanco "Empieza gratis" = foreground (CTA) · lema y URL = supporting
- sfx: none

narrativeRole: La única acción que se pide: una vez con tu constancia, pasar al siguiente paso lógico (declaraciones al día) con heru.
keyMessage: Vincula tu RFC con heru en 2 minutos y empieza gratis.

Adapt: se conserva la firma — **la marca llega a existir en pantalla y resuelve en un lockup centrado
extendido a CTA y URL**. Cambia: campo sólido `#1772C2` (como el cierre de heru-mensual); en vez de piezas
que orbitan, tres anillos concéntricos cierran hacia el centro y el wordmark se forma cuando llegan; sin
glow ni bloom.

Scene 1 (0.0–1.0s): el frame llega por `zoom-through`. "Ya tienes tu constancia. Lo que sigue, déjaselo a
heru." entra por palabra (escalonado simple) arriba, en blanco al 85%.

Scene 2 (0.6–2.0s): tres anillos concéntricos cierran hacia el centro (escala y opacidad);
al llegar, el wordmark blanco se forma al centro (escala 0.92→1 con fundido, asentamiento largo) y el lema
"impuestos sin estrés" aparece debajo con tracking amplio.

Scene 3 (2.0–3.4s): "Vincula tu RFC en 2 minutos" entra por palabra en h2 blanco.

Scene 4 (3.4–4.4s): el botón blanco "Empieza gratis" (texto `#1772C2`) asienta con pop liso
(`spring-pop-entrance`, sin overshoot); "heru.app" se construye segmento por segmento debajo
(`discrete-text-sequence`).

Scene 5 (4.4–6.0s): todo se sostiene **absolutamente quieto**. Es el único final real del video: termina
por fin de línea de tiempo, sin fundido.
