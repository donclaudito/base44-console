import React, { useState } from 'react';
import { User, Trash2, AlertTriangle, Briefcase, BarChart3, Shield } from 'lucide-react';

export default function SettingsView({ user, sitesCount, sites, onDeleteSite, workspaces, onDeleteWorkspace }) {
  const [deleteSiteConfirmId, setDeleteSiteConfirmId] = useState(null);
  const [deleteWorkspaceConfirmId, setDeleteWorkspaceConfirmId] = useState(null);
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-12 overflow-y-auto bg-gradient-to-br from-slate-950 to-slate-900">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 pb-20">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2">Definições do Sistema</h1>
          <p className="text-slate-400 text-xs sm:text-sm">Gerir perfil, workspaces e aplicações</p>
        </div>
        {/* Profile Section */}
        <section className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
          <div className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-600/20 flex items-center justify-center flex-shrink-0">
              <User size={window.innerWidth < 640 ? 20 : 24} className="text-blue-400" />
            </div>
            <div className="min-w-0">
              <h4 className="text-base sm:text-lg font-black text-white truncate">Perfil do Operador</h4>
              <p className="text-[10px] sm:text-xs text-slate-500">Informações da conta</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
              <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-wider">
                Endereço Registado
              </p>
              <p className="text-xs sm:text-sm font-bold text-white font-mono break-all">
                {user?.email || 'Admin/Root'}
              </p>
            </div>
            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
              <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-wider">
                Nome Completo
              </p>
              <p className="text-xs sm:text-sm font-bold text-white truncate">
                {user?.full_name || 'Não definido'}
              </p>
            </div>
            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all md:col-span-2">
              <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-wider">
                ID Único do Sistema
              </p>
              <p className="text-[10px] sm:text-xs font-bold text-white font-mono break-all">
                {user?.id || 'N/A'}
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-600/20 via-blue-600/10 to-transparent border border-blue-500/20 hover:border-blue-500/40 transition-all">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <Briefcase size={18} className="text-blue-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white mb-1">{sitesCount}</p>
            <p className="text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-wider">
              Aplicações Ativas
            </p>
          </div>
          <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition-all">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <BarChart3 size={18} className="text-green-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white mb-1">100%</p>
            <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
              Uptime Terminal
            </p>
          </div>
          <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition-all">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <Shield size={18} className="text-purple-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white mb-1">v4.4.0</p>
            <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
              Build Versão
            </p>
          </div>
        </section>

        {/* Workspaces Management Section */}
        <section className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                <Briefcase size={18} className="text-purple-400" />
              </div>
              <div className="min-w-0">
                <h4 className="text-base sm:text-lg font-black text-white truncate">Gestão de Workspaces</h4>
                <p className="text-[10px] sm:text-xs text-slate-500">
                  {workspaces?.length || 0} workspace{workspaces?.length !== 1 ? 's' : ''} configurado{workspaces?.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>

          {workspaces && workspaces.length > 0 ? (
            <div className="space-y-2">
              {workspaces.map((workspace) => (
                <div
                  key={workspace.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 bg-white/5 border border-white/5 rounded-xl sm:rounded-2xl hover:border-white/10 hover:bg-white/[0.07] transition-all group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{workspace.name}</p>
                    {workspace.description && (
                      <p className="text-xs text-slate-500 mt-1 truncate">{workspace.description}</p>
                    )}
                  </div>

                  {deleteWorkspaceConfirmId === workspace.id ? (
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <div className="flex items-center gap-2 px-3 py-2 bg-red-500/10 rounded-lg sm:rounded-xl">
                        <AlertTriangle size={14} className="text-red-500 flex-shrink-0" />
                        <span className="text-xs font-bold text-red-400">Confirmar exclusão?</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            onDeleteWorkspace(workspace.id);
                            setDeleteWorkspaceConfirmId(null);
                          }}
                          className="flex-1 sm:flex-none px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg sm:rounded-xl text-xs font-bold transition-all touch-manipulation"
                        >
                          Sim, Excluir
                        </button>
                        <button
                          onClick={() => setDeleteWorkspaceConfirmId(null)}
                          className="flex-1 sm:flex-none px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg sm:rounded-xl text-xs font-bold transition-all touch-manipulation"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteWorkspaceConfirmId(workspace.id)}
                      className="px-4 py-2 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white rounded-lg sm:rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 touch-manipulation"
                    >
                      <Trash2 size={14} />
                      Excluir
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 sm:py-12 bg-white/5 border border-dashed border-white/10 rounded-xl sm:rounded-2xl">
              <Briefcase size={28} className="text-slate-600 mx-auto mb-2 sm:mb-3" />
              <p className="text-xs sm:text-sm text-slate-400 font-medium px-4">Nenhum workspace criado ainda</p>
            </div>
          )}
        </section>

        {/* Applications Management Section */}
        <section className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-red-600/20 flex items-center justify-center flex-shrink-0">
                <Trash2 size={18} className="text-red-400" />
              </div>
              <div className="min-w-0">
                <h4 className="text-base sm:text-lg font-black text-white truncate">Gestão de Aplicações</h4>
                <p className="text-[10px] sm:text-xs text-slate-500">
                  {sites?.length || 0} aplicaç{sites?.length !== 1 ? 'ões' : 'ão'} no workspace atual
                </p>
              </div>
            </div>
          </div>

          {sites && sites.length > 0 ? (
            <div className="space-y-2">
              {sites.map((site) => (
                <div
                  key={site.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 bg-white/5 border border-white/5 rounded-xl sm:rounded-2xl hover:border-white/10 hover:bg-white/[0.07] transition-all group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{site.name}</p>
                    <p className="text-xs text-slate-500 font-mono truncate mt-1">{site.url}</p>
                  </div>

                  {deleteSiteConfirmId === site.id ? (
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <div className="flex items-center gap-2 px-3 py-2 bg-red-500/10 rounded-lg sm:rounded-xl">
                        <AlertTriangle size={14} className="text-red-500 flex-shrink-0" />
                        <span className="text-xs font-bold text-red-400">Confirmar exclusão?</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            onDeleteSite(site.id);
                            setDeleteSiteConfirmId(null);
                          }}
                          className="flex-1 sm:flex-none px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg sm:rounded-xl text-xs font-bold transition-all touch-manipulation"
                        >
                          Sim, Excluir
                        </button>
                        <button
                          onClick={() => setDeleteSiteConfirmId(null)}
                          className="flex-1 sm:flex-none px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg sm:rounded-xl text-xs font-bold transition-all touch-manipulation"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteSiteConfirmId(site.id)}
                      className="px-4 py-2 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white rounded-lg sm:rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 touch-manipulation"
                    >
                      <Trash2 size={14} />
                      Excluir
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 sm:py-12 bg-white/5 border border-dashed border-white/10 rounded-xl sm:rounded-2xl">
              <Briefcase size={28} className="text-slate-600 mx-auto mb-2 sm:mb-3" />
              <p className="text-xs sm:text-sm text-slate-400 font-medium px-4">Nenhuma aplicação no workspace atual</p>
            </div>
          )}
        </section>

        {/* Role Section */}
        <section className="bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-blue-600/20 flex items-center justify-center flex-shrink-0">
              <Shield size={window.innerWidth < 640 ? 24 : 28} className="text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
                Nível de Acesso
              </p>
              <p className="text-xl sm:text-2xl font-black text-white capitalize truncate">
                {user?.role || 'user'}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}