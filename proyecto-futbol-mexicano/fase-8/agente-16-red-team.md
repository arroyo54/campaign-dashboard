# Agente 16 — Red Team del PNTFM (Fase 8)

**Proyecto:** PNTFM · **Fase:** 8 · **Autor:** Agente 16 (equipo crítico independiente) · **Versión:** 1.0 (2026-07-24)
**Corpus atacado:** F6 (integración preliminar), F7 (A14 presupuesto, A15 hoja de ruta, reconciliación Control 6), F3 (línea base), F4 (matriz de transferibilidad), lectura selectiva de F5 (A6–A13) y F2 (A1–A4), contra las reglas de F1 (manual metodológico y criterios reformar vs. crear).
**Mandato:** atacar, no acompañar. Cada crítica busca matar o herir algo específico. Cuando el ataque fracasa, se dice (regla del manual §8.5: el veredicto MANTENER exige honestidad del atacante, no solo del atacado).

**Convención de formato por crítica:** 1. Problema · 2. Evidencia/razonamiento · 3. Gravedad · 4. Consecuencia si no se corrige · 5. Corrección propuesta · 6. Veredicto recomendado.

**Resumen del ataque:** 32 críticas — 6 críticas, 11 altas, 15 medias. Ningún ataque encontró fraude metodológico: el corpus es inusualmente honesto consigo mismo. Precisamente por eso los golpes más duros no son "les faltó ver X", sino "vieron X, lo registraron, y construyeron encima como si registrarlo lo neutralizara". El registro de un riesgo no es su mitigación.

---

## SECCIÓN I — CRÍTICAS DE GRAVEDAD CRÍTICA

### RT-001 · La "Velocidad 1 sin permiso de nadie" pide permiso, en la mitad de sus piezas, al actor que el propio plan clasifica como bloqueador

1. **Problema:** el plan afirma que los 100 días y el año 1 "no requieren permiso de nadie que pueda negarlo" (A15 §1.1, §4), pero cerca de la mitad de las acciones de Velocidad 1 son actos ejecutivos de la FMF — y la FMF es, según el diagnóstico central del propio plan, propiedad operativa de la asamblea de dueños.
2. **Evidencia:** A2: el Comisionado es designado y removible de facto por la asamblea; Rodríguez renunció (dic. 2024) por proponer exactamente lo que este plan propone; "el comisionado tiene mandato ejecutivo solo mientras no toque la estructura de ingresos ni la soberanía individual de los clubes" (A2 §5.2). Crúcese con los 100 días (A15 §4.1): contrato COMET, convenio de datos, DPO, circular art. 19 + unidad jurídica, censo de diáspora, ventanilla de solidaridad, cooperación con el examen de auditoría FIFA y expedientes 2025, registro de conflictos de interés — todo acto FMF. El único plan B declarado es el de la ficha (RG-FOR-001: "arranca en SEP"). Varias de esas piezas tocan directamente los intereses de los dueños (expedientes, conflictos de interés, art. 27), y el pacto del "núcleo día 1" lista a "FMF (Comisionado)" como firmante fundador (A15 §8): el plan necesita del empleado de su adversario para el 40–50% de su fase supuestamente incondicionada.
3. **Gravedad:** crítica.
4. **Consecuencia:** la Velocidad 1 se degrada a una segunda mesa de negociación no declarada: cada pieza FMF puede dilatarse sin costo, y el "expediente de los 100 días" llega a la asamblea 2027 incompleto justo en sus componentes federativos. La palanca de "el costo de quedarse fuera crece solo" (A15 §9.2.6) puede vaciarse desde dentro.
5. **Corrección:** plan B estatal o externo declarado para CADA acción FMF de los 100 días: censo de diáspora vía SRE-universidades; ventanilla de solidaridad como servicio AMFpro-Clearing House; registro de conflictos como requisito de REC-GOB-001, no acto voluntario. Reclasificar en el cronograma las acciones FMF-dependientes con señal de dilación y fecha de activación del plan B.
6. **Veredicto: MODIFICAR** (la arquitectura de dos velocidades sobrevive; su etiqueta de incondicionalidad no).

### RT-002 · La "pieza más importante de todo el benchmark" se sostiene sobre una cifra de un solo año y se financia del tumor que promete extirpar

1. **Problema:** la compensación doméstica del 5% es a la vez (a) dimensionada sobre la extrapolación de un único año récord y (b) estructuralmente contradictoria: su recaudación es proporcional al sobreprecio interno que el plan declara querer deprimir.
2. **Evidencia:** el ~70 MDP/año de la fuente 1a proviene del récord 2025-26 (1,392 MDP en 61 traspasos); A14 lo confiesa en Q-FIN-004 ("extrapolación de un solo año récord"). A6 declara la depresión de precios internos como "efecto buscado" de la propia compensación, y la tesis exportadora exige acercar el precio interno al exportable: si el plan funciona, la base gravable del 5% se contrae y el Fondo de Desarrollo —del que depende ~40% del régimen de A6 (180–280 MDP/año, A14 §4.3)— se desfinancia por éxito, no solo por elusión (RG-FIN-001 solo modela la elusión). Segundo filo: 70 MDP/año pro rata entre los registros 6–21 de 1.5 M de fichas es un incentivo de decenas de pesos por niño-año; la vara la da el propio corpus: el MIS entero (18–30 MDP/año) "es menor que una sola multa de la regla de menores" (A13 §22) — el flujo anual del 5% equivale a dos o tres multas, y sobre él cuelga el título de "pieza única más importante de todo el benchmark" (F4/A6) y "la cláusula más valiosa del paquete de asamblea" (A14). Decisión fuerte sobre cifra débil, de manual.
3. **Gravedad:** crítica.
4. **Consecuencia:** el paquete de asamblea gasta su capital político en una pieza de efecto-incentivo posiblemente cosmético, con una fuente "contracíclica" (A14 §8.3) que es procíclica respecto de la patología. Cuando la recaudación decepcione, "la asamblea cumplió y no sirvió" armará a los bloqueadores para siempre.
5. **Corrección:** (i) simular la recaudación con L1/L7 sobre 5+ temporadas antes de fijar el porcentaje (quizá 8–10%, o mínimo fijo por transferencia); (ii) desacoplar el Fondo de Desarrollo de los traspasos internos con piso de aportación de liga indexado a ingresos de TV; (iii) declarar la trayectoria decreciente esperada de la fuente 1a y su sustituto (solidaridad internacional, fuente 7).
6. **Veredicto: MODIFICAR** (el mecanismo es correcto; su dimensionamiento y su narrativa de "pieza estrella" no resisten).

### RT-003 · El paquete de asamblea 2027 no contiene la moneda que el propio plan dice que los dueños cobran

