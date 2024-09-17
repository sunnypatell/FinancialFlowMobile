import React, { createContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

export const lightColors = {
  background: '#FFFFFF',
  cardBackground: '#F0F0F0',
  text: '#000000',
  subtext: '#666666',
  primary: '#3B82F6',
  success: '#10B981',
  error: '#EF4444',
  chartColors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
};

export const darkColors = {
  background: '#1F2937',
  cardBackground: '#374151',
  text: '#FFFFFF',
  subtext: '#9CA3AF',
  primary: '#60A5FA',
  success: '#34D399',
  error: '#F87171',
  chartColors: ['#60A5FA', '#34D399', '#FBBF24', '#F87171', '#A78BFA'],
};

export const ThemeContext = createContext({
  isDark: false,
  colors: lightColors,
  setColorScheme: (scheme: 'light' | 'dark') => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode, initialTheme?: 'light' | 'dark' }> = ({ children, initialTheme = 'light' }) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(initialTheme === 'dark');

  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

  const defaultTheme = {
    isDark,
    colors: isDark ? darkColors : lightColors,
    setColorScheme: (scheme: 'light' | 'dark') => {
      setIsDark(scheme === 'dark');
    },
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};