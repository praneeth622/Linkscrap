'use client';

import React, { useState } from 'react';
import { ChevronDown, Type } from 'lucide-react';
import { useTheme } from './theme-provider';
import { fontOptions } from '@/lib/theme';

export function FontSelector() {
  const { font, setFont } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const currentFont = fontOptions.find(f => f.value === font) || fontOptions[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Type className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <div className="flex-1 text-left">
          <div className="font-medium text-gray-900 dark:text-gray-100">
            {currentFont.label}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400" style={{ fontFamily: `var(--font-${font})` }}>
            {currentFont.preview}
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Dropdown */}
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
            {fontOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setFont(option.value);
                  setIsOpen(false);
                }}
                className={`
                  w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0
                  ${font === option.value ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                `}
                role="option"
                aria-selected={font === option.value}
              >
                <div className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                  {option.label}
                  {font === option.value && (
                    <span className="ml-2 text-blue-600 dark:text-blue-400 text-sm">✓</span>
                  )}
                </div>
                <div 
                  className="text-sm text-gray-500 dark:text-gray-400"
                  style={{ fontFamily: `${option.label}, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` }}
                >
                  {option.preview}
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}