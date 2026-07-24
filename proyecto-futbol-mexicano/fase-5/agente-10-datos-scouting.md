# Agente 10 — Pilar 9: Arquitectura de Datos, Scouting e Interoperabilidad

**Proyecto:** PNTFM · **Fase:** 5 (Diseño) · **Autor:** Agente 10 (Datos, Scouting e Interoperabilidad)
**Versión:** 1.0 · **Fecha:** 2026-07-24 · **Plantilla:** T-1 (26 secciones)
**Insumos vinculantes:** manual metodológico (doc. 01), criterios reformar vs. crear (doc. 10), línea base integrada (Fase 3: R4, DEC-007, DEC-008, DEC-010), matriz de transferibilidad consolidada (Fase 4), A1 (§5.4: registro FMF E7, censo 2006, certificación de academias), A3 (§5.7: marco de datos 2025 aplicado a menores; tabla 5.9 fila 9), 5B (Croacia/COMET, Uruguay/ONFI), 5E (Japón/Data Box).

---

## 1. Resumen ejecutivo

El Pilar 9 ataca la restricción R4 de la línea base —**ceguera estadística estructural**: sin censo de federados desde 2006, sin padrón de entrenadores activos, sin datos de cohortes, sin medición de uso de instalaciones— con la regla del mandato: **no construir desde cero lo que puede integrarse**.

**Decisión central [RECOMENDACIÓN, T3-Integrar]:** México debe **adoptar COMET (FIFA Connect compatible)** como sistema de registro único del jugador 5–23, no desarrollar una plataforma propia. El árbol P2 y la plantilla T-4 rechazan automáticamente la opción de desarrollo propio (T8): existe un sistema probado en 40+ federaciones, **Concacaf ya lo opera**, el tiempo probado de implantación nacional es de 18–36 meses (la "excepción rápida" del benchmark) y el costo de integrar es, por todo orden de magnitud disponible, inferior al de construir y mantener un sistema ad hoc. La única incógnita material —el costo exacto de licenciamiento para una federación del tamaño de la FMF— está registrada (Q-5B-001) y su respuesta condiciona el contrato, no la decisión de arquitectura.

**Arquitectura en tres capas sobre activos existentes:** (i) un **identificador único del jugador** (ID-J) emitido en el registro COMET/FIFA Connect, que se asigna en cuatro puertas de entrada ya existentes: el registro profesional (Liga MX/Expansión/Premier/TDP), el registro amateur (32 asociaciones estatales, digitalizando el Censo Nacional de Afiliados que el reglamento ya prevé), la **ficha única escolar 6–13** montada sobre el Mundialito/Copa CONADE (1.18 M de niños ya en calendario — DEC-010, modelo ONFI uruguayo) y el **portal de certificación de academias FMF**, cuya certificación se condiciona a reportar datos al registro; (ii) un **expediente estándar del jugador** (historial deportivo, pruebas físicas, lesiones, escolaridad, video) interoperable FMF↔SEP↔clubes↔CONADE **por convenio** — la vía que DEC-007 (fila 9 del mapa A3) califica de riesgo FIFA nulo y para la cual el marco legal de 2025 ya es suficiente; (iii) un **Data Box público anual** (modelo japonés, clasificado AD) que convierte los levantamientos L1–L8 de DEC-008 en estadística nacional permanente y auditable.

**La protección de datos de menores es restricción de diseño, no anexo:** el sistema nace con consentimiento de patria potestad como condición de alta, evaluación de impacto previa a cada módulo, minimización estricta en <12 años (sin video ni biometría, sin perfilamiento), plazos de conservación y supresión automática, prohibición de uso comercial y de transferencia a agentes sin consentimiento específico, cláusulas de transferencia internacional para FIFA Connect, y una gobernanza dual: la FMF como responsable del tratamiento con oficial de datos obligatorio, y la Secretaría Anticorrupción y Buen Gobierno como autoridad de tutela, con auditoría externa anual publicada en el Data Box.

**El registro no es un fin estadístico: es infraestructura de incentivos.** Acredita periodos formativos para que academias y clubes de base cobren solidaridad y formación (la Clearing House FIFA ya funciona — E1; el cuello es el registro mexicano), alimenta el mecanismo doméstico oneroso que diseña el Agente 6, y corrige sesgos de detección (edad relativa, maduración, región, NSE, género) mediante alertas y cuotas de cobertura de visorías medibles.

**Cumplimiento de reglas:** las 8 recomendaciones REC-DAT son T1–T3 en 7 casos y T6 en 1 (100% dentro de niveles 1–6; 87.5% en T1–T4 — regla del 70% cumplida con holgura); ninguna requiere ley nueva; todas caben en el perímetro DEC-007 de riesgo FIFA nulo. Con el benchmark de 18–36 meses, **el registro operando es la meta 2030 alcanzable por excelencia** (regla de metas de Fase 4: 2030 = hitos de proceso). Se incluye un piloto T-5 (PIL-DAT-001): registro único en 2 estados + cohorte Mundialito.

---

## 2. Objetivo del módulo

Diseñar el Pilar 9 del plan: (i) la decisión de arquitectura del identificador único del jugador 5–23 (adoptar vs. desarrollar), con ruta de adopción sobre las cuatro puertas de entrada existentes; (ii) el contenido del expediente del jugador y su interoperabilidad institucional; (iii) el régimen de protección de datos de menores como restricción de diseño; (iv) el Data Box público como bien estadístico permanente; (v) el subsistema de scouting con corrección de sesgos, incluido el femenil; (vi) la función del registro como acreditador de periodos formativos para solidaridad y formación.

## 3. Preguntas de investigación atendidas

- **Q-INV-005** (sistemas de registro — cierre de diseño sobre el diagnóstico de A1) y **Q-INV-009** (federados por categoría/género/estado: el diseño resuelve la producción futura del dato; la serie histórica queda en L5).
- **Q-JUR-007** (datos personales aplicados a registro y scouting de menores — traducción a diseño del hallazgo A3 §5.7).
- **Q-5B-001** (costo real de licenciamiento COMET — permanece abierta; este diseño la convierte en condición contractual, sección 18).
- Nuevas preguntas generadas: Q-DAT-001 a Q-DAT-005 (sección 26).

## 4. Metodología aplicada y desviaciones

Aplicación del árbol de decisión P2 (doc. 10 §2) a cada componente; plantilla T-4 completa para la única alternativa T8 considerada (desarrollo propio), con resultado de rechazo automático; contraste de cada pieza contra la matriz de transferibilidad de Fase 4 (solo se usan elementos AD/AA); verificación de vía jurídica contra la tabla 5.9 de A3 conforme a DEC-007. Costos: donde la cifra no es pública (licencia COMET) se declara [ESTIMACIÓN] con rango, nivel de confianza y vía de validación. **Desviación declarada:** ninguna sustantiva; el módulo no pudo cotejar textos contractuales de Analyticom/Concacaf (información comercial no pública, Q-5B-001).

