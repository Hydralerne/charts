import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import type { ChartType, ChartData, AnimationType, ThemeType } from '../charts';
import { charts, animations, themes } from '../charts';

export interface ChartViewProps {
  /** Chart type - defaults to 'bar' */
  type?: ChartType;
  /** Simple data format */
  data: ChartData;
  /** Animation preset or custom config */
  animation?: AnimationType | Partial<EChartsOption>;
  /** Theme - 'light' or 'dark' */
  theme?: ThemeType;
  /** ECharts options to merge/override */
  option?: Partial<EChartsOption>;
  /** Container style */
  style?: React.CSSProperties;
  /** Container class */
  className?: string;
}

/**
 * Universal chart view component with animation and theme support
 * 
 * @example
 * // Basic usage
 * <ChartView type="bar" data={{ labels: ['A', 'B'], values: [10, 20] }} />
 * 
 * @example
 * // With animation preset
 * <ChartView type="line" data={data} animation="elastic" />
 * 
 * @example
 * // With theme
 * <ChartView type="pie" data={data} theme="light" />
 * 
 * @example
 * // Full customization
 * <ChartView 
 *   type="combo"
 *   data={data}
 *   animation="smooth"
 *   theme="dark"
 *   option={{
 *     title: { text: 'My Chart' },
 *     series: [{ itemStyle: { color: 'red' } }]
 *   }}
 * />
 */
function ChartView({ 
  type = 'bar', 
  data,
  animation = 'default',
  theme = 'dark',
  option,
  style,
  className,
}: ChartViewProps) {
  // Get animation config
  const animationConfig = typeof animation === 'string' 
    ? animations[animation] 
    : animation;

  // Get theme config
  const themeConfig = themes[theme];

  // Create base chart option
  const baseOption = charts[type](data);

  // Merge: base → animation → theme → user options
  const chartOption: EChartsOption = {
    ...baseOption,
    ...animationConfig,
    ...themeConfig,
    ...option,
  };

  return (
    <ReactECharts
      option={chartOption}
      style={{ height: 400, width: '100%', ...style }}
      className={className}
      notMerge
      lazyUpdate
    />
  );
}

export default ChartView;
