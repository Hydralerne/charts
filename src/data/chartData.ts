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
};

export type ChartDataKey = keyof typeof chartData;
