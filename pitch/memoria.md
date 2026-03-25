---
geometry: "a4paper, top=1.8cm, bottom=1.8cm, left=1.5cm, right=1.5cm"
mainfont: "Lato"
monofont: "Menlo"
fontsize: 11pt
linestretch: 1
header-includes:
  - \usepackage{graphicx}
  - \usepackage{float}
  - \usepackage{booktabs}
  - \usepackage{array}
  - \usepackage{longtable}
  - \renewcommand{\arraystretch}{1.2}
  - \setlength{\tabcolsep}{4pt}
  - \let\oldlongtable\longtable
  - \let\endoldlongtable\endlongtable
  - \renewenvironment{longtable}{\small\oldlongtable}{\endoldlongtable}
---

\begin{titlepage}
\centering
\vspace*{4cm}
{\fontsize{26}{32}\selectfont\textbf{MadridVerde}}\\[0.4cm]
{\Large El mapa medioambiental de tu barrio}\\[1.2cm]
{\normalsize\textbf{Memoria técnica — II Premios a la Reutilización de Datos Abiertos}}\\[0.2cm]
{\normalsize\textbf{del Ayuntamiento de Madrid 2026}}\\[2.5cm]
\begin{tabular}{@{\hspace{1cm}}ll@{\hspace{1cm}}}
\toprule
\textbf{Nombre del proyecto} & MadridVerde \\[2pt]
\textbf{Subtítulo} & El mapa medioambiental de tu barrio \\[2pt]
\textbf{Autor} & Juan Miguel Marqués Morilla \\[2pt]
\textbf{Categoría} & A — Webs, apps y visualizaciones interactivas \\[2pt]
\textbf{URL} & madrid-verde.web.app \\[2pt]
\textbf{Código fuente MCP} & github.com/iMark21/madridverde-mcp \\[2pt]
\textbf{npm} & npmjs.com/package/madridverde-mcp \\[2pt]
\textbf{Licencia} & MIT (código abierto) \\[2pt]
\textbf{Fecha} & Mayo 2026 \\
\bottomrule
\end{tabular}
\end{titlepage}

\tableofcontents

\newpage

---

**MadridVerde** transforma diecisiete datasets abiertos del Ayuntamiento de Madrid en un único índice medioambiental por barrio, accesible para cualquier ciudadano sin necesidad de registro ni instalación.

El proyecto integra datos de calidad del aire, ruido, arbolado, zonas verdes, reciclaje, tráfico, BiciMAD y transporte público en una interfaz visual coherente. La puntuación resultante —el **Índice Verde (0-100)**— sitúa a cada uno de los 131 barrios de Madrid en un contexto comprensible: no un dato aislado, sino una posición relativa dentro de la ciudad.

Además, MadridVerde incluye un **servidor MCP de código abierto** que permite a asistentes de inteligencia artificial (Claude, ChatGPT, Cursor) consultar estos mismos datos en lenguaje natural, sin clave de API, con un solo comando de configuración.

---

## El problema: datos excelentes, inaccesibles en la práctica

Madrid publica datos ambientales de gran calidad: calidad del aire, ruido, arbolado, zonas verdes, reciclaje, tráfico, BiciMAD y transporte público. Son datos fiables, actualizados y completamente abiertos al ciudadano.

El problema es que **están dispersos en más de diez portales distintos**, en formatos técnicos heterogéneos (CSV, XLSX de 52 MB, XML, protobuf, JSON-LD, GBFS), sin contexto visual que permita interpretarlos ni compararlos. Un ciudadano no puede saber si su barrio es más saludable que el del vecino. Un periodista no puede verificar si Madrid Central mejoró el aire. Un técnico municipal no puede medir la brecha medioambiental entre distritos sin cruzar manualmente múltiples datasets.

**El ciudadano tiene derecho a esos datos. No tenía las herramientas para usarlos. MadridVerde resuelve eso.**

