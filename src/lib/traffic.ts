/**
 * Traffic real-time client
 *
 * Fetches current traffic intensity from Madrid's informo.madrid.es API.
 * XML format with ~4000 sensors. Lazy-loaded only on district detail pages.
 *
 * Aggregates traffic load per district using the station master CSV
 * (pre-downloaded as air-stations.json includes lat/lon for point-in-polygon).
 *
 * Traffic intensity levels:
 *   0 = Fluido (free flow)
 *   1 = Denso (dense)
 *   2 = Congestionado (congested)
 *   3 = Cortado (blocked)
 */

const TRAFFIC_URL = 'https://informo.madrid.es/informo/tmadrid/pm.xml';
const CACHE_KEY = 'mv_traffic_cache';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export interface TrafficSummary {
  totalSensors: number;
  fluido: number;
  denso: number;
  congestionado: number;
  cortado: number;
  avgIntensity: number;
  avgOccupancy: number;
  score: number; // 0-100 (100 = all free flow)
}

function getCached(): TrafficSummary | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return data;
  } catch { return null; }
}

function setCache(data: TrafficSummary): void {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
  } catch {}
}

/**
 * Fetch traffic data and return a city-wide summary.
 * Returns null if the API is unavailable.
 */
export async function fetchTrafficSummary(): Promise<TrafficSummary | null> {
  const cached = getCached();
  if (cached) return cached;

  try {
    const res = await fetch(TRAFFIC_URL);
    if (!res.ok) return null;

    const xmlText = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, 'text/xml');
    const pms = doc.querySelectorAll('pm');

    let totalSensors = 0;
    let fluido = 0, denso = 0, congestionado = 0, cortado = 0;
    let intensitySum = 0, occupancySum = 0;
    let intensityCount = 0, occupancyCount = 0;

    pms.forEach((pm) => {
      const error = pm.querySelector('error')?.textContent;
      if (error === 'Y') return; // skip sensors with errors

      totalSensors++;

      const nivelServicio = Number(pm.querySelector('nivelServicio')?.textContent || '0');
      if (nivelServicio === 0) fluido++;
      else if (nivelServicio === 1) denso++;
      else if (nivelServicio === 2) congestionado++;
      else if (nivelServicio >= 3) cortado++;

      const intensidad = Number(pm.querySelector('intensidad')?.textContent || '0');
      const ocupacion = Number(pm.querySelector('ocupacion')?.textContent || '0');

      if (intensidad > 0) { intensitySum += intensidad; intensityCount++; }
      if (ocupacion > 0) { occupancySum += ocupacion; occupancyCount++; }
    });

    const summary: TrafficSummary = {
      totalSensors,
      fluido,
      denso,
      congestionado,
      cortado,
      avgIntensity: intensityCount > 0 ? Math.round(intensitySum / intensityCount) : 0,
      avgOccupancy: occupancyCount > 0 ? Math.round(occupancySum / occupancyCount) : 0,
      score: totalSensors > 0
        ? Math.round(((fluido + denso * 0.5) / totalSensors) * 100)
        : 50,
    };

    setCache(summary);
    return summary;
  } catch {
    return null;
  }
}
