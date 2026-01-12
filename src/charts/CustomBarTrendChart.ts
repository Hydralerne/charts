import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { defaultAnimation } from './types';

export interface CustomBarTrendSeriesOption {
  type: 'custom';
  renderItem?: Function;
}

const createCustomBarTrendChart = (
  data?: any,
  option?: Partial<EChartsOption>
): any => {
  // Check if we have real data from chartData (multi-dimensional)
  const hasRealData = data?.labels && data?.values && Array.isArray(data.values) && Array.isArray(data.values[0]);
  
  let yearCount = 7;
  let categoryCount = 30;
  let xAxisData: string[] = [];
  const customData: number[][] = [];
  const legendData: string[] = [];
  let dataList: number[][] = [];
  
  if (hasRealData) {
    // Use real data from chartData
    xAxisData = data.labels;
    categoryCount = data.labels.length;
    yearCount = data.values.length;
    dataList = data.values;
  } else {
    // Generate random data
    dataList = [];
  }
  
  legendData.push('trend');
  const encodeY: number[] = [];
  
  for (let i = 0; i < yearCount; i++) {
    legendData.push((2019 + i).toString());
    if (!hasRealData) {
      dataList.push([]);
    }
    encodeY.push(1 + i);
  }
  
  if (!hasRealData) {
    // Generate random data only if no real data provided
    for (let i = 0; i < categoryCount; i++) {
      const val = Math.random() * 1000;
      xAxisData.push('category' + i);
      const customVal: number[] = [i];
      customData.push(customVal);
      
      for (let j = 0; j < dataList.length; j++) {
        const value =
          j === 0
            ? echarts.number.round(val, 2)
            : echarts.number.round(
                Math.max(0, dataList[j - 1][i] + (Math.random() - 0.5) * 200),
                2
              );
        dataList[j].push(value);
        customVal.push(value);
      }
    }
  } else {
    // Build customData from real data
    for (let i = 0; i < categoryCount; i++) {
      const customVal: number[] = [i];
      for (let j = 0; j < yearCount; j++) {
        customVal.push(dataList[j][i]);
      }
      customData.push(customVal);
    }
  }
  
  return {
    ...defaultAnimation,
    animationDuration: 1000,
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: legendData,
      top: 20
    },
    dataZoom: [
      {
        type: 'slider',
        start: 50,
        end: 70
      },
      {
        type: 'inside',
        start: 50,
        end: 70
      }
    ],
    xAxis: {
      data: xAxisData
    },
    yAxis: {},
    series: [
      {
        type: 'custom',
        name: 'trend',
        renderItem: function (params: any, api: any) {
          const xValue = api.value(0);
          const currentSeriesIndices = api.currentSeriesIndices();
          const barLayout = api.barLayout({
            barGap: '30%',
            barCategoryGap: '20%',
            count: currentSeriesIndices.length - 1
          });
          const points = [];
          
          for (let i = 0; i < currentSeriesIndices.length; i++) {
            const seriesIndex = currentSeriesIndices[i];
            if (seriesIndex !== params.seriesIndex) {
              const point = api.coord([xValue, api.value(seriesIndex)]);
              point[0] += barLayout[i - 1].offsetCenter;
              point[1] -= 20;
              points.push(point);
            }
          }
          
          const style = api.style({
            stroke: api.visual('color'),
            fill: 'none'
          });
          
          return {
            type: 'polyline',
            shape: {
              points: points
            },
            style: style
          };
        },
        itemStyle: {
          borderWidth: 2
        },
        encode: {
          x: 0,
          y: encodeY
        },
        data: customData,
        z: 100
      },
      ...dataList.map(function (data, index) {
        return {
          type: 'bar',
          animation: false,
          name: legendData[index + 1],
          itemStyle: {
            opacity: 0.5
          },
          data: data
        };
      })
    ],
    ...option,
  };
};

export default createCustomBarTrendChart;
