# Utilities Package Refactoring Plan

## Overview

This document outlines a staged approach to refactoring the utilities package for improved naming, categorization, and developer experience. The refactoring is divided into 4 stages, each followed by comprehensive testing and validation.

---

## Stage 1: MAXIMUM IMPACT (Highest Usage Functions)

### Objective
Rename the most heavily-used functions (88-127+ occurrences) to fix misleading names and improve clarity.

### Changes

#### 1.1 Styles Category - Media Query Functions ⚠️ CRITICAL
**Why**: Currently named "container query" but creates `@media` queries, not `@container` queries - fundamentally misleading!

| Current Name | New Name | Usage Count | Category |
|--------------|----------|-------------|----------|
| `createContainerQuery` | `createMediaQuery` | ~88 | styles |
| `createRangeContainerQuery` | `createMediaQueryRange` | ~47 | styles |

**Files to Update**:
- `/packages/utilities/source/styles/createContainerQuery.ts` → rename to `createMediaQuery.ts`
- `/packages/utilities/source/styles/createRangeContainerQuery.ts` → rename to `createMediaQueryRange.ts`
- `/packages/utilities/source/styles/index.ts` - update exports
- `/packages/utilities/source/index.ts` - update main barrel export

#### 1.2 Styles Category - JSS Conversion Functions
**Why**: Names are overly verbose for a function used 127+ times

| Current Name | New Name | Usage Count | Category |
|--------------|----------|-------------|----------|
| `convertJSSObjectToStyles` | `jssToCSS` | ~127 | styles |
| `getStyleStringFromJssObject` | `jssEntryToCSS` | ~41 | styles |

**Files to Update**:
- `/packages/utilities/source/styles/convertJSSObjectToStyles.ts` → rename to `jssToCSS.ts`
- `/packages/utilities/source/styles/getStyleStringFromJssObject.ts` → rename to `jssEntryToCSS.ts`
- `/packages/utilities/source/styles/index.ts` - update exports
- `/packages/utilities/source/index.ts` - update main barrel export

#### 1.3 Performance Category - Debounce Function
**Status**: Keep as-is (well-named, 68+ uses) ✅

### Implementation Steps

1. **Rename files in utilities package**
   ```bash
   # In /packages/utilities/source/styles/
   mv createContainerQuery.ts createMediaQuery.ts
   mv createRangeContainerQuery.ts createMediaQueryRange.ts
   mv convertJSSObjectToStyles.ts jssToCSS.ts
   mv getStyleStringFromJssObject.ts jssEntryToCSS.ts
   ```

2. **Update function names and exports within each file**
   - Update the exported function name in each file
   - Update JSDoc comments to reflect new name
   - Update example code in JSDoc

3. **Update barrel exports**
   - `/packages/utilities/source/styles/index.ts`
   - `/packages/utilities/source/index.ts`

4. **Update package.json exports configuration**
   ```json
   {
     "exports": {
       "./styles": { ... },
       "./styles/createMediaQuery": { ... },
       "./styles/createMediaQueryRange": { ... },
       "./styles/jssToCSS": { ... },
       "./styles/jssEntryToCSS": { ... }
     }
   }
   ```

5. **Update test files**
   - Rename test files to match new names
   - Update imports and function references in tests
   - Update test descriptions

6. **Build utilities package**
   ```bash
   cd /packages/utilities
   npm run build
   ```

7. **Find and replace across packages**

   **Elements Package**:
   ```bash
   # Search and replace patterns
   createContainerQuery → createMediaQuery
   createRangeContainerQuery → createMediaQueryRange
   convertJSSObjectToStyles → jssToCSS
   getStyleStringFromJssObject → jssEntryToCSS
   ```

   **Components Package**:
   ```bash
   # Same replacements as elements
   ```

   **Feeds Package**:
   ```bash
   # Same replacements as elements
   ```

   **Styles Package**:
   ```bash
   # Same replacements as elements
   ```

