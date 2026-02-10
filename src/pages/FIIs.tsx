import React from 'react';
import { AssetTableEnhanced } from '../components/assets/AssetTableEnhanced';
import { fiis } from '../data/mockData';

const FIIs: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Fundos Imobiliários</h1>
        <p className="text-slate-400 mt-1">Gerencie seus rendimentos mensais.</p>
      </div>
      <AssetTableEnhanced assets={fiis} title="Carteira de FIIs" />
    </div>
  );
};

export default FIIs;