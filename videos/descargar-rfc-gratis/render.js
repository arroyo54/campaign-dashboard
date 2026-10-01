#!/usr/bin/env node
/*
  Renderiza index.html a MP4 (H.264, 30 fps, sin pista de audio) cuadro por cuadro.

  Requisitos: Node 18+, ffmpeg en el PATH y Playwright con Chromium
  (npm i playwright && npx playwright install chromium).

  Uso:
    node render.js                          → heru-descargar-rfc-gratis-9x16.mp4
    node render.js --stills 1.5,4.8,12      → PNG de esos segundos en ./stills (para revisar)
    node render.js --workers 4 --fps 30 --crf 18 --out otro.mp4
*/
'use strict';
const path = require('path');
const fs = require('fs');
const os = require('os');
const { spawn, execFileSync, execSync } = require('child_process');

function loadPlaywright() {
  try { return require('playwright'); } catch (e) {
    const root = execSync('npm root -g').toString().trim();
    return require(path.join(root, 'playwright'));
  }
}
const { chromium } = loadPlaywright();

const args = {};
process.argv.slice(2).forEach((a, i, arr) => {
  if (!a.startsWith('--')) return;
  const next = arr[i + 1];
  args[a.slice(2)] = next && !next.startsWith('--') ? next : true;
});

const W = 1080, H = 1920;
const FPS = +(args.fps || 30);
const CRF = String(args.crf || 18);
const WORKERS = +(args.workers || Math.max(1, Math.min(4, os.cpus().length)));
const OUT = path.resolve(args.out || path.join(__dirname, 'heru-descargar-rfc-gratis-9x16.mp4'));
const PAGE_URL = 'file://' + path.join(__dirname, 'index.html');

async function openPage(browser) {
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  page.on('pageerror', e => { console.error('Error en la página:', e.message); process.exitCode = 1; });
  await page.goto(PAGE_URL);
  await page.evaluate(() => window.__ready);
  return page;
}

const seek = (page, t) => page.evaluate(x => window.__seek(x), t);

// Avanza la línea de tiempo en orden hasta t: GSAP registra los valores iniciales de cada
// animación la primera vez que la recorre, así cada proceso queda igual que uno secuencial.
async function preroll(page, t) {
  for (let x = 0; x < t; x += 0.25) await seek(page, x);
}

function encoder(file) {
  const ff = spawn('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'png', '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', CRF, '-tune', 'animation',
    '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-level', '4.1', '-r', String(FPS),
    '-an', file,
  ], { stdio: ['pipe', 'inherit', 'inherit'] });
  const done = new Promise((resolve, reject) =>
    ff.on('close', code => (code === 0 ? resolve() : reject(new Error('ffmpeg terminó con código ' + code)))));
  return { ff, done };
}

async function renderRange({ a, b, file, label }) {
  const browser = await chromium.launch();
  try {
    const page = await openPage(browser);
    await preroll(page, a / FPS);
    const { ff, done } = encoder(file);
    for (let f = a; f < b; f++) {
      await seek(page, f / FPS);
      const png = await page.screenshot({ type: 'png' });
      if (!ff.stdin.write(png)) await new Promise(r => ff.stdin.once('drain', r));
      if ((f - a) % 150 === 0) console.log(`[${label}] cuadro ${f} (${a}–${b - 1})`);
    }
    ff.stdin.end();
    await done;
  } finally {
    await browser.close();
  }
}

async function stills() {
  const dir = path.resolve(args.dir || path.join(__dirname, 'stills'));
  fs.mkdirSync(dir, { recursive: true });
  const browser = await chromium.launch();
  try {
    const page = await openPage(browser);
    const times = String(args.stills).split(',').map(Number).sort((x, y) => x - y);
    let cur = 0;
    for (const t of times) {
      for (; cur < t; cur += 0.25) await seek(page, cur);
      await seek(page, t);
      const file = path.join(dir, `t${t.toFixed(2).padStart(6, '0')}.png`);
      await page.screenshot({ path: file });
      console.log(file);
    }
  } finally {
    await browser.close();
  }
}

async function video() {
  const probe = await chromium.launch();
  const page = await openPage(probe);
  const duration = await page.evaluate(() => window.__duration);
  const marks = await page.evaluate(() => window.__marks);
  await probe.close();

  const total = Math.round(duration * FPS);
  console.log(`Duración ${duration.toFixed(2)} s → ${total} cuadros a ${FPS} fps con ${WORKERS} procesos`);
  console.log('Inicio de cada escena (s):', JSON.stringify(marks));

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'heru-render-'));
  const per = Math.ceil(total / WORKERS);
  const parts = [];
  for (let k = 0; k < WORKERS; k++) {
    const a = k * per, b = Math.min(total, a + per);
    if (a < b) parts.push({ a, b, file: path.join(tmp, `seg${k}.mp4`), label: `p${k + 1}` });
  }
  const t0 = Date.now();
  await Promise.all(parts.map(renderRange));

  const list = path.join(tmp, 'list.txt');
  fs.writeFileSync(list, parts.map(p => `file '${p.file}'`).join('\n') + '\n');
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', list,
    '-c', 'copy', '-an', '-movflags', '+faststart', OUT], { stdio: 'inherit' });
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`Listo: ${OUT} (${Math.round((Date.now() - t0) / 1000)} s)`);
}

(args.stills ? stills() : video()).catch(e => { console.error(e); process.exit(1); });
