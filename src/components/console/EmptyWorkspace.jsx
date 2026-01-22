import React from 'react';
import { Box } from 'lucide-react';

export default function EmptyWorkspace({ onAddClick }) {
  const [iconSize, setIconSize] = React.useState(54);

  React.useEffect(() => {
    const updateSize = () => setIconSize(window.innerWidth < 640 ? 40 : 54);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 sm:p-10">
      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-slate-900/50 rounded-[2rem] sm:rounded-[3rem] flex items-center justify-center mb-6 sm:mb-8 border border-white/5 shadow-2xl">
        <Box size={iconSize} className="text-blue-600 opacity-30" />
      </div>
      <h3 className="text-xl sm:text-2xl font-black text-white mb-2 sm:mb-3 px-4">Workspace Orenstein AI</h3>
      <p className="text-slate-500 text-xs sm:text-sm max-w-sm font-medium leading-relaxed px-4">
        Selecione uma aplicação na barra lateral ou adicione um novo endereço para carregar o terminal de trabalho.
      </p>
      <button
        onClick={onAddClick}
        className="mt-8 sm:mt-10 px-6 sm:px-8 py-3 sm:py-4 bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs transition-all border border-blue-500/20 touch-manipulation"
      >
        ADICIONAR PRIMEIRA APP
      </button>
    </div>
  );
}