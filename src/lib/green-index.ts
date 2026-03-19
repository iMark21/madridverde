/**
 * MadridVerde — Indice Verde (0-100)
 *
 * Composite score from 5 sub-indices, each normalized to 0-100:
 *
 * | Sub-index  | Weight | Data source              | Method                    |
 * |------------|--------|--------------------------|---------------------------|
 * | Aire       | 30%    | Real-time API + stations | Inverse of limit ratios   |
 * | Verde      | 25%    | trees.json + demographics| m2/hab + trees/1000hab    |
 * | Ruido      | 20%    | noise-monthly.json       | Inverse LAeq dB scale     |
 * | Movilidad  | 15%    | (pending MV-08)          | Neutral score (50)        |
 * | Reciclaje  | 10%    | recycling.json           | Containers per capita     |
 *
 * Tiers:
 *   85-100 Excelente (#2D6A4F)
 *   70-84  Bueno     (#52B788)
 *   55-69  Aceptable (#E9C46A)
 *   40-54  Mejorable (#F4A261)
 *   0-39   Critico   (#E76F51)
 */

import treesData from '../data/trees.json';
import demographicsData from '../data/demographics.json';
import recyclingData from '../data/recycling.json';
import noiseData from '../data/noise-monthly.json';

// --- Types ---

export interface SubIndex {
  name: string;
  score: number;  // 0-100
  weight: number; // 0-1
  detail: string; // human-readable context
}

export interface DistrictIndex {
  code: string;
  name: string;
  score: number;       // 0-100 weighted total
  tier: string;
  tierColor: string;
  subIndices: SubIndex[];
  population: number;
  percentile: number;  // 0-100, filled after all districts computed
}

// --- Normalization helpers ---

/** Linear scale: value in [min, max] → [0, 100]. Clamped. */
function normalize(value: number, min: number, max: number): number {
  if (max === min) return 50;
  return Math.round(Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100)));
}

/** Inverse linear scale: higher value → lower score. */
function normalizeInverse(value: number, bestValue: number, worstValue: number): number {
  return normalize(value, worstValue, bestValue);
}

function getTier(score: number): { tier: string; color: string } {
  if (score >= 85) return { tier: 'Excelente', color: '#2D6A4F' };
  if (score >= 70) return { tier: 'Bueno', color: '#52B788' };
  if (score >= 55) return { tier: 'Aceptable', color: '#E9C46A' };
  if (score >= 40) return { tier: 'Mejorable', color: '#F4A261' };
  return { tier: 'Critico', color: '#E76F51' };
}

// --- Sub-index calculators ---

/** Verde: green area m2/hab (70%) + trees per 1000 hab (30%) */
function calcVerde(distCode: string, population: number): SubIndex {
  const tree = (treesData as any[]).find((t) => t.code === distCode);
  if (!tree || population === 0) {
    return { name: 'Verde', score: 0, weight: 0.25, detail: 'Sin datos' };
  }

  const m2PerCap = tree.greenM2 / population;
  const treesPer1000 = (tree.totalTrees / population) * 1000;

  // WHO: 9 m2/hab minimum, 15+ good, 25+ excellent
  const greenScore = normalize(m2PerCap, 0, 25);
  // 100 trees/1000hab = low, 400+ = excellent
  const treeScore = normalize(treesPer1000, 0, 500);

  const score = Math.round(greenScore * 0.7 + treeScore * 0.3);

  let detail: string;
  if (m2PerCap < 9) {
    detail = `Solo ${m2PerCap.toFixed(1)} m²/hab de zonas verdes — la OMS recomienda minimo 9`;
  } else if (m2PerCap < 15) {
    detail = `${m2PerCap.toFixed(1)} m²/hab — cumple el minimo de la OMS pero hay margen de mejora`;
  } else {
    detail = `${m2PerCap.toFixed(1)} m²/hab de zonas verdes — bien por encima del minimo de la OMS`;
  }

  return { name: 'Verde', score, weight: 0.25, detail };
}

