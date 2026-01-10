/**
 * Performance Script Types
 *
 * Type definitions for the design system performance analysis scripts.
 * These scripts help identify potential LCP/FCP issues at build time.
 */

export type IssueSeverity = 'critical' | 'warning' | 'info';

export type LoadingStrategy = 'eager' | 'lazy' | 'defer' | 'none';

export type ComponentCategory = 'hero' | 'card' | 'pathway' | 'feed' | 'other';

export interface PerformanceThresholds {
  lcp: {
    good: number;
    needsImprovement: number;
    poor: number;
  };
  fcp: {
    good: number;
    needsImprovement: number;
    poor: number;
  };
}

export const DEFAULT_THRESHOLDS: PerformanceThresholds = {
  lcp: {
    good: 2.5,
    needsImprovement: 4.0,
    poor: 4.0,
  },
  fcp: {
    good: 1.8,
    needsImprovement: 3.0,
    poor: 3.0,
  },
};

export interface AssetUsage {
  filePath: string;
  line: number;
  assetType: 'image' | 'video' | 'gif';
  loadingAttribute: LoadingStrategy;
  fetchPriority: 'high' | 'low' | 'auto' | 'none';
  componentCategory: ComponentCategory;
  isAboveFold: boolean;
}

export interface PerformanceIssue {
  severity: IssueSeverity;
  message: string;
  filePath: string;
  line: number;
  recommendation: string;
  assetType?: 'image' | 'video' | 'gif';
}

export interface FCPAnalysisResult {
  issues: PerformanceIssue[];
  assetCount: {
    total: number;
    withLazyLoading: number;
    withEagerLoading: number;
    withoutLoading: number;
  };
  componentBreakdown: Record<ComponentCategory, number>;
}

export interface AssetAuditResult {
  images: {
    total: number;
    withLazy: number;
    withEager: number;
    withoutAttribute: number;
    withHighPriority: number;
    withLowPriority: number;
  };
  videos: {
    total: number;
    withPreloadAuto: number;
    withPreloadMetadata: number;
    withPreloadNone: number;
    withHighPriority: number;
  };
  gifs: {
    total: number;
    withDeferredLoading: number;
    withoutDeferredLoading: number;
  };
}

export interface PerformanceReport {
  timestamp: string;
  analysis: FCPAnalysisResult;
  audit: AssetAuditResult;
  summary: {
    criticalIssues: number;
    warnings: number;
    passed: boolean;
  };
}

export interface PerformanceConfig {
  thresholds: PerformanceThresholds;
  aboveFoldComponents: string[];
  alwaysLazyComponents: string[];
  excludePaths: string[];
  outputFormat: 'terminal' | 'json' | 'both';
}

export const DEFAULT_CONFIG: PerformanceConfig = {
  thresholds: DEFAULT_THRESHOLDS,
  aboveFoldComponents: [
    'hero',
    'pathway-hero',
    'card-overlay',
  ],
  alwaysLazyComponents: [
    'card',
    'feed',
    'quote',
    'person',
  ],
  excludePaths: [
    'node_modules',
    '__tests__',
    '__mocks__',
    'dist',
  ],
  outputFormat: 'terminal',
};
