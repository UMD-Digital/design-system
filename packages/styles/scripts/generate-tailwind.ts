/**
 * @module scripts/generate-tailwind
 * CLI script for Tailwind CSS file generation.
 *
 * This script uses the pure generateTailwindStrings function from exports
 * and handles the file writing. The generation logic is in the exports
 * module for testability, while this script handles Node.js-specific
 * file operations.
 *
 * @example
 * ```bash
 * npm run build:tailwind
 * ```
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateTailwindStrings } from '../source/exports/tailwind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');

interface GenerateTailwindResult {
  files: string[];
  errors: string[];
}

async function generateTailwindFiles(
  outputDir: string,
): Promise<GenerateTailwindResult> {
  const files: string[] = [];
  const errors: string[] = [];

  // Ensure output directory exists
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }

  try {
    // Generate all Tailwind strings
    const tailwindStrings = generateTailwindStrings();

    // Write each file
    const fileMap = {
      'tailwind.css': tailwindStrings.tailwind,
      'tailwind-theme.css': tailwindStrings.themeOnly,
    };

    for (const [filename, content] of Object.entries(fileMap)) {
      const filePath = path.join(outputDir, filename);
      await writeFile(filePath, content);
      files.push(filePath);
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);
    errors.push(`Tailwind generation failed: ${errorMessage}`);
  }

  return { files, errors };
}

generateTailwindFiles(DIST_DIR)
  .then((result) => {
    if (result.errors.length > 0) {
      console.error('Tailwind generation errors:', result.errors);
      process.exit(1);
    }
    console.log(`Generated ${result.files.length} Tailwind files`);
  })
  .catch((error) => {
    console.error('Tailwind generation failed:', error);
    process.exit(1);
  });
