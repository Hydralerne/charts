import type { EChartsOption, TreemapSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { TreemapSeriesOption };

const createTreemapChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => ({
  ...defaultAnimation,
  tooltip: { trigger: 'item', formatter: '{b}: {c}' },
  series: [{
    type: 'treemap',
    data: data.labels.map((name, i) => ({ name, value: data.values[i] })),
    roam: false,
    nodeClick: 'zoomToNode',
    breadcrumb: { show: true },
    label: {
      show: true,
      formatter: '{b}',
    },
    itemStyle: {
      borderColor: '#fff',
      borderWidth: 2,
      gapWidth: 2,
    },
    levels: [
      {
        itemStyle: {
          borderWidth: 0,
          gapWidth: 5,
        },
      },
      {
        itemStyle: {
          gapWidth: 1,
        },
      },
    ],
    animationDuration: 1000,
    animationEasing: 'quinticInOut',
  }],
  ...option,
});

export default createTreemapChart;
