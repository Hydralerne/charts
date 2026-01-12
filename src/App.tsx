import { useState } from 'react';
import ChartView from './components/ChartView';
import type { ChartType, ThemeType, AnimationType } from './charts';

const chartData: Record<string, { labels: string[]; values: number[] }> = {
  default: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [120, 200, 150, 80, 70, 110, 130],
  },
  sales: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    values: [45000, 52000, 48000, 61000],
  },
  products: {
    labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    values: [335, 234, 548, 178, 412],
  },
  metrics: {
    labels: ['Speed', 'Quality', 'Cost', 'Efficiency', 'Satisfaction', 'Innovation'],
    values: [85, 92, 78, 88, 95, 82],
  },
  months: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    values: [820, 932, 901, 934, 1290, 1330, 1320, 1420, 1350, 1200, 1100, 1380],
  },
  waterfall: {
    labels: ['Start', 'Revenue', 'Costs', 'Profit', 'Tax', 'Net'],
    values: [1000, 500, -300, 200, -150, 250],
  },
  gauge: {
    labels: ['Performance'],
    values: [78],
  },
};

const showcaseCharts: Array<{ type: ChartType; dataKey: string }> = [
  { type: 'bar', dataKey: 'products' },
  { type: 'column', dataKey: 'sales' },
  { type: 'line', dataKey: 'months' },
  { type: 'area', dataKey: 'months' },
  { type: 'pie', dataKey: 'products' },
  { type: 'donut', dataKey: 'products' },
  { type: 'scatter', dataKey: 'default' },
  { type: 'bubble', dataKey: 'default' },
  { type: 'radar', dataKey: 'metrics' },
  { type: 'gauge', dataKey: 'gauge' },
  { type: 'funnel', dataKey: 'products' },
  { type: 'heatmap', dataKey: 'default' },
  { type: 'stackedBar', dataKey: 'sales' },
  { type: 'stackedColumn', dataKey: 'sales' },
  { type: 'stackedArea', dataKey: 'months' },
  { type: 'stackedLine', dataKey: 'months' },
  { type: 'waterfall', dataKey: 'waterfall' },
  { type: 'candlestick', dataKey: 'default' },
  { type: 'treemap', dataKey: 'products' },
  { type: 'sunburst', dataKey: 'products' },
  { type: 'boxplot', dataKey: 'default' },
  { type: 'combo', dataKey: 'months' },
  { type: 'dualAxis', dataKey: 'months' },
  { type: 'parallel', dataKey: 'default' },
];

type LayoutType = 'grid' | 'list' | 'compact' | 'masonry';

const layouts: { id: LayoutType; label: string; icon: React.ReactNode }[] = [
  {
    id: 'grid',
    label: 'Grid',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    id: 'list',
    label: 'List',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    id: 'compact',
    label: 'Compact',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM14 4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V4zM2 10a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2zM8 10a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1v-2zM14 10a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2zM2 16a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2zM8 16a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1v-2zM14 16a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z" />
      </svg>
    ),
  },
  {
    id: 'masonry',
    label: 'Masonry',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 3a1 1 0 011-1h5a1 1 0 011 1v9a1 1 0 01-1 1H3a1 1 0 01-1-1V3zM11 2a1 1 0 011 1v5a1 1 0 01-1 1h-5a1 1 0 01-1-1V3a1 1 0 011-1h5zM11 10a1 1 0 00-1 1v5a1 1 0 001 1h5a1 1 0 001-1v-5a1 1 0 00-1-1h-5zM2 15a1 1 0 011-1h5a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2z" />
      </svg>
    ),
  },
];

