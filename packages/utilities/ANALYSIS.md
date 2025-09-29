# UMD Design System - Utility Functions Analysis

This document provides a comprehensive analysis of utility functions found in the Components and Elements packages, their purposes, dependencies, and migration recommendations.

## Components Package Analysis

### Location: `packages/components/source/utilities/`

#### 1. Animations (`animations.ts`)
**Dependencies:** `@universityofmaryland/web-styles-library`, `@universityofmaryland/web-elements-library`

| Function | Description | Reusable? | Notes |
|----------|-------------|-----------|-------|
| `loadIntersectionObserver()` | Sets up intersection observer for grid fade-in animations from bottom | ❌ No | Package-specific - tightly coupled to UMD animation patterns; checks for reduced motion preference |

#### 2. Markup Utilities (`markup/` directory)

**`create.ts`** - Dependencies: None

| Function | Description | Reusable? | Notes |
|----------|-------------|-----------|-------|
| `Node.slot({ type })` | Creates a slot element with specified name | ✅ Yes | Pure DOM creation utility |
| `Node.linkWithSpan({ url, title, label? })` | Creates an anchor link with text wrapped in span, includes security attributes | ✅ Yes | Common pattern for accessible external links |
| `Node.stylesTemplate({ styles })` | Creates a style template element with CSS string | ✅ Yes | Basic utility for injecting styles |
| `SlotWithDefaultStyling({ element, slotRef })` | Checks if slot has 'styled' attribute; returns slot element or cloned content | ❌ No | UMD-specific slot pattern for web components |
| `SlotOberserver({ element, shadowDom, slots, CreateShadowDom })` | Observes slot mutations and reloads shadow DOM (development only) | ❌ No | Development tool for web components hot reload |

**`event.ts`** - Dependencies: None

| Function | Description | Reusable? | Notes |
|----------|-------------|-----------|-------|
| `createDate({ element })` | Parses date from element text content and returns formatted date object | ✅ Yes | Date parsing utility |
| `createDetailsData({ locationElement, startDate, endDate? })` | Creates event details object from date and location elements | ❌ No | UMD event data structure |

**`modify.ts`** - Dependencies: None

| Function | Description | Reusable? | Notes |
|----------|-------------|-----------|-------|
| `AnimationLinkSpan({ element })` | Wraps link inner HTML in span for animation purposes if not already wrapped | ✅ Yes | Animation pattern for links (duplicate in elements) |

**`validate.ts`** - Dependencies: Imports from `./create` and local types

| Function | Description | Reusable? | Notes |
|----------|-------------|-----------|-------|
| `isHTMLElement(value)` | Type guard to check if value is an HTMLElement | ✅ Yes | TypeScript type guard |
| `toUMDElement(ref)` | Converts ComponentRef to UMDElement type | ❌ No | UMD type conversion |
| `toElementVisual(ref)` | Converts ComponentRef to ElementVisual type | ❌ No | UMD type conversion |
| `imageAlt({ element, slotRef })` | Validates that image in slot has alt text | ✅ Yes | Accessibility validation |
| `ImageHasAlt({ image })` | Checks if image has alt attribute; logs error if missing | ✅ Yes | Accessibility validation |
| `ImageSlot({ element, ImageSlot })` | Returns validated and cloned image slot | ❌ No | Combines validation with UMD slot pattern |

#### 3. Styles (`styles.ts`) - **[DEPRECATED]**
**Dependencies:** `@universityofmaryland/web-styles-library`, `postcss`, `postcss-nesting`, `postcss-js`

| Function | Description | Reusable? | Notes |
|----------|-------------|-----------|-------|
| `reset` (constant) | CSS reset string for shadow DOM host elements | ❌ No | UMD shadow DOM reset styles; marked for removal |
| `convertJSSObjectToStyles({ styleObj })` | Converts JSS object to CSS string using PostCSS | ✅ Yes | **Duplicate** - Same function exists in elements; marked for removal |

---

## Elements Package Analysis

### Location: `packages/elements/source/utilities/`

#### 1. Accessibility (`accessibility/index.ts`)
**Dependencies:** None

