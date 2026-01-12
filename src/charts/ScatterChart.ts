import type { EChartsOption, ScatterSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { ScatterSeriesOption };

const createScatterChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => ({
  ...defaultAnimation,
  xAxis: { type: 'value' },
  yAxis: { type: 'value' },
  series: [{
    type: 'scatter',
    data: data.labels.map((_, i) => [i, data.values[i]]),
    symbolSize: 12,
    animationDelay: (idx: number) => idx * 50,
  }],
  ...option,
});

export default createScatterChart;
