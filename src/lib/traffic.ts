/**
 * Traffic real-time client
 *
 * Fetches current traffic intensity from Madrid's informo.madrid.es API.
 * XML format with ~4000 sensors.
 *
 * Traffic intensity levels (nivelServicio):
 *   0 = Fluido (free flow)
 *   1 = Denso (dense)
 *   2 = Congestionado (congested)
 *   3 = Cortado (blocked)
 *
 * Coordinates: UTM Zone 30N → WGS84 conversion inline.
 * District mapping: subarea first 2 digits = district code.
 */

const TRAFFIC_URL = 'https://informo.madrid.es/informo/tmadrid/pm.xml';
const CACHE_KEY = 'mv_traffic_full';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export interface TrafficSensor {
  id: number;
  description: string;
  lat: number;
  lon: number;
  level: number; // 0-3
  intensity: number;
  occupancy: number;
  load: number;
  districtCode: string; // "01"-"21"
}

export interface TrafficSummary {
  totalSensors: number;
  fluido: number;
  denso: number;
  congestionado: number;
  cortado: number;
  avgIntensity: number;
  avgOccupancy: number;
  score: number;
}

export interface TrafficData {
  summary: TrafficSummary;
  sensors: TrafficSensor[];
  timestamp: string;
}

/** UTM Zone 30N → WGS84 (simplified, accurate enough for Madrid) */
function utmToLatLon(x: number, y: number): [number, number] {
  const k0 = 0.9996;
  const a = 6378137;
  const e = 0.0818192;
  const e2 = e * e;
  const ep2 = e2 / (1 - e2);
  const lon0 = (-3 * Math.PI) / 180; // Zone 30 central meridian

  const M = y / k0;
  const mu = M / (a * (1 - e2 / 4 - 3 * e2 * e2 / 64));
  const e1 = (1 - Math.sqrt(1 - e2)) / (1 + Math.sqrt(1 - e2));

  const phi1 =
    mu +
    ((3 * e1) / 2 - (27 * e1 * e1 * e1) / 32) * Math.sin(2 * mu) +
    ((21 * e1 * e1) / 16 - (55 * e1 * e1 * e1 * e1) / 32) * Math.sin(4 * mu) +
    ((151 * e1 * e1 * e1) / 96) * Math.sin(6 * mu);

  const N1 = a / Math.sqrt(1 - e2 * Math.sin(phi1) * Math.sin(phi1));
  const T1 = Math.tan(phi1) * Math.tan(phi1);
  const C1 = ep2 * Math.cos(phi1) * Math.cos(phi1);
  const R1 = (a * (1 - e2)) / Math.pow(1 - e2 * Math.sin(phi1) * Math.sin(phi1), 1.5);
  const D = (x - 500000) / (N1 * k0);

  const lat =
    phi1 -
    ((N1 * Math.tan(phi1)) / R1) *
      (D * D / 2 - ((5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * ep2) * D * D * D * D) / 24 +
        ((61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 3 * C1 * C1 - 252 * ep2) * D * D * D * D * D * D) / 720);

  const lon =
    lon0 +
    (D - ((1 + 2 * T1 + C1) * D * D * D) / 6 +
      ((5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * ep2 + 24 * T1 * T1) * D * D * D * D * D) / 120) /
      Math.cos(phi1);

  return [(lat * 180) / Math.PI, (lon * 180) / Math.PI];
}

function getCached(): TrafficData | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return data;
  } catch { return null; }
}

function setCache(data: TrafficData): void {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
  } catch {}
}

