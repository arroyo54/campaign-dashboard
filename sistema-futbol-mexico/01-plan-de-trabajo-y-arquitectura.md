# Plan de Trabajo y Arquitectura Multiagente

**Agente 0 — Director General de Investigación**
**Fase 1 · Entregable 2 de 13**

---

## 1. Lógica de la arquitectura

El proyecto se organiza en **18 agentes** que operan en **11 fases secuenciales con
paralelismo interno**. El diseño responde a una regla causal: **no se diseña antes de
diagnosticar, y no se diagnostica antes de fijar el método.** Cada bloque de agentes
produce un insumo que el siguiente necesita; las puertas de control impiden avanzar con
insumos incompletos.

Secuencia macro:

```
FASE 1  Método            → Agente 0
FASE 2  Línea base MX      → Agentes 1,2,3,4        (paralelo)
FASE 3  Integración base   → Agente 0
FASE 4  Benchmark          → Agentes 5A,5B,5C,5D,5E (paralelo)
FASE 5  Diseño de pilares  → Agentes 6–13           (paralelo)
FASE 6  Integración prelim → Agente 0
FASE 7  Costo + implement. → Agentes 14,15          (paralelo, luego reconciliación)
FASE 8  Red team           → Agente 16
FASE 9  Corrección         → Agente 0 + agentes afectados
FASE 10 Integración final  → Agente 17
FASE 11 Revisión final     → Agente 0
```

---

## 2. Catálogo de agentes

| ID | Agente | Misión en una línea | Fase |
|----|--------|---------------------|------|
| 0 | Director de investigación | Método, taxonomía, plantillas, registros, controles, integración | 1,3,6,9,11 |
| 1 | Capacidades existentes | Inventario de instituciones, infraestructura, programas, capital humano, datos, Mundial 2026 | 2 |
| 2 | Gobernanza y poder | FMF, Liga, dueños, clubes, TV, patrocinadores, gobierno, FIFA/Concacaf, agentes, medios | 2 |
| 3 | Derecho y regulación | Leyes, reglamentos, competencia económica, multipropiedad, menores, agentes, transferencias, datos, injerencia | 2 |
| 4 | Economía del fútbol | Ingresos, costos, incentivos, transferencias, salarios, extranjeros, formación, exportación, distribución | 2 |
| 5A | Benchmark Europa Occidental | España, Portugal, Francia, Alemania, Países Bajos, Bélgica | 4 |
| 5B | Benchmark países pequeños/comunitarios | Noruega, Islandia, Dinamarca, Suecia, Croacia, Uruguay | 4 |
| 5C | Benchmark África y diáspora | Marruecos, Senegal, Ghana, Costa de Marfil | 4 |
| 5D | Benchmark América | EE. UU., Canadá, Argentina, Brasil, Colombia | 4 |
| 5E | Benchmark Asia y Oceanía | Japón, Corea del Sur, Australia | 4 |
| 6 | Formación y fuerzas básicas | Recorrido 5–23 años, academias, estándares, minutos | 5 |
| 7 | Escuela, universidad y comunidad | Integración educativa, carrera dual, fútbol escolar/universitario/comunitario | 5 |
| 8 | Entrenadores y ciencia | Licencias, certificación, mentoría, ciencia del deporte, staff multidisciplinario | 5 |
| 9 | Infraestructura | Capacidad, uso, brechas; mantenimiento/rehabilitación/uso compartido/ampliación/construcción | 5 |
| 10 | Datos y scouting | Arquitectura interoperable, identificador único, protección de datos, detección de sesgos | 5 |
| 11 | Selecciones | Integración de categorías, manual metodológico, binacionales, diáspora | 5 |
| 12 | Cultura y medios | Estrategia narrativa (no propaganda), papel de TV/plataformas/prensa/afición | 5 |
| 13 | Fútbol femenil e inclusión | Auditoría transversal (no como sistema separado) | 5 |
| 14 | Finanzas | Costeo, duplicidades, inversión vs operación, fuentes, sostenibilidad, sensibilidad | 7 |
| 15 | Implementación | Cronograma, dependencias, gobernanza del proyecto, pilotos, gestión del cambio, coaliciones | 7 |
| 16 | Red team | Ataque crítico a supuestos, datos, costos, calendarios, gobernanza, legalidad, captura | 8 |
| 17 | Integrador final | Consolida y produce los 11 productos finales | 10 |

