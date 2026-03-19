/**
 * Generate OG image as a clean PNG using a canvas approach.
 * Since we don't have puppeteer/sharp, we generate a simpler but
 * well-proportioned SVG that renders correctly.
 */

import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Simple, clean OG image - everything fits within 1200x630
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2D6A4F"/>
      <stop offset="100%" stop-color="#264653"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Subtle pattern -->
  <circle cx="1100" cy="100" r="300" fill="rgba(255,255,255,0.03)"/>
  <circle cx="100" cy="530" r="200" fill="rgba(255,255,255,0.03)"/>

  <!-- Title -->
  <text x="100" y="180" font-family="Georgia, 'Times New Roman', serif" font-size="80" fill="white" font-weight="bold">MadridVerde</text>

  <!-- Subtitle -->
  <text x="100" y="240" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="rgba(255,255,255,0.8)">Indice Verde de Madrid</text>

  <!-- Stats line -->
  <text x="100" y="310" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="rgba(255,255,255,0.6)">17 datasets abiertos  ·  5 sub-indices  ·  3 APIs en tiempo real</text>

  <!-- Sub-index pills -->
  <rect x="100" y="360" width="170" height="55" rx="10" fill="#52B788"/>
  <text x="185" y="382" text-anchor="middle" font-family="Arial" font-size="13" fill="rgba(255,255,255,0.9)">AIRE</text>
  <text x="185" y="404" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="white">30%</text>

  <rect x="290" y="360" width="170" height="55" rx="10" fill="#40916C"/>
  <text x="375" y="382" text-anchor="middle" font-family="Arial" font-size="13" fill="rgba(255,255,255,0.9)">VERDE</text>
  <text x="375" y="404" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="white">25%</text>

  <rect x="480" y="360" width="170" height="55" rx="10" fill="#E9C46A"/>
  <text x="565" y="382" text-anchor="middle" font-family="Arial" font-size="13" fill="rgba(0,0,0,0.6)">RUIDO</text>
  <text x="565" y="404" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="rgba(0,0,0,0.7)">20%</text>

  <rect x="670" y="360" width="170" height="55" rx="10" fill="#F4A261"/>
  <text x="755" y="382" text-anchor="middle" font-family="Arial" font-size="13" fill="rgba(0,0,0,0.6)">MOVILIDAD</text>
  <text x="755" y="404" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="rgba(0,0,0,0.7)">15%</text>

  <rect x="860" y="360" width="170" height="55" rx="10" fill="#264653" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
  <text x="945" y="382" text-anchor="middle" font-family="Arial" font-size="13" fill="rgba(255,255,255,0.9)">RECICLAJE</text>
  <text x="945" y="404" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="white">10%</text>

  <!-- Tagline -->
  <text x="100" y="490" font-family="Georgia, 'Times New Roman', serif" font-size="20" fill="rgba(255,255,255,0.5)" font-style="italic">Porque respirar no deberia ser cuestion de codigo postal</text>

  <!-- URL -->
  <text x="100" y="560" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="rgba(255,255,255,0.7)">madrid-verde.web.app</text>

  <!-- Bottom accent line -->
  <rect x="0" y="620" width="1200" height="10" fill="#52B788"/>
</svg>`;

// Save SVG
const svgPath = join(__dirname, '..', 'public', 'og-image.svg');
writeFileSync(svgPath, svg, 'utf-8');
console.log('[og] SVG saved');

// Convert to PNG using macOS qlmanage
import { execSync } from 'node:child_process';
try {
  execSync(`qlmanage -t -s 1200 -o "${join(__dirname, '..', 'public')}" "${svgPath}"`, { stdio: 'pipe' });
  // Rename .svg.png to .png
  const fs = await import('node:fs');
  const pngSrc = join(__dirname, '..', 'public', 'og-image.svg.png');
  const pngDst = join(__dirname, '..', 'public', 'og-image.png');
  if (fs.existsSync(pngSrc)) {
    fs.copyFileSync(pngSrc, pngDst);
    fs.unlinkSync(pngSrc);
    const size = (fs.statSync(pngDst).size / 1024).toFixed(0);
    console.log(`[og] PNG saved (${size} KB)`);
  }
} catch (e) {
  console.log('[og] PNG conversion failed, SVG only');
}