## 5. Hallazgos (heredados y de diseño)

1. **[HECHO — A1 §5.4]** El registro de afiliados FMF (ACT-SIS-001) es E7 (caja negra): el Reglamento del Sector Amateur ya prevé un Censo Nacional de Afiliados que no se publica; el último censo citable es el Big Count FIFA 2006 (324,595 registrados). No hay evidencia pública de que México opere un sistema integral tipo COMET/FIFA Connect con ID único del amateur al profesional.
2. **[HECHO — 5B]** COMET es el registro nacional más exportado del mundo (40+ federaciones), la AUF uruguaya lo usa desde ~2019, y **Concacaf ya lo adoptó a nivel confederativo**; la implantación nacional probada es de ~2 años, con rango 18–36 meses. La matriz consolidada lo clasifica **AD** contra R4 y lo declara "prerequisito de casi todo".
3. **[HECHO — 5E]** El Data Box de la JFA publica una serie anual 1979–2025 de jugadores y entrenadores registrados (836,297 jugadores en 2025). **[INFERENCIA — 5E]** Publicar es decisión, no capacidad: el instrumento es trivial técnicamente. Clasificado AD, vía convenio, 1–2 años.
4. **[HECHO — A3 §5.7]** El marco de datos 2025 (LFPDPPP + LGPDPPSO + LGDNNA) es **suficiente**: el vacío es de aplicación, no de legislación. Un registro nacional de menores implica datos sensibles a gran escala → evaluaciones de impacto obligatorias, plazos de conservación/supresión, limitación de finalidades, cláusulas de transferencia internacional (FIFA Connect = transferencia de datos) y minimización en <12 años. DEC-007 fila 9: riesgo FIFA **nulo**, instrumento LGA + CONV, sin ley nueva.
5. **[HECHO — A3 §5.6 / matriz R1]** La FIFA Clearing House ya paga formación y solidaridad a quien acredita periodos formativos registrados (E1); las academias no afiliadas y el fútbol escolar no aparecen en el Pasaporte Electrónico del Jugador (EPP) y por tanto **no cobran nunca, aunque hayan formado al jugador**. El registro es la condición material del incentivo económico de base.
6. **[HECHO — DEC-010]** Existen dos anclas vivas de integración: el binomio Mundialito/Copa CONADE (1,180,196 participantes 2026, ficha de inscripción ya operante vía SEP) y el portal de certificación de academias FMF (agosto 2026; 2,000+ academias vinculadas, 510 registradas para certificar). Ninguna otra pieza masiva tiene calendario en marcha.
7. **[INFERENCIA — confianza alta, de diseño]** La transición F2→F4 ("el precipicio invisible": millones juegan organizadamente y el registro federado no los ve) es, en términos de datos, un problema de **emisión del ID en la puerta equivocada**: hoy el ID federativo se emite al llegar al fútbol federado tradicional; si se emite en la puerta escolar y en la academia certificada, el precipicio se vuelve medible y el EPP se puebla desde los 6 años.
8. **[HECHO — literatura B, consistente entre federaciones]** El sesgo de edad relativa (RAE) es medible y corregible solo con fecha de nacimiento registrada y monitoreo por trimestre; los sesgos de región y NSE solo son medibles con domicilio/escuela y proxies socioeconómicos agregados. Sin registro no hay corrección posible: el scouting mexicano actual no puede saber cuánto talento pierde.

## 6. Evidencia (clasificada)

| # | Evidencia | Nivel | Uso |
|---|---|---|---|
| EV-1 | Adopción confederativa de COMET por Concacaf; 40+ federaciones clientes; implantación 18–36 meses (5B, fuentes Analyticom/Concacaf) | B | Decisión adoptar vs. crear |
| EV-2 | AUF (Uruguay) usuaria de COMET; ONFI: ficha única 6–13 con cuota simbólica (5B) | B | Ruta de adopción escolar/amateur |
| EV-3 | JFA Data Box: serie pública anual 1979–2025 (5E) | A | Diseño del Data Box mexicano |
| EV-4 | LFPDPPP 2025, LGPDPPSO 2025, LGDNNA; análisis A3 §5.7 sobre menores | A | Restricción de diseño de protección |
| EV-5 | Tabla 5.9 A3, fila 9: datos/registro = LGA + CONV, riesgo FIFA nulo (DEC-007) | A | Vía jurídica |
| EV-6 | Clearing House/EPP operando desde nov-2022; reglamento de formación FMF 2021 solo cubre registros gratuitos (A3 §5.6) | A/B | Función acreditadora del registro |
| EV-7 | Registro FMF E7; Big Count 2006; portal de certificación FMF ago-2026; Mundialito 1.18 M (A1) | A/B | Activos y puertas de entrada |
| EV-8 | Costo de licenciamiento COMET no público; contratos confederativos sugieren costos accesibles para federaciones medianas (5B §5.7) | C | Costeo — degradado, Q-5B-001 |

**Regla del manual cumplida:** toda recomendación estructural de la sección 16 se apoya en al menos una fuente A o B; la única pieza C (costo COMET) no sustenta la decisión de arquitectura sino su costeo, que queda condicionado (sección 18).

## 7. Fuentes

Las de los informes insumo (A1, A3, 5B, 5E), con sus fechas, alcances y limitaciones ya declaradas allí. Este módulo no incorpora fuentes nuevas: es un módulo de diseño sobre evidencia ya clasificada. La validación comercial (Analyticom/Concacaf) y regulatoria (Secretaría Anticorrupción) queda como acción de implementación (sección 26).

## 8. Limitaciones del análisis

1. Costo de licenciamiento e implantación de COMET no público (Q-5B-001): el costeo de la sección 18 es rango [ESTIMACIÓN, confianza baja].
2. No se conoce el grado real de digitalización interna del registro profesional FMF/Liga MX ni si existe ya alguna instancia COMET dormida vía Concacaf (Q-DAT-001).
3. La capacidad operativa de las 32 asociaciones estatales (E7) para capturar datos es desconocida; el diseño la asume baja y por eso apoya la captura en las puertas escolar y de academias.
4. El diseño de detalle del expediente (catálogo de pruebas físicas, taxonomía de lesiones) requiere trabajo técnico con las áreas médicas de clubes y CONADE; aquí se especifica a nivel de módulo y régimen de datos.
5. La conectividad en zonas rurales (R6/R7) puede limitar la captura digital en campo; el piloto (sección 16, PIL-DAT-001) incluye un estado con este perfil precisamente para medirlo.

## 9. Activos existentes relevantes

