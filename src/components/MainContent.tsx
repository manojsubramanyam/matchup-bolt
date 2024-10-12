import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import HomePage from './HomePage';

const MainContent: React.FC = () => {
  const { currentTheme, getColor } = useTheme();

  return (
    <div className={`min-h-screen ${currentTheme === 'light' ? 'bg-white' : 'bg-gray-900'}`}
         style={{ color: getColor(currentTheme === 'light' ? 'appBlack' : 'appWhite') }}>
      <HomePage />
    </div>
  );
};

export default MainContent;
