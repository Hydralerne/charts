import type { EChartsOption, CandlestickSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { CandlestickSeriesOption };

const createCandlestickChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => ({
  ...defaultAnimation,
  xAxis: { type: 'category', data: data.labels },
  yAxis: { scale: true },
  series: [{
    type: 'candlestick',
    data: data.values.map((v) => [v * 0.95, v * 1.05, v * 0.93, v * 1.07]),
    animationDuration: 1200,
    animationDelay: (idx: number) => idx * 80,
  }],
  ...option,
});

export default createCandlestickChart;
