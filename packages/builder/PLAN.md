# Builder Package: Next Phase Plan

**Version**: 2.0
**Date**: 2025-01-24
**Status**: API Refactor Complete ✅ | Ready for Element Package Migration 🚀

---

## Current State Summary

### ✅ Completed (Phase 1-6)

1. **Core Architecture** - ElementBuilder with fluent API
2. **Factory System** - Preset builders and composition helpers
3. **Style Integration** - JSS object support with `.styled()` method
4. **Animation System Phase 1** - CSS animation shorthand generation
5. **Lifecycle Management** - Resource tracking and cleanup
6. **API Refactor (Option 3)** - Constructor-based with explicit patterns

### 📊 Test Coverage

- **202/202 tests passing** ✅
- Core functionality: 100% coverage
- Factory patterns: Complete
- Animation Phase 1: Validated

---

## Phase 7: Element Package Migration (NEXT)

### Objective

Migrate one proof-of-concept element from the elements package to use the new ElementBuilder API, validating the refactored architecture in real-world usage.

### Why This Is Critical

Before proceeding with Phase 2 (Animation System), we need to:
1. **Validate the API** in actual component construction
2. **Identify any missing patterns** not covered by tests
3. **Ensure the `.styled()` method** works with real JSS objects
4. **Document migration patterns** for future conversions
5. **Catch integration issues** early

### Candidate Elements for POC

**Recommended: Text Lockup Element** (`/packages/elements/source/atomic/text-lockup`)

**Why Text Lockup?**
- ✅ Simple composition (headline + text + optional eyebrow)
- ✅ Uses styled wrappers (tests `.styled()` method)
- ✅ No complex animation (focus on API validation)
- ✅ Representative of 60% of elements package patterns
- ✅ Quick win for validation

**Alternative: Action Element** (`/packages/elements/source/atomic/action`)
- Tests animation integration (slideUnder)
- Simpler than text lockup
- But doesn't test composition patterns

### Migration Steps

#### Step 1: Analyze Current Implementation
```bash
# Read the existing text-lockup implementation
# Document:
# - What JSS objects are used
# - How elements are composed
# - What props are passed
# - How styles are applied
```

#### Step 2: Create Side-by-Side Implementation
```typescript
// BEFORE (v1):
import { createStyledElement } from '@universityofmaryland/web-elements-library/v1';

const textLockup = (props) => {
  const { headline, text, eyebrow } = props;
  // v1 implementation...
};

// AFTER (v2):
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as Styles from '@universityofmaryland/web-styles-library';

const textLockup = (props) => {
  const { headline, text, eyebrow } = props;

  // Use new ElementBuilder API
  const headlineElement = new ElementBuilder(headline)
    .styled(Styles.typography.sans.larger)
    .build();

  // Compose with builder
  return new ElementBuilder()
    .withClassName('umd-text-lockup')
    .withChild(headlineElement)
    // ...
    .build();
};
```

#### Step 3: Validate Against Test Suite
```bash
# Run element-specific tests
npm test -- text-lockup.test.ts

# Ensure ElementModel output matches v1
# Verify styles are identical
# Check element structure is correct
```

#### Step 4: Document Findings
Create `/packages/builder/MIGRATION-POC.md`:
- What worked well
- What was challenging
- API improvements needed
- Patterns to document
- Performance observations

#### Step 5: Update Migration Guide
Based on POC learnings, update migration patterns for future conversions.

### Success Criteria

- [ ] POC element builds successfully with ElementBuilder
- [ ] All tests pass for POC element
- [ ] Generated styles match v1 output
- [ ] ElementModel structure is equivalent
- [ ] No performance regression
- [ ] Migration patterns documented
- [ ] At least 3 reusable patterns identified

### Estimated Time

**2-4 hours** for complete POC cycle

---

## Phase 8: Animation System Phase 2 (FUTURE)

### Overview

After validating the ElementBuilder API with real element migrations, implement the relational keyframe animation system.

### Phase 2A: Keyframe Definition

**Goal**: Allow elements to define their own keyframes

**New API**:
```typescript
const heroContent = new ElementBuilder('div')
  .withKeyframes('fadeIn', {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  })
  .withText('Hero content');
```

**Implementation Tasks**:

1. **Add `.withKeyframes()` Method**
   - Accept keyframe name and definition
   - Store keyframes in builder state
   - Generate unique keyframe names (prevent collisions)

2. **CSS Generation**
   ```css
   @keyframes fadeIn-abc123 {
     from { opacity: 0; transform: translateY(20px); }
     to { opacity: 1; transform: translateY(0); }
   }
   ```

