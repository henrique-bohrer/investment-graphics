import { createChart, ColorType, CandlestickSeries } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import { candlestickData } from '../../data/simulatorData';

interface TradingChartProps {
  currentPrice: number;
}

export const TradingChart: React.FC<TradingChartProps> = ({ currentPrice }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);

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
    });

    chart.timeScale().fitContent();

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#10b981',
      downColor: '#ef4444',
      borderVisible: false,
      wickUpColor: '#10b981',
      wickDownColor: '#ef4444',
    });

    candlestickSeries.setData(candlestickData);

    chartRef.current = chart;

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  return (
    <div className="glass-panel p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-100">SIMUL3 (Simulador S.A.)</h2>
        <span className="text-2xl font-bold text-slate-100">R$ {currentPrice.toFixed(2)}</span>
      </div>
      <div ref={chartContainerRef} className="w-full h-[400px]" />
    </div>
  );
};
