/**
 * Converter Configuration System
 * 
 * Controls which converters are applied to which chart types
 */

export interface ConverterOptions {
  /** Enable/disable date conversion (default: false, uses native ECharts time axis) */
  convertDates?: boolean;
  /** Custom date format when conversion is enabled */
  dateFormat?: 'short' | 'long' | 'custom';
  /** Enable/disable geo conversion (default: true) */
  convertGeo?: boolean;
}

/**
 * Default converter settings per chart type
 */
const DEFAULT_CONVERTER_CONFIG: Record<string, ConverterOptions> = {
  date: {
    convertDates: false, // Use native ECharts time axis by default
    convertGeo: false,
  },
  pieMap: {
    convertDates: false,
    convertGeo: true, // Maps need geo conversion
  },
  scatterMap: {
    convertDates: false,
    convertGeo: false,
  },
  map: {
    convertDates: false,
    convertGeo: false,
  },
};

/**
 * User-provided converter overrides
 */
let converterOverrides: Record<string, ConverterOptions> = {};

/**
 * Get converter options for a chart type
 */
export const getConverterOptions = (chartType: string): ConverterOptions => {
  return {
    ...DEFAULT_CONVERTER_CONFIG[chartType],
    ...converterOverrides[chartType],
  };
};

/**
 * Set converter options for a chart type
 */
export const setConverterOptions = (chartType: string, options: ConverterOptions): void => {
  converterOverrides[chartType] = {
    ...converterOverrides[chartType],
    ...options,
  };
};

/**
 * Reset all converter overrides
 */
export const resetConverterOptions = (): void => {
  converterOverrides = {};
};

/**
 * Check if date conversion is enabled for a chart type
 */
export const shouldConvertDates = (chartType: string): boolean => {
  const options = getConverterOptions(chartType);
  return options.convertDates === true;
};

/**
 * Check if geo conversion is enabled for a chart type
 */
export const shouldConvertGeo = (chartType: string): boolean => {
  const options = getConverterOptions(chartType);
  return options.convertGeo === true;
};