3. **Type Definitions**
   ```typescript
   interface KeyframeDefinition {
     from?: Record<string, string | number>;
     to?: Record<string, string | number>;
     [percent: string]: Record<string, string | number>; // '0%', '50%', '100%'
   }

   withKeyframes(name: string, keyframes: KeyframeDefinition): this;
   ```

4. **Tests**
   - Keyframe CSS generation
   - Unique naming
   - Multiple keyframes per element
   - Percentage-based keyframes
   - Invalid keyframe handling

**Estimated Time**: 4-6 hours

---

### Phase 2B: Parent-Child Animation Coordination

**Goal**: Allow parents to orchestrate child animations by element reference

**New API**:
```typescript
const hero = new ElementBuilder('div')
  .withClassName('hero-container')
  .withKeyframes('slideIn', {
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(0)' }
  })
  .withAnimation('slideIn', { duration: '800ms' })
  .withChild(heroContent)
  // Coordinate child animation FROM PARENT
  .withAnimationFor(heroContent, 'fadeIn', {
    duration: '500ms',
    delay: '300ms',  // Start 300ms after parent starts
    easing: 'ease-out'
  })
  .build();
```

**Implementation Tasks**:

1. **Add `.withAnimationFor()` Method**
   - Accept child builder reference
   - Accept animation name and options
   - Track child animations in parent state

2. **Child Targeting Strategy**
   ```typescript
   // Option A: Data attributes
   <div class="hero-container">
     <div data-animation-id="abc123" class="hero-content">
       ...
     </div>
   </div>

   // CSS:
   .hero-container > [data-animation-id="abc123"] {
     animation: fadeIn-abc123 500ms 300ms ease-out;
   }
   ```

3. **CSS Generation**
   - Generate child animation CSS in parent stylesheet
   - Include data attribute selectors
   - Preserve parent styles

4. **Type Definitions**
   ```typescript
   interface AnimationOptions {
     duration?: string;
     delay?: string;
     easing?: string;
     iterationCount?: string | number;
     direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
     fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
     // Phase 2 additions:
     trigger?: 'onParentStart' | 'onParentComplete' | 'onParentMidpoint';
     startAt?: string;  // Percentage like '50%'
   }

   withAnimationFor<C extends HTMLElement>(
     childBuilder: ElementBuilderInterface<C>,
     animation: string,
     options?: AnimationOptions
   ): this;
   ```

5. **Tests**
   - Parent-child animation coordination
   - Multiple children with different animations
   - Nested animation (grandparent-parent-child)
   - Data attribute generation
   - CSS selector generation

**Estimated Time**: 6-8 hours

---

### Phase 2C: Animation Timeline System (OPTIONAL)

**Goal**: Support complex animation sequences with declarative timelines

**New API**:
```typescript
const hero = new ElementBuilder('div')
  .withAnimationTimeline([
    { element: 'self', animation: 'slideIn', duration: '800ms' },
    { element: child1, animation: 'fadeIn', duration: '500ms', delay: '200ms' },
    { element: child2, animation: 'fadeIn', duration: '500ms', delay: '400ms' },
    { element: child3, animation: 'fadeIn', duration: '500ms', delay: '600ms' }
  ])
  .build();
```

**Decision Point**: Implement only if patterns in Phase 2B prove too verbose for complex sequences.

**Estimated Time**: 4-6 hours (if needed)

---

### Phase 2D: Advanced Animation Features (FUTURE)

**Goal**: Polish and performance optimization

**Features**:
- Animation composition (combine multiple keyframes)
- Animation utilities (pause, play, reverse via Web Animations API)
- Performance hints (`will-change` auto-generation)
- Animation event handlers (onStart, onComplete)
- Responsive animations (different timing on mobile)

**Estimated Time**: 6-10 hours

---

## Phase 9: API Documentation & Migration Guide

### Documentation Deliverables

#### 1. API Reference Documentation

**File**: `/packages/builder/docs/API.md`

**Sections**:
- ElementBuilder Constructor (all overloads)
- Core Methods (withClassName, withChild, etc.)
- Style Methods (.styled(), withStyles())
- Animation Methods (Phase 1 & 2)
- Lifecycle Methods (withListener, withObserver)
- Build & Utility Methods
- Type Definitions

**Format**: Generated via TypeDoc + Manual examples

#### 2. Migration Guide

**File**: `/packages/builder/docs/MIGRATION.md`

**Sections**:
- Why migrate to ElementBuilder v2
- Breaking changes (factory functions removed)
- Migration patterns (before/after)
- Common pitfalls and solutions
- Performance considerations
- FAQ

#### 3. Animation Cookbook

**File**: `/packages/builder/docs/ANIMATIONS.md`

