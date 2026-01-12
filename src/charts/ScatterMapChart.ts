import type { EChartsOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';
import { convertToMapData, mapDataToEChartsSeries } from '../utils/mapDataTypes';

/**
 * Creates a scatter map chart
 * 
 * Points plotted on map by coordinates (lat/lng) or location names
 * Perfect for: store locations, user distribution, event locations
 */
const createScatterMapChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => {
  const mapPoints = convertToMapData(data);
  const scatterData = mapDataToEChartsSeries(mapPoints, 'scatter');

  return {
    ...defaultAnimation,
    title: {
      text: 'Geographic Scatter',
      left: 'center',
      top: 10,
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        if (params.seriesType === 'scatter') {
          return `${params.name}<br/>Value: ${params.value[2]}`;
        }
        return `${params.name}`;
      },
    },
    geo: {
      map: 'world',
      roam: true,
      itemStyle: {
        areaColor: '#f3f3f3',
        borderColor: '#999',
      },
      emphasis: {
        itemStyle: {
          areaColor: '#e0e0e0',
        },
      },
    },
    series: [
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        data: scatterData,
        symbolSize: (val: any) => {
          // Size based on value
          return Math.max(8, Math.min(val[2] / 10, 40));
        },
        itemStyle: {
          color: '#3b82f6',
          opacity: 0.8,
        },
        emphasis: {
          itemStyle: {
            color: '#ef4444',
            opacity: 1,
          },
        },
      },
    ],
    ...option,
  };
};

export default createScatterMapChart;
