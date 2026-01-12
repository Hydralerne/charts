import type { EChartsOption, PieSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { PieSeriesOption };

const createNightingaleChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => ({
  ...defaultAnimation,
  animationDuration: 1000,
  animationEasing: 'cubicOut',
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  series: [{
    name: 'Nightingale',
    type: 'pie',
    radius: [30, 130],
    center: ['50%', '50%'],
    roseType: 'area', // 'radius' or 'area'
    itemStyle: {
      borderRadius: 5
    },
    label: {
      show: true
    },
    emphasis: {
      label: {
        show: true
      }
    },
    data: data.labels.map((name, i) => ({ 
      name, 
      value: data.values[i] 
    })),
    animationType: 'scale',
    animationEasing: 'elasticOut',
  }],
  ...option,
});

export default createNightingaleChart;
