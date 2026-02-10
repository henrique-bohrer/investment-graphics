import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';

export const Layout = () => {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30">
      <Sidebar />
      <div className="flex-1 flex flex-col md:pl-64 min-h-screen pb-20 md:pb-0">
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>
      </div>
      <MobileNav />
    </div>
  );
};
