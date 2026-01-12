import type { EChartsOption, ScatterSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { ScatterSeriesOption as BubbleSeriesOption };

const createBubbleChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => ({
  ...defaultAnimation,
  xAxis: { type: 'value' },
  yAxis: { type: 'value' },
  series: [{
    type: 'scatter',
    data: data.labels.map((_, i) => [i, data.values[i], data.values[i]]),
    symbolSize: (val: number[]) => Math.sqrt(val[2]) * 3,
    animationDelay: (idx: number) => idx * 80,
  }],
  ...option,
});

export default createBubbleChart;
