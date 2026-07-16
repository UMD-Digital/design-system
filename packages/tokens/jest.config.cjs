module.exports = {
  testEnvironment: 'node',
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
  roots: ['<rootDir>/__tests__', '<rootDir>/source'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  collectCoverageFrom: [
    'source/**/*.ts',
    '!source/**/*.test.ts',
    '!source/**/__tests__/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/source/$1',
  },
};