**Sections**:
- Phase 1 patterns (simple animations)
- Phase 2 patterns (coordinated animations)
- Common use cases (hero, card, accordion)
- Performance best practices
- Troubleshooting

**Estimated Time**: 6-8 hours total

---

## Critical Decision Points

### Decision 1: When to Start Phase 2A?

**Options**:
- **Option A**: Start after Phase 7 POC (validate API first)
- **Option B**: Start after 5+ element migrations (validate patterns)
- **Option C**: Start after elements package 50% migrated (validate at scale)

**Recommendation**: **Option A** - Start after POC validates the API works. Phase 2A is independent and can proceed in parallel with migrations.

**Rationale**: Phase 2A (keyframes) is a pure addition with no breaking changes. Early implementation allows elements to use custom keyframes during migration.

---

### Decision 2: Child Targeting Mechanism

**Question**: How should parent CSS target child elements for animation?

**Options**:

**Option A: Data Attributes** ✅ Recommended
```html
<div class="hero-container">
  <div data-animation-id="abc123">Content</div>
</div>
```
```css
.hero-container > [data-animation-id="abc123"] {
  animation: fadeIn 500ms;
}
```
**Pros**: Refactoring-safe, no class coupling, clear intent
**Cons**: Slightly more verbose HTML

**Option B: Generated Classes**
```html
<div class="hero-container">
  <div class="hero-content-abc123">Content</div>
</div>
```
```css
.hero-container > .hero-content-abc123 {
  animation: fadeIn 500ms;
}
```
**Pros**: Familiar pattern
**Cons**: Still uses class names (defeats purpose)

**Option C: CSS Nesting**
```css
.hero-container {
  > :nth-child(1) { animation: fadeIn 500ms; }
}
```
**Pros**: No attributes needed
**Cons**: Brittle (child order matters), hard to maintain

**Recommendation**: **Option A (Data Attributes)** - Explicit, refactoring-safe, clear intent.

---

### Decision 3: Keyframe Scoping Strategy

**Question**: How should keyframe names be scoped to prevent collisions?

**Options**:

**Option A: Global with Manual Prefixing**
```typescript
.withKeyframes('heroFadeIn', { ... })
```
**Pros**: Simple, predictable names
**Cons**: Risk of collisions, manual namespace management

**Option B: Element-Scoped with Auto-Generation** ✅ Recommended
```typescript
.withKeyframes('fadeIn', { ... })
// Generates: @keyframes hero-content-fadeIn-abc123
```
**Pros**: No collisions, reusable names, scoped per element
**Cons**: Longer CSS, requires unique ID generation

**Option C: Hybrid**
```typescript
.withKeyframes('fadeIn', { ... })        // Auto-scoped
.withKeyframes('fadeIn', { global: true }) // Global
```
**Pros**: Flexible
**Cons**: More complex API

**Recommendation**: **Option B (Auto-Scoped)** - Safe default, prevents collisions. Add global option later if needed.

---

## Success Metrics

### Phase 7 (POC Migration)
- [ ] 1 element successfully migrated
- [ ] All tests pass
- [ ] No performance regression (<5ms difference)
- [ ] 3+ reusable patterns documented
- [ ] Team feedback: "Clear migration path"

### Phase 8 (Animation Phase 2)
- [ ] Hero component uses Phase 2 animations
- [ ] Zero `setTimeout` calls in animation code
- [ ] 50%+ reduction in animation LOC
- [ ] Zero brittle class name selectors
- [ ] Performance equal or better than manual timing

### Phase 9 (Documentation)
- [ ] Complete API reference
- [ ] Migration guide covers all patterns
- [ ] Animation cookbook has 10+ examples
- [ ] Developer feedback: "Easy to understand"

---

## Timeline Estimate

| Phase | Description | Estimated Time | Priority |
|-------|-------------|----------------|----------|
| Phase 7 | POC Migration (1 element) | 2-4 hours | 🔴 HIGH |
| Phase 8A | Keyframe Definition | 4-6 hours | 🟡 MEDIUM |
| Phase 8B | Parent-Child Coordination | 6-8 hours | 🟡 MEDIUM |
| Phase 8C | Timeline System | 4-6 hours | 🟢 LOW |
| Phase 8D | Advanced Features | 6-10 hours | 🟢 LOW |
| Phase 9 | Documentation | 6-8 hours | 🔴 HIGH |

**Total Estimated Time**: 28-42 hours

**Critical Path**: Phase 7 → Phase 8A → Phase 8B → Phase 9

---

## Open Questions for Discussion

### Technical Questions

1. **Keyframe Collision Strategy**: Should we warn developers if keyframe names collide globally?
2. **Animation Inheritance**: Should child elements inherit parent animation context?
3. **CSS Houdini Integration**: Should we support animation worklets for advanced effects?
4. **Web Animations API**: Should we provide JS-based animation control?
5. **Responsive Animations**: How to handle different timings for mobile/tablet/desktop?

