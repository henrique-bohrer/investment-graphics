import { LayoutDashboard, TrendingUp, Building2, Calculator } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const navItems = [
  { name: 'Dash', icon: LayoutDashboard, path: '/' },
  { name: 'Ações', icon: TrendingUp, path: '/acoes' },
  { name: 'FIIs', icon: Building2, path: '/fiis' },
  { name: 'Calc', icon: Calculator, path: '/calculadora' },
];

export const MobileNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-6 py-3 flex justify-between items-center z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            clsx(
              'flex flex-col items-center gap-1 text-xs font-medium transition-colors',
              isActive ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
            )
          }
        >
          <item.icon className="w-6 h-6" />
          <span>{item.name}</span>
        </NavLink>
      ))}
    </nav>
  );
};