/** Parse the XML and return full traffic data (summary + sensors). */
async function fetchTrafficFull(): Promise<TrafficData | null> {
  const cached = getCached();
  if (cached) return cached;

  try {
    const res = await fetch(TRAFFIC_URL);
    if (!res.ok) return null;

    const xmlText = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, 'text/xml');
    const timestamp = doc.querySelector('fecha_hora')?.textContent || '';
    const pms = doc.querySelectorAll('pm');

    const sensors: TrafficSensor[] = [];
    let fluido = 0, denso = 0, congestionado = 0, cortado = 0;
    let intensitySum = 0, occupancySum = 0;
    let intensityCount = 0, occupancyCount = 0;

    pms.forEach((pm) => {
      const error = pm.querySelector('error')?.textContent;
      if (error === 'S' || error === 'Y') return;

      const nivelServicio = Number(pm.querySelector('nivelServicio')?.textContent || '0');
      if (nivelServicio === 0) fluido++;
      else if (nivelServicio === 1) denso++;
      else if (nivelServicio === 2) congestionado++;
      else if (nivelServicio >= 3) cortado++;

      const intensidad = Number(pm.querySelector('intensidad')?.textContent || '0');
      const ocupacion = Number(pm.querySelector('ocupacion')?.textContent || '0');
      if (intensidad > 0) { intensitySum += intensidad; intensityCount++; }
      if (ocupacion > 0) { occupancySum += ocupacion; occupancyCount++; }

      // Parse UTM coordinates (Spanish format: comma as decimal separator)
      const stX = pm.querySelector('st_x')?.textContent?.replace(',', '.');
      const stY = pm.querySelector('st_y')?.textContent?.replace(',', '.');
      if (!stX || !stY) return;

      const utmX = parseFloat(stX);
      const utmY = parseFloat(stY);
      if (isNaN(utmX) || isNaN(utmY) || utmX < 400000 || utmX > 500000) return;

      const [lat, lon] = utmToLatLon(utmX, utmY);

      // District code from subarea first 2 digits
      const subarea = pm.querySelector('subarea')?.textContent || '';
      const districtCode = subarea.substring(0, 2).padStart(2, '0');

      sensors.push({
        id: Number(pm.querySelector('idelem')?.textContent || '0'),
        description: pm.querySelector('descripcion')?.textContent || '',
        lat, lon,
        level: nivelServicio,
        intensity: intensidad,
        occupancy: ocupacion,
        load: Number(pm.querySelector('carga')?.textContent || '0'),
        districtCode,
      });
    });

    const totalSensors = fluido + denso + congestionado + cortado;
    const data: TrafficData = {
      summary: {
        totalSensors,
        fluido, denso, congestionado, cortado,
        avgIntensity: intensityCount > 0 ? Math.round(intensitySum / intensityCount) : 0,
        avgOccupancy: occupancyCount > 0 ? Math.round(occupancySum / occupancyCount) : 0,
        score: totalSensors > 0
          ? Math.round(((fluido + denso * 0.5) / totalSensors) * 100)
          : 50,
      },
      sensors,
      timestamp,
    };

    setCache(data);
    return data;
  } catch {
    return null;
  }
}

/** Backwards-compatible: return just the summary. */
export async function fetchTrafficSummary(): Promise<TrafficSummary | null> {
  const data = await fetchTrafficFull();
  return data?.summary ?? null;
}

/** Return full data including sensors for map + section. */
export async function fetchTrafficData(): Promise<TrafficData | null> {
  return fetchTrafficFull();
}

/** Group sensors by district and compute per-district stats. */
export interface DistrictTraffic {
  code: string;
  total: number;
  fluido: number;
  denso: number;
  congestionado: number;
  cortado: number;
  score: number;
  worstStreets: { description: string; level: number; load: number }[];
}

export function groupByDistrict(sensors: TrafficSensor[]): DistrictTraffic[] {
  const map = new Map<string, TrafficSensor[]>();
  for (const s of sensors) {
    if (!s.districtCode || s.districtCode === '00') continue;
    const arr = map.get(s.districtCode) || [];
    arr.push(s);
    map.set(s.districtCode, arr);
  }

  const result: DistrictTraffic[] = [];
  for (const [code, group] of map) {
    let f = 0, d = 0, c = 0, k = 0;
    for (const s of group) {
      if (s.level === 0) f++;
      else if (s.level === 1) d++;
      else if (s.level === 2) c++;
      else k++;
    }
    const total = group.length;
    const score = total > 0 ? Math.round(((f + d * 0.5) / total) * 100) : 50;

    // Top congested streets (level >= 2, sorted by load desc)
    const worstStreets = group
      .filter((s) => s.level >= 2)
      .sort((a, b) => b.load - a.load)
      .slice(0, 5)
      .map((s) => ({ description: s.description, level: s.level, load: s.load }));

    result.push({ code, total, fluido: f, denso: d, congestionado: c, cortado: k, score, worstStreets });
  }

  return result.sort((a, b) => a.score - b.score); // worst first
}
