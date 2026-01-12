/**
 * Number formatting converters for chart display
 * These formatters are used with ECharts' axisLabel.formatter and tooltip.formatter
 */

export type NumberFormat = 'default' | 'comma' | 'abbreviated';

/**
 * Format number with commas using browser's built-in toLocaleString
 * This is the official ECharts recommended approach
 * 
 * @example
 * formatWithCommas(1234567) => "1,234,567"
 * formatWithCommas(1234.5, 2) => "1,234.50"
 */
export const formatWithCommas = (value: number, decimalPlaces?: number): string => {
  if (decimalPlaces !== undefined) {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    });
  }
  return value.toLocaleString('en-US');
};

/**
 * Format number with abbreviations (k, M, B)
 * ECharts doesn't have built-in support for this, so we use a custom formatter
 * 
 * @example
 * formatAbbreviated(1234) => "1.2k"
 * formatAbbreviated(1234567) => "1.2M"
 * formatAbbreviated(1234567890) => "1.2B"
 */
export const formatAbbreviated = (value: number, decimalPlaces: number = 1): string => {
  const abs = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  
  if (abs >= 1e9) {
    return sign + (abs / 1e9).toFixed(decimalPlaces) + 'B';
  }
  if (abs >= 1e6) {
    return sign + (abs / 1e6).toFixed(decimalPlaces) + 'M';
  }
  if (abs >= 1e3) {
    return sign + (abs / 1e3).toFixed(decimalPlaces) + 'k';
  }
  
  return decimalPlaces !== undefined ? value.toFixed(decimalPlaces) : value.toString();
};

/**
 * Create a number formatter function compatible with ECharts
 * Returns a function that can be used in axisLabel.formatter or tooltip.formatter
 * 
 * @param format - The format type
 * @param decimalPlaces - Optional decimal precision
 * @returns Formatter function for ECharts
 */
export const createNumberFormatter = (
  format?: NumberFormat,
  decimalPlaces?: number
): ((value: any) => string) => {
  return (value: any) => {
    const num = typeof value === 'number' ? value : parseFloat(value);
    if (isNaN(num)) return value;
    
    switch (format) {
      case 'comma':
        return formatWithCommas(num, decimalPlaces);
      case 'abbreviated':
        return formatAbbreviated(num, decimalPlaces);
      default:
        return decimalPlaces !== undefined 
          ? num.toFixed(decimalPlaces) 
          : num.toString();
    }
  };
};
