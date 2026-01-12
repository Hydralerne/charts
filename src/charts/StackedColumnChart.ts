import type { EChartsOption, BarSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { BarSeriesOption as StackedColumnSeriesOption };

const createStackedColumnChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => ({
  ...defaultAnimation,
  xAxis: { type: 'category', data: data.labels },
  yAxis: { type: 'value' },
  series: [{
    type: 'bar',
    data: data.values,
    stack: 'total',
    animationDelay: (idx: number) => idx * 80,
  }],
  ...option,
});

export default createStackedColumnChart;