| Function | Description | Reusable? | Notes |
|----------|-------------|-----------|-------|
| `eventAccessibilityFocus({ element, action, shadowDomContext? })` | Sets up keyboard event handlers for focus management (Escape, Tab, Arrow keys) | ✅ Yes | Returns cleanup function; handles focus within/outside element boundaries |
| `eventAccessibilityFocusTrap({ element, action, shadowDomContext? })` | Traps focus within element; prevents tab escape; handles Escape key | ✅ Yes | Returns cleanup function; essential for modal/dialog accessibility |
| `isScreenZoomed()` | Detects if browser is zoomed beyond 100% or 200% on high DPI screens | ✅ Yes | Uses `window.devicePixelRatio` |
| `isPrefferdReducedMotion()` | Checks if user has reduced motion preference enabled | ✅ Yes | Media query check for accessibility (Note: typo in function name) |

#### 2. Assets (`assets/` directory)

**`icons.ts`** - Dependencies: None

Exports 28 SVG icon strings as constants:
- ARROW, BACK_ARROW, CALENDAR, CLOCK, CHEVRON_SMALL, CLOSE_BUTTON, DOCUMENT, EMAIL, EXCLAMATION, FEARLESS, FORWARD_ARROW, FULL_SCREEN, MULTI_DAY, MAGNIFY_GLASS, NEW_WINDOW, NOTIFICATION, PAUSE, PERSON, PIN, PHONE, PLAY, PRINTER, QUOTE, SHORT_ARROW, X

**Reusability:** ✅ Yes - Icon library with aria-hidden and title attributes

**`logos.ts`** - Dependencies: None

Exports 2 large SVG logo strings:
- DARK_LOGO, LIGHT_LOGO (University of Maryland branding)

**Reusability:** ❌ No - Package-specific UMD branding assets (very large: 37k tokens)

**`social.ts`** - Dependencies: None

Exports 7 social media icon SVG strings:
- FACEBOOK, X, TWITTER, INSTAGRAM, YOUTUBE, LINKEDIN, THREADS

**Reusability:** ✅ Yes - Social media icons with aria-hidden attributes

#### 3. Date (`date.ts`)
**Dependencies:** None

| Function | Description | Reusable? | Notes |
|----------|-------------|-----------|-------|
| `createVisualFormattedDate(date)` | Converts Date object to formatted strings (full, dayOfWeek, month, day, time) | ✅ Yes | Returns object with multiple date format properties |
| `createDateCompareString(date)` | Converts Date to ISO string truncated to date only (YYYY-MM-DD) | ✅ Yes | For date comparisons |

#### 4. JavaScript Events (`js-events/index.ts`)
**Dependencies:** None

| Function | Description | Reusable? | Notes |
|----------|-------------|-----------|-------|
| `CreateEventSwipe({ container, callback })` | Sets up touch swipe detection with threshold and timing constraints | ✅ Yes | Touch event utility for mobile interactions |

#### 5. Markup Utilities (`markup/` directory)

**`create.ts`** - Dependencies: `../performance` (debounce), `../assets/icons`

| Function | Description | Reusable? | Notes |
|----------|-------------|-----------|-------|
| `gif({ container })` | Creates play/pause control for GIF images using canvas | ✅ Yes | Advanced GIF control with canvas rendering |
| `imageFromSvg({ SVG })` | Converts SVG string to base64 data URL image element | ✅ Yes | SVG to image conversion |
| `svgFromString(svgString)` | Parses SVG string and returns first child node | ✅ Yes | String to SVG DOM conversion |
| `linkWithSpan({ url, title, label? })` | Creates external link with span wrapper and security attributes | ✅ Yes | **Duplicate** - Same as components version |

**`get.ts`** - Dependencies: None

| Function | Description | Reusable? | Notes |
|----------|-------------|-----------|-------|
| `icon({ element })` | Extracts icon (SVG or IMG) from element and applies color if specified | ✅ Yes | Icon extraction utility |

**`locate.ts`** - Dependencies: None

| Function | Description | Reusable? | Notes |
|----------|-------------|-----------|-------|
| `findParent({ element, attr })` | Recursively finds parent element with specified attribute | ✅ Yes | DOM traversal utility |

**`modify.ts`** - Dependencies: None

| Function | Description | Reusable? | Notes |
|----------|-------------|-----------|-------|
| `animationLinkSpan({ element })` | Wraps link content in span for animation (if not slot content) | ✅ Yes | **Duplicate** - Same as components version |
| `wrapTextNodeInSpan(element)` | Wraps text nodes in links/buttons with span elements | ✅ Yes | Text node manipulation for styling |
| `truncateText({ text, maxTextSize })` | Truncates HTML text to max size while preserving markup, adds ellipsis | ✅ Yes | Complex HTML-aware text truncation |
| `truncateTextBasedOnSize({ text, size, ...breakpoints })` | Truncates text with responsive size based on container width | ✅ Yes | Responsive text truncation |
| `cleanCopy({ element })` | Clones element and removes all attributes except href | ✅ Yes | Element cleaning utility |

