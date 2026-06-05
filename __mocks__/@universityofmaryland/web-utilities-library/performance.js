// Mock for: @universityofmaryland/web-utilities-library/performance
// Mirrors the performance category exports used across packages.

// debounce returns a passthrough that invokes the callback synchronously,
// which keeps tests deterministic (no timers to flush).
const debounce = jest.fn((callback) => (...args) => callback(...args));

const noop = jest.fn();

module.exports = {
  debounce,

  // Web Vitals thresholds / ratings
  LCP_THRESHOLD_GOOD: 2500,
  LCP_THRESHOLD_NEEDS_IMPROVEMENT: 4000,
  FCP_THRESHOLD_GOOD: 1800,
  FCP_THRESHOLD_NEEDS_IMPROVEMENT: 3000,
  THRESHOLDS: {},
  isLCPGood: jest.fn(() => true),
  isFCPGood: jest.fn(() => true),
  getLCPRating: jest.fn(() => 'good'),
  getFCPRating: jest.fn(() => 'good'),
  msToSeconds: jest.fn((ms) => ms / 1000),
  secondsToMs: jest.fn((s) => s * 1000),

  // Metrics
  observeFCP: noop,
  observeLCP: noop,
  getFCP: jest.fn(() => null),
  getNavigationTiming: jest.fn(() => null),
  markPerformance: noop,
  measurePerformance: noop,
  clearPerformanceMarks: noop,
};
