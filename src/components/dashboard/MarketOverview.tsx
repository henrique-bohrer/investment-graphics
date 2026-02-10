import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { marketIndices } from '../../data/mockData';

export const MarketOverview = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {marketIndices.map((index) => (
        <div key={index.name} className="glass-panel p-4 flex flex-col">
          <span className="text-slate-400 text-sm font-medium">{index.name}</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl font-bold text-slate-100">
              {index.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            <span
              className={`flex items-center text-xs font-medium ${
                index.change > 0
                  ? 'text-emerald-400'
                  : index.change < 0
                  ? 'text-rose-400'
                  : 'text-slate-400'
              }`}
            >
              {index.change > 0 ? (
                <ArrowUp className="w-3 h-3 mr-0.5" />
              ) : index.change < 0 ? (
                <ArrowDown className="w-3 h-3 mr-0.5" />
              ) : (
                <Minus className="w-3 h-3 mr-0.5" />
              )}
              {Math.abs(index.change).toFixed(2)}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