---

## 3. Insumos y productos por fase

### Fase 1 — Método (Agente 0) · **este entregable**
- **Insumos:** prompt maestro.
- **Productos:** los 13 entregables de Fase 1 (ver README).
- **Puerta de salida:** Control 1.

### Fase 2 — Línea base mexicana (Agentes 1–4, paralelo)
- **Insumos:** manual, taxonomía, plantillas, registros, criterios reformar/crear, handoff.
- **Productos:** inventario nacional de activos clasificados; mapa de gobernanza y poder;
  diagnóstico jurídico; diagnóstico económico (incluida la pregunta "¿por qué es más
  rentable contratar a un extranjero promedio que desarrollar a un mexicano?").
- **Regla:** aún **no** se diseña nada.
- **Puerta de salida:** Control 2.

### Fase 3 — Integración de la línea base (Agente 0)
- Consolida los cuatro diagnósticos en una **línea base única**, resuelve contradicciones
  iniciales, publica el embudo nacional preliminar y el mapa de restricciones.

### Fase 4 — Benchmark internacional (Agentes 5A–5E, paralelo)
- **Insumos:** línea base + formato común de país (16 puntos) + matriz de transferibilidad.
- **Productos:** fichas país homogéneas; matriz de transferibilidad (aplicable directo /
  con adaptación / difícil / no recomendable).
- **Puerta de salida:** Control 3.

### Fase 5 — Diseño de pilares (Agentes 6–13, paralelo)
- **Insumos que TODOS reciben:** línea base, benchmark, restricciones, inventario, mapa de
  poder, diagnóstico jurídico, diagnóstico económico.
- **Productos:** propuestas por pilar con la plantilla de diseño (problema → activo
  existente → falla → reforma → integración → escalamiento → nueva capacidad → responsable
  → costo → tiempo → indicador → riesgos → bloqueadores → piloto → escalamiento).
- **Puerta de salida:** Control 4 (incluye verificación de la cuota 70 %).

### Fase 6 — Integración preliminar (Agente 0)
- Elimina duplicidades, contradicciones, organismos innecesarios, proyectos paralelos y
  recomendaciones inviables. Produce un borrador integrado **sin** presupuesto todavía.

### Fase 7 — Finanzas e implementación (Agentes 14 y 15, paralelo → reconciliación)
- Agente 14 costea; Agente 15 secuencia. Luego se reconcilian presupuesto, cronograma,
  dependencias y capacidad institucional.
- **Puerta de salida:** Control 6.

### Fase 8 — Red team (Agente 16)
- Ataca todo el borrador. Cada crítica trae: problema, evidencia, gravedad, consecuencia,
  corrección y veredicto (mantener/modificar/eliminar).
- **Puerta de salida:** Control 7 (no se avanza sin responder cada crítica).

### Fase 9 — Corrección (Agente 0 + agentes afectados)
- Incorpora las correcciones del red team.

### Fase 10 — Integración final (Agente 17)
- Produce: documento ejecutivo, documento técnico, presupuesto, hoja de ruta, RACI,
  dashboard, riesgos, propuesta regulatoria, anexos, resumen para medios y presentación.

### Fase 11 — Revisión final (Agente 0)
- Verifica fuentes, cifras, consistencia, presupuesto, responsables, fechas, indicadores y
  viabilidad.
- **Puerta de salida:** Control 8 (publicación).

---

## 4. Reglas de paralelismo y bloqueo

- Los agentes de una misma fase trabajan en paralelo pero **no se leen entre sí durante la
  fase**: comparten hallazgos solo a través del Agente 0 al cierre, para evitar contaminación
  y groupthink.
- Un agente **bloquea** el avance de fase si no entrega la plantilla completa o deja
  preguntas críticas sin registrar.
- Las dependencias entre fases son estrictas (documento 03). No hay "adelantos" de diseño
  en fase de diagnóstico.

## 5. Ámbitos de decisión del Agente 0

El Agente 0 decide sobre método, taxonomía, resolución de contradicciones y priorización de
preguntas; **no** decide el contenido sustantivo de los pilares (eso es de los agentes de
diseño, validado por finanzas, implementación y red team). Toda decisión del Agente 0 se
asienta en el Registro de Decisiones.