| ID | Activo | Estado | Papel en el Pilar 9 |
|---|---|---|---|
| ACT-SIS-001 | Registro de afiliados FMF (amateur + profesional) | E7 | Sustrato a digitalizar dentro de COMET; el Censo Nacional de Afiliados ya está previsto en reglamento |
| ACT-SIS-002 | Portal de certificación de academias FMF | E7 (arranque) | Puerta de entrada 4 del ID-J; palanca contractual: certificación condicionada a reporte de datos |
| ACT-CMP-003 | Mundialito Escolar / Copa CONADE | E1 provisional | Puerta de entrada 3: ficha única escolar 6–13 (modelo ONFI) |
| ACT-LEG-010 | Sistema FIFA (RSTP, Clearing House/EPP, FIFA Connect) | E1 | Infraestructura internacional ya operando; el registro mexicano la puebla |
| ACT-LEG-007 | LFPDPPP 2025 + LGPDPPSO 2025 + LGDNNA | E2 | Marco jurídico suficiente del régimen de menores; solo requiere aplicación |
| ACT-CMP-002 | Liga TDP (238 clubes) | E2/E7 | Red de mayor capilaridad para captura 17–23 y visorías con cuota de cobertura |
| — | COMET/Concacaf (activo confederativo externo ya contratado por la confederación) | — | Sistema a integrar (T3); México ya pertenece a la confederación que lo opera |
| — | Levantamientos L1–L8 (DEC-008, en curso) | — | Prototipo del sistema de indicadores; el Data Box los vuelve permanentes |

## 10. Problemas identificados (que este pilar resuelve)

1. **R4 — ceguera estadística estructural:** el sistema no sabe cuántos jugadores, entrenadoras/es ni academias tiene (Q-INV-002/004/009 sin datos).
2. **Precipicio F2→F4:** el registro federado no ve a los 1.2–2.5 M de niños del fútbol organizado escolar/privado; el ID se emite demasiado tarde.
3. **Formadores de base sin cobro:** sin acreditación de periodos formativos en el EPP, academias y clubes pequeños no cobran solidaridad/formación (nacional ni internacional).
4. **Scouting sesgado e inauditable:** sin fecha de nacimiento, domicilio y cobertura de visorías registradas, los sesgos de edad relativa, maduración, región, NSE y género ni se miden ni se corrigen.
5. **Menores sin régimen de datos aplicado:** SIID y plataformas de scouting operan sin supervisión conocida, sin avisos de privacidad específicos, sin evaluaciones de impacto (SUP-JUR-006).
6. **Levantamientos DEC-008 sin destino institucional:** L1–L8 producirán una foto 2026–2027; sin Data Box, la foto envejece como el Big Count 2006.

## 11. Alternativa de mejora (T1–T2)

Digitalizar el registro amateur existente y publicar el Censo Nacional de Afiliados ya previsto en reglamento (T2: digitalizar/auditar), sin ID único ni interoperabilidad. **Evaluación:** necesaria pero insuficiente — no repara F2→F4 ni acredita formación en el EPP; queda subsumida como componente de la alternativa T3.

## 12. Alternativa de integración (T3) — LA RECOMENDADA

Adoptar COMET/FIFA Connect como registro único (integración con el sistema confederativo existente), emitir el ID-J en cuatro puertas existentes, interoperar por convenio FMF↔SEP↔clubes↔CONADE, y publicar Data Box anual. Desarrollo en secciones 16 y anexo. Es la opción que el árbol P2 selecciona en el paso 4 (la falla es de desconexión entre activos existentes: registro FMF, ficha escolar SEP, portal de academias, sistemas de clubes, EPP FIFA).

## 13. Alternativa de escalamiento (T4)

Escalar la ficha única escolar del piloto (2 estados) a los 32 estados en las ediciones 2028–2030 del Mundialito/Copa CONADE, y escalar la cuota de cobertura de visorías de las regiones piloto al territorio nacional. El escalamiento es diseño incorporado (criterios en la ficha T-5, sección 16), no alternativa separada.

## 14. Alternativa de sustitución (T5–T6)

No aplica sustitución de activos: no existe un sistema funcional que sustituir (el registro actual es E7, se absorbe, no se sustituye). El único componente T6 (cambiar reglas) es la condición de certificación de academias: reportar datos al registro como requisito para certificarse y para acceder a torneos afiliados (REC-DAT-003).

## 15. Necesidad de nueva capacidad (T7–T8) — evaluada y rechazada

**Única candidata T8: desarrollar una plataforma nacional propia de registro.** Plantilla T-4 (14 puntos, condensada):

1. *¿Qué capacidad existe?* COMET operado por Concacaf, probado en 40+ federaciones; FIFA Connect ID como estándar global; registro FMF en papel/formatos (E7).
2. *¿Quién la controla?* Analyticom (proveedor) bajo contrato confederativo Concacaf; FIFA (estándar Connect); FMF (registro actual).
3. *¿Por qué no cumple su función?* No está desplegada nacionalmente en México — falla de adopción, no de existencia.
4. *¿Por qué no puede reformarse/adoptarse?* **Sí puede adoptarse.** No hay respuesta sustantiva en contrario → **regla de rechazo R1 del doc. 10 activada contra la creación.**
5. *¿Cuánto costaría adoptar?* Licencia + implantación: rango estimado 25–60 MDP en 3 años (sección 18; [ESTIMACIÓN, confianza baja], validación Q-5B-001).
6. *¿Cuánto costaría sustituir (desarrollar propio)?* Desarrollo, seguridad, mantenimiento evolutivo, certificación FIFA Connect, soporte 24/7: por comparables de plataformas gubernamentales mexicanas de padrón, ≥3–5× el costo de adopción en 5 años, más 18–30 meses adicionales de calendario y riesgo de fracaso de TI pública (alto y documentado en la administración mexicana) [ESTIMACIÓN, confianza media en el orden de magnitud].
7–9. *Funciones/duplicidad:* un desarrollo propio duplicaría exactamente lo que Concacaf ya opera para sus miembros — duplicidad flagrante contra el activo confederativo.
10. *Financiamiento permanente:* un sistema propio exigiría partida permanente de desarrollo; la licencia se absorbe en presupuesto operativo FMF + convenio (sección 18).
11–13. *Evaluación/supervisión/cierre:* idénticas en ambas opciones (no discriminan).
14. *Riesgo de captura:* un desarrollo propio contratado ad hoc tiene riesgo alto de captura por proveedor afín (patrón documentado en TI pública); la licencia estándar confederativa lo reduce.

**Dictamen: la creación (T8) se rechaza automáticamente por R1 y R2 del doc. 10** (adoptar es viable y más barato). Queda asentado para la puerta de control de Fase 6.

## 16. Recomendación (paquete REC-DAT, con tipo P2, instrumento, responsable, costo, tiempo, indicador)

> Vía jurídica común a todo el paquete (DEC-007, tabla 5.9 fila 9): **LGA ya existente (LFPDPPP 2025, LGPDPPSO 2025, LGDNNA) + convenios (CONV) + reglamento federativo (RL) + política pública (PP)**. Riesgo FIFA: **nulo** en todas las piezas. Ninguna requiere ley nueva.

