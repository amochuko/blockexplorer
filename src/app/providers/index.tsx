'use client';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { ThemeProvider } from '../_components/context/theme/theme-context';

interface ProvidersProps {
  children: React.ReactNode;
}
export const Providers = (props: ProvidersProps) => {
  return (
    <CacheProvider>
      <ChakraProvider>
        <ThemeProvider>{props.children}</ThemeProvider>
      </ChakraProvider>
    </CacheProvider>
  );
};
