# Accessibility Styles Snapshot Tests

This directory contains snapshot tests for the accessibility styles in the UMD Styles Library.

## Overview

Snapshot tests ensure that our accessibility styles remain consistent over time. They capture the exact structure of each style object and compare it against a baseline version stored in the `__snapshots__` directory.

## Running Tests

To run all tests including snapshot tests:

```bash
npm test
```

To update snapshots after intentional changes:

```bash
# Update all snapshots
npm run test:snapshot

# Update only accessibility snapshots
npm run test:snapshot:accessibility
```

## Test Structure

- `screen-reader.test.ts`: Tests for screen reader utility styles
- `skip.test.ts`: Tests for skip navigation styles
- `index.test.ts`: Tests for the accessibility module exports
- `transform.test.ts`: Tests for how accessibility styles transform with utilities

## Coverage

We maintain 100% test coverage for the accessibility styles to ensure all properties are covered by snapshots and assertions.

## Adding New Accessibility Styles

When adding new accessibility styles:

1. Add the new style file in `source/accessibility/`
2. Export it from `index.ts`
3. Create a corresponding test file in `__tests__/`
4. Run `npm run test:snapshot:accessibility` to generate snapshots
5. Review the snapshots to ensure they match expectations