1. **Problema:** el plan demuestra (SUP-002, validado como hallazgo) que los dueños solo cooperan por dinero o inmunidad, y luego les presenta en 2027 un paquete cuya "zanahoria" — el GAM — es en términos netos una expropiación: las plazas 7–9 de extranjeros, hoy derecho automático, pasan a ganarse anualmente.
2. **Evidencia:** REC-FOR-008: "las plazas 7, 8 y 9 dejan de ser automáticas" — para un club de chequera, el statu quo ya le da gratis lo que el GAM le obliga a comprar con puntos. La moneda real identificada por el propio plan ("revalorización vía centralización con reparto favorable + inmunidad", F6 §3.1) está reservada a la Velocidad 2, que NO está en la mesa 2027. El intercambio ofrece así garrote (liguilla, licencia 4★, compensación), zanahoria negativa (GAM) y una contingencia que solo encarece bloquear UNA de las ocho piezas (la ley del formador cubre la compensación; para GAM, regla de menores deportiva y licencia no existe vía estatal — mapa A3 filas 1–2). A6 afirma "el GAM funciona porque los dueños cooperan cuando reciben flexibilidad" — pero el GAM no da flexibilidad: la quita y la revende.
3. **Gravedad:** crítica.
4. **Consecuencia:** la mutilación del paquete (RG-IMP-001, "el riesgo #1 del plan") no es un riesgo: es el resultado esperado de la estructura del intercambio — se aprueba lo que no cuesta y se diluyen garrote y GAM, el patrón "aprobación en principio" que A2 documenta.
5. **Corrección:** o el paquete 2027 incorpora una fracción real de la moneda de Velocidad 2 (mandato de negociar la centralización con reparto favorable, condicionado al paquete íntegro — adelantar el precio, no la reforma), o el GAM se rediseña aditivo (plazas 10–11 nuevas ganables, sin tocar las 9 existentes en fase 1), o se reconoce que 2027 es la primera de varias asambleas y se re-secuencia qué pieza se compra con qué.
6. **Veredicto: MODIFICAR** (el diseño del intercambio, no sus componentes técnicos).

### RT-004 · El único escenario financiable sin milagros políticos es, por confesión propia, un escenario que no cumple el mandato

1. **Problema:** la cadena de dependencias del plan forma un círculo cuya única salida es exógena: exportar exige bajar el sobreprecio → exige compensación + GAM → exige asamblea → exige moneda → la moneda real es la centralización → es Velocidad 2 → exige ventana → la señal de ventana más probable es el fracaso deportivo — que el escenario financiable no evita, porque "el conservador arregla la base y la vista del sistema, pero no toca los incentivos del tramo profesional — el motor causal identificado por A4 queda intacto" (A14 §4.2, confesión textual).
2. **Evidencia:** A14 §9: el intermedio exige dos llaves simultáneas; el transformador es "NO financiable sin Velocidad 2". La línea base (F3 §1) establece que el problema es de incentivos, no de activos — y el único escenario que no depende de los bloqueadores (conservador) es el que no toca los incentivos. El plan es un excelente plan condicional; su rama incondicional es "contención, no transformación" (palabras de A14).
3. **Gravedad:** crítica — no porque sea un error oculto (está declarado), sino porque está declarado en la página 83 de un anexo y no en la primera línea del paquete que firmará el pacto.
4. **Consecuencia:** los firmantes y la opinión pública comprarán "el plan que resuelve el fútbol mexicano" cuando lo ejecutable sin asamblea es "el plan que prepara el terreno y espera". Al descubrirse, la Carta absorberá un golpe que ningún protocolo de fallo amortigua: el fallo no será de un hito sino del contrato narrativo fundacional.
5. **Corrección:** que la Carta y el resumen ejecutivo digan, con la franqueza de A14 §9: "sin paquete de asamblea y sin ventana de gobernanza, este plan mejora acceso, protección y datos, y NO producirá por sí solo el salto exportador ni de élite; deja armada la reforma para cuando sea posible". La frase existe dispersa; debe existir junta y firmada.
6. **Veredicto: MANTENER la arquitectura, MODIFICAR la declaración** — el ataque no encuentra alternativa superior (ninguna existe dentro de las restricciones documentadas), pero exige que el plan venda lo que es.

### RT-005 · El "escenario de planeación recomendado" tiene, según los propios registros de riesgo del plan, probabilidad minoritaria de existir

1. **Problema:** A14 recomienda planear con el intermedio, que exige la materialización simultánea de dos eventos a los que el propio plan asigna probabilidad de fallo media-alta cada uno.
2. **Evidencia:** dos llaves (A14 §9: "sin paquete de asamblea O sin reorientación local verificada por L2, el intermedio NO es financiable"). RG-IMP-001: prob. media-alta. RG-FIN-003: prob. media-alta. Tomando "media-alta" como ~50–60% de fallo, la probabilidad conjunta de que ambas llaves giren es ~15–25% — y están correlacionadas positivamente (un clima político adverso daña ambas), lo que empeora el número. El "caso malo compuesto" de A14 §8.2 ("la combinación de tres eventos individualmente probables") es en rigor el caso central — A14 casi lo admite al volver el estrés "el segundo presupuesto obligatorio".
3. **Gravedad:** crítica (de encuadre, no de aritmética: la aritmética de A14 es honesta).
4. **Consecuencia:** convenios, RACI y expectativas de la ola 1–2 dimensionados contra un flujo que probablemente no llegará completo; DEC-012 absorberá el hueco en silencio (RT-021) y el plan vivirá en su escenario de estrés mientras comunica el intermedio.
5. **Corrección:** invertir la carga: el caso base de planeación, contratación y comunicación es conservador+cámara (el resultado del estrés que A14 ya diseñó); el intermedio se estructura como paquete de expansión con gatillos verificables (asamblea íntegra + L2 ≥ X%). Cambia qué se firma en los convenios de la cohorte 1.
6. **Veredicto: MODIFICAR.**

### RT-006 · La Carta 2026–2046 firmará metas de resultado (2038–2046) que solo el escenario congelado puede producir

1. **Problema:** los hitos 2038/2046 de la Carta (15–20 y luego 25–35 exportaciones/año, 60+ en Europa, élite estable ≥60–80) presuponen el motor exportador del paquete estructural pleno y/o la Velocidad 2; la Carta, sin embargo, se firma en T0+60 sin condicionar esos hitos al escenario.
2. **Evidencia:** A15 §5.4–5.5 fija esas metas como "de resultado"; A14 §9 dictamina el transformador congelado y el intermedio descubierto en el techo; la calibración F4 §4 liga el pipeline exportador (12–17 años) a reformas de incentivos de los años 1–5 — las piezas condicionadas a asamblea/ventana. Si el plan corre en conservador (RT-005), en 2038 el protocolo de fallo se activará en cadena sobre hitos que nunca fueron alcanzables en ese escenario. Japón falló UN hito y sobrevivió; fallar sistemáticamente por diseño es otra cosa.
3. **Gravedad:** crítica (la prudencia de metas del plan se contradice a sí misma).
4. **Consecuencia:** destrucción diferida del activo narrativo más valioso del plan, justo cuando debe renovarse la segunda generación de convenios (2036–2040).
5. **Corrección:** Carta con hitos en dos columnas: "trayectoria base" (alcanzable en conservador: acceso, protección, registro, entrenadores, retención) y "trayectoria condicionada" (exportación/élite, marcada con sus llaves: asamblea íntegra, ventana). La revisión de medio camino (2036) ya prevista decide si la columna condicionada se activa, se recalienta o se archiva con explicación pública.
6. **Veredicto: MODIFICAR.**

---

## SECCIÓN II — CRÍTICAS DE GRAVEDAD ALTA

