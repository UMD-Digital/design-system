const path = require('path');

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
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  moduleNameMapper: {
    '^@universityofmaryland/web-token-library$': path.resolve(
      __dirname,
      './__mocks__/webTokenLibrary.js',
    ),
    '^@universityofmaryland/web-token-library/font$': path.resolve(
      __dirname,
      './__mocks__/@universityofmaryland/web-token-library/font.js',
    ),
    '^@universityofmaryland/web-token-library/media$': path.resolve(
      __dirname,
      './__mocks__/@universityofmaryland/web-token-library/media.js',
    ),
    '^@universityofmaryland/web-styles-library$': path.resolve(
      __dirname,
      './__mocks__/webStylesLibrary.js',
    ),
    '^@universityofmaryland/web-styles-library/typography$': path.resolve(
      __dirname,
      './__mocks__/@universityofmaryland/web-styles-library/typography.js',
    ),
    '^@universityofmaryland/web-utilities-library$': path.resolve(
      __dirname,
      './__mocks__/webUtilitiesLibrary.js',
    ),
    '^@universityofmaryland/web-utilities-library/network$': path.resolve(
      __dirname,
      './__mocks__/@universityofmaryland/web-utilities-library/network.js',
    ),
    '^@universityofmaryland/web-utilities-library/elements$': path.resolve(
      __dirname,
      './__mocks__/@universityofmaryland/web-utilities-library/elements.js',
    ),
    '^@universityofmaryland/web-utilities-library/validation$': path.resolve(
      __dirname,
      './__mocks__/@universityofmaryland/web-utilities-library/validation.js',
    ),
    '^@universityofmaryland/web-utilities-library/accessibility$': path.resolve(
      __dirname,
      './__mocks__/@universityofmaryland/web-utilities-library/accessibility.js',
    ),
    '^@universityofmaryland/web-utilities-library/adapters$': path.resolve(
      __dirname,
      './__mocks__/@universityofmaryland/web-utilities-library/adapters.js',
    ),
    '^@universityofmaryland/web-utilities-library/dom$': path.resolve(
      __dirname,
      './__mocks__/@universityofmaryland/web-utilities-library/dom.js',
    ),
    '^@universityofmaryland/web-utilities-library/date$': path.resolve(
      __dirname,
      './__mocks__/@universityofmaryland/web-utilities-library/date.js',
    ),
    '^@universityofmaryland/web-utilities-library/theme$': path.resolve(
      __dirname,
      './__mocks__/@universityofmaryland/web-utilities-library/theme.js',
    ),
    '^@universityofmaryland/web-utilities-library/styles$': path.resolve(
      __dirname,
      './__mocks__/@universityofmaryland/web-utilities-library/styles.js',
    ),
    '^@universityofmaryland/web-builder-library$': path.resolve(
      __dirname,
      './__mocks__/webBuilderLibrary.js',
    ),
    '^@universityofmaryland/web-model-library$': path.resolve(
      __dirname,
      './__mocks__/webModelLibrary.js',
    ),
    '^@universityofmaryland/web-elements-library/atomic$': path.resolve(
      __dirname,
      './__mocks__/@universityofmaryland/web-elements-library/atomic.js',
    ),
    '^@universityofmaryland/web-elements-library/composite$': path.resolve(
      __dirname,
      './__mocks__/@universityofmaryland/web-elements-library/composite.js',
    ),
    '^@universityofmaryland/web-elements-library/layout$': path.resolve(
      __dirname,
      './__mocks__/@universityofmaryland/web-elements-library/layout.js',
    ),
    '^@universityofmaryland/web-elements-library$': path.resolve(
      __dirname,
      './__mocks__/webElementsLibrary.js',
    ),
    '^@universityofmaryland/web-feeds-library$': path.resolve(
      __dirname,
      './__mocks__/webFeedsLibrary.js',
    ),
    '^@universityofmaryland/web-feeds-library/events$': path.resolve(
      __dirname,
      './__mocks__/@universityofmaryland/web-feeds-library/events.js',
    ),
    '^@universityofmaryland/web-feeds-library/news$': path.resolve(
      __dirname,
      './__mocks__/@universityofmaryland/web-feeds-library/news.js',
    ),
    '^@universityofmaryland/web-feeds-library/academic$': path.resolve(
      __dirname,
      './__mocks__/@universityofmaryland/web-feeds-library/academic.js',
    ),
    '^@universityofmaryland/web-components-library$': path.resolve(
      __dirname,
      './__mocks__/webComponentsLibrary.js',
    ),
    '^elements$': path.resolve(__dirname, './__mocks__/elements.js'),
    '^macros$': path.resolve(__dirname, './__mocks__/macros.js'),
  },
  transformIgnorePatterns: [
    'node_modules/(?!(web-styles-library|web-elements-library)/)',
  ],
  extensionsToTreatAsEsm: ['.ts'],
};