8. **Build all packages in dependency order**
   ```bash
   # From monorepo root
   npx lerna run build --scope=@universityofmaryland/web-utilities-library
   npx lerna run build --scope=@universityofmaryland/web-elements-library
   npx lerna run build --scope=@universityofmaryland/web-feeds-library
   npx lerna run build --scope=@universityofmaryland/web-components-library
   ```

9. **Run tests across all packages**
   ```bash
   yarn test
   ```

10. **Verify no build or type errors**

### Expected Impact
- **~303 file changes** across all packages
- **0 breaking changes** (internal refactor only)
- Eliminates most misleading function name in the codebase

---

## Stage 2: CLARITY (Event Handlers & String Functions)

### Objective
Improve clarity for event handling functions and string parsing utilities.

### Changes

#### 2.1 Accessibility → Events Category
**Why**: These are primarily event handlers, not accessibility utilities

| Current Name | New Name | Usage Count | Current Category | New Category |
|--------------|----------|-------------|------------------|--------------|
| `eventAccessibilityFocus` | `handleKeyboardNavigation` | ~30 | accessibility | events |
| `eventAccessibilityFocusTrap` | `trapFocus` | ~21 | accessibility | accessibility |

#### 2.2 Events Category
| Current Name | New Name | Usage Count | Category |
|--------------|----------|-------------|----------|
| `createEventSwipe` | `setupSwipeDetection` | ~26 | events |

#### 2.3 String → Styles Category
**Why**: This is CSS value parsing, belongs with style utilities

| Current Name | New Name | Usage Count | Current Category | New Category |
|--------------|----------|-------------|------------------|--------------|
| `convertPixelStringToNumber` | `parsePixelValue` | ~76 | string | styles |

### Implementation Steps

1. **Create new files and update function names**
   - `/packages/utilities/source/events/handleKeyboardNavigation.ts` (move from accessibility)
   - `/packages/utilities/source/accessibility/trapFocus.ts` (rename in place)
   - `/packages/utilities/source/events/setupSwipeDetection.ts` (rename from createEventSwipe.ts)
   - `/packages/utilities/source/styles/parsePixelValue.ts` (move from string)

2. **Update barrel exports**
   - `/packages/utilities/source/accessibility/index.ts`
   - `/packages/utilities/source/events/index.ts`
   - `/packages/utilities/source/string/index.ts`
   - `/packages/utilities/source/styles/index.ts`
   - `/packages/utilities/source/index.ts`

3. **Update package.json exports**
   - Add new export paths for moved functions
   - Update category exports

4. **Update test files**
   - Move and rename test files to match new locations
   - Update imports and references

5. **Build utilities package**

6. **Find and replace across all packages**
   ```bash
   # Import path changes
   @universityofmaryland/web-utilities-library/accessibility/eventAccessibilityFocus
   → @universityofmaryland/web-utilities-library/events/handleKeyboardNavigation

   # Function name changes
   eventAccessibilityFocus → handleKeyboardNavigation
   eventAccessibilityFocusTrap → trapFocus
   createEventSwipe → setupSwipeDetection
   convertPixelStringToNumber → parsePixelValue
   ```

7. **Build all packages in dependency order**

8. **Run tests and verify no errors**

### Expected Impact
- **~153 file changes** across packages
- Clearer separation between event handling and accessibility
- More intuitive function names

---

## Stage 3: CONSISTENCY (Remaining Function Renames)

### Objective
Standardize naming patterns across remaining utilities for consistency.

### Changes

#### 3.1 Animation Category
| Current Name | New Name | Usage Count | Rationale |
|--------------|----------|-------------|-----------|
| `animationLinkSpan` | `wrapLinkForAnimation` | ~39 | Clearer action-based name |
| `scrollTo` | `smoothScrollToElement` | ~33 | Avoid conflict with native API |
| `loadGridAnimationObserver` | `observeGridAnimations` | ~22 | More concise |
| `shrinkThenRemove` | ✅ Keep | ~27 | Already clear |

