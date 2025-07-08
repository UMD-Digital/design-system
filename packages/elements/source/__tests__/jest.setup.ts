/**
 * Jest setup file for elements package
 * This file runs before all tests
 */

// Import global test setup
import './helpers/setup';

// Set up global test utilities
import * as testUtils from './utils';
import * as testHelpers from './helpers';

// Make utilities available globally for all tests
declare global {
  const testUtils: typeof import('./utils');
  const testHelpers: typeof import('./helpers');
}

(global as any).testUtils = testUtils;
(global as any).testHelpers = testHelpers;

// Clean up after each test
afterEach(() => {
  // Clear all mocks
  jest.clearAllMocks();
  
  // Clear timers
  jest.clearAllTimers();
  
  // Clear DOM
  document.body.innerHTML = '';
  document.head.innerHTML = '';
});

// Suppress console errors during tests (unless explicitly testing them)
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn((...args) => {
    // Only log errors that aren't expected in tests
    if (!args[0]?.includes('Expected test error')) {
      originalError(...args);
    }
  });
});

afterAll(() => {
  console.error = originalError;
});