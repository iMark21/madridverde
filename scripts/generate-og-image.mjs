/**
 * OG Image Generator — MadridVerde
 * Renders HTML to a pixel-perfect 1200x630 PNG using Puppeteer.
 * Usage: npx puppeteer browsers install chrome && node scripts/generate-og-image.mjs
 */

import puppeteer from 'puppeteer';
import { writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px;
    background: linear-gradient(135deg, #2D6A4F 0%, #264653 100%);
    display: flex; flex-direction: column; justify-content: center;
    padding: 60px 80px;
    font-family: 'Inter', sans-serif;
    color: white; position: relative; overflow: hidden;
  }
  .bg-circle {
    position: absolute; border-radius: 50%;
    background: rgba(255,255,255,0.04);
  }
  .bg-1 { width: 500px; height: 500px; top: -150px; right: -100px; }
  .bg-2 { width: 300px; height: 300px; bottom: -80px; left: -60px; }
  .bg-3 { width: 200px; height: 200px; top: 200px; right: 200px; }

  .title {
    font-family: 'DM Serif Display', serif;
    font-size: 72px; font-weight: 400;
    margin-bottom: 8px;
    text-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }
  .subtitle {
    font-size: 26px; font-weight: 400;
    opacity: 0.85; margin-bottom: 12px;
  }
  .stats {
    font-size: 18px; opacity: 0.6;
    margin-bottom: 40px;
    letter-spacing: 0.02em;
  }

  .pills {
    display: flex; gap: 12px;
    margin-bottom: 40px;
  }
  .pill {
    padding: 12px 28px;
    border-radius: 10px;
    text-align: center;
    min-width: 130px;
  }
  .pill-label {
    font-size: 11px; text-transform: uppercase;
    letter-spacing: 0.08em; font-weight: 600;
    margin-bottom: 4px; opacity: 0.85;
  }
  .pill-value {
    font-family: 'DM Serif Display', serif;
    font-size: 28px;
  }
  .pill-aire { background: #52B788; }
  .pill-verde { background: #40916C; }
  .pill-ruido { background: #E9C46A; color: rgba(0,0,0,0.7); }
  .pill-movilidad { background: #F4A261; color: rgba(0,0,0,0.7); }
  .pill-reciclaje { background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.2); }

  .tagline {
    font-family: 'DM Serif Display', serif;
    font-size: 18px; font-style: italic;
    opacity: 0.45;
  }
  .url {
    position: absolute; bottom: 30px; right: 80px;
    font-size: 18px; opacity: 0.5; font-weight: 500;
  }
  .accent {
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 6px; background: #52B788;
  }
</style></head>
<body>
  <div class="bg-circle bg-1"></div>
  <div class="bg-circle bg-2"></div>
  <div class="bg-circle bg-3"></div>

  <div class="title">MadridVerde</div>
  <div class="subtitle">Indice Verde de Madrid</div>
  <div class="stats">17 datasets abiertos · 5 sub-indices · 3 APIs en tiempo real</div>

  <div class="pills">
    <div class="pill pill-aire"><div class="pill-label">Aire</div><div class="pill-value">30%</div></div>
    <div class="pill pill-verde"><div class="pill-label">Verde</div><div class="pill-value">25%</div></div>
    <div class="pill pill-ruido"><div class="pill-label">Ruido</div><div class="pill-value">20%</div></div>
    <div class="pill pill-movilidad"><div class="pill-label">Movilidad</div><div class="pill-value">15%</div></div>
    <div class="pill pill-reciclaje"><div class="pill-label">Reciclaje</div><div class="pill-value">10%</div></div>
  </div>

  <div class="tagline">Porque respirar no deberia ser cuestion de codigo postal</div>
  <div class="url">madrid-verde.web.app</div>
  <div class="accent"></div>
</body></html>`;

async function main() {
  console.log('[og] Launching browser...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Wait for fonts
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 500));

  const outPath = join(__dirname, '..', 'public', 'og-image.jpg');
  await page.screenshot({ path: outPath, type: 'jpeg', quality: 90 });
  await browser.close();

  const { statSync } = await import('fs');
  const size = (statSync(outPath).size / 1024).toFixed(0);
  console.log(`[og] Done: ${outPath} (${size} KB)`);
}

main().catch(e => { console.error(e); process.exit(1); });
