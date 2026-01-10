#!/usr/bin/env ts-node
/**
 * Performance Report
 *
 * Aggregates results from FCP analysis and asset audit to generate
 * a comprehensive performance report. Supports terminal and JSON output.
 */

import * as fs from 'fs';
import * as path from 'path';
import { analyzeFCP } from './fcp-analyzer';
import { auditAssets } from './asset-audit';
import {
  type PerformanceConfig,
  type PerformanceReport,
  DEFAULT_CONFIG,
} from './types';

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
};

// Generate performance report
export const generateReport = (
  config: PerformanceConfig = DEFAULT_CONFIG,
): PerformanceReport => {
  const analysis = analyzeFCP(config);
  const audit = auditAssets(config);

  const criticalIssues = analysis.issues.filter(
    (i) => i.severity === 'critical',
  ).length;
  const warnings = analysis.issues.filter(
    (i) => i.severity === 'warning',
  ).length;

  // Pass if no critical issues and warnings are below threshold
  const passed = criticalIssues === 0 && warnings <= 5;

  return {
    timestamp: new Date().toISOString(),
    analysis,
    audit,
    summary: {
      criticalIssues,
      warnings,
      passed,
    },
  };
};

// Print divider
const divider = (char: string = '-', length: number = 50): string => {
  return char.repeat(length);
};

// Print section header
const sectionHeader = (title: string): void => {
  console.log('');
  console.log(`${colors.bold}${colors.blue}${title}${colors.reset}`);
  console.log(colors.dim + divider() + colors.reset);
};

// Print key-value pair
const printKV = (key: string, value: string | number, indent: number = 2): void => {
  const spaces = ' '.repeat(indent);
  console.log(`${spaces}${key}: ${colors.cyan}${value}${colors.reset}`);
};

// Print progress bar
const progressBar = (value: number, total: number, width: number = 20): string => {
  if (total === 0) return `[${'░'.repeat(width)}] 0%`;
  const percent = Math.round((value / total) * 100);
  const filled = Math.round((value / total) * width);
  const empty = width - filled;
  return `[${'█'.repeat(filled)}${'░'.repeat(empty)}] ${percent}%`;
};

