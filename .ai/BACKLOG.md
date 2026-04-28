# MadridVerde — Backlog

Concurso: Premios Datos Abiertos Madrid 2026 (Cat. A: Webs/Apps/Visualizaciones)
Deadline: 4 mayo 2026
Spec tecnica: `services/rnd/proposals/MADRIDVERDE_SPEC.md`

## Backlog

| ID | Task | Priority | Phase | Est | Notes |
|----|------|----------|-------|-----|-------|

## In Progress

| ID | Task | Started | Branch | Notes |
|----|------|---------|--------|-------|

## Done

| ID | Task | Completed | Branch |
|----|------|-----------|--------|
| MV-01 | Explorar y validar datasets (14 confirmados, CORS OK, gotchas documentados) | 2026-03-18 | docs/madridverde-spec |
| MV-00 | Crear repo GitHub + onboarding workspace + init Astro + Firebase + estructura 5 paginas | 2026-03-19 | feature/project-setup |
| MV-21 | TopoJSON distritos (21) + barrios (131) de geoportal.madrid.es. WGS84. Index slugs + 21 rutas /barrio/[slug] | 2026-03-19 | feature/geodata-topojson |
| MV-22 | Arbolado XLSX→JSON: 793K arboles agregados por distrito + zonas verdes m2 (trees.json 9.5KB) | 2026-03-19 | feature/data-aggregation |
| MV-23 | Ruido CSV→JSON: 9626 registros, 37 estaciones, series mensuales (noise-monthly.json 1.1MB) | 2026-03-19 | feature/data-aggregation |
| MV-25 | Sociodemograficos CSV→JSON: poblacion + renta por distrito (demographics.json 3KB) | 2026-03-19 | feature/data-aggregation |
| MV-26 | Contenedores CSV→JSON: 44251 contenedores, 21 distritos por tipo (recycling.json 7.5KB) | 2026-03-19 | feature/data-aggregation |
| MV-02 | Mapa choropleth Leaflet + TopoJSON: 21 distritos coloreados por score placeholder, tooltips, clic→scorecard. 67KB gzip | 2026-03-19 | feature/choropleth-map |
| MV-03 | Aire real-time: client lib (fetchAirQuality + aggregateByDistrict), 24 estaciones mapeadas, 4 contaminantes, cache sessionStorage 20min | 2026-03-19 | feature/air-quality-realtime |
| MV-10 | Indice Verde: green-index.ts (5 sub-indices ponderados, normalizacion, tiers, frases contextuales). Mapa actualizado con scores reales + async air update. Scorecards con 5 sub-indices | 2026-03-19 | feature/green-index |
| MV-15 | Deploy Firebase Hosting — madrid-verde.web.app LIVE. Proyecto Firebase: madridverde-web | 2026-03-19 | feature/deploy-firebase |
| MV-14 | Diseno visual: stats resumen (media, mejor, peor, datasets), ranking 21 distritos con barras coloreadas, nav con indicador activo, responsive | 2026-03-19 | feature/visual-polish |
| MV-11 | Graficos historicos: Chart.js noise trends (5 estaciones, 2000-2025) con lineas de politicas publicas + limite OMS. SR-only table | 2026-03-19 | feature/historical-charts |
| MV-12 | Comparador: radar chart 2-4 distritos con chips selector, tabla de sub-indices. Pre-seleccion Centro vs Moncloa | 2026-03-19 | feature/historical-charts |
| MV-27 | Metodologia completa: formula, 5 sub-indices detallados, flujo 14 datasets, tiers, fuentes. Clave para jurado | 2026-03-19 | feature/metodologia-integrations |
| MV-04 | Ruido integrado en scorecards via sub-indice Ruido del green-index (LAeq por estacion) | 2026-03-19 | feature/metodologia-integrations |
| MV-05 | Arbolado + zonas verdes integrados en scorecards: arboles totales, m2/hab, top 5 especies, contenedores por tipo con barras | 2026-03-19 | feature/metodologia-integrations |
| MV-28 | Frases contextuales humanas en sub-indices (Verde OMS, Ruido OMS, Reciclaje cobertura) | 2026-03-19 | feature/ux-enhancements |
| MV-13 | Busqueda por direccion: Nominatim geocoding con debounce 500ms, marker en mapa, bounded a Madrid | 2026-03-19 | feature/ux-enhancements |
| MV-29 | Anotaciones politicas en grafico historico: chartjs-plugin-annotation, 5 politicas (Ley Ruido, APR, Madrid Central, COVID, ZBE) con etiquetas | 2026-03-19 | feature/final-incremental |
| MV-30 | Accesibilidad WCAG AA: focus-visible, sr-only utility, skip-link mejorado, outline removal para mouse | 2026-03-19 | feature/final-incremental |
| MV-20 | Firebase Analytics inicializado (Firebase SDK modular, pageview tracking) | 2026-03-19 | feature/final-incremental |
| MV-24 | Aire historico: 2025+2026 CSVs descargados, agregados por estacion/mes, NO2 chart en /historico con limite OMS | 2026-03-19 | feature/air-traffic-final |
| MV-08 | Trafico real-time: client lib (informo.madrid.es XML), ~4000 sensores, score fluido/denso/congestionado, sub-indice Movilidad live | 2026-03-19 | feature/air-traffic-final |
| MV-31 | Fix search UX: icono lupa, cursor pointer (global styles para DOM dinamico), focus shadow, spacing | 2026-03-19 | fix/search-ux |
| MV-32 | Fix map zoom bounds: minZoom 10, maxBounds municipio Madrid, viscosity 0.9 | 2026-03-19 | fix/map-zoom-bounds |
| MV-33 | Auditoria datos en vivo: hidratacion live en scorecards (aire+trafico), fechas en datos estaticos (censo 2024, SIVCA feb. 2026), loading states | 2026-03-19 | fix/data-freshness-audit |
| MV-34 | Single-page scroll (estilo Apple): todas las secciones en index, nav con anchors + IntersectionObserver, smooth scroll | 2026-03-19 | feature/single-page-scroll |
| MV-35 | BiciMAD live: 635 estaciones GBFS, markers en mapa, dashboard seccion propia, per-district en scorecards | 2026-03-19 | feature/bicimad-sticky-nav + feature/bicimad-og-enhancements |
| MV-36 | Carriles bici: 834km GeoJSON simplificado, capa en mapa | 2026-03-19 | feature/bicimad-sticky-nav |
| MV-37 | Gamechangers: 17 datasets con links, narrativas por distrito, boton compartir, OG card | 2026-03-19 | feature/gamechangers + feature/bicimad-og-enhancements |
| MV-38 | Sticky nav con backdrop blur | 2026-03-19 | feature/bicimad-sticky-nav |
| MV-39 | Migracion Firebase: madrid-verde.web.app | 2026-03-19 | chore/migrate-firebase |
| MV-40 | Fix Chart.js: registro centralizado, selectores scoped, render diferido | 2026-03-19 | fix/chartjs-render |
| MV-41 | Estaciones seleccionables en charts de tendencias (ruido + aire) | 2026-03-19 | feature/single-page-scroll |
| MV-42 | Mini-mapa por distrito: Leaflet + BiciMAD live + carriles bici + contorno tier color | 2026-03-19 | feature/district-mini-map |
| MV-43 | Nombres de especies en castellano (mapping codigos censo → nombres comunes) | 2026-03-19 | fix/species-names |
| MV-44 | OG card estilo Auto-720: emoji centrado, limpio (Puppeteer, 73KB JPG) | 2026-03-19 | fix/og-image-simple |
| MV-45 | Rediseno cards: border-top sutil en vez de border-left IA-pattern | 2026-03-19 | fix/card-design |
| MV-46 | i18n ES/EN: 230+ claves, toggle instantaneo en nav, data-i18n en todas las paginas, localStorage | 2026-03-19 | feature/i18n-export-analytics |
| MV-47 | CSV export: boton descarga global (21 distritos, 11 columnas) + per-district en scorecards. Blob API | 2026-03-19 | feature/i18n-export-analytics |
| MV-48 | GA4 analytics: 16 eventos (section, scroll, time, map, district, compare, trends, export, lang, cookie, page). G-6QVLS468J5 | 2026-03-19 | feature/i18n-export-analytics + fix/ga4-config |
| MV-49 | Cookie banner LSSI: strip fijo, localStorage consent, paleta mediterranea | 2026-03-19 | feature/i18n-export-analytics |
| MV-50 | BiciMAD fix: fetchWithRetry con 2 reintentos + backoff exponencial para fallos intermitentes | 2026-03-19 | feature/i18n-export-analytics |
| MV-51 | Fix 15 dataset links (datos.madrid.es migro a nuevo portal /dataset/). Todos HTTP 200 verificados | 2026-03-20 | fix/dataset-links |
| MV-52 | Firebase consolidado: proyecto madridverde-web eliminado, todo en madrid-verde (hosting + GA4) | 2026-03-20 | fix/ga4-config |
| MV-53 | MCP server creado: 5 tools (air, noise, green, index, compare), TypeScript + MCP SDK + Zod. Repo madridverde-mcp | 2026-03-20 | feature/mcp-server |
| MV-57 | EMT bus integration: GTFS aggregation (4910 paradas, 235 lineas, frecuencias), home section (stats + tabla + alertas protobuf live), scorecard (badges interactivas con ruta/freq/alertas), i18n ES+EN, nav anchor | 2026-03-20 | feature/emt-integration |
| MV-58 | Fix button contrast: score action buttons ahora verde bosque solido (visibles en todos los tiers) | 2026-03-20 | fix/button-contrast |
| MV-59 | Fix map z-index: leyenda de mapas (home + distrito) contenida dentro del stacking context, no pasa por encima de navbar/cookie | 2026-03-20 | fix/map-zindex + fix/district-map-zindex |
| MV-54 | Seccion "Pregunta a tu IA" en web: card verde bosque, mockup chat 2 Q&A, 10 tool tags, CTA GitHub, i18n ES+EN. Nav link "IA" | 2026-03-20 | feature/mcp-section |
| MV-55 | README MCP: npx install, paso a paso Claude Desktop/Code/Cursor/Windsurf/ChatGPT, NVM warning, config merge, 10 ejemplos queries | 2026-03-20 | feature/readme-polish + fixes |
| MV-60 | MCP v0.2.0: +3 tools (get_bicimad, get_traffic, get_emt_alerts). 8 tools total | 2026-03-20 | feature/complete-tools |
| MV-61 | MCP v0.3.0: +find_district (geocoding Nominatim + point-in-polygon TopoJSON). 9 tools | 2026-03-20 | feature/geocoding-tool |
| MV-62 | MCP v0.4.0: +find_nearby (paradas EMT + BiciMAD live cercanas a direccion). 10 tools. Publicado en npm | 2026-03-20 | feature/find-nearby |
| MV-63 | Mobile responsive overhaul: hamburger menu, map scroll-trap fix, touch targets 44px, leyenda colapsable, station chips horizontal scroll, theme-color, overscroll-behavior | 2026-03-21 | fix/mobile-responsive |
| MV-64 | Trafico: editorial "Pulse" strip below map — dynamic lede, pulse bar, congested streets as clickable links to district. Iterated from section→map layer→pulse. Removed map traffic layer | 2026-03-21 | feature/traffic-section + fix/traffic-redesign + fix/traffic-strip-v2/v3 |
| MV-65 | Stats cards (media, mejor, peor, datasets) moved above the map for immediate visibility | 2026-03-21 | feature/layout-reorganize |
| MV-66 | IA as own section (between Tendencias and Metodologia) with CSV download button inside. Removed from Metodologia | 2026-03-21 | fix/ia-section-separate |
| MV-67 | Traffic in district detail pages: per-district score, distribution bar, worst congested streets from ~4000 sensors | 2026-03-21 | feature/layout-reorganize + fix/traffic-district-script |
| MV-68 | Street name parser for traffic API: strips (MICRO)/(AFOROS)/(TACTICO), parses DIR(TRAMO) → "Calle (Desde → Hasta)" format, title case, filter sensor IDs | 2026-03-21 | fix/traffic-street-parser |
| MV-16 | Memoria PDF: 10 pages, Lato 11pt, A4, all contest content sections. Source in pitch/memoria.md, PDF gitignored in pitch/ | 2026-03-25 | chore/pitch-folder |
| MV-56 | Video demo segment: MCP in action (Claude answering Madrid air/noise questions with real data). Included in final.mp4 (180s, scene 7) | 2026-03-25 | feature/guion-v2 (PitchReel) |
| MV-69 | Spanish spelling corrections: ~55 missing tildes fixed across green-index.ts, barrio/[slug].astro, historico.astro, metodologia.astro, comparar.astro, SeccionTendencias.astro. v0.0.23 deployed | 2026-03-25 | fix/spelling-ortografia |
| MV-70 | Spanish spelling round 2: ~40 more tildes fixed in HTML fallback texts (index.astro, metodologia.astro, maps) + translations.js ES keys. Both SSG static HTML and i18n runtime now correct | 2026-03-25 | fix/spelling-fallbacks-i18n |
| MV-71 | Firebase config moved to env vars (.env + .env.example). Git history rewritten (filter-branch) to remove hardcoded credentials. develop + main + 20 tags force-pushed clean | 2026-03-25 | fix/firebase-env-vars |
| MV-17 | Video demo subido a YouTube (no listado, 180s). URL: https://youtu.be/8jfbjEL3KIE | 2026-03-25 | — |
| MV-18 | Presentado en sede.madrid.es. Registro 20260466799, CSV 1ZKC7SODU3JQ3D36 | 2026-03-25 | — |
| MV-72 | Fix score sync home↔detail: MapaMadrid emits mv-index-updated after air+traffic fetch; ranking list updates scores + re-sorts; [slug].astro updates context phrase number. v0.0.24 deployed | 2026-03-25 | fix/ranking-detail-score-sync |
| MV-73 | Fix hero stat cards (avg/best/worst) not updating with real-time scores — extended mv-index-updated listener to recalculate avg and update best/worst district cards. v0.0.25 deployed | 2026-03-25 | fix/stat-cards-sync |
