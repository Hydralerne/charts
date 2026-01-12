import type { EChartsOption, LineSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type AreaSeriesOption = LineSeriesOption;

const createAreaChart = (
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
    areaStyle: { opacity: 0.3 },
    smooth: true,
  }],
  ...option,
});

export default createAreaChart;