### REC-DAT-001 · Adoptar COMET/FIFA Connect como registro único nacional con ID-J 5–23
- **Tipo P2:** T3-Integrar (con componentes T2: digitalizar el registro E7 existente).
- **Contenido:** contratación/activación de COMET por la FMF apalancando la relación confederativa Concacaf; emisión del **FIFA Connect ID** como identificador único del jugador (ID-J) desde el primer registro en cualquiera de las cuatro puertas; migración del registro profesional (Liga MX, Expansión, Premier, TDP) en fase 1 y del amateur (32 asociaciones estatales) en fase 2; unificación con el EPP.
- **Instrumento:** contrato FMF–Analyticom (mediado por Concacaf) + acuerdo de asamblea FMF que hace obligatorio el registro en COMET para toda competencia afiliada.
- **Responsable:** FMF (Secretaría General / área de registros), con Concacaf como facilitador técnico; contraparte pública: CONADE (convenio de cofinanciamiento condicionado a apertura de datos agregados — art. 55/58 LGCFD).
- **Costo:** ver sección 18 (25–60 MDP / 3 años, condicionado a Q-5B-001).
- **Tiempo:** 18–36 meses a operación nacional (benchmark croata-Concacaf); fase 1 profesional en 9–12 meses.
- **Indicador:** IND-DAT-001 (sección 23).

### REC-DAT-002 · Ficha única federada escolar 6–13 sobre Mundialito/Copa CONADE
- **Tipo P2:** T3-Integrar (DEC-010; modelo ONFI Uruguay, AD).
- **Contenido:** la inscripción al Mundialito/Copa CONADE genera (con consentimiento de patria potestad, opt-in real) el ID-J del niño/a con dato mínimo: nombre, fecha de nacimiento, sexo, CURP, escuela/CCT, temporada. Cuota cero (el torneo ya es gratuito). Sin video, sin biometría, sin datos de salud en esta puerta (minimización <12 — sección del régimen de menores). La ficha acredita periodo formativo desde los 6 años en el EPP.
- **Instrumento:** convenio SEP–FMF–CONADE (adenda de datos al convenio del binomio escolar existente), con la SEP como corresponsable de datos bajo LGPDPPSO.
- **Responsable:** FMF (emisión ID-J) + SEP (captura en inscripción escolar) + CONADE.
- **Costo:** 8–15 MDP para el módulo de captura escolar y consentimientos digitales (incluido en el paquete de implantación); operación marginal ~2 MDP/año [ESTIMACIÓN, confianza media].
- **Tiempo:** piloto en la edición 2027 (2 estados — PIL-DAT-001); nacional en la edición 2029.
- **Indicador:** IND-DAT-002.
- **Coordinación:** el diseño de embudo del A6 usa esta cohorte; el diseño escolar del A7 define la operación en plantel.

