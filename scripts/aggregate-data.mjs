/**
 * MadridVerde — Build-time data aggregation
 *
 * Downloads and pre-processes heavy datasets into small JSON files.
 * Raw downloads are cached in scripts/.cache/ (gitignored).
 * Output JSONs go to src/data/ (committed to repo).
 *
 * Usage:
 *   node scripts/aggregate-data.mjs          # run all
 *   node scripts/aggregate-data.mjs trees    # run one
 *   node scripts/aggregate-data.mjs --fresh  # ignore cache
 *
 * Tasks:
 *   trees        MV-22: Arbolado XLSX → trees.json
 *   noise        MV-23: Ruido CSV → noise-monthly.json
 *   demographics MV-25: Sociodemograficos CSV → demographics.json
 *   recycling    MV-26: Contenedores CSV → recycling.json
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Papa from 'papaparse';
import XLSX from 'xlsx';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'src', 'data');
const CACHE_DIR = join(__dirname, '.cache');

mkdirSync(DATA_DIR, { recursive: true });
mkdirSync(CACHE_DIR, { recursive: true });

const args = process.argv.slice(2);
const FRESH = args.includes('--fresh');
const tasks = args.filter((a) => !a.startsWith('--'));

// --- URLs (CKAN pattern, validated 2026-03-19) ---

const URLS = {
  arbolado_xlsx:
    'https://datos.madrid.es/dataset/300761-0-arbolado-especies/resource/300761-0-arbolado-especies-xlsx/download/300761-0-arbolado-especies-xlsx.xlsx',
  arbolado_superficie:
    'https://datos.madrid.es/dataset/300266-0-arbolado-superficie/resource/300266-19-arbolado-superficie-csv/download/300266-19-arbolado-superficie-csv.csv',
  ruido:
    'https://datos.madrid.es/dataset/211356-0-contaminacion-acustica/resource/211356-0-contaminacion-acustica-csv/download/211356-0-contaminacion-acustica-csv.csv',
  sociodemograficos:
    'https://datos.madrid.es/dataset/300087-0-indicadores-distritos/resource/300087-0-indicadores-distritos-csv/download/300087-0-indicadores-distritos-csv.csv',
  contenedores:
    'https://datos.madrid.es/dataset/300276-0-contenedor-papel-carton-todos/resource/300276-0-contenedor-papel-carton-todos-csv/download/300276-0-contenedor-papel-carton-todos-csv.csv',
};

// --- Helpers ---

async function cachedDownload(name, url) {
  const ext = url.split('.').pop().split('?')[0];
  const cachePath = join(CACHE_DIR, `${name}.${ext}`);

  if (!FRESH && existsSync(cachePath)) {
    const age = Date.now() - statSync(cachePath).mtimeMs;
    const hours = (age / 3600000).toFixed(1);
    console.log(`  [cache] ${name} (${hours}h old)`);
    return cachePath;
  }

  console.log(`  [download] ${name} from datos.madrid.es...`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${name}: ${res.status} ${res.statusText}`);

  const buffer = Buffer.from(await res.arrayBuffer());
  writeFileSync(cachePath, buffer);
  const sizeMB = (buffer.length / 1048576).toFixed(1);
  console.log(`  [download] ${name} → ${sizeMB} MB`);
  return cachePath;
}

function parseCSV(filePath, encoding = 'utf-8') {
  let content = readFileSync(filePath, encoding);
  // Remove BOM if present
  if (content.charCodeAt(0) === 0xfeff) content = content.slice(1);

  const result = Papa.parse(content, {
    delimiter: ';',
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  });

  if (result.errors.length > 0) {
    console.warn(`  [warn] ${result.errors.length} parse errors (showing first 3):`);
    result.errors.slice(0, 3).forEach((e) => console.warn(`    ${e.message} (row ${e.row})`));
  }

  return result.data;
}

function writeJSON(name, data) {
  const outPath = join(DATA_DIR, name);
  const json = JSON.stringify(data, null, 2);
  writeFileSync(outPath, json, 'utf-8');
  const sizeKB = (Buffer.byteLength(json) / 1024).toFixed(1);
  console.log(`  [output] ${name} (${sizeKB} KB)`);
}

// --- MV-22: Arbolado ---

async function aggregateTrees() {
  console.log('\n[MV-22] Arbolado (trees + green area by district)');

  // 1. Download arbolado XLSX (52MB)
  const xlsxPath = await cachedDownload('arbolado', URLS.arbolado_xlsx);

  console.log('  [parse] Reading XLSX (this takes a moment)...');
  const workbook = XLSX.readFile(xlsxPath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet);
  console.log(`  [parse] ${rows.length} trees`);

  // Aggregate by district
  // Columns: NUM_DTO (district number), NBRE_DTO (district name), CODIGO_ESPECIE (species code)
  const districts = {};
  for (const row of rows) {
    const distCode = row['NUM_DTO'] || row['COD_DISTRITO'] || row['CODIGO_DISTRITO'] || '';
    const distName = row['NBRE_DTO'] || row['NOM_DISTRITO'] || row['NOMBRE_DISTRITO'] || '';
    const species = row['CODIGO_ESPECIE'] || row['NOM_ESPECIE'] || 'DESC';

    const code = String(distCode).padStart(2, '0');
    if (!code || code === '00') continue;

    if (!districts[code]) {
      districts[code] = { code, name: distName, totalTrees: 0, species: {} };
    }
    districts[code].totalTrees++;
    districts[code].species[species] = (districts[code].species[species] || 0) + 1;
  }

  // 2. Download green area CSV (tiny, latin1, Spanish number format)
  const surfPath = await cachedDownload('arbolado_superficie', URLS.arbolado_superficie);
  const surfContent = readFileSync(surfPath, 'latin1');
  const surfLines = surfContent.split('\n').slice(1).filter((l) => l.trim() && !l.startsWith(';;'));

  // Parse Spanish number format: "304.499,69" → 304499.69
  const parseES = (s) => Number(String(s).replace(/\./g, '').replace(',', '.')) || 0;

  for (const line of surfLines) {
    const parts = line.split(';');
    const code = String(parts[0]).trim().padStart(2, '0');
    const greenM2 = parseES(parts[2]);
    const greenHa = parseES(parts[3]);
    if (districts[code]) {
      districts[code].greenM2 = greenM2;
      districts[code].greenHa = greenHa;
    }
  }

  // Build output: top 5 species per district + totals (exclude non-Madrid like "99")
  const output = Object.values(districts)
    .filter((d) => Number(d.code) >= 1 && Number(d.code) <= 21)
    .sort((a, b) => a.code.localeCompare(b.code))
    .map((d) => {
      const topSpecies = Object.entries(d.species)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([name, count]) => ({ name, count }));

      return {
        code: d.code,
        name: d.name,
        totalTrees: d.totalTrees,
        greenM2: d.greenM2 || 0,
        greenHa: d.greenHa || 0,
        topSpecies,
      };
    });

  writeJSON('trees.json', output);
  console.log(`  [done] ${output.length} districts, ${rows.length} trees aggregated`);
}

// --- MV-23: Ruido ---

async function aggregateNoise() {
  console.log('\n[MV-23] Ruido (noise monthly averages)');

  const csvPath = await cachedDownload('ruido', URLS.ruido);
  // ISO-8859-1 encoded
  const rows = parseCSV(csvPath, 'latin1');
  console.log(`  [parse] ${rows.length} rows`);

  // Group by station, year, month
  const stations = {};
  for (const row of rows) {
    const stationId = row['Estacion'] || row['Estación'];
    const stationName = row['Nombre'] || '';
    const year = row['Ano'] || row['Año'] || row['A\xf1o'];
    const month = row['Mes'];
    const ld = row['Ld'];
    const ln = row['Ln'];
    const laeq = row['LAeq'];

    if (!stationId || !year || !month) continue;

    const key = String(stationId);
    if (!stations[key]) {
      stations[key] = { id: key, name: stationName.trim(), data: [] };
    }

    stations[key].data.push({
      year: Number(year),
      month: Number(month),
      ld: ld != null ? Number(ld) : null,
      ln: ln != null ? Number(ln) : null,
      laeq: laeq != null ? Number(laeq) : null,
    });
  }

  // Sort data chronologically
  const output = Object.values(stations)
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((s) => {
      s.data.sort((a, b) => a.year - b.year || a.month - b.month);
      // Filter out rows with all null values
      s.data = s.data.filter((d) => d.ld !== null || d.ln !== null || d.laeq !== null);
      return s;
    })
    .filter((s) => s.data.length > 0);

  writeJSON('noise-monthly.json', output);
  console.log(`  [done] ${output.length} stations`);
}

// --- MV-25: Sociodemograficos ---

async function aggregateDemographics() {
  console.log('\n[MV-25] Sociodemograficos (population + income by district)');

  const csvPath = await cachedDownload('sociodemograficos', URLS.sociodemograficos);
  const rows = parseCSV(csvPath);
  console.log(`  [parse] ${rows.length} rows`);

  // CSV structure: each row is one indicator for one district/barrio.
  // Key columns:
  //   cod_distrito, distrito — district code and name
  //   cod_barrio, barrio — barrio (empty = district-level)
  //   año — year of the data
  //   indicador_nivel1 — indicator category (e.g., "Número de Habitantes", "Renta ")
  //   indicador_nivel2 — subcategory (e.g., "Neta anual")
  //   valor_indicador — the value
  //   indicador_completo — full description

  const districts = {};

  for (const row of rows) {
    const distCode = String(row['cod_distrito'] || '').padStart(2, '0');
    const distName = row['distrito'] || '';
    const barrio = row['cod_barrio'];
    const year = Number(row['año'] || row['ano'] || 0);

    // Only district-level rows (no barrio)
    if (!distCode || distCode === '00' || !year || barrio) continue;

    if (!districts[distCode]) {
      districts[distCode] = { code: distCode, name: distName, population: null, popYear: 0, income: null, incYear: 0 };
    }

    const ind1 = String(row['indicador_nivel1'] || '').trim().toLowerCase();
    const ind2 = String(row['indicador_nivel2'] || '').trim().toLowerCase();
    const value = Number(row['valor_indicador']) || 0;

    // Population: indicador_nivel1 = "Número de Habitantes" (top-level, no subcategory like Hombres/Mujeres)
    if (ind1.includes('mero de habitantes') && !ind2) {
      if (year > districts[distCode].popYear) {
        districts[distCode].population = value;
        districts[distCode].popYear = year;
      }
    }

    // Income: indicador_nivel1 = "Renta", indicador_nivel2 = "Neta anual"
    if (ind1.includes('renta') && ind2.includes('neta anual')) {
      if (year > districts[distCode].incYear) {
        districts[distCode].income = value;
        districts[distCode].incYear = year;
      }
    }
  }

  const output = Object.values(districts)
    .sort((a, b) => a.code.localeCompare(b.code))
    .map((d) => ({
      code: d.code,
      name: d.name,
      population: d.population,
      populationYear: d.popYear || null,
      income: d.income,
      incomeYear: d.incYear || null,
    }));

  writeJSON('demographics.json', output);

  // Log sample
  const sample = output.find((d) => d.code === '01');
  if (sample) console.log(`  [sample] Centro: pop=${sample.population} (${sample.populationYear}), income=${sample.income} (${sample.incomeYear})`);
  console.log(`  [done] ${output.length} districts`);
}

// --- MV-26: Contenedores ---

async function aggregateRecycling() {
  console.log('\n[MV-26] Contenedores (recycling containers by district)');

  const csvPath = await cachedDownload('contenedores', URLS.contenedores);
  const rows = parseCSV(csvPath);
  console.log(`  [parse] ${rows.length} containers`);

  // Group by district, count by type
  const districts = {};

  for (const row of rows) {
    const distName = (row['Distrito'] || '').toString().trim();
    const type = (row['Tipo Contenedor'] || '').toString().trim();

    if (!distName || !type) continue;

    if (!districts[distName]) {
      districts[distName] = { name: distName, total: 0, types: {} };
    }
    districts[distName].total++;
    districts[distName].types[type] = (districts[distName].types[type] || 0) + 1;
  }

  const output = Object.values(districts)
    .sort((a, b) => a.name.localeCompare(b.name, 'es'))
    .map((d) => ({
      name: d.name,
      total: d.total,
      types: Object.entries(d.types)
        .sort(([, a], [, b]) => b - a)
        .map(([type, count]) => ({ type, count })),
    }));

  writeJSON('recycling.json', output);
  console.log(`  [done] ${output.length} districts, ${rows.length} containers`);
}

// --- Main ---

// --- MV-24: Aire historico ---

async function aggregateAirHistory() {
  console.log('\n[MV-24] Aire historico (monthly averages by station)');

  const URLS_AIR = {
    '2025': 'https://datos.madrid.es/dataset/201200-0-calidad-aire-horario/resource/201200-1-calidad-aire-horario-csv/download/201200-1-calidad-aire-horario-csv.csv',
    '2026': 'https://datos.madrid.es/dataset/201200-0-calidad-aire-horario/resource/201200-28-calidad-aire-horario/download/export_20260313_104631_csv.csv',
  };

  const TARGET_MAGNITUDES = { '8': 'NO2', '9': 'PM2.5', '10': 'PM10', '14': 'O3' };

  // Aggregate: station → contaminant → year-month → daily averages
  const stationData = {};

  for (const [year, url] of Object.entries(URLS_AIR)) {
    const csvPath = await cachedDownload(`aire_${year}`, url);
    let content = readFileSync(csvPath, 'utf-8');
    if (content.charCodeAt(0) === 0xfeff) content = content.slice(1);

    // Handle quoted CSVs (2026 uses quotes)
    content = content.replace(/"/g, '');

    const result = Papa.parse(content, { delimiter: ';', header: true, skipEmptyLines: true, dynamicTyping: true });
    console.log(`  [parse] ${year}: ${result.data.length} rows`);

    for (const row of result.data) {
      const magnitud = String(row.MAGNITUD || '');
      if (!(magnitud in TARGET_MAGNITUDES)) continue;

      const station = String(row.ESTACION || '');
      const contName = TARGET_MAGNITUDES[magnitud];
      const rowYear = Number(row.ANO || 0);
      const month = Number(row.MES || 0);
      if (!station || !rowYear || !month) continue;

      // Compute daily average from valid hourly readings
      let sum = 0, count = 0;
      for (let h = 1; h <= 24; h++) {
        const hKey = `H${String(h).padStart(2, '0')}`;
        const vKey = `V${String(h).padStart(2, '0')}`;
        if (row[vKey] === 'V' && row[hKey] != null) {
          const val = Number(row[hKey]);
          if (!isNaN(val) && val >= 0) { sum += val; count++; }
        }
      }
      if (count === 0) continue;
      const dailyAvg = sum / count;

      const key = `${station}_${contName}`;
      const monthKey = `${rowYear}-${String(month).padStart(2, '0')}`;
      if (!stationData[key]) {
        stationData[key] = { station, contaminant: contName, months: {} };
      }
      if (!stationData[key].months[monthKey]) {
        stationData[key].months[monthKey] = { sum: 0, count: 0 };
      }
      stationData[key].months[monthKey].sum += dailyAvg;
      stationData[key].months[monthKey].count++;
    }
  }

  // Build output grouped by station
  const stations = {};
  for (const entry of Object.values(stationData)) {
    const { station, contaminant, months } = entry;
    if (!stations[station]) stations[station] = { station, contaminants: {} };
    stations[station].contaminants[contaminant] = Object.entries(months)
      .map(([m, v]) => ({ month: m, avg: Math.round((v.sum / v.count) * 10) / 10 }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }

  const output = Object.values(stations).sort((a, b) => a.station.localeCompare(b.station));

  writeJSON('air-monthly.json', output);
  console.log(`  [done] ${output.length} stations with air data`);
}

const ALL_TASKS = {
  trees: aggregateTrees,
  noise: aggregateNoise,
  demographics: aggregateDemographics,
  recycling: aggregateRecycling,
  air: aggregateAirHistory,
};

async function main() {
  console.log('[aggregate-data] MadridVerde data pipeline');
  console.log(`[aggregate-data] Output: ${DATA_DIR}`);
  console.log(`[aggregate-data] Cache: ${CACHE_DIR}`);
  if (FRESH) console.log('[aggregate-data] --fresh: ignoring cache');

  const toRun = tasks.length > 0 ? tasks : Object.keys(ALL_TASKS);

  for (const name of toRun) {
    if (!ALL_TASKS[name]) {
      console.error(`[error] Unknown task: ${name}. Available: ${Object.keys(ALL_TASKS).join(', ')}`);
      process.exit(1);
    }
    await ALL_TASKS[name]();
  }

  console.log('\n[aggregate-data] All done.');
}

main().catch((err) => {
  console.error('\n[aggregate-data] FATAL:', err.message);
  console.error(err.stack);
  process.exit(1);
});
