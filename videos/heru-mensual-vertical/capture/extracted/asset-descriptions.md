# Inventario de assets

Origen: capturas de pantalla de la app de heru entregadas por el usuario (2026-09-10),
más el logo del repo. La captura automática de https://www.heru.app quedó bloqueada
(ver `capture/CAPTURE-FAILED.md`); los tokens de marca sí se extrajeron del HTML del
sitio y viven en `tokens.json`.

Todas las capturas son de móvil, **1080x2108** (relación ~0.512). Se usan dentro de
maquetas de teléfono, nunca a sangre en un lienzo 16:9.

| Archivo | Qué es | Dónde sirve |
|---|---|---|
| `assets/01-splash-logo.jpg` | Splash de la app: wordmark `heru` en blanco sobre azul de marca sólido (#1D8FF3), squircle apenas más claro detrás. | Ident de apertura o cierre. La fuente más limpia del logo en contexto real. |
| `assets/02-inicio-primeros-pasos.jpg` | Home: saludo del asesor digital "Miguel Hernández", **"Hola, Andres 👋"**, checklist "Primeros pasos 1/4" con "Vincula tu RFC · ~2 min", "Tu plan recomendado: Plan RESICO", "Completa tu perfil fiscal". | Prueba de que el producto guía paso a paso. ⚠ Contiene el nombre real "Andres". |
| `assets/03-conecta-sat-efirma.jpg` | "Conecta tu cuenta del SAT" con e.firma: subir `.cer` y `.key`, campo de contraseña, badge "Encriptado 🔒", botón "Conectar e.firma". | El momento de vinculación con el SAT. El badge de encriptado es el detalle de confianza. |
| `assets/04-facturacion.jpg` | Facturación: "Facturar es gratis — Genera todas tus facturas del SAT en menos de 1 minuto con heru", tarjetas Ingreso / Egreso / Pago / Comp., botón "Nueva factura". | Muestra alcance del producto más allá de la declaración. |
| `assets/05-plan-resico.jpg` | "Plan RESICO — primer mes **Gratis** ~~$799~~", "Te recomendamos el plan anual y ahorra $2,397", "Ideal para personas que generan ingresos como freelancers, renta de propiedades, ventas online, influencers". | Cierre comercial / oferta. Contiene precios. |
| `assets/06-buzon-tributario.jpg` | Buzón tributario vacío: "Tu buzón está vacío — Cuando el SAT te envíe notificaciones o documentos, aparecerán aquí." | Estado de calma. Visualmente el "no tienes pendientes". |
| `assets/07-logo-heru-white.png` | Logo `heru` blanco con alfa, 2787x1347, del repo. | Logo sting de cierre sobre fondo de marca. |

## Notas para el diseño

- La barra inferior de la app (Planes · Facturación · Inicio · Declaraciones) se repite en
  casi todas las capturas: sirve como elemento de continuidad si dos pantallas se encadenan.
- El banner superior "¡TU PRIMER MES VA POR NUESTRA CUENTA! 🎁" aparece recortado en varias
  capturas. Si una pantalla se muestra completa, ese recorte se nota; encuadrar por debajo del
  banner o dejarlo entrar deliberadamente.
- ⚠ `02-inicio-primeros-pasos.jpg` dice "Hola, Andres". Es una cuenta real. Decidir antes de
  construir: dejarlo, o encuadrar el teléfono para que el saludo quede fuera de cuadro.
