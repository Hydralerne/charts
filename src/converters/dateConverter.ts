import type { DataMiddleware } from './types';

const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Creates a formatter for ECharts time axis that intelligently formats dates
 * based on the data range (e.g., "1 Jan 2026", "2 Mar", etc.)
 */
export const createTimeAxisFormatter = (labels: any[]) => {
  // Parse all dates from labels to determine the span
  const dates = labels
    .map(label => {
      if (typeof label === 'number') {
        const timestamp = label < 10000000000 ? label * 1000 : label;
        return new Date(timestamp);
      } else if (label instanceof Date) {
        return label;
      } else if (typeof label === 'string') {
        const parsed = new Date(label);
        return !isNaN(parsed.getTime()) ? parsed : null;
      }
      return null;
    })
    .filter((d): d is Date => d !== null);

  if (dates.length === 0) {
    // Fallback formatter
    return (value: number) => {
      const date = new Date(value);
      const day = date.getDate();
      const month = monthNamesShort[date.getMonth()];
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    };
  }

  // Determine date range
  const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
  const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
  const daySpan = (maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24);
  const spanYears = maxDate.getFullYear() !== minDate.getFullYear();
  const sameYear = !spanYears;

  // Return a formatter function that ECharts will use
  return (value: number) => {
    const date = new Date(value);
    const day = date.getDate();
    const month = monthNamesShort[date.getMonth()];
    const year = date.getFullYear();

    // Format based on the data span
    if (spanYears || daySpan > 180) {
      // Multi-year or long span: "1 Jan 2026"
      return `${day} ${month} ${year}`;
    } else if (sameYear && daySpan <= 180) {
      // Same year, shorter span: "1 Jan", "2 Mar"
      return `${day} ${month}`;
    } else {
      // Default: "1 Jan 2026"
      return `${day} ${month} ${year}`;
    }
  };
};

const formatDate = (date: Date, useShortFormat: boolean): string => {
  const day = date.getDate();
  const month = useShortFormat ? monthNamesShort[date.getMonth()] : monthNames[date.getMonth()];
  return `${day}${getOrdinalSuffix(day)} ${month}`;
};

const formatDateNumeric = (date: Date): string => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const dateConverterMiddleware: DataMiddleware = (data) => {
  const dateCount = data.labels.length;
  const useShortFormat = dateCount > 15;
  const useNumericFormat = dateCount > 30;
  
  const convertedLabels = data.labels.map((label: any) => {
    let date: Date | null = null;
    
    if (typeof label === 'number') {
      const timestamp = label < 10000000000 ? label * 1000 : label;
      date = new Date(timestamp);
    } else if (label instanceof Date) {
      date = label;
    } else if (typeof label === 'string') {
      const parsed = new Date(label);
      if (!isNaN(parsed.getTime())) {
        date = parsed;
      }
    }
    
    if (!date) {
      return String(label);
    }
    
    if (useNumericFormat) {
      return formatDateNumeric(date);
    }
    
    return formatDate(date, useShortFormat);
  });
  
  return {
    ...data,
    labels: convertedLabels,
  };
};
