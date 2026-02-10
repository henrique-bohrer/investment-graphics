import React from 'react';
import { MarketOverview } from '../components/dashboard/MarketOverview';
import { PerformanceChart } from '../components/dashboard/PerformanceChart';
import { TopMovers } from '../components/dashboard/TopMovers';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Dashboard</h1>
        <p className="text-slate-400">Visão geral dos seus investimentos e do mercado.</p>
      </div>

      <MarketOverview />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <div className="lg:col-span-1">
          {/* TopMovers will stack vertically on small screens or when constrained */}
          <TopMovers />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
