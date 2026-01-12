import type { EChartsOption, ParallelSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { ParallelSeriesOption };

const createParallelChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => ({
  ...defaultAnimation,
  tooltip: { trigger: 'item' },
  parallelAxis: data.labels.map((name, dim) => ({
    dim,
    name,
    type: 'value',
    min: 0,
    max: Math.max(...data.values) * 1.2,
  })),
  parallel: {
    left: '10%',
    right: '13%',
    bottom: '10%',
    top: '10%',
    parallelAxisDefault: {
      type: 'value',
      nameLocation: 'end',
      nameGap: 20,
      splitNumber: 3,
      nameTextStyle: {
        fontSize: 12,
      },
      axisLine: {
        lineStyle: {
          color: '#aaa',
        },
      },
      axisTick: {
        lineStyle: {
          color: '#777',
        },
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        color: '#999',
      },
    },
  },
  series: [{
    type: 'parallel',
    lineStyle: {
      width: 2,
      opacity: 0.7,
    },
    data: [data.values],
    animationDuration: 1500,
  }],
  ...option,
});

export default createParallelChart;
