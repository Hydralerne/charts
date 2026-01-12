/**
 * Map Data Types & Utilities
 * 
 * Centralized, clean system for handling all map data formats:
 * - Country names
 * - City names
 * - Coordinates (lat/lng)
 * - Mixed data
 */

// ============================================
// Core Types
// ============================================

/**
 * Geographic coordinate
 */
export interface GeoCoordinate {
  lat: number;    // Latitude
  lng: number;    // Longitude (or lon)
  lon?: number;   // Alternative longitude property
}

/**
 * Location can be specified multiple ways
 */
export type GeoLocation = 
  | string                    // "United States", "New York", etc.
  | GeoCoordinate            // { lat: 40.7128, lng: -74.0060 }
  | [number, number]         // [lng, lat] or [lat, lng]
  | { name: string; coord: GeoCoordinate };  // Named coordinate

/**
 * Map data point with flexible location
 */
export interface MapDataPoint {
  location: GeoLocation;
  value: number;
  name?: string;              // Optional display name
  [key: string]: any;         // Additional metadata
}

/**
 * Extended map chart data
 */
export interface MapChartData {
  points: MapDataPoint[];
  mapType?: 'world' | 'country' | 'region';
  center?: GeoCoordinate;     // Map center
  zoom?: number;              // Zoom level
}

// ============================================
// Coordinate Utilities
// ============================================

/**
 * Normalize coordinate to standard format
 */
export const normalizeCoordinate = (coord: any): GeoCoordinate | null => {
  // Already in correct format
  if (coord && typeof coord === 'object' && ('lat' in coord || 'lng' in coord || 'lon' in coord)) {
    return {
      lat: coord.lat,
      lng: coord.lng ?? coord.lon,
    };
  }

  // Array format [lng, lat] or [lat, lng]
  if (Array.isArray(coord) && coord.length === 2) {
    const [first, second] = coord;
    // Assume [lng, lat] (ECharts convention)
    return {
      lng: first,
      lat: second,
    };
  }

  return null;
};

/**
 * Convert coordinate to ECharts format [lng, lat]
 */
export const toEChartsCoord = (coord: GeoCoordinate): [number, number] => {
  return [coord.lng, coord.lat];
};

/**
 * Check if location is a coordinate
 */
export const isCoordinate = (location: any): location is GeoCoordinate => {
  return location && typeof location === 'object' && 
         ('lat' in location || 'lng' in location || 'lon' in location);
};

/**
 * Check if location is an array coordinate
 */
export const isArrayCoordinate = (location: any): location is [number, number] => {
  return Array.isArray(location) && 
         location.length === 2 && 
         typeof location[0] === 'number' && 
         typeof location[1] === 'number';
};

// ============================================
// Location Resolution
// ============================================

/**
 * City coordinates database (major cities)
 */
export const CITY_COORDINATES: Record<string, GeoCoordinate> = {
  // North America
  'New York': { lat: 40.7128, lng: -74.0060 },
  'Los Angeles': { lat: 34.0522, lng: -118.2437 },
  'Chicago': { lat: 41.8781, lng: -87.6298 },
  'Toronto': { lat: 43.6532, lng: -79.3832 },
  'Mexico City': { lat: 19.4326, lng: -99.1332 },
  
  // Europe
  'London': { lat: 51.5074, lng: -0.1278 },
  'Paris': { lat: 48.8566, lng: 2.3522 },
  'Berlin': { lat: 52.5200, lng: 13.4050 },
  'Rome': { lat: 41.9028, lng: 12.4964 },
  'Madrid': { lat: 40.4168, lng: -3.7038 },
  'Amsterdam': { lat: 52.3676, lng: 4.9041 },
  'Moscow': { lat: 55.7558, lng: 37.6173 },
  
  // Asia
  'Tokyo': { lat: 35.6762, lng: 139.6503 },
  'Beijing': { lat: 39.9042, lng: 116.4074 },
  'Shanghai': { lat: 31.2304, lng: 121.4737 },
  'Hong Kong': { lat: 22.3193, lng: 114.1694 },
  'Singapore': { lat: 1.3521, lng: 103.8198 },
  'Seoul': { lat: 37.5665, lng: 126.9780 },
  'Mumbai': { lat: 19.0760, lng: 72.8777 },
  'Dubai': { lat: 25.2048, lng: 55.2708 },
  
  // Oceania
  'Sydney': { lat: -33.8688, lng: 151.2093 },
  'Melbourne': { lat: -37.8136, lng: 144.9631 },
  
  // South America
  'São Paulo': { lat: -23.5505, lng: -46.6333 },
  'Rio de Janeiro': { lat: -22.9068, lng: -43.1729 },
  'Buenos Aires': { lat: -34.6037, lng: -58.3816 },
  
  // Africa
  'Cairo': { lat: 30.0444, lng: 31.2357 },
  'Lagos': { lat: 6.5244, lng: 3.3792 },
  'Johannesburg': { lat: -26.2041, lng: 28.0473 },
};

