import { useEffect, useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import type { ChartType, ChartData, AnimationType, ThemeType } from '../charts';
import { 
  charts, 
  animations, 
  themes,
  requiresInitialization,
  initializeChart,
  getLoadingMessage,
} from '../charts';
import { convertChartData } from '../charts/converters';

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
  const [isReady, setIsReady] = useState(!requiresInitialization(type));
  const [error, setError] = useState<string | null>(null);

  // Initialize chart type dynamically if needed
  useEffect(() => {
    if (requiresInitialization(type)) {
      setIsReady(false);
      setError(null);
      
      initializeChart(type)
        .then(() => setIsReady(true))
        .catch((err) => {
          console.error(`Chart initialization failed for type "${type}":`, err);
          setError(`Failed to load ${type} chart`);
          setIsReady(true); // Still set ready to show error state
        });
    } else {
      setIsReady(true);
      setError(null);
    }
  }, [type]);

  // Get animation config
  const animationConfig = typeof animation === 'string' 
    ? animations[animation] 
    : animation;

  // Get theme config
  const themeConfig = themes[theme];

  // Auto-convert data if needed (e.g., timestamps to dates)
  const convertedData = useMemo(() => {
    return convertChartData(type, data);
  }, [type, data]);

  // Show loading state while initializing
  if (!isReady) {
    return (
      <div 
        style={{ 
          height: 400, 
          width: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          ...style 
        }}
        className={className}
      >
        <div style={{ 
          color: theme === 'dark' ? '#888' : '#666',
          textAlign: 'center',
        }}>
          <div style={{ marginBottom: 8 }}>
            {requiresInitialization(type) ? getLoadingMessage(type) : 'Loading...'}
          </div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Please wait...</div>
        </div>
      </div>
    );
  }

  // Show error state if initialization failed
  if (error) {
    return (
      <div 
        style={{ 
          height: 400, 
          width: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          ...style 
        }}
        className={className}
      >
        <div style={{ 
          color: theme === 'dark' ? '#ef4444' : '#dc2626',
          textAlign: 'center',
        }}>
          <div style={{ marginBottom: 8, fontWeight: 500 }}>⚠️ {error}</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>
            Check console for details
          </div>
        </div>
      </div>
    );
  }

  // Create base chart option with converted data
  const baseOption = charts[type](convertedData);

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
