#!/usr/bin/env node
/**
 * Count Web Components Script
 *
 * Counts all umd-element-* and umd-feed-* custom elements in the components package.
 * Can be run at any git commit to track component growth over time.
 *
 * Usage:
 *   node scripts/count-components.js
 *   node scripts/count-components.js --json
 *   node scripts/count-components.js --list
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const outputJson = args.includes('--json');
const outputList = args.includes('--list');

try {
  // Find all component files with tagName definitions
  const elementOutput = execSync(
    'grep -r "const tagName = " packages/components/source/api --include="*.ts" --exclude-dir="__tests__" 2>/dev/null | grep "umd-element-" || true',
    { encoding: 'utf8' }
  );
  const feedOutput = execSync(
    'grep -r "const tagName = " packages/components/source/api --include="*.ts" --exclude-dir="__tests__" 2>/dev/null | grep "umd-feed-" || true',
    { encoding: 'utf8' }
  );
  const output = elementOutput + '\n' + feedOutput;

  const elementTags = new Set();
  const feedTags = new Set();

  output.split('\n').forEach(line => {
    const match = line.match(/const tagName = ['"]([^'"]+)['"]/);
    if (match) {
      const tag = match[1];
      if (tag.startsWith('umd-element-')) {
        elementTags.add(tag);
      } else if (tag.startsWith('umd-feed-')) {
        feedTags.add(tag);
      }
    }
  });

  const elementList = Array.from(elementTags).sort();
  const feedList = Array.from(feedTags).sort();
  const total = elementList.length + feedList.length;

  if (outputJson) {
    // JSON output for programmatic use
    console.log(JSON.stringify({
      date: new Date().toISOString().split('T')[0],
      total,
      elements: elementList.length,
      feeds: feedList.length,
      elementList,
      feedList
    }, null, 2));
  } else if (outputList) {
    // Detailed list output
    console.log('umd-element-* components:');
    elementList.forEach((tag, i) => console.log(`  ${i + 1}. ${tag}`));
    console.log('\numd-feed-* components:');
    feedList.forEach((tag, i) => console.log(`  ${i + 1}. ${tag}`));
  } else {
    // Default summary output
    console.log(`umd-element-*: ${elementList.length}`);
    console.log(`umd-feed-*:    ${feedList.length}`);
    console.log(`TOTAL:         ${total}`);
  }
} catch (error) {
  console.error('Error counting components:', error.message);
  process.exit(1);
}
