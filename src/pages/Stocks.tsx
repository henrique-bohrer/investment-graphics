import React from 'react';
import { AssetTableEnhanced } from '../components/assets/AssetTableEnhanced';
import { stocks } from '../data/mockData';

const Stocks: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Ações</h1>
        <p className="text-slate-400 mt-1">Acompanhe e analise suas empresas favoritas.</p>
      </div>
      <AssetTableEnhanced assets={stocks} title="Carteira de Ações" />
    </div>
  );
};

export default Stocks;