---

## La solución: el Índice Verde

MadridVerde integra los diecisiete datasets del Ayuntamiento en una interfaz visual única, construida en torno al **Índice Verde**: una puntuación de 0 a 100 para cada uno de los 131 barrios de Madrid.

### Qué es el Índice Verde

El Índice Verde combina cinco dimensiones medioambientales con pesos ponderados según su impacto en la salud:

| Dimensión | Peso | Datos que incorpora |
|-----------|------|---------------------|
| **Calidad del aire** | 30% | NO₂, PM2.5, PM10, O₃ en tiempo real + histórico |
| **Zonas verdes** | 25% | m² de zonas verdes por habitante + densidad de arbolado |
| **Ruido** | 20% | Niveles LAeq, Ld y Ln por estación acústica |
| **Movilidad sostenible** | 15% | Carriles bici + BiciMAD + inversión de intensidad de tráfico |
| **Reciclaje** | 10% | Contenedores per cápita por tipo de residuo |

El resultado es una puntuación continua, normalizada y comparable entre barrios, presentada con cinco niveles de interpretación:

| Puntuación | Nivel | Significado |
|------------|-------|-------------|
| 85–100 | Excelente | «Los pulmones de la ciudad» |
| 70–84 | Bueno | «Se respira bien» |
| 55–69 | Aceptable | «Margen de mejora» |
| 40–54 | Mejorable | «Necesita atención» |
| 0–39 | Crítico | «Zona crítica» |

### Qué puede hacer un usuario en MadridVerde

1. **Ver el mapa choropleth** de los 21 distritos coloreados por Índice Verde, con el pulso del tráfico en tiempo real superpuesto
2. **Consultar el scorecard completo** de cualquier barrio: 5 sub-índices + concentración de NO₂ en vivo + intensidad de tráfico + mini-mapa con carriles bici y estaciones BiciMAD
3. **Ver bicis disponibles ahora mismo** en las 636 estaciones BiciMAD, filtradas por distrito o por proximidad a una dirección
4. **Ver alertas de la EMT en tiempo real**: incidencias por línea o distrito, con datos directamente desde openapi.emtmadrid.es
5. **Comparar hasta 4 distritos** simultáneamente mediante un radar chart interactivo en 5 dimensiones
6. **Explorar tendencias históricas** de ruido y calidad del aire desde 1998, con anotaciones de políticas públicas (Madrid Central, ZBE, APR...)
7. **Descargar los datos** en CSV: todos los distritos o uno individual, con todas las métricas
8. **Consultar la metodología completa**: fórmula, pesos, procedencia de datos, 17 fuentes documentadas
9. **Preguntar en lenguaje natural** a cualquier asistente de IA mediante el servidor MCP (Claude, ChatGPT, Cursor...)

La aplicación funciona en cualquier dispositivo sin registro, sin instalación y sin publicidad.

---

## Casos de uso reales

**La compradora de piso.** Sara tiene dos opciones de piso: Tetuán o Chamberí. Con MadridVerde compara en segundos: Chamberí 68/100, Tetuán 54/100. El comparador le muestra que Tetuán destaca en zonas verdes pero tiene peor calidad del aire. Descarga el CSV y lo comparte con su pareja. Tiempo total: 3 minutos. Datos del Ayuntamiento. Sin intermediarios.

**El periodista de datos.** Carlos escribe sobre el impacto de la Zona de Bajas Emisiones. En «Tendencias» selecciona el distrito Centro y el contaminante NO₂: la serie 2018–2026 con la anotación automática del inicio de la ZBE hace la mejora visible de inmediato. Fuente reproducible y verificable, lista para publicar.

**La técnica municipal.** Elena prepara un informe sobre la brecha medioambiental. Usa el comparador para cruzar los cinco distritos con peor puntuación frente a los cinco mejores: el radar chart revela que la brecha no es solo el aire, es la combinación de movilidad, ruido y zonas verdes. Descarga los datos y los cruza con sus indicadores socioeconómicos.

