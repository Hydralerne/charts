/**
 * Map utilities for registering GeoJSON data with ECharts
 * 
 * ECharts requires map data (GeoJSON) to be registered before rendering map charts.
 * This module provides utilities to register maps from various sources.
 */

import * as echarts from 'echarts';

/**
 * Global tracker for initialized maps
 */
const initializedMaps = new Set<string>();

/**
 * Check if a map has been initialized
 */
export const isMapInitialized = (mapName: string): boolean => {
  return initializedMaps.has(mapName);
};

/**
 * Mark a map as initialized
 */
const markMapInitialized = (mapName: string): void => {
  initializedMaps.add(mapName);
};

/**
 * Registers a real world map with actual country shapes
 * Downloads proper GeoJSON data from a reliable source
 */
export const registerSimpleWorldMap = async () => {
  if (isMapInitialized('world')) {
    return;
  }

  try {
    // Use a reliable GeoJSON source with actual country shapes
    const response = await fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json');
    const geoJSON = await response.json();
    echarts.registerMap('world', geoJSON);
    markMapInitialized('world');
    console.log('World map loaded successfully');
  } catch (error) {
    console.error('Failed to load world map, using fallback:', error);
    // Fallback: try alternative source
    try {
      const response = await fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson');
      const geoJSON = await response.json();
      echarts.registerMap('world', geoJSON);
      markMapInitialized('world');
      console.log('World map loaded from fallback source');
    } catch (fallbackError) {
      console.error('All map sources failed:', fallbackError);
      // Last resort: register empty map to prevent crashes
      echarts.registerMap('world', { type: 'FeatureCollection', features: [] });
      markMapInitialized('world');
    }
  }
};

/**
 * Registers map data from a GeoJSON object
 * @param mapName - Name to register the map as (e.g., 'world', 'usa', 'europe')
 * @param geoJSON - GeoJSON object containing geographic features
 */
export const registerMapFromGeoJSON = (mapName: string, geoJSON: any) => {
  if (isMapInitialized(mapName)) {
    return;
  }
  echarts.registerMap(mapName, geoJSON);
  markMapInitialized(mapName);
};

/**
 * Fetches and registers map data from a URL
 * @param mapName - Name to register the map as
 * @param url - URL to fetch GeoJSON from
 * @returns Promise that resolves when map is registered
 * 
 * Example URLs:
 * - World: https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson
 * - USA: https://raw.githubusercontent.com/datasets/geo-boundaries-us-110m/master/geojson/states.geojson
 */
export const registerMapFromURL = async (mapName: string, url: string): Promise<void> => {
  if (isMapInitialized(mapName)) {
    return;
  }

  try {
    const response = await fetch(url);
    const geoJSON = await response.json();
    echarts.registerMap(mapName, geoJSON);
    markMapInitialized(mapName);
  } catch (error) {
    console.error(`Failed to load map from ${url}:`, error);
    throw error;
  }
};

/**
 * Pre-configured map URLs for common maps
 */
export const mapURLs = {
  // World maps
  worldDetailed: 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson',
  
  // Regional maps
  usa: 'https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json',
  europe: 'https://raw.githubusercontent.com/leakyMirror/map-of-europe/master/GeoJSON/europe.geojson',
  
  // Country-specific maps (administrative divisions)
  usaStates: 'https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json',
  chinaProvinces: 'https://raw.githubusercontent.com/apache/echarts/master/test/data/map/json/china.json',
  
  // Additional regions
  africa: 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson',
  asia: 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson',
} as const;

/**
 * Supported map types
 */
export type MapType = 'world' | 'usa' | 'europe' | 'china' | 'custom';

/**
 * Load a specific country/region map
 * @param mapType - Type of map to load
 * @param mapName - Optional custom name for the map (defaults to mapType)
 */
export const loadMap = async (
  mapType: MapType | string,
  mapName?: string
): Promise<void> => {
  const name = mapName || mapType;
  
  if (isMapInitialized(name)) {
    return;
  }

  // Default to simple world map
  if (mapType === 'world') {
    registerSimpleWorldMap();
    return;
  }

  // Load from predefined URLs
  const urlMap: Record<string, string> = {
    usa: mapURLs.usa,
    europe: mapURLs.europe,
    china: mapURLs.chinaProvinces,
  };

  const url = urlMap[mapType];
  if (url) {
    await registerMapFromURL(name, url);
  } else {
    console.warn(`Map type "${mapType}" not found. Using simple world map.`);
    registerSimpleWorldMap();
  }
};

/**
 * Initialize default maps for immediate use
 * This is called automatically when a map chart is rendered
 */
export const initializeMaps = async (): Promise<void> => {
  await registerSimpleWorldMap();
};

/**
 * Dynamically ensure maps are initialized
 * Returns a promise that resolves when initialization is complete
 */
export const ensureMapsInitialized = async (): Promise<void> => {
  if (!isMapInitialized('world')) {
    await registerSimpleWorldMap();
  }
};
