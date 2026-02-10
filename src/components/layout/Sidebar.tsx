import { LayoutDashboard, TrendingUp, Building2, Calculator } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Ações', icon: TrendingUp, path: '/acoes' },
  { name: 'FIIs', icon: Building2, path: '/fiis' },
  { name: 'Calculadora', icon: Calculator, path: '/calculadora' },
];

export const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-slate-900 border-r border-slate-800 p-4 z-40">
      <div className="flex items-center gap-2 px-4 mb-8">
        <TrendingUp className="w-8 h-8 text-emerald-500" />
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
          InvestBrasil
        </span>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 font-medium border-r-2 border-emerald-500'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-4 py-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
            <span className="text-sm font-bold text-slate-300">JS</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-200">João Silva</span>
            <span className="text-xs text-slate-500">Investidor Pro</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
