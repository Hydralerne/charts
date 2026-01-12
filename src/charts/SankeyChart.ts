import type { EChartsOption, SankeySeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { SankeySeriesOption };

const createSankeyChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => {
  // Create nodes from labels
  const nodes = data.labels.map((name) => ({ name }));
  
  // Generate sample links if not provided
  const links = data.labels.slice(0, -1).map((_, i) => ({
    source: data.labels[i],
    target: data.labels[i + 1],
    value: data.values[i],
  }));

  return {
    ...defaultAnimation,
    tooltip: { trigger: 'item' },
    series: [{
      type: 'sankey',
      data: nodes,
      links,
      emphasis: { focus: 'adjacency' },
      lineStyle: { color: 'gradient', curveness: 0.5 },
      animationDuration: 1500,
      animationEasing: 'cubicOut',
    }],
    ...option,
  };
};

export default createSankeyChart;
