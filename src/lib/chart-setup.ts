/**
 * Centralized Chart.js registration.
 * Import this module once — it registers all needed components.
 */
import {
  Chart,
  LineController,
  RadarController,
  LineElement,
  PointElement,
  RadialLinearScale,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(
  LineController,
  RadarController,
  LineElement,
  PointElement,
  RadialLinearScale,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin
);

export { Chart };
