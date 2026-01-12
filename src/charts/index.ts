// ============================================
// Types, Animation & Theme
// ============================================
export type { 
  ChartData, 
  ChartType, 
  ChartCreator, 
  ChartMetadata,
  AnimationType,
  ThemeType,
} from './types';
export { chartCategories, defaultAnimation, animations, themes } from './types';
export type { EChartsOption } from 'echarts';

// ============================================
// Series Option Types
// ============================================
export type { BarSeriesOption } from './BarChart';
export type { LineSeriesOption } from './LineChart';
export type { PieSeriesOption } from './PieChart';
export type { ScatterSeriesOption } from './ScatterChart';
export type { RadarSeriesOption } from './RadarChart';
export type { GaugeSeriesOption } from './GaugeChart';
export type { FunnelSeriesOption } from './FunnelChart';
export type { HeatmapSeriesOption } from './HeatmapChart';
export type { CandlestickSeriesOption } from './CandlestickChart';
export type { AreaSeriesOption } from './AreaChart';
export type { DonutSeriesOption } from './DonutChart';
export type { SunburstSeriesOption } from './SunburstChart';
export type { TreemapSeriesOption } from './TreemapChart';
export type { SankeySeriesOption } from './SankeyChart';
export type { BubbleSeriesOption } from './BubbleChart';
export type { BoxplotSeriesOption } from './BoxplotChart';
export type { GraphSeriesOption } from './GraphChart';
export type { ParallelSeriesOption } from './ParallelChart';
export type { MapSeriesOption } from './MapChart';
export type { ThemeRiverSeriesOption } from './ThemeRiverChart';
export type { CustomSeriesOption } from './CustomChart';

// ============================================
// Chart Creators
// ============================================
export { default as createBarChart } from './BarChart';
export { default as createColumnChart } from './ColumnChart';
export { default as createLineChart } from './LineChart';
export { default as createAreaChart } from './AreaChart';
export { default as createPieChart } from './PieChart';
export { default as createDonutChart } from './DonutChart';
export { default as createStackedBarChart } from './StackedBarChart';
export { default as createStackedColumnChart } from './StackedColumnChart';
export { default as createStackedLineChart } from './StackedLineChart';
export { default as createStackedAreaChart } from './StackedAreaChart';
export { default as createScatterChart } from './ScatterChart';
export { default as createBubbleChart } from './BubbleChart';
export { default as createSunburstChart } from './SunburstChart';
export { default as createRadarChart } from './RadarChart';
export { default as createTreemapChart } from './TreemapChart';
export { default as createSankeyChart } from './SankeyChart';
export { default as createGraphChart } from './GraphChart';
export { default as createBoxplotChart } from './BoxplotChart';
export { default as createHeatmapChart } from './HeatmapChart';
export { default as createParallelChart } from './ParallelChart';
export { default as createCandlestickChart } from './CandlestickChart';
export { default as createFunnelChart } from './FunnelChart';
export { default as createGaugeChart } from './GaugeChart';
export { default as createWaterfallChart } from './WaterfallChart';
export { default as createComboChart } from './ComboChart';
export { default as createDualAxisChart } from './DualAxisChart';
export { default as createMapChart } from './MapChart';
export { default as createThemeRiverChart } from './ThemeRiverChart';
export { default as createCustomChart } from './CustomChart';

// ============================================
// Registry
// ============================================
import type { ChartType, ChartCreator } from './types';
import createBarChart from './BarChart';
import createColumnChart from './ColumnChart';
import createLineChart from './LineChart';
import createAreaChart from './AreaChart';
import createPieChart from './PieChart';
import createDonutChart from './DonutChart';
import createStackedBarChart from './StackedBarChart';
import createStackedColumnChart from './StackedColumnChart';
import createStackedLineChart from './StackedLineChart';
import createStackedAreaChart from './StackedAreaChart';
import createScatterChart from './ScatterChart';
import createBubbleChart from './BubbleChart';
import createSunburstChart from './SunburstChart';
import createRadarChart from './RadarChart';
import createTreemapChart from './TreemapChart';
import createSankeyChart from './SankeyChart';
import createGraphChart from './GraphChart';
import createBoxplotChart from './BoxplotChart';
import createHeatmapChart from './HeatmapChart';
import createParallelChart from './ParallelChart';
import createCandlestickChart from './CandlestickChart';
import createFunnelChart from './FunnelChart';
import createGaugeChart from './GaugeChart';
import createWaterfallChart from './WaterfallChart';
import createComboChart from './ComboChart';
import createDualAxisChart from './DualAxisChart';
import createMapChart from './MapChart';
import createThemeRiverChart from './ThemeRiverChart';
import createCustomChart from './CustomChart';

export const charts: Record<ChartType, ChartCreator> = {
  bar: createBarChart,
  column: createColumnChart,
  line: createLineChart,
  area: createAreaChart,
  pie: createPieChart,
  donut: createDonutChart,
  stackedBar: createStackedBarChart,
  stackedColumn: createStackedColumnChart,
  stackedLine: createStackedLineChart,
  stackedArea: createStackedAreaChart,
  scatter: createScatterChart,
  bubble: createBubbleChart,
  sunburst: createSunburstChart,
  radar: createRadarChart,
  treemap: createTreemapChart,
  sankey: createSankeyChart,
  graph: createGraphChart,
  boxplot: createBoxplotChart,
  heatmap: createHeatmapChart,
  parallel: createParallelChart,
  candlestick: createCandlestickChart,
  funnel: createFunnelChart,
  gauge: createGaugeChart,
  waterfall: createWaterfallChart,
  combo: createComboChart,
  dualAxis: createDualAxisChart,
  map: createMapChart,
  themeRiver: createThemeRiverChart,
  custom: createCustomChart,
};

export { default } from './BarChart';
