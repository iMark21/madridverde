/**
 * Air quality real-time client
 *
 * Fetches current air quality from Madrid's open API,
 * extracts the latest valid hourly reading per station/contaminant,
 * and aggregates by district.
 *
 * Contaminant codes (MAGNITUD):
 *   8  = NO2 (µg/m³) — limit: 200 (hourly), 40 (annual)
 *   9  = PM2.5 (µg/m³) — limit: 25 (annual)
 *   10 = PM10 (µg/m³) — limit: 50 (daily), 40 (annual)
 *   14 = O3 (µg/m³) — limit: 120 (8h max)
 *
 * API refreshes every 20 minutes.
 */

import stationsData from '../data/air-stations.json';

const API_URL =
  'https://ciudadesabiertas.madrid.es/dynamicAPI/API/query/calair_tiemporeal.json?pageSize=5000';

const CONTAMINANTS = {
  '8': { name: 'NO2', unit: 'µg/m³', limit: 40 },
  '9': { name: 'PM2.5', unit: 'µg/m³', limit: 25 },
  '10': { name: 'PM10', unit: 'µg/m³', limit: 40 },
  '14': { name: 'O3', unit: 'µg/m³', limit: 120 },
} as const;

type ContaminantCode = keyof typeof CONTAMINANTS;

export interface StationReading {
  stationCode: string;
  stationName: string;
  districtCode: string | null;
  contaminant: string;
  value: number;
  hour: number;
  unit: string;
  limit: number;
  ratio: number; // value / limit (0-1+)
}

export interface DistrictAirQuality {
  districtCode: string;
  readings: Record<string, { avg: number; limit: number; ratio: number; count: number }>;
  score: number; // 0-100 (100 = best air quality)
}

const CACHE_KEY = 'mv_air_cache';
const CACHE_TTL = 20 * 60 * 1000; // 20 minutes

function getCachedData(): any | null {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_TTL) return null;
    return data;
  } catch {
    return null;
  }
}

function setCachedData(data: any): void {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    // sessionStorage may be unavailable
  }
}

/**
 * Extract the latest valid hourly reading from a record.
 * Records have H01-H24 (values) and V01-V24 (validation: "V" or "N").
 */
function getLatestValid(record: any): { value: number; hour: number } | null {
  for (let h = 24; h >= 1; h--) {
    const hKey = `H${String(h).padStart(2, '0')}`;
    const vKey = `V${String(h).padStart(2, '0')}`;
    if (record[vKey] === 'V' && record[hKey] != null) {
      const val = parseFloat(record[hKey]);
      if (!isNaN(val) && val > 0) {
        return { value: val, hour: h };
      }
    }
  }
  return null;
}

/**
 * Fetch real-time air quality data and return per-station readings.
 */
export async function fetchAirQuality(): Promise<StationReading[]> {
  const cached = getCachedData();
  const records = cached || await fetchFromAPI();
  if (!cached && records) setCachedData(records);
  if (!records) return [];

  const stationMap = new Map(stationsData.map((s: any) => [s.code, s]));
  const readings: StationReading[] = [];

  for (const record of records) {
    const stationCode = String(record.ESTACION || '');
    const magnitud = String(record.MAGNITUD || '');

    if (!(magnitud in CONTAMINANTS)) continue;

    const contInfo = CONTAMINANTS[magnitud as ContaminantCode];
    const station = stationMap.get(stationCode);
    const latest = getLatestValid(record);

    if (!latest || !station) continue;

    readings.push({
      stationCode,
      stationName: station.name,
      districtCode: station.districtCode,
      contaminant: contInfo.name,
      value: latest.value,
      hour: latest.hour,
      unit: contInfo.unit,
      limit: contInfo.limit,
      ratio: latest.value / contInfo.limit,
    });
  }

  return readings;
}

async function fetchFromAPI(): Promise<any[] | null> {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) return null;
    const json = await res.json();
    return json.records || [];
  } catch {
    return null;
  }
}

/**
 * Aggregate station readings by district.
 * Returns an air quality score (0-100) per district.
 * 100 = perfect air quality, 0 = all contaminants at/above limits.
 */
export function aggregateByDistrict(readings: StationReading[]): Map<string, DistrictAirQuality> {
  const districts = new Map<string, DistrictAirQuality>();

  for (const r of readings) {
    if (!r.districtCode) continue;

    if (!districts.has(r.districtCode)) {
      districts.set(r.districtCode, {
        districtCode: r.districtCode,
        readings: {},
        score: 0,
      });
    }

    const d = districts.get(r.districtCode)!;
    if (!d.readings[r.contaminant]) {
      d.readings[r.contaminant] = { avg: 0, limit: r.limit, ratio: 0, count: 0 };
    }

    const entry = d.readings[r.contaminant];
    entry.count++;
    entry.avg = ((entry.avg * (entry.count - 1)) + r.value) / entry.count;
    entry.ratio = entry.avg / r.limit;
  }

  // Calculate air quality score per district
  for (const d of districts.values()) {
    const contaminants = Object.values(d.readings);
    if (contaminants.length === 0) {
      d.score = 50; // no data
      continue;
    }

    // Score: average of (1 - ratio) clamped to 0-1, scaled to 0-100
    const avgRatio =
      contaminants.reduce((sum, c) => sum + Math.min(c.ratio, 2), 0) / contaminants.length;
    d.score = Math.round(Math.max(0, Math.min(100, (1 - avgRatio / 2) * 100)));
  }

  return districts;
}
