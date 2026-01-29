import React, { useState } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export default function IframeViewer({ site }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (!site || !site.id || !site.url) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-slate-500 text-sm">Nenhuma aplicação selecionada</p>
      </div>
    );
  }

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="flex-1 m-4 lg:m-6 bg-white rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-slate-900/50 relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950 z-10">
          <div className="flex flex-col items-center gap-4">
            <RefreshCw className="animate-spin text-blue-500" size={32} />
            <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">
              A carregar interface...
            </p>
          </div>
        </div>
      )}
      
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950 z-10">
          <div className="flex flex-col items-center gap-4 text-center p-8">
            <AlertTriangle className="text-amber-500" size={48} />
            <p className="text-white font-bold">Não foi possível carregar o site</p>
            <p className="text-slate-500 text-sm max-w-md">
              O site pode estar bloqueando o carregamento em iframe. Tente abrir em nova aba.
            </p>
            <a
              href={site.url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold text-xs hover:bg-blue-700 transition-all"
            >
              ABRIR EM NOVA ABA
            </a>
          </div>
        </div>
      )}

      <iframe
        src={site.url}
        className="w-full h-full border-none bg-white"
        title={site.name}
        onLoad={handleLoad}
        onError={handleError}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
}