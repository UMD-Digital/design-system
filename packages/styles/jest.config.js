const path = require('path');
const rootConfig = require('../../jest.config');

module.exports = {
  ...rootConfig,
  testEnvironment: 'node',
  rootDir: path.resolve(__dirname),
};