### RT-007 · La robustez "a ambos escenarios" de la capacidad ociosa es arquitectónica, no presupuestal

1. **Problema:** A9 declara el diseño robusto a que SUP-A1-003 (50–70% de deterioro; proxy: un solo estudio de Edomex) sea falso, pero el presupuesto del pilar más caro del plan no lo es.
2. **Evidencia:** A9 concentra 7,400–10,700 MDP (≈45% del CAPEX intermedio) con confianza de origen "Baja" (A14 §4.1). La "regla de oro" (rehabilitar = 1/5–1/10 de construir) solo protege contra obra nueva prematura (franja B); no contra el escenario maligno intermedio: deterioro tan profundo que la "rehabilitación integral" (0.8–2.5 MDP) es de facto reconstrucción, o parque ocupado sin horas-cancha que liberar. En ambos casos el costo por hora-cancha incremental se multiplica y el dictamen "conservador financiable con holgura" — que descansa en que A9-núcleo cueste 2,800–4,400 — se erosiona. CTR-003 congela la construcción; nada congela la mezcla ni el unitario de rehabilitación.
3. **Gravedad:** alta.
4. **Consecuencia:** el escenario base puede descubrirse 20–35% más caro en su rubro dominante después de firmar la cohorte 1 de municipios.
5. **Corrección:** compuerta presupuestal post-L3 simétrica a la de franja B: los rangos de A9-núcleo se re-dictaminan por A14 con los datos muestrales ANTES de comprometer la cohorte nacional.
6. **Veredicto: MODIFICAR.**

### RT-008 · La NOM: plazo optimista, litigio subestimado y — lo letal — verificación sin músculo

1. **Problema:** la pieza que cierra "el vacío más grave del sistema" depende de un proceso CONAMER cuyo plazo el plan no conoce, enfrentará amparos masivos de un sector cuyo modelo de negocio criminaliza parcialmente, y será verificada por una Profeco cuya capacidad demostrada es de 33 inspecciones.
2. **Evidencia:** Q-IMP-005 confiesa la incógnita del plazo ("¿12 o 24 meses?") con la vigencia 2028 colgando de la respuesta; A3 §5.10 reconoce el litigio ("amparo... superable con razonabilidad y gradualidad") sin dimensionarlo — el universo regulado son miles de academias informales a las que la NOM prohíbe ingresos actuales (cobro por visoría, promesas): incentivo máximo y coordinable a la suspensión judicial. El precedente de capacidad es "PROFECO ya revisó 33 escuelas (2026)" contra ~2,500 academias solo del portal FMF más el mercado no afiliado, con 12–24 MDP presupuestados para verificación nacional (A15 §5.2). El propio A3 lista "inaplicación por falta de sanción/inspección" como riesgo — sin partida seria. La contingencia (capítulo LGCFD si la NOM falla a 3 años, evaluación 2031) pone el horizonte real de solución del "vacío más grave del sistema" en 2032+.
3. **Gravedad:** alta.
4. **Consecuencia:** una NOM vigente e inaplicada es peor que ninguna: legitima con sello oficial a los incumplidores no inspeccionados y quema la vía regulatoria estrella del perímetro DEC-007.
5. **Corrección:** (i) presupuestar verificación con unidades verificadoras acreditadas privadas (la Ley de Infraestructura de la Calidad lo permite: terceros acreditados cobran al verificado — escala sin presupuesto público); (ii) estrategia anti-amparo explícita (gradualidad por tamaño ya prevista + entrada en vigor escalonada + defensa jurídica presupuestada); (iii) asumir vigencia 2029 en el caso base del cronograma y tratar 2028 como upside.
6. **Veredicto: MODIFICAR.**

### RT-009 · Las compuertas de protección no cubren a la ola masiva del año 1: protegen el escalamiento futuro, no a los primeros cientos de miles de niños

1. **Problema:** la regla "la protección es prerrequisito del escalamiento" (E-3/RG-NAC-008) se aplica al escalamiento — pero la Liga Escolar arranca en 8 estados en el ciclo 2027-28 y el piloto metropolitano incorpora a decenas de miles de menores, mientras la verificación de antecedentes como condición universal de padrón es 2028–2029 y el piloto de salvaguarda (Hidalgo–Oaxaca) no concluye hasta 2028.
2. **Evidencia:** A15 §5.1 (Liga Escolar 8 estados + piloto ZM Valle de México, ciclo 2027-28) vs. §5.2 ("Salvaguarda universal de padrón... 2028–2029", dependiente de "PIL-2027-02 exitoso"). E-2/E-3 exigen verificación "como condición de alta" — pero el personal de la ola 1 escolar se da de alta antes de que exista el sistema de verificación a escala. La señal temprana de RG-IMP-003 ("compuertas reportadas en verde sin verificación") no es una desviación posible: es la descripción literal del año 1 calendarizado.
3. **Gravedad:** alta (impacto potencial crítico).
4. **Consecuencia:** el plan asume el riesgo humano y reputacional máximo en su ventana de legitimación, con la protección a medio construir; un solo caso grave en 2027 activa la peor versión de RG-NAC-008 antes de que exista el MIS a escala.
5. **Corrección:** paquete de salvaguarda mínimo viable como cláusula suspensiva de TODO convenio de la ola 1 (antecedentes penales + responsable designado por plantel + canal provisional vía Procuradurías, sin esperar al MIS pleno ni al módulo MUCEF). Más lento y caro en 2027: es el costo de que la compuerta sea compuerta.
6. **Veredicto: MODIFICAR.**

### RT-010 · El MIS está dimensionado para ser conciencia, no para investigar

1. **Problema:** un panel de 8–12 investigadores con 18–30 MDP/año es el aparato de investigación de un sistema con meta de 1.5 M de fichas en 2030 (y 2.5 M en 2034), salvaguarda universal de padrón, canal multicanal anónimo con respuesta ≤72 h y ventanilla ampliada a integridad (REC-INT-001: "una sola puerta, dos materias").
2. **Evidencia:** el ratio de diseño es ~1 investigador por 125,000–190,000 menores registrados, antes de sumar amaños, apuestas y visorías. Q-PRO-102 confiesa que la prevalencia es desconocida (el dimensionamiento no tiene denominador); Q-IMP-003, que la capacidad de las 32 Procuradurías — destino obligatorio de todo posible delito — es desconocida. Y el financiamiento incluye "derechos de certificación A6 + aportación de liga": dinero cuyo ORIGEN depende de los potencialmente investigados (control ≠ origen; la asfixia presupuestal es deniable). La jerarquía de estrés de A14 protege primero al MIS — protege un presupuesto cuyo tamaño base ya es simbólico frente al perímetro.
3. **Gravedad:** alta.
4. **Consecuencia:** teatro de salvaguarda: canal que recibe y no puede investigar, ≤72 h cumplidas con respuestas formularias, canalizaciones a Procuradurías saturadas que archivan. Lo más peligroso no es el MIS capturado (RG-PRO-002): es el MIS honesto e impotente dando cobertura de "sistema con salvaguarda" a un sistema sin capacidad de salvaguarda.
5. **Corrección:** (i) plantilla indexada al padrón (X investigadores por 100,000 fichas activas, en reglas del pacto); (ii) el piloto Hidalgo–Oaxaca produce la tasa de denuncia por 10,000 menores como su dato principal y re-dimensiona el MIS ANTES del escalamiento 2028; (iii) financiamiento 100% piso público + bolsa del pacto, cero flujos de origen federativo/certificación.
6. **Veredicto: MODIFICAR.**

