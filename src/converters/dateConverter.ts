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
