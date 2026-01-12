/**
 * Converter Types
 * Clean, centralized type definitions
 */

/**
 * Data transformation middleware function
 * Takes data, returns transformed data
 */
export type DataMiddleware = (data: any) => any;

/**
 * Converter configuration for a chart type
 */
export interface DataConverterConfig {
  /** Middleware pipeline for data transformation */
  middleware?: DataMiddleware[];
  /** Direct transform function (alternative to middleware) */
  transform?: (data: any) => any;
}
