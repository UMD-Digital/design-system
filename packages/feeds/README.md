# University of Maryland Feeds Library

[![Feeds Version](https://img.shields.io/badge/Feeds-v1.0.4-blue)](https://www.npmjs.com/package/@universityofmaryland/web-feeds-library)

A collection of dynamic feed components for displaying University of Maryland content feeds including news articles, events, and academic information. This library simplifies the integration of live, updating content from UMD sources while maintaining brand consistency and performance optimization.

## Overview

The UMD Feeds Library provides ready-to-use feed components that can be integrated into any web project. These components are designed to follow UMD brand guidelines and accessibility standards while providing a seamless way to display dynamic content. The library handles all aspects of content fetching, caching, error handling, and rendering, allowing developers to focus on integration rather than implementation details.

## Installation

```bash
npm install @universityofmaryland/web-feeds-library
# or
yarn add @universityofmaryland/web-feeds-library
```

## Features

- **Responsive Layouts**: Grid, list, and featured layouts that work across all screen sizes
- **Multiple Feed Types**: Support for news, events, and academic content
- **Customizable**: Theme options, column configuration, and layout variations
- **Accessibility**: ARIA-compliant with screen reader support
- **Lazy Loading**: Optional lazy loading for improved performance

## Usage

### Basic Example

```typescript
import * as Feeds from '@universityofmaryland/web-feeds-library';

// Create a news grid component
const newsGrid = Feeds.news.grid({
  token: 'your-api-token',
  numberOfColumnsToShow: 3,
  isThemeDark: false,
});

// Add to DOM
document.querySelector('.news-container').appendChild(newsGrid.element);
```

## Available Feed Components

### News Feeds

```typescript
// Grid layout for news
const newsGrid = Feeds.news.grid({ token: 'your-api-token' });

// List layout for news
const newsList = Feeds.news.list({ token: 'your-api-token' });

// Featured news layout with prominent article
const newsFeatured = Feeds.news.featured({
  token: 'your-api-token',
  isLazyLoad: true,
});
```

### Event Feeds

```typescript
// Grid layout for events
const eventsGrid = Feeds.events.grid({ token: 'your-api-token' });

// List layout for events
const eventsList = Feeds.events.list({ token: 'your-api-token' });

// Slider for events
const eventsSlider = Feeds.events.slider({ token: 'your-api-token' });
```

### Academic Feeds

```typescript
// Slider for academic events
const academicSlider = Feeds.academic.slider({ token: 'your-api-token' });
```

## Component Configuration

All feed components accept these common properties:

- `token` (required): API token for authentication
- `isThemeDark`: Enable dark theme styling (default: false)
- `isTransparent`: Use transparent background for cards (default: false)

Grid-specific options:

- `numberOfColumnsToShow`: Number of columns to display (default: 3)

Featured layout options:

- `isLazyLoad`: Enable lazy loading of additional content
- `isLayoutReversed`: Reverse the layout order
- `overwriteStickyPosition`: Custom sticky position value

### Custom Filtering and Sorting

You can customize how feed items are filtered and sorted:

```typescript
import * as Feeds from '@universityofmaryland/web-feeds-library';

const newsGrid = Feeds.news.grid({
  token: 'your-api-token',
  filters: {
    categories: ['research', 'campus-life'],
    tags: ['featured'],
    dateRange: {
      start: '2023-01-01',
      end: '2023-12-31',
    },
  },
  sortBy: 'date', // 'date', 'title', 'popularity'
  sortDirection: 'desc', // 'asc' or 'desc'
});
```

### Event Handling

All feed components emit events that you can listen for. You can use the standard event listeners or our utility functions for better TypeScript support:

```typescript
import * as Feeds from '@universityofmaryland/web-feeds-library';
import { events } from '@universityofmaryland/web-feeds-library/utilities';

const eventsFeed = Feeds.events.list({ token: 'your-api-token' });
const container = document.querySelector('.events-container');
container.appendChild(eventsFeed.element);

// Method 1: Standard event listener approach
eventsFeed.element.addEventListener(events.eventNames.FEED_LOADED, (event) => {
  console.log('Feed loaded with', event.detail.items.length, 'items');
});

eventsFeed.element.addEventListener(events.eventNames.FEED_ERROR, (event) => {
  console.error('Feed error:', event.detail.error);
});

// Method 2: Using the utility helper (provides proper type information)
events.listen(eventsFeed.element, events.eventNames.FEED_LOADED, (detail) => {
  console.log('Feed loaded with', detail.items.length, 'items');
});

// With cleanup function for easy removal
const removeListener = events.listen(
  eventsFeed.element,
  events.eventNames.FEED_ERROR,
  (detail) => {
    console.error('Feed error:', detail.error);
  },
);

// Later you should remove the listener if needed
// removeListener();
```

## Performance Considerations

The Feeds library is optimized for performance:

- Content is lazy-loaded when elements enter the viewport
- Network requests are cached and debounced
- Images are optimized and responsive
- Content is efficiently rendered with minimal DOM operations

## Accessibility

All feed components are built with accessibility in mind:

- WCAG 2.1 AA compliant
- Proper semantic markup with ARIA attributes
- Keyboard navigable
- Screen reader announcements for dynamic content updates
- Support for reduced motion preferences

## Testing

The library uses Jest for unit testing. To run tests:

```bash
# Run all tests
npm run test

# Run tests in watch mode during development
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Release Process

The release process requires all tests to pass before publishing:

```bash
npm run release
```

This will:

1. Run all tests (and abort if any tests fail)
2. Clean the distribution directory
3. Build the project
4. Publish the package

## Contributing

For contribution guidelines, please refer to the main repository README.

## License

This project is licensed under the University of Maryland license.
