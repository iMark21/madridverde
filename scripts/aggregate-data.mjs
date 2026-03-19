/**
 * MadridVerde — Build-time data aggregation
 *
 * Pre-processes heavy datasets into small JSON files for client-side use.
 * Run via `npm run prebuild` (automatically runs before `npm run build`).
 *
 * Output directory: src/data/
 *
 * Scripts to implement (one per backlog task):
 * - MV-22: Arbolado XLSX → trees.json (~20KB from 52MB XLSX)
 * - MV-23: Ruido CSV → noise-monthly.json (~50KB)
 * - MV-24: Aire historico CSVs → air-monthly.json (~50KB gzip)
 * - MV-25: Sociodemograficos CSV → demographics.json (~30KB)
 * - MV-26: Contenedores CSV → recycling.json (~5KB)
 */

import { existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'src', 'data');

if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true });
}

console.log('[aggregate-data] Output directory:', DATA_DIR);
console.log('[aggregate-data] No aggregation scripts implemented yet. Skipping.');
console.log('[aggregate-data] See backlog tasks MV-22 to MV-26.');
