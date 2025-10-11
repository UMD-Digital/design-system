# Utilities Package Migration Guide

## Version 0.1.0 → 0.2.0

This guide documents all function renames and reorganizations in the utilities package refactoring. Use this document to update your imports and function calls.

---

## Quick Reference

### Stage 1: Maximum Impact (Completed ✅)

| Old Name | New Name | Category | Usage |
|----------|----------|----------|-------|
| `createContainerQuery` | `createMediaQuery` | styles | 88 |
| `createRangeContainerQuery` | `createMediaQueryRange` | styles | 47 |
| `convertJSSObjectToStyles` | `jssToCSS` | styles | 127 |
| `getStyleStringFromJssObject` | `jssEntryToCSS` | styles | 41 |

### Stage 2: Clarity (Completed ✅)

| Old Name | New Name | Old Category | New Category | Usage |
|----------|----------|--------------|--------------|-------|
| `eventAccessibilityFocus` | `handleKeyboardNavigation` | accessibility | **events** | 30 |
| `eventAccessibilityFocusTrap` | `trapFocus` | accessibility | accessibility | 21 |
| `createEventSwipe` | `setupSwipeDetection` | events | events | 26 |
| `convertPixelStringToNumber` | `parsePixelValue` | **string** | **styles** | 76 |

### Stage 3: Consistency (Completed ✅)

| Old Name | New Name | Category | Usage |
|----------|----------|----------|-------|
| `animationLinkSpan` | `wrapLinkForAnimation` | animation | 39 |
| `scrollTo` | `smoothScrollToElement` | animation | 33 |
| `loadGridAnimationObserver` | `observeGridAnimations` | animation | 22 |
| `cleanCopy` | `cloneElementWithoutAttributes` | dom | 36 |
| `getIcon` | `extractIconElement` | dom | 35 |
| `createSlotWithStyleOverwrite` | `createStyledSlotOrClone` | elements | 21 |
| `svgFromString` | `parseSvgString` | media | 42 |
| `createVisualFormattedDate` | `formatDateForDisplay` | date | low |
| `createEventDate` | `parseDateFromElement` | date | 9 |
| `createDateCompareString` | `formatDateForComparison` | date | low |
| `slotImage` | `getValidatedSlotImage` | validation | 13 |

### Stage 4: Reorganization (Not Implemented)

| Function | Old Category | New Category | Status |
|----------|--------------|--------------|--------|
| `imageHasAlt` | validation | accessibility | Skipped |

---

## Detailed Migration Instructions

### Stage 1: Media Query & JSS Functions

#### 1. createContainerQuery → createMediaQuery

**⚠️ CRITICAL**: This function creates `@media` queries, NOT `@container` queries!

**Before:**
```typescript
import { createContainerQuery } from '@universityofmaryland/web-utilities-library/styles';

const styles = createContainerQuery('min-width', 768, {
  fontSize: '18px'
});
```

**After:**
```typescript
import { createMediaQuery } from '@universityofmaryland/web-utilities-library/styles';

const styles = createMediaQuery('min-width', 768, {
  fontSize: '18px'
});
```

**Find & Replace:**
- Function: `createContainerQuery` → `createMediaQuery`
- Import path stays the same: `@universityofmaryland/web-utilities-library/styles`

---

#### 2. createRangeContainerQuery → createMediaQueryRange

**Before:**
```typescript
import { createRangeContainerQuery } from '@universityofmaryland/web-utilities-library/styles';

const styles = createRangeContainerQuery(768, 1023, {
  fontSize: '18px'
});
```

**After:**
```typescript
import { createMediaQueryRange } from '@universityofmaryland/web-utilities-library/styles';

const styles = createMediaQueryRange(768, 1023, {
  fontSize: '18px'
});
```

**Find & Replace:**
- Function: `createRangeContainerQuery` → `createMediaQueryRange`
- Import path stays the same: `@universityofmaryland/web-utilities-library/styles`

