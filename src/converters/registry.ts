import type { DataConverterConfig } from './types';
import { dateConverterMiddleware } from './dateConverter';
import { pieMapConverterMiddleware } from './mapConverter';
import { shouldConvertDates, shouldConvertGeo } from './config';

const CONVERTER_REGISTRY: Record<string, DataConverterConfig> = {
  date: {
    middleware: [dateConverterMiddleware],
  },
  pieMap: {
    middleware: [pieMapConverterMiddleware],
  },
};

export const convertChartData = (chartType: string, data: any): any => {
  const converter = CONVERTER_REGISTRY[chartType];
  
  if (!converter) {
    return data;
  }

  if (chartType === 'date' && !shouldConvertDates(chartType)) {
    return data;
  }
  
  if (chartType === 'pieMap' && !shouldConvertGeo(chartType)) {
    return data;
  }

  if (converter.transform) {
    return converter.transform(data);
  }

  if (converter.middleware && converter.middleware.length > 0) {
    let result = data;
    for (const middleware of converter.middleware) {
      result = middleware(result);
    }
    return result;
  }

  return data;
};

export const registerConverter = (
  chartType: string,
  config: DataConverterConfig
): void => {
  CONVERTER_REGISTRY[chartType] = config;
};

export const hasConverter = (chartType: string): boolean => {
  return chartType in CONVERTER_REGISTRY;
};