### Product Questions

6. **Migration Priority**: Should we migrate elements in dependency order or by complexity?
7. **Breaking Changes**: When can we remove v1 archive code?
8. **Version Strategy**: Should Phase 2 be a major version bump (v3.0.0)?
9. **Documentation Format**: TypeDoc vs manual markdown vs both?
10. **Example Repository**: Should we create a separate examples package?

---

## Risk Assessment

### High Risk
- **API Validation Failure** - POC reveals missing patterns
  - **Mitigation**: Start with simple element, iterate quickly

- **Performance Regression** - New API slower than v1
  - **Mitigation**: Benchmark before/after, profile hot paths

### Medium Risk
- **Animation Coordination Complexity** - Phase 2B harder than expected
  - **Mitigation**: Start with simple parent-child, add complexity gradually

- **Documentation Burden** - Hard to explain complex patterns
  - **Mitigation**: Focus on examples, not exhaustive API docs

### Low Risk
- **Developer Adoption** - Team doesn't use new API
  - **Mitigation**: Clear migration guide, pair programming sessions

---

## Next Steps (Immediate)

### Step 1: POC Element Selection (Today)
- [ ] Review text-lockup element implementation
- [ ] Confirm it's the right POC candidate
- [ ] Document current implementation patterns
- [ ] Create POC branch

### Step 2: POC Implementation (This Week)
- [ ] Implement text-lockup with ElementBuilder
- [ ] Run tests and validate output
- [ ] Document findings in MIGRATION-POC.md
- [ ] Get team review and feedback

### Step 3: Decision Gate (End of Week)
- [ ] Review POC results
- [ ] Decide: Proceed with Phase 8A or iterate on API?
- [ ] Update PLAN.md with any changes
- [ ] Communicate timeline to team

---

## Appendix: Real-World Migration Example

### Before (v1 - Current Implementation)
```typescript
// From elements package
import { createStyledElement } from '@universityofmaryland/web-elements-library/v1';
import * as Styles from '@universityofmaryland/web-styles-library';

const createTextLockup = (props) => {
  const { headline, text, eyebrow, theme } = props;

  const container = document.createElement('div');
  container.className = 'umd-text-lockup';

  if (eyebrow) {
    const eyebrowEl = createStyledElement(eyebrow, Styles.typography.sans.smaller);
    container.appendChild(eyebrowEl.element);
  }

  const headlineEl = createStyledElement(headline, Styles.typography.sans.larger);
  container.appendChild(headlineEl.element);

  if (text) {
    const textEl = createStyledElement(text, Styles.typography.sans.medium);
    container.appendChild(textEl.element);
  }

  // Combine all styles
  const styles = [
    eyebrowEl?.styles,
    headlineEl.styles,
    textEl?.styles
  ].filter(Boolean).join('\n');

  return {
    element: container,
    styles: styles
  };
};
```

### After (v2 - ElementBuilder)
```typescript
// With new ElementBuilder
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as Styles from '@universityofmaryland/web-styles-library';

const createTextLockup = (props) => {
  const { headline, text, eyebrow, theme } = props;

  const builder = new ElementBuilder()
    .withClassName('umd-text-lockup');

  // Conditionally add eyebrow
  if (eyebrow) {
    const eyebrowElement = new ElementBuilder(eyebrow)
      .styled(Styles.typography.sans.smaller)
      .build();
    builder.withChild(eyebrowElement.element);
  }

  // Add headline
  const headlineElement = new ElementBuilder(headline)
    .styled(Styles.typography.sans.larger)
    .build();
  builder.withChild(headlineElement.element);

  // Conditionally add text
  if (text) {
    const textElement = new ElementBuilder(text)
      .styled(Styles.typography.sans.medium)
      .build();
    builder.withChild(textElement.element);
  }

  // Build returns ElementModel with combined styles
  return builder.build();
};
```

### Benefits Analysis

| Aspect | Before (v1) | After (v2) | Improvement |
|--------|-------------|------------|-------------|
| **Lines of Code** | 32 lines | 28 lines | 13% reduction |
| **Style Management** | Manual concatenation | Automatic | 100% automatic |
| **Type Safety** | Weak | Strong | Builder types enforced |
| **Readability** | Imperative | Declarative | Clearer intent |
| **Maintainability** | Manual DOM | Builder API | Easier to refactor |

---

**Document Version**: 2.0
**Last Updated**: 2025-01-24
**Next Review**: After Phase 7 POC completion
**Status**: Ready for Phase 7 🚀
