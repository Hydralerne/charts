import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { defaultAnimation } from './types';

export interface CalendarHeatmapSeriesOption {
  type: 'heatmap';
  coordinateSystem: 'calendar';
  calendarIndex?: number;
}

/**
 * Generate virtual data for a given year
 */
function getVirtualData(year: string | number): [string, number][] {
  const date = +echarts.time.parse(year + '-01-01');
  const end = +echarts.time.parse(+year + 1 + '-01-01');
  const dayTime = 3600 * 24 * 1000;
  const data: [string, number][] = [];
  
  for (let time = date; time < end; time += dayTime) {
    data.push([
      echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
      Math.floor(Math.random() * 1000)
    ]);
  }
  
  return data;
}

const createCalendarHeatmapChart = (
  data: any,
  option?: Partial<EChartsOption>
): EChartsOption => {
  // Get current year and previous 2 years
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1, currentYear - 2];
  
  // Use provided data if available, otherwise generate random data
  const useProvidedData = data?.labels && Array.isArray(data.labels);
  
  return {
    ...defaultAnimation,
    animationDuration: 1000,
    tooltip: {
      position: 'top',
      formatter: function(params: any) {
        return params.value[0] + ': ' + params.value[1];
      }
    },
    visualMap: {
      min: 0,
      max: 1000,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      top: 'top'
    },
    calendar: [
      {
        range: years[0].toString(),
        cellSize: ['auto', 20]
      },
      {
        top: 260,
        range: years[1].toString(),
        cellSize: ['auto', 20]
      },
      {
        top: 450,
        range: years[2].toString(),
        cellSize: ['auto', 20],
        right: 5
      }
    ],
    series: [
      {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        calendarIndex: 0,
        data: useProvidedData && data.values[0] ? data.values[0] : getVirtualData(years[0])
      },
      {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        calendarIndex: 1,
        data: useProvidedData && data.values[1] ? data.values[1] : getVirtualData(years[1])
      },
      {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        calendarIndex: 2,
        data: useProvidedData && data.values[2] ? data.values[2] : getVirtualData(years[2])
      }
    ],
    ...option,
  };
};

export default createCalendarHeatmapChart;
