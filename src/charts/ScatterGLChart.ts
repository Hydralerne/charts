import type { EChartsOption } from 'echarts';
import { defaultAnimation } from './types';

export interface ScatterGLSeriesOption {
  type: 'scatterGL';
  coordinateSystem?: 'geo' | 'cartesian2d';
  symbolSize?: number;
  progressive?: number;
  large?: boolean;
  blendMode?: string;
  [key: string]: any;
}

/**
 * Generate random GPS coordinates for demonstration
 * In production, this would load real GPS data
 */
function generateGPSData(count: number): Float32Array {
  const data = new Float32Array(count * 2);
  
  for (let i = 0; i < count; i++) {
    // Generate random lat/lng with bias toward populated areas
    const lat = (Math.random() - 0.5) * 160; // -80 to 80
    const lng = (Math.random() - 0.5) * 360; // -180 to 180
    
    data[i * 2] = lng;
    data[i * 2 + 1] = lat;
  }
  
  return data;
}

const createScatterGLChart = (
  data?: any,
  option?: Partial<EChartsOption>
): any => {
  let gpsData: Float32Array;
  let pointCount: number;
  
  // Check if we have real GPS data from chartData
  // GPS data values are array of [lng, lat] pairs
  if (data?.values && Array.isArray(data.values) && data.values.length > 0 && Array.isArray(data.values[0])) {
    // Use real data - convert to Float32Array format
    const realPoints = data.values as number[][];
    pointCount = realPoints.length;
    gpsData = new Float32Array(pointCount * 2);
    
    for (let i = 0; i < realPoints.length; i++) {
      if (realPoints[i].length >= 2) {
        gpsData[i * 2] = realPoints[i][0];     // longitude
        gpsData[i * 2 + 1] = realPoints[i][1]; // latitude
      }
    }
  } else {
    // Generate demo data - using 100k points for demo
    pointCount = 100000;
    gpsData = generateGPSData(pointCount);
  }
  
  return {
    ...defaultAnimation,
    backgroundColor: '#000',
    title: {
      text: `${pointCount.toLocaleString()} GPS Points (Demo)`,
      left: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function(params: any) {
        if (params.value) {
          return `Lat: ${params.value[1]?.toFixed(4)}<br/>Lng: ${params.value[0]?.toFixed(4)}`;
        }
        return 'GPS Point';
      }
    },
    geo: {
      map: 'world',
      roam: true,
      label: {
        emphasis: {
          show: false
        }
      },
      silent: true,
      itemStyle: {
        normal: {
          areaColor: '#323c48',
          borderColor: '#111'
        },
        emphasis: {
          areaColor: '#2a333d'
        }
      }
    },
    series: [
      {
        name: 'GPS Points',
        type: 'scatterGL',
        progressive: 1e6,
        coordinateSystem: 'geo',
        symbolSize: 1,
        zoomScale: 0.002,
        blendMode: 'lighter',
        large: true,
        itemStyle: {
          color: 'rgb(255, 70, 131)'
        },
        postEffect: {
          enable: true
        },
        silent: true,
        dimensions: ['lng', 'lat'],
        data: gpsData
      }
    ],
    ...option,
  };
};

export default createScatterGLChart;
