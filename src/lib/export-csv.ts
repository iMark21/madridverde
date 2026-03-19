/**
 * MadridVerde — CSV Export
 *
 * Exports district environmental data as a downloadable CSV file.
 * Uses Blob API + URL.createObjectURL (no external dependencies).
 */

import type { DistrictIndex } from './green-index';
import treesData from '../data/trees.json';

/**
 * Export all districts as CSV.
 * Columns: Distrito, Indice Verde, Aire, Verde, Ruido, Movilidad, Reciclaje,
 *          Arboles, m2 Verdes/hab, Contenedores, Poblacion
 */
export function exportDistrictCSV(districts: DistrictIndex[]): void {
  const header = [
    'Distrito',
    'Indice Verde',
    'Aire',
    'Verde',
    'Ruido',
    'Movilidad',
    'Reciclaje',
    'Arboles',
    'm2 Verdes/hab',
    'Contenedores',
    'Poblacion',
  ];

  const rows = districts.map((d) => {
    const getScore = (name: string) => {
      const si = d.subIndices.find((s) => s.name === name);
      return si ? si.score : '';
    };

    // Extract numeric values from detail strings
    const verdeDetail = d.subIndices.find((s) => s.name === 'Verde')?.detail || '';
    const reciclajeDetail = d.subIndices.find((s) => s.name === 'Reciclaje')?.detail || '';

    // m2/hab: extract first number like "12.3 m²/hab"
    const m2Match = verdeDetail.match(/([\d.]+)\s*m/);
    const m2Value = m2Match ? m2Match[1] : '';

    // Contenedores/1000 hab: extract first number
    const contMatch = reciclajeDetail.match(/([\d.]+)\s*contenedores/);
    const contValue = contMatch ? contMatch[1] : '';

    // Arboles: look up from trees.json by district code
    const treeEntry = (treesData as any[]).find((t) => t.code === d.code);
    const totalTrees = treeEntry ? treeEntry.totalTrees : '';

    return [
      csvEscape(titleCase(d.name)),
      d.score,
      getScore('Aire'),
      getScore('Verde'),
      getScore('Ruido'),
      getScore('Movilidad'),
      getScore('Reciclaje'),
      totalTrees,
      m2Value,
      contValue,
      d.population,
    ];
  });

  downloadCSV(header, rows, 'madridverde-datos');
}

/**
 * Export a single district as CSV (same columns, one data row).
 */
export function exportSingleDistrictCSV(district: DistrictIndex): void {
  exportDistrictCSV([district]);
}

// --- Helpers ---

function titleCase(str: string): string {
  const minor = new Set(['de', 'del', 'el', 'la', 'las', 'los', 'y', 'e']);
  return str
    .toLowerCase()
    .split(' ')
    .map((w, i) => (i === 0 || !minor.has(w)) ? w.charAt(0).toUpperCase() + w.slice(1) : w)
    .join(' ');
}

function csvEscape(value: unknown): string {
  const str = String(value ?? '');
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

function downloadCSV(header: string[], rows: unknown[][], filenameBase: string): void {
  const date = new Date().toISOString().slice(0, 10);
  const filename = `${filenameBase}-${date}.csv`;

  const lines = [
    header.map(csvEscape).join(','),
    ...rows.map((row) => row.map(csvEscape).join(',')),
  ];
  const csvContent = lines.join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();

  // Cleanup
  setTimeout(() => {
    URL.revokeObjectURL(url);
    link.remove();
  }, 100);
}
