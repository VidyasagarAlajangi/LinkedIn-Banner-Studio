import React from 'react';
import { Download, Sun, Moon, Shuffle } from 'lucide-react';
import { useTheme } from '../components/ThemeContext';

const Header = ({ onDownload, onRandomText }) => {
  const theme = useTheme();
  
  return (
    <header className={`${theme.cardBg} shadow-sm border-b ${theme.border}`}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold ${theme.text}`}>LinkedIn Banner Studio</h1>
            <p className={`${theme.textSecondary} mt-1`}>Create beautiful, shareable banners with custom backgrounds</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={theme.toggleTheme}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${theme.button} ${theme.text}`}
            >
              {theme.isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={onRandomText}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${theme.button} ${theme.text}`}
            >
              <Shuffle className="w-4 h-4" />
              <span>Random</span>
            </button>
            <button
              onClick={onDownload}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;