### RT-011 · El cronograma planifica con la sanción que el propio plan registró como invotable

1. **Problema:** la exclusión de liguilla —el "garrote" del paquete— tiene viabilidad de asamblea "baja" según el registro de contradicciones del propio plan (CTR-005), y aun así el cronograma años 2–4 la escribe como resultado esperado ("18/18 clubes cumpliendo o excluidos").
2. **Evidencia:** F6 §4 registra CTR-005 (la liguilla es el activo de rating de las televisoras — dueñas de clubes y compradoras de derechos) y resuelve "diseño preferente con alternativa escalonada... la decisión final es del paquete de negociación": el plan sabe que venderá la alternativa (veto de registro de refuerzos) y calendariza la preferente. La lógica causal de A6 descansa en que la sanción duela como la liguilla duele; el veto de refuerzos duele mucho menos y su efecto no está modelado.
3. **Gravedad:** alta.
4. **Consecuencia:** la corrección del fracaso documentado (7/18 incumplían la multa) entra al sistema en versión débil sin que nadie recalcule si basta; el plan repite un escalón arriba el error que diagnostica (regla sin consecuencia suficiente).
5. **Corrección:** modelar el paquete con el veto de refuerzos como caso base (Q-FOR-007 aplicada a ambas sanciones), reservando la exclusión de liguilla como cláusula de reincidencia — más vendible y conserva el garrote máximo.
6. **Veredicto: MODIFICAR.**

### RT-012 · "Votación única e indivisible" es una amenaza pronunciada por un rehén

1. **Problema:** el mecanismo de compromiso de la negociación 2027 no existe: quien declara la indivisibilidad (el Comisionado) es removible por los mismos que votan, y el patrón documentado de la asamblea es exactamente el que anula la táctica.
2. **Evidencia:** A2: la asamblea "designa y acepta renuncias del máximo cargo federativo" (precedente Rodríguez); el patrón "aprobación en principio sin calendario" es la señal temprana del propio RG-IMP-001. Una "votación única declarada" solo obliga si un tercero puede imponer costo por partirla — y el plan no tiene ninguno para 7 de las 8 piezas (RT-003). Y las bilaterales D+60–120 las conduce el Comisionado: el negociador-jefe del plan es empleado de la contraparte.
3. **Gravedad:** alta.
4. **Consecuencia:** la asamblea partirá el paquete, aprobará "en principio" lo que le sirve y dilatará el resto; el plan habrá gastado su único evento de negociación calendarizado sin mecanismo de segunda vuelta.
5. **Corrección:** (i) negociador del pacto (custodios) en la mesa, no solo el Comisionado; (ii) definir ex ante qué combinaciones parciales se aceptan y cuál contingencia activa cada una (hoy solo la compensación tiene contingencia); (iii) calendario de reintento declarado (asamblea 2028) para que el bloqueo no sea gratis en tiempo.
6. **Veredicto: MODIFICAR.**

### RT-013 · El plan diagnostica un Estado que "gasta sin medir" y le entrega la mitad de la ejecución sin un peso de fortalecimiento

1. **Problema:** CONADE (presupuesto real decreciente, observaciones ASF, "sin programa de fútbol"), SEP y 32 institutos estatales de capacidad heterogénea son los ejecutores de la mayor parte del gasto público del plan — y el presupuesto no contiene ninguna partida de construcción de capacidad estatal.
2. **Evidencia:** F3 §2.1.5 ("El Estado gasta sin medir y donde no toca"); el RACI asigna a CONADE la rectoría del FIDC, RENADE, COVED, custodia de datos y co-liderazgo de media docena de componentes; la "CONADE reformada" se menciona (A9 §17) pero no existe REC alguna que la reforme ni partida en A14. Las ~200–400 personas clave (A15 §9.4) se forman "con el MUCEF y la capacitación de gestores" — programas que esas mismas personas deben echar a andar.
3. **Gravedad:** alta.
4. **Consecuencia:** el cuello real del año 1–3 no será el dinero sino la capacidad de gestión pública (A14 lo roza: "la absorción municipal es el cuello real") — y el plan responde recortando metas, no construyendo capacidad.
5. **Corrección:** partida explícita de fortalecimiento institucional (unidad FIDC profesionalizada en CONADE; ~40–80 MDP en 4 años) y peso-a-peso condicionado también a capacidad certificada del instituto receptor, con asistencia técnica financiada.
6. **Veredicto: MODIFICAR.**

### RT-014 · El plan pone sus pilotos en los territorios más extorsionados del país y a la vez publica un mapa georreferenciado de dónde habrá flujos de efectivo

1. **Problema:** contradicción interna directa entre REC-INF-001 (padrón público georreferenciado con gestor, horarios, tarifas) y la propia regla de A9 recogida por A15 ("no publicar datos que faciliten extorsión"), en un despliegue cuyos territorios insignia son Guerrero, Chiapas, Tijuana y Ciudad Juárez.
2. **Evidencia:** el contrato Cancha Viva crea gestores que cobran tarifas y retienen el ingreso con "contabilidad simplificada pública en el padrón" (A9 REC-INF-002) — un directorio público de pequeñas cajas comunitarias con dirección exacta. La mitigación de RG-IMP-008 ("no publicar datos que faciliten extorsión") es incompatible con ese diseño tal como está escrito, y la cobertura obligatoria de la cartera (R6/R7, frontera) impide esquivarlo eligiendo sedes tranquilas.
3. **Gravedad:** alta (riesgo a personas, no solo a programas).
4. **Consecuencia:** gestores extorsionados o cooptados; el activo comunitario convertido en punto de renta criminal; un incidente violento en un piloto insignia puede congelar el programa nacional.
5. **Corrección:** padrón por capas (estado físico y horas públicas abiertas; datos económicos e identidad del gestor reservados a auditoría); cobro por medios trazables donde sea viable; protocolo de seguridad con presupuesto propio por sede y regla de retirada digna (cerrar una sede por extorsión es "éxito del método").
6. **Veredicto: MODIFICAR.**

### RT-015 · Nadie sumó lo que el plan le cuesta a la FMF — un actor cuya solvencia es una caja negra declarada

