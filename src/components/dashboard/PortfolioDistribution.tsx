import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { PortfolioData } from '../../types';

interface PortfolioDistributionProps {
  data: PortfolioData[];
}

export const PortfolioDistribution: React.FC<PortfolioDistributionProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="glass-panel p-6 h-[400px] flex flex-col animate-fade-in">
      <h2 className="text-xl font-bold text-slate-100 mb-2">Distribuição</h2>
      <p className="text-sm text-slate-400 mb-6">Composição atual da carteira</p>

      <div className="flex-1 flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-1/2 h-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="rgba(0,0,0,0)"
                    className="transition-all duration-300 outline-none"
                    style={{
                      filter: activeIndex === index ? 'drop-shadow(0 0 8px rgba(255,255,255,0.3))' : 'none',
                      transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                      transformOrigin: 'center',
                    }}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value: number | undefined) => `${value ?? 0}%`}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Valor Central no Hover */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              {activeIndex !== null ? (
                <>
                  <p className="text-slate-400 text-xs">{data[activeIndex].name}</p>
                  <p className="text-2xl font-bold text-slate-100">{data[activeIndex].value}%</p>
                </>
              ) : (
                <p className="text-slate-500 text-xs font-medium">Total</p>
              )}
            </div>
          </div>
        </div>

        {/* Legenda Interativa */}
        <div className="w-full md:w-1/2 grid grid-cols-2 gap-3">
          {data.map((item, index) => (
            <div
              key={item.name}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer ${activeIndex === index ? 'bg-slate-800' : 'bg-transparent hover:bg-slate-800/50'
                }`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}` }}
              />
              <div>
                <p className="text-sm font-medium text-slate-200">{item.name}</p>
                <p className="text-xs text-slate-400">{item.value}% da carteira</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};