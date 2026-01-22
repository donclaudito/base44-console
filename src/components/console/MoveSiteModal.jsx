import React, { useState } from 'react';
import { X, FolderOpen, ArrowRight, Check } from 'lucide-react';

export default function MoveSiteModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  site, 
  workspaces, 
  currentWorkspaceId,
  isLoading 
}) {
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);

  if (!isOpen || !site) return null;

  const availableWorkspaces = workspaces.filter(w => w.id !== currentWorkspaceId);

  const handleSubmit = () => {
    if (selectedWorkspaceId) {
      onSubmit(site.id, selectedWorkspaceId);
      setSelectedWorkspaceId(null);
    }
  };

  const handleClose = () => {
    setSelectedWorkspaceId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-white">Mover Aplicação</h2>
              <p className="text-xs text-slate-500 mt-1">
                Selecione o workspace de destino
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/5 rounded-xl text-slate-500 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Site Info */}
        <div className="px-6 py-4 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
              <FolderOpen size={18} className="text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{site.name}</p>
              <p className="text-xs text-slate-500 font-mono truncate">{site.url}</p>
            </div>
          </div>
        </div>

        {/* Workspace List */}
        <div className="p-6">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
            Workspaces Disponíveis
          </p>
          
          {availableWorkspaces.length === 0 ? (
            <div className="text-center py-8 bg-slate-800/30 rounded-2xl border border-white/5">
              <p className="text-sm text-slate-500">Não existem outros workspaces</p>
              <p className="text-xs text-slate-600 mt-1">Crie um novo workspace primeiro</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {availableWorkspaces.map((workspace) => (
                <button
                  key={workspace.id}
                  onClick={() => setSelectedWorkspaceId(workspace.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border ${
                    selectedWorkspaceId === workspace.id
                      ? 'bg-blue-600/10 border-blue-500/30 text-blue-400'
                      : 'bg-slate-800/30 border-white/5 text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      selectedWorkspaceId === workspace.id
                        ? 'bg-blue-600/20'
                        : 'bg-slate-700'
                    }`}>
                      <FolderOpen size={14} className={
                        selectedWorkspaceId === workspace.id ? 'text-blue-400' : 'text-slate-500'
                      } />
                    </div>
                    <span className="text-sm font-bold">{workspace.name}</span>
                  </div>
                  {selectedWorkspaceId === workspace.id && (
                    <Check size={18} className="text-blue-400" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-white/5 flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 py-3.5 px-6 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-xs font-bold transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedWorkspaceId || isLoading || availableWorkspaces.length === 0}
            className="flex-1 py-3.5 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                A mover...
              </>
            ) : (
              <>
                <ArrowRight size={16} />
                Mover Aplicação
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}