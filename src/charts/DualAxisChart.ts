import type { EChartsOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

const createDualAxisChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => ({
  ...defaultAnimation,
  xAxis: { type: 'category', data: data.labels },
  yAxis: [
    { type: 'value' },
    { type: 'value' },
  ],
  series: [
    { 
      type: 'bar', 
      data: data.values, 
      yAxisIndex: 0,
      animationDelay: (idx: number) => idx * 80,
    },
    { 
      type: 'line', 
      data: data.values.map(v => v * 0.8), 
      yAxisIndex: 1,
      smooth: true,
      animationDuration: 1500,
    },
  ],
  ...option,
});

export default createDualAxisChart;
