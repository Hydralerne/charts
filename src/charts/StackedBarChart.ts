import type { EChartsOption, BarSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { BarSeriesOption as StackedBarSeriesOption };

const createStackedBarChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => ({
  ...defaultAnimation,
  xAxis: { type: 'value' },
  yAxis: { type: 'category', data: data.labels },
  series: [{
    type: 'bar',
    data: data.values,
    stack: 'total',
    animationDelay: (idx: number) => idx * 80,
  }],
  ...option,
});

export default createStackedBarChart;
