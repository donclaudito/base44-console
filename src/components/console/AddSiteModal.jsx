import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AddSiteModal({ isOpen, onClose, onSubmit, isLoading }) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !url) return;

    let formattedUrl = url.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = 'https://' + formattedUrl;
    }

    await onSubmit({ name, url: formattedUrl });
    setName('');
    setUrl('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-xl bg-slate-950/80 animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-white/10 rounded-[3rem] w-full max-w-md shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600"></div>
        
        <div className="p-10 border-b border-white/5 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-black text-white tracking-tighter">Novo Projeto</h3>
            <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-widest">
              Registo de Módulo Externo
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center bg-white/5 text-slate-400 hover:text-white rounded-full transition-colors border border-white/10"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
              Nome de Identificação
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Dashboard Analytics"
              className="w-full px-6 py-4 bg-slate-800/50 border border-slate-700/50 rounded-[1.5rem] text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold placeholder:text-slate-600"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
              URL de Destino
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://app.exemplo.com"
              className="w-full px-6 py-4 bg-slate-800/50 border border-slate-700/50 rounded-[1.5rem] text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono text-sm placeholder:text-slate-600"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-4 border border-white/10 text-slate-500 font-black rounded-2xl hover:bg-white/5 transition-all text-[10px] uppercase tracking-widest"
            >
              CANCELAR
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all text-[10px] uppercase tracking-widest active:scale-95 disabled:opacity-50"
            >
              {isLoading ? 'A INSTALAR...' : 'INSTALAR APP'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}