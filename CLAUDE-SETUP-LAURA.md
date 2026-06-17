# Setup Claude Code — CRM heru

## 1. Instalar Claude Code

Abre tu terminal (en Mac: busca "Terminal" en Spotlight).

```bash
npm install -g @anthropic-ai/claude-code
```

Si no tienes npm/node, primero instala Node.js: https://nodejs.org (descarga la version LTS).

## 2. Clonar el repo

```bash
cd ~/Desktop
git clone https://github.com/arroyo54/campaign-dashboard.git
cd campaign-dashboard
```

## 3. Abrir Claude Code

```bash
claude
```

La primera vez te pedira autenticarte. Tienes 2 opciones:

### Opcion A: Claude Max (si tienes suscripcion Claude Pro/Max)
- Selecciona "Claude subscription (claude.ai)"
- Te abrira el navegador para login con tu cuenta de claude.ai

### Opcion B: API Key
- Ve a https://console.anthropic.com
- Crea una cuenta o inicia sesion
- Ve a "API Keys" → "Create Key"
- Copia la key y pegala cuando Claude Code te la pida

## 4. Como usar

Ya dentro de Claude Code, simplemente escribe lo que necesitas en espanol. Ejemplos:

```
> En el CRM B2B (crm-v2.html), quiero que cuando abra una empresa me muestre el telefono del contacto principal mas grande

> Agrega un boton en la vista de empresa que diga "Enviar propuesta" y que cambie la fase a "propuesta"

> El score de las empresas manuales siempre sale en 30, quiero que tome en cuenta si ya les puse LinkedIn en los badges

> Cuando guardo las notas de estrategia a veces no se guarda, revisalo
```

## 5. Desplegar cambios

Despues de que Claude haga los cambios, pidele:

```
> Despliega los cambios a Firebase
```

El comando que usa es:
```bash
npx firebase-tools deploy --only hosting --project wedding-planner-6d39b
```

La primera vez te pedira autenticarte con Firebase (te abre el navegador).

## 6. Subir cambios a GitHub

Para que los demas vean tus cambios:

```
> Haz commit y push de los cambios
```

## 7. Bajar cambios nuevos

Si alguien mas (Andres) hizo cambios, antes de trabajar:

```bash
git pull
```

O pidele a Claude:
```
> Baja los ultimos cambios de GitHub
```

---

## Estructura del proyecto

| Archivo | Que es |
|---------|--------|
| `crm-v2.html` | **EL CRM** — todo el codigo del CRM B2B y B2C |
| `index.html` | Dashboard de campanas (paid media) |
| `firebase.json` | Config de Firebase Hosting |
| `firestore.rules` | Reglas de seguridad de Firestore |
| `functions/` | Cloud Functions (backend attribution) |

## Notas importantes

- El CRM es un solo archivo HTML (`crm-v2.html`) con todo el JS inline
- Los datos viven en Firestore (proyecto `wedding-planner-6d39b`)
- Para verificar que el codigo no tiene errores antes de deployar, pide:
  "Verifica la sintaxis del JavaScript antes de deployar"
- La URL del CRM es: https://heru-growth-dashboard.web.app/crm-v2.html
- Si algo se rompe, siempre puedes volver a la version anterior con `git checkout crm-v2.html`
