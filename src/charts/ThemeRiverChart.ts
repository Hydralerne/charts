import type { EChartsOption, ThemeRiverSeriesOption } from 'echarts';
import type { ChartData } from './types';
import { defaultAnimation } from './types';

export type { ThemeRiverSeriesOption };

const createThemeRiverChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => ({
  ...defaultAnimation,
  series: [{
    type: 'themeRiver',
    data: data.labels.map((name, i) => [i, data.values[i], name]),
    animationDuration: 1500,
  }],
  ...option,
});

export default createThemeRiverChart;
