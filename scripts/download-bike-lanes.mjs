/**
 * Download Madrid bike lanes GeoJSON from ArcGIS REST API.
 * Static data (updated monthly by the city).
 * Output: src/data/bike-lanes.json
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'src', 'data');
mkdirSync(DATA_DIR, { recursive: true });

const URL = 'https://sigma.madrid.es/hosted/rest/services/OBRAS/INFRAESTRUCTURA_CICLISTA/MapServer/0/query?where=1%3D1&outFields=COD_TIPOLOGIA_N,COD_TIPO_VIA_N,SENTIDO,Shape.STLength()&f=geojson&outSR=4326';

async function main() {
  console.log('[bike-lanes] Downloading from sigma.madrid.es...');
  const res = await fetch(URL);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

  const geojson = await res.json();
  const features = geojson.features || [];
  console.log(`[bike-lanes] ${features.length} segments`);

  // Aggregate km by district (we'll do this in green-index using point-in-polygon)
  // For now just save the GeoJSON
  const outPath = join(DATA_DIR, 'bike-lanes.json');
  writeFileSync(outPath, JSON.stringify(geojson), 'utf-8');
  const sizeKB = (Buffer.byteLength(JSON.stringify(geojson)) / 1024).toFixed(0);
  console.log(`[bike-lanes] → ${outPath} (${sizeKB} KB)`);

  // Show tipologia breakdown
  const tipos = {};
  let totalKm = 0;
  for (const f of features) {
    const tipo = f.properties?.COD_TIPOLOGIA_N || 0;
    const len = f.properties?.['Shape.STLength()'] || 0;
    tipos[tipo] = (tipos[tipo] || 0) + len;
    totalKm += len;
  }
  console.log(`[bike-lanes] Total: ${(totalKm / 1000).toFixed(1)} km`);
  const TIPO_NAMES = { 1: 'Anillo Verde', 2: 'Giros/Sentidos', 3: 'Via Exclusiva', 4: 'Via Preferente', 5: 'Uso Compartido' };
  for (const [t, len] of Object.entries(tipos)) {
    console.log(`  ${TIPO_NAMES[t] || t}: ${(len / 1000).toFixed(1)} km`);
  }
}

main().catch((err) => {
  console.error('[bike-lanes] ERROR:', err.message);
  process.exit(1);
});
