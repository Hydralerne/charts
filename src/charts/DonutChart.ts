import type { EChartsOption, PieSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { PieSeriesOption as DonutSeriesOption };

const createDonutChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => ({
  ...defaultAnimation,
  series: [{
    type: 'pie',
    radius: ['40%', '70%'],
    data: data.labels.map((name, i) => ({ name, value: data.values[i] })),
    animationType: 'scale',
    animationEasing: 'elasticOut',
  }],
  ...option,
});

export default createDonutChart;