**El usuario de IA.** Javier le pregunta a Claude: «¿Qué barrio de Madrid tiene el mejor aire ahora mismo?». Claude consulta madridverde-mcp en tiempo real y responde con el ranking completo, el nivel de NO₂ exacto y la fuente oficial del Ayuntamiento. Sin clave de API. Sin configuración compleja.

---

## Arquitectura de datos: diecisiete fuentes integradas

MadridVerde reutiliza diecisiete datasets del Ayuntamiento de Madrid con tres estrategias de integración según las características técnicas de cada fuente.

**Consulta directa en tiempo real** (CORS habilitado):

| # | Dataset | Formato | Frecuencia |
|---|---------|---------|------------|
| 1 | Calidad del aire — tiempo real | JSON | 20 min |
| 2 | Calidad del aire — acumulado 30 días | JSON | 20 min |
| 3 | Estaciones de control de aire (24) | CSV | Estático |
| 4 | Tráfico — intensidad (~4.000 sensores) | XML | 5 min |
| 5 | Puntos de medición de tráfico | CSV | Estático |
| 6 | Parques y jardines del municipio | JSON-LD | Anual |
| 7 | Estaciones acústicas (37) | CSV | Estático |
| 8 | Contenedores de reciclaje | CSV | Anual |
| 9 | BiciMAD — disponibilidad en vivo (636 estaciones) | GBFS/JSON | 1 min |
| 10 | EMT — alertas de servicio en vivo | Protobuf | Tiempo real |

**Pre-descargados** (sin CORS en origen — geoportal.madrid.es):

| # | Dataset | Formato |
|---|---------|---------|
| 11 | Límites de distritos — geometría WGS84 | TopoJSON |
| 12 | Límites de barrios — 131 barrios | TopoJSON |

**Procesados en build-time** (datos.madrid.es / opendata.emtmadrid.es):

| # | Dataset | Formato original | JSON resultante |
|---|---------|-----------------|-----------------|
| 13 | Inventario de arbolado — 793.000 árboles | XLSX (52 MB) | ~20 KB |
| 14 | Superficie de arbolado por distrito | CSV | Directo |
| 15 | Contaminación acústica histórica (1998–2026) | CSV | ~50 KB |
| 16 | Indicadores sociodemográficos por distrito | CSV (30 MB) | ~30 KB |
| 17 | Red EMT — GTFS (4.910 paradas, 235 líneas) | GTFS (zip) | ~40 KB |

### El flujo completo

Los datos pesados se procesan en build-time (Node.js + SheetJS + PapaParse): el XLSX de arbolado de 52 MB se convierte en un JSON de 20 KB; el CSV de ruido histórico queda en 50 KB; los stops GTFS de la EMT en 482 KB. El cliente nunca descarga datos crudos. En tiempo real, el cliente hace fetch directo a las APIs del Ayuntamiento con caché corta: aire cada 20 minutos (sessionStorage), tráfico cada 5 minutos (lazy, solo en scorecards), BiciMAD cada 1 minuto (sin caché) y alertas EMT en tiempo real.

Esta arquitectura permite servir la aplicación desde Firebase Hosting como HTML estático, sin backend propio ni base de datos.

---

## Metodología: cómo se calcula el Índice Verde

### Fórmula

El Índice Verde de cada barrio se calcula como la media ponderada de cinco sub-índices normalizados:

```
ÍndiceVerde = 0.30 × SubAire + 0.25 × SubVerde + 0.20 × SubRuido
            + 0.15 × SubMovilidad + 0.10 × SubReciclaje
```

Cada sub-índice se normaliza en el rango [0, 100] respecto al peor y mejor valor observado en Madrid:

```
SubÍndice = 100 × (valor − mínimo_Madrid) / (máximo_Madrid − mínimo_Madrid)
```

