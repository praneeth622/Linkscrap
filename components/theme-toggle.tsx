'use client';

import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './theme-provider';

export function ThemeToggle() {
  const { theme, effectiveTheme, setTheme, supportsSystemTheme } = useTheme();

  const themes = [
    { value: 'light' as const, icon: Sun, label: 'Light' },
    { value: 'dark' as const, icon: Moon, label: 'Dark' },
    ...(supportsSystemTheme ? [{ value: 'system' as const, icon: Monitor, label: 'System' }] : [])
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
            ${theme === value 
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            }
          `}
          title={`Switch to ${label.toLowerCase()} theme`}
          aria-label={`Switch to ${label.toLowerCase()} theme`}
        >
          <Icon className="w-4 h-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}

export function SimpleThemeToggle() {
  const { effectiveTheme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
      title={`Switch to ${effectiveTheme === 'light' ? 'dark' : 'light'} theme`}
      aria-label={`Switch to ${effectiveTheme === 'light' ? 'dark' : 'light'} theme`}
    >
      {effectiveTheme === 'light' ? (
        <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      ) : (
        <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      )}
    </button>
  );
}