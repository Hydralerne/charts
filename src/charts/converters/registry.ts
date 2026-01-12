/**
 * Converter Registry
 * 
 * Central registry mapping chart types to their data converters
 */

import type { DataConverterConfig } from './types';
import { dateConverterMiddleware } from './dateConverter';
import { pieMapConverterMiddleware } from './mapConverter';

/**
 * Registry of data converters by chart type
 * Clean, centralized, organized
 */
const CONVERTER_REGISTRY: Record<string, DataConverterConfig> = {
  date: {
    middleware: [dateConverterMiddleware],
  },
  pieMap: {
    middleware: [pieMapConverterMiddleware],
  },
};

/**
 * Apply data conversion for a specific chart type
 * Uses middleware pipeline for clean, composable transformations
 */
export const convertChartData = (chartType: string, data: any): any => {
  const converter = CONVERTER_REGISTRY[chartType];
  
  if (!converter) {
    return data; // No conversion needed
  }

  // Use direct transform if provided
  if (converter.transform) {
    return converter.transform(data);
  }

  // Apply middleware pipeline
  if (converter.middleware && converter.middleware.length > 0) {
    let result = data;
    for (const middleware of converter.middleware) {
      result = middleware(result);
    }
    return result;
  }

  return data;
};

/**
 * Register a custom converter for a chart type
 */
export const registerConverter = (
  chartType: string,
  config: DataConverterConfig
): void => {
  CONVERTER_REGISTRY[chartType] = config;
};

/**
 * Check if a chart type has a converter
 */
export const hasConverter = (chartType: string): boolean => {
  return chartType in CONVERTER_REGISTRY;
};