function App() {
  const [theme, setTheme] = useState<ThemeType>('light');
  const [layout, setLayout] = useState<LayoutType>('grid');
  const animation: AnimationType = 'default';

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const isDark = theme === 'dark';

  const getGridClasses = () => {
    switch (layout) {
      case 'grid':
        return 'grid grid-cols-1 lg:grid-cols-2 gap-6';
      case 'list':
        return 'flex flex-col gap-6';
      case 'compact':
        return 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4';
      case 'masonry':
        return 'columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6';
      default:
        return 'grid grid-cols-1 lg:grid-cols-2 gap-6';
    }
  };

  const getCardClasses = () => {
    const base = `rounded-2xl overflow-hidden transition-all duration-200 ${isDark ? 'bg-zinc-900 border border-zinc-800 hover:border-zinc-600' : 'bg-white border border-zinc-200 hover:border-zinc-400'} hover:shadow-xl`;
    
    switch (layout) {
      case 'list':
        return `${base} flex flex-row items-center`;
      case 'compact':
        return base;
      case 'masonry':
        return `${base} break-inside-avoid mb-6`;
      default:
        return base;
    }
  };

  const getChartHeight = () => {
    switch (layout) {
      case 'list':
        return 350;
      case 'compact':
        return 280;
      case 'masonry':
        return 400;
      default:
        return 450;
    }
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-200 ${isDark ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 w-full backdrop-blur-lg border-b transition-colors duration-200 ${isDark ? 'bg-zinc-950/90 border-zinc-800' : 'bg-white/90 border-zinc-200'}`}>
        <div className="w-full max-w-[1920px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div>
                <h1 className={`text-lg font-semibold tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                  Charts
                </h1>
                <p className={`text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  {showcaseCharts.length} visualizations
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Layout Switcher */}
              <div className={`flex items-center rounded-xl p-1 ${isDark ? 'bg-zinc-900' : 'bg-zinc-100'}`}>
                {layouts.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLayout(l.id)}
                    title={l.label}
                    className={`p-2 rounded-lg transition-all duration-200 ${layout === l.id
                      ? isDark
                        ? 'bg-zinc-700 text-white'
                        : 'bg-white text-zinc-900 shadow-sm'
                      : isDark
                        ? 'text-zinc-500 hover:text-zinc-300'
                        : 'text-zinc-400 hover:text-zinc-600'
                    }`}
                  >
                    {l.icon}
                  </button>
                ))}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2.5 rounded-xl transition-all duration-200 ${isDark ? 'bg-zinc-900 text-zinc-400 hover:text-white' : 'bg-zinc-100 text-zinc-500 hover:text-zinc-900'}`}
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-[1920px] mx-auto px-6 py-8">
        <div className={getGridClasses()}>
          {showcaseCharts.map(({ type, dataKey }, index) => (
            <div key={type} className={getCardClasses()}>
              {layout === 'list' ? (
                <>
                  {/* List Layout */}
                  <div className={`shrink-0 w-48 p-5 border-r ${isDark ? 'border-zinc-800' : 'border-zinc-100'}`}>
                    <span className={`text-xs font-medium ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                    <h2 className={`text-lg font-semibold capitalize mt-1 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                      {type.replace(/([A-Z])/g, ' $1').trim()}
                    </h2>
                    <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs ${isDark ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-500'}`}>
                      {dataKey}
                    </span>
                  </div>
                  <div className="flex-1 p-4 h-[350px]">
                    <ChartView
                      type={type}
                      data={chartData[dataKey]}
                      animation={animation}
                      theme={theme}
                      style={{ height: '100%', width: '100%' }}
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Other Layouts */}
                  <div className={`px-5 pt-4 pb-3 flex items-center justify-between ${layout !== 'compact' ? `border-b ${isDark ? 'border-zinc-800' : 'border-zinc-100'}` : ''}`}>
                    <h2 className={`${layout === 'compact' ? 'text-sm' : 'text-base'} font-semibold capitalize ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                      {type.replace(/([A-Z])/g, ' $1').trim()}
                    </h2>
                    {layout !== 'compact' && (
                      <span className={`px-2 py-0.5 rounded text-xs ${isDark ? 'bg-zinc-800 text-zinc-500' : 'bg-zinc-100 text-zinc-500'}`}>
                        {dataKey}
                      </span>
                    )}
                  </div>
                  <div className="p-4" style={{ height: getChartHeight() }}>
                    <ChartView
                      type={type}
                      data={chartData[dataKey]}
                      animation={animation}
                      theme={theme}
                      style={{ height: '100%', width: '100%' }}
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