Para indicadores negativos (NO₂, ruido, intensidad de tráfico) se invierte la escala: mayor contaminación → menor puntuación.

### Detalle de cada sub-índice

| Sub-índice | Variables principales | Referencia |
|------------|----------------------|------------|
| Aire (30%) | NO₂, PM2.5, PM10, O₃ en tiempo real + histórico | Límites anuales UE: NO₂ 40 µg/m³, PM2.5 25 µg/m³ |
| Verde (25%) | m²/habitante de zona verde + árboles/km² | Mínimo OMS: 9 m²/habitante |
| Ruido (20%) | LAeq diurno (Ld) y nocturno (Ln) en dB(A) | Límite OMS: 53 dB(A) en entornos residenciales |
| Movilidad (15%) | km carriles bici/km² + densidad BiciMAD + inversión de tráfico | Más tráfico → menor puntuación |
| Reciclaje (10%) | Contenedores per cápita por tipo de residuo | 44.251 contenedores georreferenciados |

### Transparencia

La fórmula completa, los pesos, las fuentes y los valores normalizados de todos los barrios están documentados en la sección «Metodología» de la aplicación y disponibles para descarga en CSV. No hay cajas negras.

---

## Arquitectura técnica

### Stack

| Componente | Tecnología | Motivo de la elección |
|------------|-----------|----------------------|
| Framework | Astro SSG (MPA, 5 páginas) | Cero JS por defecto; hidratación solo donde hay interactividad |
| JavaScript interactivo | Vanilla JS (sin framework) | < 100 KB JS total; sin dependencias de runtime |
| Mapas | Leaflet 1.9.4 + topojson-client | 43 KB gzip; tiles gratuitos CartoDB Positron |
| Gráficos | Chart.js 4.x (tree-shaken) | ~30 KB gzip; solo line + bar + radar |
| Hosting | Firebase Hosting | CDN global; HTTPS nativo |
| Build-time data | Node.js scripts (aggregate-data.mjs) | XLSX de 52 MB nunca llega al cliente |

**JavaScript total comprimido: ~86 KB** (presupuesto: < 100 KB)

### Páginas

| Ruta | Contenido |
|------|-----------|
| `/` | Mapa choropleth + pulse de tráfico + resumen ciudad + BiciMAD + EMT + sección IA |
| `/barrio/[slug]` | Scorecard completo del barrio: 5 sub-índices + datos en vivo + mini-mapa + gráficos |
| `/comparar` | Radar chart 2–4 distritos + tabla de métricas |
| `/historico` | Series temporales multianual con anotaciones de políticas públicas |
| `/metodologia` | Fórmula, pesos, procedencia de datos, 17 fuentes |

### Accesibilidad, rendimiento y bilingüismo

Lighthouse: Accessibility 91/100, Best Practices 100/100, SEO 100/100. Carga inicial < 2 segundos desde Firebase CDN. Cumple WCAG AA: skip-link, contraste 4.5:1, touch targets 44px, `aria-label` en todos los controles. La aplicación está completamente traducida al inglés (230+ claves, toggle instantáneo, persistencia en localStorage) para evaluación por jurados internacionales.

---

## Servidor MCP: «Pregunta a tu IA»

### El diferenciador de innovación

MadridVerde incluye **madridverde-mcp**: un servidor MCP (*Model Context Protocol*) de código abierto que expone los datos medioambientales de Madrid a cualquier asistente de inteligencia artificial.

MCP es el protocolo estándar abierto de Anthropic para conectar fuentes de datos con asistentes de IA. madridverde-mcp es, hasta donde se conoce, el primer servidor MCP que expone datos ambientales municipales de una ciudad española.

### Qué permite hacer

Cualquier ciudadano que use Claude, ChatGPT, Cursor o cualquier cliente compatible con MCP puede hacer preguntas como:

