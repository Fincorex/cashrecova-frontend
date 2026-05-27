import { createContext, useContext, useState, useEffect } from 'react';
import { ThemeContextType } from '../../types';

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme_config');
    const config = saved ? JSON.parse(saved) : null;
    return config ? config.dark === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isRTL, setIsRTL] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme_config');
    const config = saved ? JSON.parse(saved) : null;
    return config ? config.rtl === 'true' : false;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
      html.setAttribute('data-pc-theme', 'dark');
    } else {
      html.classList.remove('dark');
      html.setAttribute('data-pc-theme', 'light');
    }

    if (isRTL) {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('data-pc-direction', 'rtl');
    } else {
      html.setAttribute('dir', 'ltr');
      html.setAttribute('data-pc-direction', 'ltr');
    }

    localStorage.setItem('theme_config', JSON.stringify({ 
      dark: isDarkMode ? 'true' : 'false', 
      rtl: isRTL ? 'true' : 'false',
      preset: 'ai'
    }));
  }, [isDarkMode, isRTL]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleRTL = () => setIsRTL(!isRTL);

  const value: ThemeContextType = {
    isDarkMode,
    isRTL,
    toggleDarkMode,
    toggleRTL
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
