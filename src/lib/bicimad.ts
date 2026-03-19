/**
 * BiciMAD real-time client (GBFS v2.3)
 *
 * 635 stations, no auth, ~14s TTL.
 * Source: datos.madrid.es dataset 900021-0-bicimad-gbfs
 */

const GBFS_BASE = 'https://madrid.publicbikesystem.net/customer/gbfs/v2/es';

export interface BiciMADStation {
  id: string;
  name: string;
  lat: number;
  lon: number;
  capacity: number;
  bikesAvailable: number;
  docksAvailable: number;
  inService: boolean;
}

const INFO_CACHE_KEY = 'mv_bicimad_info';
const STATUS_CACHE_KEY = 'mv_bicimad_status';
const INFO_TTL = 60 * 60 * 1000;  // 1 hour (stations don't move)
const STATUS_TTL = 60 * 1000;     // 1 minute (availability changes)
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1500;

function getCache(key: string, ttl: number): any | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > ttl) return null;
    return data;
  } catch { return null; }
}

function setCache(key: string, data: any): void {
  try {
    sessionStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
  } catch {}
}

async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url);
      if (res.ok) return res;
      // On server error (5xx), retry; on client error (4xx), fail immediately
      if (res.status >= 500 && attempt < retries) {
        console.warn(`[BiciMAD] ${url} returned ${res.status}, retrying (${attempt + 1}/${retries})...`);
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS * (attempt + 1)));
        continue;
      }
      throw new Error(`HTTP ${res.status}`);
    } catch (err) {
      if (attempt < retries) {
        console.warn(`[BiciMAD] fetch failed for ${url}, retrying (${attempt + 1}/${retries})...`, err);
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS * (attempt + 1)));
        continue;
      }
      throw err;
    }
  }
  throw new Error('fetchWithRetry exhausted');
}

export async function fetchBiciMAD(): Promise<BiciMADStation[]> {
  try {
    // Station info (cached 1h)
    let infoStations = getCache(INFO_CACHE_KEY, INFO_TTL);
    if (!infoStations) {
      const res = await fetchWithRetry(`${GBFS_BASE}/station_information`);
      const json = await res.json();
      infoStations = json.data?.stations || [];
      if (infoStations.length === 0) {
        console.warn('[BiciMAD] station_information returned 0 stations');
        return [];
      }
      setCache(INFO_CACHE_KEY, infoStations);
    }

    // Station status (cached 1min)
    let statusStations = getCache(STATUS_CACHE_KEY, STATUS_TTL);
    if (!statusStations) {
      const res = await fetchWithRetry(`${GBFS_BASE}/station_status`);
      const json = await res.json();
      statusStations = json.data?.stations || [];
      setCache(STATUS_CACHE_KEY, statusStations);
    }

    const statusMap = new Map<string, any>();
    for (const s of statusStations) {
      statusMap.set(s.station_id, s);
    }

    return infoStations.map((info: any) => {
      const status = statusMap.get(info.station_id) || {};
      return {
        id: info.station_id,
        name: info.name || '',
        lat: info.lat,
        lon: info.lon,
        capacity: info.capacity || 0,
        bikesAvailable: status.num_bikes_available || 0,
        docksAvailable: status.num_docks_available || 0,
        inService: status.is_renting === true && status.is_returning === true,
      };
    });
  } catch (err) {
    console.error('[BiciMAD] Failed to load data after retries:', err);
    return [];
  }
}
