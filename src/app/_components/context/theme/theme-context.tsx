'use client';

import { createContext } from 'react';

export const ThemeContext = createContext({});

interface ThemeProviderProps {
  children: React.ReactNode;
}
export function ThemeProvider(props: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value='dark'>{props.children}</ThemeContext.Provider>
  );
}
