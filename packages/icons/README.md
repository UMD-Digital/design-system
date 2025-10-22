# @universityofmaryland/web-icons-library

[![Icons Version](https://img.shields.io/badge/Icons-v1.0.1-blue)](https://www.npmjs.com/package/@universityofmaryland/web-icons-library)

Icon and logo assets for the University of Maryland Design System, organized by category for optimal tree-shaking and selective imports.

## Installation

```bash
npm install @universityofmaryland/web-icons-library
# or
yarn add @universityofmaryland/web-icons-library
```

## Usage

### Recommended: Category-Based Imports with Aliases

Import icons from specific categories using aliases for clarity:

```typescript
// Arrow icons
import { arrow_up as iconArrowUp } from '@universityofmaryland/web-icons-library/arrows';
import { arrow_left as iconArrowLeft } from '@universityofmaryland/web-icons-library/arrows';

// Control icons
import { close as iconClose } from '@universityofmaryland/web-icons-library/controls';
import { play as iconPlay } from '@universityofmaryland/web-icons-library/controls';

// Social media icons
import { facebook as iconFacebook } from '@universityofmaryland/web-icons-library/social';
import { instagram as iconInstagram } from '@universityofmaryland/web-icons-library/social';
```

### Category Namespace Import

Import entire categories when you need multiple icons from the same category:

```typescript
import * as ArrowIcons from '@universityofmaryland/web-icons-library/arrows';
import * as SocialIcons from '@universityofmaryland/web-icons-library/social';

// Use icons
const upArrow = ArrowIcons.arrow_up;
const facebook = SocialIcons.facebook;
```

### Main Package Import

Import everything from the main entry point (not recommended for production due to bundle size):

```typescript
import * as Icons from '@universityofmaryland/web-icons-library';

// Access icons directly
const arrow = Icons.arrow_up;
const facebookIcon = Icons.facebook;
```

### Using Icons in HTML

All icons are exported as SVG strings and can be injected directly into the DOM:

```typescript
import { arrow_up as iconArrowUp } from '@universityofmaryland/web-icons-library/arrows';

// Vanilla JS
document.getElementById('icon-container').innerHTML = iconArrowUp;

// React
function MyComponent() {
  return <div dangerouslySetInnerHTML={{ __html: iconArrowUp }} />;
}

// With a helper function
import { svgFromString } from '@universityofmaryland/web-utilities-library/media';

const svgElement = svgFromString(iconArrowUp);
container.appendChild(svgElement);
```

## Icon Categories

### Arrows (`/arrows`)
Directional arrow icons for navigation and indicating direction
- `arrow_up` - Upward pointing arrow
- `arrow_left` - Left/back navigation arrow
- `arrow_right` - Right/forward navigation arrow
- `arrow_long` - Long horizontal arrow

### Controls (`/controls`)
User interface control icons for actions and media playback
- `chevron_down` - Downward chevron/dropdown indicator
- `close` - Small close button
- `close_large` - Large close/X button
- `pause` - Media pause control
- `play` - Media play control
- `fullscreen` - Fullscreen toggle
- `print` - Print action
- `external_link` - Open in new window/external link

### Indicators (`/indicators`)
Icons for alerts, warnings, and notifications
- `alert` - Exclamation/alert icon
- `warning` - Warning/notification icon

### Calendar (`/calendar`)
Time, date, and calendar-related icons
- `calendar` - Calendar date icon
- `clock` - Clock/time icon
- `calendar_multi_day` - Multi-day event icon

### Files (`/files`)
Document and file-related icons
- `document` - Generic document/file icon

### Search (`/search`)
Search functionality icons
- `search` - Search/magnifying glass icon

### Media (`/media`)
Media type and playback icons
- `gif` - GIF media type indicator

### Brand (`/brand`)
UMD brand-specific icons and elements
- `fearless` - Fearless Ideas brand icon
- `quote` - Quote/testimonial icon

### People (`/people`)
User and profile icons
- `person` - Person/user profile icon

### Location (`/location`)
Geographic and location icons
- `pin` - Map pin/location marker

### Communication (`/communication`)
Communication method icons
- `email` - Email/contact icon
- `phone` - Phone/call icon

### Social (`/social`)
Social media platform icons
- `facebook` - Facebook
- `x` - X (formerly Twitter)
- `twitter` - Twitter (legacy)
- `instagram` - Instagram
- `youtube` - YouTube
- `linkedin` - LinkedIn
- `threads` - Threads

### Logos (`/logos`)
University of Maryland logo assets (namespace exports)

```typescript
import * as UMDLogos from '@universityofmaryland/web-icons-library/logos';

// UMD logos
UMDLogos.umd.dark    // Dark background logo
UMDLogos.umd.light   // Light background logo

// Forward logos
UMDLogos.forward.dark   // Forward logo for dark backgrounds
UMDLogos.forward.light  // Forward logo for light backgrounds

// Campaign logos
UMDLogos.campaign./*  // Campaign logo variants

// Seal logos
UMDLogos.seal./*      // Seal variants
```

## Icon Source

All icons in this library are **generated from Figma design files** maintained by the University of Maryland Design System team. This ensures:

- **Design Consistency**: Icons match the official UMD brand guidelines
- **Single Source of Truth**: Figma files serve as the canonical source
- **Quality Control**: All icons are professionally designed and reviewed
- **Version Control**: Updates to Figma files can be synchronized to the library

> **Note**: Direct modifications to icon files in this package may be overwritten during the next sync from Figma. If you need custom icons or modifications, please work with the Design System team to update the source Figma files.

## Accessibility

All icons include proper accessibility attributes:

- `aria-hidden="true"` - Icons are decorative and hidden from screen readers by default
- `title` attributes - Provide visual context for sighted users
- Unique `id` attributes - Enable referencing if needed

### Adding Semantic Meaning

When icons convey important information, always provide alternative text:

```html
<!-- ✅ Good: Button has accessible label -->
<button aria-label="Close dialog">
  ${iconClose}
</button>

<!-- ✅ Good: Icon with visible text -->
<a href="/search">
  ${iconSearch}
  <span>Search</span>
</a>

<!-- ❌ Bad: No accessible alternative -->
<button>
  ${iconClose}
</button>
```

## TypeScript Support

Full TypeScript definitions are included with autocomplete support:

```typescript
import { arrow_up as iconArrowUp } from '@universityofmaryland/web-icons-library/arrows';

// All icons are typed as strings containing SVG markup
const icon: string = iconArrowUp;

// Category imports provide type safety
import type * as ArrowIcons from '@universityofmaryland/web-icons-library/arrows';
```

## Bundle Size Optimization

### Tree-Shaking (Recommended)

Use selective imports to include only the icons you need:

```typescript
// ✅ Excellent: Only arrow_up is bundled (~1KB)
import { arrow_up as iconArrowUp } from '@universityofmaryland/web-icons-library/arrows';

// ✅ Good: Only arrow category is bundled (~4KB)
import * as ArrowIcons from '@universityofmaryland/web-icons-library/arrows';

// ⚠️ Caution: All icons are bundled (~50KB+)
import * as Icons from '@universityofmaryland/web-icons-library';
```

### Build Tool Configuration

Most modern bundlers (Webpack, Rollup, Vite, esbuild) support tree-shaking by default when using ES modules. Ensure your build tool is configured for production mode:

```javascript
// Vite (vite.config.js)
export default {
  build: {
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('@universityofmaryland/web-icons-library')) {
            return 'icons';
          }
        }
      }
    }
  }
};
```

## API Documentation

Full API documentation generated with TypeDoc is available at:

**[https://umd-digital.github.io/design-system/modules/_universityofmaryland_web_icons_library.html](https://umd-digital.github.io/design-system/modules/_universityofmaryland_web_icons_library.html)**

## Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Watch mode for development
npm start

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Generate TypeDoc documentation
npm run docs
```

## Package Exports

This package uses modern [package exports](https://nodejs.org/api/packages.html#exports) for optimal tree-shaking:

```json
{
  "exports": {
    ".": "./dist/index.mjs",
    "./arrows": "./dist/arrows.mjs",
    "./controls": "./dist/controls.mjs",
    "./indicators": "./dist/indicators.mjs",
    // ... other categories
  }
}
```

Both CommonJS (`.js`) and ES Modules (`.mjs`) are supported with full TypeScript definitions (`.d.ts`).

## Browser Support

All icons are standard SVG elements and work in all modern browsers:

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

MIT © University of Maryland

## Related Packages

Part of the University of Maryland Design System:

- [@universityofmaryland/web-utilities-library](https://www.npmjs.com/package/@universityofmaryland/web-utilities-library) - Utility functions
- [@universityofmaryland/web-styles-library](https://www.npmjs.com/package/@universityofmaryland/web-styles-library) - Design tokens and styles
- [@universityofmaryland/web-elements-library](https://www.npmjs.com/package/@universityofmaryland/web-elements-library) - UI element builders
- [@universityofmaryland/web-components-library](https://www.npmjs.com/package/@universityofmaryland/web-components-library) - Web Components
- [@universityofmaryland/web-feeds-library](https://www.npmjs.com/package/@universityofmaryland/web-feeds-library) - Dynamic content feeds

## Support

- **Documentation**: [https://designsystem.umd.edu](https://designsystem.umd.edu)
- **Playground**: [http://playground.designsystem.umd.edu](http://playground.designsystem.umd.edu)
- **Issues**: [GitHub Issues](https://github.com/UMD-Digital/design-system/issues)
