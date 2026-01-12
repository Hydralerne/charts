import type { ThemeType } from '../charts';

export interface ChartLoadingProps {
  theme?: ThemeType;
  message?: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function ChartLoading({
  theme = 'dark',
  message = 'Loading...',
  style,
  className,
}: ChartLoadingProps) {
  return (
    <div
      style={{
        height: 400,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
      className={className}
    >
      <div
        style={{
          color: theme === 'dark' ? '#888' : '#666',
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: 8 }}>{message}</div>
        <div style={{ fontSize: 12, opacity: 0.7 }}>Please wait...</div>
      </div>
    </div>
  );
}