- «¿Cómo está la calidad del aire en Chamberí ahora mismo?»
- «¿Qué barrio de Madrid tiene el mejor Índice Verde?»
- «Compara el ruido de Salamanca con el de Vallecas»
- «¿Hay bicis disponibles cerca de la Puerta del Sol?»
- «¿Qué incidencias hay en las líneas de autobús del centro?»

El asistente obtiene los datos en tiempo real desde las APIs del Ayuntamiento y responde en lenguaje natural, citando siempre la fuente oficial.

### Las 10 herramientas disponibles

| Herramienta | Descripción |
|-------------|-------------|
| `get_air_quality` | Calidad del aire en tiempo real por estación o distrito |
| `get_noise_levels` | Niveles de ruido por estación (histórico mensual) |
| `get_green_index` | Índice Verde completo de un distrito (5 sub-índices) |
| `get_green_areas` | Zonas verdes, árboles, m²/habitante por distrito |
| `get_bicimad` | Disponibilidad de bicis en las 636 estaciones (en vivo) |
| `get_traffic` | Estado del tráfico en ~4.000 sensores (en vivo) |
| `get_emt_alerts` | Incidencias EMT en tiempo real (filtrable por línea o distrito) |
| `compare_districts` | Comparar 2–4 distritos en todos los indicadores |
| `find_district` | Geocoding de dirección a distrito (Nominatim + point-in-polygon) |
| `find_nearby` | Paradas EMT y estaciones BiciMAD más cercanas a una dirección |

### Sin barreras de acceso

```bash
# Instalación en Claude Desktop, una sola línea:
npx madridverde-mcp
```

No requiere clave de API. No requiere cuenta. No requiere conocimientos técnicos.
La documentación incluye instrucciones paso a paso para Claude Desktop, Claude Code, Cursor, Windsurf y ChatGPT.

### Datos exclusivamente del Ayuntamiento

Cada respuesta del servidor MCP incluye el campo `source` con la URL exacta del dataset o API del Ayuntamiento de Madrid utilizado, y el campo `last_updated` con la marca temporal de los datos. El servidor no tiene base de datos propia: actúa como proxy enriquecido sobre las APIs oficiales.

### Ejemplo real

Las siguientes capturas muestran dos consultas reales desde Claude Desktop con madridverde-mcp configurado:

\begin{figure}[H]
\centering
\includegraphics[width=0.485\textwidth]{/Users/michelmarques/Developer/PitchReel/output/cap-mcp-indice.png}
\hfill
\includegraphics[width=0.485\textwidth]{/Users/michelmarques/Developer/PitchReel/output/cap-mcp-bicimad.png}
\end{figure}

Ranking completo del Índice Verde por distrito (izquierda) y disponibilidad en tiempo real de BiciMAD cerca de la Puerta del Sol (derecha). Datos directamente de las APIs del Ayuntamiento, sin clave de API, en lenguaje natural.

### Especificaciones técnicas

- **Lenguaje**: TypeScript
- **Protocolo**: MCP stdio (compatible con todos los clientes MCP estándar)
- **Dependencias**: `@modelcontextprotocol/sdk`, `zod`, `node-fetch`
- **Publicado en npm**: `madridverde-mcp` v0.4.0
- **Licencia**: MIT
- **Repositorio**: github.com/iMark21/madridverde-mcp

---

## Capturas de pantalla

**1. Inicio — mapa choropleth** / **2. Scorecard de barrio (Retiro)**

El mapa muestra los 21 distritos coloreados por Índice Verde. El scorecard detalla los 5 sub-índices con datos en tiempo real y el mini-mapa con estaciones BiciMAD y disponibilidad de bicis en vivo.

\begin{figure}[H]
\centering
\includegraphics[width=0.485\textwidth]{/Users/michelmarques/Developer/PitchReel/output/cap-home.png}
\hfill
\includegraphics[width=0.485\textwidth]{/Users/michelmarques/Developer/PitchReel/output/cap-retiro-subindices.png}
\end{figure}

