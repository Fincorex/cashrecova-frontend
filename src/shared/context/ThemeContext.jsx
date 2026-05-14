import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme_config');
    const config = saved ? JSON.parse(saved) : null;
    return config ? config.dark === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isRTL, setIsRTL] = useState(() => {
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

  return (
    <ThemeContext.Provider value={{ isDarkMode, isRTL, toggleDarkMode, toggleRTL }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
