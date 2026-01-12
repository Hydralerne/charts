# ECharts Gallery

A production-ready, enterprise-grade React + TypeScript chart library built on ECharts with 30+ chart types.

## 🎯 Features

- **30+ Chart Types**: Comprehensive collection covering all visualization needs
- **Clean Architecture**: Thin abstraction layer over ECharts native API
- **Fully Typed**: Complete TypeScript support with ECharts native types
- **Zero Learning Curve**: Use ECharts documentation directly
- **Highly Customizable**: Pass any ECharts option to override defaults
- **Production Ready**: Software architect-level code quality

## 📦 Installation

```bash
npm install
npm run dev
```

## 🚀 Quick Start

```tsx
import ChartView from './components/ChartView';

// Simple usage
<ChartView 
  type="bar" 
  data={{ labels: ['A', 'B', 'C'], values: [10, 20, 30] }} 
/>

// With custom ECharts options
<ChartView 
  type="line" 
  data={data}
  option={{
    title: { text: 'Sales Trend', textStyle: { color: '#333' } },
    series: [{ smooth: true, itemStyle: { color: 'red' } }],
    grid: { left: '10%', right: '10%' }
  }}
/>
```

## 📊 Available Charts (30+)

### Basic Charts
- `bar` - Horizontal bar chart
- `column` - Vertical column chart
- `line` - Line chart for trends
- `area` - Area chart with filled regions
- `pie` - Pie chart for proportions
- `donut` - Donut chart (pie with center hole)

### Stacked Variants
- `stackedBar` - Stacked horizontal bars
- `stackedColumn` - Stacked columns
- `stackedLine` - Stacked line chart
- `stackedArea` - Stacked area chart

### Scatter & Bubble
- `scatter` - Scatter plot for correlations
- `bubble` - Bubble chart (3D: x, y, size)

### Circular Charts
- `sunburst` - Multi-level hierarchical circles
- `radar` - Radar/spider chart

### Hierarchical
- `treemap` - Hierarchical rectangles

### Flow & Network
- `sankey` - Flow diagram
- `graph` - Network/relationship graph

### Statistical
- `boxplot` - Box plot for distributions
- `heatmap` - 2D color intensity map
- `parallel` - Parallel coordinates

### Financial & Process
- `candlestick` - OHLC candlestick chart
- `funnel` - Funnel chart for processes
- `gauge` - Gauge for single metrics
- `waterfall` - Waterfall chart for sequential changes

### Combination Charts
- `combo` - Column + Line combination
- `dualAxis` - Dual Y-axis chart

### Geographic
- `map` - Geographic map visualization

### Advanced
- `themeRiver` - Theme river chart
- `custom` - Custom rendering

## 🏗️ Architecture

### Project Structure

```
src/charts/
├── types.ts                  # Core types (minimal)
├── BarChart.ts              # ~15 lines each
├── LineChart.ts
├── ... (30+ chart files)
└── index.ts                 # Registry + exports

src/components/
└── ChartView.tsx            # Universal chart component

src/
└── App.tsx                  # Demo/Gallery page
```

### Design Principles

1. **Thin Abstraction** - Each chart file is ~15 lines
2. **No Custom Config** - Use ECharts' native types
3. **Single Responsibility** - One file, one chart type
4. **Open/Closed** - Easy to extend, no modifications needed

### Each Chart File

```typescript
import type { EChartsOption, BarSeriesOption } from 'echarts';
import type { ChartData } from './types';

export type { BarSeriesOption };

const createBarChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => ({
  xAxis: { type: 'category', data: data.labels },
  yAxis: { type: 'value' },
  series: [{ type: 'bar', data: data.values }],
  ...option,  // User can override anything
});

export default createBarChart;
```

## 💡 Usage Examples

### Direct Import

```tsx
import { createBarChart, BarSeriesOption } from './charts';

const option = createBarChart(
  { labels: ['A', 'B'], values: [10, 20] },
  {
    title: { text: 'Sales' },
    series: [{ itemStyle: { color: 'blue' } }]
  }
);
```

### Dynamic Type Selection

```tsx
import { charts } from './charts';

const chartType = 'line'; // from user selection
const option = charts[chartType](data, customOptions);
```

### Full Customization

```tsx
<ChartView 
  type="combo"
  data={data}
  option={{
    xAxis: { type: 'category', data: labels },
    yAxis: [
      { type: 'value', name: 'Sales' },
      { type: 'value', name: 'Growth %' }
    ],
    series: [
      { 
        type: 'bar', 
        data: salesData,
        itemStyle: { color: '#5470c6' },
        yAxisIndex: 0
      },
      { 
        type: 'line', 
        data: growthData,
        smooth: true,
        itemStyle: { color: '#91cc75' },
        yAxisIndex: 1
      }
    ]
  }}
/>
```

## 🎨 Customization

### Colors & Styling

No hardcoded styles - customize via options:

```tsx
<ChartView 
  type="bar"
  data={data}
  option={{
    series: [{
      itemStyle: {
        color: '#ff6384',
        borderRadius: [5, 5, 0, 0]
      }
    }]
  }}
/>
```

### Tooltips

```tsx
option={{
  tooltip: {
    trigger: 'axis',
    formatter: '{b}: {c}',
    backgroundColor: 'rgba(0,0,0,0.7)',
    textStyle: { color: '#fff' }
  }
}}
```

### Legends

```tsx
option={{
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['Series 1', 'Series 2']
  }
}}
```

## 🔧 Extending

### Adding a New Chart Type

1. Create chart file:

```typescript
// src/charts/MyNewChart.ts
import type { EChartsOption, MySeriesOption } from 'echarts';
import type { ChartData } from './types';

export type { MySeriesOption };

const createMyNewChart = (
  data: ChartData,
  option?: Partial<EChartsOption>
): EChartsOption => ({
  // Your chart config
  series: [{ type: 'myType', data: data.values }],
  ...option,
});

export default createMyNewChart;
```

2. Update `types.ts`:

```typescript
export type ChartType = 
  | 'bar'
  | 'myNewChart'  // Add here
  | ...;
```

3. Update `index.ts`:

```typescript
export { default as createMyNewChart } from './MyNewChart';
export type { MySeriesOption } from './MyNewChart';

export const charts = {
  // ...
  myNewChart: createMyNewChart,
};
```

That's it! ✅

## 📚 Documentation

Each chart uses ECharts native options. Refer to:
- [ECharts Documentation](https://echarts.apache.org/en/option.html)
- [ECharts Examples](https://echarts.apache.org/examples/en/index.html)

## 🏆 Why This Architecture?

### ✅ What We Did Right

1. **No Abstraction Overhead** - Direct ECharts API access
2. **Type Safety** - Full TypeScript support
3. **Minimal Code** - Each chart ~15 lines
4. **Zero Learning Curve** - Use ECharts docs directly
5. **Maximum Flexibility** - Override anything via options
6. **Clean Separation** - Data transformation ≠ styling
7. **Easy to Extend** - Add chart = add one file

### ❌ What We Avoided

1. ~~Custom config types wrapping ECharts~~
2. ~~Hardcoded colors/styles~~
3. ~~Complex component hierarchies~~
4. ~~Mixing data logic with styling~~
5. ~~Opinionated abstractions~~

## 📄 License

MIT

---

**Built with ❤️ using Software Architecture Best Practices**