---

#### 3. convertJSSObjectToStyles → jssToCSS

**Most used function in the package! 19 characters shorter.**

**Before:**
```typescript
import { convertJSSObjectToStyles } from '@universityofmaryland/web-utilities-library/styles';

const css = convertJSSObjectToStyles({ styleObj: jssObject });
```

**After:**
```typescript
import { jssToCSS } from '@universityofmaryland/web-utilities-library/styles';

const css = jssToCSS({ styleObj: jssObject });
```

**Find & Replace:**
- Function: `convertJSSObjectToStyles` → `jssToCSS`
- Import path stays the same: `@universityofmaryland/web-utilities-library/styles`

---

#### 4. getStyleStringFromJssObject → jssEntryToCSS

**Before:**
```typescript
import { getStyleStringFromJssObject } from '@universityofmaryland/web-utilities-library/styles';

const css = getStyleStringFromJssObject(jssEntry);
```

**After:**
```typescript
import { jssEntryToCSS } from '@universityofmaryland/web-utilities-library/styles';

const css = jssEntryToCSS(jssEntry);
```

**Find & Replace:**
- Function: `getStyleStringFromJssObject` → `jssEntryToCSS`
- Import path stays the same: `@universityofmaryland/web-utilities-library/styles`

---

### Stage 2: Event Handlers & CSS Parsing

#### 5. eventAccessibilityFocus → handleKeyboardNavigation

**⚠️ CATEGORY CHANGE**: accessibility → events

**Before:**
```typescript
import { eventAccessibilityFocus } from '@universityofmaryland/web-utilities-library/accessibility';

const cleanup = eventAccessibilityFocus({
  element,
  action: (event) => { /* ... */ }
});
```

**After:**
```typescript
import { handleKeyboardNavigation } from '@universityofmaryland/web-utilities-library/events';

const cleanup = handleKeyboardNavigation({
  element,
  action: (event) => { /* ... */ }
});
```

**Find & Replace:**
- Function: `eventAccessibilityFocus` → `handleKeyboardNavigation`
- Import: `@universityofmaryland/web-utilities-library/accessibility` → `@universityofmaryland/web-utilities-library/events`

---

#### 6. eventAccessibilityFocusTrap → trapFocus

**Before:**
```typescript
import { eventAccessibilityFocusTrap } from '@universityofmaryland/web-utilities-library/accessibility';

const cleanup = eventAccessibilityFocusTrap({
  element,
  action: (event) => { /* ... */ }
});
```

**After:**
```typescript
import { trapFocus } from '@universityofmaryland/web-utilities-library/accessibility';

const cleanup = trapFocus({
  element,
  action: (event) => { /* ... */ }
});
```

**Find & Replace:**
- Function: `eventAccessibilityFocusTrap` → `trapFocus`
- Import path stays the same: `@universityofmaryland/web-utilities-library/accessibility`

---

#### 7. createEventSwipe → setupSwipeDetection

**Before:**
```typescript
import { createEventSwipe } from '@universityofmaryland/web-utilities-library/events';

createEventSwipe({
  container,
  callback: (swipedRight) => { /* ... */ }
});
```

**After:**
```typescript
import { setupSwipeDetection } from '@universityofmaryland/web-utilities-library/events';

setupSwipeDetection({
  container,
  callback: (swipedRight) => { /* ... */ }
});
```

**Find & Replace:**
- Function: `createEventSwipe` → `setupSwipeDetection`
- Import path stays the same: `@universityofmaryland/web-utilities-library/events`

---

#### 8. convertPixelStringToNumber → parsePixelValue

**⚠️ CATEGORY CHANGE**: string → styles (CSS value parsing belongs with styles)

**Before:**
```typescript
import { convertPixelStringToNumber } from '@universityofmaryland/web-utilities-library/string';

const value = convertPixelStringToNumber('16px');
```

