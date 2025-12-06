const path = require('path');
const rootConfig = require('../../jest.config');

module.exports = {
  ...rootConfig,
  testEnvironment: 'jsdom',
  rootDir: path.resolve(__dirname),
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'],
  testTimeout: 10000,
};
