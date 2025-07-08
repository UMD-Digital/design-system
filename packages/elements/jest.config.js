const path = require('path');
const rootConfig = require('../../jest.config');

module.exports = {
  ...rootConfig,
  displayName: 'elements',
  testEnvironment: 'jsdom',
  rootDir: path.resolve(__dirname),
  moduleNameMapper: {
    ...rootConfig.moduleNameMapper,
    // Add path mappings to match tsconfig.json baseUrl
    '^atomic$': '<rootDir>/source/atomic',
    '^atomic/(.*)$': '<rootDir>/source/atomic/$1',
    '^composite$': '<rootDir>/source/composite',
    '^composite/(.*)$': '<rootDir>/source/composite/$1',
    '^layout$': '<rootDir>/source/layout',
    '^layout/(.*)$': '<rootDir>/source/layout/$1',
    '^model$': '<rootDir>/source/model',
    '^model/(.*)$': '<rootDir>/source/model/$1',
    '^utilities$': '<rootDir>/source/utilities',
    '^utilities/(.*)$': '<rootDir>/source/utilities/$1',
    '^_types$': '<rootDir>/source/_types',
  },
};
