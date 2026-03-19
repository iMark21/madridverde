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
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    font-family: 'Inter', sans-serif;
    color: white; text-align: center; position: relative; overflow: hidden;
  }
  .bg-circle {
    position: absolute; border-radius: 50%;
    background: rgba(255,255,255,0.04);
  }
  .bg-1 { width: 500px; height: 500px; top: -150px; right: -100px; }
  .bg-2 { width: 300px; height: 300px; bottom: -80px; left: -60px; }
  .emoji {
    font-size: 80px;
    margin-bottom: 24px;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
  }
  .title {
    font-family: 'DM Serif Display', serif;
    font-size: 64px; font-weight: 400;
    margin-bottom: 16px;
    text-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }
  .subtitle {
    font-size: 24px; font-weight: 400;
    opacity: 0.9; margin-bottom: 32px;
  }
  .tagline {
    display: flex; gap: 16px; align-items: center;
    font-size: 16px; font-weight: 600; letter-spacing: 0.05em;
    text-transform: uppercase; opacity: 0.75;
  }
  .dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(255,255,255,0.6); }
  .brand {
    position: absolute; bottom: 24px; right: 32px;
    font-size: 14px; opacity: 0.5; font-weight: 500;
  }
</style></head>
<body>
  <div class="bg-circle bg-1"></div>
  <div class="bg-circle bg-2"></div>
  <div class="emoji">🌿</div>
  <div class="title">MadridVerde</div>
  <div class="subtitle">Indice Verde de Madrid</div>
  <div class="tagline">
    <span>DATOS ABIERTOS</span>
    <div class="dot"></div>
    <span>EN VIVO</span>
    <div class="dot"></div>
    <span>GRATIS</span>
  </div>
  <div class="brand">madrid-verde.web.app</div>
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
