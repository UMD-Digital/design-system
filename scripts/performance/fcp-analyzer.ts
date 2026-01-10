#!/usr/bin/env ts-node
/**
 * FCP Analyzer
 *
 * Static analysis tool to detect potential First Contentful Paint issues
 * in the design system codebase. Analyzes asset loading patterns and
 * identifies components that may negatively impact FCP/LCP metrics.
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  type AssetUsage,
  type ComponentCategory,
  type FCPAnalysisResult,
  type IssueSeverity,
  type LoadingStrategy,
  type PerformanceConfig,
  type PerformanceIssue,
  DEFAULT_CONFIG,
} from './types';

const ELEMENTS_PATH = path.resolve(__dirname, '../../packages/elements/source');

// Patterns to detect asset usage
const ASSET_PATTERNS = {
  imageBackground: /assets\.image\.background\s*\(\s*\{([^}]+)\}/g,
  videoObserved: /assets\.video\.observedAutoPlay\s*\(\s*\{([^}]+)\}/g,
  gifToggle: /isGifAllowed\s*:\s*true/g,
};

// Component category detection based on file path
const detectComponentCategory = (filePath: string): ComponentCategory => {
  if (filePath.includes('/hero/')) return 'hero';
  if (filePath.includes('/card/')) return 'card';
  if (filePath.includes('/pathway/')) return 'pathway';
  if (filePath.includes('/feed/') || filePath.includes('/feeds/')) return 'feed';
  return 'other';
};

// Check if component is above-fold based on config
const isAboveFoldComponent = (
  filePath: string,
  config: PerformanceConfig,
): boolean => {
  const category = detectComponentCategory(filePath);
  const fileName = path.basename(filePath, '.ts');

  // Heroes are always above-fold
  if (category === 'hero') return true;

  // Check specific component patterns
  for (const pattern of config.aboveFoldComponents) {
    if (filePath.includes(pattern) || fileName.includes(pattern)) {
      return true;
    }
  }

  return false;
};

// Extract loading attribute from asset call
const extractLoadingAttribute = (content: string): LoadingStrategy => {
  const eagerMatch = /imageLoading\s*:\s*['"]eager['"]/.test(content);
  const lazyMatch = /imageLoading\s*:\s*['"]lazy['"]/.test(content);
  const autoMatch = /imageLoading\s*:\s*['"]auto['"]/.test(content);

  if (eagerMatch) return 'eager';
  if (lazyMatch) return 'lazy';
  if (autoMatch) return 'none';
  return 'none'; // Default - no attribute specified
};

// Extract fetch priority from asset call
const extractFetchPriority = (
  content: string,
): 'high' | 'low' | 'auto' | 'none' => {
  const highMatch = /imageFetchPriority\s*:\s*['"]high['"]/.test(content);
  const lowMatch = /imageFetchPriority\s*:\s*['"]low['"]/.test(content);
  const autoMatch = /imageFetchPriority\s*:\s*['"]auto['"]/.test(content);

  if (highMatch) return 'high';
  if (lowMatch) return 'low';
  if (autoMatch) return 'auto';
  return 'none';
};

// Extract video preload from asset call
const extractVideoPreload = (
  content: string,
): 'auto' | 'metadata' | 'none' => {
  const autoMatch = /videoPreload\s*:\s*['"]auto['"]/.test(content);
  const metadataMatch = /videoPreload\s*:\s*['"]metadata['"]/.test(content);
  const noneMatch = /videoPreload\s*:\s*['"]none['"]/.test(content);

  if (autoMatch) return 'auto';
  if (metadataMatch) return 'metadata';
  if (noneMatch) return 'none';
  return 'none'; // Default
};

// Get line number for a match
const getLineNumber = (content: string, matchIndex: number): number => {
  const lines = content.substring(0, matchIndex).split('\n');
  return lines.length;
};

// Analyze a single file
const analyzeFile = (
  filePath: string,
  config: PerformanceConfig,
): { assets: AssetUsage[]; issues: PerformanceIssue[] } => {
  const assets: AssetUsage[] = [];
  const issues: PerformanceIssue[] = [];

  const content = fs.readFileSync(filePath, 'utf-8');
  const category = detectComponentCategory(filePath);
  const isAboveFold = isAboveFoldComponent(filePath, config);

  // Analyze image.background calls
  let match;
  const imagePattern = new RegExp(ASSET_PATTERNS.imageBackground.source, 'g');
  while ((match = imagePattern.exec(content)) !== null) {
    const assetContent = match[1];
    const line = getLineNumber(content, match.index);
    const loadingAttribute = extractLoadingAttribute(assetContent);
    const fetchPriority = extractFetchPriority(assetContent);
    const hasGif = /isGifAllowed\s*:\s*true/.test(assetContent);

    assets.push({
      filePath,
      line,
      assetType: hasGif ? 'gif' : 'image',
      loadingAttribute,
      fetchPriority,
      componentCategory: category,
      isAboveFold,
    });

    // Check for issues
    if (isAboveFold && loadingAttribute === 'lazy') {
      issues.push({
        severity: 'warning',
        message: `Above-fold component uses lazy loading for image`,
        filePath,
        line,
        recommendation: 'Use imageLoading: "eager" for above-fold images',
        assetType: hasGif ? 'gif' : 'image',
      });
    }

    if (isAboveFold && fetchPriority === 'none') {
      issues.push({
        severity: 'info',
        message: `Above-fold image missing fetchpriority attribute`,
        filePath,
        line,
        recommendation: 'Consider adding imageFetchPriority: "high" for above-fold images',
        assetType: 'image',
      });
    }

    if (!isAboveFold && loadingAttribute === 'eager') {
      issues.push({
        severity: 'info',
        message: `Below-fold component uses eager loading for image`,
        filePath,
        line,
        recommendation: 'Consider using imageLoading: "lazy" for below-fold images',
        assetType: 'image',
      });
    }

    if (loadingAttribute === 'none') {
      issues.push({
        severity: isAboveFold ? 'info' : 'warning',
        message: `Image missing loading attribute`,
        filePath,
        line,
        recommendation: isAboveFold
          ? 'Add imageLoading: "eager" for above-fold images'
          : 'Add imageLoading: "lazy" for below-fold images',
        assetType: 'image',
      });
    }
  }

  // Analyze video.observedAutoPlay calls
  const videoPattern = new RegExp(ASSET_PATTERNS.videoObserved.source, 'g');
  while ((match = videoPattern.exec(content)) !== null) {
    const assetContent = match[1];
    const line = getLineNumber(content, match.index);
    const preload = extractVideoPreload(assetContent);

    assets.push({
      filePath,
      line,
      assetType: 'video',
      loadingAttribute: preload === 'auto' ? 'eager' : 'lazy',
      fetchPriority: extractFetchPriority(assetContent.replace('video', 'image')),
      componentCategory: category,
      isAboveFold,
    });

    // Check for video issues
    if (isAboveFold && preload === 'none') {
      issues.push({
        severity: 'warning',
        message: `Above-fold video missing preload attribute`,
        filePath,
        line,
        recommendation: 'Add videoPreload: "auto" for above-fold videos',
        assetType: 'video',
      });
    }
  }

  return { assets, issues };
};

// Recursively find TypeScript files
const findTsFiles = (
  dir: string,
  config: PerformanceConfig,
): string[] => {
  const files: string[] = [];

  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    // Skip excluded paths
    if (config.excludePaths.some((p) => fullPath.includes(p))) {
      continue;
    }

    if (item.isDirectory()) {
      files.push(...findTsFiles(fullPath, config));
    } else if (item.isFile() && item.name.endsWith('.ts') && !item.name.endsWith('.test.ts')) {
      files.push(fullPath);
    }
  }

  return files;
};

// Main analysis function
export const analyzeFCP = (
  config: PerformanceConfig = DEFAULT_CONFIG,
): FCPAnalysisResult => {
  const allAssets: AssetUsage[] = [];
  const allIssues: PerformanceIssue[] = [];

  const files = findTsFiles(ELEMENTS_PATH, config);

  for (const file of files) {
    const { assets, issues } = analyzeFile(file, config);
    allAssets.push(...assets);
    allIssues.push(...issues);
  }

  // Calculate statistics
  const assetCount = {
    total: allAssets.length,
    withLazyLoading: allAssets.filter((a) => a.loadingAttribute === 'lazy').length,
    withEagerLoading: allAssets.filter((a) => a.loadingAttribute === 'eager').length,
    withoutLoading: allAssets.filter((a) => a.loadingAttribute === 'none').length,
  };

  const componentBreakdown: Record<ComponentCategory, number> = {
    hero: allAssets.filter((a) => a.componentCategory === 'hero').length,
    card: allAssets.filter((a) => a.componentCategory === 'card').length,
    pathway: allAssets.filter((a) => a.componentCategory === 'pathway').length,
    feed: allAssets.filter((a) => a.componentCategory === 'feed').length,
    other: allAssets.filter((a) => a.componentCategory === 'other').length,
  };

  return {
    issues: allIssues,
    assetCount,
    componentBreakdown,
  };
};

// CLI execution
if (require.main === module) {
  console.log('\n=== FCP Analysis ===\n');

  const result = analyzeFCP();

  console.log('Asset Count:');
  console.log(`  Total: ${result.assetCount.total}`);
  console.log(`  With lazy loading: ${result.assetCount.withLazyLoading}`);
  console.log(`  With eager loading: ${result.assetCount.withEagerLoading}`);
  console.log(`  Without loading attribute: ${result.assetCount.withoutLoading}`);

  console.log('\nComponent Breakdown:');
  Object.entries(result.componentBreakdown).forEach(([category, count]) => {
    console.log(`  ${category}: ${count}`);
  });

  console.log('\nIssues Found:');
  if (result.issues.length === 0) {
    console.log('  No issues found!');
  } else {
    result.issues.forEach((issue) => {
      const severityColor =
        issue.severity === 'critical'
          ? '\x1b[31m'
          : issue.severity === 'warning'
          ? '\x1b[33m'
          : '\x1b[36m';
      console.log(
        `  ${severityColor}[${issue.severity.toUpperCase()}]\x1b[0m ${issue.message}`,
      );
      console.log(`    File: ${path.relative(process.cwd(), issue.filePath)}:${issue.line}`);
      console.log(`    Recommendation: ${issue.recommendation}`);
    });
  }

  console.log('');
}
