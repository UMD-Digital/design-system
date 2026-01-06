module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/__tests__', '<rootDir>/source', '<rootDir>/scripts'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  collectCoverageFrom: [
    'source/**/*.ts',
    'scripts/figma-sync/**/*.ts',
    '!source/**/*.test.ts',
    '!source/**/__tests__/**',
    '!scripts/**/__tests__/**',
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
