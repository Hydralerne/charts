import type { EChartsOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

/**
 * REAL Pie Charts on Map
 * 
 * Shows ACTUAL pie chart slices at geographic locations
 * Uses coordinateSystem: 'geo' (ECharts native feature since v5.4+)
 * 
 * ACCEPTS STANDARD ChartData FORMAT:
 * {
 *   labels: ['New York', 'London', 'Tokyo'],  // Cities/locations/coordinates
 *   values: [8500, 9000, 14000]               // Total values
 * }
 * 
 * Middleware converts to:
 * - Multiple pie series (one per location)
 * - Each pie at geo coordinates [lng, lat]
 * - Category breakdown: Tech, Finance, Healthcare, Other
 * - Pie size based on total value
 * 
 * Features:
 * ✅ Real pie chart slices (not bubbles!)
 * ✅ Zooms perfectly with map
 * ✅ Native ECharts behavior
 */
const createPieMapChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => {
  // Middleware adds 'pieSeries' and 'categories' to data
  const convertedData = data as any;

  return {
    ...defaultAnimation,
    title: {
      text: 'Category Distribution by Location',
      left: 'center',
      top: 10,
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a}<br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'middle',
      data: convertedData.categories || [],
    },
    geo: {
      map: 'world',
      roam: true,
      itemStyle: {
        areaColor: '#e7e8ea',
        borderColor: '#999',
      },
      emphasis: {
        label: { show: false },
        itemStyle: {
          areaColor: '#d0d1d3',
        },
      },
    },
    series: convertedData.pieSeries || [],
    ...option,
  };
};

export default createPieMapChart;
