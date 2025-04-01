import React from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors group"
      aria-label="Toggle theme"
    >
      <div className="absolute inset-0 rounded-lg bg-gray-100 dark:bg-gray-800 transform transition-transform group-hover:scale-110 opacity-0 group-hover:opacity-100" />
      <div className="relative">
        {isDark ? (
          <Sun className="w-5 h-5 transform transition-transform group-hover:rotate-180" />
        ) : (
          <Moon className="w-5 h-5 transform transition-transform group-hover:-rotate-180" />
        )}
      </div>
      <div className="absolute inset-0 rounded-lg ring-2 ring-gray-200 dark:ring-gray-700 transform transition-transform group-hover:scale-105 opacity-0 group-hover:opacity-100" />
    </button>
  );
}