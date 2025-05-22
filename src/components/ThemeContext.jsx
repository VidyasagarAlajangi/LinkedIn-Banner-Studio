import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  const theme = {
    isDark,
    toggleTheme,
    bg: isDark ? 'bg-gray-900' : 'bg-gray-50',
    cardBg: isDark ? 'bg-gray-800' : 'bg-white',
    text: isDark ? 'text-white' : 'text-gray-900',
    textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
    border: isDark ? 'border-gray-700' : 'border-gray-200',
    input: isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900',
    button: isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200',
    shadow: isDark ? 'shadow-2xl shadow-black/20' : 'shadow-lg'
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`min-h-screen transition-colors duration-200 ${theme.bg}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};