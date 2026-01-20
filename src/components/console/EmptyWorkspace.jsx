import React from 'react';
import { Box } from 'lucide-react';

export default function EmptyWorkspace({ onAddClick }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
      <div className="w-32 h-32 bg-slate-900/50 rounded-[3rem] flex items-center justify-center mb-8 border border-white/5 shadow-2xl">
        <Box size={54} className="text-blue-600 opacity-30" />
      </div>
      <h3 className="text-2xl font-black text-white mb-3">Workspace Orenstein AI</h3>
      <p className="text-slate-500 text-sm max-w-sm font-medium leading-relaxed">
        Selecione uma aplicação na barra lateral ou adicione um novo endereço para carregar o terminal de trabalho.
      </p>
      <button
        onClick={onAddClick}
        className="mt-10 px-8 py-4 bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white rounded-2xl font-black text-xs transition-all border border-blue-500/20"
      >
        ADICIONAR PRIMEIRA APP
      </button>
    </div>
  );
}