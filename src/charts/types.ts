import type { EChartsOption } from 'echarts';

/**
 * Simple data format for charts
 * 
 * Labels can be any type (strings, numbers, dates, timestamps)
 * The data converter middleware will transform them as needed
 */
export interface ChartData {
  labels: any[];  // Flexible: strings, numbers (timestamps), Date objects, etc.
  values: number[];
}

/**
 * Extended data format for geographic/map charts
 */
export interface MapChartData {
  regions: string[];  // Region names (e.g., country names, state names)
  values: number[];   // Values for each region
}

/**
 * Time series data format for date-based charts
 */
export interface TimeSeriesData {
  dates: string[];    // ISO date strings or formatted dates
  values: number[];   // Values for each date
  labels?: string[];  // Optional labels for multi-series
}

/**
 * Animation presets
 */
export const animations = {
  default: {
    animation: true,
    animationDuration: 1000,
    animationEasing: 'cubicOut' as const,
    animationDurationUpdate: 300,
    animationEasingUpdate: 'cubicInOut' as const,
  },
  smooth: {
    animation: true,
    animationDuration: 1500,
    animationEasing: 'cubicInOut' as const,
    animationDurationUpdate: 500,
    animationEasingUpdate: 'cubicInOut' as const,
  },
  elastic: {
    animation: true,
    animationDuration: 1200,
    animationEasing: 'elasticOut' as const,
    animationDurationUpdate: 400,
    animationEasingUpdate: 'elasticOut' as const,
  },
  bounce: {
    animation: true,
    animationDuration: 1000,
    animationEasing: 'bounceOut' as const,
    animationDurationUpdate: 400,
    animationEasingUpdate: 'bounceOut' as const,
  },
  fast: {
    animation: true,
    animationDuration: 500,
    animationEasing: 'cubicOut' as const,
    animationDurationUpdate: 150,
    animationEasingUpdate: 'cubicOut' as const,
  },
  slow: {
    animation: true,
    animationDuration: 2000,
    animationEasing: 'cubicInOut' as const,
    animationDurationUpdate: 800,
    animationEasingUpdate: 'cubicInOut' as const,
  },
  none: {
    animation: false,
  },
} as const;

export type AnimationType = keyof typeof animations;

// For backward compatibility
export const defaultAnimation = animations.default;

/**
 * Theme configurations
 */
export const themes = {
  light: {
    backgroundColor: '#ffffff',
    textStyle: { color: '#333333' },
    title: { textStyle: { color: '#333333' } },
    legend: { textStyle: { color: '#666666' } },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#ddd',
      borderWidth: 1,
      textStyle: { color: '#333' },
    },
  },
  dark: {
    backgroundColor: 'transparent',
    textStyle: { color: '#f5f5f7' },
    title: { textStyle: { color: '#f5f5f7' } },
    legend: { textStyle: { color: '#8b8b9e' } },
    tooltip: {
      backgroundColor: 'rgba(18, 18, 26, 0.95)',
      borderColor: '#2a2a3a',
      borderWidth: 1,
      textStyle: { color: '#f5f5f7' },
    },
  },
} as const;

export type ThemeType = keyof typeof themes;

/**
 * Chart creator signature
 */
export type ChartCreator = (
  data: ChartData | any,  // Allow flexible data for special charts
  option?: Partial<EChartsOption>
) => EChartsOption;

/**
 * All available chart types
 */
export type ChartType =
  // Basic
  | 'bar'
  | 'column'
  | 'line'
  | 'area'
  | 'pie'
  | 'donut'
  
  // Date-based
  | 'date'
  
  // Stacked variants
  | 'stackedBar'
  | 'stackedColumn'
  | 'stackedLine'
  | 'stackedArea'
  
  // Scatter & Bubble
  | 'scatter'
  | 'bubble'
  
  // Circular
  | 'sunburst'
  | 'radar'
  
  // Hierarchical
  | 'treemap'
  
  // Flow
  | 'sankey'
  | 'graph'
  
  // Statistical
  | 'boxplot'
  | 'heatmap'
  | 'parallel'
  
  // Financial & Process
  | 'candlestick'
  | 'funnel'
  | 'gauge'
  | 'waterfall'
  
  // Combo
  | 'combo'
  | 'dualAxis'
  
  // Geographic (Maps)
  | 'map'              // Choropleth map (regions colored by value)
  | 'scatterMap'       // Single bubble per location
  | 'pieMap'           // Real pie charts at locations (coordinateSystem: 'geo')
  | 'linesMap'         // Flow/migration lines between locations
  
  // Advanced
  | 'themeRiver'
  | 'custom';

/**
 * Chart metadata for documentation
 */
export interface ChartMetadata {
  id: ChartType;
  name: string;
  description: string;
  useCase: string;
  category: string;
}

/**
 * Chart categories
 */
export const chartCategories = {
  basic: 'Basic Charts',
  stacked: 'Stacked Charts',
  scatter: 'Scatter & Bubble',
  circular: 'Circular Charts',
  hierarchical: 'Hierarchical',
  flow: 'Flow & Network',
  statistical: 'Statistical',
  financial: 'Financial & Process',
  combo: 'Combination',
  geographic: 'Geographic',
  advanced: 'Advanced',
} as const;
