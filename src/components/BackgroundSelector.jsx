import React, { useState, useRef } from 'react';
import { Palette, Image, Upload, X } from 'lucide-react';
import { useTheme } from '../components/ThemeContext';
import { gradients, assetImages } from '../components/constants';

const BackgroundSelector = ({ 
  backgroundType, 
  onBackgroundTypeChange, 
  selectedGradient, 
  onGradientChange,
  selectedImage,
  onImageChange,
  customImageUrl,
  onCustomImageUrlChange,
  onImageUpload,
  opacity,
  onOpacityChange
}) => {
  const theme = useTheme();
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageUpload(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <label className={`text-sm font-medium ${theme.text}`}>Background Type</label>
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={() => onBackgroundTypeChange('gradient')}
          className={`flex-1 p-3 rounded-lg border-2 transition-all ${
            backgroundType === 'gradient'
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : `${theme.border} ${theme.button} ${theme.text}`
          }`}
        >
          <Palette className="w-4 h-4 mx-auto mb-1" />
          <span className="text-sm font-medium">Gradient</span>
        </button>
        <button
          type="button"
          onClick={() => onBackgroundTypeChange('image')}
          className={`flex-1 p-3 rounded-lg border-2 transition-all ${
            backgroundType === 'image'
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : `${theme.border} ${theme.button} ${theme.text}`
          }`}
        >
          <Image className="w-4 h-4 mx-auto mb-1" />
          <span className="text-sm font-medium">Image</span>
        </button>
      </div>

      {backgroundType === 'gradient' && (
        <div className="space-y-3">
          <label className={`text-sm font-medium ${theme.text}`}>Choose Gradient</label>
          <div className="grid grid-cols-2 gap-2">
            {gradients.map((gradient, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onGradientChange(gradient.value)}
                className={`h-12 rounded-lg border-2 transition-all ${
                  selectedGradient === gradient.value
                    ? 'border-blue-500 scale-105'
                    : `${theme.border} hover:border-gray-400`
                }`}
                style={{ background: gradient.value }}
                title={gradient.name}
              />
            ))}
          </div>
        </div>
      )}

      {backgroundType === 'image' && (
        <div className="space-y-4">
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`flex-1 p-3 border-2 border-dashed rounded-lg transition-colors ${theme.border} ${theme.button}`}
            >
              <Upload className="w-4 h-4 mx-auto mb-1" />
              <span className="text-sm">Upload</span>
            </button>
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className={`flex-1 p-3 border-2 border-dashed rounded-lg transition-colors ${theme.border} ${theme.button}`}
            >
              <span className="text-sm">URL</span>
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          {showUrlInput && (
            <div className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="url"
                  value={customImageUrl}
                  onChange={(e) => onCustomImageUrlChange(e.target.value)}
                  placeholder="Enter image URL..."
                  className={`flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme.input}`}
                />
                <button
                  type="button"
                  onClick={() => setShowUrlInput(false)}
                  className={`p-2 ${theme.textSecondary} hover:${theme.text}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => onImageChange(customImageUrl)}
                disabled={!customImageUrl}
                className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Use This Image
              </button>
            </div>
          )}

          <div className="space-y-2">
            <label className={`text-sm font-medium ${theme.text}`}>Asset Images</label>
            <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
              {assetImages.map((image, index) => (
                <label
                  key={index}
                  className={`relative cursor-pointer rounded-lg border-2 transition-all flex flex-col items-center p-2 ${
                    selectedImage === `/assets/${index + 1}.jpg`
                      ? 'border-blue-500 bg-blue-50'
                      : `${theme.border} ${theme.button}`
                  }`}
                  style={{ minHeight: 80 }}
                  title={image.name}
                >
                  <input
                    type="radio"
                    name="asset-image"
                    checked={selectedImage === `/assets/${index + 1}.jpg`}
                    onChange={() => onImageChange(`/assets/${index + 1}.jpg`)}
                    className="absolute top-2 left-2 accent-blue-500"
                  />
                  <img
                    src={`/assets/${index + 1}.jpg`}
                    alt={image.name}
                    className="w-full h-16 object-cover rounded mb-1"
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className={`text-sm font-medium ${theme.text}`}>Image Opacity</label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={opacity}
              onChange={e => onOpacityChange(parseFloat(e.target.value))}
              className="w-full"
            />
            <span className="text-xs">{Math.round(opacity * 100)}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundSelector;