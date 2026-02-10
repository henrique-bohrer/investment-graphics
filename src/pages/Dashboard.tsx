import React from 'react';
import { Wallet, TrendingUp, DollarSign, PieChart } from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { PerformanceChart } from '../components/dashboard/PerformanceChart';
import { PortfolioDistribution } from '../components/dashboard/PortfolioDistribution';
import { TransactionTimeline } from '../components/dashboard/TransactionTimeline';
import { portfolioDistribution, recentTransactions } from '../data/mockData';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Dashboard</h1>
          <p className="text-slate-400 mt-1">Visão geral do seu patrimônio.</p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-xs text-slate-500">Última atualização</p>
          <p className="text-sm font-medium text-emerald-400">Hoje, 14:35</p>
        </div>
      </div>

      {/* Stats Grid - 4 Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Patrimônio Total"
          value="R$ 125.450,80"
          change={5.23}
          trend="up"
          icon={Wallet}
          iconColor="text-emerald-500"
          delay={0}
        />
        <StatCard
          title="Rentabilidade (Mês)"
          value="R$ 3.240,50"
          change={2.15}
          trend="up"
          icon={TrendingUp}
          iconColor="text-blue-500"
          delay={100}
        />
        <StatCard
          title="Proventos (Mês)"
          value="R$ 850,25"
          change={12.5}
          trend="up"
          icon={DollarSign}
          iconColor="text-yellow-500"
          delay={200}
        />
        <StatCard
          title="Ativos na Carteira"
          value="18"
          change={-1}
          trend="neutral"
          icon={PieChart}
          iconColor="text-purple-500"
          delay={300}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <div className="lg:col-span-1">
          <PortfolioDistribution data={portfolioDistribution} />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <TransactionTimeline transactions={recentTransactions} />
      </div>
    </div>
  );
};

export default Dashboard;