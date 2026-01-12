import type { EChartsOption, MapSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { MapSeriesOption };

/**
 * Creates a geographic map chart visualization
 * 
 * Supports:
 * - World maps, country maps, region maps
 * - Choropleth (color-coded regions based on values)
 * - Interactive hover and zoom
 * - Custom map data via GeoJSON
 * 
 * Example usage:
 * ```ts
 * createMapChart(
 *   { labels: ['USA', 'China', 'Japan'], values: [100, 200, 150] },
 *   { 
 *     series: [{ map: 'world', roam: true }],
 *     visualMap: { min: 0, max: 500, inRange: { color: ['#e0f3f8', '#006d2c'] } }
 *   }
 * )
 * ```
 * 
 * Note: Map data (GeoJSON) must be registered with ECharts before use
 */
const createMapChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => ({
  ...defaultAnimation,
  title: {
    text: 'Geographic Distribution',
    left: 'center',
    top: 10,
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c}',
  },
  visualMap: {
    min: 0,
    max: Math.max(...data.values),
    text: ['High', 'Low'],
    realtime: false,
    calculable: true,
    inRange: {
      color: ['lightskyblue', 'yellow', 'orangered'],
    },
    left: 'left',
    bottom: 20,
  },
  series: [{
    type: 'map',
    map: 'world',
    roam: true,
    emphasis: {
      label: {
        show: true,
      },
      itemStyle: {
        areaColor: '#ffd700',
      },
    },
    data: data.labels.map((name, i) => ({ name, value: data.values[i] })),
    animationDuration: 1500,
    animationEasing: 'cubicOut',
  }],
  ...option,
});

export default createMapChart;