#### 6. Network (`network/index.ts`)
**Dependencies:** None

| Function | Description | Reusable? | Notes |
|----------|-------------|-----------|-------|
| `FetchGraphQL({ query, url, token, variables? })` | Async GraphQL query executor with error handling | ✅ Yes | GraphQL fetch wrapper with bearer token auth |

#### 7. Performance (`performance/index.ts`)
**Dependencies:** None

| Function | Description | Reusable? | Notes |
|----------|-------------|-----------|-------|
| `debounce(cb, wait?)` | Debounces function calls with configurable wait time (default 50ms) | ✅ Yes | Standard debounce implementation |

#### 8. Storage (`storage/local.ts`)
**Dependencies:** None

| Function | Description | Reusable? | Notes |
|----------|-------------|-----------|-------|
| `get({ key })` | Retrieves integer value from localStorage | ✅ Yes | localStorage wrapper for integers |
| `set({ key })` | Stores current timestamp in localStorage | ✅ Yes | Timestamp storage utility |

#### 9. Theme (`theme/` directory)

**`index.ts`** - Dependencies: `@universityofmaryland/web-styles-library`, `postcss`, `postcss-nesting`, `postcss-js`

| Function | Description | Reusable? | Notes |
|----------|-------------|-----------|-------|
| `combineStyles(...styles)` | Combines multiple style strings, filtering out null/undefined | ✅ Yes | Style string concatenation |
| `convertJSSObjectToStyles({ styleObj })` | Converts JSS object to CSS using PostCSS | ✅ Yes | CSS-in-JS transformation (canonical version) |
| `convertPixelStringToNumber(styleStr)` | Converts pixel string to number (e.g., '16px' -> 16) | ✅ Yes | CSS value parsing |
| `getStyleStringFromJssObject(styleObj)` | Converts JSS object with className to CSS string | ✅ Yes | Higher-level JSS conversion |

**`animations.ts`** - Dependencies: None

| Function | Description | Reusable? | Notes |
|----------|-------------|-----------|-------|
| `shrinkThenRemove({ container })` | Animates element shrinking then sets display none with 'closed' attribute | ✅ Yes | Smooth collapse animation using requestAnimationFrame |
| `scrollTo({ element, spread?, frames? })` | Smooth scrolls to element with offset and auto-focuses first focusable child | ✅ Yes | Animated scroll with accessibility focus management |

**`assets.ts`** - Dependencies: None

| Function | Description | Reusable? | Notes |
|----------|-------------|-----------|-------|
| `getResponsiveImageSize({ image, parentNode, maxWindowHeight? })` | Calculates responsive image height based on aspect ratio and viewport constraints | ✅ Yes | Responsive image sizing calculation |

**`media.ts`** - Dependencies: None

| Function | Description | Reusable? | Notes |
|----------|-------------|-----------|-------|
| `withViewTimelineAnimation(styles)` | Wraps styles with view timeline animation feature query and reduced motion check | ✅ Yes | Progressive enhancement wrapper for CSS animations |
| `createContainerQuery(comparison, breakpoint, styles)` | Creates media query object for responsive styles | ✅ Yes | Media query builder |
| `createRangeContainerQuery(min, max, styles)` | Creates ranged media query (min-width and max-width) | ✅ Yes | Range media query builder |

---

## Migration Plan

### Proposed Utility Categories

Based on the analysis, the following categories are proposed for the utilities package:

#### 1. **`accessibility/`** - Accessibility utilities
- `eventAccessibilityFocus` (from elements)
- `eventAccessibilityFocusTrap` (from elements)
- `isScreenZoomed` (from elements)
- `isPreferredReducedMotion` (from elements - fix typo)

#### 2. **`animation/`** - Animation utilities
- `shrinkThenRemove` (from elements/theme)
- `scrollTo` (from elements/theme)
- `animationLinkSpan` (consolidate from both packages)

#### 3. **`date/`** - Date/time utilities
- `createVisualFormattedDate` (from elements)
- `createDateCompareString` (from elements)
- `createDate` (from components/markup/event - consider renaming/merging)

#### 4. **`dom/`** - DOM manipulation utilities
**Existing:**
- `addClass` ✅ (created in Step 2)
- `removeClass` ✅ (created in Step 2)

