'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { themeManager, type ThemeConfig } from '@/lib/theme';

interface ThemeContextType extends ThemeConfig {
  effectiveTheme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setFont: (font: 'poppins' | 'inter' | 'roboto' | 'opensans') => void;
  toggleTheme: () => void;
  supportsSystemTheme: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<ThemeConfig>(() => themeManager.getConfig());
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>(() => 
    themeManager.getEffectiveThemeValue()
  );

  useEffect(() => {
    const unsubscribe = themeManager.subscribe((newConfig) => {
      setConfig(newConfig);
      setEffectiveTheme(themeManager.getEffectiveThemeValue());
    });

    return unsubscribe;
  }, []);

  const value: ThemeContextType = {
    ...config,
    effectiveTheme,
    setTheme: themeManager.setTheme.bind(themeManager),
    setFont: themeManager.setFont.bind(themeManager),
    toggleTheme: themeManager.toggleTheme.bind(themeManager),
    supportsSystemTheme: themeManager.supportsSystemTheme()
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}