export const chartData = {
  default: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [120, 200, 150, 80, 70, 110, 130],
  },
  
  sales: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    values: [45000, 52000, 48000, 61000],
  },
  
  products: {
    labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    values: [335, 234, 548, 178, 412],
  },
  
  metrics: {
    labels: ['Speed', 'Quality', 'Cost', 'Efficiency', 'Satisfaction', 'Innovation'],
    values: [85, 92, 78, 88, 95, 82],
  },
  
  months: {
    labels: ['2026-01-01', '2026-02-01',  '2026-06-01', '2026-07-01', '2026-08-01', '2026-09-01', '2026-10-01', '2026-11-01', '2026-12-01'],
    values: [820, 932, 901, 934, 1420, 1350, 1200, 1100, 1380],
  },
  
  waterfall: {
    labels: ['Start', 'Revenue', 'Costs', 'Profit', 'Tax', 'Net'],
    values: [1000, 500, -300, 200, -150, 250],
  },
  
  gauge: {
    labels: ['Performance'],
    values: [78],
  },
  
  gradeGauge: {
    labels: ['Grade Rating'],
    values: [0.7],
  },
  
  worldMap: {
    labels: ['United States', 'China', 'Brazil', 'India', 'Russia', 'Australia', 'Canada', 'Germany', 'Japan', 'United Kingdom'],
    values: [331, 1444, 214, 1393, 146, 26, 38, 84, 125, 68],
  },
  
  cityMap: {
    labels: ['Paris', 'Sydney', 'Dubai', 'Toronto'],
    values: [2200, 5300, 3400, 2900],
  },
  
  dates: {
    labels: ['2026-02-01', '2026-02-02', '2026-02-04', '2026-02-12', '2026-02-15', '2026-02-28', '2026-03-15', '2026-04-01'],
    values: [820, 932, 901, 934, 1290, 1330, 1320, 1420],
  },
  
  // Data for Calendar Heatmap - year with date-value pairs
  calendarData: {
    labels: ['2026'], // Year(s) to display
    values: [], // Will be generated but can be overridden
  },
  
  // Data for Custom Bar Trend - multiple years comparison
  multiYearTrend: {
    labels: ['Category A', 'Category B', 'Category C', 'Category D', 'Category E', 'Category F', 'Category G', 'Category H'],
    values: [
      [450, 520, 380, 640, 590, 720, 480, 550], // 2019
      [480, 550, 420, 680, 620, 760, 510, 580], // 2020
      [510, 580, 450, 720, 650, 800, 540, 610], // 2021
      [540, 610, 480, 760, 680, 840, 570, 640], // 2022
      [570, 640, 510, 800, 710, 880, 600, 670], // 2023
      [600, 670, 540, 840, 740, 920, 630, 700], // 2024
      [630, 700, 570, 880, 770, 960, 660, 730], // 2025
    ]
  },
  
  // GPS data for ScatterGL - coordinates [lng, lat, value]
  gpsPoints: {
    labels: ['New York', 'London', 'Tokyo', 'Sydney', 'Paris', 'Dubai', 'Toronto', 'Singapore', 
             'Los Angeles', 'Berlin', 'Mumbai', 'São Paulo', 'Mexico City', 'Cairo', 'Moscow',
             'Beijing', 'Seoul', 'Bangkok', 'Istanbul', 'Buenos Aires'],
    values: [
      [-74.0060, 40.7128], // New York
      [-0.1278, 51.5074],  // London
      [139.6917, 35.6895], // Tokyo
      [151.2093, -33.8688], // Sydney
      [2.3522, 48.8566],   // Paris
      [55.2708, 25.2048],  // Dubai
      [-79.3832, 43.6532], // Toronto
      [103.8198, 1.3521],  // Singapore
      [-118.2437, 34.0522], // Los Angeles
      [13.4050, 52.5200],  // Berlin
      [72.8777, 19.0760],  // Mumbai
      [-46.6333, -23.5505], // São Paulo
      [-99.1332, 19.4326], // Mexico City
      [31.2357, 30.0444],  // Cairo
      [37.6173, 55.7558],  // Moscow
      [116.4074, 39.9042], // Beijing
      [126.9780, 37.5665], // Seoul
      [100.5018, 13.7563], // Bangkok
      [28.9784, 41.0082],  // Istanbul
      [-58.3816, -34.6037], // Buenos Aires
    ]
  },
};

export type ChartDataKey = keyof typeof chartData;