#### 3.2 DOM Category
| Current Name | New Name | Usage Count | Rationale |
|--------------|----------|-------------|-----------|
| `cleanCopy` | `cloneElementWithoutAttributes` | ~36 | Descriptive of behavior |
| `getIcon` | `extractIconElement` | ~35 | Clearer retrieval + modification |
| `findParent` | ✅ Keep | ~34 | Already clear |
| `wrapTextNodeInSpan` | ✅ Keep | ~33 | Already clear |
| `getImageFromSlot` | ✅ Keep | ~4 | Already clear |

#### 3.3 Elements Category
| Current Name | New Name | Usage Count | Rationale |
|--------------|----------|-------------|-----------|
| `createSlotWithStyleOverwrite` | `createStyledSlotOrClone` | ~21 | Clearer conditional logic |
| `createSlot` | ✅ Keep | ~52 | Already clear |
| `createStyleTemplate` | ✅ Keep | ~28 | Already clear |
| `createLinkWithSpan` | ✅ Keep (low usage) | ~27 | Used mostly in tests |

#### 3.4 Media Category
| Current Name | New Name | Usage Count | Rationale |
|--------------|----------|-------------|-----------|
| `svgFromString` | `parseSvgString` | ~42 | Standard parse* prefix |
| `imageFromSvg` | ✅ Keep | ~36 | Already clear |
| `getResponsiveImageSize` | ✅ Keep | ~30 | Already clear |

#### 3.5 Date Category
| Current Name | New Name | Usage Count | Rationale |
|--------------|----------|-------------|-----------|
| `createVisualFormattedDate` | `formatDateForDisplay` | Low | Clearer purpose |
| `createEventDate` | `parseDateFromElement` | ~9 | Indicates DOM operation |
| `createDateCompareString` | `formatDateForComparison` | Low | Clearer purpose |
| `createEventDetails` | ✅ Keep | Low | Event-specific, niche use |

#### 3.6 Validation Category
| Current Name | New Name | Usage Count | Rationale |
|--------------|----------|-------------|-----------|
| `slotImage` | `getValidatedSlotImage` | ~13 | Indicates validation occurs |
| `imageHasAlt` | ✅ Keep | ~33 | Already clear boolean |
| `isHTMLElement` | ✅ Keep | Low | Standard type guard |

### Implementation Steps

1. **Rename files and update function names** (14 files)
2. **Update all barrel exports**
3. **Update package.json exports**
4. **Update test files**
5. **Build utilities package**
6. **Find and replace across all packages** (use exact string matching)
7. **Build all packages in dependency order**
8. **Run tests and verify no errors**

### Expected Impact
- **~287 file changes** across packages
- Consistent naming patterns (parse*, format*, create*, extract*, etc.)
- More predictable API surface

---

## Stage 4: CATEGORY REORGANIZATIONS

### Objective
Move functions to more appropriate categories based on their actual purpose.

### Changes

#### 4.1 Validation → Accessibility
**Why**: Alt text is a WCAG accessibility requirement

| Function Name | Current Category | New Category | Usage Count |
|--------------|------------------|--------------|-------------|
| `imageHasAlt` | validation | accessibility | ~33 |

#### 4.2 String → Styles
**Why**: Already completed in Stage 2

| Function Name | Current Category | New Category | Usage Count |
|--------------|------------------|--------------|-------------|
| `parsePixelValue` | ~~string~~ | styles | ~76 |

### Implementation Steps

1. **Move files to new category directories**
   ```bash
   mv /packages/utilities/source/validation/imageHasAlt.ts \
      /packages/utilities/source/accessibility/imageHasAlt.ts
   ```

2. **Update barrel exports**
   - Remove from `/packages/utilities/source/validation/index.ts`
   - Add to `/packages/utilities/source/accessibility/index.ts`
   - Update `/packages/utilities/source/index.ts`

3. **Update package.json exports**
   ```json
   {
     "exports": {
       "./accessibility/imageHasAlt": { ... },
       // Remove from ./validation/imageHasAlt
     }
   }
   ```

4. **Move corresponding test files**

5. **Build utilities package**

6. **Find and replace import paths across all packages**
   ```bash
   @universityofmaryland/web-utilities-library/validation/imageHasAlt
   → @universityofmaryland/web-utilities-library/accessibility/imageHasAlt
   ```

