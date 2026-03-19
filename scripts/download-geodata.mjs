/**
 * MadridVerde — Download geodata from Madrid's geoportal
 *
 * One-shot script: downloads TopoJSON boundaries for districts and barrios,
 * then generates a district index with slugs for Astro's getStaticPaths().
 *
 * Usage: node scripts/download-geodata.mjs
 *
 * Output:
 *   src/data/distritos.topo.json   — 21 districts (TopoJSON, WGS84)
 *   src/data/barrios.topo.json     — 131 barrios (TopoJSON, WGS84)
 *   src/data/districts-index.json  — slug/name/code lookup for routing
 *
 * These files should be committed to the repo (static, rarely change).
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'src', 'data');

mkdirSync(DATA_DIR, { recursive: true });

const SOURCES = {
  distritos: 'https://geoportal.madrid.es/fsdescargas/IDEAM_WBGEOPORTAL/LIMITES_ADMINISTRATIVOS/Distritos/TopoJSON/Distritos.json',
  barrios: 'https://geoportal.madrid.es/fsdescargas/IDEAM_WBGEOPORTAL/LIMITES_ADMINISTRATIVOS/Barrios/TopoJSON/Barrios.json',
};

/**
 * Normalize a district name into a URL-safe slug.
 * "CHAMARTÍN" → "chamartin"
 */
function slugify(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function download(name, url, outFile) {
  console.log(`[download] Fetching ${name}...`);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${name}: ${res.status} ${res.statusText}`);
  }
  const text = await res.text();
  writeFileSync(outFile, text, 'utf-8');
  const sizeKB = (Buffer.byteLength(text, 'utf-8') / 1024).toFixed(1);
  console.log(`[download] ${name} → ${outFile} (${sizeKB} KB)`);
  return JSON.parse(text);
}

function buildDistrictsIndex(topoData) {
  // Find the object key — typically "DISTRITOS" or similar
  const objectKey = Object.keys(topoData.objects)[0];
  if (!objectKey) throw new Error('No objects found in distritos TopoJSON');

  const geometries = topoData.objects[objectKey].geometries;
  console.log(`[index] Found ${geometries.length} districts in object "${objectKey}"`);

  const index = geometries.map((geo) => {
    const props = geo.properties;
    // Try different property name patterns from the geoportal
    const name = props.DISTRI_MT || props.NOMBRE || props.NOMDIS || props.name || '';
    const code = props.COD_DIS_TX || props.COD_DIS || props.CODDIS || '';
    return {
      slug: slugify(name),
      name: name,
      code: String(code).padStart(2, '0'),
    };
  });

  // Sort by code
  index.sort((a, b) => a.code.localeCompare(b.code));
  return index;
}

async function main() {
  console.log('[geodata] Starting download...\n');

  // Download both TopoJSON files
  const distritos = await download(
    'distritos',
    SOURCES.distritos,
    join(DATA_DIR, 'distritos.topo.json')
  );

  await download(
    'barrios',
    SOURCES.barrios,
    join(DATA_DIR, 'barrios.topo.json')
  );

  // Generate districts index for Astro routing
  const index = buildDistrictsIndex(distritos);
  const indexFile = join(DATA_DIR, 'districts-index.json');
  writeFileSync(indexFile, JSON.stringify(index, null, 2), 'utf-8');
  console.log(`\n[index] Districts index → ${indexFile}`);
  console.log('[index] Districts:');
  for (const d of index) {
    console.log(`  ${d.code} ${d.slug.padEnd(25)} ${d.name}`);
  }

  console.log('\n[geodata] Done. Commit these files to the repo.');
}

main().catch((err) => {
  console.error('[geodata] ERROR:', err.message);
  process.exit(1);
});
