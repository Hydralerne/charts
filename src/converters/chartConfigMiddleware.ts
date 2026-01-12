import type { EChartsOption } from 'echarts';
import { createNumberFormatter, type NumberFormat } from './numberConverter';

export type ChartConfigMiddleware = (
  config: EChartsOption,
  chartType: string,
  rawData: any
) => EChartsOption;

export interface ChartConfigOptions {
  beforeRender?: ChartConfigMiddleware[];
  customProps?: Record<string, any>;
}

export interface ChartConfigMiddlewareConfig {
  timeXAxis?: boolean;
  timeYAxis?: boolean;
  numberFormat?: NumberFormat;
  decimalPlaces?: number;
}

const CONFIG_MIDDLEWARE_REGISTRY: Record<string, ChartConfigOptions> = {};

export const applyConfigMiddleware = (
  config: EChartsOption,
  chartType: string,
  rawData: any,
  middlewareConfig?: ChartConfigMiddlewareConfig
): EChartsOption => {
  const hasTimeAxis = middlewareConfig?.timeXAxis || middlewareConfig?.timeYAxis;
  
  // Apply number formatting to axes
  if (middlewareConfig?.numberFormat) {
    const formatter = createNumberFormatter(
      middlewareConfig.numberFormat,
      middlewareConfig.decimalPlaces
    );
    
    // Format Y-axis (most common for numbers)
    if (config.yAxis && !middlewareConfig?.timeYAxis) {
      (config.yAxis as any).axisLabel = {
        ...(config.yAxis as any).axisLabel,
        formatter,
      };
    }
    
    // Format X-axis if numeric and not time
    if (config.xAxis && !middlewareConfig?.timeXAxis && (config.xAxis as any).type === 'value') {
      (config.xAxis as any).axisLabel = {
        ...(config.xAxis as any).axisLabel,
        formatter,
      };
    }
    
    // Format tooltip
    if (config.tooltip) {
      const originalFormatter = (config.tooltip as any).formatter;
      (config.tooltip as any).formatter = (params: any) => {
        if (originalFormatter) {
          return originalFormatter(params);
        }
        
        // Handle array of series (multiple items)
        if (Array.isArray(params)) {
          return params.map((item: any) => {
            const value = formatter(item.value);
            return `${item.marker} ${item.seriesName}: ${value}`;
          }).join('<br/>');
        }
        
        // Single item
        const value = formatter(params.value);
        return `${params.marker} ${params.seriesName || params.name}: ${value}`;
      };
    }
  }
  
  if (hasTimeAxis && rawData?.labels && rawData?.values) {
    // Handle X-axis as time
    if (middlewareConfig?.timeXAxis && config.xAxis) {
      (config.xAxis as any).type = 'time';
      delete (config.xAxis as any).data;
    }
    
    // Handle Y-axis as time
    if (middlewareConfig?.timeYAxis && config.yAxis) {
      (config.yAxis as any).type = 'time';
      delete (config.yAxis as any).data;
    }
    
    // Transform series data to appropriate format
    if (config.series && Array.isArray(config.series)) {
      config.series = config.series.map((series: any) => {
        // Only transform if series has data as a simple array
        if (Array.isArray(series.data) && typeof series.data[0] !== 'object') {
          let transformedData;
          
          if (middlewareConfig?.timeXAxis && middlewareConfig?.timeYAxis) {
            // Both axes are time: [dateX, dateY]
            transformedData = rawData.labels.map((label: string, i: number) => [label, rawData.values[i]]);
          } else if (middlewareConfig?.timeXAxis) {
            // X-axis is time: [date, value]
            transformedData = rawData.labels.map((label: string, i: number) => [label, rawData.values[i]]);
          } else if (middlewareConfig?.timeYAxis) {
            // Y-axis is time: [value, date]
            transformedData = rawData.labels.map((label: string, i: number) => [rawData.values[i], label]);
          }
          
          return {
            ...series,
            data: transformedData,
          };
        }
        return series;
      });
    }
  }

  const middleware = CONFIG_MIDDLEWARE_REGISTRY[chartType];

  if (!middleware || !middleware.beforeRender) {
    return config;
  }

  let result = config;
  for (const fn of middleware.beforeRender) {
    result = fn(result, chartType, rawData);
  }

  return result;
};

export const registerConfigMiddleware = (
  chartType: string,
  options: ChartConfigOptions
): void => {
  CONFIG_MIDDLEWARE_REGISTRY[chartType] = {
    ...CONFIG_MIDDLEWARE_REGISTRY[chartType],
    ...options,
  };
};

export const getCustomProps = (chartType: string): Record<string, any> => {
  return CONFIG_MIDDLEWARE_REGISTRY[chartType]?.customProps || {};
};

export const hasConfigMiddleware = (chartType: string): boolean => {
  return chartType in CONFIG_MIDDLEWARE_REGISTRY;
};
