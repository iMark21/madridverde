# MadridVerde

Dashboard medioambiental que transforma 17 datasets abiertos de datos.madrid.es en un **Índice Verde (0-100)** por distrito de Madrid, con datos en tiempo real.

**Live:** https://madrid-verde.web.app

*"Porque respirar no debería ser cuestión de código postal"*

## Concurso

Proyecto presentado a los **II Premios a la Reutilización de Datos Abiertos del Ayuntamiento de Madrid 2026** (Categoría A: Webs/Apps/Visualizaciones).

- [Convocatoria (sede.madrid.es)](https://sede.madrid.es/portal/site/tramites/menuitem.62876cb64654a55e2dbd7003a8a409a0/?vgnextoid=4c0731b003027910VgnVCM1000001d4a900aRCRD&vgnextchannel=5d8737c190180210VgnVCM100000c90da8c0RCRD&vgnextfmt=default)
- [Bases completas (BOCM-20260303-38.PDF)](https://www.bocm.es/boletin/CM_Orden_BOCM/2026/03/03/BOCM-20260303-38.PDF)
- Deadline: 4 mayo 2026

## Índice Verde

Puntuación compuesta de 5 sub-índices, cada uno normalizado a escala 0-100:

| Sub-índice | Peso | Fuente | Tipo |
|-----------|------|--------|------|
| Aire | 30% | 24 estaciones, 4 contaminantes (NO2, PM2.5, PM10, O3) | Tiempo real (~20 min) |
| Verde | 25% | 793.000 árboles censados + m² zonas verdes por habitante | Censo 2024 |
| Ruido | 20% | 37 estaciones acústicas SIVCA (series desde 1998) | Datos hasta feb. 2026 |
| Movilidad | 15% | ~4.000 sensores de tráfico + 635 estaciones BiciMAD + 834 km carriles bici | Tiempo real (~5 min / ~14 seg) |
| Reciclaje | 10% | 44.251 contenedores por tipo y distrito | Censo 2024 |

## Páginas (single-page scroll)

| Sección | Contenido |
|---------|-----------|
| Mapa | Choropleth interactivo + BiciMAD live + carriles bici + búsqueda por dirección |
| BiciMAD | Dashboard en vivo — estaciones activas, bicis disponibles, top 10 |
| Comparar | Radar chart comparativo de 2-4 distritos |
| Tendencias | Ruido (2000-2025) + NO2 mensual, con anotaciones de políticas públicas. Estaciones seleccionables |
| Metodología | Fórmula, pesos, 17 datasets con links directos al portal, tiers |
| `/barrio/[slug]` | Scorecard: Índice Verde + 5 sub-índices + narrativa + datos + BiciMAD + especies + reciclaje |

## Datos en tiempo real

| Fuente | Frecuencia | API |
|--------|-----------|-----|
| Calidad del aire | ~20 min | ciudadesabiertas.madrid.es |
| Tráfico | ~5 min | informo.madrid.es |
| BiciMAD | ~14 seg | madrid.publicbikesystem.net (GBFS v2.3) |

## Stack

| Componente | Tecnología |
|-----------|-----------|
| Framework | Astro 6 (SSG, 25 páginas estáticas) |
| Mapas | Leaflet 1.9.4 + topojson-client |
| Gráficos | Chart.js 4 + chartjs-plugin-annotation |
| Hosting | Firebase Hosting |
| Analytics | Firebase Analytics |
| Datos build-time | Node.js scripts (SheetJS, PapaParse) |
| Datos real-time | 3 APIs públicas (aire, tráfico, BiciMAD) |

## Desarrollo

```bash
npm install

# Descargar geodata (una sola vez)
node scripts/download-geodata.mjs
node scripts/download-stations.mjs
node scripts/download-bike-lanes.mjs

# Agregar datos (una sola vez, o para refrescar)
node scripts/aggregate-data.mjs

# Servidor de desarrollo
npm run dev

# Build producción
npm run build

# Deploy
firebase deploy --only hosting --project madrid-verde
```

## Licencia

MIT — © 2026 Michel Marques
