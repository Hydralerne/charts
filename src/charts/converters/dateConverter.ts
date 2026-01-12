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

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const monthNamesShort = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const formatDate = (date: Date, useShortFormat: boolean): string => {
  const day = date.getDate();
  const month = useShortFormat ? monthNamesShort[date.getMonth()] : monthNames[date.getMonth()];
  
  if (useShortFormat) {
    return `${day}${getOrdinalSuffix(day)} ${month}`;
  }
  
  return `${day}${getOrdinalSuffix(day)} ${month}`;
};

export const dateConverterMiddleware: DataMiddleware = (data) => {
  const dateCount = data.labels.length;
  const useShortFormat = dateCount > 7;
  
  const convertedLabels = data.labels.map((label: any) => {
    if (typeof label === 'number') {
      const timestamp = label < 10000000000 ? label * 1000 : label;
      return formatDate(new Date(timestamp), useShortFormat);
    }
    
    if (label instanceof Date) {
      return formatDate(label, useShortFormat);
    }
    
    if (typeof label === 'string') {
      const date = new Date(label);
      if (!isNaN(date.getTime())) {
        return formatDate(date, useShortFormat);
      }
    }
    
    return String(label);
  });
  
  return {
    ...data,
    labels: convertedLabels,
  };
};