1. **Problema:** el plan carga sobre la FMF compromisos simultáneos (fracción de giras 55–110/año, aportación al Fondo 80–150/año, premios 2026 etiquetados 320–550, célula 150–300, unidad jurídica, COMET, cámara, MUCEF-parte, DPO, auditorías) mientras le remueve ingresos (multas convertidas, art. 27 transparentado y redirigido) — sin conocer su presupuesto real (Q-FIN-006: "sin esto, la fuente 1c se presupuesta al piso") ni su dependencia exacta de giras (hasta 1/3, evidencia B).
2. **Evidencia:** A14 §9.6 toca el punto solo para la fuente 1c; no existe en el corpus un pro forma que agregue TODOS los compromisos federativos del paquete contra el ingreso FMF conocido. La renovación SUM 2028 se negocia "sin hambre" según A15 — pero la FMF sí tiene hambre: financia selecciones menores y ~500 empleados con ese flujo (A11).
3. **Gravedad:** alta.
4. **Consecuencia:** la asamblea (que sí conoce las cifras) descubrirá en la bilateral que el paquete es financieramente imposible para la FMF tal como está sumado, y usará ese hecho — legítimamente — para recortar. El plan regala la mejor objeción por no calcularla primero.
5. **Corrección:** entregable previo a la asamblea: pro forma FMF 2027–2031 bajo el paquete completo, en tres escenarios SUM, construido con L8 + REC-GOB-001; todo compromiso federativo con su prelación declarada.
6. **Veredicto: MODIFICAR.**

### RT-016 · La cámara de compensación con "facultad de tasar" tiene la silueta del ilícito de 2021 — y el plan lo trata como resuelto con la palabra "vigilancia"

1. **Problema:** un mecanismo administrado por la FMF que retiene un porcentaje de cada transferencia entre 18 competidores, presume onerosidad y tasa de oficio los traspasos "gratuitos" es, en su forma, un acuerdo entre competidores que fija condiciones de transacción — la categoría exacta por la que la COFECE multó a esos mismos clubes y a la FMF como facilitador.
2. **Evidencia:** A3 documenta la multa 2021 (177.6 MDP, prácticas absolutas en el mercado de fichajes, FMF facilitador) y el riesgo de politización de la CNA. El plan responde con "vigilancia CNA" (A6, A14) como si la exposición fuera virtud, sin vía de inmunización formal. El espejo del RSTP ayuda como argumento, pero el mecanismo doméstico es una regla horizontal nueva entre competidores nacionales: basta que un club tasado impugne para judicializar la cámara — la pieza de la que cuelga el 40% del régimen de A6 (RT-002).
3. **Gravedad:** alta.
4. **Consecuencia:** suspensión judicial o investigación de la cámara en sus primeros ciclos de pago = desfinanciamiento del Fondo + victoria narrativa del bloqueo ("el plan es ilegal").
5. **Corrección:** antes de la asamblea, obtener opinión formal/orientación de la CNA sobre el diseño (análisis de eficiencias pro-competitivas: corrige la falla de mercado documentada por la propia autoridad en 2021; el dinero baja a formadores, no se reparte entre los 18); diseñar la facultad de tasar con tabulador objetivo público y arbitraje independiente (no discrecionalidad de la propia FMF); documentar el paralelo con la resolución COFECE como corrección de aquella conducta, no su reedición.
6. **Veredicto: MODIFICAR.**

### RT-017 · El peso-a-peso del FIDC reproduce la desigualdad territorial que el plan promete corregir

1. **Problema:** la "pata grande" del financiamiento de infraestructura exige contrapartida local reorientada — y los municipios de R6/R7 son precisamente los que no tienen gasto deportivo que reorientar ni capacidad de gestión para concursar.
2. **Evidencia:** la fuente 4 (900–1,800 MDP/año, la "pata grande") es gasto local reorientado con regla peso-a-peso; F3/A4 documentan que ese gasto está donde hay franquicias que subsidiar — metrópolis. Un fondo concursable con contrapartida es, en la práctica mexicana, un fondo capturado por los municipios con más capacidad técnica y fiscal; los contrapesos existentes (cuota RTD 25%, mini-canchas censadas, pilotos sur) son asignaciones pequeñas frente al flujo del FIDC. El plan hace en el territorio lo que critica del sistema: asignar por capacidad de pago previa, no por necesidad formativa.
3. **Gravedad:** alta.
4. **Consecuencia:** en 2034 el Informe anual mostrará el grueso del FIDC ejercido en las metrópolis de siempre y R6/R7 atendidos por pilotos testimoniales — la promesa territorial incumplida por su propia mecánica financiera.
5. **Corrección:** multiplicador regional en la concurrencia (3:1 federal-local en municipios de alta marginación, 1:1 en metrópolis) + ventanilla de asistencia técnica para municipios sin capacidad + piso del FIDC reservado a R6/R7 (≥25%, espejo de la cuota RTD).
6. **Veredicto: MODIFICAR.**

---

## SECCIÓN III — CRÍTICAS DE GRAVEDAD MEDIA

### RT-018 · El "registro nacional operando en 2030" será, en realidad, un registro de dos puertas con un hoyo amateur

1. **Problema:** la fase 2 de COMET (32 asociaciones estatales) depende de la capacidad de captura de organizaciones que el propio plan clasifica E7 (caja negra) y cuya capacidad "el diseño la asume baja" (A10 §7.3) — pero la meta 2030 se comunica como registro nacional.
2. **Evidencia:** el benchmark de 18–36 meses (Croacia) proviene de una federación pequeña con asociaciones funcionales; la fase amateur mexicana está encadenada a "elecciones COVED / asociaciones saneadas" (A15 §5.2), es decir, al éxito de REC-GOB-003 (ver RT-019). La mitigación del diseño (capturar por las puertas escolar y de academias) basta para medir; no para cerrar el precipicio F2→F4 en las ligas amateur no escolares, que seguirán invisibles.
3. **Gravedad:** media.
4. **Consecuencia:** sobreventa del hito estrella de 2030; el sesgo de cobertura del primer Data Box "completo", si no se declara ex ante, desacreditará la serie entera.
5. **Corrección:** meta 2030 re-etiquetada ("registro escolar + profesional + academias; cobertura amateur ≥50%, universalización 2032") y cobertura por puerta publicada en cada Data Box.
6. **Veredicto: MODIFICAR** (solo la meta; la arquitectura de cuatro puertas resiste el ataque).

### RT-019 · REC-GOB-003 apuesta a que CONADE aplique una facultad que lleva más de una década sin aplicar — sin explicar qué cambió

1. **Problema:** el saneamiento del sector amateur descansa en "palanca legal existente e inaplicada (LGCFD arts. 59–60)" — pero una palanca que nadie ha jalado en más de una década no es un activo: es la evidencia de un equilibrio político que el plan no explica cómo rompe.
2. **Evidencia:** F6 §3.1 y A15 §4.1. El corpus no analiza POR QUÉ el COVED nunca supervisó esas elecciones (¿incapacidad? ¿pacto? ¿irrelevancia?) ni qué incentivo nuevo tendría CONADE para confrontar a 32 cacicazgos que además son votos en la asamblea FMF. De este eslabón cuelgan la fase 2 de COMET, las sedes RTD y el "votante amateur de la ventana" de la Velocidad 2 (§9.3.4).
3. **Gravedad:** media (alta si el equilibrio es pactado y no negligente).
4. **Consecuencia:** el padrón se publica (fácil), las elecciones supervisadas no ocurren (difícil), y en 2030 el amateur sigue siendo caja negra con padrón decorativo — el patrón "regla sin aplicación" que el plan diagnostica en el art. 151.
5. **Corrección:** análisis de economía política de la inaplicación (Q nueva al registro) y condicionalidad financiera con calendario y consecuencias automáticas, no dependiente de la voluntad supervisora del COVED.
6. **Veredicto: MODIFICAR.**

