import type { EChartsOption, LineSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type StackedAreaSeriesOption = LineSeriesOption;

const createStackedAreaChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => ({
  ...defaultAnimation,
  animationDuration: 1500,
  xAxis: { type: 'category', boundaryGap: false, data: data.labels },
  yAxis: { type: 'value' },
  series: [{
    type: 'line',
    data: data.values,
    stack: 'total',
    areaStyle: { opacity: 0.3 },
  }],
  ...option,
});

export default createStackedAreaChart;
