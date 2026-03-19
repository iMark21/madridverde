/**
 * Download air quality station metadata and map to districts.
 * Usage: node scripts/download-stations.mjs
 * Output: src/data/air-stations.json
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Papa from 'papaparse';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'src', 'data');
mkdirSync(DATA_DIR, { recursive: true });

const STATIONS_URL =
  'https://datos.madrid.es/dataset/212629-0-estaciones-control-aire/resource/212629-0-estaciones-control-aire-csv/download/212629-0-estaciones-control-aire-csv.csv';

// Manual station-to-district mapping (by known location)
// Sources: station addresses from datos.madrid.es
const STATION_DISTRICT = {
  '4': '01',   // Pza. de España → Centro
  '8': '03',   // Escuelas Aguirre → Retiro (near Salamanca border)
  '11': '05',  // Ramón y Cajal → Chamartín
  '16': '15',  // Arturo Soria → Ciudad Lineal
  '17': '17',  // Villaverde → Villaverde
  '18': '12',  // Farolillo → Usera
  '24': '09',  // Casa de Campo → Moncloa-Aravaca
  '27': '21',  // Barajas Pueblo → Barajas
  '35': '01',  // Pza. del Carmen → Centro
  '36': '14',  // Moratalaz → Moratalaz
  '38': '06',  // Cuatro Caminos → Tetuán
  '39': '08',  // Barrio del Pilar → Fuencarral-El Pardo
  '40': '13',  // Vallecas → Puente de Vallecas
  '47': '02',  // Méndez Álvaro → Arganzuela
  '48': '05',  // Castellana → Chamartín
  '49': '03',  // Parque del Retiro → Retiro
  '50': '05',  // Pza. Castilla → Chamartín
  '54': '18',  // Ensanche de Vallecas → Villa de Vallecas
  '55': '21',  // Urb. Embajada → Barajas
  '56': '12',  // Plaza Elíptica → Usera
  '57': '16',  // Sanchinarro → Hortaleza
  '58': '08',  // El Pardo → Fuencarral-El Pardo
  '59': '21',  // Juan Carlos I → Barajas
  '60': '08',  // Tres Olivos → Fuencarral-El Pardo
};

async function main() {
  console.log('[stations] Downloading station metadata...');
  const res = await fetch(STATIONS_URL);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

  let text = await res.text();
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);

  const result = Papa.parse(text, { delimiter: ';', header: true, skipEmptyLines: true });
  console.log(`[stations] ${result.data.length} stations parsed`);

  const stations = result.data.map((row) => {
    const code = String(row['CODIGO_CORTO'] || '').trim();
    const name = (row['ESTACION'] || '').trim();
    const lat = parseFloat(row['LATITUD'] || '0');
    const lon = parseFloat(row['LONGITUD'] || '0');
    const type = (row['NOM_TIPO'] || '').trim();
    const district = STATION_DISTRICT[code] || null;
    const measures = {
      NO2: row['NO2'] === 'X',
      PM10: row['PM10'] === 'X',
      PM2_5: row['PM2_5'] === 'X',
      O3: row['O3'] === 'X',
    };

    return { code, name, lat, lon, type, districtCode: district, measures };
  }).filter((s) => s.lat !== 0 && s.lon !== 0);

  const outPath = join(DATA_DIR, 'air-stations.json');
  writeFileSync(outPath, JSON.stringify(stations, null, 2), 'utf-8');
  console.log(`[stations] ${stations.length} stations → ${outPath}`);

  // Show mapping
  for (const s of stations) {
    console.log(`  ${s.code.padStart(2)} ${s.name.padEnd(30)} → District ${s.districtCode || '??'}`);
  }
}

main().catch((err) => {
  console.error('[stations] ERROR:', err.message);
  process.exit(1);
});