/** Ruido: inverse of latest LAeq average. Lower dB = better. */
function calcRuido(distCode: string): SubIndex {
  // Map noise stations to districts (simplified: use closest station)
  // Since noise stations don't have district codes in the data,
  // we use a pre-computed mapping
  const NOISE_DISTRICT_MAP: Record<string, string[]> = {
    '01': ['RF-03', 'RF-04'],         // Centro: Pza Carmen, Pza España
    '02': ['RF-02'],                   // Arganzuela: Carlos V
    '03': ['RF-08', 'RF-01'],         // Retiro: Escuelas Aguirre, Recoletos
    '04': ['RF-07'],                   // Salamanca: Marqués de Salamanca
    '05': ['RF-06'],                   // Chamartín: Gregorio Marañón
    '06': ['RF-10'],                   // Tetuán: Cuatro Caminos
    '07': ['RF-10'],                   // Chamberí: Cuatro Caminos (shared)
    '08': ['RF-05'],                   // Fuencarral: Barrio del Pilar
    '09': ['RF-04'],                   // Moncloa: Pza España (closest)
    '10': ['RF-13'],                   // Latina
    '11': ['RF-14'],                   // Carabanchel
    '12': ['RF-09'],                   // Usera: Luca de Tena
    '13': ['RF-15'],                   // Puente Vallecas
    '14': ['RF-11'],                   // Moratalaz
    '15': ['RF-12'],                   // Ciudad Lineal
    '16': ['RF-05'],                   // Hortaleza (closest: Barrio del Pilar)
    '17': ['RF-16'],                   // Villaverde
    '18': ['RF-15'],                   // Villa Vallecas (closest)
    '19': ['RF-11'],                   // Vicálvaro (closest: Moratalaz)
    '20': ['RF-12'],                   // San Blas (closest: Ciudad Lineal)
    '21': ['RF-05'],                   // Barajas (closest)
  };

  const stationIds = NOISE_DISTRICT_MAP[distCode] || [];
  const values: number[] = [];

  for (const stId of stationIds) {
    const station = (noiseData as any[]).find((s) => s.id === stId);
    if (!station) continue;
    // Get latest 12 months with LAeq data
    const recent = station.data
      .filter((d: any) => d.laeq != null && d.year >= 2022)
      .slice(-12);
    if (recent.length > 0) {
      const avg = recent.reduce((s: number, d: any) => s + d.laeq, 0) / recent.length;
      values.push(avg);
    }
  }

  if (values.length === 0) {
    return { name: 'Ruido', score: 50, weight: 0.20, detail: 'Sin datos de estacion' };
  }

  const avgLaeq = values.reduce((a, b) => a + b, 0) / values.length;

  // WHO guideline: 55 dB max recommended, 70 dB harmful
  // Scale: 50 dB → 100, 70 dB → 0
  const score = normalizeInverse(avgLaeq, 50, 70);

  let detail: string;
  if (avgLaeq > 65) {
    detail = `${avgLaeq.toFixed(1)} dB — nivel alto, supera ampliamente la recomendacion de la OMS (55 dB)`;
  } else if (avgLaeq > 55) {
    detail = `${avgLaeq.toFixed(1)} dB — por encima de la recomendacion de la OMS (55 dB)`;
  } else {
    detail = `${avgLaeq.toFixed(1)} dB — dentro de los limites recomendados por la OMS`;
  }

  return { name: 'Ruido', score, weight: 0.20, detail };
}

/** Reciclaje: containers per 1000 inhabitants */
function calcReciclaje(distCode: string, population: number, distName: string): SubIndex {
  // Match recycling data by district name (recycling uses names, not codes)
  const nameUpper = distName.toUpperCase();
  const rec = (recyclingData as any[]).find((r) => {
    const rName = r.name.toUpperCase();
    return rName === nameUpper ||
      nameUpper.includes(rName) ||
      rName.includes(nameUpper.slice(0, 8));
  });

  if (!rec || population === 0) {
    return { name: 'Reciclaje', score: 0, weight: 0.10, detail: 'Sin datos' };
  }

  const per1000 = (rec.total / population) * 1000;
  // Range: 4-25 containers/1000 hab observed
  const score = normalize(per1000, 0, 25);

  let detail: string;
  if (per1000 < 8) {
    detail = `Solo ${per1000.toFixed(1)} contenedores por cada 1.000 vecinos — infraestructura limitada`;
  } else if (per1000 < 15) {
    detail = `${per1000.toFixed(1)} contenedores/1.000 hab — cobertura aceptable`;
  } else {
    detail = `${per1000.toFixed(1)} contenedores/1.000 hab — buena cobertura de reciclaje`;
  }

  return { name: 'Reciclaje', score, weight: 0.10, detail };
}

/** Movilidad: placeholder until MV-08 (traffic data) */
function calcMovilidad(): SubIndex {
  return {
    name: 'Movilidad',
    score: 50,
    weight: 0.15,
    detail: 'Datos pendientes (estimacion neutra)',
  };
}

// --- Main computation ---

/**
 * Compute the Green Index for all 21 districts.
 * airScores: optional map of district code → air quality score (0-100) from real-time API.
 * If not provided, uses a neutral score.
 */
export function computeGreenIndex(
  airScores?: Map<string, number>
): DistrictIndex[] {
  const districts: DistrictIndex[] = [];

  for (const tree of treesData as any[]) {
    const code = tree.code as string;
    const demo = (demographicsData as any[]).find((d) => d.code === code);
    const population = demo?.population || 100000;
    const name = tree.name as string;

    // Compute sub-indices
    const aire: SubIndex = {
      name: 'Aire',
      score: airScores?.get(code) ?? 50,
      weight: 0.30,
      detail: airScores?.has(code)
        ? `Score basado en NO2, PM2.5, PM10, O3 en tiempo real`
        : 'Sin datos en tiempo real (estimacion neutra)',
    };

    const verde = calcVerde(code, population);
    const ruido = calcRuido(code);
    const movilidad = calcMovilidad();
    const reciclaje = calcReciclaje(code, population, name);

    const subIndices = [aire, verde, ruido, movilidad, reciclaje];

    // Weighted average
    const totalScore = Math.round(
      subIndices.reduce((sum, si) => sum + si.score * si.weight, 0)
    );

    const { tier, color } = getTier(totalScore);

    districts.push({
      code,
      name,
      score: totalScore,
      tier,
      tierColor: color,
      subIndices,
      population,
      percentile: 0,
    });
  }

  // Compute percentiles
  const sorted = [...districts].sort((a, b) => a.score - b.score);
  sorted.forEach((d, i) => {
    d.percentile = Math.round((i / (sorted.length - 1)) * 100);
  });

  return districts.sort((a, b) => a.code.localeCompare(b.code));
}

/**
 * Get contextual phrase for a score.
 * "72 — mejor que el 85% de los distritos"
 */
export function getContextPhrase(district: DistrictIndex): string {
  const { score, percentile, tier } = district;
  if (percentile >= 90) return `${score} — entre los mejores de Madrid`;
  if (percentile >= 70) return `${score} — mejor que el ${percentile}% de los distritos`;
  if (percentile >= 40) return `${score} — en la media de Madrid`;
  if (percentile >= 15) return `${score} — por debajo de la media`;
  return `${score} — necesita atencion urgente`;
}

export { getTier };
