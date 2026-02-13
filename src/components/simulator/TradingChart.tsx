import { createChart, ColorType, CandlestickSeries, type ISeriesApi } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface TradingChartProps {
  currentPrice: number;
  data: Candle[];
}

export const TradingChart: React.FC<TradingChartProps> = ({ currentPrice, data }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  // Keep track of initialized data to avoid re-setting it
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#94a3b8',
      },
      grid: {
        vertLines: { color: '#334155', visible: false },
        horzLines: { color: '#334155', visible: false },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#10b981',
      downColor: '#ef4444',
      borderVisible: false,
      wickUpColor: '#10b981',
      wickDownColor: '#ef4444',
    });

    candlestickSeries.setData(data);
    seriesRef.current = candlestickSeries;
    chartRef.current = chart;
    isInitialized.current = true;

    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
      isInitialized.current = false;
    };
    // We only want to run this once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effect to update the last candle when data changes
  useEffect(() => {
    if (seriesRef.current && data.length > 0 && isInitialized.current) {
      const lastCandle = data[data.length - 1];
      seriesRef.current.update(lastCandle);

      // If a new candle was added (data length increased), we might need to handle it differently
      // providing update() is usually enough for the last candle modification
    }
  }, [data]);

  return (
    <div className="glass-panel p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-100">SIMUL3 (Simulador S.A.)</h2>
        <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full animate-pulse">AO VIVO</span>
            <span className="text-2xl font-bold text-slate-100">R$ {currentPrice.toFixed(2)}</span>
        </div>
      </div>
      <div ref={chartContainerRef} className="w-full h-[400px]" />
    </div>
  );
};
