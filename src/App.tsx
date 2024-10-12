import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import MainContent from './components/MainContent';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <MainContent />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
