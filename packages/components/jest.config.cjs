const path = require('path');
const rootConfig = require('../../jest.config');

module.exports = {
  ...rootConfig,
  testEnvironment: 'jsdom',
  rootDir: path.resolve(__dirname),
  setupFilesAfterEnv: ['<rootDir>/__tests__/test-helpers/setup.ts'],
  testTimeout: 10000, // 10 seconds for CI environments
  moduleNameMapper: {
    ...rootConfig.moduleNameMapper,
    '^utilities$': '<rootDir>/source/utilities',
    '^utilities/(.*)$': '<rootDir>/source/utilities/$1',
    '^_types$': '<rootDir>/source/_types',
    '(.*)source/(.*)$': '<rootDir>/source/$2',
    '(.*)test-helpers/component$': '<rootDir>/__tests__/test-helpers/component.ts',
    '(.*)test-helpers/validation$': '<rootDir>/__tests__/test-helpers/validation.ts',
    '(.*)test-helpers$': '<rootDir>/__tests__/test-helpers/index.ts',
  },
  moduleDirectories: ['node_modules', '__tests__'],
  modulePaths: ['<rootDir>'],
};
