import type { EChartsOption, BarSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { BarSeriesOption as WaterfallSeriesOption };

const createWaterfallChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => {
  // Calculate waterfall data with helpers, positive, and negative
  const help: (number | string)[] = [];
  const positive: (number | string)[] = [];
  const negative: (number | string)[] = [];
  let sum = 0;

  for (let i = 0; i < data.values.length; i++) {
    const val = data.values[i];
    
    if (val >= 0) {
      positive.push(val);
      negative.push('-');
    } else {
      positive.push('-');
      negative.push(-val);
    }

    if (i === 0) {
      help.push(0);
    } else {
      sum += data.values[i - 1];
      help.push(sum);
    }
  }

  return {
    ...defaultAnimation,
    xAxis: { type: 'category', data: data.labels },
    yAxis: { type: 'value' },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    series: [
      {
        name: 'Helper',
        type: 'bar',
        stack: 'Total',
        itemStyle: { color: 'transparent' },
        emphasis: { itemStyle: { color: 'transparent' } },
        data: help,
      },
      {
        name: 'Increase',
        type: 'bar',
        stack: 'Total',
        data: positive,
        itemStyle: { color: '#91cc75' },
        animationDelay: (idx: number) => idx * 80,
      },
      {
        name: 'Decrease',
        type: 'bar',
        stack: 'Total',
        data: negative,
        itemStyle: { color: '#ee6666' },
        animationDelay: (idx: number) => idx * 80,
      },
    ],
    ...option,
  };
};

export default createWaterfallChart;