// Print terminal report
const printTerminalReport = (report: PerformanceReport): void => {
  const { analysis, audit, summary } = report;

  // Header
  console.log('');
  console.log(colors.bold + '═══════════════════════════════════════════════════' + colors.reset);
  console.log(colors.bold + '         DESIGN SYSTEM PERFORMANCE REPORT          ' + colors.reset);
  console.log(colors.bold + '═══════════════════════════════════════════════════' + colors.reset);
  console.log(`${colors.dim}Generated: ${report.timestamp}${colors.reset}`);

  // Summary
  sectionHeader('Summary');
  const statusColor = summary.passed ? colors.green : colors.red;
  const statusIcon = summary.passed ? '✓' : '✗';
  console.log(`  Status: ${statusColor}${statusIcon} ${summary.passed ? 'PASSED' : 'FAILED'}${colors.reset}`);
  printKV('Critical Issues', summary.criticalIssues);
  printKV('Warnings', summary.warnings);

  // Asset Overview
  sectionHeader('Asset Overview');
  printKV('Total Images', audit.images.total);
  printKV('Total Videos', audit.videos.total);
  printKV('Total GIFs', audit.gifs.total);

  // Image Loading Analysis
  sectionHeader('Image Loading');
  console.log(`  Lazy:  ${progressBar(audit.images.withLazy, audit.images.total)} (${audit.images.withLazy})`);
  console.log(`  Eager: ${progressBar(audit.images.withEager, audit.images.total)} (${audit.images.withEager})`);
  console.log(`  None:  ${progressBar(audit.images.withoutAttribute, audit.images.total)} (${audit.images.withoutAttribute})`);

  // Video Preload Analysis
  sectionHeader('Video Preload');
  console.log(`  Auto:     ${progressBar(audit.videos.withPreloadAuto, audit.videos.total)} (${audit.videos.withPreloadAuto})`);
  console.log(`  Metadata: ${progressBar(audit.videos.withPreloadMetadata, audit.videos.total)} (${audit.videos.withPreloadMetadata})`);
  console.log(`  None:     ${progressBar(audit.videos.withPreloadNone, audit.videos.total)} (${audit.videos.withPreloadNone})`);

  // GIF Deferred Loading
  sectionHeader('GIF Deferred Loading');
  console.log(`  Deferred:     ${progressBar(audit.gifs.withDeferredLoading, audit.gifs.total)} (${audit.gifs.withDeferredLoading})`);
  console.log(`  Not Deferred: ${progressBar(audit.gifs.withoutDeferredLoading, audit.gifs.total)} (${audit.gifs.withoutDeferredLoading})`);

  // Component Breakdown
  sectionHeader('Assets by Component Type');
  const categories = analysis.componentBreakdown;
  const maxCategory = Math.max(...Object.values(categories), 1);
  Object.entries(categories).forEach(([category, count]) => {
    console.log(`  ${category.padEnd(10)} ${progressBar(count, maxCategory, 15)} (${count})`);
  });

  // Issues
  if (analysis.issues.length > 0) {
    sectionHeader(`Issues (${analysis.issues.length})`);

    const critical = analysis.issues.filter((i) => i.severity === 'critical');
    const warning = analysis.issues.filter((i) => i.severity === 'warning');
    const info = analysis.issues.filter((i) => i.severity === 'info');

    if (critical.length > 0) {
      console.log(`\n  ${colors.red}Critical (${critical.length}):${colors.reset}`);
      critical.slice(0, 5).forEach((issue) => {
        const relativePath = path.relative(process.cwd(), issue.filePath);
        console.log(`    ${colors.red}●${colors.reset} ${issue.message}`);
        console.log(`      ${colors.dim}${relativePath}:${issue.line}${colors.reset}`);
      });
      if (critical.length > 5) {
        console.log(`    ${colors.dim}... and ${critical.length - 5} more${colors.reset}`);
      }
    }

    if (warning.length > 0) {
      console.log(`\n  ${colors.yellow}Warnings (${warning.length}):${colors.reset}`);
      warning.slice(0, 5).forEach((issue) => {
        const relativePath = path.relative(process.cwd(), issue.filePath);
        console.log(`    ${colors.yellow}●${colors.reset} ${issue.message}`);
        console.log(`      ${colors.dim}${relativePath}:${issue.line}${colors.reset}`);
      });
      if (warning.length > 5) {
        console.log(`    ${colors.dim}... and ${warning.length - 5} more${colors.reset}`);
      }
    }

    if (info.length > 0) {
      console.log(`\n  ${colors.cyan}Info (${info.length}):${colors.reset}`);
      info.slice(0, 3).forEach((issue) => {
        const relativePath = path.relative(process.cwd(), issue.filePath);
        console.log(`    ${colors.cyan}●${colors.reset} ${issue.message}`);
        console.log(`      ${colors.dim}${relativePath}:${issue.line}${colors.reset}`);
      });
      if (info.length > 3) {
        console.log(`    ${colors.dim}... and ${info.length - 3} more${colors.reset}`);
      }
    }
  } else {
    sectionHeader('Issues');
    console.log(`  ${colors.green}✓ No issues found!${colors.reset}`);
  }

  // Recommendations
  sectionHeader('Recommendations');
  console.log('  1. Ensure all above-fold images use eager loading');
  console.log('  2. Ensure all below-fold images use lazy loading');
  console.log('  3. Videos in heroes should use preload="auto"');
  console.log('  4. GIFs should always use deferred loading');
  console.log('  5. Consider using fetchpriority="high" for LCP images');

  // Footer
  console.log('');
  console.log(colors.dim + divider('═') + colors.reset);
  console.log('');
};

// Print JSON report
const printJsonReport = (report: PerformanceReport): void => {
  console.log(JSON.stringify(report, null, 2));
};

// Save report to file
const saveReport = (report: PerformanceReport, outputPath: string): void => {
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`Report saved to: ${outputPath}`);
};

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const outputFormat = args.includes('--json') ? 'json' : 'terminal';
  const outputFile = args.find((a) => a.startsWith('--output='))?.split('=')[1];

  const config: PerformanceConfig = {
    ...DEFAULT_CONFIG,
    outputFormat,
  };

  const report = generateReport(config);

  if (outputFormat === 'json') {
    printJsonReport(report);
  } else {
    printTerminalReport(report);
  }

  if (outputFile) {
    saveReport(report, outputFile);
  }

  // Exit with appropriate code
  process.exit(report.summary.passed ? 0 : 1);
}

export { printTerminalReport, printJsonReport, saveReport };
