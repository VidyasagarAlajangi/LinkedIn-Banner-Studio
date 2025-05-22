import React from 'react';
import { useTheme } from '../components/ThemeContext';
import { templates } from '../components/constants';

const TemplateSelector = ({ selectedTemplate, onTemplateChange }) => {
  const theme = useTheme();
  
  return (
    <div className="space-y-3">
      <label className={`text-sm font-medium ${theme.text}`}>Layout</label>
      <div className="grid grid-cols-2 gap-2">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateChange(template)}
            className={`p-4 border-2 rounded-lg transition-all ${
              selectedTemplate?.id === template.id
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : `${theme.border} ${theme.button} ${theme.text}`
            }`}
          >
            <span className="text-sm font-medium">{template.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;