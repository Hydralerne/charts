import { useState } from 'react';
import ChartView from './components/ChartView';
import type { ThemeType, AnimationType } from './charts';
import { chartData } from './data/chartData';
import { showcaseCharts } from './data/showcaseCharts';
import { layouts, type LayoutType } from './data/layouts.tsx';

function App() {
  const [theme, setTheme] = useState<ThemeType>('light');
  const [layout, setLayout] = useState<LayoutType>('grid');
  const animation: AnimationType = 'default';

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  const isDark = theme === 'dark';

  const getGridClasses = () => {
    switch (layout) {
      case 'grid': return 'grid grid-cols-1 lg:grid-cols-2 gap-6';
      case 'list': return 'flex flex-col gap-6';
      case 'compact': return 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4';
      case 'masonry': return 'columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6';
      default: return 'grid grid-cols-1 lg:grid-cols-2 gap-6';
    }
  };

  const getCardClasses = () => {
    const base = `rounded-2xl overflow-hidden transition-all duration-200 ${isDark ? 'bg-zinc-900 border border-zinc-800 hover:border-zinc-600' : 'bg-white border border-zinc-200 hover:border-zinc-400'} hover:shadow-xl`;
    switch (layout) {
      case 'list': return `${base} flex flex-row items-center`;
      case 'compact': return base;
      case 'masonry': return `${base} break-inside-avoid mb-6`;
      default: return base;
    }
  };

  const getChartHeight = () => {
    switch (layout) {
      case 'list': return 350;
      case 'compact': return 280;
      case 'masonry': return 400;
      default: return 450;
    }
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-200 ${isDark ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
      <header className={`sticky top-0 z-50 w-full backdrop-blur-lg border-b transition-colors duration-200 ${isDark ? 'bg-zinc-950/90 border-zinc-800' : 'bg-white/90 border-zinc-200'}`}>
        <div className="w-full max-w-[1920px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
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

            <div className="flex items-center gap-3">
              <div className={`flex items-center rounded-xl p-1 ${isDark ? 'bg-zinc-900' : 'bg-zinc-100'}`}>
                {layouts.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLayout(l.id)}
                    title={l.label}
                    className={`p-2 rounded-lg transition-all duration-200 ${layout === l.id
                      ? isDark ? 'bg-zinc-700 text-white' : 'bg-white text-zinc-900 shadow-sm'
                      : isDark ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-400 hover:text-zinc-600'
                      }`}
                  >
                    {l.icon}
                  </button>
                ))}
              </div>

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

      <main className="w-full max-w-[1920px] mx-auto px-6 py-8">
        <div className={getGridClasses()}>
          {showcaseCharts.map(({ type, dataKey, timeXAxis, timeYAxis, numberFormat, decimalPlaces }, index) => (
            <div key={`${type}-${dataKey}-${index}`} className={getCardClasses()}>
              {layout === 'list' ? (
                <>
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
                      timeXAxis={timeXAxis}
                      timeYAxis={timeYAxis}
                      numberFormat={numberFormat}
                      decimalPlaces={decimalPlaces}
                      animation={animation}
                      theme={theme}
                      style={{ height: '100%', width: '100%' }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className={`px-5 pt-4 pb-3 flex items-center justify-between ${layout !== 'compact' ? `border-b ${isDark ? 'border-zinc-800' : 'border-zinc-100'}` : ''}`}>
                    <div className="flex items-center gap-2">
                      <h2 className={`${layout === 'compact' ? 'text-sm' : 'text-base'} font-semibold capitalize ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                        {type.replace(/([A-Z])/g, ' $1').trim()}
                      </h2>
                      {timeXAxis && (
                        <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${isDark ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
                          time-x
                        </span>
                      )}
                      {timeYAxis && (
                        <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${isDark ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-600'}`}>
                          time-y
                        </span>
                      )}
                      {numberFormat && numberFormat !== 'default' && (
                        <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${isDark ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-600'}`}>
                          {numberFormat}
                        </span>
                      )}
                    </div>
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
                      timeXAxis={timeXAxis}
                      timeYAxis={timeYAxis}
                      numberFormat={numberFormat}
                      decimalPlaces={decimalPlaces}
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
