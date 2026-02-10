import React from 'react';
import { ArrowUp, ArrowDown, type LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  iconColor: string;
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
  iconColor,
  delay = 0
}) => {
  return (
    <div
      className="glass-panel p-6 hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-slate-100">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl bg-slate-800/50 ${iconColor}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${trend === 'up'
          ? 'bg-emerald-500/10 text-emerald-400'
          : 'bg-rose-500/10 text-rose-400'
          }`}>
          {trend === 'up' ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
          {Math.abs(change)}%
        </span>
        <span className="text-slate-500 text-xs">vs. mês anterior</span>
      </div>
    </div>
  );
};