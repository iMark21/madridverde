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

export async function fetchBiciMAD(): Promise<BiciMADStation[]> {
  try {
    // Station info (cached 1h)
    let infoStations = getCache(INFO_CACHE_KEY, INFO_TTL);
    if (!infoStations) {
      const res = await fetch(`${GBFS_BASE}/station_information`);
      if (!res.ok) return [];
      const json = await res.json();
      infoStations = json.data?.stations || [];
      setCache(INFO_CACHE_KEY, infoStations);
    }

    // Station status (cached 1min)
    let statusStations = getCache(STATUS_CACHE_KEY, STATUS_TTL);
    if (!statusStations) {
      const res = await fetch(`${GBFS_BASE}/station_status`);
      if (!res.ok) return [];
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
  } catch {
    return [];
  }
}