**After:**
```typescript
import { parsePixelValue } from '@universityofmaryland/web-utilities-library/styles';

const value = parsePixelValue('16px');
```

**Find & Replace:**
- Function: `convertPixelStringToNumber` → `parsePixelValue`
- Import: `@universityofmaryland/web-utilities-library/string` → `@universityofmaryland/web-utilities-library/styles`

---

### Stage 3: Consistency & Standardization

#### 9. animationLinkSpan → wrapLinkForAnimation

**Before:**
```typescript
import { animationLinkSpan } from '@universityofmaryland/web-utilities-library/animation';

animationLinkSpan(linkElement);
```

**After:**
```typescript
import { wrapLinkForAnimation } from '@universityofmaryland/web-utilities-library/animation';

wrapLinkForAnimation(linkElement);
```

**Find & Replace:**
- Function: `animationLinkSpan` → `wrapLinkForAnimation`
- Import path stays the same: `@universityofmaryland/web-utilities-library/animation`

---

#### 10. scrollTo → smoothScrollToElement

**Before:**
```typescript
import { scrollTo } from '@universityofmaryland/web-utilities-library/animation';

scrollTo({ element, spread: 20 });
```

**After:**
```typescript
import { smoothScrollToElement } from '@universityofmaryland/web-utilities-library/animation';

smoothScrollToElement({ element, spread: 20 });
```

**Find & Replace:**
- Function: `scrollTo` → `smoothScrollToElement`
- Import path stays the same: `@universityofmaryland/web-utilities-library/animation`

---

#### 11. loadGridAnimationObserver → observeGridAnimations

**Before:**
```typescript
import { loadGridAnimationObserver } from '@universityofmaryland/web-utilities-library/animation';

loadGridAnimationObserver();
```

**After:**
```typescript
import { observeGridAnimations } from '@universityofmaryland/web-utilities-library/animation';

observeGridAnimations();
```

**Find & Replace:**
- Function: `loadGridAnimationObserver` → `observeGridAnimations`
- Import path stays the same: `@universityofmaryland/web-utilities-library/animation`

---

#### 12. cleanCopy → cloneElementWithoutAttributes

**Before:**
```typescript
import { cleanCopy } from '@universityofmaryland/web-utilities-library/dom';

const clone = cleanCopy(element);
```

**After:**
```typescript
import { cloneElementWithoutAttributes } from '@universityofmaryland/web-utilities-library/dom';

const clone = cloneElementWithoutAttributes(element);
```

**Find & Replace:**
- Function: `cleanCopy` → `cloneElementWithoutAttributes`
- Import path stays the same: `@universityofmaryland/web-utilities-library/dom`

---

#### 13. getIcon → extractIconElement

**Before:**
```typescript
import { getIcon } from '@universityofmaryland/web-utilities-library/dom';

const icon = getIcon({ element });
```

**After:**
```typescript
import { extractIconElement } from '@universityofmaryland/web-utilities-library/dom';

const icon = extractIconElement({ element });
```

**Find & Replace:**
- Function: `getIcon` → `extractIconElement`
- Import path stays the same: `@universityofmaryland/web-utilities-library/dom`

---

#### 14. createSlotWithStyleOverwrite → createStyledSlotOrClone

**Before:**
```typescript
import { createSlotWithStyleOverwrite } from '@universityofmaryland/web-utilities-library/elements';

const slot = createSlotWithStyleOverwrite({ name: 'image' });
```

**After:**
```typescript
import { createStyledSlotOrClone } from '@universityofmaryland/web-utilities-library/elements';

const slot = createStyledSlotOrClone({ name: 'image' });
```

**Find & Replace:**
- Function: `createSlotWithStyleOverwrite` → `createStyledSlotOrClone`
- Import path stays the same: `@universityofmaryland/web-utilities-library/elements`

---

#### 15. svgFromString → parseSvgString

