import type { EChartsOption, GaugeSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { GaugeSeriesOption };

const createGradeGaugeChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => {
  // Use the first value, normalize to 0-1 range if needed
  const value = data.values[0];
  const normalizedValue = value > 1 ? value / 100 : value;
  const name = data.labels[0] || 'Grade Rating';

  return {
    ...defaultAnimation,
    animationDuration: 1500,
    animationEasing: 'elasticOut',
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        center: ['50%', '75%'],
        radius: '90%',
        min: 0,
        max: 1,
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.25, '#FF6E76'],
              [0.5, '#FDDD60'],
              [0.75, '#58D9F9'],
              [1, '#7CFFB2']
            ]
          }
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 20,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: 'auto',
            width: 2
          }
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: 'auto',
            width: 5
          }
        },
        axisLabel: {
          color: '#464646',
          fontSize: 20,
          distance: -60,
          rotate: 'tangential',
          formatter: function (value: number) {
            if (value === 0.875) {
              return 'Grade A';
            } else if (value === 0.625) {
              return 'Grade B';
            } else if (value === 0.375) {
              return 'Grade C';
            } else if (value === 0.125) {
              return 'Grade D';
            }
            return '';
          }
        },
        title: {
          offsetCenter: [0, '-10%'],
          fontSize: 20
        },
        detail: {
          fontSize: 30,
          offsetCenter: [0, '-35%'],
          valueAnimation: true,
          formatter: function (value: number) {
            return Math.round(value * 100) + '';
          },
          color: 'inherit'
        },
        data: [
          {
            value: normalizedValue,
            name: name
          }
        ]
      }
    ],
    ...option,
  };
};

export default createGradeGaugeChart;
