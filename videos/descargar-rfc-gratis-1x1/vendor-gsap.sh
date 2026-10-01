#!/bin/sh
# El navegador headless de este entorno no alcanza cdn.jsdelivr.net a través del proxy,
# así que GSAP se sirve desde el disco. assemble-index.mjs vuelve a escribir la etiqueta
# del CDN en cada corrida: ejecutar este script después de cada `assemble-index.mjs`.
set -e
python3 - <<'PY'
import re
p='index.html'; s=open(p,encoding='utf-8').read()
new='<script src="assets/vendor/gsap.min.js"></script>'
s2=re.sub(r'<script src="https://cdn\.jsdelivr\.net/npm/gsap@[^"]+"[^>]*></script>', new, s)
if s2==s and new not in s: raise SystemExit('no se encontró la etiqueta de GSAP del CDN')
open(p,'w',encoding='utf-8').write(s2)
print('GSAP -> assets/vendor/gsap.min.js')
PY