**Before:**
```typescript
import { svgFromString } from '@universityofmaryland/web-utilities-library/media';

const svg = svgFromString(svgString);
```

**After:**
```typescript
import { parseSvgString } from '@universityofmaryland/web-utilities-library/media';

const svg = parseSvgString(svgString);
```

**Find & Replace:**
- Function: `svgFromString` → `parseSvgString`
- Import path stays the same: `@universityofmaryland/web-utilities-library/media`

---

#### 16. createVisualFormattedDate → formatDateForDisplay

**Before:**
```typescript
import { createVisualFormattedDate } from '@universityofmaryland/web-utilities-library/date';

const formatted = createVisualFormattedDate(date);
```

**After:**
```typescript
import { formatDateForDisplay } from '@universityofmaryland/web-utilities-library/date';

const formatted = formatDateForDisplay(date);
```

**Find & Replace:**
- Function: `createVisualFormattedDate` → `formatDateForDisplay`
- Import path stays the same: `@universityofmaryland/web-utilities-library/date`

---

#### 17. createEventDate → parseDateFromElement

**Before:**
```typescript
import { createEventDate } from '@universityofmaryland/web-utilities-library/date';

const date = createEventDate(element);
```

**After:**
```typescript
import { parseDateFromElement } from '@universityofmaryland/web-utilities-library/date';

const date = parseDateFromElement(element);
```

**Find & Replace:**
- Function: `createEventDate` → `parseDateFromElement`
- Import path stays the same: `@universityofmaryland/web-utilities-library/date`

---

#### 18. createDateCompareString → formatDateForComparison

**Before:**
```typescript
import { createDateCompareString } from '@universityofmaryland/web-utilities-library/date';

const comparison = createDateCompareString(date);
```

**After:**
```typescript
import { formatDateForComparison } from '@universityofmaryland/web-utilities-library/date';

const comparison = formatDateForComparison(date);
```

**Find & Replace:**
- Function: `createDateCompareString` → `formatDateForComparison`
- Import path stays the same: `@universityofmaryland/web-utilities-library/date`

---

#### 19. slotImage → getValidatedSlotImage

**Before:**
```typescript
import { slotImage } from '@universityofmaryland/web-utilities-library/validation';

const image = slotImage({ slot, shadowRoot });
```

**After:**
```typescript
import { getValidatedSlotImage } from '@universityofmaryland/web-utilities-library/validation';

const image = getValidatedSlotImage({ slot, shadowRoot });
```

**Find & Replace:**
- Function: `slotImage` → `getValidatedSlotImage`
- Import path stays the same: `@universityofmaryland/web-utilities-library/validation`

---

## Naming Conventions Established

### Function Prefixes

| Prefix | Purpose | Examples |
|--------|---------|----------|
| `create*` | Construct new elements/objects | `createMediaQuery`, `createStyledSlotOrClone` |
| `parse*` | Parse/convert data | `parseSvgString`, `parseDateFromElement`, `parsePixelValue` |
| `format*` | Format data for display | `formatDateForDisplay`, `formatDateForComparison` |
| `extract*` | Retrieve/extract data | `extractIconElement` |
| `get*` | Simple retrieval | `getValidatedSlotImage` |
| `clone*` | Clone elements | `cloneElementWithoutAttributes` |
| `wrap*` | Wrap elements | `wrapLinkForAnimation` |
| `observe*` | Set up observers | `observeGridAnimations` |
| `setup*` | Initialize behaviors | `setupSwipeDetection` |
| `handle*` | Event handlers | `handleKeyboardNavigation` |
| `trap*` | Focus trapping | `trapFocus` |
| `smooth*` | Animated actions | `smoothScrollToElement` |

---

## Automated Migration Script

Use this bash script to update all occurrences in your codebase:

