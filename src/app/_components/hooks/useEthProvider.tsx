'use client'
import { ethProvider } from '@/utils/provider';

export const useEthProvider = () => {
  return ethProvider();
};
