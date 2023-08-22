'use client';

import styles from '@/app/page.module.css';
import { Inter } from 'next/font/google';
import { Profiler } from 'react';
import { Dashboard } from './_components/dashboard/dashboard';
import { getAppPerformance } from './api/data';
const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function Home() {
  const handlerProfiler = (
    id: any,
    phase: any,
    actualDuration: any,
    baseDuration: any,
    startTime: any,
    commitTime: any
  ) => {
    getAppPerformance({
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
    });
  };

  return (
    <div className={inter.className}>
      <div className={styles.main}>
        <Profiler id='profileWork' onRender={handlerProfiler}>
          <Dashboard />
        </Profiler>
      </div>
    </div>
  );
}
