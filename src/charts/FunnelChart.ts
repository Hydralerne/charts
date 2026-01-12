import type { EChartsOption, FunnelSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { FunnelSeriesOption };

const createFunnelChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => ({
  ...defaultAnimation,
  series: [{
    type: 'funnel',
    data: data.labels.map((name, i) => ({ name, value: data.values[i] })),
    animationDuration: 1000,
    animationEasing: 'cubicOut',
    animationDelay: (idx: number) => idx * 150,
  }],
  ...option,
});

export default createFunnelChart;
