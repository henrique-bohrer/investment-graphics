import React from 'react';
import { AssetTable } from '../components/assets/AssetTable';
import { stocks } from '../data/mockData';

const Stocks: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Ações (Stocks)</h1>
        <p className="text-slate-400">Acompanhe as principais ações da bolsa brasileira.</p>
      </div>
      <AssetTable assets={stocks} title="Todas as Ações" />
    </div>
  );
};

export default Stocks;
