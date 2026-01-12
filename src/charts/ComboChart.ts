import type { EChartsOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

const createComboChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => ({
  ...defaultAnimation,
  xAxis: { type: 'category', data: data.labels },
  yAxis: { type: 'value' },
  series: [
    { 
      type: 'bar', 
      data: data.values,
      animationDelay: (idx: number) => idx * 80,
    },
    { 
      type: 'line', 
      data: data.values,
      smooth: true,
      animationDuration: 1500,
    },
  ],
  ...option,
});

export default createComboChart;
