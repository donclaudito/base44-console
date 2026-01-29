import React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2.5 lg:p-3 bg-white/5 dark:bg-white/5 hover:bg-white/10 dark:hover:bg-white/10 rounded-xl lg:rounded-2xl transition-all touch-manipulation"
      aria-label="Alternar tema"
    >
      {theme === 'dark' ? (
        <Sun size={16} className="text-slate-400 dark:text-slate-400" />
      ) : (
        <Moon size={16} className="text-slate-600" />
      )}
    </button>
  );
}