### RT-020 · El GAM es gameable por diseño y su árbitro es el arbitrado

1. **Problema:** tres vectores de juego abiertos: (i) la métrica de minutos deja zona muerta entre el 70' y el 80' (100% "antes del 70'"; 25% "posteriores al 80'" — el cambio al 75' no tiene regla escrita); (ii) los puntos por "venta internacional a liga competitiva" incluyen a la MLS (manual §6), mercado con propiedad y afinidades cruzadas con dueños mexicanos: ventas simuladas o de ida y vuelta entre clubes amigos cosechan puntos; (iii) la calibración anual del tabulador (Q-FOR-010) es de "Liga MX/cámara" — los regulados.
2. **Evidencia:** REC-FOR-008; A15 registra "inflación de minutos simulados" como riesgo sin mecanismo; el bloqueo anti-arbitraje cubre préstamos (cláusula 40% de minutos) pero no ventas con recompra ni operaciones intra-grupo — pese a que A3 §5.3 documenta que los clubes bajo control común son un solo agente económico.
3. **Gravedad:** media (alta si el GAM sobrevive a RT-003 y se vuelve central).
4. **Consecuencia:** plazas 7–9 ganadas con papel, no con desarrollo — y el mecanismo que debía re-alinear incentivos se vuelve la prueba pública de que el sistema no es reformable ("hasta su reforma la tornearon").
5. **Corrección:** regla continua de ponderación por minuto (sin escalones abusables); exclusión del tabulador de ventas a clubes con vínculos de propiedad/control común y de operaciones con recompra ≤24 meses; validación del tabulador por el consorcio universitario/AMFpro (ya sugerida como "deseable" en el RACI — hacerla obligatoria) con auditoría muestral de la cámara.
6. **Veredicto: MODIFICAR.**

### RT-021 · "Presupuesto fijo, metas variables" sin piso convierte el incumplimiento en legalidad perpetua

1. **Problema:** DEC-012.1 permite ajustar "las metas de cobertura al dinero confirmado cada año" — un mecanismo sin piso ni contador acumulado, bajo el cual el plan puede pasar una década "en meta" entregando una fracción de lo prometido sin activar jamás el protocolo de fallo de la Carta (que se dispara por hitos incumplidos, no por hitos rebajados ex ante).
2. **Evidencia:** reconciliación Control 6 §1–2; el protocolo de fallo de A12 revisa "al incumplirse un hito" — pero un hito rebajado antes del año no se incumple. Combinado con RT-005 (el dinero confirmado será estructuralmente menor), esto no es seguro de emergencia: es el modo de operación esperado.
3. **Gravedad:** media (prudencia fiscal genuina con agujero de rendición de cuentas).
4. **Consecuencia:** la coartada perfecta: nunca hay déficit, nunca hay fallo, nunca hay consecuencia — la brecha entre plan comunicado y ejecutado crece sin dueño.
5. **Corrección:** (a) piso de cobertura no ajustable por componente esencial (operación escolar de estados activados, becas piso); (b) regla de acumulación: ajuste de metas a la baja >20% dos años consecutivos activa el protocolo de fallo de la Carta con revisión pública.
6. **Veredicto: MODIFICAR.**

### RT-022 · A14 declara la lotería no comprometible; A15 la cuenta dentro de la meta de permanencia 2030 — la contradicción quedó viva tras dos ciclos de reconciliación

1. **Problema:** A14 (§9.2) prohíbe comprometer gasto permanente contra la fuente 5 hasta observar 24 meses de flujo real; el cronograma de A15 pone "FIDC con fuente legal permanente (reforma Lotería aprobada)" en 2028–2030 y la meta "≥40% del FIDC de fuentes permanentes en 2030" (IND-INF-007b) — meta que solo cierra contando la lotería, pues las otras fuentes "permanentes" del FIDC (peso-a-peso, Forward) son por definición presupuestales o de ciclo.
2. **Evidencia:** A14 §6 (fuente 5: confianza baja, excedentes "modestos e inestables") vs. A15 §5.2 y §10.3. La reconciliación del Control 6 no registró esta discrepancia entre sus 3 resueltas.
3. **Gravedad:** media.
4. **Consecuencia:** el indicador insignia de permanencia se cumplirá en el papel con una fuente que A14 mismo dictaminó no demostrada — simulación de blindaje antisexenal donde más importa.
5. **Corrección:** redefinir IND-INF-007b para computar solo fuentes con flujo observado ≥24 meses; si la meta 2030 no cierra sin lotería, decir que no cierra (y que la meta real de permanencia dura es 2032–2034).
6. **Veredicto: MODIFICAR.**

### RT-023 · La "vía belga" importada sin su condición previa: una federación dispuesta a escuchar

1. **Problema:** el consejo técnico consultivo ("legitimidad primero, atribuciones después") replica la forma del caso belga sin su sustancia: en Bélgica la federación adoptó a la universidad como autoridad técnica; en México el dictaminado puede ignorar el dictamen a costo cero.
2. **Evidencia:** la FMF no publica ni estados financieros ni actas (A2 §5.4); dos décadas de crítica documentada al calendario no movieron nada (A11 §5.1). El único canal que convierte legitimidad en atribuciones es la ventana de gobernanza: el consejo es apuesta acumulativa correcta, no contrapeso operante en los 10–20 años que la ventana puede tardar.
3. **Gravedad:** media (el costo del consejo es bajo; el riesgo es de autoengaño institucional, no de pérdida).
4. **Consecuencia:** el plan reporta "consejo consolidado" como avance de gobernanza mientras la gobernanza real no se mueve un milímetro; el indicador mide la existencia del órgano, no su tracción.
5. **Corrección:** darle al consejo una atribución dura desde el día 1 por la única vía disponible (la estatal): su dictamen anual como requisito del financiamiento público condicionado (REC-GOB-001) — un dictamen negativo suspende desembolsos públicos del componente observado. Legitimidad + una palanca pequeña pero real.
6. **Veredicto: MODIFICAR** (mi ataque a su existencia fracasa — es barato y acumula; el ataque a su tracción prospera).

### RT-024 · No se puede ofrecer "inmunidad práctica" y "cooperación proactiva con los expedientes" al mismo tiempo

1. **Problema:** el precio de cooperación previsto para los dueños incluye "inmunidad práctica (no reabrir el pasado)" (F6 §3.1; A15 §9.1) mientras REC-INT-004 compromete "cooperación proactiva con los procesos abiertos (examen del Comité de Auditoría FIFA, expedientes de prensa 2025)". Ambas promesas son incompatibles — y la primera, además, no es del plan: los expedientes pertenecen a FIFA, a fiscalías y a la prensa.
2. **Evidencia:** textos citados; el plan paga con cheque ajeno y adopta a la vez una postura de integridad que, bien ejecutada, reabre lo que prometió no reabrir.
3. **Gravedad:** media (alta en la mesa, donde la contraparte descubrirá la contradicción).
4. **Consecuencia:** o la cooperación proactiva se vacía para honrar la inmunidad (matando el Pilar 14 al nacer), o la inmunidad resulta falsa y el plan queda como negociador de mala fe.
5. **Corrección:** eliminar la "inmunidad práctica" del catálogo de monedas; sustituirla por lo ofrecible: no-retroactividad de las reglas nuevas y gradualidad de cumplimiento. La cooperación con procesos abiertos no se negocia.
6. **Veredicto: MODIFICAR (eliminando la cláusula de inmunidad como moneda).**

### RT-025 · "Las universidades" son el único actor del plan sin adversario, sin auditor y con cinco sombreros

1. **Problema:** el consorcio/panel universitario es a la vez evaluador de academias, evaluador externo de pilotos, secretaría técnica del pacto, dictaminador del Informe anual, sede de la red de ciencia y auditor transversal — y su ingreso (evaluación financiada, matrícula, "papel institucional permanente") depende de la continuidad del plan que evalúa.
2. **Evidencia:** RACI (universidades con E/S/Au en 10 de 13 filas); A15 §9.1 lista lo que ganan. La regla "el evaluador nunca es financiado por el evaluado" se aplica a clubes y FMF, pero el plan mismo financia a su meta-evaluador. La presunción anticaptura del doc. 10 §5 nunca se corre contra el actor universitario — no ajeno en México a capturas sindicales, políticas y de grupo.
3. **Gravedad:** media.
4. **Consecuencia:** captura amable: dictámenes progresivamente indulgentes, disidencia publicable jamás publicada, y concentración de funciones que convierte a un rector en veto informal. El plan replica en pequeño el defecto que combate (juez y parte).
5. **Corrección:** rotación obligatoria de universidades evaluadoras por componente (ya hay 6–10 en el pacto); separación dura: la universidad que evalúa un piloto no participa de su operación ni de la red de ciencia financiada por ese componente; revisión internacional de pares cada re-auditoría quinquenal (un evaluador extranjero — Concacaf/academia — dictamina al panel).
6. **Veredicto: MODIFICAR.**

### RT-026 · El pacto castiga fuerte a los débiles y débil a los fuertes

1. **Problema:** el sistema de sanciones del pacto (reputacionales → suspensión de beneficios → salida del padrón) funciona contra municipios, academias y gestores (que dependen de los beneficios), pero es inocuo contra FMF/Liga: una vez votado el paquete, sus beneficios (GAM, cámara, plazas) viven en SU reglamento y se autoadministran — no hay padrón del que expulsarlos.
2. **Evidencia:** A15 §8 cláusulas 5–6 y 9; el único enforcement real sobre el actor fuerte es el condicionamiento de dinero público (REC-GOB-001) — marginal para una FMF que "prácticamente no recibe recursos públicos" (A3 §1).
3. **Gravedad:** media.
4. **Consecuencia:** en 2031 el Informe anual documentará municipios expulsados por incumplir y una Liga incumpliendo cláusulas espejo sin consecuencia — doble estándar visible que erosiona el pacto.
5. **Corrección:** las piezas federativas llevan sus sanciones DENTRO del reglamento votado (pérdida de puntos GAM por incumplir cláusulas espejo/datos; germen en REC-FOR-006); y el acceso de clubes a beneficios fiscales/infraestructura pública — lo único que el Estado controla — atado al cumplimiento, club por club.
6. **Veredicto: MODIFICAR.**

### RT-027 · Escuela Abierta firma con quien no puede obligar y omite del RACI al actor que puede vetarla

1. **Problema:** el vespertino escolar se destraba con "convenio marco + póliza + conserjería" firmado por SEP federal — pero la educación básica está descentralizada (los planteles son de 32 autoridades estatales) y el bloqueador documentado incluye a los sindicatos, que no aparecen en ninguna celda del RACI de 19 actores.
2. **Evidencia:** A1/A7: el bloqueador es "responsabilidad civil, conserjería, seguros y sindicatos"; la respuesta de A15 §9.4 (conserjería pagada: "el opositor en beneficiario") es razonable pero, sin asiento formal del SNTE en el convenio-tipo, depende de que la compra funcione escuela por escuela, 3,000 veces.
3. **Gravedad:** media.
4. **Consecuencia:** la meta de 1,500–3,000 planteles vespertinos (2030) se queda en los estados con secretarías cooperativas — otra concentración territorial silenciosa.
5. **Corrección:** representación sindical como firmante del anexo operativo (rol E, contraprestación explícita); meta por estado con semáforo público de adhesión, para que el bloqueo local tenga costo visible.
6. **Veredicto: MODIFICAR.**

### RT-028 · El fracaso mundialista 2030 tiene asignados dos papeles incompatibles — y llega junto con un gobierno nuevo

1. **Problema:** el mismo evento (eliminación 2030) debe, según el plan, no dañar al plan (la Carta y el Informe "desarman el linchamiento") y dañar al statu quo (gatillo de la ventana de Velocidad 2). Y ocurre meses después del cambio de gobierno federal — el momento perfecto para que la administración entrante resuelva la disonancia de la tercera manera: declarando fallido "el plan del sexenio anterior".
2. **Evidencia:** A15 §9.3 (gatillo: "eliminación + Informe anual en meta") y §10; RG-IMP-002 (prob. alta) y RG-NAC-011 tratados por separado, nunca como compuesto. El precedente de extinción de fideicomisos 2020 (citado por A14) muestra que el gobierno entrante no distingue programas buenos cuando busca banderas propias.
3. **Gravedad:** media (los candados antisexenio de A15 §10 son de lo mejor del plan — el ataque a su existencia fracasa; el ataque al escenario compuesto prospera).
4. **Consecuencia:** la presión post-eliminación se dirige contra el plan (no contra la gobernanza), con un gobierno sin paternidad sobre él y una asamblea encantada de ofrecerlo como chivo.
5. **Corrección:** ensayo formal del compuesto (fracaso 2030 + gobierno hostil + asamblea oportunista) en la re-auditoría 2032; incorporar en 2029 custodios de peso político transversal que encarezcan la cancelación; ejecutar literalmente la Carta como instrumento de custodios, no de gobierno.
6. **Veredicto: MODIFICAR (solo el ensayo del compuesto; los candados MANTENER).**

### RT-029 · El nominalismo anti-T8: el plan creó ~10 estructuras nuevas llamándolas "función", "cuenta", "célula", "capa", "oficina" y "panel"

1. **Problema:** la contabilidad de creaciones ("4 creaciones T7 en todo el diseño") se sostiene mediante etiquetas: cámara de compensación = "función nueva dentro de la FMF, no institución"; Fondo de Desarrollo = "cuenta con reglas"; Oficina de Implementación = "unidad de coordinación por convenio... no es T7"; comité mixto FIDC, consejo técnico, panel universitario, MIS, célula, psicología, capa RTD. Son entre 9 y 11 organismos operativos nuevos con nómina, gobierno y riesgo de captura propios.
2. **Evidencia:** F6 §1 y §6; A15 §4.1.1. La Oficina — blanco de captura con impacto crítico según el propio A15 (RG-IMP-005), con empleador y financiamiento sin definir (Q-IMP-006) — no tiene plantilla T-4, cuando el doc. 10 la exige y su regla R5 le aplica de lleno. La regla del 70% se cumple en conteo y gasto (verificado: 77–84%, sin maquillaje aritmético detectable); el espíritu de P3 — frenar la proliferación institucional — se esquiva por denominación.
3. **Gravedad:** media (ninguna estructura es injustificada individualmente; el problema es el agregado no gobernado y las dos sin T-4).
4. **Consecuencia:** en 2030, una constelación de comités cuyo costo de coordinación y flancos de captura nadie sumó — el germen de la próxima "duplicación E6".
5. **Corrección:** T-4 completa para la Oficina y el comité mixto FIDC; anexo con el organigrama consolidado de TODAS las estructuras nuevas (cualquiera sea su etiqueta T), sus costos de gobierno y condiciones de cierre, sujeto a la re-auditoría quinquenal.
6. **Veredicto: MODIFICAR.**

### RT-030 · La diáspora: el diseño censo-primero es correcto; las metas gastan el censo antes de hacerlo

1. **Problema:** el tamaño del pool de elegibles es incierto "en un orden de magnitud" (declarado, Q-5C-001), pero las metas 2030 (30 binacionales integrados) y las de exportación 2030–2034 (80 salidas/año en 2030; 8–12 ≤22 años/año en 2034) ya incorporan el rendimiento esperado de la célula — con US Soccer/MLS reclutando en sentido contrario con recursos muy superiores (RG-EXP-002, prob. alta).
2. **Evidencia:** A11 §16/§23; A15 §5.2–5.3. Si el pool de calidad resulta 10× menor que la referencia marroquí (contexto no comparable: la diáspora mexicana compite contra el país anfitrión, no contra Europa distante), la célula puede ser buen negocio marginal (su unitario de 3–7 MDP por exportación adicional lo aguanta) y aun así reventar las metas agregadas.
3. **Gravedad:** media. **Honestidad del atacante:** el diseño resiste mejor que casi cualquier pieza del plan — censo primero, cancelación a <5 integrados en 24 meses, cierre a 8 años, indicadores separados diáspora/local. Mi ataque a la estructura fracasa.
4. **Consecuencia:** solo las metas: un censo pobre convertirá metas firmadas en fallos evitables.
5. **Corrección:** metas de integración y exportación re-emitidas a los 12 meses del censo, declarándolo ex ante en la Carta.
6. **Veredicto: MANTENER el diseño; MODIFICAR las metas dependientes.**

### RT-031 · El doble registro universitario ante FIFA: el ataque fracasa

1. **Problema buscado:** que el "Jugador Universitario Designado" violara reglas FIFA de elegibilidad o registro (un jugador, dos registros simultáneos).
2. **Resultado del ataque:** no hay caso. El Special Designated Player japonés opera desde 1998 dentro del sistema FIFA sin objeción; la elegibilidad estudiantil es materia de los circuitos educativos, no del RSTP; el registro federativo sigue siendo único (COMET). El riesgo real es menor y doméstico: los reglamentos CONDDE/ANUIES/CONADEIP no son públicos en su totalidad (A7 §7.3) y los tres circuitos — recién escindidos en 2025 — pueden negarse a armonizar; el costo "casi cero" omite el costo político de sentar a tres rivales frescos en una mesa sin fecha límite.
3. **Gravedad:** media (baja en lo jurídico; media en lo político).
4. **Consecuencia (solo del flanco político):** la "bisagra japonesa" pospuesta indefinidamente por un cisma ajeno al fútbol.
5. **Corrección:** incentivo asimétrico declarado: el circuito que adopte primero el doble registro obtiene el acceso prioritario de sus campeones a la liga de maduración y a las becas JUD — que la armonización no sea prerequisito del arranque (adopción por circuito, no por unanimidad).
6. **Veredicto: MANTENER** (con la corrección menor de secuencia). Se registra también, en simetría: el tratamiento del riesgo FIFA en todo el plan (perímetro DEC-007, corredor fronterizo con criterio de cancelación por objeción formal, MOU en vez de firma FIFA en el pacto) resistió todos mis intentos de encontrarle una pieza sancionable. Es el flanco mejor blindado del corpus.

### RT-032 · Todo el andamiaje estructural femenil viaja en un solo vehículo: el paquete de asamblea

1. **Problema:** las cláusulas espejo (E-1) — pirámide juvenil femenil, compensación femenil, GAM femenil, licencia — van DENTRO de la votación única de 2027. Si el paquete se mutila (el riesgo #1 del plan), la agenda femenil estructural cae como daño colateral, y el corpus no declara plan B femenil para ese escenario.
2. **Evidencia:** F6 §2 (E-1), A15 §5.1 y §9.2.3. Lo que sobrevive sin asamblea (NOM, MIS, cuotas MUCEF, horas FIDC, piloto noreste) es la capa de protección y acceso; el tramo competitivo-profesional femenil queda íntegramente rehén de la misma mesa que el varonil, sin que la moneda del paquete tenga valor femenil equivalente para los dueños.
3. **Gravedad:** media-alta.
4. **Consecuencia:** la rama que el plan declara "sin versión reducida" (F6 §4) queda de facto reducida en el escenario más probable (RT-003/RT-012), sin que nadie lo haya decidido explícitamente.
5. **Corrección:** anexo de contingencia de A13, previo a la votación, con las piezas femeniles re-alojables en instrumentos no-asamblea si el paquete se mutila (pirámide juvenil como condición de beneficios FIDC/certificación — vía estatal; transparencia salarial vía CNA post-2021).
6. **Veredicto: MODIFICAR.**

---

## SECCIÓN IV — JUICIO GLOBAL (≤200 palabras)

**¿Puede funcionar?** Sí, en su rama incondicional: acceso, protección, datos, entrenadores y canchas gestionadas son alcanzables con las fuentes y candados descritos, y ese piso ya valdría el precio. Como plan de transformación —producir élite exportable— solo funciona si giran dos llaves políticas que el propio corpus estima improbables por separado y no modela juntas.

**El talón de Aquiles único:** la FMF como intermediario obligado. No la asamblea (esa está bien diagnosticada como bloqueador), sino la ficción operativa de que "la FMF (Comisionado)" es un aliado ejecutor distinto de su dueño. Por ese punto único pasan la Velocidad 1 federativa, el expediente de negociación, la cámara, el COMET, la célula, la cooperación con FIFA y la firma del pacto. Si esa costura cede —y el precedente Rodríguez dice que cede—, el plan no colapsa: se degrada en silencio a su rama de contención mientras sigue comunicando la de transformación. Las correcciones más urgentes (RT-001, RT-004, RT-005, RT-006) son todas variantes de una sola: que el plan diga en su portada, y firme en su Carta, la diferencia entre lo que hace solo y lo que solo hará acompañado.

---

*Fin del entregable del Agente 16. 32 críticas: 6 críticas (RT-001 a RT-006), 11 altas (RT-007 a RT-017), 15 medias (RT-018 a RT-032). Veredictos: 0 ELIMINAR seco (1 cláusula a eliminar dentro de RT-024), 29 MODIFICAR, 3 con componente MANTENER explícito por fracaso honesto del ataque (RT-004 arquitectura, RT-030 diseño de célula, RT-031 doble registro y perímetro FIFA). Conforme al manual §8.5, toda crítica exige respuesta del Agente 0 en Fase 9: mantener con justificación, modificar o eliminar. Sin commit, conforme a instrucciones.*

