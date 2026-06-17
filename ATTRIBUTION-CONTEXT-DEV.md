# Sistema de Atribución Multi-Touch — Contexto para Dev

## TL;DR

Necesitamos que agreguen **1 línea de código** en el `<head>` de `web.heru.app` y, idealmente, un POST desde el backend cuando se confirma una compra. Esto nos da un sistema de atribución propio que nos dice qué canal de pauta realmente genera ventas.

---

## Cómo llegamos aquí

### El problema

Nuestro dashboard de campañas muestra ROAS (Return on Ad Spend) por canal — cuánto revenue genera cada peso invertido en Google, Meta, Reddit, etc. Pero detectamos que **Meta y Google a veces reportan compras sin valor** (ROAS aparece "—" en lugar de un número). Esto pasa porque:

- Los pixels client-side (Meta Pixel, Google Tag) a veces no capturan el `value` del evento `purchase`
- Cada plataforma se atribuye las conversiones a sí misma (Google dice que Google convirtió, Meta dice que Meta convirtió)
- No hay forma de ver el **journey completo** de un usuario: llegó por Google, vio un anuncio de Meta, entró directo, y compró

### El hallazgo: Elykia

Encontramos [Elykia](https://www.elykia.com.ar) — una plataforma de atribución argentina. Su snippet se instala con 1 línea:

```html
<script async src="https://www.elykia.com.ar/api/collect/snippet?key=pk_xxx"></script>
```

Hicimos reverse engineering de su tracker (v9) y encontramos que:

- Usa una cookie persistente (`_elykia_cid`, 2 años) como ID único por browser
- Captura todos los click IDs de ads (gclid, fbclid, ttclid, rdt_cid, etc.)
- Captura UTMs y referrer en cada página
- Detecta emails en formularios y los hashea con SHA-256 para asociarlos al visitor ID
- Manda batches de eventos a su backend cada 2 segundos
- Soporta SPAs (wrappea pushState/replaceState)

**Decidimos construir lo mismo nosotros** porque:
1. Control total de los datos (no depender de un tercero argentino)
2. Se integra directo con nuestro campaign dashboard existente
3. Sin costo mensual de plataforma
4. Podemos cruzar con nuestros datos de spend de Google Sheets

---

## Qué construimos

### Infraestructura

| Componente | Dónde vive | URL |
|-----------|-----------|-----|
| Firebase Project | `heru-growth` | [Console](https://console.firebase.google.com/project/heru-growth) |
| Campaign Dashboard | Firebase Hosting | https://heru-growth-dashboard.web.app |
| Tracker Script | Firebase Hosting | https://heru-growth-dashboard.web.app/heru-tracker.js |
| Endpoint receptor | Cloud Function | https://us-central1-heru-growth.cloudfunctions.net/collect |
| Base de datos | Firestore | Collections: touchpoints, purchases, identities |
| Dashboard de atribución | Dentro del campaign dashboard | Paid Media → Attribution |

### El tracker (heru-tracker.js) — ~8KB, async

Qué hace automáticamente al cargarse:

1. **Crea un visitor ID** — cookie `_heru_cid` (2 años) con backup en localStorage (para Safari ITP que borra cookies JS a los 7 días)
2. **Captura UTMs** — `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` del URL
3. **Captura click IDs de ads** — `gclid` (Google), `fbclid` (Meta), `rdt_cid` (Reddit), `ttclid` (TikTok), `wbraid`, `gbraid`
4. **Maneja sesiones** — cookie `_heru_session` de 30 min rolling
5. **Detecta identidad** — observa formularios de signup/login, cuando el usuario escribe un email lo hashea con SHA-256 y lo asocia al visitor ID
6. **Detecta compras** — cuando el URL contiene `/successful-purchase`, captura el evento como purchase
7. **Soporta SPA** — wrappea `pushState`/`replaceState` para detectar navegación sin recarga
8. **Envía en batches** — acumula eventos y los manda cada 2 segundos al endpoint `/collect` (o en `beforeunload` con `fetch keepalive`)

### El backend (Cloud Functions)

- **`/collect`** — Recibe batches de eventos del tracker, los guarda en Firestore. Asocia visitor IDs con email hashes. Deduplica compras por `transaction_id`.
- **`/attribution`** — Dado un visitor ID, devuelve el journey completo con touchpoints y atribución calculada (modelo U-shape: 40% primer toque, 40% último toque, 20% toques intermedios)
- **`/attributionSummary`** — Resumen diario de revenue atribuido por fuente, para el dashboard

### Identity Resolution (cómo cruzamos la compra con el journey)

```
Cookie _heru_cid → email_hash (capturado en signup/login) → purchase (via email_hash)
```

1. Usuario llega por anuncio de Google → tracker crea `_heru_cid = abc123`, guarda `gclid` y `utm_source=google`
2. Navega varias páginas → tracker registra touchpoints
3. Llena formulario de signup con su email → tracker hashea el email con SHA-256 y lo asocia: `abc123 ↔ sha256(email)`
4. Compra un plan → el backend manda el purchase con `sha256(email)` → se cruza con `abc123` → se reconstruye el journey completo

---

## Qué necesitamos de Dev

### 1. Instalar el tracker (OBLIGATORIO)

Agregar esta línea en el `<head>` global de `web.heru.app` (el que aplica a todas las páginas):

```html
<script async src="https://heru-growth-dashboard.web.app/heru-tracker.js"></script>
```

- Es `async` — no bloquea la carga de la página
- Pesa ~8KB
- No requiere configuración adicional
- No modifica el DOM visible
- No interfiere con GTM ni otros scripts existentes
- Respeta opt-out via cookie `_heru_optout`

### 2. Server-side purchase event (IDEAL)

Cuando se confirma una compra en el backend, hacer un POST:

```
POST https://us-central1-heru-growth.cloudfunctions.net/collect
Content-Type: application/json
```

```json
{
  "events": [{
    "cid": "server_<transaction_id>",
    "event": "purchase_server",
    "session_id": null,
    "timestamp": 1718000000000,
    "page_path": "/successful-purchase",
    "page_referrer": "",
    "page_title": "",
    "user_agent": "heru-server/1.0",
    "utms": {},
    "click_ids": {},
    "params": {
      "transaction_id": "<id_unico_de_la_transaccion>",
      "value": 299,
      "currency": "MXN",
      "item_name": "Plan RESICO mensual",
      "identifiers": {
        "email_hash": "<sha256_del_email_en_minusculas>"
      }
    }
  }]
}
```

**Campos importantes:**
- `transaction_id` — ID único de la transacción (para deduplicar)
- `value` — monto en MXN (numérico, sin símbolo)
- `item_name` — nombre del plan/producto
- `email_hash` — SHA-256 del email del usuario **en minúsculas y sin espacios**. Ejemplo en Node:

```javascript
const crypto = require('crypto');
const emailHash = crypto.createHash('sha256')
  .update(email.toLowerCase().trim())
  .digest('hex');
```

Ejemplo en Python:
```python
import hashlib
email_hash = hashlib.sha256(email.lower().strip().encode()).hexdigest()
```

**¿Por qué server-side además de client-side?**
El tracker client-side detecta compras por URL (`/successful-purchase`), pero a veces el usuario cierra la página antes de que el evento se envíe, o un ad blocker lo impide. El POST server-side garantiza que toda compra quede registrada.

---

## Diagrama de flujo simplificado

```
Usuario clickea anuncio de Google
        ↓
web.heru.app (tracker captura gclid + UTMs + crea _heru_cid)
        ↓
Navega páginas (tracker registra touchpoints)
        ↓
Se registra con email (tracker hashea email → asocia con _heru_cid)
        ↓
Compra un plan
   ├── Client-side: tracker detecta /successful-purchase → POST a /collect
   └── Server-side: backend confirma pago → POST a /collect con email_hash + value
        ↓
Firestore reconstruye journey: google → organic → direct → purchase ($299)
        ↓
Dashboard muestra: Google contribuyó $119.60 (40%), Organic $59.80 (20%), Direct $119.60 (40%)
```

---

## Preguntas frecuentes

**¿Interfiere con GTM/GA4/Meta Pixel existentes?**
No. El tracker es completamente independiente. No toca el dataLayer ni modifica otros scripts.

**¿Qué pasa si el usuario tiene ad blocker?**
El tracker se carga desde nuestro propio dominio (`heru-growth-dashboard.web.app`), no desde un dominio de tracking conocido. La mayoría de ad blockers no lo bloquean. Si lo bloquean, el server-side purchase (punto 2) garantiza que la compra se registre.

**¿Cumple con privacidad?**
- No almacena emails en texto plano — solo SHA-256 hashes (irreversibles)
- Respeta opt-out via cookie `_heru_optout=1`
- Los datos viven en nuestro propio Firebase (Google Cloud), no en terceros

**¿Qué pasa si el usuario visita desde múltiples dispositivos?**
El cruce se hace por email_hash. Si el usuario se loguea en ambos dispositivos, ambos visitor IDs se asocian al mismo email_hash y el journey se reconstruye.
