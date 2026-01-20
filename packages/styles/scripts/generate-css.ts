/**
 * @module scripts/generate-css
 * CLI script for CSS file generation.
 *
 * This script uses the pure generateCSSStrings function from exports
 * and handles the file writing. The generation logic is in the exports
 * module for testability, while this script handles Node.js-specific
 * file operations.
 *
 * @example
 * ```bash
 * npm run build:css
 * ```
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateCSSStrings } from '../source/exports/generate';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const CSS_OUTPUT_DIR = path.resolve(DIST_DIR, 'css');

interface GenerateCSSResult {
  files: string[];
  errors: string[];
}

async function generateAllCSS(outputDir: string): Promise<GenerateCSSResult> {
  const files: string[] = [];
  const errors: string[] = [];

  // Ensure output directory exists
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }

  try {
    // Generate all CSS strings
    const cssStrings = await generateCSSStrings();

    // Write each CSS file
    const fileMap = {
      'tokens.min.css': cssStrings.tokens,
      'typography.min.css': cssStrings.typography,
      'layout.min.css': cssStrings.layout,
      'element.min.css': cssStrings.element,
      'animation.min.css': cssStrings.animation,
      'accessibility.min.css': cssStrings.accessibility,
      'web-components.min.css': cssStrings.webComponents,
      'base.min.css': cssStrings.base,
      'styles.min.css': cssStrings.styles,
    };

    for (const [filename, content] of Object.entries(fileMap)) {
      const filePath = path.join(outputDir, filename);
      await writeFile(filePath, content);
      files.push(filePath);
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);
    errors.push(`CSS generation failed: ${errorMessage}`);
  }

  return { files, errors };
}

generateAllCSS(CSS_OUTPUT_DIR)
  .then((result) => {
    if (result.errors.length > 0) {
      console.error('CSS generation errors:', result.errors);
      process.exit(1);
    }
    console.log(`Generated ${result.files.length} CSS files`);
  })
  .catch((error) => {
    console.error('CSS generation failed:', error);
    process.exit(1);
  });
