'use client';

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

import { ThemeVariants } from 'types';
import { getPreference, setPreference } from 'helpers';

interface IThemeProviderProps {
  children: ReactNode;
  storageKey: string;
  startTheme?: string | undefined;
}

interface IThemeContext {
  theme: string | undefined;
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext>({
  theme: ThemeVariants.LIGHT,
  toggleTheme: () => {},
});

export const ThemeProvider = ({
  children,
  storageKey,
  startTheme = ThemeVariants.LIGHT,
}: IThemeProviderProps) => {
  const initialTheme = startTheme ?? getPreference(storageKey);
  const [theme, setTheme] = useState<string>(initialTheme);

  useEffect(() => {
    setPreference(storageKey, theme);
  }, [storageKey, theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) =>
      prevTheme === ThemeVariants.DARK ? ThemeVariants.LIGHT : ThemeVariants.DARK,
    );
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
