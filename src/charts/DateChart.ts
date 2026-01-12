import type { EChartsOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

/**
 * Creates a date-based line chart with proper date formatting
 * 
 * Automatically converts timestamps, Date objects, or date strings to formatted labels
 * Format: "13/1/2026", "14/1/2026", etc.
 * 
 * Input data can be:
 * - Unix timestamps (milliseconds or seconds)
 * - JavaScript Date objects
 * - ISO date strings
 * - Any parseable date format
 * 
 * The data converter automatically handles conversion before rendering.
 */
const createDateChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => {
  return {
    ...defaultAnimation,
    title: {
      text: 'Date-Based Chart',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      formatter: (params: any) => {
        if (Array.isArray(params) && params.length > 0) {
          const param = params[0];
          return `${param.name}<br/>${param.seriesName}: ${param.value}`;
        }
        return '';
      },
    },
    xAxis: {
      type: 'category',
      data: data.labels,
      boundaryGap: false,
      axisLabel: {
        rotate: 45,
        fontSize: 11,
        formatter: (value: string) => value,
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}',
      },
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '15%',
      top: '15%',
      containLabel: true,
    },
    series: [
      {
        name: 'Value',
        type: 'line',
        data: data.values,
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
