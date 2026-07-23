# Registro de Contradicciones

Cuando dos fuentes o dos agentes lleguen a conclusiones incompatibles, se documentan ambas
con su evidencia y su nivel. Responsabilidad de consolidación: Agente 0.

| ID | Tema | Posición A | Evidencia A (nivel) | Posición B | Evidencia B (nivel) | Decisión | Justificación | Incertidumbre restante |
|----|------|-----------|---------------------|-----------|---------------------|----------|---------------|------------------------|
| C-000 | *(ejemplo)* Efecto de limitar extranjeros | Sube minutos de mexicanos | B | Baja el nivel competitivo y no mejora formación | B | Pendiente | — | Alta |

## Reglas de resolución
1. Gana la posición con mayor nivel de evidencia (A > B > C > D).
2. Si empatan en nivel, se busca una tercera fuente (triangulación).
3. Si no se puede resolver, se marca `NO-RESUELTA` y se traslada al red team y al
   integrador final con su incertidumbre explícita.
4. Ninguna contradicción de tema estructural puede quedar oculta en el entregable final.
