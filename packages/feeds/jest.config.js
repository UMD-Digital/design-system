const path = require('path');
const rootConfig = require('../../jest.config');

module.exports = {
  ...rootConfig,
  displayName: 'feeds',
  testEnvironment: 'jsdom',
  rootDir: path.resolve(__dirname),
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
