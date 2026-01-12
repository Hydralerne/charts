import type { EChartsOption, BarSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { BarSeriesOption };

const createBarChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => ({
  ...defaultAnimation,
  xAxis: { type: 'value' },
  yAxis: { type: 'category', data: data.labels },
  series: [{
    type: 'bar',
    data: data.values,
    animationDelay: (idx: number) => idx * 100,
  }],
  ...option,
});

export default createBarChart;
