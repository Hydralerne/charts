import type { EChartsOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

const createDateChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => {
  return {
    ...defaultAnimation,
    title: {
      text: 'Time Series',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    xAxis: {
      type: 'time',
    },
    yAxis: {
      type: 'value',
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '15%',
      top: '15%',
      containLabel: true,
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
      },
      {
        type: 'slider',
        start: 0,
        end: 100,
        height: 20,
      },
    ],
    series: [
      {
        name: 'Value',
        type: 'line',
        data: data.labels.map((label, i) => [label, data.values[i]]),
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          width: 2,
        },
        areaStyle: {
          opacity: 0.3,
        },
      },
    ],
    ...option,
  };
};

export default createDateChart;
