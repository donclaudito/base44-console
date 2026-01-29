import React, { useState, useEffect } from 'react';
import { ExternalLink, Activity, Clock } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function WorkspaceHeader({ activeSite, view }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-20 bg-white/80 dark:bg-slate-900/20 backdrop-blur-2xl border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-6 lg:px-10">
      <div className="flex items-center gap-4 lg:gap-6">
        <div className="flex flex-col">
          <h2 className="text-lg lg:text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            {view === 'settings' ? 'Definições do Sistema' : (activeSite?.name || 'Início')}
            {activeSite && view === 'workspace' && (
              <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[9px] font-mono border border-blue-500/20 uppercase tracking-wider">
                {activeSite.status || 'Online'}
              </span>
            )}
          </h2>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[9px] text-slate-500 dark:text-slate-500 font-bold uppercase tracking-[0.2em] italic">
              Terminal Ativo
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        {activeSite && view === 'workspace' && (
          <>
            <div className="hidden sm:flex items-center gap-3 px-4 border-r border-white/10 mr-2 text-slate-500">
              <Clock size={14} />
              <span className="text-[10px] font-mono font-bold">{time}</span>
            </div>
            <a
              href={activeSite.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-5 lg:px-6 py-2.5 lg:py-3 rounded-2xl font-black text-[10px] hover:bg-slate-800 dark:hover:bg-blue-50 transition-all shadow-2xl active:scale-95"
            >
              <span className="hidden lg:inline">ABRIR EM NOVA ABA</span>
              <ExternalLink size={14} />
            </a>
          </>
        )}
        <ThemeToggle />
        <button className="p-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 rounded-2xl transition-all">
          <Activity size={18} />
        </button>
      </div>
    </header>
  );
}