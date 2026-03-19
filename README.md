# MadridVerde

Dashboard medioambiental que transforma 17 datasets abiertos de datos.madrid.es en un **Indice Verde (0-100)** por distrito de Madrid, con datos en tiempo real.

**Live:** https://madrid-verde.web.app

*"Porque respirar no deberia ser cuestion de codigo postal"*

## Concurso

Proyecto presentado a los **II Premios a la Reutilizacion de Datos Abiertos del Ayuntamiento de Madrid 2026** (Categoria A: Webs/Apps/Visualizaciones).

- [Convocatoria (sede.madrid.es)](https://sede.madrid.es/portal/site/tramites/menuitem.62876cb64654a55e2dbd7003a8a409a0/?vgnextoid=4c0731b003027910VgnVCM1000001d4a900aRCRD&vgnextchannel=5d8737c190180210VgnVCM100000c90da8c0RCRD&vgnextfmt=default)
- [Bases completas (BOCM-20260303-38.PDF)](https://www.bocm.es/boletin/CM_Orden_BOCM/2026/03/03/BOCM-20260303-38.PDF)
- Deadline: 4 mayo 2026

## Indice Verde

Puntuacion compuesta de 5 sub-indices, cada uno normalizado a escala 0-100:

| Sub-indice | Peso | Fuente | Tipo |
|-----------|------|--------|------|
| Aire | 30% | 24 estaciones, 4 contaminantes (NO2, PM2.5, PM10, O3) | Tiempo real (~20 min) |
| Verde | 25% | 793.000 arboles censados + m2 zonas verdes por habitante | Censo 2024 |
| Ruido | 20% | 37 estaciones acusticas SIVCA (series desde 1998) | Datos hasta feb. 2026 |
| Movilidad | 15% | ~4.000 sensores de trafico + 635 estaciones BiciMAD + 834 km carriles bici | Tiempo real (~5 min / ~14 seg) |
| Reciclaje | 10% | 44.251 contenedores por tipo y distrito | Censo 2024 |

## Paginas (single-page scroll)

| Seccion | Contenido |
|---------|-----------|
| Mapa | Choropleth interactivo + BiciMAD live + carriles bici + busqueda por direccion |
| BiciMAD | Dashboard en vivo — estaciones activas, bicis disponibles, top 10 |
| Comparar | Radar chart comparativo de 2-4 distritos |
| Tendencias | Ruido (2000-2025) + NO2 mensual, con anotaciones de politicas publicas. Estaciones seleccionables |
| Metodologia | Formula, pesos, 17 datasets con links directos al portal, tiers |
| `/barrio/[slug]` | Scorecard: Indice Verde + 5 sub-indices + narrativa + datos + BiciMAD + especies + reciclaje |

## Datos en tiempo real

| Fuente | Frecuencia | API |
|--------|-----------|-----|
| Calidad del aire | ~20 min | ciudadesabiertas.madrid.es |
| Trafico | ~5 min | informo.madrid.es |
| BiciMAD | ~14 seg | madrid.publicbikesystem.net (GBFS v2.3) |

## Stack

| Componente | Tecnologia |
|-----------|-----------|
| Framework | Astro 6 (SSG, 25 paginas estaticas) |
| Mapas | Leaflet 1.9.4 + topojson-client |
| Graficos | Chart.js 4 + chartjs-plugin-annotation |
| Hosting | Firebase Hosting |
| Analytics | Firebase Analytics |
| Datos build-time | Node.js scripts (SheetJS, PapaParse) |
| Datos real-time | 3 APIs publicas (aire, trafico, BiciMAD) |

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

# Build produccion
npm run build

# Deploy
firebase deploy --only hosting --project madrid-verde
```

## Licencia

(c) iMark Apps
