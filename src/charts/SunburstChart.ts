import type { EChartsOption, SunburstSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { SunburstSeriesOption };

const createSunburstChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => ({
  ...defaultAnimation,
  tooltip: { trigger: 'item' },
  series: [{
    type: 'sunburst',
    data: data.labels.map((name, i) => ({
      name,
      value: data.values[i],
      itemStyle: {
        borderRadius: 7,
        borderWidth: 2,
      },
    })),
    radius: [0, '100%'],
    center: ['50%', '50%'],
    label: {
      rotate: 'radial',
      fontSize: 12,
    },
    itemStyle: {
      borderRadius: 7,
      borderWidth: 2,
      borderColor: '#fff',
    },
    emphasis: {
      focus: 'ancestor',
    },
      levels: [
        {},
        {
          r0: '20%',
          r: '45%',
          itemStyle: { borderWidth: 2 },
          label: { rotate: 'tangential', fontSize: 14 },
        },
        {
          r0: '45%',
          r: '85%',
          label: { align: 'right', fontSize: 12 },
        },
        {
          r0: '85%',
          r: '100%',
          label: { position: 'outside', padding: 3, silent: false, fontSize: 12 },
          itemStyle: { borderWidth: 3 },
        },
      ],
    animationDuration: 1500,
    animationDurationUpdate: 500,
  }],
  ...option,
});

export default createSunburstChart;
