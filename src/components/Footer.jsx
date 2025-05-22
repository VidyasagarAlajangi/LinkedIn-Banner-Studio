import React from 'react';
import { useTheme } from '../components/ThemeContext';

const Footer = () => {
  const theme = useTheme();
  
  return (
    <footer className={`${theme.cardBg} border-t ${theme.border} mt-16`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className={`text-center ${theme.textSecondary}`}>
          <p>
            Create with fun by{' '}
            <a
              href="https://www.linkedin.com/in/vidyasagaralajangi/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-500"
            >
              VidyaSagar Alajangi
            </a>
          </p>
          <p className="mt-2 text-sm">Hope this helps for You...💓</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;