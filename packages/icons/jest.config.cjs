const path = require('path');

module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'source/**/*.ts',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/__tests__/**',
    '!**/index.ts', // Exclude barrel exports from coverage
  ],
  transform: {
    '^.+\\.ts$': [
      '@swc/jest',
      {
        jsc: {
          parser: { syntax: 'typescript', decorators: true },
          transform: { decoratorVersion: '2022-03' },
          target: 'es2020',
        },
        module: { type: 'commonjs' },
      },
    ],
  },
  transformIgnorePatterns: [
    'node_modules/',
  ],
};
