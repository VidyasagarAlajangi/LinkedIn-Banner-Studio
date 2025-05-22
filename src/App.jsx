import React, { useState, useRef, useCallback } from 'react';
import { ThemeProvider } from './components/ThemeContext';
import { fonts, templates, randomTexts, gradients } from './components/constants';
import Header from './components/Header';
import Footer from './components/Footer';
import TextContentEditor from './components/TextContentEditor';
import FontSelector from './components/FontSelector';
import ColorPicker from './components/ColorPicker';
import TemplateSelector from './components/TemplateSelector';
import BackgroundSelector from './components/BackgroundSelector';
import BannerCanvas from './components/BannerCanvas';
import { downloadBanner } from './components/DownloadUtils';
import { useTheme } from './components/ThemeContext';

const QuoteBannerStudio = () => {
  const theme = useTheme();
  const canvasRef = useRef(null);
  
  const [config, setConfig] = useState({
    text: "Create something amazing today",
    fontSize: 32,
    fontWeight: 400,
    fontFamily: fonts[0].family,
    textColor: "#ffffff",
    background: gradients[0].value,
    backgroundType: 'gradient',
    backgroundImage: null,
    imageOpacity: 0.8,
    template: templates[0]
  });
  
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [author, setAuthor] = useState("");

  const updateConfig = (updates) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const handleImageUpload = (imageDataUrl) => {
    updateConfig({ 
      backgroundImage: imageDataUrl,
      backgroundType: 'image'
    });
  };

  const handleImageChange = (imageUrl) => {
    updateConfig({ 
      backgroundImage: imageUrl,
      backgroundType: 'image'
    });
  };

  const handleDownload = useCallback(async () => {
    await downloadBanner(canvasRef, config);
  }, [config]);

  const randomizeText = () => {
    const randomText = randomTexts[Math.floor(Math.random() * randomTexts.length)];
    updateConfig({ text: randomText });
  };

  return (
    <>
      <Header onDownload={handleDownload} onRandomText={randomizeText} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Canvas Preview */}
          <div className="lg:col-span-2">
            <div className={`${theme.cardBg} rounded-xl ${theme.shadow} p-8`}>
              <h2 className={`text-xl font-semibold ${theme.text} mb-6`}>Preview</h2>
              <div className="flex justify-center">
                <BannerCanvas ref={canvasRef} config={{ ...config, author }} />
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            {/* Text Content */}
            <div className={`${theme.cardBg} rounded-xl ${theme.shadow} p-6`}>
              <h3 className={`text-lg font-semibold ${theme.text} mb-4`}>Content</h3>
              <TextContentEditor
                text={config.text}
                onTextChange={(text) => updateConfig({ text })}
                placeholder="Enter your text here..."
                author={author}
                onAuthorChange={setAuthor}
              />
            </div>

            {/* Typography */}
            <div className={`${theme.cardBg} rounded-xl ${theme.shadow} p-6`}>
              <h3 className={`text-lg font-semibold ${theme.text} mb-4`}>Typography</h3>
              <div className="space-y-5">
                <FontSelector
                  selectedFont={config.fontFamily}
                  onFontChange={(font) => updateConfig({ fontFamily: font })}
                />
                <div>
                  <label className={`text-sm font-medium ${theme.text} mb-2 block`}>
                    Font Size: {config.fontSize}px
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="60"
                    value={config.fontSize}
                    onChange={(e) => updateConfig({ fontSize: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className={`text-sm font-medium ${theme.text} mb-2 block`}>Font Weight</label>
                  <select
                    value={config.fontWeight}
                    onChange={(e) => updateConfig({ fontWeight: parseInt(e.target.value) })}
                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme.input}`}
                  >
                    <option value={300}>Light</option>
                    <option value={400}>Regular</option>
                    <option value={500}>Medium</option>
                    <option value={600}>Semi Bold</option>
                    <option value={700}>Bold</option>
                  </select>
                </div>
                <ColorPicker
                  label="Text Color"
                  color={config.textColor}
                  onChange={(color) => updateConfig({ textColor: color })}
                />
              </div>
            </div>

            {/* Design */}
            <div className={`${theme.cardBg} rounded-xl ${theme.shadow} p-6`}>
              <h3 className={`text-lg font-semibold ${theme.text} mb-4`}>Design</h3>
              <div className="space-y-5">
                <TemplateSelector
                  selectedTemplate={config.template}
                  onTemplateChange={(template) => updateConfig({ template })}
                />
                <BackgroundSelector
                  backgroundType={config.backgroundType}
                  onBackgroundTypeChange={(type) => updateConfig({ backgroundType: type })}
                  selectedGradient={config.background}
                  onGradientChange={(gradient) => updateConfig({ background: gradient })}
                  selectedImage={config.backgroundImage}
                  onImageChange={handleImageChange}
                  customImageUrl={customImageUrl}
                  onCustomImageUrlChange={setCustomImageUrl}
                  onImageUpload={handleImageUpload}
                  opacity={config.imageOpacity}
                  onOpacityChange={(opacity) => updateConfig({ imageOpacity: opacity })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

// App with Theme Provider
const App = () => {
  return (
    <ThemeProvider>
      <QuoteBannerStudio />
    </ThemeProvider>
  );
};

export default App;