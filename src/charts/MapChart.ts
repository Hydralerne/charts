import type { EChartsOption, MapSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { MapSeriesOption };

const createMapChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => ({
  ...defaultAnimation,
  series: [{
    type: 'map',
    map: 'world',
    data: data.labels.map((name, i) => ({ name, value: data.values[i] })),
    animationDuration: 1500,
    animationEasing: 'cubicOut',
  }],
  ...option,
});

export default createMapChart;
