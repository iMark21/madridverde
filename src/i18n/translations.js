/**
 * MadridVerde — Translation dictionary (ES/EN)
 *
 * Keys are organized by page/section.
 * Spanish is the default (rendered server-side in HTML).
 * English is swapped in client-side via data-i18n attributes.
 */

export const translations = {
  es: {
    // --- Export ---
    'export.button': 'Descargar datos (CSV)',
    'export.district_button': 'Descargar datos del distrito',

    // --- Cookies ---
    'cookies.text': 'Este sitio usa cookies analíticas para medir el uso.',
    'cookies.info': 'Más info',
    'cookies.accept': 'Aceptar',

    // --- Nav ---
    'nav.map': 'Mapa',
    'nav.bicimad': 'BiciMAD',
    'nav.compare': 'Comparar',
    'nav.trends': 'Tendencias',
    'nav.methodology': 'Metodología',
    'nav.skipToContent': 'Saltar al contenido',
    'nav.ariaLabel': 'Navegación principal',

    // --- Lang toggle ---
    'lang.label': 'ES | EN',

    // --- Footer ---
    'footer.copyright': 'MadridVerde — Datos abiertos del Ayuntamiento de Madrid',
    'footer.tagline': 'Porque respirar no debería ser cuestión de código postal',

    // --- Index: Hero ---
    'index.title': 'Índice Verde de Madrid',
    'index.subtitle': '17 datasets abiertos, un solo score por distrito',
    'index.searchPlaceholder': 'Busca tu dirección en Madrid...',
    'index.searchAriaLabel': 'Buscar dirección',
    'index.searchNoResults': 'Sin resultados',

    // --- Index: Stats ---
    'index.statAvgLabel': 'Media de Madrid',
    'index.statBestBadge': 'Mejor distrito',
    'index.statWorstBadge': 'Necesita atención',
    'index.statDatasetsLabel': 'Datasets abiertos',

    // --- Index: Ranking ---
    'index.rankingTitle': 'Ranking de distritos',

    // --- Index: BiciMAD ---
    'index.bicimadTitle': 'BiciMAD en tiempo real',
    'index.bicimadSubtitle': '635 estaciones de bicicleta pública — disponibilidad actualizada cada 14 segundos',
    'index.bicimadLoading': 'Cargando datos en vivo de BiciMAD...',
    'index.bicimadError': 'No se pudieron cargar los datos de BiciMAD',
    'index.bicimadActiveStations': 'estaciones activas',
    'index.bicimadBikesAvailable': 'bicis disponibles ahora',
    'index.bicimadDocksAvailable': 'docks libres',
    'index.bicimadAvailability': 'disponibilidad',
    'index.bicimadTopStations': 'Estaciones con más bicis disponibles',

    // --- Index: EMT ---
    'index.emtTitle': 'Autobuses EMT',
    'index.emtSubtitle': '4.910 paradas y 235 líneas — frecuencia media en hora punta y alertas en tiempo real',
    'index.emtParadas': 'paradas',
    'index.emtLineas': 'líneas',
    'index.emtDistritos': 'distritos cubiertos',
    'index.emtAlertsLoading': 'Cargando incidencias en tiempo real...',
    'index.emtAlertsTitle': 'Incidencias en tiempo real',
    'index.emtNoAlerts': 'Sin incidencias activas',
    'index.emtAlertsError': 'No se pudieron cargar las incidencias',
    'index.emtThDistrito': 'Distrito',
    'index.emtThParadas': 'Paradas',
    'index.emtThLineas': 'Líneas',
    'index.emtThFreq': 'Freq. media (min)',
    'index.emtSourceNote': 'Fuente: EMT Madrid — datos.emtmadrid.es (GTFS) + openapi.emtmadrid.es (alertas en tiempo real)',
    'nav.emt': 'EMT',

    // --- Scorecard: EMT ---
    'scorecard.emtTitle': 'Autobuses EMT',
    'scorecard.emtStopsLabel': 'paradas',
    'scorecard.emtLinesLabel': 'líneas',
    'scorecard.emtStopsPer1000': 'paradas/1.000 hab',
    'scorecard.emtSource': 'Fuente: EMT Madrid — datos.emtmadrid.es (GTFS)',
    'scorecard.busStops': 'paradas de autobus EMT',
    'scorecard.busLines': 'líneas EMT',
    'scorecard.emtLineLabel': 'Línea {line}',
    'scorecard.emtFreqLabel': 'Frecuencia en hora punta: cada {freq} minutos',
    'scorecard.emtAlertLoading': 'Comprobando incidencias...',
    'scorecard.emtLineAlerts': '{count} incidencia(s) activa(s)',
    'scorecard.emtNoLineAlerts': 'Sin incidencias activas en esta línea',

    // --- Index: MCP ---
    'index.mcpTitle': 'Pregunta a tu IA sobre Madrid',
    'index.mcpSubtitle': 'Integra los datos de MadridVerde en Claude, ChatGPT o Cursor',
    'index.mcpQ1': '¿Cómo está la calidad del aire en Chamberí ahora mismo?',
    'index.mcpA1': 'Chamberí tiene un nivel de NO2 de 28 ug/m3 (por debajo del límite UE de 40). La estación más cercana es Cuatro Caminos. Índice Verde del distrito: 67/100 (Aceptable).',
    'index.mcpQ2': '¿Hay incidencias en la línea 27?',
    'index.mcpA2': 'Sí, hay 2 alertas activas en la línea 27: una concentración en paseo del Prado y un evento en el Estadio Santiago Bernabéu que afectan al itinerario.',
    'index.mcpHowTitle': 'Cómo funciona',
    'index.mcpHowDesc': 'MadridVerde MCP es un servidor que permite a cualquier asistente de inteligencia artificial consultar datos medioambientales de Madrid en lenguaje natural. 8 herramientas, datos en tiempo real, sin API key.',
    'index.mcpCta': 'Ver en GitHub',
    'nav.mcp': 'IA',

    // --- Index: Compare ---
    'index.compareTitle': 'Comparar distritos',
    'index.compareSubtitle': 'Selecciona 2 a 4 distritos para comparar sus sub-índices',

    // --- Index: Trends ---
    'index.trendsTitle': 'Tendencias históricas',
    'index.trendsSubtitle': 'Cómo ha cambiado la calidad ambiental de Madrid. Selecciona estaciones para comparar',

    // --- Index: Methodology (inline) ---
    'index.methodologyTitle': 'Metodología',
    'index.methodologySubtitle': 'Transparencia total: cómo se calcula el Índice Verde',
    'index.formulaTitle': 'Índice Verde (0-100)',
    'index.formula': 'IV = Aire x 0.30 + Verde x 0.25 + Ruido x 0.20 + Movilidad x 0.15 + Reciclaje x 0.10',

    // --- Index: Methodology sub-indices ---
    'index.subAire': 'Aire',
    'index.subAireDesc': 'NO2, PM2.5, PM10, O3 en tiempo real. 24 estaciones, 4 contaminantes. Límites OMS.',
    'index.subVerde': 'Verde',
    'index.subVerdeDesc': '793.000 árboles censados + m2 zonas verdes por habitante. OMS recomienda mínimo 9 m2/hab.',
    'index.subRuido': 'Ruido',
    'index.subRuidoDesc': '37 estaciones acústicas SIVCA. Series desde 1998. OMS recomienda máximo 55 dB.',
    'index.subMovilidad': 'Movilidad',
    'index.subMovilidadDesc': '~4.000 sensores de tráfico en tiempo real. Nivel de servicio: fluido, denso, congestionado.',
    'index.subReciclaje': 'Reciclaje',
    'index.subReciclajeDesc': '44.251 contenedores por tipo (papel, vidrio, orgánica, envases) per cápita.',

    // --- Index: Datasets ---
    'index.datasetsTitle': '17 conjuntos de datos del Portal de Datos Abiertos',
    'index.dsRealtime': 'Tiempo real',
    'index.dsStations': 'Estaciones y sensores',
    'index.dsEnvironment': 'Medio ambiente',
    'index.dsHistorical': 'Histórico y sociodemográfico',
    'index.dsMobility': 'Movilidad sostenible',
    'index.dsGeographic': 'Límites geográficos',

    // Dataset links
    'index.dsAirHourly': 'Calidad del aire — datos horarios',
    'index.dsTrafficRealtime': 'Tráfico — intensidad en tiempo real',
    'index.dsAirStations': 'Estaciones de control de calidad del aire',
    'index.dsNoiseStations': 'Estaciones acústicas — contaminación',
    'index.dsTrafficSensors': 'Puntos de medida de tráfico',
    'index.dsTreesParks': 'Arbolado en parques — detalle de especies',
    'index.dsTreesGreenAreas': 'Arbolado — superficie de zonas verdes',
    'index.dsParks': 'Parques y jardines municipales',
    'index.dsRecyclingContainers': 'Contenedores de recogida de residuos',
    'index.dsAirDaily': 'Calidad del aire — datos diarios desde 2001',
    'index.dsNoiseDaily': 'Contaminación acústica — datos diarios',
    'index.dsDistrictIndicators': 'Indicadores de distritos y barrios',
    'index.dsBicimadLive': 'BiciMAD — disponibilidad en tiempo real (GBFS)',
    'index.dsBicimadStations': 'BiciMAD — estaciones',
    'index.dsBikeLanes': 'Infraestructura ciclista — carriles bici',
    'index.dsDistrictBoundaries': 'Límites administrativos — distritos',
    'index.dsNeighborhoodBoundaries': 'Límites administrativos — barrios',

    // --- Index: Tiers ---
    'tier.excellent': 'Excelente',
    'tier.good': 'Bueno',
    'tier.acceptable': 'Aceptable',
    'tier.improvable': 'Mejorable',
    'tier.critical': 'Crítico',

    // --- Scorecard (barrio/[slug]) ---
    'scorecard.backLink': 'Volver al mapa',
    'scorecard.inhabitants': 'habitantes',
    'scorecard.greenIndex': 'Índice Verde',
    'scorecard.shareButton': 'Compartir resultado',
    'scorecard.shareCopied': 'Copiado al portapapeles',
    'scorecard.narrativeTitle': 'La historia de',
    'scorecard.subIndicesTitle': 'Sub-índices',
    'scorecard.dataTitle': 'Datos del distrito',
    'scorecard.treesCounted': 'árboles censados',
    'scorecard.greenM2PerHab': 'm2 de zonas verdes por habitante',
    'scorecard.containersPerHab': 'contenedores por 1.000 hab',
    'scorecard.populationLabel': 'habitantes (padron 2025)',
    'scorecard.topSpecies': 'Especies más frecuentes',
    'scorecard.containersByType': 'Contenedores por tipo',
    'scorecard.bicimadTitle': 'BiciMAD en',
    'scorecard.bicimadLoading': 'Cargando estaciones de BiciMAD...',
    'scorecard.bicimadNone': 'No hay estaciones de BiciMAD en este distrito',
    'scorecard.bicimadNearby': 'estaciones cercanas',
    'scorecard.bicimadBikes': 'bicis disponibles',
    'scorecard.bicimadDocks': 'docks libres',
    'scorecard.bicimadLiveNote': 'Datos en vivo — GBFS actualizado cada 14 segundos',
    'scorecard.mapTitle': 'Mapa de',

    // --- Comparador ---
    'comparator.title': 'Comparar distritos',
    'comparator.subtitle': 'Selecciona 2 a 4 distritos para comparar sus sub-índices',
    'comparator.emptyState': 'Selecciona al menos 2 distritos para comparar',
    'comparator.note': 'Aire y Movilidad se actualizan en tiempo real en el mapa y en la ficha de cada distrito.',
    'comparator.tableHeader': 'Sub-índice',
    'comparator.tableTotal': 'Índice Verde',
    'comparator.radarAriaLabel': 'Radar chart comparando sub-índices',

    // --- Tendencias ---
    'trends.title': 'Tendencias históricas',
    'trends.subtitle': 'Cómo ha cambiado la calidad ambiental de Madrid en las últimas dos décadas',
    'trends.noiseTitle': 'Ruido ambiental (LAeq dB)',
    'trends.noiseDesc': 'Selecciona estaciones para comparar su evolución. OMS recomienda no superar 55 dB.',
    'trends.noiseDataNote': 'Datos SIVCA, ultima actualizacion: febrero 2026.',
    'trends.airTitle': 'Calidad del aire (NO2 ug/m3)',
    'trends.airDesc': 'Evolución mensual del NO2 en estaciones de Madrid. Límite OMS: 40 ug/m3.',
    'trends.airDataNote': 'Datos horarios agregados, hasta febrero 2026.',
    'trends.noiseChartAriaLabel': 'Gráfico de evolución del ruido ambiental en Madrid',
    'trends.airChartAriaLabel': 'Gráfico de evolución del NO2 en Madrid',
    'trends.whoNoiseLimit': 'Límite OMS (55 dB)',
    'trends.whoAirLimit': 'Límite OMS (40 ug/m3)',

    // --- Tendencias: Policy annotations ---
    'trends.policyNoiseLaw': 'Ley del Ruido',
    'trends.policyAPR': 'APR Centro',
    'trends.policyMadridCentral': 'Madrid Central',
    'trends.policyCovid': 'COVID-19',
    'trends.policyZBE': 'ZBE Madrid',

    // --- Map legend ---
    'map.legendIndiceVerde': 'Índice Verde',
    'map.legendBicimad': 'BiciMAD',
    'map.legendBicimadStations': 'Estaciones BiciMAD',
    'map.legendHighAvail': 'Alta disponibilidad',
    'map.legendMedAvail': 'Media disponibilidad',
    'map.legendLowAvail': 'Baja disponibilidad',
    'map.legendBikeLanes': 'Carriles ciclistas',
    'map.legendAnilloVerde': 'Anillo Verde',
    'map.legendExclusive': 'Via Exclusiva',
    'map.legendPreferred': 'Via Preferente',
    'map.legendShared': 'Uso Compartido',
    'map.legendLiveFooter': 'Datos en vivo · actualizado cada 14s',
    'map.tapToInteract': 'Toca para interactuar con el mapa',
    'map.ariaLabel': 'Mapa interactivo de distritos de Madrid coloreados por puntuacion ambiental',
    'map.tooltipGreenIndex': 'Índice Verde',
    'map.tooltipAvailability': 'Disponibilidad',

    // --- Metodologia page ---
    'methodology.title': 'Metodología',
    'methodology.subtitle': 'Transparencia total: cómo se calcula el Índice Verde',
    'methodology.formulaTitle': 'Índice Verde (0-100)',
    'methodology.formula': 'IV = Aire x 0.30 + Verde x 0.25 + Ruido x 0.20 + Movilidad x 0.15 + Reciclaje x 0.10',
    'methodology.formulaNote': 'Cada sub-índice está normalizado a escala 0-100. Mayor puntuación = mejor calidad ambiental.',

    'methodology.aireTitle': 'Aire',
    'methodology.aireMethod': 'Media inversa de ratios contaminante/limite para NO2, PM2.5, PM10 y O3. Datos en tiempo real cada 20 minutos.',
    'methodology.aireBadge1': 'API ciudadesabiertas',
    'methodology.aireBadge2': '24 estaciones',
    'methodology.aireBadge3': '4 contaminantes',
    'methodology.aireLimits': 'Límites OMS: NO2 40 ug/m3, PM2.5 25 ug/m3, PM10 40 ug/m3, O3 120 ug/m3',

    'methodology.verdeTitle': 'Verde',
    'methodology.verdeMethod': 'Combinación de m2 de zonas verdes por habitante (70%) y árboles por 1.000 habitantes (30%). OMS recomienda mínimo 9 m2/hab.',
    'methodology.verdeBadge1': 'Arbolado XLSX (793K árboles)',
    'methodology.verdeBadge2': 'Zonas verdes por distrito',
    'methodology.verdeBadge3': 'Padron 2025',

    'methodology.ruidoTitle': 'Ruido',
    'methodology.ruidoMethod': 'Escala inversa del nivel LAeq medio de las estaciones acústicas SIVCA del distrito. OMS recomienda no superar 55 dB en zonas residenciales.',
    'methodology.ruidoBadge1': '37 estaciones SIVCA',
    'methodology.ruidoBadge2': 'Serie histórica 1998-2025',
    'methodology.ruidoBadge3': 'LAeq, Ld, Ln',

    'methodology.movilidadTitle': 'Movilidad',
    'methodology.movilidadMethod': 'Estimación neutra (50/100) pendiente de integrar datos de carriles bici, BiciMAD e intensidad de tráfico en tiempo real.',
    'methodology.movilidadBadge1': 'Tráfico XML (pendiente)',
    'methodology.movilidadBadge2': 'BiciMAD (pendiente)',

    'methodology.reciclajeTitle': 'Reciclaje',
    'methodology.reciclajeMethod': 'Contenedores de reciclaje por cada 1.000 habitantes del distrito, normalizado sobre el rango observado (4-25/1.000 hab).',
    'methodology.reciclajeBadge1': '44.251 contenedores',
    'methodology.reciclajeBadge2': '4 tipos (papel, vidrio, orgánica, envases)',

    'methodology.dataFlowTitle': 'Flujo de datos',
    'methodology.dataFlow14Sources': '14 fuentes de datos',
    'methodology.dataFlowProcessing': 'Procesamiento',
    'methodology.dataFlowResult': 'Resultado',

    // Data flow source items
    'methodology.dfAirRealtime': 'Calidad aire real-time (JSON)',
    'methodology.dfAir30Days': 'Calidad aire 30 dias (JSON)',
    'methodology.dfAirStationsCSV': 'Estaciones calidad aire (CSV)',
    'methodology.dfTrafficRealtime': 'Tráfico real-time (XML)',
    'methodology.dfTrafficSensors': 'Puntos medida tráfico (CSV)',
    'methodology.dfParksJSONLD': 'Parques y jardines (JSON-LD)',
    'methodology.dfNoiseStationsCSV': 'Estaciones acústicas (CSV)',
    'methodology.dfRecyclingCSV': 'Contenedores reciclaje (CSV)',
    'methodology.dfDistrictsTopo': 'Límites distritos (TopoJSON)',
    'methodology.dfNeighborhoodsTopo': 'Límites barrios (TopoJSON)',
    'methodology.dfTreesXLSX': 'Arbolado 793K árboles (XLSX)',
    'methodology.dfTreesAreaCSV': 'Arbolado superficie (CSV)',
    'methodology.dfNoiseHistorical': 'Ruido histórico 1998+ (CSV)',
    'methodology.dfDemographicsCSV': 'Indicadores sociodemograficos (CSV)',

    // Data flow processing items
    'methodology.dfBuildTime': 'Build-time:',
    'methodology.dfBuildTimeDesc': 'XLSX/CSV pesados → JSON pequenos',
    'methodology.dfRuntime': 'Runtime:',
    'methodology.dfRuntimeDesc': 'APIs real-time → cache 20 min',
    'methodology.dfNormalization': 'Normalización:',
    'methodology.dfNormalizationDesc': 'Escala lineal 0-100',
    'methodology.dfWeighting': 'Ponderación:',
    'methodology.dfWeightingDesc': '5 sub-índices x pesos',
    'methodology.dfTiers': 'Tiers:',
    'methodology.dfTiersDesc': 'Excelente → Crítico',

    // Data flow result items
    'methodology.dfResultIndex': 'Índice Verde por distrito (0-100)',
    'methodology.dfResultMap': 'Mapa choropleth interactivo',
    'methodology.dfResultScorecard': 'Scorecard con 5 sub-índices',
    'methodology.dfResultRadar': 'Comparador radar chart',
    'methodology.dfResultTrends': 'Tendencias históricas',
    'methodology.dfResultPhrases': 'Frases contextuales',

    'methodology.classificationTitle': 'Clasificación',
    'methodology.tierExcellentDesc': 'Pulmones de la ciudad',
    'methodology.tierGoodDesc': 'Respira bien',
    'methodology.tierAcceptableDesc': 'Margen de mejora',
    'methodology.tierImprovableDesc': 'Necesita atención',
    'methodology.tierCriticalDesc': 'Zona crítica',

    'methodology.sourcesTitle': 'Fuentes',
    'methodology.sourcesNote': 'Todos los datos proceden de',
    'methodology.sourcesAnd': 'y',
    'methodology.sourcesEnd': ', portales oficiales del Ayuntamiento de Madrid. Los datos se actualizan automáticamente según la frecuencia de cada fuente.',

    // --- Comparar page (standalone) ---
    'comparePage.title': 'Comparar distritos',
    'comparePage.subtitle': 'Selecciona 2 a 4 distritos para comparar sus sub-índices',
    'comparePage.emptyState': 'Selecciona al menos 2 distritos para comparar',

    // --- Historico page (standalone) ---
    'historico.title': 'Tendencias históricas',
    'historico.subtitle': 'Cómo ha cambiado la calidad ambiental de Madrid en las últimas dos décadas',
    'historico.noiseTitle': 'Ruido ambiental (LAeq dB)',
    'historico.noiseDesc': 'Nivel medio de ruido equivalente en estaciones representativas de Madrid. La OMS recomienda no superar los 55 dB en zonas residenciales.',
    'historico.airTitle': 'Calidad del aire (NO2 ug/m3)',
    'historico.airDesc': 'Evolución mensual del dióxido de nitrógeno en estaciones representativas. El límite anual de la OMS es 40 ug/m3. El NO2 es el contaminante más relevante en Madrid por el tráfico.',

    // --- Green index (computed strings) ---
    'gi.contextBest': 'entre los mejores de Madrid',
    'gi.contextBetterThan': 'mejor que el {pct}% de los distritos',
    'gi.contextAverage': 'en la media de Madrid',
    'gi.contextBelowAvg': 'por debajo de la media',
    'gi.contextUrgent': 'necesita atención urgente',

    // Sub-index detail strings
    'gi.verdeBelow': 'Solo {m2} m2/hab de zonas verdes — la OMS recomienda mínimo 9 (censo municipal 2024)',
    'gi.verdeMeets': '{m2} m2/hab — cumple el mínimo de la OMS (censo municipal 2024)',
    'gi.verdeAbove': '{m2} m2/hab de zonas verdes — bien por encima del minimo de la OMS (censo 2024)',
    'gi.verdeNoData': 'Sin datos',

    'gi.ruidoHigh': '{db} dB — supera la recomendacion OMS de 55 dB (media SIVCA hasta feb. 2026)',
    'gi.ruidoAbove': '{db} dB — por encima de la recomendacion OMS (media SIVCA hasta feb. 2026)',
    'gi.ruidoOk': '{db} dB — dentro de los límites OMS (media SIVCA hasta feb. 2026)',
    'gi.ruidoNoData': 'Sin datos de estacion',

    'gi.reciclajeLow': 'Solo {n} contenedores/1.000 hab — infraestructura limitada (censo 2024)',
    'gi.reciclajeMid': '{n} contenedores/1.000 hab — cobertura aceptable (censo 2024)',
    'gi.reciclajeGood': '{n} contenedores/1.000 hab — buena cobertura de reciclaje (censo 2024)',
    'gi.reciclajeNoData': 'Sin datos',

    'gi.movilidadFluido': 'Tráfico fluido en la mayoría de sensores',
    'gi.movilidadDenso': 'Tráfico denso en algunas vías principales',
    'gi.movilidadCongestion': 'Alta congestion — afecta la calidad ambiental',
    'gi.movilidadLoading': 'Cargando datos de tráfico en tiempo real...',

    'gi.aireLive': 'NO2, PM2.5, PM10, O3 en tiempo real — actualizado hace minutos',
    'gi.aireLoading': 'Cargando datos en tiempo real...',

    // Scorecard hydration strings
    'gi.aireLiveDetail': 'Datos en vivo: {contaminants}. Actualizado hace minutos',
    'gi.trafficLiveDetail': '{fluido} sensores fluidos, {denso} densos, {congestionado} congestionados — en vivo',

    // District map
    'districtMap.ariaLabel': 'Mapa del distrito {name} con estaciones BiciMAD y carriles bici',
  },

  en: {
    // --- Export ---
    'export.button': 'Download data (CSV)',
    'export.district_button': 'Download district data',

    // --- Cookies ---
    'cookies.text': 'This site uses analytics cookies to measure usage.',
    'cookies.info': 'More info',
    'cookies.accept': 'Accept',

    // --- Nav ---
    'nav.map': 'Map',
    'nav.bicimad': 'BiciMAD',
    'nav.compare': 'Compare',
    'nav.trends': 'Trends',
    'nav.methodology': 'Methodology',
    'nav.skipToContent': 'Skip to content',
    'nav.ariaLabel': 'Main navigation',

    // --- Lang toggle ---
    'lang.label': 'ES | EN',

    // --- Footer ---
    'footer.copyright': 'MadridVerde — Open data from the Madrid City Council',
    'footer.tagline': 'Because breathing should not depend on your postal code',

    // --- Index: Hero ---
    'index.title': 'Green Index of Madrid',
    'index.subtitle': '17 open datasets, one score per district',
    'index.searchPlaceholder': 'Search your address in Madrid...',
    'index.searchAriaLabel': 'Search address',
    'index.searchNoResults': 'No results',

    // --- Index: Stats ---
    'index.statAvgLabel': 'Madrid average',
    'index.statBestBadge': 'Best district',
    'index.statWorstBadge': 'Needs attention',
    'index.statDatasetsLabel': 'Open datasets',

    // --- Index: Ranking ---
    'index.rankingTitle': 'District ranking',

    // --- Index: BiciMAD ---
    'index.bicimadTitle': 'BiciMAD live',
    'index.bicimadSubtitle': '635 public bike stations — availability updated every 14 seconds',
    'index.bicimadLoading': 'Loading live BiciMAD data...',
    'index.bicimadError': 'Could not load BiciMAD data',
    'index.bicimadActiveStations': 'active stations',
    'index.bicimadBikesAvailable': 'bikes available now',
    'index.bicimadDocksAvailable': 'free docks',
    'index.bicimadAvailability': 'availability',
    'index.bicimadTopStations': 'Stations with most bikes available',

    // --- Index: EMT ---
    'index.emtTitle': 'EMT Buses',
    'index.emtSubtitle': '4,910 stops and 235 lines — average peak-hour frequency and live alerts',
    'index.emtParadas': 'stops',
    'index.emtLineas': 'lines',
    'index.emtDistritos': 'districts covered',
    'index.emtAlertsLoading': 'Loading live service alerts...',
    'index.emtAlertsTitle': 'Live service alerts',
    'index.emtNoAlerts': 'No active service alerts',
    'index.emtAlertsError': 'Could not load service alerts',
    'index.emtThDistrito': 'District',
    'index.emtThParadas': 'Stops',
    'index.emtThLineas': 'Lines',
    'index.emtThFreq': 'Avg. freq. (min)',
    'index.emtSourceNote': 'Source: EMT Madrid — datos.emtmadrid.es (GTFS) + openapi.emtmadrid.es (live alerts)',
    'nav.emt': 'EMT',

    // --- Scorecard: EMT ---
    'scorecard.emtTitle': 'EMT Buses',
    'scorecard.emtStopsLabel': 'stops',
    'scorecard.emtLinesLabel': 'lines',
    'scorecard.emtStopsPer1000': 'stops/1,000 inhab',
    'scorecard.emtSource': 'Source: EMT Madrid — datos.emtmadrid.es (GTFS)',
    'scorecard.busStops': 'EMT bus stops',
    'scorecard.busLines': 'EMT lines',
    'scorecard.emtLineLabel': 'Line {line}',
    'scorecard.emtFreqLabel': 'Peak-hour frequency: every {freq} minutes',
    'scorecard.emtAlertLoading': 'Checking service alerts...',
    'scorecard.emtLineAlerts': '{count} active alert(s)',
    'scorecard.emtNoLineAlerts': 'No active alerts on this line',

    // --- Index: MCP ---
    'index.mcpTitle': 'Ask your AI about Madrid',
    'index.mcpSubtitle': 'Integrate MadridVerde data into Claude, ChatGPT or Cursor',
    'index.mcpQ1': 'How is the air quality in Chamberi right now?',
    'index.mcpA1': 'Chamberi has a NO2 level of 28 ug/m3 (below the EU limit of 40). The nearest station is Cuatro Caminos. District Green Index: 67/100 (Acceptable).',
    'index.mcpQ2': 'Any service alerts on bus line 27?',
    'index.mcpA2': 'Yes, there are 2 active alerts on line 27: a demonstration on Paseo del Prado and an event at Santiago Bernabeu Stadium affecting the route.',
    'index.mcpHowTitle': 'How it works',
    'index.mcpHowDesc': 'MadridVerde MCP is a server that lets any AI assistant query Madrid environmental data in natural language. 8 tools, real-time data, no API key required.',
    'index.mcpCta': 'View on GitHub',
    'nav.mcp': 'AI',

    // --- Index: Compare ---
    'index.compareTitle': 'Compare districts',
    'index.compareSubtitle': 'Select 2 to 4 districts to compare their sub-indices',

    // --- Index: Trends ---
    'index.trendsTitle': 'Historical trends',
    'index.trendsSubtitle': 'How Madrid\'s environmental quality has changed. Select stations to compare',

    // --- Index: Methodology (inline) ---
    'index.methodologyTitle': 'Methodology',
    'index.methodologySubtitle': 'Full transparency: how the Green Index is calculated',
    'index.formulaTitle': 'Green Index (0-100)',
    'index.formula': 'GI = Air x 0.30 + Green x 0.25 + Noise x 0.20 + Mobility x 0.15 + Recycling x 0.10',

    // --- Index: Methodology sub-indices ---
    'index.subAire': 'Air',
    'index.subAireDesc': 'NO2, PM2.5, PM10, O3 in real time. 24 stations, 4 pollutants. WHO limits.',
    'index.subVerde': 'Green',
    'index.subVerdeDesc': '793,000 catalogued trees + green area per inhabitant. WHO recommends at least 9 m2/person.',
    'index.subRuido': 'Noise',
    'index.subRuidoDesc': '37 SIVCA acoustic stations. Data since 1998. WHO recommends a maximum of 55 dB.',
    'index.subMovilidad': 'Mobility',
    'index.subMovilidadDesc': '~4,000 real-time traffic sensors. Service level: free flow, dense, congested.',
    'index.subReciclaje': 'Recycling',
    'index.subReciclajeDesc': '44,251 containers by type (paper, glass, organic, packaging) per capita.',

    // --- Index: Datasets ---
    'index.datasetsTitle': '17 datasets from the Open Data Portal',
    'index.dsRealtime': 'Real time',
    'index.dsStations': 'Stations and sensors',
    'index.dsEnvironment': 'Environment',
    'index.dsHistorical': 'Historical and sociodemographic',
    'index.dsMobility': 'Sustainable mobility',
    'index.dsGeographic': 'Geographic boundaries',

    // Dataset links
    'index.dsAirHourly': 'Air quality — hourly data',
    'index.dsTrafficRealtime': 'Traffic — real-time intensity',
    'index.dsAirStations': 'Air quality control stations',
    'index.dsNoiseStations': 'Acoustic stations — pollution',
    'index.dsTrafficSensors': 'Traffic measurement points',
    'index.dsTreesParks': 'Trees in parks — species detail',
    'index.dsTreesGreenAreas': 'Trees — green area surface',
    'index.dsParks': 'Municipal parks and gardens',
    'index.dsRecyclingContainers': 'Waste collection containers',
    'index.dsAirDaily': 'Air quality — daily data since 2001',
    'index.dsNoiseDaily': 'Acoustic pollution — daily data',
    'index.dsDistrictIndicators': 'District and neighborhood indicators',
    'index.dsBicimadLive': 'BiciMAD — real-time availability (GBFS)',
    'index.dsBicimadStations': 'BiciMAD — stations',
    'index.dsBikeLanes': 'Cycling infrastructure — bike lanes',
    'index.dsDistrictBoundaries': 'Administrative boundaries — districts',
    'index.dsNeighborhoodBoundaries': 'Administrative boundaries — neighborhoods',

    // --- Index: Tiers ---
    'tier.excellent': 'Excellent',
    'tier.good': 'Good',
    'tier.acceptable': 'Acceptable',
    'tier.improvable': 'Needs improvement',
    'tier.critical': 'Critical',

    // --- Scorecard (barrio/[slug]) ---
    'scorecard.backLink': 'Back to map',
    'scorecard.inhabitants': 'inhabitants',
    'scorecard.greenIndex': 'Green Index',
    'scorecard.shareButton': 'Share result',
    'scorecard.shareCopied': 'Copied to clipboard',
    'scorecard.narrativeTitle': 'The story of',
    'scorecard.subIndicesTitle': 'Sub-indices',
    'scorecard.dataTitle': 'District data',
    'scorecard.treesCounted': 'catalogued trees',
    'scorecard.greenM2PerHab': 'm2 green area per inhabitant',
    'scorecard.containersPerHab': 'containers per 1,000 inh.',
    'scorecard.populationLabel': 'inhabitants (census 2025)',
    'scorecard.topSpecies': 'Most common species',
    'scorecard.containersByType': 'Containers by type',
    'scorecard.bicimadTitle': 'BiciMAD in',
    'scorecard.bicimadLoading': 'Loading BiciMAD stations...',
    'scorecard.bicimadNone': 'No BiciMAD stations in this district',
    'scorecard.bicimadNearby': 'nearby stations',
    'scorecard.bicimadBikes': 'bikes available',
    'scorecard.bicimadDocks': 'free docks',
    'scorecard.bicimadLiveNote': 'Live data — GBFS updated every 14 seconds',
    'scorecard.mapTitle': 'Map of',

    // --- Comparador ---
    'comparator.title': 'Compare districts',
    'comparator.subtitle': 'Select 2 to 4 districts to compare their sub-indices',
    'comparator.emptyState': 'Select at least 2 districts to compare',
    'comparator.note': 'Air and Mobility are updated in real time on the map and on each district page.',
    'comparator.tableHeader': 'Sub-index',
    'comparator.tableTotal': 'Green Index',
    'comparator.radarAriaLabel': 'Radar chart comparing sub-indices',

    // --- Tendencias ---
    'trends.title': 'Historical trends',
    'trends.subtitle': 'How Madrid\'s environmental quality has changed over the last two decades',
    'trends.noiseTitle': 'Environmental noise (LAeq dB)',
    'trends.noiseDesc': 'Select stations to compare their evolution. WHO recommends staying below 55 dB.',
    'trends.noiseDataNote': 'SIVCA data, last update: February 2026.',
    'trends.airTitle': 'Air quality (NO2 ug/m3)',
    'trends.airDesc': 'Monthly NO2 trends across Madrid stations. WHO limit: 40 ug/m3.',
    'trends.airDataNote': 'Aggregated hourly data, through February 2026.',
    'trends.noiseChartAriaLabel': 'Chart showing the evolution of environmental noise in Madrid',
    'trends.airChartAriaLabel': 'Chart showing the evolution of NO2 in Madrid',
    'trends.whoNoiseLimit': 'WHO limit (55 dB)',
    'trends.whoAirLimit': 'WHO limit (40 ug/m3)',

    // --- Tendencias: Policy annotations ---
    'trends.policyNoiseLaw': 'Noise Law',
    'trends.policyAPR': 'APR Centro',
    'trends.policyMadridCentral': 'Madrid Central',
    'trends.policyCovid': 'COVID-19',
    'trends.policyZBE': 'ZBE Madrid',

    // --- Map legend ---
    'map.legendIndiceVerde': 'Green Index',
    'map.legendBicimad': 'BiciMAD',
    'map.legendBicimadStations': 'BiciMAD stations',
    'map.legendHighAvail': 'High availability',
    'map.legendMedAvail': 'Medium availability',
    'map.legendLowAvail': 'Low availability',
    'map.legendBikeLanes': 'Bike lanes',
    'map.legendAnilloVerde': 'Green Ring',
    'map.legendExclusive': 'Exclusive Lane',
    'map.legendPreferred': 'Priority Lane',
    'map.legendShared': 'Shared Use',
    'map.legendLiveFooter': 'Live data · updated every 14s',
    'map.tapToInteract': 'Tap to interact with the map',
    'map.ariaLabel': 'Interactive map of Madrid districts colored by environmental score',
    'map.tooltipGreenIndex': 'Green Index',
    'map.tooltipAvailability': 'Availability',

    // --- Metodologia page ---
    'methodology.title': 'Methodology',
    'methodology.subtitle': 'Full transparency: how the Green Index is calculated',
    'methodology.formulaTitle': 'Green Index (0-100)',
    'methodology.formula': 'GI = Air x 0.30 + Green x 0.25 + Noise x 0.20 + Mobility x 0.15 + Recycling x 0.10',
    'methodology.formulaNote': 'Each sub-index is normalized to a 0-100 scale. Higher score = better environmental quality.',

    'methodology.aireTitle': 'Air',
    'methodology.aireMethod': 'Inverse average of pollutant/limit ratios for NO2, PM2.5, PM10 and O3. Real-time data every 20 minutes.',
    'methodology.aireBadge1': 'ciudadesabiertas API',
    'methodology.aireBadge2': '24 stations',
    'methodology.aireBadge3': '4 pollutants',
    'methodology.aireLimits': 'WHO limits: NO2 40 ug/m3, PM2.5 25 ug/m3, PM10 40 ug/m3, O3 120 ug/m3',

    'methodology.verdeTitle': 'Green',
    'methodology.verdeMethod': 'Combination of green area m2 per inhabitant (70%) and trees per 1,000 inhabitants (30%). WHO recommends at least 9 m2/person.',
    'methodology.verdeBadge1': 'Tree data XLSX (793K trees)',
    'methodology.verdeBadge2': 'Green areas by district',
    'methodology.verdeBadge3': 'Census 2025',

    'methodology.ruidoTitle': 'Noise',
    'methodology.ruidoMethod': 'Inverse scale of the average LAeq level from SIVCA acoustic stations in the district. WHO recommends not exceeding 55 dB in residential areas.',
    'methodology.ruidoBadge1': '37 SIVCA stations',
    'methodology.ruidoBadge2': 'Historical data 1998-2025',
    'methodology.ruidoBadge3': 'LAeq, Ld, Ln',

    'methodology.movilidadTitle': 'Mobility',
    'methodology.movilidadMethod': 'Neutral estimate (50/100) pending integration of bike lane, BiciMAD and real-time traffic intensity data.',
    'methodology.movilidadBadge1': 'Traffic XML (pending)',
    'methodology.movilidadBadge2': 'BiciMAD (pending)',

    'methodology.reciclajeTitle': 'Recycling',
    'methodology.reciclajeMethod': 'Recycling containers per 1,000 inhabitants in the district, normalized over the observed range (4-25/1,000 inh.).',
    'methodology.reciclajeBadge1': '44,251 containers',
    'methodology.reciclajeBadge2': '4 types (paper, glass, organic, packaging)',

    'methodology.dataFlowTitle': 'Data pipeline',
    'methodology.dataFlow14Sources': '14 data sources',
    'methodology.dataFlowProcessing': 'Processing',
    'methodology.dataFlowResult': 'Output',

    // Data flow source items
    'methodology.dfAirRealtime': 'Air quality real-time (JSON)',
    'methodology.dfAir30Days': 'Air quality 30 days (JSON)',
    'methodology.dfAirStationsCSV': 'Air quality stations (CSV)',
    'methodology.dfTrafficRealtime': 'Traffic real-time (XML)',
    'methodology.dfTrafficSensors': 'Traffic measurement points (CSV)',
    'methodology.dfParksJSONLD': 'Parks and gardens (JSON-LD)',
    'methodology.dfNoiseStationsCSV': 'Acoustic stations (CSV)',
    'methodology.dfRecyclingCSV': 'Recycling containers (CSV)',
    'methodology.dfDistrictsTopo': 'District boundaries (TopoJSON)',
    'methodology.dfNeighborhoodsTopo': 'Neighborhood boundaries (TopoJSON)',
    'methodology.dfTreesXLSX': 'Trees 793K records (XLSX)',
    'methodology.dfTreesAreaCSV': 'Tree area surface (CSV)',
    'methodology.dfNoiseHistorical': 'Noise historical 1998+ (CSV)',
    'methodology.dfDemographicsCSV': 'Sociodemographic indicators (CSV)',

    // Data flow processing items
    'methodology.dfBuildTime': 'Build-time:',
    'methodology.dfBuildTimeDesc': 'Heavy XLSX/CSV to lightweight JSON',
    'methodology.dfRuntime': 'Runtime:',
    'methodology.dfRuntimeDesc': 'Real-time APIs with 20min cache',
    'methodology.dfNormalization': 'Normalization:',
    'methodology.dfNormalizationDesc': 'Linear scale 0-100',
    'methodology.dfWeighting': 'Weighting:',
    'methodology.dfWeightingDesc': '5 sub-indices x weights',
    'methodology.dfTiers': 'Tiers:',
    'methodology.dfTiersDesc': 'Excellent to Critical',

    // Data flow result items
    'methodology.dfResultIndex': 'Green Index per district (0-100)',
    'methodology.dfResultMap': 'Interactive choropleth map',
    'methodology.dfResultScorecard': 'Scorecard with 5 sub-indices',
    'methodology.dfResultRadar': 'Radar chart comparator',
    'methodology.dfResultTrends': 'Historical trends',
    'methodology.dfResultPhrases': 'Contextual phrases',

    'methodology.classificationTitle': 'Classification',
    'methodology.tierExcellentDesc': 'Lungs of the city',
    'methodology.tierGoodDesc': 'Breathes well',
    'methodology.tierAcceptableDesc': 'Room for improvement',
    'methodology.tierImprovableDesc': 'Needs attention',
    'methodology.tierCriticalDesc': 'Critical zone',

    'methodology.sourcesTitle': 'Sources',
    'methodology.sourcesNote': 'All data comes from',
    'methodology.sourcesAnd': 'and',
    'methodology.sourcesEnd': ', official portals of the Madrid City Council. Data is updated automatically according to each source\'s frequency.',

    // --- Comparar page (standalone) ---
    'comparePage.title': 'Compare districts',
    'comparePage.subtitle': 'Select 2 to 4 districts to compare their sub-indices',
    'comparePage.emptyState': 'Select at least 2 districts to compare',

    // --- Historico page (standalone) ---
    'historico.title': 'Historical trends',
    'historico.subtitle': 'How Madrid\'s environmental quality has changed over the last two decades',
    'historico.noiseTitle': 'Environmental noise (LAeq dB)',
    'historico.noiseDesc': 'Average equivalent noise level at representative Madrid stations. The WHO recommends not exceeding 55 dB in residential areas.',
    'historico.airTitle': 'Air quality (NO2 ug/m3)',
    'historico.airDesc': 'Monthly nitrogen dioxide trends at representative stations. The WHO annual limit is 40 ug/m3. NO2 is the most relevant pollutant in Madrid due to traffic.',

    // --- Green index (computed strings) ---
    'gi.contextBest': 'among Madrid\'s best',
    'gi.contextBetterThan': 'better than {pct}% of districts',
    'gi.contextAverage': 'at Madrid\'s average',
    'gi.contextBelowAvg': 'below average',
    'gi.contextUrgent': 'needs urgent attention',

    // Sub-index detail strings
    'gi.verdeBelow': 'Only {m2} m2/person of green area — WHO recommends at least 9 (municipal census 2024)',
    'gi.verdeMeets': '{m2} m2/person — meets the WHO minimum (municipal census 2024)',
    'gi.verdeAbove': '{m2} m2/person of green area — well above the WHO minimum (census 2024)',
    'gi.verdeNoData': 'No data',

    'gi.ruidoHigh': '{db} dB — exceeds the WHO recommendation of 55 dB (SIVCA average through Feb. 2026)',
    'gi.ruidoAbove': '{db} dB — above the WHO recommendation (SIVCA average through Feb. 2026)',
    'gi.ruidoOk': '{db} dB — within WHO limits (SIVCA average through Feb. 2026)',
    'gi.ruidoNoData': 'No station data',

    'gi.reciclajeLow': 'Only {n} containers/1,000 inh. — limited infrastructure (census 2024)',
    'gi.reciclajeMid': '{n} containers/1,000 inh. — acceptable coverage (census 2024)',
    'gi.reciclajeGood': '{n} containers/1,000 inh. — good recycling coverage (census 2024)',
    'gi.reciclajeNoData': 'No data',

    'gi.movilidadFluido': 'Free-flowing traffic on most sensors',
    'gi.movilidadDenso': 'Dense traffic on some main roads',
    'gi.movilidadCongestion': 'High congestion — affects environmental quality',
    'gi.movilidadLoading': 'Loading real-time traffic data...',

    'gi.aireLive': 'NO2, PM2.5, PM10, O3 in real time — updated minutes ago',
    'gi.aireLoading': 'Loading real-time data...',

    // Scorecard hydration strings
    'gi.aireLiveDetail': 'Live data: {contaminants}. Updated minutes ago',
    'gi.trafficLiveDetail': '{fluido} free-flow sensors, {denso} dense, {congestionado} congested — live',

    // District map
    'districtMap.ariaLabel': 'Map of {name} district with BiciMAD stations and bike lanes',
  },
};
