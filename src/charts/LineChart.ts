import type { EChartsOption, LineSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { LineSeriesOption };

const createLineChart = (
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
    smooth: false,
  }],
  ...option,
});

export default createLineChart;
