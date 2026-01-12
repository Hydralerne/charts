import type { EChartsOption, BoxplotSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { BoxplotSeriesOption };

const createBoxplotChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => {
  // Generate boxplot data [min, Q1, median, Q3, max]
  const boxplotData = data.labels.map((_, i) => {
    const val = data.values[i];
    const spread = val * 0.2;
    return [
      val - spread * 2,      // min
      val - spread,          // Q1
      val,                   // median
      val + spread,          // Q3
      val + spread * 2,      // max
    ];
  });

  return {
    ...defaultAnimation,
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const [min, q1, median, q3, max] = params.data;
        return `${params.name}<br/>
          Max: ${max.toFixed(2)}<br/>
          Q3: ${q3.toFixed(2)}<br/>
          Median: ${median.toFixed(2)}<br/>
          Q1: ${q1.toFixed(2)}<br/>
          Min: ${min.toFixed(2)}`;
      },
    },
    xAxis: {
      type: 'category',
      data: data.labels,
      boundaryGap: true,
      splitArea: { show: true },
    },
    yAxis: {
      type: 'value',
      splitArea: { show: true },
    },
    series: [{
      type: 'boxplot',
      data: boxplotData,
      itemStyle: {
        borderColor: '#5470c6',
        borderWidth: 1.5,
        color: 'rgba(84, 112, 198, 0.2)',
      },
      animationDuration: 1000,
      animationDelay: (idx: number) => idx * 100,
    }],
    ...option,
  };
};

export default createBoxplotChart;
