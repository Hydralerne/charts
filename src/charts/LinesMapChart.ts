import type { EChartsOption, LinesSeriesOption } from 'echarts';
import { defaultAnimation } from './types';
import { locationToCoordinate, toEChartsCoord } from '../utils/mapDataTypes';

export type { LinesSeriesOption };

/**
 * Creates a lines/flow map chart
 * 
 * Shows connections/flows between locations (migration, traffic, trade routes)
 * Perfect for: migration patterns, trade routes, network connections
 * 
 * Uses native ECharts lines series with geo coordinate system
 */
const createLinesMapChart = (
  data: {
    routes: Array<{
      from: [number, number] | string;  // [lng, lat] or city/country name
      to: [number, number] | string;    // [lng, lat] or city/country name
      value: number;
      name?: string;  // Optional route name
    }>;
  },
  option?: Partial<EChartsOption>
): EChartsOption => {
  // Convert locations to coordinates
  const processedRoutes = data.routes.map(route => {
    let fromCoord: [number, number];
    let toCoord: [number, number];

    // Handle 'from' location
    if (typeof route.from === 'string') {
      const coord = locationToCoordinate(route.from);
      fromCoord = coord ? toEChartsCoord(coord) : [0, 0];
    } else {
      fromCoord = route.from;
    }

    // Handle 'to' location
    if (typeof route.to === 'string') {
      const coord = locationToCoordinate(route.to);
      toCoord = coord ? toEChartsCoord(coord) : [0, 0];
    } else {
      toCoord = route.to;
    }

    return {
      coords: [fromCoord, toCoord] as number[][],
      value: route.value,
      name: route.name,
    };
  }).filter(route => route.coords[0][0] !== 0 && route.coords[1][0] !== 0);

  return {
    ...defaultAnimation,
    title: {
      text: 'Flow Map',
      left: 'center',
      top: 10,
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        if (params.seriesType === 'lines') {
          const name = params.name || 'Flow';
          return `${name}<br/>Value: ${params.value || params.data.value}`;
        }
        return params.name;
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
        type: 'lines',
        coordinateSystem: 'geo',
        data: processedRoutes,
        lineStyle: {
          color: '#3b82f6',
          width: 2,
          opacity: 0.6,
          curveness: 0.2,
        },
        effect: {
          show: true,
          period: 4,
          symbolSize: 6,
          color: '#ef4444',
          trailLength: 0.1,
        },
        emphasis: {
          lineStyle: {
            width: 4,
            opacity: 1,
          },
        },
        zlevel: 2,
      },
    ],
    ...option,
  };
};

export default createLinesMapChart;
