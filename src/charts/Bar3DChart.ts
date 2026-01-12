import type { EChartsOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

// Note: This chart requires echarts-gl extension
export interface Bar3DSeriesOption {
  type: 'bar3D';
  shading?: 'color' | 'lambert' | 'realistic';
  encode?: {
    x?: string | number;
    y?: string | number;
    z?: string | number;
    tooltip?: (string | number)[];
  };
  [key: string]: any; // Allow additional echarts-gl specific properties
}

const createBar3DChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): any => {
  // Create a simple 3D bar chart from ChartData format
  // For more complex datasets, users can pass custom options
  // Note: Return type is 'any' due to echarts-gl type limitations
  
  const chartData = data.labels.map((label, i) => ({
    name: label,
    value: [i, 0, data.values[i]]
  }));

  return {
    ...defaultAnimation,
    animationDuration: 1500,
    grid3D: {
      boxWidth: 200,
      boxDepth: 80,
      viewControl: {
        // projection: 'orthographic'
      },
      light: {
        main: {
          intensity: 1.2,
          shadow: true
        },
        ambient: {
          intensity: 0.3
        }
      }
    },
    tooltip: {},
    xAxis3D: {
      type: 'category',
      data: data.labels
    },
    yAxis3D: {
      type: 'category',
      data: ['']
    },
    zAxis3D: {
      type: 'value'
    },
    series: [
      {
        type: 'bar3D',
        data: chartData,
        shading: 'lambert',
        label: {
          fontSize: 16,
          borderWidth: 1
        },
        itemStyle: {
          opacity: 0.8
        },
        emphasis: {
          label: {
            fontSize: 20,
            color: '#900'
          },
          itemStyle: {
            color: '#900'
          }
        }
      }
    ],
    ...option,
  };
};

export default createBar3DChart;
