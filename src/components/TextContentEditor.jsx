import React, { useState } from 'react';
import { useTheme } from '../components/ThemeContext';

const randomQuotes = [
  { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Success is not in what you have, but who you are.", author: "Bo Bennett" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" }
];

const TextContentEditor = ({
  text,
  onTextChange,
  placeholder = "Enter your text here...",
  author = "",
  onAuthorChange,
  showQuoteSection,
  setShowQuoteSection
}) => {
  const theme = useTheme();

  const handleRandomQuote = () => {
    const random = randomQuotes[Math.floor(Math.random() * randomQuotes.length)];
    onTextChange(random.text);
    if (onAuthorChange) onAuthorChange(random.author);
  };

  const handleQuoteToggle = () => {
    setShowQuoteSection(true);
    if (!text && onTextChange && onAuthorChange) {
      const random = randomQuotes[Math.floor(Math.random() * randomQuotes.length)];
      onTextChange(random.text);
      onAuthorChange(random.author);
    }
  };

  return (
    <div className="space-y-3">
      <label className={`text-sm font-medium ${theme.text} block`}>Text or Quote</label>
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={() => {
            setShowQuoteSection(false);
            onAuthorChange(""); // Clear author when switching to Text
          }}
          className={`px-3 py-1 rounded ${!showQuoteSection ? 'bg-blue-600 text-white' : `${theme.button} ${theme.text}`}`}
        >
          Text
        </button>
        <button
          type="button"
          onClick={handleQuoteToggle}
          className={`px-3 py-1 rounded ${showQuoteSection ? 'bg-blue-600 text-white' : `${theme.button} ${theme.text}`}`}
        >
          Quote
        </button>
      </div>
      {!showQuoteSection ? (
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors ${theme.input}`}
          rows={4}
          placeholder={placeholder}
        />
      ) : (
        <div className="space-y-2">
          <textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors ${theme.input}`}
            rows={3}
            placeholder="Enter quote..."
          />
          <input
            type="text"
            value={author}
            onChange={(e) => onAuthorChange && onAuthorChange(e.target.value)}
            className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${theme.input}`}
            placeholder="Author (optional)"
          />
          <button
            type="button"
            onClick={handleRandomQuote}
            className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Random Quote
          </button>
        </div>
      )}
    </div>
  );
};

const ParentComponent = () => {
  const [config, setConfig] = useState({ text: '', author: '' });
  const { text, author } = config;

  const updateConfig = (newConfig) => {
    setConfig((prevConfig) => ({ ...prevConfig, ...newConfig }));
  };

  return (
    <TextContentEditor
      text={config.text}
      onTextChange={(text) => updateConfig({ text })}
      placeholder="Enter your text here..."
      author={author}
      onAuthorChange={(author) => updateConfig({ author })}
    />
  );
};

export default TextContentEditor;