import type { EChartsOption, LineSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { LineSeriesOption as StackedLineSeriesOption };

const createStackedLineChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => ({
  ...defaultAnimation,
  animationDuration: 1500,
  xAxis: { type: 'category', data: data.labels },
  yAxis: { type: 'value' },
  series: [{
    type: 'line',
    data: data.values,
    stack: 'total',
  }],
  ...option,
});

export default createStackedLineChart;
