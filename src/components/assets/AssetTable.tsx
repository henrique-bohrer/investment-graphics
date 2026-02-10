import { ArrowUp, ArrowDown, Minus, Search } from 'lucide-react';
import { useState } from 'react';
import type { Asset } from '../../types';

interface AssetTableProps {
  assets: Asset[];
  title: string;
}

export const AssetTable = ({ assets, title }: AssetTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAssets = assets.filter(
    (asset) =>
      asset.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="glass-panel p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-slate-100">{title}</h2>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar ativo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-400 text-sm border-b border-slate-800">
              <th className="pb-4 font-medium pl-4">Ativo</th>
              <th className="pb-4 font-medium">Preço</th>
              <th className="pb-4 font-medium">Variação</th>
              <th className="pb-4 font-medium hidden md:table-cell">Setor</th>
              <th className="pb-4 font-medium hidden sm:table-cell">DY (12m)</th>
              <th className="pb-4 font-medium hidden lg:table-cell">P/VP</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredAssets.map((asset) => (
              <tr key={asset.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                <td className="py-4 pl-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-100">{asset.ticker}</span>
                    <span className="text-xs text-slate-400">{asset.name}</span>
                  </div>
                </td>
                <td className="py-4 text-slate-200 font-medium">
                  R$ {asset.price.toFixed(2)}
                </td>
                <td className="py-4">
                  <div className={`flex items-center gap-1 ${
                    asset.change > 0 ? 'text-emerald-400' : asset.change < 0 ? 'text-rose-400' : 'text-slate-400'
                  }`}>
                    {asset.change > 0 ? <ArrowUp className="w-3 h-3" /> : asset.change < 0 ? <ArrowDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                    <span className="font-medium">{Math.abs(asset.change).toFixed(2)}%</span>
                  </div>
                </td>
                <td className="py-4 text-slate-400 hidden md:table-cell">{asset.sector}</td>
                <td className="py-4 text-slate-300 hidden sm:table-cell">{asset.dy ? `${asset.dy}%` : '-'}</td>
                <td className="py-4 text-slate-300 hidden lg:table-cell">{asset.p_vp ? asset.p_vp.toFixed(2) : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAssets.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          Nenhum ativo encontrado.
        </div>
      )}
    </div>
  );
};
