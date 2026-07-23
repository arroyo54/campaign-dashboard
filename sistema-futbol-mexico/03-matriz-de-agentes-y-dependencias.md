# Matriz de Agentes y Dependencias

**Agente 0 — Director General de Investigación**
**Fase 1 · Entregable 4 de 13**

---

## 1. Matriz de agentes (ámbito, entradas, salidas)

| Agente | Ámbito (qué SÍ) | Fuera de ámbito (qué NO) | Entradas | Salidas |
|--------|-----------------|--------------------------|----------|---------|
| 0 | Método, integración, control | Diseño sustantivo de pilares | Prompt maestro; entregables de cada fase | Método (F1); línea base integrada (F3); borrador integrado (F6, F9) |
| 1 Capacidades | Inventario y clasificación de activos | Juicio de gobernanza/poder | Manual, taxonomía, plantillas | Inventario nacional clasificado |
| 2 Gobernanza | Poder, incentivos, conflictos | Diseño legal detallado | Manual; inventario (parcial) | Mapa de poder |
| 3 Derecho | Marco jurídico, competencia, injerencia | Costeo | Manual; inventario | Diagnóstico jurídico |
| 4 Economía | Ingresos, costos, incentivos económicos | Diseño de competición | Manual; inventario | Diagnóstico económico + respuesta "extranjero vs mexicano" |
| 5A–5E Benchmark | Casos país, transferibilidad | Diseño del modelo MX | Línea base; formato común | Fichas país + matriz transferibilidad |
| 6 Formación | Recorrido 5–23, academias | Infraestructura física; datos | Línea base, benchmark, restricciones | Diseño Pilar formación |
| 7 Escuela/univ/comunidad | Integración educativa | Reforma de Liga | Línea base, benchmark | Diseño Pilar educativo |
| 8 Entrenadores/ciencia | Capital humano técnico-científico | Selección nacional | Línea base, benchmark | Diseño Pilar entrenadores |
| 9 Infraestructura | Capacidad, uso, brechas físicas | Formación deportiva | Inventario, línea base | Diseño Pilar infraestructura |
| 10 Datos/scouting | Interoperabilidad, protección de datos | Metodología deportiva | Inventario, diagnóstico jurídico | Diseño Pilar datos |
| 11 Selecciones | Integración de categorías | Fuerzas básicas de club | Línea base, benchmark | Diseño Pilar selecciones |
| 12 Cultura/medios | Narrativa (no propaganda) | Regulación de medios | Mapa de poder, línea base | Diseño Pilar cultura |
| 13 Femenil/inclusión | Auditoría transversal | (transversal a todos) | Todos los diseños F5 | Auditoría de equidad |
| 14 Finanzas | Costeo, sostenibilidad | Diseño de pilares | Borrador integrado F6 | Presupuesto + escenarios + sensibilidad |
| 15 Implementación | Cronograma, cambio, coaliciones | Costeo | Borrador integrado F6 | Hoja de ruta + gobernanza de proyecto |
| 16 Red team | Crítica adversarial total | Rediseño (solo propone) | Borrador + presupuesto + cronograma | Registro de críticas con veredicto |
| 17 Integrador | Consolidación y redacción final | Investigación nueva | Todo lo anterior corregido | 11 productos finales |

---

## 2. Grafo de dependencias entre fases

```
Agente 0 (F1)
   │  entrega método, taxonomía, plantillas, criterios, handoff
   ▼
Agentes 1,2,3,4 (F2)  ── paralelo ──►  Agente 0 integra (F3)
   (1 alimenta a 2,3,4 con el inventario)         │ línea base única
                                                   ▼
                              Agentes 5A–5E (F4) ── paralelo ──► matriz transferibilidad
                                                   │
                                                   ▼
   Agentes 6,7,8,9,10,11,12,13 (F5) ── paralelo ──► Agente 0 integra (F6)
   (todos reciben: línea base + benchmark +          │ borrador integrado
    restricciones + inventario + mapa de poder +     ▼
    diagnóstico jurídico + diagnóstico económico)  Agentes 14,15 (F7) → reconciliación
                                                   │
                                                   ▼
                                          Agente 16 red team (F8)
                                                   │
                                                   ▼
                                    Agente 0 + afectados corrigen (F9)
                                                   │
                                                   ▼
                                       Agente 17 integra final (F10)
                                                   │
                                                   ▼
                                       Agente 0 revisión final (F11)
```

---

## 3. Dependencias críticas (las que NO pueden violarse)

| # | Depende de | Regla |
|---|-----------|-------|
| D1 | F2 depende de F1 | Ningún agente de línea base arranca sin método aprobado (Control 1). |
| D2 | Agentes 2,3,4 dependen del inventario del Agente 1 | El Agente 1 entrega primero un inventario preliminar (semana temprana) para que 2/3/4 lo usen. |
| D3 | F4 (benchmark) depende de F3 | El benchmark se hace **con la línea base en mano** para preguntar lo relevante a cada país. |
| D4 | F5 (diseño) depende de F3 **y** F4 | No se diseña sin diagnóstico local ni benchmark; ambos son insumos obligatorios. |
| D5 | Agente 13 depende de 6–12 | La auditoría de equidad se hace **sobre** los diseños, no antes. |
| D6 | F7 depende de F6 | No se costea ni se secuencia un borrador con duplicidades sin resolver. |
| D7 | Costeo (14) y cronograma (15) se reconcilian **entre sí** | Un cronograma sin presupuesto o un presupuesto sin secuencia es inválido. |
| D8 | F8 depende de F7 | El red team ataca el paquete completo (diseño + costo + tiempo). |
| D9 | F10 depende de F9 | El integrador final solo consolida lo ya corregido. |

---

## 4. Puntos de sincronización (barreras)

Hay cuatro barreras donde **todo** debe estar entregado antes de continuar: cierre de F2
(línea base), cierre de F4 (benchmark), cierre de F5 (diseño) y cierre de F7 (costo+tiempo).
En el resto del flujo se admite trabajo encadenado.

## 5. Manejo de contradicciones entre agentes

Cuando dos agentes lleguen a conclusiones incompatibles (típico entre Economía y Formación,
o entre Gobernanza y Derecho), el Agente 0 abre una entrada en el **Registro de
Contradicciones**, documenta ambas posiciones con su evidencia y su nivel, y resuelve con
criterio explícito. Si la evidencia no basta para resolver, la contradicción se traslada
como **pregunta abierta** al red team y al integrador final, marcada con su incertidumbre.
