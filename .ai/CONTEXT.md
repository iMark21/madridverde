# MadridVerde — Dashboard medioambiental de Madrid

**Last Verified:** 2026-03-25

**Video demo:** https://youtu.be/8jfbjEL3KIE (no listado, 180s)

## General Info
- **What:** Web app que transforma 14+ datasets abiertos de datos.madrid.es en un Indice Verde (0-100) por distrito de Madrid
- **Repo (GitHub):** github.com/iMark21/madridverde (PRIVATE until 2026-05-04)
- **Local checkout:** configured in machine-level `projects.local.yaml`
- **URL:** https://madrid-verde.web.app
- **Platforms:** Web
- **Languages:** Spanish (es)
- **Minimum requirements:** Modern browser (ES6+)

## Stack

| Category | Technology |
|----------|-----------|
| Framework | Astro SSG (MPA, 5 paginas) |
| JS interactivo | Vanilla JS (sin framework) |
| Mapas | Leaflet 1.9.4 + topojson-client |
| Graficos | Chart.js 4.x (tree-shaken: line + bar + radar) |
| Build-time data | Node.js scripts (aggregate-data.mjs) |
| Hosting | Firebase Hosting |
| Font | DM Serif Display + Inter (Google Fonts) |

## Business Model
- **Concurso**: II Premios a la Reutilizacion de Datos Abiertos del Ayuntamiento de Madrid 2026
- **Categoria A** (Webs/Apps): 1er premio 4.000 EUR, 2o 3.000 EUR, 3o 1.500 EUR
- **Deadline**: 4 mayo 2026
- **Evaluacion**: Utilidad (28%) + Diversidad datasets (28%) + Innovacion (20%) + Calidad tecnica (24%)
- **Post-concurso**: reutilizable para concursos en otros territorios (Bizkaia, Euskadi, CyL, Tenerife)

## Current Status
- **Phase:** Submitted (all deliverables complete, awaiting jury)
- **URL:** https://madrid-verde.web.app
- **Firebase project:** madrid-verde
- **Current focus:** Submitted. Awaiting jury evaluation
- **Last milestone:** v0.0.25 deployed (2026-03-25) — fix score sync: all home elements (stat cards avg/best/worst + ranking list) and district scorecard now show consistent real-time Índice Verde
- **Pitch assets:** `pitch/` folder in repo — `pitchreel.yaml` (PitchReel config) + `memoria.md` (PDF source, tracked). Outputs (mp4, pdf, png) gitignored but present locally

## Key Features (target)
1. **Mapa choropleth** de distritos coloreados por Indice Verde
2. **Indice Verde (0-100)**: 5 sub-indices (Aire 30%, Verde 25%, Ruido 20%, Movilidad 15%, Reciclaje 10%)
3. **Scorecard por barrio**: 5 sub-indices + graficos historicos
4. **Comparador de distritos**: radar chart 2-4 distritos
5. **Tendencias historicas**: series temporales con anotaciones de politicas
6. **Metodologia transparente**: formula, pesos, procedencia de datos
7. **Datos en tiempo real**: calidad del aire (20 min) + trafico (5 min)
8. **Frases contextuales**: "72 — mejor que el 85% de distritos"
9. **Bilingue ES/EN**: toggle instantaneo, 230+ claves traducidas, sin recarga
10. **Exportar CSV**: descarga datos de todos los distritos o de uno individual
11. **Cookie consent**: banner LSSI, localStorage
12. **GA4 Analytics**: 16 eventos, tracking completo de interacciones
13. **MCP Server "Pregunta a tu IA"**: servidor MCP open-source que expone los datos medioambientales para agentes AI (Claude, ChatGPT, Cursor). Seccion prominente en la web + repo publico en GitHub + publicado en npm

## MCP Server (madridverde-mcp)
- **Repo:** github.com/iMark21/madridverde-mcp (PRIVADO hasta presentacion del concurso, luego publico MIT)
- **Local path:** <local-madridverde-mcp-checkout>
- **npm:** madridverde-mcp (PUBLICADO — v0.4.0)
- **Stack:** TypeScript + @modelcontextprotocol/sdk + Zod
- **Tools expuestos (10):**
  - `get_air_quality` — calidad del aire por estacion/distrito (real-time)
  - `get_noise_levels` — niveles de ruido por estacion/distrito (historico)
  - `get_green_index` — Indice Verde completo de un distrito (5 sub-indices)
  - `get_green_areas` — zonas verdes, arboles, m2/habitante, EMT por distrito
  - `compare_districts` — comparar 2-4 distritos en todos los indicadores
  - `get_bicimad` — disponibilidad de bicis en 636 estaciones (live)
  - `get_traffic` — estado del trafico en ~4800 sensores (live)
  - `get_emt_alerts` — incidencias EMT en vivo (protobuf, filtrable por linea/distrito)
  - `find_district` — geocoding: direccion → distrito (Nominatim + point-in-polygon)
  - `find_nearby` — paradas EMT + BiciMAD mas cercanas a una direccion (live)
