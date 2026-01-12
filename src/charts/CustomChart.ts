import type { EChartsOption, CustomSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { CustomSeriesOption };

const createCustomChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => ({
  ...defaultAnimation,
  xAxis: { type: 'category', data: data.labels },
  yAxis: { type: 'value' },
  series: [{
    type: 'custom',
    data: data.values,
    animationDuration: 1000,
  }],
  ...option,
});

export default createCustomChart;
