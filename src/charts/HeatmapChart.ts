import type { EChartsOption, HeatmapSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { HeatmapSeriesOption };

const createHeatmapChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => {
  const heatmapData = data.labels.flatMap((_, x) =>
    data.labels.map((_, y) => {
      const value = Math.floor(Math.random() * (data.values[y % data.values.length] || 100));
      return [x, y, value];
    })
  );

  return {
    ...defaultAnimation,
    tooltip: {
      position: 'top',
      formatter: (params: any) => {
        const [x, y, value] = params.data;
        return `${data.labels[x]} × ${data.labels[y]}<br/>Value: ${value}`;
      },
    },
    grid: {
      height: '50%',
      top: '10%',
    },
    xAxis: {
      type: 'category',
      data: data.labels,
      splitArea: { show: true },
    },
    yAxis: {
      type: 'category',
      data: data.labels,
      splitArea: { show: true },
    },
    visualMap: {
      min: 0,
      max: Math.max(...data.values),
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%',
      inRange: {
        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
      },
    },
    series: [{
      type: 'heatmap',
      data: heatmapData,
      label: {
        show: false,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
      animationDuration: 1500,
      animationDelay: (idx: number) => idx * 5,
    }],
    ...option,
  };
};

export default createHeatmapChart;