**To Add:**
- `findParent` (from elements/markup/locate)
- `isHTMLElement` (from components/markup/validate)
- `wrapTextNodeInSpan` (from elements/markup/modify)
- `cleanCopy` (from elements/markup/modify)

#### 5. **`events/`** - Event handling utilities
- `CreateEventSwipe` (from elements)

#### 6. **`media/`** - Media/Image utilities
- `imageFromSvg` (from elements/markup/create)
- `svgFromString` (from elements/markup/create)
- `getResponsiveImageSize` (from elements/theme/assets)
- `icon` (from elements/markup/get)
- `gif` (from elements/markup/create - complex but useful)

#### 7. **`network/`** - Network utilities
- `FetchGraphQL` (from elements)

#### 8. **`performance/`** - Performance utilities
- `debounce` (from elements)

#### 9. **`storage/`** - Storage utilities
- `get` (from elements/storage/local - rename to `getLocalStorageInt`)
- `set` (from elements/storage/local - rename to `setLocalStorageTimestamp`)

#### 10. **`string/`** - String utilities
**Existing:**
- `capitalize` ✅ (created in Step 2)
- `truncate` ✅ (created in Step 2)

**To Add:**
- `truncateText` (from elements/markup/modify - HTML-aware version)
- `truncateTextBasedOnSize` (from elements/markup/modify - responsive version)
- `convertPixelStringToNumber` (from elements/theme)

#### 11. **`styles/`** - Style utilities
- `combineStyles` (from elements/theme)
- `convertJSSObjectToStyles` (from elements/theme - canonical version)
- `getStyleStringFromJssObject` (from elements/theme)
- `withViewTimelineAnimation` (from elements/theme/media)
- `createContainerQuery` (from elements/theme/media)
- `createRangeContainerQuery` (from elements/theme/media)

#### 12. **`elements/`** - Element creation utilities
- `createSlot` (from components/markup/create - rename `Node.slot`)
- `createLinkWithSpan` (consolidate from both packages)
- `createStylesTemplate` (from components/markup/create - rename `Node.stylesTemplate`)

#### 13. **`validation/`** - Validation utilities
- `imageHasAlt` (from components/markup/validate)
- `validateImageAlt` (from components/markup/validate - rename `imageAlt`)

### Items NOT Migrating (Package-Specific)

**Components:**
- `loadIntersectionObserver` (animations.ts) - UMD-specific
- `SlotWithDefaultStyling` (markup/create.ts) - UMD web components
- `SlotOberserver` (markup/create.ts) - Development tool
- `createDetailsData` (markup/event.ts) - UMD event structure
- `toUMDElement`, `toElementVisual`, `ImageSlot` (markup/validate.ts) - UMD types
- `reset`, `convertJSSObjectToStyles` from styles.ts - Deprecated, to be removed

**Elements:**
- UMD logos (assets/logos.ts) - Keep in elements as branding assets

### Duplicates to Resolve

| Function | Location 1 | Location 2 | Resolution |
|----------|-----------|-----------|------------|
| `linkWithSpan` | components/markup/create | elements/markup/create | Keep elements version, migrate to utilities as `createLinkWithSpan` |
| `animationLinkSpan` | components/markup/modify | elements/markup/modify | Keep elements version, migrate to utilities |
| `convertJSSObjectToStyles` | components/styles (deprecated) | elements/theme | Keep elements version, migrate to utilities |

### Dependencies to Handle

**PostCSS Ecosystem:**
- `convertJSSObjectToStyles` and `getStyleStringFromJssObject` require:
  - `postcss`
  - `postcss-nesting`
  - `postcss-js`
  - `@universityofmaryland/web-styles-library` (for types)

**Decision:** Add these as dependencies to the utilities package since these are essential style transformation utilities.

### Migration Priority

**Phase 1 (Steps 4-5): Components Package**
1. DOM utilities (simple, foundational)
2. Element creation utilities (simple)
3. Validation utilities (simple)

**Phase 2 (Steps 6-7): Elements Package**
1. Accessibility (high value, no dependencies)
2. Date utilities (simple, no dependencies)
3. Performance (simple, no dependencies)
4. Storage (simple, no dependencies)
5. Events (simple, no dependencies)
6. DOM/String utilities (simple, no dependencies)
7. Media utilities (moderate complexity)
8. Animation utilities (moderate complexity)
9. Network utilities (simple, no dependencies)
10. Styles utilities (requires PostCSS dependencies)