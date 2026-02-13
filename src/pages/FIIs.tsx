import React from 'react';
import { AssetTable } from '../components/assets/AssetTable';
import { fiis } from '../data/mockData';

const FIIs: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Fundos Imobiliários (FIIs)</h1>
        <p className="text-slate-400">Monitore seus fundos e rendimentos.</p>
      </div>
      <AssetTable assets={fiis} title="Todos os FIIs" />
    </div>
  );
};

export default FIIs;
