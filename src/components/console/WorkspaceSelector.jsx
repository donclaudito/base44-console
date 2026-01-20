import React, { useState } from 'react';
import { ChevronDown, Plus, Layers, Trash2 } from 'lucide-react';

export default function WorkspaceSelector({
  workspaces,
  activeWorkspace,
  onSelectWorkspace,
  onAddWorkspace,
  onDeleteWorkspace,
  isSidebarOpen
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (!isSidebarOpen) {
    return (
      <div className="px-4 mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 bg-slate-800/30 border border-white/5 rounded-2xl hover:bg-slate-800/50 transition-all flex items-center justify-center"
        >
          <Layers size={18} className="text-blue-400" />
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 mb-6">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-4 bg-slate-800/30 border border-white/5 rounded-2xl hover:bg-slate-800/50 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <Layers size={18} className="text-blue-400 flex-shrink-0" />
            <div className="text-left overflow-hidden">
              <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">
                Workspace Ativo
              </p>
              <p className="text-xs font-bold text-white truncate">
                {activeWorkspace?.name || 'Selecionar Workspace'}
              </p>
            </div>
          </div>
          <ChevronDown
            size={16}
            className={`text-slate-500 transition-transform flex-shrink-0 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl z-50 max-h-64 overflow-y-auto">
            <div className="p-2">
              <button
                onClick={() => {
                  onAddWorkspace();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-600/10 text-blue-400 transition-all"
              >
                <Plus size={16} />
                <span className="text-xs font-bold">Criar Novo Workspace</span>
              </button>

              <div className="h-px bg-white/5 my-2" />

              {workspaces.length === 0 ? (
                <div className="p-4 text-center">
                  <p className="text-xs text-slate-600">Nenhum workspace disponível</p>
                </div>
              ) : (
                workspaces.map((workspace) => (
                  <div
                    key={workspace.id}
                    className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                      activeWorkspace?.id === workspace.id
                        ? 'bg-blue-600/10 text-blue-400'
                        : 'hover:bg-white/5 text-slate-300'
                    }`}
                  >
                    <div
                      onClick={() => {
                        onSelectWorkspace(workspace);
                        setIsOpen(false);
                      }}
                      className="flex-1 overflow-hidden"
                    >
                      <p className="text-xs font-bold truncate">{workspace.name}</p>
                      {workspace.description && (
                        <p className="text-[10px] text-slate-600 truncate">
                          {workspace.description}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteWorkspace(workspace.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1.5 hover:text-red-400 transition-all ml-2"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}