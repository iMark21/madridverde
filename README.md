# MadridVerde

Dashboard medioambiental que transforma 14 datasets abiertos de datos.madrid.es en un **Indice Verde (0-100)** por distrito de Madrid.

**Live:** https://madridverde-web.web.app

*"Porque respirar no deberia ser cuestion de codigo postal"*

## Concurso

Proyecto presentado a los **II Premios a la Reutilizacion de Datos Abiertos del Ayuntamiento de Madrid 2026** (Categoria A: Webs/Apps/Visualizaciones).

- [Convocatoria (sede.madrid.es)](https://sede.madrid.es/portal/site/tramites/menuitem.62876cb64654a55e2dbd7003a8a409a0/?vgnextoid=4c0731b003027910VgnVCM1000001d4a900aRCRD&vgnextchannel=5d8737c190180210VgnVCM100000c90da8c0RCRD&vgnextfmt=default)
- [Bases completas (BOCM-20260303-38.PDF)](https://www.bocm.es/boletin/CM_Orden_BOCM/2026/03/03/BOCM-20260303-38.PDF)
- Deadline: 4 mayo 2026

## Indice Verde

Puntuacion compuesta de 5 sub-indices, cada uno normalizado a escala 0-100:

| Sub-indice | Peso | Fuente |
|-----------|------|--------|
| Aire | 30% | API calidad del aire real-time (24 estaciones, 4 contaminantes) |
| Verde | 25% | 793.000 arboles censados + m2 zonas verdes por habitante |
| Ruido | 20% | 37 estaciones acusticas SIVCA (series desde 1998) |
| Movilidad | 15% | ~4.000 sensores de trafico en tiempo real |
| Reciclaje | 10% | 44.251 contenedores por tipo y distrito |

## Paginas

| Ruta | Contenido |
|------|-----------|
| `/` | Mapa choropleth interactivo + ranking + busqueda por direccion |
| `/barrio/[slug]` | Scorecard: Indice Verde + 5 sub-indices + datos detallados (especies, reciclaje) |
| `/comparar` | Radar chart comparativo de 2-4 distritos |
| `/historico` | Tendencias de ruido y NO2 con anotaciones de politicas publicas |
| `/metodologia` | Formula, pesos, flujo de 14 datasets, tiers, fuentes |

## Stack

| Componente | Tecnologia |
|-----------|-----------|
| Framework | Astro 6 (SSG, 25 paginas estaticas) |
| Mapas | Leaflet 1.9.4 + topojson-client |
| Graficos | Chart.js 4 + chartjs-plugin-annotation |
| Hosting | Firebase Hosting |
| Analytics | Firebase Analytics |
| Datos build-time | Node.js scripts (SheetJS, PapaParse) |
| Datos real-time | APIs ciudadesabiertas.madrid.es + informo.madrid.es |

## Desarrollo

```bash
# Instalar dependencias
npm install

# Descargar geodata (una sola vez)
node scripts/download-geodata.mjs

# Agregar datos (una sola vez, o para refrescar)
node scripts/aggregate-data.mjs

# Servidor de desarrollo
npm run dev

# Build produccion
npm run build

# Deploy
firebase deploy --only hosting --project madridverde-web
```

## Datos

Los datos se procesan en dos momentos:

**Build-time** (scripts/aggregate-data.mjs):
- Arbolado XLSX (52MB) -> trees.json (9.5KB)
- Ruido CSV -> noise-monthly.json (1.1MB)
- Sociodemograficos CSV (30MB) -> demographics.json (3KB)
- Contenedores CSV (6.6MB) -> recycling.json (7.5KB)
- Aire historico CSVs -> air-monthly.json (65KB)

**Runtime** (client-side):
- Calidad del aire (JSON, cada 20 min)
- Trafico (XML, cada 5 min)

## Licencia

(c) iMark Apps
