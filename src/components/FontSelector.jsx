import React from 'react';
import { useTheme } from '../components/ThemeContext';
import { fonts } from '../components/constants';

const FontSelector = ({ selectedFont, onFontChange }) => {
  const theme = useTheme();
  
  return (
    <div className="space-y-3">
      <label className={`text-sm font-medium ${theme.text}`}>Font Family</label>
      <select
        value={selectedFont}
        onChange={(e) => onFontChange(e.target.value)}
        className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme.input}`}
      >
        {fonts.map((font) => (
          <option key={font.name} value={font.family} style={{ fontFamily: font.family }}>
            {font.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FontSelector;