/**
 * Theme Management System
 * Handles theme switching, persistence, and system preference detection
 */

import React from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type Font = 'poppins' | 'inter' | 'roboto' | 'opensans';

export interface ThemeConfig {
  theme: Theme;
  font: Font;
}

class ThemeManager {
  private static instance: ThemeManager;
  private currentTheme: Theme = 'system';
  private currentFont: Font = 'poppins';
  private mediaQuery: MediaQueryList | null = null;
  private listeners: Set<(config: ThemeConfig) => void> = new Set();

  private constructor() {
    if (typeof window !== 'undefined') {
      this.initializeTheme();
      this.initializeFont();
      this.setupSystemThemeListener();
    }
  }

  public static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  /**
   * Initialize theme from localStorage or system preference
   */
  private initializeTheme(): void {
    try {
      const savedTheme = localStorage.getItem('linksnap-theme') as Theme;
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        this.currentTheme = savedTheme;
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
    }
    
    this.applyTheme();
  }

  /**
   * Initialize font from localStorage
   */
  private initializeFont(): void {
    try {
      const savedFont = localStorage.getItem('linksnap-font') as Font;
      if (savedFont && ['poppins', 'inter', 'roboto', 'opensans'].includes(savedFont)) {
        this.currentFont = savedFont;
      }
    } catch (error) {
      console.warn('Failed to load font from localStorage:', error);
    }
    
    this.applyFont();
  }

  /**
   * Setup system theme preference listener
   */
  private setupSystemThemeListener(): void {
    if (window.matchMedia) {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.mediaQuery.addEventListener('change', this.handleSystemThemeChange.bind(this));
    }
  }

  /**
   * Handle system theme preference changes
   */
  private handleSystemThemeChange(): void {
    if (this.currentTheme === 'system') {
      this.applyTheme();
    }
  }

  /**
   * Get the effective theme (resolves 'system' to 'light' or 'dark')
   */
  private getEffectiveTheme(): 'light' | 'dark' {
    if (this.currentTheme === 'system') {
      return this.mediaQuery?.matches ? 'dark' : 'light';
    }
    return this.currentTheme;
  }

  /**
   * Apply the current theme to the document
   */
  private applyTheme(): void {
    const effectiveTheme = this.getEffectiveTheme();
    document.documentElement.setAttribute('data-theme', effectiveTheme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', effectiveTheme === 'dark' ? '#0F172A' : '#FFFFFF');
    }
  }

  /**
   * Apply the current font to the document
   */
  private applyFont(): void {
    document.documentElement.setAttribute('data-font', this.currentFont);
  }

  /**
   * Set the theme and persist to localStorage
   */
  public setTheme(theme: Theme): void {
    this.currentTheme = theme;
    
    try {
      localStorage.setItem('linksnap-theme', theme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
    
    this.applyTheme();
    this.notifyListeners();
  }

  /**
   * Set the font and persist to localStorage
   */
  public setFont(font: Font): void {
    this.currentFont = font;
    
    try {
      localStorage.setItem('linksnap-font', font);
    } catch (error) {
      console.warn('Failed to save font to localStorage:', error);
    }
    
    this.applyFont();
    this.notifyListeners();
  }

  /**
   * Get current theme configuration
   */
  public getConfig(): ThemeConfig {
    return {
      theme: this.currentTheme,
      font: this.currentFont
    };
  }

  /**
   * Get effective theme (resolves system preference)
   */
  public getEffectiveThemeValue(): 'light' | 'dark' {
    return this.getEffectiveTheme();
  }

  /**
   * Subscribe to theme/font changes
   */
  public subscribe(callback: (config: ThemeConfig) => void): () => void {
    this.listeners.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(callback);
    };
  }

  /**
   * Notify all listeners of configuration changes
   */
  private notifyListeners(): void {
    const config = this.getConfig();
    this.listeners.forEach(callback => callback(config));
  }

  /**
   * Toggle between light and dark themes
   */
  public toggleTheme(): void {
    const effectiveTheme = this.getEffectiveTheme();
    this.setTheme(effectiveTheme === 'light' ? 'dark' : 'light');
  }

  /**
   * Check if system supports dark mode
   */
  public supportsSystemTheme(): boolean {
    return typeof window !== 'undefined' && window.matchMedia && 
           window.matchMedia('(prefers-color-scheme: dark)').media !== 'not all';
  }

  /**
   * Cleanup method for removing event listeners
   */
  public cleanup(): void {
    if (this.mediaQuery) {
      this.mediaQuery.removeEventListener('change', this.handleSystemThemeChange.bind(this));
    }
    this.listeners.clear();
  }
}

// Export singleton instance
export const themeManager = ThemeManager.getInstance();

// React hook for theme management
export function useTheme() {
  const [config, setConfig] = React.useState<ThemeConfig>(themeManager.getConfig());

  React.useEffect(() => {
    const unsubscribe = themeManager.subscribe(setConfig);
    return unsubscribe;
  }, []);

  return {
    ...config,
    effectiveTheme: themeManager.getEffectiveThemeValue(),
    setTheme: themeManager.setTheme.bind(themeManager),
    setFont: themeManager.setFont.bind(themeManager),
    toggleTheme: themeManager.toggleTheme.bind(themeManager),
    supportsSystemTheme: themeManager.supportsSystemTheme()
  };
}

// Font configuration
export const fontOptions = [
  { value: 'poppins', label: 'Poppins', preview: 'The quick brown fox jumps over the lazy dog' },
  { value: 'inter', label: 'Inter', preview: 'The quick brown fox jumps over the lazy dog' },
  { value: 'roboto', label: 'Roboto', preview: 'The quick brown fox jumps over the lazy dog' },
  { value: 'opensans', label: 'Open Sans', preview: 'The quick brown fox jumps over the lazy dog' }
] as const;