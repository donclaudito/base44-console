import React from 'react';
import { User } from 'lucide-react';

export default function SettingsView({ user, sitesCount }) {
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