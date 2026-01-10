#!/usr/bin/env ts-node
/**
 * Asset Audit
 *
 * Scans all components for asset patterns and generates a comprehensive
 * audit of image, video, and GIF usage across the design system.
 */

import * as fs from 'fs';
import * as path from 'path';
import { type AssetAuditResult, type PerformanceConfig, DEFAULT_CONFIG } from './types';

const PACKAGES_PATH = path.resolve(__dirname, '../../packages');

// Regex patterns for asset detection
const PATTERNS = {
  // Image patterns
  imageBackground: /assets\.image\.background\s*\(/g,
  imageLoading: /imageLoading\s*:\s*['"](\w+)['"]/g,
  imageFetchPriority: /imageFetchPriority\s*:\s*['"](\w+)['"]/g,

  // Video patterns
  videoObserved: /assets\.video\.observedAutoPlay\s*\(/g,
  videoPreload: /videoPreload\s*:\s*['"](\w+)['"]/g,
  videoFetchPriority: /videoFetchPriority\s*:\s*['"](\w+)['"]/g,

  // GIF patterns
  gifAllowed: /isGifAllowed\s*:\s*true/g,
  gifToggle: /assets\.image\.gif/g,
};

interface FileAnalysis {
  images: {
    total: number;
    lazy: number;
    eager: number;
    noAttribute: number;
    highPriority: number;
    lowPriority: number;
  };
  videos: {
    total: number;
    preloadAuto: number;
    preloadMetadata: number;
    preloadNone: number;
    highPriority: number;
  };
  gifs: {
    total: number;
    withDeferred: number;
    withoutDeferred: number;
  };
}

const createEmptyAnalysis = (): FileAnalysis => ({
  images: {
    total: 0,
    lazy: 0,
    eager: 0,
    noAttribute: 0,
    highPriority: 0,
    lowPriority: 0,
  },
  videos: {
    total: 0,
    preloadAuto: 0,
    preloadMetadata: 0,
    preloadNone: 0,
    highPriority: 0,
  },
  gifs: {
    total: 0,
    withDeferred: 0,
    withoutDeferred: 0,
  },
});

// Analyze a single file for asset patterns
const analyzeFile = (filePath: string): FileAnalysis => {
  const analysis = createEmptyAnalysis();
  const content = fs.readFileSync(filePath, 'utf-8');

  // Count image.background calls
  const imageMatches = content.match(PATTERNS.imageBackground) || [];
  analysis.images.total = imageMatches.length;

  // Check for loading attributes in image calls
  if (analysis.images.total > 0) {
    const lazyCount = (content.match(/imageLoading\s*:\s*['"]lazy['"]/g) || []).length;
    const eagerCount = (content.match(/imageLoading\s*:\s*['"]eager['"]/g) || []).length;
    analysis.images.lazy = lazyCount;
    analysis.images.eager = eagerCount;
    analysis.images.noAttribute = Math.max(0, analysis.images.total - lazyCount - eagerCount);

    // Check fetch priority
    const highCount = (content.match(/imageFetchPriority\s*:\s*['"]high['"]/g) || []).length;
    const lowCount = (content.match(/imageFetchPriority\s*:\s*['"]low['"]/g) || []).length;
    analysis.images.highPriority = highCount;
    analysis.images.lowPriority = lowCount;
  }

  // Count video.observedAutoPlay calls
  const videoMatches = content.match(PATTERNS.videoObserved) || [];
  analysis.videos.total = videoMatches.length;

  // Check video preload
  if (analysis.videos.total > 0) {
    const autoCount = (content.match(/videoPreload\s*:\s*['"]auto['"]/g) || []).length;
    const metadataCount = (content.match(/videoPreload\s*:\s*['"]metadata['"]/g) || []).length;
    const noneCount = (content.match(/videoPreload\s*:\s*['"]none['"]/g) || []).length;
    analysis.videos.preloadAuto = autoCount;
    analysis.videos.preloadMetadata = metadataCount;
    analysis.videos.preloadNone = Math.max(0, analysis.videos.total - autoCount - metadataCount - noneCount);

    // Check video fetch priority
    const highCount = (content.match(/videoFetchPriority\s*:\s*['"]high['"]/g) || []).length;
    analysis.videos.highPriority = highCount;
  }

  // Count GIF usage
  const gifAllowedMatches = content.match(PATTERNS.gifAllowed) || [];
  const gifToggleMatches = content.match(PATTERNS.gifToggle) || [];
  analysis.gifs.total = gifAllowedMatches.length + gifToggleMatches.length;

  // GIFs should always use deferred loading (handled by the component)
  // We count those in gif.ts as properly deferred
  if (filePath.includes('gif.ts')) {
    analysis.gifs.withDeferred = analysis.gifs.total;
  } else {
    // GIFs in other files that use isGifAllowed will be handled by the background component
    analysis.gifs.withDeferred = gifAllowedMatches.length;
    analysis.gifs.withoutDeferred = gifToggleMatches.length;
  }

  return analysis;
};

// Recursively find TypeScript files
const findTsFiles = (
  dir: string,
  config: PerformanceConfig,
): string[] => {
  const files: string[] = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    // Skip excluded paths
    if (config.excludePaths.some((p) => fullPath.includes(p))) {
      continue;
    }

    if (item.isDirectory()) {
      files.push(...findTsFiles(fullPath, config));
    } else if (
      item.isFile() &&
      item.name.endsWith('.ts') &&
      !item.name.endsWith('.test.ts') &&
      !item.name.endsWith('.d.ts')
    ) {
      files.push(fullPath);
    }
  }

  return files;
};

// Merge analysis results
const mergeAnalysis = (results: FileAnalysis[]): AssetAuditResult => {
  const merged: AssetAuditResult = {
    images: {
      total: 0,
      withLazy: 0,
      withEager: 0,
      withoutAttribute: 0,
      withHighPriority: 0,
      withLowPriority: 0,
    },
    videos: {
      total: 0,
      withPreloadAuto: 0,
      withPreloadMetadata: 0,
      withPreloadNone: 0,
      withHighPriority: 0,
    },
    gifs: {
      total: 0,
      withDeferredLoading: 0,
      withoutDeferredLoading: 0,
    },
  };

  for (const result of results) {
    merged.images.total += result.images.total;
    merged.images.withLazy += result.images.lazy;
    merged.images.withEager += result.images.eager;
    merged.images.withoutAttribute += result.images.noAttribute;
    merged.images.withHighPriority += result.images.highPriority;
    merged.images.withLowPriority += result.images.lowPriority;

    merged.videos.total += result.videos.total;
    merged.videos.withPreloadAuto += result.videos.preloadAuto;
    merged.videos.withPreloadMetadata += result.videos.preloadMetadata;
    merged.videos.withPreloadNone += result.videos.preloadNone;
    merged.videos.withHighPriority += result.videos.highPriority;

    merged.gifs.total += result.gifs.total;
    merged.gifs.withDeferredLoading += result.gifs.withDeferred;
    merged.gifs.withoutDeferredLoading += result.gifs.withoutDeferred;
  }

  return merged;
};

// Main audit function
export const auditAssets = (
  config: PerformanceConfig = DEFAULT_CONFIG,
): AssetAuditResult => {
  const packagesToScan = ['elements', 'components', 'feeds'];
  const allResults: FileAnalysis[] = [];

  for (const pkg of packagesToScan) {
    const pkgPath = path.join(PACKAGES_PATH, pkg, 'source');
    const files = findTsFiles(pkgPath, config);

    for (const file of files) {
      const result = analyzeFile(file);
      if (
        result.images.total > 0 ||
        result.videos.total > 0 ||
        result.gifs.total > 0
      ) {
        allResults.push(result);
      }
    }
  }

  return mergeAnalysis(allResults);
};

// Format percentage
const formatPercent = (value: number, total: number): string => {
  if (total === 0) return '0%';
  return `${Math.round((value / total) * 100)}%`;
};

// CLI execution
if (require.main === module) {
  console.log('\n=== Asset Audit ===\n');

  const result = auditAssets();

  console.log('Images:');
  console.log(`  Total: ${result.images.total}`);
  console.log(`  With lazy loading: ${result.images.withLazy} (${formatPercent(result.images.withLazy, result.images.total)})`);
  console.log(`  With eager loading: ${result.images.withEager} (${formatPercent(result.images.withEager, result.images.total)})`);
  console.log(`  Without loading attribute: ${result.images.withoutAttribute} (${formatPercent(result.images.withoutAttribute, result.images.total)})`);
  console.log(`  With high priority: ${result.images.withHighPriority}`);
  console.log(`  With low priority: ${result.images.withLowPriority}`);

  console.log('\nVideos:');
  console.log(`  Total: ${result.videos.total}`);
  console.log(`  With preload=auto: ${result.videos.withPreloadAuto} (${formatPercent(result.videos.withPreloadAuto, result.videos.total)})`);
  console.log(`  With preload=metadata: ${result.videos.withPreloadMetadata} (${formatPercent(result.videos.withPreloadMetadata, result.videos.total)})`);
  console.log(`  With preload=none: ${result.videos.withPreloadNone} (${formatPercent(result.videos.withPreloadNone, result.videos.total)})`);
  console.log(`  With high priority: ${result.videos.withHighPriority}`);

  console.log('\nGIFs:');
  console.log(`  Total: ${result.gifs.total}`);
  console.log(`  With deferred loading: ${result.gifs.withDeferredLoading} (${formatPercent(result.gifs.withDeferredLoading, result.gifs.total)})`);
  console.log(`  Without deferred loading: ${result.gifs.withoutDeferredLoading} (${formatPercent(result.gifs.withoutDeferredLoading, result.gifs.total)})`);

  console.log('');
}
