import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
  Box,
  ChevronRight,
  Menu,
  Search,
  LayoutDashboard,
  Settings,
  Plus,
  Monitor,
  LogOut,
  User,
  MoreVertical,
  ArrowRightLeft
} from 'lucide-react';
import WorkspaceSelector from './WorkspaceSelector';

export default function Sidebar({
  user,
  sites,
  activeSite,
  setActiveSite,
  isSidebarOpen,
  setIsSidebarOpen,
  searchQuery,
  setSearchQuery,
  view,
  setView,
  onAddClick,
  onLogout,
  workspaces,
  activeWorkspace,
  onSelectWorkspace,
  onAddWorkspace
}) {
  const filteredSites = sites.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className={`${isSidebarOpen ? 'w-80' : 'w-20'} flex-shrink-0 bg-slate-900/40 backdrop-blur-md border-r border-white/5 transition-all duration-300 flex flex-col z-40`}>
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="bg-blue-600 p-2.5 rounded-2xl flex-shrink-0 shadow-lg shadow-blue-500/20">
            <Box size={22} className="text-white" />
          </div>
          {isSidebarOpen && (
            <span className="font-black text-xl tracking-tighter text-white">Orenstein AI</span>
          )}
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-white/5 rounded-xl text-slate-500 transition-colors"
        >
          {isSidebarOpen ? <ChevronRight className="rotate-180" size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="px-4 flex-1 flex flex-col overflow-hidden">
        {/* Workspace Selector */}
        <WorkspaceSelector
          workspaces={workspaces}
          activeWorkspace={activeWorkspace}
          onSelectWorkspace={onSelectWorkspace}
          onAddWorkspace={onAddWorkspace}
          isSidebarOpen={isSidebarOpen}
        />

        {/* Search */}
        {isSidebarOpen && (
          <div className="relative mb-6 px-2">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
            <input
              type="text"
              placeholder="Pesquisar ferramentas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800/30 border border-white/5 rounded-2xl text-[11px] outline-none focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 font-medium text-white"
            />
          </div>
        )}

        {/* Navigation */}
        <nav className="space-y-1 px-2 mb-8">
          <button
            onClick={() => setView('workspace')}
            className={`w-full flex items-center gap-3 p-3.5 rounded-2xl transition-all ${
              view === 'workspace'
                ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                : 'text-slate-500 hover:bg-white/5 border border-transparent'
            }`}
          >
            <LayoutDashboard size={18} />
            {isSidebarOpen && <span className="text-xs font-bold">Workspace</span>}
          </button>
          <button
            onClick={() => setView('settings')}
            className={`w-full flex items-center gap-3 p-3.5 rounded-2xl transition-all ${
              view === 'settings'
                ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                : 'text-slate-500 hover:bg-white/5 border border-transparent'
            }`}
          >
            <Settings size={18} />
            {isSidebarOpen && <span className="text-xs font-bold">Definições</span>}
          </button>
        </nav>

        {/* Apps Section */}
        {isSidebarOpen && (
          <div className="flex items-center justify-between mb-3 px-4">
            <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
              Aplicações
            </h3>
            <button
              onClick={onAddClick}
              className="p-1.5 bg-blue-600/10 text-blue-500 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
            >
              <Plus size={14} />
            </button>
          </div>
        )}

        {/* Sites List */}
        <div className="flex-1 overflow-y-auto space-y-2 px-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          {filteredSites.length === 0 && isSidebarOpen && (
            <div className="text-center py-10 px-4">
              <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mb-2 italic">
                Sem projetos ativos
              </p>
              <button
                onClick={onAddClick}
                className="text-[10px] text-blue-500 hover:underline"
              >
                Adicionar Primeiro Projeto
              </button>
            </div>
          )}
          {filteredSites.map((site) => (
                          <div
                            key={site.id}
                            className={`group flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all border ${
                              activeSite?.id === site.id
                                ? 'bg-white/5 border-white/10 text-white'
                                : 'hover:bg-white/5 border-transparent text-slate-500'
                            }`}
                          >
                            <div 
                              className="flex items-center gap-3 truncate flex-1"
                              onClick={() => {
                                setActiveSite(site);
                                setView('workspace');
                                setOpenMenuId(null);
                              }}
                            >
                              <div
                                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                                  activeSite?.id === site.id
                                    ? 'bg-blue-600'
                                    : 'bg-slate-800 group-hover:bg-slate-700'
                                }`}
                              >
                                <Monitor
                                  size={14}
                                  className={activeSite?.id === site.id ? 'text-white' : 'text-slate-500'}
                                />
                              </div>
                              {isSidebarOpen && (
                                <span className="text-xs font-bold truncate">{site.name}</span>
                              )}
                            </div>

                            {/* Context Menu */}
                            {isSidebarOpen && (
                              <div className="relative">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenMenuId(openMenuId === site.id ? null : site.id);
                                  }}
                                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                >
                                  <MoreVertical size={14} />
                                </button>

                                {openMenuId === site.id && (
                                  <>
                                    <div 
                                      className="fixed inset-0 z-10" 
                                      onClick={() => setOpenMenuId(null)}
                                    />
                                    <div className="absolute right-0 top-8 z-20 w-44 bg-slate-800 border border-white/10 rounded-xl shadow-xl py-2">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          onMoveSite(site);
                                          setOpenMenuId(null);
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-all"
                                      >
                                        <ArrowRightLeft size={14} />
                                        Mover para...
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
        </div>

        {/* User Profile */}
        <div className="mt-auto py-6 border-t border-white/5 px-2">
          <div className={`flex items-center gap-3 mb-4 ${!isSidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 border border-white/10 flex items-center justify-center text-white font-black text-xs shadow-xl">
              {user?.email ? user.email[0].toUpperCase() : <User size={16} />}
            </div>
            {isSidebarOpen && (
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">
                  {user?.email || user?.full_name || 'Utilizador'}
                </p>
                <p className="text-[9px] text-slate-600 font-mono truncate">
                  {user?.id?.substring(0, 12)}...
                </p>
              </div>
            )}
          </div>
          <button
            onClick={onLogout}
            className={`w-full flex items-center gap-2 py-3.5 rounded-2xl transition-all text-[10px] font-black uppercase tracking-widest active:scale-95 ${
              isSidebarOpen
                ? 'bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white justify-center'
                : 'text-slate-500 hover:text-red-400 justify-center'
            }`}
          >
            <LogOut size={14} />
            {isSidebarOpen && 'Sair do Sistema'}
          </button>
        </div>
      </div>
    </aside>
  );
}