import type { EChartsOption, PieSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { PieSeriesOption };

const createPieChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => ({
  ...defaultAnimation,
  animationDuration: 1000,
  animationEasing: 'cubicOut',
  series: [{
    type: 'pie',
    data: data.labels.map((name, i) => ({ name, value: data.values[i] })),
    animationType: 'scale',
    animationEasing: 'elasticOut',
  }],
  ...option,
});

export default createPieChart;
