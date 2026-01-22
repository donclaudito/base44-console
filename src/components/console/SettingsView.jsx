import React, { useState } from 'react';
import { User, Trash2, AlertTriangle } from 'lucide-react';

export default function SettingsView({ user, sitesCount, sites, onDeleteSite }) {
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  return (
    <div className="flex-1 p-6 lg:p-12 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-12 pb-20">
        {/* Profile Section */}
        <section>
          <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6 border-l-4 border-blue-600 pl-4">
            Perfil do Operador
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
              <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">
                Endereço Registado
              </p>
              <p className="text-sm font-bold text-white font-mono">
                {user?.email || 'Admin/Root'}
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
              <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">
                Nome Completo
              </p>
              <p className="text-sm font-bold text-white">
                {user?.full_name || 'Não definido'}
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 md:col-span-2">
              <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">
                ID Único do Sistema
              </p>
              <p className="text-sm font-bold text-white font-mono break-all">
                {user?.id || 'N/A'}
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section>
          <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6 border-l-4 border-blue-600 pl-4">
            Estatísticas do Ecossistema
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-500/20">
              <p className="text-4xl font-black text-white mb-1">{sitesCount}</p>
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                Aplicações
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/5">
              <p className="text-4xl font-black text-white mb-1">100%</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Uptime Terminal
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/5">
              <p className="text-4xl font-black text-white mb-1">v4.4.0</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Build Versão
              </p>
            </div>
          </div>
        </section>

        {/* Applications Management Section */}
        <section>
          <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6 border-l-4 border-red-600 pl-4">
            Gestão de Aplicações
          </h4>
          
          {sites && sites.length > 0 ? (
            <div className="space-y-3">
              {sites.map((site) => (
                <div
                  key={site.id}
                  className="flex items-center justify-between p-4 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl hover:bg-slate-800/50 transition-all"
                >
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white">{site.name}</p>
                    <p className="text-xs text-slate-500 font-mono truncate mt-1">{site.url}</p>
                  </div>
                  
                  {deleteConfirmId === site.id ? (
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex items-center gap-2 px-3 py-2 bg-red-500/10 rounded-xl">
                        <AlertTriangle size={14} className="text-red-500" />
                        <span className="text-xs font-bold text-red-400">Confirmar exclusão?</span>
                      </div>
                      <button
                        onClick={() => {
                          onDeleteSite(site.id);
                          setDeleteConfirmId(null);
                        }}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all"
                      >
                        Sim, Excluir
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-bold transition-all"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(site.id)}
                      className="px-4 py-2 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2"
                    >
                      <Trash2 size={14} />
                      Excluir
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl">
              <p className="text-sm text-slate-500 font-medium">Nenhuma aplicação importada ainda</p>
            </div>
          )}
        </section>

        {/* Role Section */}
        <section>
          <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6 border-l-4 border-blue-600 pl-4">
            Permissões
          </h4>
          <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white capitalize">
                  {user?.role || 'user'}
                </p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                  Nível de Acesso
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}