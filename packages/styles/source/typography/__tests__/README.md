# Typography Test Suite

This directory contains snapshot tests for the typography styles in the UMD Styles Library.

## Overview

Typography tests ensure that our typography styles remain consistent over time. They capture the exact structure of each style object and compare it against a baseline version stored in the `__snapshots__` directory.

## Running Tests

To run all typography tests:

```bash
npm run test:snapshot:typography
```

To update snapshots after intentional changes:

```bash
npm run test:snapshot:typography
```

## Test Structure

The typography test suite includes tests for:

- **Typography Module Structure**: Tests for the main module exports (`index.test.ts`)
- **Sans-Serif Styles**: Tests for sans-serif typography styles (`sans.test.ts`)
- **Serif Styles**: Tests for serif typography styles (`serif.test.ts`)
- **Campaign Styles**: Tests for campaign typography styles (`campaign.test.ts`)
- **Element Styles**: Tests for element-specific typography styles (`elements.test.ts`)
- **Statistics Styles**: Tests for statistics typography styles (`stats.test.ts`)
- **Font Faces**: Tests for font-face definitions and browser integration (`font-face/__tests__/index.test.ts`)

## Test Coverage

We maintain 100% test coverage for the typography styles to ensure:

1. All typography variants are captured in snapshots
2. Proper application of font families
3. Responsive behavior via media queries
4. Correct class name generation
5. Font face definitions are properly formatted

## Adding New Typography Styles

When adding new typography styles:

1. Add the new style file in `source/typography/`
2. Export it from the appropriate module
3. Create or update tests in `__tests__/`
4. Run `npm run test:snapshot:typography` to generate snapshots
5. Review the snapshots to ensure they match expectations