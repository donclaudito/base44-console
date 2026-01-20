import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { RefreshCw } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to Console
    navigate(createPageUrl('Console'));
  }, [navigate]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <RefreshCw className="animate-spin text-blue-500" size={40} />
        <p className="text-slate-500 font-mono text-xs animate-pulse uppercase tracking-widest">
          BOOTING ORENSTEIN AI CONSOLE...
        </p>
      </div>
    </div>
  );
}