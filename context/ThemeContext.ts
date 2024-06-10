'use client';

import { createContext } from 'react';
import { ThemeVariants } from '../types';

interface IThemeContext {
  theme: string | undefined;
  toggleTheme: () => void;
}

export default createContext<IThemeContext>({
  theme: ThemeVariants.LIGHT,
  toggleTheme: () => {},
});
