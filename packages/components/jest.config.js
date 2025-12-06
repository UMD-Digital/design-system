const path = require('path');
const rootConfig = require('../../jest.config');

module.exports = {
  ...rootConfig,
  testEnvironment: 'jsdom',
  rootDir: path.resolve(__dirname),
  setupFilesAfterEnv: ['<rootDir>/source/api/__tests__/test-helpers/setup.ts'],
  testTimeout: 10000, // 10 seconds for CI environments
  moduleNameMapper: {
    ...rootConfig.moduleNameMapper,
    '^utilities$': '<rootDir>/source/utilities',
    '^utilities/(.*)$': '<rootDir>/source/utilities/$1',
    '^_types$': '<rootDir>/source/_types',
  },
};
