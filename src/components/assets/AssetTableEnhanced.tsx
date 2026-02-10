import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Minus, Search, Star, ChevronsUpDown } from 'lucide-react';
import type { Asset } from '../../types';

interface AssetTableProps {
  assets: Asset[];
  title: string;
}

type SortField = 'ticker' | 'price' | 'change' | 'sector' | 'dy' | 'p_vp';
type SortDirection = 'asc' | 'desc';

interface SortIconProps {
  field: SortField;
  sortField: SortField;
  sortDirection: SortDirection;
}

const SortIcon: React.FC<SortIconProps> = ({ field, sortField, sortDirection }) => {
  if (sortField !== field) return <ChevronsUpDown className="w-3 h-3 text-slate-600" />;
  return sortDirection === 'asc'
    ? <ArrowUp className="w-3 h-3 text-emerald-500" />
    : <ArrowDown className="w-3 h-3 text-emerald-500" />;
};

export const AssetTableEnhanced: React.FC<AssetTableProps> = ({ assets, title }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('change');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Toggle Favorite
  const toggleFavorite = (id: string) => {
    const newFavs = new Set(favorites);
    if (newFavs.has(id)) newFavs.delete(id);
    else newFavs.add(id);
    setFavorites(newFavs);
  };

  // Sorting Handler
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Filtering and Sorting
  const processedAssets = assets
    .filter(
      (asset) =>
        asset.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      // Favorites first logic could be added here
      const aValue = a[sortField] || 0;
      const bValue = b[sortField] || 0;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortDirection === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

  return (
    <div className="glass-panel p-6 animate-fade-in">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          {title}
          <span className="text-xs font-normal text-slate-500 bg-slate-800 px-2 py-1 rounded-full border border-slate-700">
            {processedAssets.length} ativos
          </span>
        </h2>
        <div className="relative w-full md:w-64 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          <input
            type="text"
            placeholder="Buscar por ticker ou nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/80 text-slate-400 text-xs uppercase tracking-wider font-semibold">
              <th className="py-3 pl-4 w-10"></th>
              <th
                className="py-3 cursor-pointer hover:text-emerald-400 transition-colors"
                onClick={() => handleSort('ticker')}
              >
                <div className="flex items-center gap-1">Ativo <SortIcon field="ticker" sortField={sortField} sortDirection={sortDirection} /></div>
              </th>
              <th
                className="py-3 cursor-pointer hover:text-emerald-400 transition-colors"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center gap-1">Preço <SortIcon field="price" sortField={sortField} sortDirection={sortDirection} /></div>
              </th>
              <th
                className="py-3 cursor-pointer hover:text-emerald-400 transition-colors"
                onClick={() => handleSort('change')}
              >
                <div className="flex items-center gap-1">Variação <SortIcon field="change" sortField={sortField} sortDirection={sortDirection} /></div>
              </th>
              <th className="py-3 hidden md:table-cell">Setor</th>
              <th className="py-3 hidden sm:table-cell text-right pr-4">Indicadores</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 bg-slate-900/20">
            {processedAssets.map((asset, index) => (
              <tr
                key={asset.id}
                className="group hover:bg-slate-800/40 transition-colors animate-slide-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="pl-4">
                  <button
                    onClick={() => toggleFavorite(asset.id)}
                    className="p-1 rounded-md hover:bg-slate-700 transition-colors"
                  >
                    <Star
                      className={`w-4 h-4 ${favorites.has(asset.id) ? 'fill-yellow-500 text-yellow-500' : 'text-slate-600 group-hover:text-slate-400'}`}
                    />
                  </button>
                </td>
                <td className="py-3">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">{asset.ticker}</span>
                    <span className="text-xs text-slate-500 truncate max-w-[120px]">{asset.name}</span>
                  </div>
                </td>
                <td className="py-3 text-slate-200 font-medium">
                  R$ {asset.price.toFixed(2)}
                </td>
                <td className="py-3">
                  <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-md w-fit ${asset.change > 0 ? 'bg-emerald-500/10 text-emerald-400' :
                    asset.change < 0 ? 'bg-rose-500/10 text-rose-400' : 'bg-slate-700/30 text-slate-400'
                    }`}>
                    {asset.change > 0 ? <ArrowUp className="w-3 h-3" /> :
                      asset.change < 0 ? <ArrowDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                    {Math.abs(asset.change).toFixed(2)}%
                  </div>
                </td>
                <td className="py-3 hidden md:table-cell">
                  <span className="text-xs font-medium px-2 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                    {asset.sector}
                  </span>
                </td>
                <td className="py-3 hidden sm:table-cell text-right pr-4">
                  <div className="flex justify-end gap-3 text-xs">
                    <div className="flex flex-col items-end">
                      <span className="text-slate-500">DY</span>
                      <span className="text-slate-200">{asset.dy ? `${asset.dy}%` : '-'}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-slate-500">P/VP</span>
                      <span className="text-slate-200">{asset.p_vp ? asset.p_vp.toFixed(2) : '-'}</span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {processedAssets.length === 0 && (
        <div className="text-center py-12 flex flex-col items-center gap-3">
          <div className="p-4 bg-slate-800 rounded-full">
            <Search className="w-6 h-6 text-slate-500" />
          </div>
          <p className="text-slate-400 font-medium">Nenhum ativo encontrado para "{searchTerm}"</p>
          <button
            onClick={() => setSearchTerm('')}
            className="text-emerald-400 hover:text-emerald-300 text-sm"
          >
            Limpar busca
          </button>
        </div>
      )}
    </div>
  );
};