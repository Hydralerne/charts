import type { EChartsOption, GraphSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { GraphSeriesOption };

const createGraphChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => {
  // Create nodes with sizes based on values
  const nodes = data.labels.map((name, i) => ({
    name,
    value: data.values[i],
    symbolSize: Math.sqrt(data.values[i]) * 2,
  }));

  // Create sample links between nodes
  const links = data.labels.slice(0, -1).map((_, i) => ({
    source: i,
    target: i + 1,
  }));

  return {
    ...defaultAnimation,
    tooltip: { trigger: 'item' },
    series: [{
      type: 'graph',
      layout: 'force',
      data: nodes,
      links,
      roam: true,
      label: {
        show: true,
        position: 'right',
        formatter: '{b}',
      },
      force: {
        repulsion: 100,
        edgeLength: 120,
      },
      emphasis: {
        focus: 'adjacency',
        lineStyle: { width: 3 },
      },
      animationDuration: 1500,
      animationEasingUpdate: 'quinticInOut',
    }],
    ...option,
  };
};

export default createGraphChart;
