import type { EChartsOption, BarSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { BarSeriesOption as ColumnSeriesOption };

const createColumnChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => ({
  ...defaultAnimation,
  xAxis: { type: 'category', data: data.labels },
  yAxis: { type: 'value' },
  series: [{
    type: 'bar',
    data: data.values,
    animationDelay: (idx: number) => idx * 100,
  }],
  ...option,
});

export default createColumnChart;
