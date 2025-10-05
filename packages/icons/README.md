# @universityofmaryland/web-icons-library

Icon and logo assets for the University of Maryland Design System, organized by category for optimal tree-shaking and selective imports.

## Installation

```bash
npm install @universityofmaryland/web-icons-library
# or
yarn add @universityofmaryland/web-icons-library
```

## Usage

### Selective Imports (Recommended)

Import only the icons you need from specific categories for optimal bundle size:

```typescript
// Import navigation icons
import { ARROW, CHEVRON_SMALL, BACK_ARROW } from '@universityofmaryland/web-icons-library/navigation';

// Import UI control icons
import { PAUSE, PLAY, CLOSE_BUTTON } from '@universityofmaryland/web-icons-library/ui-controls';

// Import social media icons
import { FACEBOOK, X, INSTAGRAM } from '@universityofmaryland/web-icons-library/social';

// Import logos
import { DARK_LOGO, LIGHT_LOGO } from '@universityofmaryland/web-icons-library/logos';
```

### Import All Icons

```typescript
import * as Icons from '@universityofmaryland/web-icons-library';

// Access icons via namespace
const arrow = Icons.ARROW;
const facebookIcon = Icons.FACEBOOK;
```

### Using Icons in HTML

All icons are exported as SVG strings and can be used directly in HTML:

```typescript
import { ARROW } from '@universityofmaryland/web-icons-library/navigation';

// Inject into DOM
document.getElementById('icon-container').innerHTML = ARROW;

// Or with frameworks
function MyComponent() {
  return <div dangerouslySetInnerHTML={{ __html: ARROW }} />;
}
```

## Icon Categories

### Navigation (`/navigation`)
Icons for navigation and directional purposes
- `ARROW` - Upward arrow icon
- `BACK_ARROW` - Left/back arrow
- `FORWARD_ARROW` - Right/forward arrow
- `SHORT_ARROW` - Short directional arrow
- `CHEVRON_SMALL` - Small chevron/dropdown indicator

### UI Controls (`/ui-controls`)
Icons for user interface controls and actions
- `CLOSE_BUTTON` - Close/dismiss button
- `CLOSE_X` - X/close icon
- `PAUSE` - Pause media control
- `PLAY` - Play media control
- `FULL_SCREEN` - Full screen toggle
- `PRINTER` - Print action
- `NEW_WINDOW` - Open in new window

### Communication (`/communication`)
Icons for communication methods
- `EMAIL` - Email/contact icon
- `PHONE` - Phone/call icon

### Documents (`/documents`)
Icons for documents and files
- `DOCUMENT` - Generic document icon

### Time (`/time`)
Icons for time, dates, and calendar features
- `CALENDAR` - Calendar icon
- `CLOCK` - Clock/time icon
- `MULTI_DAY` - Multi-day event icon

### Media (`/media`)
Icons for media-related features
- `GIF` - GIF media type icon

### Alerts (`/alerts`)
Icons for alerts and notifications
- `EXCLAMATION` - Exclamation/warning icon
- `NOTIFICATION` - Notification bell icon

### Search (`/search`)
Icons for search functionality
- `MAGNIFY_GLASS` - Search/magnifying glass icon

### Logos (`/logos`)
University of Maryland logo assets
- `DARK_LOGO` - UMD logo for dark backgrounds
- `LIGHT_LOGO` - UMD logo for light backgrounds
- `CAMPAIGN_LOGO` - UMD campaign logo
- `CAMPAIGN_LOGO_DARK` - UMD campaign logo for dark backgrounds
- `SEAL_WHITE` - UMD white seal

### Social (`/social`)
Social media platform icons
- `FACEBOOK` - Facebook icon
- `X` - X (formerly Twitter) icon
- `TWITTER` - Twitter legacy icon
- `INSTAGRAM` - Instagram icon
- `YOUTUBE` - YouTube icon
- `LINKEDIN` - LinkedIn icon
- `THREADS` - Threads icon

### Brand (`/brand`)
UMD brand-specific icons
- `FEARLESS` - Fearless Ideas brand icon

### User (`/user`)
User and profile icons
- `PERSON` - Person/user profile icon

### Location (`/location`)
Location and map icons
- `PIN` - Map pin/location marker icon

### Content (`/content`)
Content type indicators
- `QUOTE` - Quote/testimonial icon

## Accessibility

All icons include:
- `aria-hidden="true"` attribute - Icons are decorative and hidden from screen readers
- Descriptive `title` attributes for visual context
- Unique `id` attributes for referencing

When using icons to convey meaning, ensure you provide alternative text in your implementation:

```html
<button aria-label="Close dialog">
  ${CLOSE_BUTTON}
</button>
```

## TypeScript Support

This package includes full TypeScript definitions. All icons are typed as `string` exports.

```typescript
import type { } from '@universityofmaryland/web-icons-library';

// Icons are strings containing SVG markup
const myIcon: string = ARROW;
```

## Bundle Size Optimization

### Tree-Shaking

When using selective imports, only the icons you import will be included in your bundle:

```typescript
// ✅ Good - Only ARROW is bundled
import { ARROW } from '@universityofmaryland/web-icons-library/navigation';

// ❌ Avoid - All icons are bundled
import * as Icons from '@universityofmaryland/web-icons-library';
```

### Category-Based Imports

Import from specific categories to include only related icons:

```typescript
// Only navigation icons are bundled
import * as Navigation from '@universityofmaryland/web-icons-library/navigation';
```

## Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate type documentation
npm run docs
```

## License

MIT

## Related Packages

- [@universityofmaryland/web-styles-library](https://www.npmjs.com/package/@universityofmaryland/web-styles-library)
- [@universityofmaryland/web-elements-library](https://www.npmjs.com/package/@universityofmaryland/web-elements-library)
- [@universityofmaryland/web-components-library](https://www.npmjs.com/package/@universityofmaryland/web-components-library)