7. **Build all packages in dependency order**

8. **Run tests and verify no errors**

### Expected Impact
- **~33 file changes** (import path updates only)
- Better logical organization
- Easier discoverability

---

## Post-Refactoring Tasks

### Phase 5: Testing & Documentation

1. **Implement comprehensive Jest tests**
   - Ensure 100% code coverage for all utility functions
   - Focus on simple, clear test cases
   - Test both happy paths and edge cases
   - Update existing tests that may have been missed

2. **Add TypeDoc documentation**
   - Add detailed JSDoc comments to all functions
   - Include @category tags for organization
   - Add practical @example blocks
   - Document @param and @returns with types
   - Add @see references for related utilities

3. **Update README.md**
   - Package overview and purpose
   - Installation instructions
   - Import pattern examples (category vs. individual vs. main)
   - Link to TypeDoc documentation
   - Migration guide for renamed functions
   - Contribution guidelines

4. **Create MIGRATION.md**
   - Document all function renames with before/after
   - Provide find-and-replace patterns
   - List category changes
   - Include version information

---

## Quality Assurance Checklist

### After Each Stage

- [ ] All renamed files exist in correct locations
- [ ] No orphaned files remain in old locations
- [ ] All barrel exports (`index.ts`) updated
- [ ] `package.json` exports configuration updated
- [ ] All test files updated with new names/imports
- [ ] Utilities package builds successfully
- [ ] Elements package builds successfully
- [ ] Feeds package builds successfully
- [ ] Components package builds successfully
- [ ] All packages pass `npm test`
- [ ] No TypeScript errors in any package
- [ ] Git commit created for stage with descriptive message

### Final Verification

- [ ] Run full build: `npx lerna run build`
- [ ] Run all tests: `yarn test`
- [ ] Check type definitions are generated correctly
- [ ] Verify package.json exports are comprehensive
- [ ] Ensure no console errors in any package
- [ ] Review git diff for unintended changes
- [ ] Test selective imports work correctly
- [ ] Verify CDN builds still work (if applicable)

---

## Rollback Plan

If any stage fails:

1. **Identify the failure point**
   - Build error? Check TypeScript types and imports
   - Test failure? Check function references in tests
   - Runtime error? Check barrel exports

2. **Rollback options**
   - Revert stage commit: `git revert <commit-hash>`
   - Reset to previous stage: `git reset --hard <commit-hash>`
   - Cherry-pick successful changes

3. **Fix and retry**
   - Address the specific issue
   - Re-run build and tests
   - Proceed to next stage

---

## Summary

| Stage | Functions Changed | Estimated File Changes | Priority |
|-------|------------------|----------------------|----------|
| 1: Maximum Impact | 4 | ~303 | CRITICAL |
| 2: Clarity | 4 | ~153 | HIGH |
| 3: Consistency | 14 | ~287 | MEDIUM |
| 4: Reorganization | 1 | ~33 | LOW |
| **Total** | **23** | **~776** | - |

### Key Benefits

1. **Eliminates misleading names** (container query → media query)
2. **Reduces verbosity** (convertJSSObjectToStyles → jssToCSS)
3. **Improves consistency** (standard prefixes: parse*, format*, create*)
4. **Better categorization** (functions in logical groups)
5. **Enhanced discoverability** (intuitive naming patterns)
6. **Maintains backward compatibility** (can add deprecation warnings if needed)

### Timeline Estimate

- **Stage 1**: 2-3 hours (critical path, extensive testing)
- **Stage 2**: 2 hours
- **Stage 3**: 3-4 hours (most renames)
- **Stage 4**: 1 hour (minimal changes)
- **Testing & Docs**: 4-5 hours
- **Total**: ~12-15 hours

---

## Notes

- Each stage is independently committable
- Failed stages can be rolled back without affecting previous stages
- Find-and-replace should use exact string matching to avoid false positives
- Always build in dependency order: utilities → elements → feeds → components
- Test coverage should remain at or above current levels
- Consider adding deprecation warnings for old names if package is publicly consumed