- **Datos:** EXCLUSIVAMENTE APIs y datasets del Ayuntamiento de Madrid (datos.madrid.es, informo.madrid.es, opendata.emtmadrid.es). Reutiliza los mismos JSONs pre-procesados del build de MadridVerde. PROHIBIDO usar fuentes externas, blogs, o datos de terceros. Cada respuesta del MCP incluye `source` (URL del dataset/API del Ayuntamiento) + `last_updated`
- **Rol en el concurso:** diferenciador de innovacion. Seccion destacada en web, 1-2 paginas en memoria, segmento en video demo con ejemplo real de Claude respondiendo preguntas

## Technical Decisions
- **Astro SSG** — MPA de 5 paginas, zero JS por defecto, islands solo donde hay interactividad
- **Vanilla JS** — sin Preact/React para mantener < 100KB JS total
- **Leaflet** en vez de D3 geo — mas ligero, tiles gratuitos (CartoDB Positron)
- **Build-time aggregation** — datasets pesados (XLSX 52MB, CSVs 30MB) se pre-procesan a JSONs pequeños
- **Firebase Hosting** — consistencia con el resto de proyectos web
- **Paleta mediterranea** — inspirada en Madrid (Retiro, piedra caliza, tejados), NO verde generico
- **Firebase config via env vars** — `.env` (gitignored) + `.env.example` (tracked). `import.meta.env.PUBLIC_*` → `window.__fbConfig` → CDN module script. Git history rewritten to remove hardcoded credentials

## Known Issues
- (none)

## Design
- **Platform guidelines:** WCAG AA + responsive (mobile-first)
- **Design system:** Paleta mediterranea custom (Bosque #2D6A4F, Arena #F5F1EB, Arcilla #E76F51)
- **Dark mode:** N/A (v1)
- **Accessibility status:** Planned (WCAG AA target — skip-link, aria-labels, SR-only tables, keyboard nav)
- **Principios anti-pattern:** mapa como hero (NO hero centrado), tipografia grande para scores, layout editorial asimetrico (The Pudding), whitespace generoso

## Deployment
- **CI/CD:** Manual (`npm run build && firebase deploy`)
- **Environment:** Production (https://madrid-verde.web.app)
- **Last deploy:** v0.0.25 (2026-03-25) — fix hero stat cards + ranking sync with real-time Índice Verde
- **Deploy notes:** `npm run prebuild` agrega datos pesados antes del build de Astro

## SEO
- No prioritario para el concurso (evaluacion interna, no busqueda organica)
- Metadata basico + OG tags para compartibilidad

## Analytics
- **Tracking status:** Live (GA4 G-6QVLS468J5, proyecto Firebase: madrid-verde)
- **Key events:** 16 eventos — section_viewed, scroll_depth, time_on_page, map_district_clicked, map_layer_toggled, map_search_used, district_viewed (3 sources), district_shared, comparison_started, comparison_district_added, trend_station_selected, trend_chart_viewed, csv_exported, language_changed, cookie_accepted, page_viewed

## Entregables del concurso
1. **Web app funcional** en madridverde.web.app (incluye seccion "Pregunta a tu IA") ✅
2. **MCP server** en github.com/iMark21/madridverde-mcp (publico, npm) ✅
3. **Memoria** (max 10 paginas PDF) ✅ — Lato 11pt, A4, 10 paginas. `pitch/memoria.md` (source) + `pitch/memoria.pdf` (gitignored)
4. **Video demo** (max 3 minutos) ✅ — https://youtu.be/8jfbjEL3KIE (no listado, 180s)
5. **Presentacion** en sede.madrid.es ✅ — Registro 20260466799, 25/3/2026 16:09, CSV 1ZKC7SODU3JQ3D36

## Roadmap
See [BACKLOG.md](BACKLOG.md)

## Notes
- Tagline: "Porque respirar no debería ser cuestión de código postal"
- Propuesta R&D: `services/rnd/proposals/MADRID_OPEN_DATA.md`
- Spec tecnica: `services/rnd/proposals/MADRIDVERDE_SPEC.md`
- Git identity is enforced by local repository hooks.
- `src/data/emt-stops-geo.json` (482K, 4910 paradas) fue omitido en el commit de integración EMT — añadido en fix/add-emt-stops-geo (2026-03-20)
- 14 datasets validados (URLs, CORS, formatos, gotchas) — ver SPEC
- CSVs usan `;` como delimitador — PapaParse
- geoportal.madrid.es sin CORS — TopoJSON pre-descargado como static
- Arbolado solo en XLSX (52MB) — SheetJS en build
- Trafico usa coordenadas UTM — convertir con master CSV
