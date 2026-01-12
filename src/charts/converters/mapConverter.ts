import type { DataMiddleware } from './types';
import { locationToCoordinate, toEChartsCoord } from '../utils/mapDataTypes';

export const pieMapConverterMiddleware: DataMiddleware = (data) => {
  // Category breakdown for each location
  const categories = ['Tech', 'Finance', 'Healthcare', 'Other'];
  
  // Create a pie series for EACH location
  const pieSeries = data.labels.map((location: any, index: number) => {
    // Resolve location to coordinates
    let coord: [number, number] | null = null;
    
    if (typeof location === 'string') {
      const resolved = locationToCoordinate(location);
      coord = resolved ? toEChartsCoord(resolved) : null;
    } else if (Array.isArray(location) && location.length === 2) {
      coord = location as [number, number];
    }
    
    if (!coord) return null;
    
    const totalValue = data.values[index];
    const locationName = typeof location === 'string' ? location : `Location ${index + 1}`;
    
    // Split total value into categories (random-ish for demo)
    const pieData = categories.map((cat, catIndex) => {
      const splits = [0.35, 0.30, 0.20, 0.15]; // Distribution percentages
      return {
        name: cat,
        value: Math.round(totalValue * splits[catIndex]),
      };
    });
    
    // Calculate radius based on total value
    const radius = Math.max(15, Math.min(totalValue / 100, 50));
    
    return {
      name: locationName,
      type: 'pie',
      coordinateSystem: 'geo', // KEY: This makes it work on map!
      center: coord, // [lng, lat]
      radius: radius,
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
      emphasis: {
        label: {
          show: true,
          formatter: '{b}: {c} ({d}%)',
          fontSize: 11,
          fontWeight: 'bold',
        },
      },
      data: pieData,
    };
  }).filter(Boolean);
  
  return {
    ...data,
    pieSeries,
    categories,
  };
};
