module.exports = {
  preset: 'ts-jest',
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
  ],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  moduleNameMapper: {
    '^@universityofmaryland/web-styles-library$':
      '<rootDir>/__mocks__/webStylesLibrary.js',
    '^@universityofmaryland/web-elements-library$':
      '<rootDir>/__mocks__/webElementsLibrary.js',
    '^elements$': '<rootDir>/__mocks__/elements.js',
    '^macros$': '<rootDir>/__mocks__/macros.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(web-styles-library|web-elements-library)/)',
  ],
  extensionsToTreatAsEsm: ['.ts'],
};
