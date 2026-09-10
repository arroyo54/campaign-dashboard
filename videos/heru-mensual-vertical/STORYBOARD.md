---
format: 1080x1920
duration: 31.5s
message: "heru hace tus impuestos ante el SAT, mes a mes"
arc: BAB — Before (el pendiente que vuelve) → After (se resuelve solo) → Bridge (heru)
audience: Personas físicas en México que facturan — RESICO, plataformas, honorarios
mode: collaborative
music: none
---

## Video direction

**Paleta** (de `frame.md`, nada inventado) — lienzo `bg` blanco en los frames 1–6; el cierre
invierte a campo sólido `#1772C2`. Titulares en `text` casi negro; cuerpo en `text-muted`;
texto terciario e inactivo en `text-light`. `primary` (#1D8FF3) es el único acento y se reserva
para numerales, el estado activo y la palabra de énfasis; sobre tinte claro o a tamaño pequeño
baja a `#1772C2` para no romper AA. `positive` marca únicamente los sellos "Declarado".
Tarjetas: relleno cobalto 4%, borde cobalto 20% de 1.5px, radio 10–14px, **sin sombra**.
Chrome en píldora (100px). Tipografía Lexend Deca en los dos roles, por token, nunca por px.

**Gramática de movimiento** — asentamiento largo `power3` por defecto; suave le gana a rebotón.
Prohibidos `bounce.out` y `elastic.out` en todo el video, y `back.out` como entrada por defecto.
Única excepción, y es causal: la recuperación por muelle del botón al recibir el clic en el Frame 5
(`press-release-spring`) usa `back.out(1.6)`, dentro del rango 1.4–1.7 que la doctrina sanciona —
un botón que se hunde y no rebota se lee roto. Ningún otro elemento del video sobrepasa.
Toda entrada es `fromTo` con el estado inicial explícito. Nada de `repeat`/`yoyo`, `Math.random` ni reloj de pared: el render es determinista.

**Modelo de revelado — adaptado a un video mudo.** No hay voz que marque el pulso, así que las
revelaciones se pacen a la **cadencia de lectura**: cada línea en español entra, aterriza y sostiene
antes de que llegue la siguiente pieza, con ~0.5–0.9s entre revelaciones. Sigue prohibido
front-load: en t=0 sólo entra lo que el ojo necesita primero, y el resto se reparte hacia la
segunda mitad. Como nadie narra, el texto se gana un sostén más largo del que tendría con voz —
la quietud aquí es lectura, no vacío.

**Elemento portador** — la serie de 12 meses. Nace como tira en el Frame 1 (amenaza) y vuelve como
rejilla en el Frame 4 (producto), en el mismo orden. Es lo que cose el arco BAB; ningún frame la
reordena.

**Corriente** — IZQUIERDA. Los dos seams consecutivos de producto (3→4, 4→5) usan `push-slide LEFT`.
Los `zoom-through` de 1→2 y 5→6 son vectores reservados y se gastan sólo en frontera de capítulo:
dolor→promesa y producto→prueba.

**Ritmo y frames sostenidos** — el 2 y el 7 se sostienen a propósito: el 2 es el respiro después de
la ansiedad del 1, el 7 es la tarjeta final. El 6 aterriza su conteo y se queda quieto. Los frames
3, 4 y 5 son los que van revelando.

**Lista negativa** — nada de rebote ni overshoot; nada de respiración ociosa ni pan/push en la
segunda mitad (si no hay qué revelar, se sostiene quieto); ni barras de navegación, scrollbars o
chrome de navegador dibujados por nosotros (las capturas de la app son UI real e intencional, y
esas sí van); ni degradados decorativos ni formas genéricas sustituyendo un asset real. Los dos
modos de falla explícitamente vetados: **slideshow** (todo volcado en el primer 25% y luego
congelado) y **salvapantallas** (elementos flotando por su cuenta). Contenido planeado en el 83%
superior del lienzo; la única cosa en el borde inferior es la barra de progreso de 3px del preset.

**Audio** — ninguno. Video mudo por decisión del brief: sin narración, sin música, sin SFX. Ningún
frame nombra `sfx`.

## Frame 1 — Cada mes vuelve

- scene: La palabra "Cada mes" queda clavada mientras los 12 meses desfilan detrás; el ciclo se cierra en un pendiente sin resolver
- voiceover: ""
- on_screen: "Cada mes…" (fijo) · ENE · FEB · MAR · ABR · MAY · JUN · JUL · AGO · SEP · OCT · NOV · DIC (ciclando) · "…el mismo pendiente."
- duration: 5s
- transition_in: cut
- status: outline
- src: compositions/frames/01-cada-mes-vuelve.html
- type: pain_point
- persuasion: Pain validation
- beat: anxiety
- blueprint: kinetic-type-beats (Reproduce — sub-forma A, intercambio de token en línea fija)
- focal: — (frame tipográfico; sin assets, por decisión de historia)
- roles: —
- asset_candidates:

narrativeRole: Abre en la verdad que el espectador ya vive — el SAT no es un trámite anual, es un ciclo que vuelve. El ancla fija es la afirmación; el desfile de meses es la prueba.
keyMessage: Esto no se acaba nunca — vuelve cada mes.

Scene 1 (0.0–1.0s): campo blanco liso. "Cada mes" entra con **revelado escalonado por palabra**
(`dynamic-content-sequencing`) sobre asentamiento largo; se ancla a la izquierda del centro óptico.
La ranura del token queda visiblemente vacía a su derecha — el hueco es la promesa. Centrado
desplazado, ~55% del cuadro, cámara fija.

Scene 2 (1.0–2.6s): el motor del plano. La ranura hace **ciclo de token en sitio**
(`discrete-text-sequence`): ENE → FEB → MAR → … a corte duro, sin fundido ni roll, cadencia
constante. Debajo, la tira de 12 meses se revela en **cascada escalonada izquierda→derecha**, cada
chip encendiéndose justo cuando el token pasa por su mes. Tira de ancho completo en el tercio
inferior, dentro del 83% superior. La tira es el elemento portador: nace aquí.

Scene 3 (2.6–3.4s): el ciclo aterriza en SEP y el chip de SEP queda relleno en cobalto. **Quietud
antes del clímax** — 0.5s sin nada en vuelo. El cuadro respira antes de decir la mala noticia.

Scene 4 (3.4–5.0s): "…el mismo pendiente." se revela por palabra en `text-muted` bajo la línea fija,
y todo se sostiene quieto hasta el corte. Sin deriva, sin respiración: la lectura es el trabajo del
final del plano.
## Frame 2 — heru, mes a mes

- scene: El desfile se detiene en seco; el wordmark heru ocupa el centro y la promesa se arma en dos golpes de texto
- voiceover: ""
- on_screen: "heru" · "Hacemos tus impuestos ante el SAT." · "Mes a mes."
- duration: 4s
- transition_in: zoom-through
- status: outline
- src: compositions/frames/02-heru-mes-a-mes.html
- type: product_intro
- persuasion: Friction reduction
- beat: relief
- blueprint: titlecard-reveal (Adapt)
- focal: assets/07-logo-heru-white.png
- roles: 07-logo-heru-white.png = cutout (marca heroica, entintada en cobalto sobre blanco)
- asset_candidates: assets/07-logo-heru-white.png — wordmark heru en blanco con alfa, para el lockup central

narrativeRole: La promesa del brief, literal, en el beat 2. Todo lo que sigue es evidencia de esta frase.
keyMessage: heru se encarga, y se encarga cada mes.

Adapt: se conserva la firma — **un solo movimiento contenido y luego sostén quieto**. Lo que cambia:
la tarjeta única se reparte en marca + promesa a dos tiempos, y el panel diagonal de atmósfera del
preset (permitido sólo en portada/cierre) hace de capa de fondo.

Scene 1 (0.0–1.2s): el wordmark llega arriba a la izquierda con **un** movimiento — deslizamiento
ascendente con fundido cruzado, asentamiento largo. La `accent-line` se dibuja de izquierda a derecha
bajo él. Panel de tinte cobalto en diagonal ocupando la esquina superior derecha como fondo.
Asimétrico 60/40, 3 capas de profundidad.

Scene 2 (1.2–2.4s): "Hacemos tus impuestos ante el SAT." se revela **escalonada por palabra**
(`dynamic-content-sequencing`) en dos renglones, casi negro, cuerpo tipográfico display.

Scene 3 (2.4–4.0s): "Mes a mes." aterriza sola, en cobalto, en su propio tiempo — es el énfasis del
video entero. Después **el cuadro se sostiene completamente quieto**. Frame de respiro asignado en
Video direction: la promesa se lee sin competencia.
## Frame 3 — Se conecta una vez

- scene: Un teléfono entra en escena sosteniendo la pantalla real de "Conecta tu cuenta del SAT"; el badge "Encriptado" se enciende al final
- voiceover: ""
- on_screen: "Lo conectas una vez." · micro-línea: "e.firma · cifrado de extremo a extremo"
- duration: 5s
- transition_in: crossfade
- status: outline
- src: compositions/frames/03-conectas-una-vez.html
- type: feature_showcase
- persuasion: Friction reduction
- beat: ease
- blueprint: device-surface-showcase (Adapt)
- focal: assets/03-conecta-sat-efirma.jpg
- roles: 03-conecta-sat-efirma.jpg = cutout (pantalla heroica dentro de la maqueta de teléfono)
- asset_candidates: assets/03-conecta-sat-efirma.jpg — pantalla real de vinculación con e.firma (.cer/.key), badge "Encriptado 🔒", 1080x2108

narrativeRole: Responde la objeción inmediata — "¿y cuánto trabajo me cuesta a mí?". Una vez. El resto es de heru.
keyMessage: El esfuerzo del usuario es una sola vez, al principio.

Adapt: se conserva la firma — **el dispositivo sostenido como héroe** con encuadre estático. Lo que
cambia: una sola pantalla en vez de un flujo que cicla, porque el argumento del beat es precisamente
que esto pasa *una vez*. Un flujo que cicla contradiría la línea.

Scene 1 (0.0–1.1s): el teléfono entra desde la derecha sobre la corriente, **ya en movimiento** al
abrir el plano, y asienta a la derecha del centro. Asimétrico 55/45, 3 capas de profundidad.

Scene 2 (1.1–2.1s): la píldora "Paso único" asienta arriba a la izquierda con un pop suave de
asentamiento largo (`spring-pop-entrance`, registro liso — sin overshoot).

Scene 3 (2.1–3.3s): "Lo conectas una vez." se revela **escalonada por palabra**, alineada a la
píldora.

Scene 4 (3.3–5.0s): el badge "Encriptado" de la captura recibe un **destello de palabra clave** de
un solo disparo (`asr-keyword-glow`, disparo único, sin rail de audio) — es el detalle de confianza
del plano; debajo del titular sube la micro-línea "e.firma · cifrado de extremo a extremo". Cierra
sostenido y quieto.
## Frame 4 — Y cada mes se declara solo

- scene: Vuelve la rejilla de 12 meses del Frame 1, pero ahora cada casilla se sella "Declarado" en cascada; al lado, el buzón tributario vacío
- voiceover: ""
- on_screen: "Después, cada mes se declara solo." · sellos: "Declarado" ×12 · "Tu buzón está vacío"
- duration: 5s
- transition_in: push-slide LEFT
- status: outline
- src: compositions/frames/04-cada-mes-solo.html
- type: benefit_highlight
- persuasion: Future pacing
- beat: peace of mind
- blueprint: grid-card-assemble (Reproduce)
- focal: assets/06-buzon-tributario.jpg
- roles: 06-buzon-tributario.jpg = supporting (la prueba de calma, a la derecha)
- asset_candidates: assets/06-buzon-tributario.jpg — buzón tributario vacío, "Cuando el SAT te envíe notificaciones o documentos, aparecerán aquí", 1080x2108

narrativeRole: El pago del Frame 1. Misma rejilla, resultado opuesto — la recurrencia deja de ser amenaza y se vuelve el producto.
keyMessage: El ciclo sigue, pero ya no es tuyo.

Scene 1 (0.0–1.0s): "Después, cada mes se declara solo." se revela **escalonada por palabra** arriba
a la izquierda; en el mismo tiempo el teléfono entra desde la derecha sobre la corriente y asienta.
Asimétrico 60/40, 3 capas.

Scene 2 (1.0–2.4s): la firma del blueprint — las 12 tarjetas de mes **se autoensamblan en cascada
escalonada** hacia una rejilla 4×3, en el mismo orden ENE→DIC de la tira del Frame 1. El portador
vuelve, y vuelve reconocible.

Scene 3 (2.4–3.6s): segunda pasada escalonada: el sello "✓ Declarado" aterriza tarjeta por tarjeta
en `positive`. El ciclo que en el Frame 1 era amenaza aquí se cierra solo, a la vista.

Scene 4 (3.6–5.0s): en el mismo fotograma en que cae el último sello, "Tu buzón está vacío" dentro
del teléfono recibe un destello de palabra clave de un disparo — causa y efecto en el mismo tiempo.
El cuadro asienta y se queda quieto.
## Frame 5 — Y facturar, gratis

- scene: Un cursor grande entra y toca "Nueva factura" en el teléfono; las cuatro tarjetas de tipo de factura se abren detrás
- voiceover: ""
- on_screen: "Y facturar, gratis." · tarjetas: Ingreso · Egreso · Pago · Comp. · micro-línea: "en menos de 1 minuto"
- duration: 4s
- transition_in: push-slide LEFT
- status: outline
- src: compositions/frames/05-facturar-gratis.html
- type: feature_showcase
- persuasion: Value stacking
- beat: control
- blueprint: cursor-ui-demo (Adapt)
- focal: assets/04-facturacion.jpg
- roles: 04-facturacion.jpg = cutout (pantalla heroica dentro de la maqueta de teléfono)
- asset_candidates: assets/04-facturacion.jpg — pantalla real de Facturación: "Facturar es gratis / Genera todas tus facturas del SAT en menos de 1 minuto con heru", tarjetas Ingreso/Egreso/Pago/Comp. y botón "Nueva factura", 1080x2108

narrativeRole: Apila valor una sola vez, después de que la promesa ya está pagada — heru no sólo declara, también cubre el otro trámite recurrente, y ese sale gratis.
keyMessage: El paquete es más grande de lo que prometió, y la parte extra no cuesta.

Adapt: se conserva la firma — **un cursor sobredimensionado conduce la superficie y su clic enciende
el siguiente beat**. Lo que cambia: la captura es estática, así que el clic no cambia el estado de la
pantalla; enciende el texto y las píldoras. El clic sigue siendo la causa, que es lo que la firma
pide.

Scene 1 (0.0–0.9s): el teléfono ya está compuesto a la izquierda del centro, entrando en vuelo bajo
el seam `push-slide LEFT` (nunca desde el reposo). El cursor sobredimensionado entra **desde fuera de
cuadro** por la esquina inferior derecha sobre una curva de acercamiento.

Scene 2 (0.9–1.5s): la punta del cursor llega al botón "Nueva factura" y da el **toque de clic** —
el cursor comprime, el botón se hunde y suelta, un solo anillo se expande
(`cursor-click-ripple` + `press-release-spring`).

Scene 3 (1.5–2.6s): **encendido en el mismo fotograma del clic**: "Y facturar, gratis." se revela
escalonada por palabra a la derecha. La causa y el efecto comparten posición en la línea de tiempo,
no "poco después".

Scene 4 (2.6–4.0s): las cuatro píldoras de tipo de factura (Ingreso · Egreso · Pago · Comp.) salen
del punto del clic en **expansión de racimo hacia afuera** (`center-outward-expansion`); la
micro-línea "en menos de 1 minuto" sube debajo del titular. Sostiene.
## Frame 6 — 50,000 ya duermen tranquilos

- scene: Un contador sube hasta 50,000 y se asienta bajo una línea corta de respaldo
- voiceover: ""
- on_screen: "+50,000" · "contribuyentes en México ya declaran tranquilos."
- duration: 4s
- transition_in: zoom-through
- status: outline
- src: compositions/frames/06-cincuenta-mil.html
- type: social_proof
- persuasion: Social proof
- beat: trust
- blueprint: dataviz-countup (Adapt)
- focal: — (frame de dato; sin assets, por decisión de historia)
- roles: —
- asset_candidates:

narrativeRole: Cierra el riesgo percibido con el único número que el sitio respalda.
keyMessage: No eres el primero en soltarlo.

Adapt: se conserva la firma — **el número es el héroe y el conteo es el plano**. Lo que cambia: se
elimina la cámara que atraviesa la gráfica, porque no hay gráfica que atravesar; una sola métrica
centrada, sin montaje de stats.

Scene 1 (0.0–0.6s): la `accent-line` se dibuja y el contador aparece parado en "+0", centrado.
Centrado, ~55% del cuadro.

Scene 2 (0.6–2.4s): **contador escalado por valor** (`counting-dynamic-scale`): trepa 0 → 50,000 y
su cuerpo tipográfico crece con la cifra, de modo que la subida misma escala. Numerales en cobalto,
`tabular-nums` para que no bailen los dígitos.

Scene 3 (2.4–4.0s): al aterrizar la cifra, "contribuyentes en México ya declaran tranquilos." se
revela debajo y el cuadro se queda quieto. Sin deriva: el número aguanta solo.
## Frame 7 — heru.app

- scene: El wordmark se arma sobre el azul de marca, la URL aterriza debajo y la oferta cierra en una línea
- voiceover: ""
- on_screen: "heru" · "heru.app" · "Tu primer mes va por nuestra cuenta."
- duration: 4.5s
- transition_in: crossfade
- status: outline
- src: compositions/frames/07-heru-app.html
- type: cta
- persuasion: Risk reversal
- beat: urgency-to-act
- blueprint: logo-assemble-lockup (Adapt)
- focal: assets/07-logo-heru-white.png
- roles: 07-logo-heru-white.png = cutout (marca blanca sobre el campo cobalto)
- asset_candidates: assets/07-logo-heru-white.png — wordmark heru en blanco con alfa, sobre campo azul #1D8FF3

narrativeRole: La única acción que se pide, con el riesgo ya retirado por la oferta que heru ya comunica en su propio banner.
keyMessage: Entrar no cuesta nada este mes.

Adapt: se conserva la firma — **la marca llega a existir en pantalla** y resuelve en lockup centrado.
Lo que cambia: en vez de satélites que orbitan y se despejan, dos anillos concéntricos cierran hacia
el centro y la marca se forma al llegar ellos. Mismo mecanismo, vocabulario de la propia app.

Scene 1 (0.0–1.2s): campo cobalto sólido. Dos anillos concéntricos cierran hacia dentro desde más
allá del cuadro; el wordmark blanco se forma en el centro en el momento en que llegan. Centrado,
atmósfera de cierre permitida por el preset.

Scene 2 (1.2–2.2s): "heru.app" se construye **segmento por segmento** debajo de la marca
(`discrete-text-sequence`).

Scene 3 (2.2–3.2s): la píldora blanca con "Tu primer mes va por nuestra cuenta." asienta debajo con
un pop liso de asentamiento largo.

Scene 4 (3.2–4.5s): todo se sostiene **absolutamente quieto**. Es la tarjeta final y el único frame
del video con un final real en vez de un seam inyectado; termina en negro sólo por fin de línea de
tiempo, no por un fundido.
