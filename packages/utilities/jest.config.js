import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootConfig = require('../../jest.config.cjs');

export default {
  ...rootConfig,
  displayName: 'utilities',
  testEnvironment: 'jsdom',
  rootDir: resolve(__dirname),
  collectCoverageFrom: [
    'source/**/*.ts',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/__tests__/**',
    '!**/index.ts', // Exclude barrel exports from coverage
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(web-utilities-library)/)',
  ],
};