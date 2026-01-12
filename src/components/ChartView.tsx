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
  convertChartData,
  applyConfigMiddleware,
} from '../charts';
import ChartLoading from './ChartLoading';
import ChartError from './ChartError';

export interface ChartViewProps {
  type?: ChartType;
  data: ChartData | any; // Allow any for complex charts with custom data structures
  timeXAxis?: boolean;
  timeYAxis?: boolean;
  numberFormat?: 'default' | 'comma' | 'abbreviated';
  decimalPlaces?: number;
  animation?: AnimationType | Partial<EChartsOption>;
  theme?: ThemeType;
  option?: Partial<EChartsOption>;
  style?: React.CSSProperties;
  className?: string;
}

function ChartView({ 
  type = 'bar', 
  data,
  timeXAxis = false,
  timeYAxis = false,
  numberFormat,
  decimalPlaces,
  animation = 'default',
  theme = 'dark',
  option,
  style,
  className,
}: ChartViewProps) {
  const [isReady, setIsReady] = useState(!requiresInitialization(type));
  const [error, setError] = useState<string | null>(null);

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

  // converting if needed
  const convertedData = useMemo(() => {
    return convertChartData(type, data);
  }, [type, data]);

  if (!isReady) {
    return (
      <ChartLoading
        theme={theme}
        message={requiresInitialization(type) ? getLoadingMessage(type) : 'Loading...'}
        style={style}
        className={className}
      />
    );
  }

  if (error) {
    return (
      <ChartError
        theme={theme}
        error={error}
        style={style}
        className={className}
      />
    );
  }

  const baseOption = charts[type](convertedData);

  const withMiddleware = applyConfigMiddleware(baseOption, type, data, { 
    timeXAxis, 
    timeYAxis,
    numberFormat,
    decimalPlaces,
  });

  const chartOption: EChartsOption = {
    ...withMiddleware,
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
