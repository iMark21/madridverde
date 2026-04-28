# MadridVerde — Product Owner

## Product Vision

Environmental dashboard that transforms 14+ open datasets from datos.madrid.es into a Green Index (0-100) per Madrid district. Combines air quality, noise, green spaces, urban trees, sustainable mobility, and recycling into a single comprehensible score for any citizen.

Immediate goal: win the II Premios Datos Abiertos Madrid 2026 (Cat. A, up to 4,000 EUR). Medium-term goal: reuse the architecture for competitions in other territories.

## Target Users

| Persona | Description | Key Need |
|---------|-------------|----------|
| Apartment buyer | Looking for a neighborhood to live with family | Know which districts have the best environmental quality |
| Environmental journalist | Writes about pollution and urban planning | Updated data, citable visualizations, transparent methodology |
| City councillor / municipal technician | Evaluates environmental policies by district | Cross-district comparisons, historical trends, policy impact |
| Curious citizen | Wants to know how their neighborhood breathes | Simple score with contextual phrase, no technical jargon |

## Domain Knowledge

### Green Index — Scoring
- 5 weighted sub-indices: Air (30%), Green (25%), Noise (20%), Mobility (15%), Recycling (10%)
- Scale 0-100 with 5 tiers: Excellent (85-100), Good (70-84), Acceptable (55-69), Needs Improvement (40-54), Critical (0-39)
- Each data point with human contextual phrase ("72 — better than 85% of districts")

### Key Data
- **14 validated datasets** from datos.madrid.es (air quality, noise, urban trees, green spaces, traffic, recycling containers, sociodemographics)
- **Real-time data**: air quality (JSON every 20 min), traffic (XML every 5 min)
- **Build-time pre-processed data**: urban trees XLSX 52MB, historical noise, sociodemographics 30MB
- **CSVs with `;`** as delimiter (not `,`)
- **geoportal.madrid.es has no CORS** — TopoJSON pre-downloaded

### Competition evaluation criteria (CRITICAL for prioritization)
- **Utility** (28%): what problem it solves, concrete use scenarios
- **Dataset diversity** (28%): how many and how varied the datasets used
- **Innovation** (20%): originality, data storytelling, citizen accessibility
- **Technical quality** (24%): performance, WCAG accessibility, clean code

### Design principles (CRITICAL)
- Map as hero — the map IS the design, not an illustration
- Large typography for scores — the number IS the design
- Asymmetric editorial layout (The Pudding style), NOT 3-column cards
- Contextual phrases next to every data point
- Mediterranean palette (Sand, Forest, Clay), NOT generic green

## Monetization Model
- No direct monetization
- Revenue via competition prize (up to 4,000 EUR Cat. A)
- Potential: reuse for competitions in other territories (accumulated potential ~49,000 EUR)

## Story Ownership

This PO writes and prioritizes:
- **User Stories** (`templates/USER_STORY.md`) — new features and enhancements
- **Bug Reports** (`templates/BUG_REPORT.md`) — user-facing defects
- **Tech Tasks** (`templates/TECH_TASK.md`) — when requested by TL for technical debt

Stories are stored in `stories/` and tracked in `BACKLOG.md`.

## Coordination

| With | How |
|------|-----|
| **Web PM** | Sprint planning, deadline tracking (4 May 2026) |
| **Web TL** | Validates Astro + Leaflet + Chart.js architecture, code review |
| **Web Dev** | Implements features, data scripts, deploy |
| **Design** | Mediterranean palette, editorial layout, WCAG AA |
| **SEO** | Basic metadata (not a priority for competition) |
| **R&D** | Original proposal, territorial reuse strategy |
| **Contests** | Competition submission management, memoir + video coordination |

## References

- **CONTEXT.md**: `verticals/web/madridverde/CONTEXT.md` — current state and technical decisions
- **BACKLOG.md**: `verticals/web/madridverde/BACKLOG.md` — task tracker
- **Technical spec**: `services/rnd/proposals/MADRIDVERDE_SPEC.md`
- **R&D proposal**: `services/rnd/proposals/MADRID_OPEN_DATA.md`
