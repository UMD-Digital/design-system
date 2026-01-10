export { debounce } from './debounce';
export {
  LCP_THRESHOLD_GOOD,
  LCP_THRESHOLD_NEEDS_IMPROVEMENT,
  FCP_THRESHOLD_GOOD,
  FCP_THRESHOLD_NEEDS_IMPROVEMENT,
  THRESHOLDS,
  isLCPGood,
  isFCPGood,
  getLCPRating,
  getFCPRating,
  msToSeconds,
  secondsToMs,
  type WebVitalsRating,
} from './thresholds';
export {
  observeFCP,
  observeLCP,
  getFCP,
  getNavigationTiming,
  markPerformance,
  measurePerformance,
  clearPerformanceMarks,
  type PerformanceMetricEntry,
  type MetricsCallback,
} from './metrics';