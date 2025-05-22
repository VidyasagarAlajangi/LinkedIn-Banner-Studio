import React from 'react';
import { useTheme } from '../components/ThemeContext';

const ColorPicker = ({ label, color, onChange }) => {
  const theme = useTheme();
  
  return (
    <div className="space-y-2">
      <label className={`text-sm font-medium ${theme.text}`}>{label}</label>
      <div className="flex items-center space-x-2">
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded border cursor-pointer"
        />
        <span className={`text-sm ${theme.textSecondary}`}>{color}</span>
      </div>
    </div>
  );
};

export default ColorPicker;