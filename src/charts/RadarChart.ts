import type { EChartsOption, RadarSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { RadarSeriesOption };

const createRadarChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => {
  const maxValue = Math.max(...data.values) * 1.2;
  
  return {
    ...defaultAnimation,
    tooltip: { trigger: 'item' },
    radar: {
      indicator: data.labels.map((name) => ({ name, max: maxValue })),
      shape: 'circle',
      splitNumber: 5,
      splitArea: {
        areaStyle: {
          color: ['rgba(99, 102, 241, 0.05)', 'rgba(99, 102, 241, 0.1)'],
        },
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(99, 102, 241, 0.2)',
        },
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(99, 102, 241, 0.3)',
        },
      },
    },
    series: [{
      type: 'radar',
      data: [{
        value: data.values,
        name: 'Data',
        areaStyle: {
          color: 'rgba(99, 102, 241, 0.2)',
        },
        lineStyle: {
          width: 2,
          color: '#6366f1',
        },
        itemStyle: {
          color: '#6366f1',
        },
      }],
      animationDuration: 1200,
    }],
    ...option,
  };
};

export default createRadarChart;
