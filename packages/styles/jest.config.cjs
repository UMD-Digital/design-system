const path = require('path');
const rootConfig = require('../../jest.config.cjs');

module.exports = {
  ...rootConfig,
  testEnvironment: 'node',
  rootDir: path.resolve(__dirname),
};
