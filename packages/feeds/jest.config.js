import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootConfig = require('../../jest.config.cjs');

export default {
  ...rootConfig,
  displayName: 'feeds',
  testEnvironment: 'jsdom',
  rootDir: resolve(__dirname),
  moduleNameMapper: {
    ...rootConfig.moduleNameMapper,
    '^factory$': '<rootDir>/source/factory',
    '^strategies$': '<rootDir>/source/strategies',
    '^states$': '<rootDir>/source/states',
    '^helpers$': '<rootDir>/source/helpers',
    '^widgets$': '<rootDir>/source/widgets',
    '^types$': '<rootDir>/source/types',
    '^types/(.*)$': '<rootDir>/source/types/$1',
  },
};
