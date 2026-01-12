import type { EChartsOption, GaugeSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { GaugeSeriesOption };

const createGaugeChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => ({
  ...defaultAnimation,
  animationDuration: 1500,
  animationEasing: 'cubicOut',
  series: [{
    type: 'gauge',
    data: [{ value: data.values[0], name: data.labels[0] }],
    animationDuration: 2000,
    animationEasing: 'bounceOut',
  }],
  ...option,
});

export default createGaugeChart;
