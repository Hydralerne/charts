/**
 * Chart initialization system
 * 
 * Handles initialization for chart types that require async setup
 * (e.g., loading GeoJSON for maps, loading special libraries, etc.)
 */

import type { ChartType } from './types';
import { ensureMapsInitialized } from '../utils/mapUtils';

/**
 * Chart types that require initialization before rendering
 */
export type InitializableChartType = 'map' | 'scatterMap' | 'pieMap' | 'linesMap' | 'bar3D';

/**
 * Configuration for chart initialization
 */
interface ChartInitConfig {
  /** Function to run for initialization */
  init: () => Promise<void>;
  /** Loading message to display */
  loadingMessage: string;
}

/**
 * Initialize echarts-gl for 3D charts
 */
const initializeEChartsGL = async (): Promise<void> => {
  try {
    // Dynamically import echarts-gl
    await import('echarts-gl');
  } catch (error) {
    console.error('Failed to load echarts-gl:', error);
    throw new Error('echarts-gl is required for 3D charts. Please install it: npm install echarts-gl');
  }
};

/**
 * Registry of chart types that need initialization
 */
const CHART_INIT_REGISTRY: Partial<Record<InitializableChartType, ChartInitConfig>> = {
  map: {
    init: ensureMapsInitialized,
    loadingMessage: 'Loading map data...',
  },
  scatterMap: {
    init: ensureMapsInitialized,
    loadingMessage: 'Loading map data...',
  },
  pieMap: {
    init: ensureMapsInitialized,
    loadingMessage: 'Loading map data...',
  },
  linesMap: {
    init: ensureMapsInitialized,
    loadingMessage: 'Loading map data...',
  },
  bar3D: {
    init: initializeEChartsGL,
    loadingMessage: 'Loading 3D rendering engine...',
  },
};

/**
 * Track which chart types have been initialized
 */
const initializedTypes = new Set<InitializableChartType>();

/**
 * Check if a chart type requires initialization
 */
export const requiresInitialization = (type: ChartType): type is InitializableChartType => {
  return type in CHART_INIT_REGISTRY;
};

/**
 * Check if a chart type has been initialized
 */
export const isChartInitialized = (type: InitializableChartType): boolean => {
  return initializedTypes.has(type);
};

/**
 * Get the loading message for a chart type
 */
export const getLoadingMessage = (type: InitializableChartType): string => {
  return CHART_INIT_REGISTRY[type]?.loadingMessage || 'Loading...';
};

/**
 * Initialize a specific chart type
 * @param type - Chart type to initialize
 * @returns Promise that resolves when initialization is complete
 */
export const initializeChart = async (type: InitializableChartType): Promise<void> => {
  // Skip if already initialized
  if (isChartInitialized(type)) {
    return;
  }

  const config = CHART_INIT_REGISTRY[type];
  if (!config) {
    throw new Error(`No initialization config found for chart type: ${type}`);
  }

  try {
    await config.init();
    initializedTypes.add(type);
  } catch (error) {
    console.error(`Failed to initialize chart type "${type}":`, error);
    throw error;
  }
};

/**
 * Initialize all chart types that need it
 * Useful for preloading during app startup
 */
export const initializeAllCharts = async (): Promise<void> => {
  const types = Object.keys(CHART_INIT_REGISTRY) as InitializableChartType[];
  await Promise.all(types.map(type => initializeChart(type)));
};

/**
 * Reset initialization state (useful for testing)
 */
export const resetInitialization = (): void => {
  initializedTypes.clear();
};
