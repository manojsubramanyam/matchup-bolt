import React, { createContext, useContext, useState, ReactNode } from 'react';
import { colors, ColorKey } from '../styles/colors';

type ThemeContextType = {
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
  getColor: (colorKey: ColorKey) => string;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setCurrentTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const getColor = (colorKey: ColorKey) => {
    return colors[colorKey];
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme, getColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