**3. Comparador de distritos** / **4. Tendencias históricas**

El radar chart enfrenta hasta 4 distritos en 5 dimensiones. Las tendencias muestran ruido y NO₂ desde el año 2000 con anotaciones de políticas públicas (Madrid Central 2018, ZBE 2022) y la línea OMS.

\begin{figure}[H]
\centering
\includegraphics[width=0.485\textwidth]{/Users/michelmarques/Developer/PitchReel/output/cap-comparador.png}
\hfill
\includegraphics[width=0.485\textwidth]{/Users/michelmarques/Developer/PitchReel/output/cap-tendencias.png}
\end{figure}


---

## Impacto, futuro y equipo

### Métricas del proyecto

| Indicador | Valor |
|-----------|-------|
| Datasets integrados | 17 |
| Barrios analizados con Índice Verde | 131 |
| Sensores de tráfico monitorizados | ~4.000 |
| Estaciones BiciMAD en tiempo real | 636 |
| Paradas EMT cubiertas | 4.910 |
| Líneas de autobús con datos de frecuencia | 235 |
| Herramientas MCP disponibles | 10 |
| Carga inicial de la aplicación | < 2 segundos |
| Accesibilidad (Lighthouse) | 91 / 100 (WCAG AA) |
| JavaScript total (gzip) | ~86 KB |

### La brecha medioambiental en números

El Índice Verde revela una diferencia de más de 20 puntos entre los distritos extremos de Madrid. Esta brecha no es uniforme: algunos distritos tienen aire limpio pero carecen de zonas verdes; otros tienen buen arbolado pero soportan niveles de ruido por encima de los límites OMS. MadridVerde es la primera herramienta que hace visible esta heterogeneidad con datos del propio Ayuntamiento.

### Impacto para el periodismo de datos

Varios de los gráficos de tendencias de MadridVerde —especialmente la correlación entre la implantación de Madrid Central y la mejora del NO₂ en el Centro— están listos para ser reproducidos directamente en medios de comunicación, con datos verificables y fuentes citadas.

### Reutilización territorial

La arquitectura de MadridVerde está diseñada para ser adaptable a cualquier ciudad con datos abiertos municipales. La misma base de código, cambiando datasets y parámetros de normalización, puede participar en BiscayApp (Bizkaia), Datos Abiertos CyL, Open Data Euskadi o el Desafío Aporta nacional — con más de 45.000 EUR en premios acumulados en convocatorias de 2026–2027.

### Evolución futura

- **Granularidad por barrio**: el Índice Verde hoy opera a nivel de distrito; los datos de arbolado y ruido permitirán bajarlo a nivel de barrio (131 unidades) sin cambios arquitectónicos
- **Alertas personalizadas**: notificación cuando la calidad del aire de tu distrito supera un umbral configurable
- **Modelos predictivos**: con la serie histórica acumulada, predecir picos de contaminación usando el patrón de tráfico del día anterior
- **Integración con wearables**: el servidor MCP ya permite que asistentes en dispositivos móviles respondan preguntas ambientales en tiempo real

### Agradecimientos

MadridVerde no habría sido posible sin el trabajo continuo del **Ayuntamiento de Madrid** y su compromiso con los datos abiertos: los equipos de datos.madrid.es, ciudadesabiertas.madrid.es, informo.madrid.es y openapi.emtmadrid.es que mantienen APIs públicas, documentadas y estables.

### Licencia

El código fuente de MadridVerde y madridverde-mcp se publica bajo licencia **MIT**. Cualquier ciudadano, periodista, investigador o administración pública puede usarlo, modificarlo y redistribuirlo libremente.

---

*MadridVerde. Datos abiertos al servicio de todos los ciudadanos de Madrid.*

*https://madrid-verde.web.app*
