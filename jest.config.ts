import '@testing-library/jest-dom'
import type { Config } from 'jest';

const config: Config = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  displayName: 'Client',
  clearMocks: true,
  snapshotSerializers: ['@emotion/jest/serializer'],
  // setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};

export default config;