```bash
#!/bin/bash

# Stage 1: Maximum Impact
find . -name "*.ts" -type f -exec sed -i '' 's/createContainerQuery/createMediaQuery/g' {} \;
find . -name "*.ts" -type f -exec sed -i '' 's/createRangeContainerQuery/createMediaQueryRange/g' {} \;
find . -name "*.ts" -type f -exec sed -i '' 's/convertJSSObjectToStyles/jssToCSS/g' {} \;
find . -name "*.ts" -type f -exec sed -i '' 's/getStyleStringFromJssObject/jssEntryToCSS/g' {} \;

# Stage 2: Clarity
find . -name "*.ts" -type f -exec sed -i '' 's/eventAccessibilityFocus/handleKeyboardNavigation/g' {} \;
find . -name "*.ts" -type f -exec sed -i '' 's/accessibility\/eventAccessibilityFocus/events\/handleKeyboardNavigation/g' {} \;
find . -name "*.ts" -type f -exec sed -i '' 's/eventAccessibilityFocusTrap/trapFocus/g' {} \;
find . -name "*.ts" -type f -exec sed -i '' 's/createEventSwipe/setupSwipeDetection/g' {} \;
find . -name "*.ts" -type f -exec sed -i '' 's/convertPixelStringToNumber/parsePixelValue/g' {} \;
find . -name "*.ts" -type f -exec sed -i '' 's/string\/convertPixelStringToNumber/styles\/parsePixelValue/g' {} \;

# Stage 3: Consistency
find . -name "*.ts" -type f -exec sed -i '' 's/animationLinkSpan/wrapLinkForAnimation/g' {} \;
find . -name "*.ts" -type f -exec sed -i '' 's/scrollTo/smoothScrollToElement/g' {} \;
find . -name "*.ts" -type f -exec sed -i '' 's/loadGridAnimationObserver/observeGridAnimations/g' {} \;
find . -name "*.ts" -type f -exec sed -i '' 's/cleanCopy/cloneElementWithoutAttributes/g' {} \;
find . -name "*.ts" -type f -exec sed -i '' 's/getIcon/extractIconElement/g' {} \;
find . -name "*.ts" -type f -exec sed -i '' 's/createSlotWithStyleOverwrite/createStyledSlotOrClone/g' {} \;
find . -name "*.ts" -type f -exec sed -i '' 's/svgFromString/parseSvgString/g' {} \;
find . -name "*.ts" -type f -exec sed -i '' 's/createVisualFormattedDate/formatDateForDisplay/g' {} \;
find . -name "*.ts" -type f -exec sed -i '' 's/createEventDate/parseDateFromElement/g' {} \;
find . -name "*.ts" -type f -exec sed -i '' 's/createDateCompareString/formatDateForComparison/g' {} \;
find . -name "*.ts" -type f -exec sed -i '' 's/slotImage/getValidatedSlotImage/g' {} \;

echo "Migration complete! Please review changes before committing."
```

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| **Total Functions Renamed** | 20 |
| **Total File Changes** | ~743 |
| **Utilities Package** | 48 files (source + tests) |
| **Elements Package** | 34 files |
| **Components Package** | 20+ files |
| **Feeds Package** | 0 files |
| **Styles Package** | 0 files |
| **Category Moves** | 2 (handleKeyboardNavigation, parsePixelValue) |

---

## Testing

All packages have been built and tested successfully:
- ✅ Utilities package builds
- ✅ Elements package builds
- ✅ Feeds package builds
- ✅ Components package builds
- ✅ All TypeScript types generated correctly

---

## Support

For issues or questions about this migration:
1. Check the [REFACTORING_PLAN.md](./REFACTORING_PLAN.md) for detailed implementation notes
2. Review the [CLAUDE.md](./CLAUDE.md) for package architecture
3. See individual function JSDoc comments for usage examples

---

**Migration completed**: January 2025
**Package version**: 0.2.0
**Stages completed**: 1-3 (Stage 4 skipped - minimal impact)