/**
 * Country center coordinates
 */
export const COUNTRY_CENTERS: Record<string, GeoCoordinate> = {
  'United States': { lat: 37.0902, lng: -95.7129 },
  'China': { lat: 35.8617, lng: 104.1954 },
  'India': { lat: 20.5937, lng: 78.9629 },
  'Brazil': { lat: -14.2350, lng: -51.9253 },
  'Russia': { lat: 61.5240, lng: 105.3188 },
  'Canada': { lat: 56.1304, lng: -106.3468 },
  'Australia': { lat: -25.2744, lng: 133.7751 },
  'Japan': { lat: 36.2048, lng: 138.2529 },
  'Germany': { lat: 51.1657, lng: 10.4515 },
  'United Kingdom': { lat: 55.3781, lng: -3.4360 },
  'France': { lat: 46.2276, lng: 2.2137 },
  'Italy': { lat: 41.8719, lng: 12.5674 },
  'Spain': { lat: 40.4637, lng: -3.7492 },
  'Mexico': { lat: 23.6345, lng: -102.5528 },
};

/**
 * Resolve location name to coordinates
 */
export const resolveLocation = (name: string): GeoCoordinate | null => {
  // Check cities first
  if (CITY_COORDINATES[name]) {
    return CITY_COORDINATES[name];
  }
  
  // Check countries
  if (COUNTRY_CENTERS[name]) {
    return COUNTRY_CENTERS[name];
  }
  
  return null;
};

/**
 * Convert generic location to coordinate
 */
export const locationToCoordinate = (location: GeoLocation): GeoCoordinate | null => {
  // String name
  if (typeof location === 'string') {
    return resolveLocation(location);
  }
  
  // Array coordinate
  if (isArrayCoordinate(location)) {
    return { lng: location[0], lat: location[1] };
  }
  
  // Coordinate object
  if (isCoordinate(location)) {
    return normalizeCoordinate(location);
  }
  
  // Named coordinate
  if (location && typeof location === 'object' && 'name' in location && 'coord' in location) {
    return normalizeCoordinate(location.coord);
  }
  
  return null;
};

// ============================================
// Data Conversion
// ============================================

/**
 * Convert simple ChartData to map-compatible format
 */
export const convertToMapData = (data: {
  labels: any[];
  values: number[];
}): MapDataPoint[] => {
  return data.labels.map((location, i) => ({
    location,
    value: data.values[i],
    name: typeof location === 'string' ? location : undefined,
  }));
};

/**
 * Convert map data points to ECharts series data
 * Handles both region names and coordinates
 */
export const mapDataToEChartsSeries = (
  points: MapDataPoint[],
  visualType: 'choropleth' | 'scatter' | 'heatmap' = 'choropleth'
) => {
  if (visualType === 'choropleth') {
    // Region-based (country/state names)
    return points.map(point => {
      const name = typeof point.location === 'string' 
        ? point.location 
        : point.name || 'Unknown';
      
      return {
        name,
        value: point.value,
      };
    });
  }
  
  if (visualType === 'scatter' || visualType === 'heatmap') {
    // Coordinate-based
    return points.map(point => {
      const coord = locationToCoordinate(point.location);
      if (!coord) {
        console.warn('Could not resolve location:', point.location);
        return null;
      }
      
      return {
        name: point.name || String(point.location),
        value: [...toEChartsCoord(coord), point.value],
      };
    }).filter(Boolean);
  }
  
  return [];
};

/**
 * Add city to coordinates database
 */
export const registerCity = (name: string, coord: GeoCoordinate): void => {
  CITY_COORDINATES[name] = coord;
};

/**
 * Add country center
 */
export const registerCountry = (name: string, coord: GeoCoordinate): void => {
  COUNTRY_CENTERS[name] = coord;
};
