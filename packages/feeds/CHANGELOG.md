# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.3.0 (2025-12-08)

**Note:** Version bump only for package @universityofmaryland/web-feeds-library

# Changelog - Feeds Package

All notable changes to the `@universityofmaryland/web-feeds-library` package will be documented in this file.

## [1.0.7] - Current

### Recent Changes

- **Loader Element**: Visual theme improvements
- **Grouped Feeds**: Added offset for lazy load functionality
- **Events**: Grouped event feed implementation
- **Featured News**: Grid height adjustments
- **Featured Layout**: Added overlay image support

## [1.0.4] - Previous Release

### Features

- Dynamic content feed components for UMD digital properties
- Support for multiple content types:
  - News feeds
  - Events feeds
  - Academic content feeds
- Multiple display layouts:
  - Grid layout
  - List layout
  - Featured layout with overlay
  - Grouped layout

### Architecture

- **Component Factory Pattern**: All components return ElementModel
- **Shadow DOM**: Style encapsulation for all feed components
- **API Integration**: Built-in fetch utilities for UMD content APIs
- **Data Transformation**: Standardized data processing pipeline
- **Lazy Loading**: Performance optimization for large feeds

### Core Modules

- **common/**
  - `fetch.ts` - API integration utilities
  - `data.ts` - Data transformation utilities
  - `display.ts` - Shared display components
  - `queries.ts` - API query configuration
- **news/** - News feed components
- **events/** - Event feed components
- **utilities/**
  - `events/` - Custom event management
  - Other feed-specific utilities

### Dependencies

- Depends on `@universityofmaryland/web-elements-library`
- Depends on `@universityofmaryland/web-styles-library`

## Notes

This package provides specialized components for displaying dynamic content from UMD's content management systems. All components follow the element model pattern and use Shadow DOM for encapsulation.
