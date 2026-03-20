/**
 * Aggregate EMT bus data by district.
 *
 * Input:
 *   - scripts/raw/gtfs/stops.txt (4900+ stops with WGS84 lat/lon)
 *   - scripts/raw/gtfs/routes.txt (236 routes)
 *   - scripts/raw/gtfs/trips.txt (trip→route mapping)
 *   - scripts/raw/gtfs/stop_times.txt (trip→stop mapping)
 *   - src/data/distritos.topo.json (district boundaries)
 *
 * Output:
 *   - src/data/emt.json (stops and lines per district)
 *
 * Source: EMT Madrid (Empresa Municipal de Transportes)
 *         https://datos.emtmadrid.es — GTFS feed (ODC-BY license)
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as topojson from "topojson-client";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

// --- Parse CSV ---
function parseCSV(path) {
  const text = readFileSync(path, "utf-8");
  const lines = text.split("\n").filter((l) => l.trim());
  const headers = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = (values[i] || "").trim();
    });
    return obj;
  });
}

// --- Point-in-polygon (ray casting) ---
function pointInPolygon(point, polygon) {
  const [x, y] = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function findDistrict(lon, lat, features) {
  for (const feature of features) {
    const geom = feature.geometry;
    if (geom.type === "Polygon") {
      if (pointInPolygon([lon, lat], geom.coordinates[0])) {
        return feature.properties;
      }
    } else if (geom.type === "MultiPolygon") {
      for (const poly of geom.coordinates) {
        if (pointInPolygon([lon, lat], poly[0])) {
          return feature.properties;
        }
      }
    }
  }
  return null;
}

// --- Main ---
console.log("Loading GTFS data...");

const stops = parseCSV(join(rootDir, "scripts/raw/gtfs/stops.txt"));
const routes = parseCSV(join(rootDir, "scripts/raw/gtfs/routes.txt"));
const frequencies = parseCSV(join(rootDir, "scripts/raw/gtfs/frequencies.txt"));

console.log(`  Stops: ${stops.length}`);
console.log(`  Routes: ${routes.length}`);

// Build route lookup
const routeMap = new Map();
for (const r of routes) {
  routeMap.set(r.route_id, r.route_short_name);
}

// Build stop→lines mapping from trips + stop_times
// This is the heavy join: stop_times → trips → routes
console.log("Building stop→lines mapping (this takes a moment)...");

const trips = parseCSV(join(rootDir, "scripts/raw/gtfs/trips.txt"));
const tripRouteMap = new Map();
for (const t of trips) {
  tripRouteMap.set(t.trip_id, t.route_id);
}

// Read stop_times line by line to avoid huge memory usage
const stopTimesText = readFileSync(
  join(rootDir, "scripts/raw/gtfs/stop_times.txt"),
  "utf-8"
);
const stopLines = new Map(); // stop_id → Set<route_short_name>

const stLines = stopTimesText.split("\n");
const stHeaders = stLines[0].split(",").map((h) => h.trim());
const tripIdIdx = stHeaders.indexOf("trip_id");
const stopIdIdx = stHeaders.indexOf("stop_id");

for (let i = 1; i < stLines.length; i++) {
  const parts = stLines[i].split(",");
  if (parts.length < Math.max(tripIdIdx, stopIdIdx) + 1) continue;
  const tripId = parts[tripIdIdx].trim();
  const stopId = parts[stopIdIdx].trim();
  const routeId = tripRouteMap.get(tripId);
  if (!routeId) continue;
  let routeName = routeMap.get(routeId);
  if (!routeName) continue;
  // Normalize: "001" → "1", "002" → "2", but keep "C03", "N1" etc.
  if (/^\d+$/.test(routeName)) routeName = String(parseInt(routeName, 10));
  if (!stopLines.has(stopId)) stopLines.set(stopId, new Set());
  stopLines.get(stopId).add(routeName);
}

console.log(`  Stops with line data: ${stopLines.size}`);

// Build route→avg headway (peak hours 7-10, in minutes)
console.log("Computing average headway per route...");
const routeHeadways = new Map(); // route_short_name → [headway_mins]
for (const f of frequencies) {
  const startHour = parseInt(f.start_time?.split(":")[0] ?? "0");
  // Only consider peak morning (7-10) for representative frequency
  if (startHour < 7 || startHour >= 10) continue;
  const tripId = f.trip_id;
  const headwaySecs = parseInt(f.headway_secs || "0");
  if (headwaySecs <= 0) continue;
  const routeId = tripRouteMap.get(tripId);
  if (!routeId) continue;
  let routeName = routeMap.get(routeId);
  if (!routeName) continue;
  if (/^\d+$/.test(routeName)) routeName = String(parseInt(routeName, 10));
  if (!routeHeadways.has(routeName)) routeHeadways.set(routeName, []);
  routeHeadways.get(routeName).push(headwaySecs / 60);
}

const routeAvgHeadway = new Map();
for (const [name, headways] of routeHeadways) {
  routeAvgHeadway.set(name, Math.round(headways.reduce((a, b) => a + b, 0) / headways.length));
}
console.log(`  Routes with headway data: ${routeAvgHeadway.size}`);

// Load district boundaries
console.log("Loading district boundaries...");
const topoRaw = JSON.parse(
  readFileSync(join(rootDir, "src/data/distritos.topo.json"), "utf-8")
);
const objectName = Object.keys(topoRaw.objects)[0];
const geoFeatures = topojson.feature(topoRaw, topoRaw.objects[objectName])
  .features;

console.log(`  Districts: ${geoFeatures.length}`);

// Assign stops to districts
console.log("Assigning stops to districts...");

const districtData = new Map(); // code → { name, stops, lines }

let assigned = 0;
let unassigned = 0;

for (const stop of stops) {
  const lat = parseFloat(stop.stop_lat);
  const lon = parseFloat(stop.stop_lon);
  if (isNaN(lat) || isNaN(lon)) continue;

  const district = findDistrict(lon, lat, geoFeatures);
  if (!district) {
    unassigned++;
    continue;
  }

  assigned++;

  const codeStr = district.COD_DIS_TX || String(district.COD_DIS || "00").padStart(2, "0");
  const name = district.NOMBRE || district.DISTRI_MAY || "Unknown";

  if (!districtData.has(codeStr)) {
    districtData.set(codeStr, { name, totalStops: 0, lines: new Set(), headways: [] });
  }

  const dd = districtData.get(codeStr);
  dd.totalStops++;

  const lines = stopLines.get(stop.stop_id);
  if (lines) {
    for (const l of lines) {
      dd.lines.add(l);
      const hw = routeAvgHeadway.get(l);
      if (hw) dd.headways.push(hw);
    }
  }
}

console.log(`  Assigned: ${assigned}, Unassigned: ${unassigned}`);

// Build output
const output = Array.from(districtData.entries())
  .map(([code, data]) => {
    const avgHeadway = data.headways.length > 0
      ? Math.round(data.headways.reduce((a, b) => a + b, 0) / data.headways.length)
      : null;
    return {
    code,
    name: data.name,
    totalStops: data.totalStops,
    totalLines: data.lines.size,
    avgHeadwayMin: avgHeadway,
    lines: Array.from(data.lines).sort((a, b) => {
      const na = parseInt(a);
      const nb = parseInt(b);
      if (!isNaN(na) && !isNaN(nb)) return na - nb;
      return a.localeCompare(b);
    }),
  };})
  .sort((a, b) => a.code.localeCompare(b.code));

// Summary
console.log("\nDistrict summary:");
for (const d of output) {
  console.log(
    `  ${d.code} ${d.name}: ${d.totalStops} stops, ${d.totalLines} lines`
  );
}

const totalStops = output.reduce((s, d) => s + d.totalStops, 0);
const totalLines = new Set(output.flatMap((d) => d.lines)).size;
console.log(`\nTotal: ${totalStops} stops, ${totalLines} unique lines across ${output.length} districts`);

// Write district output
const outPath = join(rootDir, "src/data/emt.json");
writeFileSync(outPath, JSON.stringify(output, null, 2));
console.log(`\nWritten to ${outPath}`);

// Build per-line detail file
console.log("\nBuilding per-line detail...");
const linesDetail = [];
for (const r of routes) {
  let name = r.route_short_name;
  if (/^\d+$/.test(name)) name = String(parseInt(name, 10));
  const hw = routeAvgHeadway.get(name);
  // Avoid duplicate names (e.g. "1" and "001")
  if (linesDetail.some((l) => l.line === name)) continue;
  linesDetail.push({
    line: name,
    routeName: r.route_long_name || "",
    url: r.route_url || "",
    avgHeadwayMin: hw ?? null,
  });
}
linesDetail.sort((a, b) => {
  const na = parseInt(a.line);
  const nb = parseInt(b.line);
  if (!isNaN(na) && !isNaN(nb)) return na - nb;
  return a.line.localeCompare(b.line);
});

const linesPath = join(rootDir, "src/data/emt-lines.json");
writeFileSync(linesPath, JSON.stringify(linesDetail, null, 2));
console.log(`Written ${linesDetail.length} lines to ${linesPath}`);
