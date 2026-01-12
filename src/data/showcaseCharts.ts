import type { ChartType } from '../charts';
import type { ChartDataKey } from './chartData';

export interface ShowcaseChart {
  type: ChartType;
  dataKey: ChartDataKey;
  timeXAxis?: boolean;
  timeYAxis?: boolean;
  numberFormat?: 'default' | 'comma' | 'abbreviated';
  decimalPlaces?: number;
}

export const showcaseCharts: ShowcaseChart[] = [
  { type: 'date', dataKey: 'dates' },
  { type: 'line', dataKey: 'dates' },
  { type: 'bar', dataKey: 'datesMonthly' },
  { type: 'area', dataKey: 'dates' },
  { type: 'map', dataKey: 'worldMap' },
  { type: 'pieMap', dataKey: 'cityMap' },
  { type: 'bar', dataKey: 'products' },
  { type: 'column', dataKey: 'sales' },
  { type: 'scatterMap', dataKey: 'cityMap' },
  { type: 'line', dataKey: 'months', timeXAxis: true },
  { type: 'area', dataKey: 'months', numberFormat: 'comma' },
  { type: 'pie', dataKey: 'products' },
  { type: 'donut', dataKey: 'products' },
  { type: 'scatter', dataKey: 'default' },
  { type: 'bubble', dataKey: 'default' },
  { type: 'radar', dataKey: 'metrics' },
  { type: 'heatmap', dataKey: 'default' },
  { type: 'boxplot', dataKey: 'default' },
  { type: 'parallel', dataKey: 'default' },
  { type: 'stackedBar', dataKey: 'sales', numberFormat: 'abbreviated' },
  { type: 'stackedColumn', dataKey: 'sales', numberFormat: 'comma', decimalPlaces: 0 },
  { type: 'stackedArea', dataKey: 'months' },
  { type: 'stackedLine', dataKey: 'months' },
  { type: 'funnel', dataKey: 'products' },
  { type: 'waterfall', dataKey: 'waterfall' },
  { type: 'candlestick', dataKey: 'default' },
  { type: 'treemap', dataKey: 'products' },
  { type: 'sunburst', dataKey: 'products' },
  { type: 'combo', dataKey: 'months' },
  { type: 'dualAxis', dataKey: 'months' },
  { type: 'gauge', dataKey: 'gauge' },
];
