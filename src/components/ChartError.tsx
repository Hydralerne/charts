import type { ThemeType } from '../charts';

export interface ChartErrorProps {
  theme?: ThemeType;
  error: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function ChartError({
  theme = 'dark',
  error,
  style,
  className,
}: ChartErrorProps) {
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
          color: theme === 'dark' ? '#ef4444' : '#dc2626',
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: 8, fontWeight: 500 }}>⚠️ {error}</div>
        <div style={{ fontSize: 12, opacity: 0.7 }}>
          Check console for details
        </div>
      </div>
    </div>
  );
}