### REC-DAT-003 · Certificación de academias condicionada a reporte de datos ("sin datos no hay certificado")
- **Tipo P2:** T6-Cambiar reglas (sobre activo existente: portal de certificación FMF; componente T2).
- **Contenido:** el estándar de certificación (que define el A6 en su vertiente deportiva) incorpora como requisito: (i) registrar en COMET a todos sus jugadores con ID-J; (ii) reportar semestralmente minutos, competencias y bajas; (iii) cumplir el régimen de datos de menores (aviso de privacidad específico, consentimientos, DPO o responsable designado); (iv) visorías gratuitas registradas en el sistema. A cambio, la academia certificada **queda acreditada como formadora en el EPP y puede cobrar** solidaridad/formación (el incentivo que hace autoejecutable la regla). Para no afiliadas, la misma acreditación se ofrece como incentivo de afiliación (zanahoria, no prohibición — coherente con LIM-JUR-001 campo 9).
- **Instrumento:** reglamento del programa de certificación FMF (RL) + convenio con Profeco para verificación de transparencia de cuotas.
- **Responsable:** FMF (certificación) con evaluador independiente (regla anticaptura de la matriz: NR sueco #22 — la evaluación no puede quedar en manos de los clubes).
- **Costo:** 3–5 MDP (módulo de reporte en el portal ya construido) [ESTIMACIÓN, confianza media].
- **Tiempo:** 12 meses (alineado al primer ciclo de certificación 2026–2027).
- **Indicador:** IND-DAT-003.

### REC-DAT-004 · Régimen de protección de datos del menor deportista (restricción de diseño transversal)
- **Tipo P2:** T1-Aprovechar/T2-Corregir (aplicar la LGA existente; ninguna norma nueva).
- **Contenido:** el paquete completo de la sección "Régimen de menores" (anexo A de este documento): consentimiento de patria potestad como condición de alta; evaluaciones de impacto previas por módulo; minimización <12; plazos de conservación y supresión automática; prohibición de uso comercial y de acceso de agentes sin consentimiento específico; cláusulas de transferencia internacional para FIFA Connect; DPO de la FMF; auditoría externa anual publicada.
- **Instrumento:** políticas del responsable bajo LFPDPPP 2025 + adendas de datos en cada convenio + registro de las evaluaciones de impacto ante la Secretaría Anticorrupción y Buen Gobierno.
- **Responsable:** FMF (responsable del tratamiento; DPO obligatorio); corresponsables SEP/CONADE en sus módulos; auditor externo independiente; tutela: Secretaría Anticorrupción y Buen Gobierno.
- **Costo:** 4–8 MDP (DPO, evaluaciones de impacto, auditoría anual, seguridad reforzada) + partida de seguridad dentro de la implantación [ESTIMACIÓN, confianza media].
- **Tiempo:** las evaluaciones de impacto **preceden** a la puesta en marcha de cada módulo (condición suspensiva); régimen completo operando al mes 12.
- **Indicador:** IND-DAT-004.

### REC-DAT-005 · Data Box público anual del sistema
- **Tipo P2:** T1-Aprovechar (modelo Japón, AD; convierte DEC-008 en política permanente).
- **Contenido:** publicación anual, en formato abierto y serie continua, de: jugadores registrados por categoría/género/estado/trimestre de nacimiento; entrenadoras/es con licencia vigente y activa (ENDIT+SICCED); academias certificadas y su matrícula; minutos juveniles en competencia con consecuencia (regla de menores incluida); visorías realizadas y su cobertura territorial; exportación e importación de jugadores; flujos agregados de solidaridad/formación cobrados por clubes mexicanos. Los levantamientos L1–L8 son la línea base del primer Data Box (2027); el registro COMET lo alimenta en adelante. Solo datos agregados y anonimizados: el Data Box es estadística, nunca expedientes.
- **Instrumento:** convenio FMF–CONADE–SEP con cláusula de publicación obligatoria + condición de los apoyos públicos (art. 55/58 LGCFD); publicación espejo en datos.gob.mx.
- **Responsable:** FMF (generación) + CONADE (publicación pública y custodia de la serie); dictamen metodológico de INEGI como garante técnico [RECOMENDACIÓN].
- **Costo:** 1–2 MDP/año [ESTIMACIÓN, confianza alta — el benchmark japonés prueba que es trivial].
- **Tiempo:** primer Data Box a los 12 meses de DEC-008 (2027); serie anual permanente.
- **Indicador:** IND-DAT-005.

### REC-DAT-006 · Subsistema de scouting con corrección de sesgos (varonil y femenil)
- **Tipo P2:** T2-Corregir + T3-Integrar.
- **Contenido:** (i) **alertas de edad relativa** en el registro: distribución por trimestre de nacimiento de cada selección estatal, academia certificada y fuerza básica, con bandera automática cuando Q1>40% (el dato ya existe en la ficha: costo cero); (ii) campo de **maduración biológica** (estatura/peso seriados y, opcionalmente, edad esquelética solo ≥12 años con consentimiento expreso — dato sensible) para habilitar bio-banding en torneos de detección, nunca para exclusión; (iii) **cuotas de cobertura de visorías**: toda visoría de club/academia certificada se registra (lugar, fecha, asistentes, gratuidad) y el sistema publica cobertura por región funcional R1–R7 y por decil de marginación municipal (CONEVAL), con cuota mínima anual de visorías en R6/R7 como condición del programa de certificación y de los apoyos públicos a visorías; (iv) **scouting femenil**: metas explícitas de cobertura de visorías femeniles (línea base a fijar por L5; desagregación por género obligatoria en todo indicador), y la pirámide femenil Sub-17/Sub-19 registrada con los mismos estándares de minutos; (v) tablero interno para selecciones nacionales juveniles con las alertas de sesgo visibles en cada convocatoria.
- **Instrumento:** reglamento del programa de certificación (RL) + reglas de operación de visorías apoyadas con recursos públicos (PP) + módulo COMET.
- **Responsable:** dirección de selecciones nacionales/dirección deportiva FMF; verificación: el evaluador independiente de la certificación.
- **Costo:** 5–10 MDP (módulo analítico + tablero) [ESTIMACIÓN, confianza media].
- **Tiempo:** 12–24 meses tras fase 1 de COMET.
- **Indicador:** IND-DAT-006 (con desagregación obligatoria por género, región, NSE, trimestre).

### REC-DAT-007 · El registro como acreditador de periodos formativos (solidaridad/formación)
- **Tipo P2:** T1-Aprovechar (la Clearing House E1 ya funciona) + T3-Integrar.
- **Contenido:** (i) todo periodo con ID-J en academia certificada, club TDP/amateur o programa escolar federado queda asentado como **periodo formativo acreditado** en el expediente y sincronizado al EPP FIFA; (ii) ventanilla FMF de acompañamiento a clubes de base y academias para reclamaciones ante la Clearing House (hoy no cobran por ignorancia y por no aparecer en el EPP — L7 dimensiona el rezago); (iii) el registro provee la base de cálculo del mecanismo de compensación doméstica onerosa que diseña el A6 (elemento brasileño AD de la matriz R1): sin registro no hay compensación calculable — este pilar entrega la tubería, A6 el reglamento económico.
- **Instrumento:** módulo EPP de COMET + circular FMF + convenio de ventanilla.
- **Responsable:** FMF (registros y ventanilla); beneficiarios: academias certificadas y clubes de base.
- **Costo:** 2–3 MDP/año (ventanilla) [ESTIMACIÓN, confianza media].
- **Tiempo:** operativo con la fase 2 del registro (mes 18–24).
- **Indicador:** IND-DAT-007.

### REC-DAT-008 · Convenio marco de interoperabilidad FMF↔SEP↔clubes↔CONADE
- **Tipo P2:** T3-Integrar (instrumento paraguas del pilar).
- **Contenido:** un solo convenio marco con adendas por módulo que fija: catálogo de datos intercambiables (mínimos, por finalidad), roles de responsable/corresponsable/encargado, estándar técnico (API COMET/FIFA Connect; CURP como llave de cotejo interno, nunca como identificador publicado), régimen de menores (REC-DAT-004) como cláusula obligatoria, y el Data Box como producto público. Los clubes acceden vía adenda al reglamento de afiliación: el acceso a expedientes de scouting es de solo lectura, trazable (log de accesos), y limitado a jugadores ≥12 años salvo proceso de registro formal.
- **Instrumento:** CONV (DEC-007 fila 9: la vía exacta que el mapa jurídico reserva a este cambio) — mitigación de la debilidad sexenal: adhesión de las 32 autoridades educativas estatales y cláusula de permanencia ligada a los apoyos públicos.
- **Responsable:** FMF + SEP + CONADE + Liga MX/ligas; testigo de honor: Secretaría Anticorrupción (autoridad de datos).
- **Costo:** jurídico-administrativo, <1 MDP.
- **Tiempo:** firma en los primeros 100 días del plan (ya identificado como acción de 100 días en SUP-005).
- **Indicador:** IND-DAT-008 (módulos interoperando / módulos convenidos).

### Piloto (plantilla T-5)

| Campo | Contenido |
|---|---|
| **ID** | PIL-DAT-001 |
| **Nombre** | Registro único ID-J en 2 estados + cohorte Mundialito |
| **Ubicación** | **Hidalgo** (R4: densidad de activos — Pachuca E1, campus ENDIT/UFD, academias certificables) y **Oaxaca** (R6: desierto profesional, ruralidad, conectividad limitada — el piloto debe probarse donde es difícil, no solo donde es fácil). Justificación territorial: un estado de alta densidad institucional y uno del desierto R6/R7, conforme a la regla territorial del manual (doc. 01 §5). |
| **Población objetivo** | ~120,000–180,000 NNA 6–17 [ESTIMACIÓN]: participantes del Mundialito/Copa CONADE 2027 de ambos estados + matrícula de academias certificadas + clubes TDP/amateur locales; ambas ramas, con meta de ≥35% de fichas femeniles |
| **Activos que aprovecha** | ACT-CMP-003 (Mundialito), ACT-SIS-002 (portal certificación), ACT-CMP-002 (TDP), ACT-SIS-001 (asociaciones estatales de Hidalgo y Oaxaca), COMET/Concacaf |
| **Objetivo** | Probar: emisión masiva de ID-J en puerta escolar con consentimiento de patria potestad; captura en baja conectividad; tasa de adopción de academias; primer cruce escolar↔federado↔academia; costo real por ficha |
| **Metodología** | Fase 1 (meses 1–6): convenio estatal + evaluación de impacto + módulo de consentimiento; Fase 2 (6–12): emisión en Mundialito 2027 + alta de academias certificadas; Fase 3 (12–18): cruce con registro amateur/TDP, medición de la cohorte (retención año 2, tránsito F2→F4), informe público |
| **Presupuesto** | 12–18 MDP piloto completo (dentro del paquete de implantación) [ESTIMACIÓN, confianza baja-media] |
| **Duración** | 18 meses |
| **Indicadores** | IND-DAT-001/002/004 en versión piloto + costo por ficha emitida |
| **Criterios de éxito (ex ante)** | ≥70% de participantes del Mundialito estatal con ID-J y consentimiento válido; ≥60% de academias certificadas del estado reportando; supresión efectiva verificada en muestra auditada; costo por ficha ≤ $40 MXN; 0 incidentes de seguridad no contenidos |
| **Criterios de escalamiento** | Éxito en ambos estados (no solo en Hidalgo) + dictamen favorable de la auditoría de datos → escalar a 8 estados (edición 2028) y nacional (2029) |
| **Criterios de cancelación** | <40% de consentimientos válidos (rechazo social del registro), incidente grave de seguridad de datos de menores, o costo por ficha >3× el previsto sin ruta de corrección |
| **Responsable** | FMF (registro) + SEP estatal + CONADE; auditor externo de datos desde el día 1 |
| **Riesgos** | RG-DAT-001, RG-DAT-002, RG-DAT-005 (sección 21) |

## 17. Responsable propuesto

**Dueño del pilar:** FMF (Secretaría General — registros y certificación), porque el registro federativo es materia asociativa y así lo exige FIFA Connect. **Contrapeso diseñado (presunción anticaptura, doc. 10 §5):** (i) CONADE custodia y publica el Data Box (la FMF no puede "apagar" la estadística pública); (ii) auditor externo de protección de datos con informe público; (iii) evaluador independiente en certificación de academias; (iv) la Secretaría Anticorrupción y Buen Gobierno como autoridad de tutela de datos con competencia plena sobre la FMF como responsable privado (A3 §5.7). Ninguna pieza nueva de gobernanza se crea: se usan las autoridades y facultades existentes.

## 18. Costo estimado

| Componente | Rango (MDP) | Confianza |
|---|---|---|
| Licencia COMET + implantación + migración (3 años) | 25–60 | **Baja** — condicionado a Q-5B-001; el orden de magnitud "accesible para federaciones medianas" es C |
| Módulo escolar + consentimientos (REC-DAT-002) | 8–15 | Media |
| Módulo certificación/reporte academias (REC-DAT-003) | 3–5 | Media |
| Régimen de datos de menores (REC-DAT-004, 3 años) | 4–8 | Media |
| Data Box (anual) | 1–2/año | Alta |
| Scouting antisesgo (REC-DAT-006) | 5–10 | Media |
| Ventanilla solidaridad (anual) | 2–3/año | Media |
| Piloto PIL-DAT-001 (subsumido parcialmente) | 12–18 | Baja-media |
| **Total implantación 3 años** | **≈ 55–110 MDP** + 5–8 MDP/año recurrente | Baja-media |

**Regla contractual [RECOMENDACIÓN]:** ninguna firma con Analyticom sin respuesta a Q-5B-001 y sin comparativo de al menos el contrato confederativo Concacaf como referencia de precio. **Fuentes de financiamiento propuestas:** FIFA Forward (elegible para sistemas de registro), presupuesto FMF, coinversión CONADE condicionada a Data Box (art. 55/58 LGCFD). Incluso en el techo del rango, el costo total es ~1% del valor de un solo mercado anual de traspasos internos (1,392 MDP) — la ceguera cuesta más que la vista [INFERENCIA].

## 19. Tiempo estimado

- Meses 0–3: convenio marco (REC-DAT-008), evaluación de impacto inicial, arranque contractual COMET.
- Meses 3–12: fase 1 profesional (Liga MX→TDP); régimen de menores operando; condición de datos en certificación de academias.
- Meses 6–18: piloto PIL-DAT-001 (2 estados + cohorte Mundialito 2027); primer Data Box (con L1–L8 como línea base).
- Meses 12–36: fase 2 amateur (32 asociaciones); módulo antisesgo; ventanilla de solidaridad; escalamiento escolar a 8 estados.
- Mes 36: registro nacional operando (rango benchmark 18–36 cumplido en su extremo conservador). **Meta 2030: holgura de ~18 meses.**

## 20. Dependencias

- **De A6 (embudo/incentivos):** el estándar deportivo de certificación de academias y el mecanismo de compensación doméstica onerosa; este pilar entrega la tubería de acreditación (REC-DAT-007).
- **De A7 (escuela):** operación en plantel de la ficha escolar y calendario del binomio (REC-DAT-002).
- **De A8 (entrenadores):** la resolución ENDIT/SICCED (E6) define el padrón de entrenadores que el Data Box publica.
- **De A12/A13 (femenil, si aplica):** metas de cobertura femenil de REC-DAT-006.
- **De DEC-008:** L5 (reconstrucción de federados y censo de academias) y L7 (flujos de solidaridad) son línea base del Data Box y de IND-DAT-007; L8 no bloquea.
- **Hacia A15 (secuencia):** REC-DAT-008 es acción de 100 días; REC-DAT-001 es prerequisito de la mayoría de los indicadores de los demás pilares — debe ir en la primera ola del cronograma.

## 21. Riesgos

| ID | Riesgo | Prob. | Impacto | Señal temprana | Mitigación | Contingencia |
|---|---|---|---|---|---|---|
| RG-DAT-001 | La FMF trata el registro como activo privado y bloquea el Data Box o el acceso de contrapartes (patrón E7/E8) | Media-alta | Crítico | Convenio sin cláusula de publicación; retrasos en entregas de agregados | Cofinanciamiento público condicionado a Data Box; custodia CONADE de la serie; cláusula de reversibilidad de datos en contrato COMET | Palanca art. 55/58 LGCFD sobre apoyos; publicación de lo público (módulo escolar SEP) aun sin la FMF |
| RG-DAT-002 | Incidente de seguridad/uso indebido de datos de menores (el riesgo reputacional que mata el registro) | Media | Crítico | Hallazgos de la auditoría; accesos no trazados | Régimen REC-DAT-004 como condición suspensiva; minimización <12; cifrado y logs; auditoría externa anual | Protocolo de brecha (LFPDPPP), suspensión del módulo afectado, notificación a tutela y familias |
| RG-DAT-003 | Registro capturado como herramienta de agentes/intermediarios (base de datos de captación temprana) | Media | Alto | Solicitudes de acceso masivo; enriquecimiento no autorizado con video <12 | Prohibición de acceso de agentes sin consentimiento específico; acceso de clubes solo-lectura ≥12 con log; sanción en certificación | Revocación de accesos, denuncia ante autoridad de datos, publicación del caso en Data Box |
| RG-DAT-004 | Doble captura / padrón paralelo (SEP o CONADE construyen lo suyo; el sistema nace duplicado) | Media | Medio | Licitaciones estatales de "plataformas de talento" | Convenio marco único (REC-DAT-008) con estándar FIFA Connect como interfaz obligatoria | Arbitraje del A0/A15 en cronograma; condicionar fondos a interoperar |
| RG-DAT-005 | Baja adopción en amateur/rural (asociaciones estatales E7 sin capacidad; conectividad R6/R7) | Alta | Medio | Piloto Oaxaca con <40% de captura | Captura offline-first; puerta escolar (SEP tiene capilaridad que la FMF no); apoyo de certificación a academias | Extender plazo fase 2; brigadas de registro en torneos (visorías = punto de captura) |
| RG-DAT-006 | Cuotas de visorías cumplidas en papel (gaming del indicador) | Media | Medio | Visorías registradas sin fichas nuevas asociadas | Toda visoría debe producir registros verificables (asistentes con ID-J); verificación muestral del evaluador independiente | Ajuste de la fórmula del indicador (visorías con producto, no eventos) |
| RG-DAT-007 | Discontinuidad sexenal del componente público (Mundialito/Data Box) — RG-A1-004 heredado | Media-alta | Alto | PEF sin partida; cambio de reglas de operación | Serie en datos.gob.mx + dictamen INEGI (costo político de borrarla); multi-firma del convenio con 32 estados | El núcleo federativo (COMET) sobrevive solo; reconstrucción del módulo escolar en siguiente ciclo |

## 22. Bloqueadores políticos/jurídicos/económicos

1. **Voluntad de la asamblea FMF** para la obligatoriedad del registro en competencias afiliadas (vía RL): es la pieza federativa del paquete; su venta política es que el registro **les cobra a los clubes menos de lo que les paga** (acredita formación → cobros Clearing House; datos de cantera → valor de venta). 2. **Opacidad contractual** (Q-5B-001): sin precio de referencia, riesgo de sobrecosto. 3. **Fragmentación de 32 autoridades educativas estatales** para la ficha escolar: se mitiga con adhesión gradual (piloto → 8 → 32). 4. **Autoridad de datos nueva** (Secretaría Anticorrupción, sin práctica deportiva): el registro mexicano puede ser su primer caso sectorial — riesgo y oportunidad. 5. **No hay bloqueador FIFA:** todo el paquete está en la fila 9 del mapa A3 (riesgo nulo) y FIFA Connect es política FIFA activa — este pilar rema *a favor* del regulador internacional.

## 23. Indicadores (fichas T-6 condensadas)

| ID | Nombre | Fórmula | Fuente | Frecuencia | Responsable | Línea base | Meta 2030 / 2034 / 2038 / 2046 | Desagregación | Antimanipulación |
|---|---|---|---|---|---|---|---|---|---|
| IND-DAT-001 | Cobertura del ID-J | Jugadores activos con ID-J / jugadores activos estimados (F2–F7) | COMET; denominador: embudo A6+L5 | Anual | FMF | 0% con ID único integral (2026) | 60% / 85% / 95% / 95%+ | Género, región, edad, NSE | Auditoría muestral del denominador (INEGI/evaluador) |
| IND-DAT-002 | Ficha única escolar | Participantes Mundialito/Copa CONADE con ID-J y consentimiento válido / participantes totales | SEP + COMET | Anual (por edición) | SEP+FMF | 0 (2026) | 80% nacional / 95% / — / — | Género, estado, tipo de escuela | Cotejo CURP; verificación de consentimientos en muestra |
| IND-DAT-003 | Academias reportando | Academias certificadas con reporte semestral completo / academias certificadas | Portal certificación | Semestral | Evaluador indep. | 0 (portal abre ago-2026) | 90% / 95% / 95% / 95% | Estado, tamaño, cuota | La certificación caduca sin reporte (autoejecutable) |
| IND-DAT-004 | Cumplimiento del régimen de menores | Módulos con evaluación de impacto vigente y auditoría sin hallazgos críticos / módulos operando | Auditor externo | Anual | DPO FMF + auditor | No existe (SUP-JUR-006) | 100% desde el año 1 (no admite gradualidad) | — | Informe del auditor publicado en Data Box |
| IND-DAT-005 | Data Box publicado | Publicación anual completa (checklist de 7 series) en formato abierto, ≤180 días del cierre | datos.gob.mx | Anual | CONADE | Inexistente (último censo 2006) | 4 ediciones consecutivas / serie continua / ídem / ídem | Todas las series por género/región | Dictamen metodológico INEGI; checklist público |
| IND-DAT-006 | Cobertura antisesgo de visorías | (a) Visorías registradas en R6/R7 / total; (b) índice RAE (Q1/Q4) en selecciones juveniles; (c) % visorías femeniles | COMET módulo scouting | Anual | FMF + evaluador | Sin línea base (la fija el año 1) | (a) ≥ proporción poblacional 5–17 de R6/R7; (b) Q1/Q4 ≤ 2.0; (c) ≥30% / mejora continua | Región, NSE, género, trimestre | Visorías válidas solo con asistentes verificables (RG-DAT-006) |
| IND-DAT-007 | Formadores de base cobrando | Clubes/academias de base (no Liga MX) que recibieron pagos de formación o solidaridad en el año / formadores acreditados en EPP con jugador detonante | Clearing House + FMF; línea base L7 | Anual | FMF ventanilla | Cobro marginal [SUP-JUR-005]; L7 la cuantifica | ≥50% de casos detonantes cobrados / ≥80% / ≥90% / ≥90% | Tamaño de club, estado | Contraste con informes públicos FCH |
| IND-DAT-008 | Interoperabilidad efectiva | Módulos de intercambio operando (transferencias reales de datos) / módulos convenidos | Logs del convenio marco | Semestral | Comité del convenio | 0 | 100% de los 4 módulos (SEP, CONADE, clubes, FIFA) | — | Log técnico auditable, no actas |

## 24. Casos internacionales citados

**Croacia (COMET)** — registro nacional más exportado del mundo; implantación ~2 años; advertencia gemela: registro sin gobernanza de datos = base de datos capturada (5B §5.16). **Uruguay (ONFI/AUF)** — ficha única 6–13 con cuota simbólica; AUF usuaria de COMET; hasta el club de baby fútbol rastrea su contribución formativa. **Japón (JFA Data Box)** — serie pública anual 1979–2025; "publicar es decisión, no capacidad". **Concacaf** — adopción confederativa de COMET: la condición previa que México ya cumple sin haber hecho nada. **Noruega (NIF)** — salvaguardas de infancia como restricción reglamentaria del dato competitivo (<12 sin tablas: el registro escolar mexicano tampoco publica resultados individuales <12). **Alemania (declive 2018–2026)** — la re-auditoría periódica se incorpora: revisión quinquenal del propio pilar (sección 25).

## 25. Adaptación a México (por qué funciona aquí)

1. **La condición previa más cara ya está pagada:** pertenencia a la confederación que opera COMET (5B §5.15) y una Clearing House FIFA ya funcionando (E1). México no importa un modelo: se conecta a infraestructura de la que ya es miembro.
2. **Las puertas de entrada masivas ya existen y tienen calendario** (DEC-010): Mundialito (1.18 M), portal de certificación (ago-2026), TDP (238 clubes). El diseño no crea puertas: emite el ID en las existentes.
3. **El marco jurídico es suficiente y reciente** (leyes 2025): a diferencia de casi cualquier otra reforma del plan, ésta no espera a nadie — DEC-007 fila 9 es la única fila del mapa con riesgo nulo por *todas* las vías.
4. **El incentivo es autoejecutable:** el registro paga a quien registra (cobro de formación), a los clubes (valor de cantera documentado ante compradores), al Estado (estadística y evaluación) y a FIFA (Connect/EPP). Es de las pocas piezas del plan donde ningún actor con veto pierde dinero — clave dado SUP-002.
5. **Vacunas incorporadas:** contra la captura del dato (custodia pública del Data Box, auditor externo), contra el uso extractivo (régimen de menores como condición suspensiva), contra el gaming (fórmulas antimanipulación en T-6), contra el olvido (re-auditoría quinquenal del pilar, lección alemana) y contra el sexenio (núcleo federativo autónomo + serie pública multi-firma).
6. **Riesgo residual honesto:** la escala (México registraría en su techo ~10× los federados de Croacia o Uruguay) y el federalismo educativo de 32 sistemas estatales no tienen precedente exacto en el benchmark; por eso el piloto de 2 estados incluye deliberadamente el caso difícil (Oaxaca) y el criterio de cancelación está definido ex ante.

## 26. Preguntas pendientes (nuevas entradas al registro Q)

- **Q-DAT-001:** ¿Existe ya alguna instancia COMET habilitada para la FMF vía el contrato confederativo Concacaf (y qué módulos incluye)? Fuente: Concacaf/Analyticom. Bloquea: alcance del contrato REC-DAT-001.
- **Q-DAT-002:** Grado real de digitalización del registro profesional FMF/Liga MX (SIID: arquitectura, calidad de datos, historiales). Fuente: FMF. Vía: convenio marco.
- **Q-DAT-003:** ¿Qué proveedores privados de scouting/video operan hoy sobre menores mexicanos, con qué avisos de privacidad y bases de licitud? Fuente: mercado + Secretaría Anticorrupción. Alimenta la primera acción de tutela (REC-DAT-004).
- **Q-DAT-004:** Costo por ficha y tasa de consentimiento del piloto ONFI-tipo en contexto de baja conectividad (lo responde PIL-DAT-001; no tiene fuente documental previa).
- **Q-DAT-005:** ¿La CURP es jurídicamente utilizable como llave interna de cotejo para menores en un registro federativo privado bajo la LFPDPPP 2025, o se requiere identificador derivado? Fuente: opinión de la autoridad de datos. Destinatario: implementación REC-DAT-008.
- **Q-5B-001 (reiterada, crítica):** costo real de licenciamiento COMET para una federación del tamaño de la FMF — condición contractual de REC-DAT-001.

---

## Anexo A. Régimen de protección de datos del menor deportista (especificación de diseño de REC-DAT-004)

Este anexo es **parte normativa del diseño**: ningún módulo del registro entra en operación sin cumplirlo. Base: LFPDPPP 2025, LGPDPPSO 2025, LGDNNA (interés superior de la niñez; intimidad, arts. 76 y ss.), A3 §5.7.

**A.1 Consentimiento.** El alta de todo menor requiere consentimiento informado de quien ejerce patria potestad/tutela, específico por finalidad (registro deportivo ≠ scouting ≠ video ≠ investigación), revocable en cualquier momento con supresión efectiva, y en lenguaje llano (aviso de privacidad específico para visorías masivas y para la ficha escolar — hoy inexistentes). El adolescente ≥15 años co-firma (autonomía progresiva). La negativa **nunca** excluye de jugar: solo excluye del expediente ampliado (la ficha mínima de competencia opera con la base jurídica estrictamente necesaria).

**A.2 Minimización por edad.** *<12 años:* solo ficha mínima (identidad, fecha de nacimiento, sexo, escuela/club, temporada, minutos agregados); **prohibidos** video individualizado, biometría, datos de salud no esenciales, perfilamiento y ranking individual público (coherente con el formato sin tablas <12 de la matriz R3). *12–14:* se habilitan pruebas físicas y lesiones con consentimiento expreso (dato sensible: por escrito). *15–17:* expediente completo, incluido video, con doble consentimiento (tutor + adolescente).

**A.3 Contenido del expediente (mayores de 12) y finalidades tasadas.** Historial deportivo (minutos, posiciones, competencias — base del EPP), pruebas físicas seriadas, historial de lesiones (visible solo para personal médico autorizado), trayectoria escolar (solo estatus de permanencia/grado, vía SEP — dato de protección, no de selección: alimenta la condición de permanencia escolar de la certificación), video (≥12, consentimiento específico, almacenamiento cifrado). Finalidades permitidas: gestión de competencia, desarrollo deportivo, salud del jugador, acreditación formativa, estadística agregada. **Prohibidas sin consentimiento específico adicional:** uso comercial, cesión a agentes/intermediarios, publicidad, venta de bases de datos — la violación por una academia revoca su certificación; por un club, activa sanción reglamentaria y denuncia ante la autoridad de datos.

**A.4 Conservación y supresión.** Baja deportiva → expediente ampliado (video, pruebas, salud) se suprime a los 24 meses; la ficha de trayectoria (identidad + periodos formativos + minutos) se conserva hasta los 23 años del jugador **porque es el título de cobro de sus formadores** (Anexo 4/5 RSTP), y después se anonimiza para estadística. Supresión verificable: log de borrado auditado anualmente en muestra.

**A.5 Transferencia internacional.** La sincronización con FIFA Connect/EPP y cualquier consulta transfronteriza (Clearing House, transferencias) es transferencia internacional de datos: se ejecuta bajo cláusulas contractuales del contrato COMET, se informa en el aviso de privacidad, y se limita al contenido EPP (periodos formativos), nunca al expediente ampliado.

**A.6 Evaluaciones de impacto.** Obligatorias y previas para: ficha escolar (escala masiva), módulo de video, módulo de maduración biológica, y cualquier analítica nueva sobre menores. Se registran ante la Secretaría Anticorrupción y Buen Gobierno; su existencia y conclusiones generales se publican en el Data Box.

**A.7 Gobernanza.** *Responsable:* FMF (con DPO obligatorio, primero de su historia — SUP-JUR-006 asume que no existe). *Corresponsables:* SEP (módulo escolar, régimen LGPDPPSO) y CONADE (Data Box). *Encargado:* Analyticom (contrato con obligaciones de encargado, localización de respaldos y reversibilidad). *Audita:* auditor externo independiente anual (informe público) + tutela de la Secretaría Anticorrupción con competencia sancionatoria plena. *Acceso de clubes:* solo lectura, trazable, ≥12 años, revocable. *Acceso de agentes:* inexistente por defecto (A.3).

---

*Fin del entregable del Agente 10. Extensión aproximada: 5,600 palabras. Las recomendaciones REC-DAT-001 a 008, los indicadores IND-DAT-001 a 008, los riesgos RG-DAT-001 a 007, el piloto PIL-DAT-001 y las preguntas Q-DAT-001 a 005 quedan inscritos para integración del Agente 0 en Fase 6.*
