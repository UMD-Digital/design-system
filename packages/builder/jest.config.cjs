const path = require('path');
const rootConfig = require('../../jest.config.cjs');

module.exports = {
  ...rootConfig,
  displayName: 'builder',
  testEnvironment: 'jsdom',
  rootDir: path.resolve(__dirname),
  moduleNameMapper: {
    ...rootConfig.moduleNameMapper,
  },
};
