# University of Maryland Feeds Library

A collection of dynamic feed components for displaying University of Maryland content feeds including news articles, events, and academic information.

## Overview

The UMD Feeds Library provides ready-to-use feed components that can be integrated into any web project. These components are designed to follow UMD brand guidelines and accessibility standards while providing a seamless way to display dynamic content.

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
  isThemeDark: false
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
  isLazyLoad: true
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

## Integration with Other UMD Libraries

This library works seamlessly with other UMD design system packages:

```typescript
import * as Feeds from '@universityofmaryland/web-feeds-library';
import * as Styles from '@universityofmaryland/web-styles-library';

// Apply additional styling to feed container
const container = document.querySelector('.feed-container');
Object.assign(container.style, Styles.element.container.wrapper);

// Add feed component
container.appendChild(Feeds.news.grid({ token: 'your-api-token' }).element);
```

## Documentation

For detailed API documentation and more advanced usage examples, see the [official UMD Design System documentation](https://umd-digital.github.io/design-system/).

## Contributing

For contribution guidelines, please refer to the main repository README.

## License

This project is licensed under the University of Maryland license.