const path = require('path');
const rootConfig = require('../../jest.config');

module.exports = {
  ...rootConfig,
  displayName: 'feeds',
  testEnvironment: 'jsdom',
  rootDir: path.resolve(__dirname),
  moduleNameMapper: rootConfig.moduleNameMapper,
};
