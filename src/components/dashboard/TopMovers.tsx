import { ArrowUp, ArrowDown } from 'lucide-react';
import { allAssets } from '../../data/mockData';

export const TopMovers = () => {
  const sortedAssets = [...allAssets].sort((a, b) => b.change - a.change);
  const topGainers = sortedAssets.slice(0, 3);
  const topLosers = sortedAssets.slice(-3).reverse();

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Top Gainers */}
      <div className="glass-panel p-6">
        <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
          <ArrowUp className="w-5 h-5 text-emerald-500" /> Destaques de Alta
        </h3>
        <div className="space-y-4">
          {topGainers.map((asset) => (
            <div key={asset.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors">
              <div>
                <p className="font-bold text-slate-100">{asset.ticker}</p>
                <p className="text-xs text-slate-400">{asset.name}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-100">R$ {asset.price.toFixed(2)}</p>
                <span className="text-xs font-medium text-emerald-400">+{asset.change.toFixed(2)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Losers */}
      <div className="glass-panel p-6">
        <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
          <ArrowDown className="w-5 h-5 text-rose-500" /> Destaques de Baixa
        </h3>
        <div className="space-y-4">
          {topLosers.map((asset) => (
            <div key={asset.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors">
              <div>
                <p className="font-bold text-slate-100">{asset.ticker}</p>
                <p className="text-xs text-slate-400">{asset.name}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-100">R$ {asset.price.toFixed(2)}</p>
                <span className="text-xs font-medium text-rose-400">{asset.change.toFixed(2)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
