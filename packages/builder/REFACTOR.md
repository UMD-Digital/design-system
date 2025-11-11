# ElementBuilder V2 Migration Guide

**Version**: 1.2
**Date**: 2025-01-25
**Purpose**: Practical examples for migrating from V1 element patterns to V2 ElementBuilder

---

## Overview

This guide provides 10 real-world refactoring examples from the elements package, showing how to migrate from V1 patterns to the new V2 ElementBuilder API. Each pattern addresses a different use case to provide comprehensive coverage.

## Key Principles

### 1. Constructor-Based API

**V1 (Old)**:
```typescript
import ElementBuilder from '@universityofmaryland/web-builder-library';
const element = ElementBuilder.create(el);
```

**V2 (New)**:
```typescript
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
const element = new ElementBuilder(el);
```

### 2. Font/Typography Mappings

Campaign fonts have moved from `typography.sans` to `typography.campaign.fonts`:

| V1 Path | V2 Path |
|---------|---------|
| `Styles.typography.sans.campaignMaximum` | `Styles.typography.campaign.fonts.maximum` |
| `Styles.typography.sans.campaignExtraLarge` | `Styles.typography.campaign.fonts.extraLarge` |
| `Styles.typography.sans.campaignLarge` | `Styles.typography.campaign.fonts.large` |
| `Styles.typography.sans.campaignMedium` | `Styles.typography.campaign.fonts.medium` |
| `Styles.typography.sans.campaignSmall` | `Styles.typography.campaign.fonts.small` |

### 3. Type System

#### ElementModel is Generic

`ElementModel` is now generic to distinguish between `HTMLElement` and `DocumentFragment`:

```typescript
// Generic with default
interface ElementModel<T extends HTMLElement | DocumentFragment = HTMLElement | DocumentFragment> {
  element: T;
  className?: string;  // Optional - helpful for tracking
  styles: string;
  update?: (props: any) => void;
  destroy?: () => void;
  events?: { [key: string]: Function };
}
```

#### Return Type Annotations

When functions return ElementModel from `.build()`, explicitly type them as `ElementModel<HTMLElement>`:

```typescript
// ✅ CORRECT
const createHeadline = (): ElementModel<HTMLElement> | null => {
  return new ElementBuilder(headline)
    .styled(Styles.typography.campaign.fonts.large)
    .build();
};

// ❌ WRONG - will default to HTMLElement | DocumentFragment
const createHeadline = (): ElementModel | null => {
  // ...
};
```

#### Array Returns

```typescript
// ✅ CORRECT
const createChildren = (): ElementModel<HTMLElement>[] => {
  return items.map(item =>
    new ElementBuilder(item).build()
  );
};
```

### 4. Conditional Children Pattern

**IMPORTANT**: When conditionally adding children that are `ElementModel` objects, use the imperative conditional pattern instead of `.withChildIf()`:

**❌ WRONG** - Type error with `.withChildIf()`:
```typescript
const asset = createAsset(props); // Returns ElementModel<HTMLElement> | null

return new ElementBuilder()
  .withClassName('container')
  .withChildIf(!!asset, asset!)  // ❌ Type error!
  .build();
```

**✅ CORRECT** - Use imperative conditional:
```typescript
const asset = createAsset(props); // Returns ElementModel<HTMLElement> | null

const container = new ElementBuilder()
  .withClassName('container')
  .withStyles({
    element: { /* styles */ }
  });

if (asset) {
  container.withChild(asset);  // ✅ Works! Preserves element AND styles
}

return container.build();
```

**Why This Pattern?**

1. **Preserves Styles**: ElementBuilder's `.build()` method automatically handles `ElementModel` objects by extracting the element AND merging the styles (see ElementBuilder.ts lines 812-817)
2. **Type Safety**: Avoids type assertion hacks like `as any`
3. **Readability**: Clear and explicit conditional logic
4. **Maintainability**: Standard JavaScript patterns

### 5. ElementModel Children Handling

ElementBuilder automatically handles `ElementModel` objects passed to `.withChild()`:

```typescript
// From ElementBuilder.ts build() method:
} else if (isElementModel(child)) {
  // Handle ElementModel children - extract element and merge styles
  this.element.appendChild(child.element);
  if (child.styles) {
    childStyles.push(child.styles);  // ✅ Styles are preserved!
  }
}
```

This means passing the full `ElementModel` is correct - never extract just `.element` as that loses the styles.

## Table of Contents

1. [Common Patterns](#common-patterns)
2. [Pattern 1: Simple Element with Conditional Icon Injection](#pattern-1-simple-element-with-conditional-icon-injection)
3. [Pattern 2: Children Array with Dynamic Style Accumulation](#pattern-2-children-array-with-dynamic-style-accumulation)
4. [Pattern 3: Array Mapping with Animation](#pattern-3-array-mapping-with-animation)
5. [Pattern 4: Conditional Children Building](#pattern-4-conditional-children-building)
6. [Pattern 5: Complex State Management with Event Handlers](#pattern-5-complex-state-management-with-event-handlers)
7. [Pattern 6: Modal with Accessibility Features](#pattern-6-modal-with-accessibility-features)
8. [Pattern 7: Navigation with Keyboard Events](#pattern-7-navigation-with-keyboard-events)
9. [Pattern 8: Responsive Carousel with Adaptive Logic](#pattern-8-responsive-carousel-with-adaptive-logic)
10. [Pattern 9: Array Mapping with Icon Injection](#pattern-9-array-mapping-with-icon-injection)
11. [Pattern 10: Type Guards with Conditional Rendering](#pattern-10-type-guards-with-conditional-rendering)

---

## Common Patterns

### Pattern: Simple Element with Typography and Theme

```typescript
import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { theme } from '@universityofmaryland/web-utilities-library/theme';

const headline = new ElementBuilder(headlineElement)
  .styled(
    Styles.typography.campaign.compose('large', {
      theme: theme.fontColor(isThemeDark),
    }),
  )
  .withStyles({
    element: {
      textTransform: 'uppercase',
    },
  })
  .build();
```

### Pattern: Conditional Child with ElementModel

```typescript
const text = createText(props);  // Returns ElementModel<HTMLElement>
const asset = createAsset(props);  // Returns ElementModel<HTMLElement> | null

const container = new ElementBuilder()
  .withClassName('hero-container')
  .withChild(text);

// Add asset conditionally
if (asset) {
  container.withChild(asset);
}

return container.build();
```

### Pattern: Multiple Conditional Children

```typescript
const builder = new ElementBuilder()
  .withClassName('card')
  .withStyles({ /* base styles */ });

if (image) {
  builder.withChild(image);
}

if (headline) {
  builder.withChild(headline);
}

if (text) {
  builder.withChild(text);
}

return builder.build();
```

### Pattern: Array of ElementModel Children

```typescript
const children: ElementModel<HTMLElement>[] = items.map(item =>
  new ElementBuilder(item.element)
    .styled(Styles.typography.sans.fonts.medium)
    .build()
);

return new ElementBuilder()
  .withClassName('list')
  .withChildren(...children)  // Spread the array
  .build();
```

### Text Lockup Integration

Text lockup interfaces accept `ElementModel` for composite elements:

```typescript
interface TypeTextLockupLarge {
  headlineComposite?: ElementModel | null;  // Accepts ElementModel
  eyebrow?: HTMLElement | null;
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
}
```

The text lockup implementation extracts `.element` and adds `.styles`:

```typescript
if (headlineComposite) {
  container.withChild(headlineComposite.element);
}

// Later...
container.styles += headlineComposite.styles;
```

---

## Pattern 1: Simple Element with Conditional Icon Injection

**Use Case**: Creating action links with conditional icon injection based on attributes

**Source File**: `packages/elements/source/atomic/actions/text.ts`

### V1 Pattern (Before)

```typescript
import { ElementBuilder } from '@universityofmaryland/web-elements-library/v1';

function createElementWithStyle(
  actionFn: (props: ElementProps) => { element: HTMLElement; styles: string },
  props: ElementProps,
) {
  const result = actionFn({
    element: props.element,
    elementStyles: props.elementStyles,
  });
  return { element: result.element, styles: result.styles };
}

function createElement(type: ElementType, props: ElementProps) {
  createLinkIcon(props.element, type); // Modify element before styling

  const actions = {
    primary: { default: ElementBuilder.styled.actions.primary },
    secondary: { default: ElementBuilder.styled.actions.secondary },
  };

  const typeActions = actions[type] || actions.primary;

  if (props.isThemeGold && typeActions.gold) {
    return createElementWithStyle(typeActions.gold, props);
  }

  return createElementWithStyle(typeActions.default, props);
}
```

### V2 Pattern (After)

```typescript
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { actions } from '@universityofmaryland/web-builder-library/presets';
import * as Styles from '@universityofmaryland/web-styles-library';

function createElement(type: ElementType, props: ElementProps) {
  const { element, isThemeGold, isThemeDark, elementStyles } = props;

  // Apply icon modification before building
  createLinkIcon(element, type);

  // Select builder based on type
  let builder = actions.primary();

  if (type === 'secondary') {
    if (isThemeGold) {
      builder = actions.secondaryGold();
    } else if (isThemeDark) {
      builder = actions.secondaryWhite();
    } else {
      builder = actions.secondary();
    }
  } else if (type === 'outline') {
    builder = actions.outline();
  }

  // Build with custom styles
  return new ElementBuilder(element)
    .styled(builder.build().styles)
    .withStylesIf(!!elementStyles, elementStyles || {})
    .build();
}
```

**Key Changes**:
- Replace `ElementBuilder.styled.actions.X` with `actions.X()` from presets
- Use conditional builder selection before final build
- Use `withStylesIf()` for optional style overrides
- Eliminate wrapper function, apply builder directly

---

## Pattern 2: Children Array with Dynamic Style Accumulation

**Use Case**: Building composite elements with children array and accumulating styles

**Source File**: `packages/elements/source/atomic/events/meta.ts`

### V1 Pattern (Before)

```typescript
const MakeDetailItem = (props: {
  icon: string;
  text: string;
  isThemeDark?: boolean;
}) => {
  const { icon, text } = props;
  const container = ElementBuilder.styled.event.metaItem({
    element: document.createElement('p'),
    ...props,
  });

  const iconElement = document.createElement('span');
  const textElement = document.createElement('span');

  iconElement.innerHTML = icon;
  textElement.innerHTML = text;

  container.element.appendChild(iconElement);
  container.element.appendChild(textElement);

  return container;
};

export default (props: TypeMetaDisplay) => {
  const { location } = props;
  let wrapperChildren: ElementVisual[] = [];

  if (location && location.length > 0) {
    wrapperChildren.push(MakeDetailItem({...props, text: location[0].title}));
  }

  const wrapper = ElementBuilder.styled.event.metaWrapper({
    element: document.createElement('div'),
    children: wrapperChildren,
    ...props,
  });

  return ElementBuilder.styled.event.metaContainer({
    element: document.createElement('div'),
    children: [wrapper],
    ...props,
  });
};
```

### V2 Pattern (After)

```typescript
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as Styles from '@universityofmaryland/web-styles-library';
import { theme } from '@universityofmaryland/web-utilities-library/theme';

const MakeDetailItem = (props: {
  icon: string;
  text: string;
  isThemeDark?: boolean;
}) => {
  const { icon, text, isThemeDark } = props;

  // Create children with builder
  const iconElement = new ElementBuilder('span')
    .withHTML(icon)
    .build();

  const textElement = new ElementBuilder('span')
    .withHTML(text)
    .build();

  // Build container with children
  return new ElementBuilder('p')
    .styled(
      Styles.element.event.meta.composeItem({
        theme: theme.fontColor(isThemeDark),
      }),
    )
    .withChildren(iconElement.element, textElement.element)
    .build();
};

export default (props: TypeMetaDisplay) => {
  const { location, isThemeDark } = props;

  // Build wrapper with conditional children
  const wrapper = new ElementBuilder()
    .styled(Styles.element.event.meta.wrapper)
    .withChildIf(
      location && location.length > 0,
      () => MakeDetailItem({ ...props, text: location[0].title }).element
    )
    .build();

  // Build container
  return new ElementBuilder()
    .styled(Styles.element.event.meta.container)
    .withChild(wrapper.element)
    .build();
};
```

**Key Changes**:
- Replace imperative `appendChild()` with declarative `withChildren()`
- Use `withChildIf()` for conditional children
- Use `styled()` method with JSS objects from styles library
- Eliminate manual style accumulation - builder handles it automatically
- Build children first, then pass their `.element` to parent

---

## Pattern 3: Array Mapping with Animation

**Use Case**: Splitting text into words for staggered animations

**Source File**: `packages/elements/source/composite/quote/elements/quote.ts`

### V1 Pattern (Before)

```typescript
const splitWords = (quote: HTMLElement) => {
  const text = quote.textContent ?? '';
  const words = text.trim().split(/\s+/);

  const wordElements = words.map((word, index) => {
    const wordElement = document.createElement('div');
    wordElement.classList.add('quote-text-split-word');

    Object.assign(wordElement.style, {
      display: 'inline-block',
      whiteSpace: 'pre-wrap',
      opacity: '0',
      transform: 'translateY(20px)',
      transition: 'opacity 1s ease, transform 0.5s ease',
    });

    wordElement.textContent = word + (index < words.length - 1 ? ' ' : '');
    return wordElement;
  });

  return wordElements;
};

export default (props: QuoteProps) => {
  const { includesAnimation = false, quote, isSizeLarge } = props;
  const wordsList = splitWords(quote);
  let quoteTextElement: HTMLElement = quote;

  if (includesAnimation) {
    quoteTextElement = document.createElement('div');
    wordsList.map((word) => {
      quoteTextElement.appendChild(word);
    });
  }

  return ElementBuilder.create.element({
    element: quoteTextElement,
    className: 'quote-container-quote',
    elementStyles: {
      element: {
        position: 'relative',
        fontWeight: '700',
        ...(isSizeLarge && { ...typography.sans.extraLarge }),
      },
    },
  });
};
```

### V2 Pattern (After)

```typescript
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as Styles from '@universityofmaryland/web-styles-library';

const createAnimatedWord = (word: string, index: number, totalWords: number) => {
  const spacer = index < totalWords - 1 ? ' ' : '';

  return new ElementBuilder()
    .withClassName('quote-text-split-word')
    .withText(word + spacer)
    .withStyles({
      element: {
        display: 'inline-block',
        whiteSpace: 'pre-wrap',
        opacity: '0',
        transform: 'translateY(20px)',
        transition: 'opacity 1s ease, transform 0.5s ease',
      }
    })
    .build();
};

export default (props: QuoteProps) => {
  const { includesAnimation = false, quote, isSizeLarge, shouldHaveWhiteText } = props;
  const text = quote.textContent ?? '';
  const words = text.trim().split(/\s+/);

  let builder: ElementBuilder<HTMLElement>;

  if (includesAnimation) {
    // Map words to animated elements
    builder = new ElementBuilder()
      .withChildrenFrom(words, (word, index) =>
        createAnimatedWord(word, index, words.length).element
      );
  } else {
    builder = new ElementBuilder(quote);
  }

  return builder
    .withClassName('quote-container-quote')
    .withStyles({
      element: {
        position: 'relative',
        fontWeight: '700',
      }
    })
    .withStylesIf(isSizeLarge, Styles.typography.sans.extraLarge)
    .withStylesIf(shouldHaveWhiteText, {
      element: { color: Styles.token.color.white }
    })
    .build();
};
```

**Key Changes**:
- Use `withChildrenFrom()` for array mapping instead of manual `.map()` + `.appendChild()`
- Extract word element creation into separate function returning ElementModel
- Use `withStylesIf()` for conditional style application
- Replace inline style spreading with dedicated methods
- Build all words upfront, then compose into parent

---

## Pattern 4: Conditional Children Building

**Use Case**: Building complex element compositions with optional sections

**Source File**: `packages/elements/source/atomic/text-lockup/small.ts`

### V1 Pattern (Before)

```typescript
export const createTextLockupSmall = ({
  eyebrow,
  headline,
  text,
  actions,
  date,
  eventMeta,
  isThemeDark,
}: TypeTextLockupSmall) => {
  const children: UMDElement[] = [];

  if (eyebrow) {
    children.push(createEyebrow({ eyebrow, isThemeDark }));
  }

  if (headline) {
    children.push(
      ElementBuilder.styled.headline.sansLarger({
        element: headline,
        elementStyles: headlineStyles,
        isThemeDark,
      }),
    );
  }

  if (eventMeta) {
    children.push(eventMeta);
  }

  if (text) {
    children.push(
      ElementBuilder.styled.richText.simple({
        element: text,
        elementStyles: textStyles,
        isThemeDark,
      }),
    );
  }

  if (date) {
    children.push(
      ElementBuilder.styled.headline.sansMin({
        element: date,
        elementStyles: dateStyles,
        isThemeDark,
      }),
    );
  }

  if (actions) {
    children.push(createActions({ actions }));
  }

  return ElementBuilder.create.div({
    className: ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER,
    children,
    elementStyles: {
      element: {
        zIndex: '9',
        position: 'relative',
      },
    },
  });
};
```

### V2 Pattern (After)

```typescript
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as Styles from '@universityofmaryland/web-styles-library';
import { theme } from '@universityofmaryland/web-utilities-library/theme';

export const createTextLockupSmall = ({
  eyebrow,
  headline,
  text,
  actions,
  date,
  eventMeta,
  isThemeDark,
}: TypeTextLockupSmall) => {

  return new ElementBuilder()
    .withClassName(ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER)
    .withStyles({
      element: {
        zIndex: '9',
        position: 'relative',
      }
    })
    // Conditional children using withChildIf
    .withChildIf(
      !!eyebrow,
      () => createEyebrow({ eyebrow, isThemeDark }).element
    )
    .withChildIf(
      !!headline,
      () => new ElementBuilder(headline)
        .styled(
          Styles.typography.sans.compose('larger', {
            theme: theme.fontColor(isThemeDark),
          }),
        )
        .withStyles(headlineStyles)
        .build().element
    )
    .withChildIf(!!eventMeta, eventMeta)
    .withChildIf(
      !!text,
      () => new ElementBuilder(text)
        .styled(
          Styles.element.text.rich.composeSimple({
            theme: theme.fontColor(isThemeDark),
          }),
        )
        .withStyles(textStyles)
        .build().element
    )
    .withChildIf(
      !!date,
      () => new ElementBuilder(date)
        .styled(
          Styles.typography.sans.compose('min', {
            theme: theme.fontColor(isThemeDark),
          }),
        )
        .withStyles(dateStyles)
        .build().element
    )
    .withChildIf(
      !!actions,
      () => createActions({ actions }).element
    )
    .build();
};
```

**Key Changes**:
- Replace manual children array building with chained `withChildIf()` calls
- Use lambda functions in `withChildIf()` for lazy evaluation
- Use `.build().element` when only element is needed
- Eliminate imperative children.push() pattern
- Apply theme once at container level, or per-child as needed

---

## Pattern 5: Complex State Management with Event Handlers

**Use Case**: Carousel with complex event handling and animations

**Source File**: `packages/elements/source/composite/carousel/elements/image.ts`

### V1 Pattern (Before)

```typescript
export default (props: TypeCarouselImageProps) =>
  (() => {
    const { slides, callback, maxHeight } = props;
    const container = document.createElement('div');
    const slider = document.createElement('div');
    let activeIndex = 0;

    const EventSlide = ({ forward = true }: { forward?: boolean }) => {
      SlideActiveSlide({ slide: slides[activeIndex], isRight: forward });

      if (forward) {
        activeIndex = activeIndex + 1;
        if (activeIndex >= slides.length) activeIndex = 0;
      } else {
        activeIndex = activeIndex - 1;
        if (activeIndex < 0) activeIndex = slides.length - 1;
      }

      SlideUpcomingSlide({ slide: slides[activeIndex], isRight: forward });
      SetCarouselSize({
        slider,
        activeSlide: slides[activeIndex],
        transition: true,
        maxHeight,
      });
      if (callback) callback(activeIndex);
    };

    slider.classList.add(ELEMENT_CAROUSEL_CONTAINER);
    slides.forEach((slide) => slide.classList.add(ELEMENT_CAROUSEL_SLIDE));
    slider.append(...slides);
    slider.appendChild(CreateButton({ EventSlide, isRight: false }));
    slider.appendChild(CreateButton({ EventSlide, isRight: true }));

    container.classList.add(ELEMENT_CAROUSEL_DECLARATION);
    container.appendChild(slider);

    window.addEventListener('resize', debounce(EventResize, 10));
    EventSwipe();

    return {
      element: container,
      styles: STYLES_CAROUSEL_IMAGE_ELEMENT,
      events: { Load, EventSlide, EventResize },
    };
  })();
```

### V2 Pattern (After)

```typescript
import { ElementBuilder } from '@universityofmaryland/web-builder-library';

export default (props: TypeCarouselImageProps) =>
  (() => {
    const { slides, callback, maxHeight } = props;
    let activeIndex = 0;

    const EventSlide = ({ forward = true }: { forward?: boolean }) => {
      SlideActiveSlide({ slide: slides[activeIndex], isRight: forward });

      if (forward) {
        activeIndex = activeIndex + 1;
        if (activeIndex >= slides.length) activeIndex = 0;
      } else {
        activeIndex = activeIndex - 1;
        if (activeIndex < 0) activeIndex = slides.length - 1;
      }

      SlideUpcomingSlide({ slide: slides[activeIndex], isRight: forward });
      SetCarouselSize({
        slider: model.element.querySelector(`.${ELEMENT_CAROUSEL_CONTAINER}`),
        activeSlide: slides[activeIndex],
        transition: true,
        maxHeight,
      });
      if (callback) callback(activeIndex);
    };

    // Build slider with slides and buttons
    const slider = new ElementBuilder()
      .withClassName(ELEMENT_CAROUSEL_CONTAINER)
      .withModifier((el) => {
        // Add slide classes
        slides.forEach((slide) => slide.classList.add(ELEMENT_CAROUSEL_SLIDE));
        // Append all slides
        el.append(...slides);
      })
      .withChild(CreateButton({ EventSlide, isRight: false }))
      .withChild(CreateButton({ EventSlide, isRight: true }))
      .build();

    // Build container
    const model = new ElementBuilder()
      .withClassName(ELEMENT_CAROUSEL_DECLARATION)
      .withChild(slider.element)
      .build();

    // Setup event listeners
    window.addEventListener('resize', debounce(EventResize, 10));
    EventSwipe();

    return {
      element: model.element,
      styles: STYLES_CAROUSEL_IMAGE_ELEMENT + slider.styles,
      events: { Load, EventSlide, EventResize },
    };
  })();
```

**Key Changes**:
- Use `withModifier()` for imperative DOM operations that can't be declarative
- Build nested structure (slider → container) then reference in closure
- Concatenate styles from multiple builders
- Keep IIFE pattern for state encapsulation
- Use `.querySelector()` on built element for post-build references

---

## Pattern 6: Modal with Accessibility Features

**Use Case**: Fixed-position modal with ARIA attributes and focus trapping

**Source File**: `packages/elements/source/atomic/layout/overlay/modal.ts`

### V1 Pattern (Before)

```typescript
export const createModal = ({
  content,
  callback,
  isHidden,
  context,
}: TypeFixedFullScreenProps) => {
  const body = document.body;
  const html = document.documentElement;
  const container = document.createElement('div');
  const background = document.createElement('div');
  let eventReference: any = null;
  let accessibiltyEventReference: any = null;

  const show = () => {
    container.style.display = 'block';
    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';

    eventReference = container.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target === container) hide();
    });

    accessibiltyEventReference = trapFocus({
      element: container,
      action: hide,
      shadowDomContext: context || null,
    });

    setTimeout(() => {
      if (content) content.focus();
    }, 100);
  };

  const hide = () => {
    body.style.overflow = 'visible';
    html.style.overflow = 'visible';
    container.style.display = 'none';

    if (accessibiltyEventReference) accessibiltyEventReference();
    if (eventReference)
      eventReference.removeEventListener('click', () => hide());

    setTimeout(() => {
      if (context) {
        const firstItem = context.querySelector('button, a') as HTMLElement;
        firstItem?.focus();
      }
    }, 100);
  };

  background.classList.add(ELEMENT_CONTAINER_BACKGROUND);
  if (content) background.appendChild(content);

  container.classList.add(ELEMENT_CONTAINER);
  container.appendChild(background);
  if (isHidden) container.style.display = 'none';

  return {
    element: container,
    styles: STYLES_MODAL,
    events: { show, hide },
  };
};
```

### V2 Pattern (After)

```typescript
import { ElementBuilder } from '@universityofmaryland/web-builder-library';

export const createModal = ({
  content,
  callback,
  isHidden,
  context,
}: TypeFixedFullScreenProps) => {
  const body = document.body;
  const html = document.documentElement;
  let eventReference: any = null;
  let accessibiltyEventReference: any = null;

  // Build background with content
  const background = new ElementBuilder()
    .withClassName(ELEMENT_CONTAINER_BACKGROUND)
    .withChildIf(!!content, content)
    .build();

  // Build container with event handlers and ARIA
  const model = new ElementBuilder()
    .withClassName(ELEMENT_CONTAINER)
    .withChild(background.element)
    .withData({ hidden: isHidden })
    .withRole('dialog')
    .withAria({ label: 'Modal dialog', modal: 'true' })
    .withAttribute('tabindex', '-1')
    .withModifier((el) => {
      if (isHidden) el.style.display = 'none';
    })
    .build();

  const show = () => {
    model.element.style.display = 'block';
    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';

    eventReference = model.element.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target === model.element) hide();
    });

    accessibiltyEventReference = trapFocus({
      element: model.element,
      action: hide,
      shadowDomContext: context || null,
    });

    setTimeout(() => {
      if (content) content.focus();
    }, 100);
  };

  const hide = () => {
    body.style.overflow = 'visible';
    html.style.overflow = 'visible';
    model.element.style.display = 'none';

    if (accessibiltyEventReference) accessibiltyEventReference();
    if (eventReference)
      eventReference.removeEventListener('click', () => hide());

    setTimeout(() => {
      if (context) {
        const firstItem = context.querySelector('button, a') as HTMLElement;
        firstItem?.focus();
      }
    }, 100);
  };

  return {
    element: model.element,
    styles: STYLES_MODAL + background.styles,
    events: { show, hide },
  };
};
```

**Key Changes**:
- Use ARIA convenience methods: `role()`, `ariaLabel()`, `ariaModal()`, `focusable()`
- Use `withData()` for data attributes
- Replace imperative child appending with `withChildIf()`
- Reference `model.element` in event handlers after build
- Concatenate styles from nested builders

---

## Pattern 7: Navigation with Keyboard Events

**Use Case**: Navigation drawer with nested queries and keyboard handling

**Source File**: `packages/elements/source/composite/navigation/elements/drawer/index.ts`

### V1 Pattern (Before)

```typescript
const CreateNavDrawerElement = (props: TypeNavDrawerRequirements) =>
  (() => {
    const { context, primarySlideLinks } = props;
    const body = document.querySelector('body') as HTMLBodyElement;
    const elementContainer = document.createElement('div');

    if (!primarySlideLinks) return null;

    const eventClose = () => {
      const bodyOverlay = elementContainer.querySelector(
        `.${ELEMENT_NAV_DRAWER_OVERLAY}`,
      ) as HTMLDivElement;
      const bodyOverlayWrapper = bodyOverlay.querySelector(
        `.${ELEMENT_NAV_DRAWER_OVERLAY_WRAPPER}`,
      ) as HTMLDivElement;

      bodyOverlay.style.opacity = '0';
      bodyOverlayWrapper.style.transform = 'translateX(-100%)';

      setTimeout(() => {
        bodyOverlay.removeAttribute('style');
        bodyOverlayWrapper.removeAttribute('style');
        body.style.overflow = 'auto';
        elementContainer.style.display = 'none';
      }, ANIMATION_TIME + 100);
    };

    const eventOpen = () => {
      const bodyOverlay = elementContainer.querySelector(
        `.${ELEMENT_NAV_DRAWER_OVERLAY}`,
      ) as HTMLDivElement;
      const bodyOverlayWrapper = bodyOverlay.querySelector(
        `.${ELEMENT_NAV_DRAWER_OVERLAY_WRAPPER}`,
      ) as HTMLDivElement;
      const closeButton = bodyOverlayWrapper.querySelector(
        `.${ELEMENT_NAV_DRAWER_CLOSE_BUTTON}`,
      ) as HTMLButtonElement;

      elementContainer.style.display = 'block';
      setTimeout(() => {
        bodyOverlay.style.opacity = '1';
        bodyOverlayWrapper.style.transform = 'translateX(0)';
        body.style.overflow = 'hidden';
        closeButton.focus();

        handleKeyboardNavigation({
          element: elementContainer,
          action: () => eventClose(),
          shadowDomContext: context,
        });
      }, 100);
    };

    const children = CreateNavDrawerContainer({
      ...props,
      eventOpen,
      eventClose,
    });

    elementContainer.classList.add(ELEMENT_NAV_DRAWER_CONTAINER);
    elementContainer.appendChild(children);

    return {
      element: elementContainer,
      events: { eventOpen },
    };
  })();
```

### V2 Pattern (After)

```typescript
import { ElementBuilder } from '@universityofmaryland/web-builder-library';

const CreateNavDrawerElement = (props: TypeNavDrawerRequirements) =>
  (() => {
    const { context, primarySlideLinks } = props;
    const body = document.querySelector('body') as HTMLBodyElement;

    if (!primarySlideLinks) return null;

    // Event handlers will reference model.element after build
    let model: any;

    const eventClose = () => {
      const bodyOverlay = model.element.querySelector(
        `.${ELEMENT_NAV_DRAWER_OVERLAY}`,
      ) as HTMLDivElement;
      const bodyOverlayWrapper = bodyOverlay.querySelector(
        `.${ELEMENT_NAV_DRAWER_OVERLAY_WRAPPER}`,
      ) as HTMLDivElement;

      bodyOverlay.style.opacity = '0';
      bodyOverlayWrapper.style.transform = 'translateX(-100%)';

      setTimeout(() => {
        bodyOverlay.removeAttribute('style');
        bodyOverlayWrapper.removeAttribute('style');
        body.style.overflow = 'auto';
        model.element.style.display = 'none';
      }, ANIMATION_TIME + 100);
    };

    const eventOpen = () => {
      const bodyOverlay = model.element.querySelector(
        `.${ELEMENT_NAV_DRAWER_OVERLAY}`,
      ) as HTMLDivElement;
      const bodyOverlayWrapper = bodyOverlay.querySelector(
        `.${ELEMENT_NAV_DRAWER_OVERLAY_WRAPPER}`,
      ) as HTMLDivElement;
      const closeButton = bodyOverlayWrapper.querySelector(
        `.${ELEMENT_NAV_DRAWER_CLOSE_BUTTON}`,
      ) as HTMLButtonElement;

      model.element.style.display = 'block';
      setTimeout(() => {
        bodyOverlay.style.opacity = '1';
        bodyOverlayWrapper.style.transform = 'translateX(0)';
        body.style.overflow = 'hidden';
        closeButton.focus();

        handleKeyboardNavigation({
          element: model.element,
          action: () => eventClose(),
          shadowDomContext: context,
        });
      }, 100);
    };

    const children = CreateNavDrawerContainer({
      ...props,
      eventOpen,
      eventClose,
    });

    // Build element
    model = new ElementBuilder()
      .withClassName(ELEMENT_NAV_DRAWER_CONTAINER)
      .withChild(children)
      .withRole('navigation')
      .withAria({ label: 'Main navigation drawer' })
      .build();

    return {
      element: model.element,
      events: { eventOpen },
    };
  })();
```

**Key Changes**:
- Declare `model` variable before event handler definitions
- Reference `model.element` in event handlers (closures)
- Add ARIA attributes with convenience methods
- Eliminate manual DOM construction
- Keep IIFE pattern for closure scope

---

## Pattern 8: Responsive Carousel with Adaptive Logic

**Use Case**: Complex carousel with responsive breakpoints and view calculations

**Source File**: `packages/elements/source/composite/carousel/elements/blocks.ts`

### V1 Pattern (Before)

```typescript
const CreateCarouselCardsElement = (props: TypeAnimationCarouselBlockProps) =>
  (() => {
    const { slide, shadowRef, blocks, overwriteDisplayLogic } = props;
    const declaration = document.createElement('div');

    const displayLogic: TypeDisplayLogic = {
      mobileBreakpoint: 550,
      tabletBreakpoint: 768,
      desktopBreakpoint: 1000,
      mobileCount: 1,
      tabletCount: 2,
      desktopCount: 3,
      maxCount: 4,
      blockGap: parsePixelValue(token.spacing.lg),
      hasRightButton: true,
      hasLeftButton: true,
      showMobileHint: true,
      showHint: true,
    };

    const GetViewOptions = {
      isMobileView: () => {
        return GetSizes.containerWidth() <= displayLogic.mobileBreakpoint;
      },
      isTabletView: () => {
        return (
          GetSizes.containerWidth() > displayLogic.mobileBreakpoint &&
          GetSizes.containerWidth() <= displayLogic.tabletBreakpoint
        );
      },
      showCount: () => {
        const isMobile = GetViewOptions.isMobileView();
        const isTablet = GetViewOptions.isTabletView();
        let count = 1;

        if (isMobile) count = displayLogic.mobileCount;
        if (isTablet) count = displayLogic.tabletCount;

        return count;
      },
    };

    const Event = {
      helpers: { displayLogic, GetElements, GetViewOptions, GetSizes, SetLayout },
      resize: () => {
        const count = GetViewOptions.showCount();
        SetLayout.blockWidth();
        SetLayout.blockDisplay({ count });
        SetLayout.carouselWidth({ count });
        ButtonDisplay({ ...Event.helpers });
      },
      load: () => {
        slide.style.display = 'flex';
        slide.style.gap = `${displayLogic.blockGap}px`;
        Event.resize();
        EventSwipe({ ...Event.helpers });
      },
    };

    declaration.classList.add(ELEMENT_CAROUSEL_DECLARATION);
    declaration.appendChild(slide);

    window.addEventListener('resize', debounce(Event.resize, 30));

    return {
      element: declaration,
      events: { resize: Event.resize, load: Event.load },
    };
  })();
```

### V2 Pattern (After)

```typescript
import { ElementBuilder } from '@universityofmaryland/web-builder-library';

const CreateCarouselCardsElement = (props: TypeAnimationCarouselBlockProps) =>
  (() => {
    const { slide, shadowRef, blocks, overwriteDisplayLogic } = props;

    const displayLogic: TypeDisplayLogic = {
      mobileBreakpoint: 550,
      tabletBreakpoint: 768,
      desktopBreakpoint: 1000,
      mobileCount: 1,
      tabletCount: 2,
      desktopCount: 3,
      maxCount: 4,
      blockGap: parsePixelValue(token.spacing.lg),
      hasRightButton: true,
      hasLeftButton: true,
      showMobileHint: true,
      showHint: true,
    };

    const GetViewOptions = {
      isMobileView: () => {
        return GetSizes.containerWidth() <= displayLogic.mobileBreakpoint;
      },
      isTabletView: () => {
        return (
          GetSizes.containerWidth() > displayLogic.mobileBreakpoint &&
          GetSizes.containerWidth() <= displayLogic.tabletBreakpoint
        );
      },
      showCount: () => {
        const isMobile = GetViewOptions.isMobileView();
        const isTablet = GetViewOptions.isTabletView();
        let count = 1;

        if (isMobile) count = displayLogic.mobileCount;
        if (isTablet) count = displayLogic.tabletCount;

        return count;
      },
    };

    // Build carousel with responsive behavior
    const model = new ElementBuilder()
      .withClassName(ELEMENT_CAROUSEL_DECLARATION)
      .withChild(slide)
      .withData({
        breakpoint: displayLogic.mobileBreakpoint,
        count: displayLogic.mobileCount
      })
      .withModifier((el) => {
        slide.style.display = 'flex';
        slide.style.gap = `${displayLogic.blockGap}px`;
      })
      .build();

    const Event = {
      helpers: { displayLogic, GetElements, GetViewOptions, GetSizes, SetLayout },
      resize: () => {
        const count = GetViewOptions.showCount();
        SetLayout.blockWidth();
        SetLayout.blockDisplay({ count });
        SetLayout.carouselWidth({ count });
        ButtonDisplay({ ...Event.helpers });
      },
      load: () => {
        Event.resize();
        EventSwipe({ ...Event.helpers });
      },
    };

    window.addEventListener('resize', debounce(Event.resize, 30));

    return {
      element: model.element,
      events: { resize: Event.resize, load: Event.load },
    };
  })();
```

**Key Changes**:
- Use `withData()` to store responsive metadata on element
- Use `withModifier()` for initial style setup that can't be declarative
- Keep responsive logic in closure for reference
- Reference `model.element` in event handlers
- Maintain IIFE pattern for state encapsulation

---

## Pattern 9: Array Mapping with Icon Injection

**Use Case**: Mapping social links array to styled elements with icon injection

**Source File**: `packages/elements/source/composite/footer/elements/main-section/social.ts`

### V1 Pattern (Before)

```typescript
const GetSocialIcon = ({ link }: { link: HTMLAnchorElement }) => {
  const url = link.getAttribute('href') || null;
  if (!url) return link;

  if (url.match(/facebook.com/)) link.innerHTML = iconFacebook;
  if (url.match(/x.com/)) link.innerHTML = iconX;
  if (url.match(/instagram.com/)) link.innerHTML = iconInstagram;

  return link;
};

const CreateSocialRow = (props: SocialProps): ElementVisual => {
  const { isThemeLight, slotSocialLinks } = props;
  let socialLinks: HTMLAnchorElement[] = [];

  if (slotSocialLinks) {
    const socialLinksClone = slotSocialLinks.cloneNode(true) as HTMLSlotElement;
    socialLinks = Array.from(
      socialLinksClone.querySelectorAll('a'),
    ) as HTMLAnchorElement[];
  }

  const socialLinkChildren = socialLinks.map((link) =>
    ElementBuilder.create.element({
      element: GetSocialIcon({ link }),
      className: 'umd-footer-social-link',
      elementStyles: {
        element: {
          backgroundColor: token.color.gray.darker,
          height: '32px',
          width: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color .5s',

          ['& > *, & path']: {
            fill: `${token.color.white} !important`,
          },

          ['&:hover']: {
            backgroundColor: token.color.gray.light,
          },

          ...(isThemeLight && {
            backgroundColor: token.color.gray.light,
            ['&:hover']: {
              backgroundColor: token.color.gray.dark,
            },
          }),
        },
      },
    }),
  );

  const gridColumns = Math.min(socialLinks.length, 3);
  const linksWrapper = ElementBuilder.create.div({
    className: 'umd-footer-social-container_wrapper',
    children: socialLinkChildren,
    elementStyles: {
      element: {
        display: 'grid',
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
        gridGap: token.spacing.xs,
      },
    },
  });

  return container;
};
```

### V2 Pattern (After)

```typescript
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-styles-library/token';

const getSocialIcon = (url: string | null): string => {
  if (!url) return '';
  if (url.match(/facebook.com/)) return iconFacebook;
  if (url.match(/x.com/)) return iconX;
  if (url.match(/instagram.com/)) return iconInstagram;
  // ... more icons
  return '';
};

const CreateSocialRow = (props: SocialProps): ElementVisual => {
  const { isThemeLight, slotSocialLinks } = props;
  let socialLinks: HTMLAnchorElement[] = [];

  if (slotSocialLinks) {
    const socialLinksClone = slotSocialLinks.cloneNode(true) as HTMLSlotElement;
    socialLinks = Array.from(
      socialLinksClone.querySelectorAll('a'),
    ) as HTMLAnchorElement[];
  }

  const gridColumns = Math.min(socialLinks.length, 3);

  // Build wrapper with mapped children
  const linksWrapper = new ElementBuilder()
    .withClassName('umd-footer-social-container_wrapper')
    .withStyles({
      element: {
        display: 'grid',
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
        gridGap: token.spacing.xs,
      }
    })
    .withChildrenFrom(socialLinks, (link) => {
      const url = link.getAttribute('href');
      const icon = getSocialIcon(url);

      return new ElementBuilder(link)
        .withClassName('umd-footer-social-link')
        .withHTML(icon)
        .withStyles({
          element: {
            backgroundColor: token.color.gray.darker,
            height: '32px',
            width: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color .5s',

            ['& > *, & path']: {
              fill: `${token.color.white} !important`,
            },

            ['&:hover']: {
              backgroundColor: token.color.gray.light,
            },
          }
        })
        .withStylesIf(isThemeLight, {
          element: {
            backgroundColor: token.color.gray.light,
            ['&:hover']: {
              backgroundColor: token.color.gray.dark,
            },
          }
        })
        .build().element;
    })
    .build();

  return container;
};
```

**Key Changes**:
- Extract icon logic to pure function returning string (not modifying element)
- Use `withChildrenFrom()` for array mapping
- Use `withHTML()` to inject icon after element creation
- Use `withStylesIf()` for conditional theme styles
- Use `.build().element` in mapper for convenience
- Eliminate manual `.map()` + children array pattern

---

## Pattern 10: Type Guards with Conditional Rendering

**Use Case**: Element creation with type guards and conditional asset embedding

**Source File**: `packages/elements/source/atomic/assets/image/background.ts`

### V1 Pattern (Before)

```typescript
const isImageElement = (element: HTMLElement): element is HTMLImageElement => {
  return element instanceof HTMLImageElement;
};

const checkIsGif = (element: HTMLImageElement | HTMLAnchorElement): boolean => {
  if (isImageElement(element)) {
    return element.src !== null && element.src.toLowerCase().includes('.gif');
  }

  if (element instanceof HTMLAnchorElement) {
    const imgChild = element.querySelector('img');
    return imgChild !== null && imgChild.src?.toLowerCase().includes('.gif');
  }

  return false;
};

const createCaption = (
  element: HTMLImageElement | HTMLAnchorElement,
  isShowCaption: boolean,
): UMDElement | null => {
  if (!isShowCaption) return null;

  const attributeCaption = element.getAttribute(ATTRIBUTE_CAPTION);
  const text = attributeCaption || element.getAttribute(ATTRIBUTE_CREDIT);
  if (!text) return null;

  const caption = document.createElement('span');
  caption.textContent = text;

  return ElementBuilder.styled.assets.imageCaption({
    element: caption,
  });
};

export default (props: Props) => {
  const {
    customStyles,
    dateSign,
    element,
    isAspectStandard = false,
    isScaled,
    isShowCaption = false,
    isGifAllowed = false,
  } = props;

  const asset = embedAsset({ element, isAspectStandard, isGifAllowed });
  const caption = createCaption(element, isShowCaption);
  const children: UMDElement[] = [];

  if (caption) {
    children.push(caption);
  }

  if (dateSign) {
    children.push(
      ElementBuilder.styled.layout.backgroundBoxWhite({
        element: document.createElement('div'),
        children: [dateSign],
      }),
    );
  }

  if (asset) {
    children.push(asset);
  }

  return ElementBuilder.styled.assets.imageWrapper({
    element: document.createElement('div'),
    children,
    isScaled,
    elementStyles: {
      element: {
        ...customStyles,
      },
    },
  });
};
```

### V2 Pattern (After)

```typescript
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as Styles from '@universityofmaryland/web-styles-library';

const isImageElement = (element: HTMLElement): element is HTMLImageElement => {
  return element instanceof HTMLImageElement;
};

const checkIsGif = (element: HTMLImageElement | HTMLAnchorElement): boolean => {
  if (isImageElement(element)) {
    return element.src !== null && element.src.toLowerCase().includes('.gif');
  }

  if (element instanceof HTMLAnchorElement) {
    const imgChild = element.querySelector('img');
    return imgChild !== null && imgChild.src?.toLowerCase().includes('.gif');
  }

  return false;
};

const createCaption = (
  element: HTMLImageElement | HTMLAnchorElement,
  isShowCaption: boolean,
) => {
  if (!isShowCaption) return null;

  const attributeCaption = element.getAttribute(ATTRIBUTE_CAPTION);
  const text = attributeCaption || element.getAttribute(ATTRIBUTE_CREDIT);
  if (!text) return null;

  return new ElementBuilder('span')
    .withText(text)
    .styled(Styles.element.asset.image.caption)
    .build();
};

export default (props: Props) => {
  const {
    customStyles,
    dateSign,
    element,
    isAspectStandard = false,
    isScaled,
    isShowCaption = false,
    isGifAllowed = false,
  } = props;

  const asset = embedAsset({ element, isAspectStandard, isGifAllowed });
  const caption = createCaption(element, isShowCaption);

  return new ElementBuilder()
    .styled(Styles.element.asset.image.wrapper)
    .withData({ scaled: isScaled })
    .withStyles({
      element: {
        ...customStyles,
      }
    })
    // Conditional children with null safety
    .withChildIf(!!caption, () => caption!.element)
    .withChildIf(!!dateSign, () => {
      return new ElementBuilder()
        .styled(Styles.layout.backgroundBoxWhite)
        .withChild(dateSign)
        .build().element;
    })
    .withChildIf(!!asset, asset)
    .build();
};
```

**Key Changes**:
- Keep type guards (they're good TypeScript practice)
- Use `withChildIf()` for conditional children (no array building)
- Use lambda with null assertion operator `!` when TypeScript needs help
- Build caption inline, return ElementModel
- Use `withData()` for metadata storage
- Chain all conditional children directly on builder

---

## Common Migration Patterns Summary

### 1. **Replace Imperative with Declarative**

**Before**:
```typescript
const element = document.createElement('div');
element.classList.add('my-class');
element.appendChild(child);
```

**After**:
```typescript
new ElementBuilder()
  .withClassName('my-class')
  .withChild(child)
  .build();
```

### 2. **Children Array Building**

**Before**:
```typescript
const children: any[] = [];
if (condition1) children.push(child1);
if (condition2) children.push(child2);
```

**After**:
```typescript
builder
  .withChildIf(condition1, child1)
  .withChildIf(condition2, child2)
```

### 3. **Array Mapping**

**Before**:
```typescript
const elements = items.map(item => {
  const el = document.createElement('div');
  el.textContent = item.text;
  return el;
});
elements.forEach(el => parent.appendChild(el));
```

**After**:
```typescript
builder.withChildrenFrom(items, (item) =>
  new ElementBuilder().withText(item.text).build().element
)
```

### 4. **Conditional Styling**

**Before**:
```typescript
const styles = {
  element: {
    color: 'black',
    ...(isDark && { color: 'white' }),
  }
};
```

**After**:
```typescript
builder
  .withStyles({ element: { color: 'black' } })
  .withStylesIf(isDark, { element: { color: 'white' } })
```

### 5. **Preset Usage**

**Before**:
```typescript
ElementBuilder.styled.actions.primary({
  element: myElement,
  ...props
})
```

**After**:
```typescript
import { actions } from '@universityofmaryland/web-builder-library/presets';

actions.primary()
  .withChild(myElement)
  .build()
```

### 6. **Style Concatenation**

**Before**:
```typescript
const styles = parent.styles + child1.styles + child2.styles;
```

**After**:
```typescript
// Automatic - builder handles child style accumulation
const model = builder.withChildren(child1, child2).build();
// model.styles includes all child styles
```

### 7. **ARIA and Accessibility**

**Before**:
```typescript
element.setAttribute('role', 'button');
element.setAttribute('aria-label', 'Close');
element.setAttribute('tabindex', '0');
```

**After**:
```typescript
builder
  .withRole('button')
  .withAria({ label: 'Close' })
  .withAttribute('tabindex', '0')
```

### 8. **Event Handlers in Closures**

**Before**:
```typescript
const element = document.createElement('div');
const handler = () => {
  element.style.display = 'none';
};
```

**After**:
```typescript
let model: any;
const handler = () => {
  model.element.style.display = 'none';
};
model = builder.build();
```

### 9. **Theme Application**

**Before**:
```typescript
ElementBuilder.create.element({
  element,
  isThemeDark: true,
})
```

**After**:
```typescript
import { theme } from '@universityofmaryland/web-utilities-library/theme';

new ElementBuilder(element)
  .styled(
    Styles.typography.sans.compose('large', {
      theme: theme.fontColor(isThemeDark),
    }),
  )
  .build()
```

### 10. **Imperative DOM Operations**

**Before**:
```typescript
element.style.display = 'flex';
element.style.gap = '20px';
```

**After**:
```typescript
builder.withModifier((el) => {
  el.style.display = 'flex';
  el.style.gap = '20px';
})
```

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Extracting .element from ElementModel

```typescript
// ❌ WRONG - Loses styles!
container.withChild(asset.element);

// ✅ CORRECT - Preserves styles
container.withChild(asset);
```

### ❌ Mistake 2: Using .withChildIf() with ElementModel

```typescript
// ❌ WRONG - Type error
.withChildIf(!!asset, asset!)

// ✅ CORRECT - Imperative conditional
if (asset) {
  container.withChild(asset);
}
```

### ❌ Mistake 3: Missing Generic Type Parameter

```typescript
// ❌ WRONG - Defaults to HTMLElement | DocumentFragment
const createAsset = (): ElementModel | null => { }

// ✅ CORRECT - Explicit HTMLElement
const createAsset = (): ElementModel<HTMLElement> | null => { }
```

### ❌ Mistake 4: Using Old Font Paths

```typescript
// ❌ WRONG
.styled(Styles.typography.sans.campaignLarge)

// ✅ CORRECT
.styled(Styles.typography.campaign.fonts.large)
```

---

## Migration Checklist

When migrating a component to V2 ElementBuilder:

- [ ] Update ElementBuilder import to named import with `new` constructor
- [ ] Update campaign font paths from `sans.campaign*` to `campaign.fonts.*`
- [ ] Add `ElementModel<HTMLElement>` return type annotations to builder functions
- [ ] Replace `.withChildIf()` with imperative conditionals for ElementModel children
- [ ] Verify ElementModel objects are passed whole (not just `.element`)
- [ ] Update array returns to `ElementModel<HTMLElement>[]`
- [ ] Test that styles are preserved for all children

### Original Checklist Items

- [ ] Replace `ElementBuilder.styled.X` with preset imports
- [ ] Replace `ElementBuilder.create.X` with `new ElementBuilder()`
- [ ] Convert children arrays to `withChildIf()` chains
- [ ] Convert `.map()` loops to `withChildrenFrom()`
- [ ] Add ARIA attributes with convenience methods
- [ ] Import theme utility: `import { theme } from '@universityofmaryland/web-utilities-library/theme';`
- [ ] Use compose functions with `theme: theme.fontColor(isThemeDark)` instead of `.withThemeDark()`
- [ ] Use `withStylesIf()` for conditional styles
- [ ] Use `styled()` method for JSS objects with compose functions
- [ ] Update closure references to use `model.element`
- [ ] Concatenate child styles if needed
- [ ] Use `.build().element` when only element is needed
- [ ] Add `withModifier()` for imperative operations
- [ ] Test that all styles are applied correctly
- [ ] Verify event handlers still work
- [ ] Check accessibility features

---

## Known Issues and Solutions

### Issue 1: Heavy Nesting Pattern

**Problem**: Some migrations created deeply nested chaining that reduces readability, especially with conditional children.

**Example of Problem Pattern**:
```typescript
// ❌ WRONG - Deeply nested
return new ElementBuilder()
  .withClassName('container')
  .withChildIf(
    !!eyebrow,
    () => new ElementBuilder(eyebrow)
      .styled(Styles.typography.sans.small)
      .withStyles({ element: { textTransform: 'uppercase' } })
      .withChildIf(
        !!innerChild,
        () => new ElementBuilder(innerChild)
          .withStyles({ element: { margin: '10px' } })
          .build().element
      )
      .build().element
  )
  .build();
```

**Solution Pattern**: Build container first, conditionally add children with `.withChild()`, then `.build()` at end.

**Reference File**: `/Users/magnessjo/umd/design-system/packages/elements/source/atomic/text-lockup/large.ts`

**Example of Correct Pattern**:
```typescript
import { theme } from '@universityofmaryland/web-utilities-library/theme';

// ✅ CORRECT - Build container, conditionally add children, build at end
const container = new ElementBuilder()
  .withClassName('text-lockup-large')
  .withStyles({
    element: {
      zIndex: '9',
      position: 'relative',
      ...additionalStyles,
    },
  });

if (eyebrow) {
  const eyebrowElement = new ElementBuilder(eyebrow)
    .styled(
      Styles.typography.sans.compose('small', {
        theme: theme.fontColor(isThemeDark),
      }),
    )
    .withStyles({
      element: {
        textTransform: 'uppercase',
        fontWeight: 600,
      },
      siblingAfter: {
        marginTop: token.spacing.sm,
      },
    })
    .build().element;

  container.withChild(eyebrowElement);
}

if (ribbon) {
  const ribbonElement = new ElementBuilder(ribbon)
    .styled(Styles.element.text.decoration.ribbon)
    .withStyles({
      siblingAfter: {
        marginTop: token.spacing.sm,
      },
    })
    .build().element;

  container.withChild(ribbonElement);
}

// More conditional children...

return container.build();
```

**Benefits**:
- Reduced nesting depth
- Easier to read and maintain
- Clear separation of child creation and parent building
- Allows for complex conditional logic without chaining hell

**Action Required**: Review all converted files for heavy nesting and refactor using this pattern.

---

### Issue 2: Conditional Style Switching

**Problem**: Need consistent approach for handling boolean conditionals (like `isScaled`, `isThemeDark`) that switch between different style objects.

**V1 Pattern (Old Approach)**:

In V1, the builder package had `ElementBuilder.styled.X` with built-in conditional logic:

```typescript
// V1 - Builder handled conditional style selection
export const imageWrapper = (props: ImageWrapperProps) => {
  const { isScaled } = props;

  if (isScaled) {
    return createStyledElement(props, Styles.element.asset.image.wrapperScaled);
  }

  return createStyledElement(props, Styles.element.asset.image.wrapper);
};
```

**Current V2 Pattern (In Elements Package)**:

Reference File: `/Users/magnessjo/umd/design-system/packages/elements/source/atomic/assets/image/background.ts`

```typescript
// V2 - Conditional style selection happens in elements package
const styles = isScaled
  ? Styles.element.asset.image.wrapperScaled
  : Styles.element.asset.image.wrapper;

const composite = new ElementBuilder()
  .styled(styles)
  .withStyles({
    element: {
      ...customStyles,
    },
  });
```

**Alternative Patterns to Consider**:

1. **Keep in Elements Package** (Current Approach):
   - Pro: Explicit style selection visible in code
   - Pro: No additional abstraction needed
   - Con: Repeated conditional logic across files

2. **Helper Functions in Elements Package**:
   ```typescript
   // elements/source/utilities/style-helpers.ts
   export const selectImageWrapper = (isScaled: boolean) => {
     return isScaled
       ? Styles.element.asset.image.wrapperScaled
       : Styles.element.asset.image.wrapper;
   };

   // Usage
   const composite = new ElementBuilder()
     .styled(selectImageWrapper(isScaled))
     .build();
   ```
   - Pro: Reusable logic
   - Pro: Clear naming of conditional patterns
   - Con: Additional layer of abstraction

3. **Presets with Conditional Params** (Builder Package):
   ```typescript
   // presets.ts
   export const assets = {
     imageWrapper: (isScaled: boolean = false) => {
       const styles = isScaled
         ? Styles.element.asset.image.wrapperScaled
         : Styles.element.asset.image.wrapper;
       return new ElementBuilder().styled(styles);
     },
   };

   // Usage
   const composite = assets.imageWrapper(isScaled);
   ```
   - Pro: Consistent with preset pattern
   - Pro: Encapsulated in builder package
   - Con: Adds presets for every conditional style pattern

**Old V1 Reference**: https://github.com/UMD-Digital/design-system/blob/release/1.16/packages/builder/source/styledElements/assets.ts

**All styledElements files**: https://github.com/UMD-Digital/design-system/tree/release/1.16/packages/builder/source/styledElements

**Decision Needed**: Determine which pattern to use consistently across all conditional style use cases.

**Action Required**:
1. Review all instances of conditional style switching in converted files
2. Decide on consistent pattern (current approach, helper functions, or presets)
3. Document the chosen pattern in this file
4. Apply consistently in future conversions

---

### Issue 3: Converting Files Without ElementBuilder

**Problem**: Some files were converted to V2 API that didn't originally use ElementBuilder in V1. These conversions were reverted.

**Root Cause**: Migration work proceeded too broadly without verifying which files actually used ElementBuilder V1 patterns.

**Solution**:

**File Selection Criteria** - Before converting a file, verify it meets ONE of these criteria:

1. **Has V1 ElementBuilder Usage**:
   - `ElementBuilder.create.X`
   - `ElementBuilder.styled.X`
   - `createStyledElement()`

2. **Imports from Builder Package**:
   ```typescript
   import ElementBuilder from '@universityofmaryland/web-builder-library/v1';
   import { createStyledElement } from '@universityofmaryland/web-builder-library/v1';
   ```

**Detection Pattern**:

```bash
# Check if file uses ElementBuilder before converting
grep -l "ElementBuilder\." path/to/file.ts
grep -l "createStyledElement" path/to/file.ts
grep -l "@universityofmaryland/web-builder-library" path/to/file.ts
```

**Files to SKIP**:
- Files that only use `document.createElement()` and manual DOM operations
- Files that only use utility functions (no builder patterns)
- Files that build custom element models without builder abstractions

**Example - Should NOT Convert**:

```typescript
// ❌ Don't convert - No ElementBuilder usage
export default (props: Props) => {
  const container = document.createElement('div');
  const text = document.createElement('span');

  text.textContent = props.text;
  container.appendChild(text);

  return {
    element: container,
    styles: STATIC_STYLES,
  };
};
```

**Action Required**:
1. Review all already-converted files to verify they had ElementBuilder originally
2. Create list of incorrectly converted files (if any remain)
3. Revert incorrect conversions
4. In future conversions, ALWAYS verify file has ElementBuilder before starting work

---

## Refactor Process Going Forward

Based on identified issues, the refactor process will now follow these guidelines:

### 1. Pre-Conversion Verification

- [ ] Verify file contains V1 ElementBuilder patterns
- [ ] Check for `ElementBuilder.create.X` or `ElementBuilder.styled.X`
- [ ] Confirm file imports from builder package
- [ ] Document current patterns used in file

### 2. Small Batch Conversion

- [ ] Convert files in very small batches (1-5 files max)
- [ ] Focus on single pattern or component type per batch
- [ ] Complete testing before moving to next batch

### 3. Pattern Application

- [ ] Use container-first pattern for conditional children (Issue #1)
- [ ] Apply consistent conditional style selection pattern (Issue #2)
- [ ] Verify no heavy nesting occurs

### 4. Post-Conversion Review

- [ ] Run TypeScript compiler to verify no errors
- [ ] Check for deeply nested chaining patterns
- [ ] Verify conditional style patterns are consistent
- [ ] Test converted elements in isolation
- [ ] User will make commits (no AI commits)

### 5. Documentation

- [ ] Update MIGRATION.md with any new patterns discovered
- [ ] Document any edge cases or special handling needed
- [ ] Add examples to REFACTOR.md if pattern is novel

**Important**: User will guide the conversion process and make all commits. AI assistant should focus on:
- Identifying patterns
- Performing conversions
- Running tests
- Providing analysis

**Not**: Making commits or proceeding without explicit user guidance.

---

## Additional Resources

- **README.md** - Complete API documentation and examples
- **CLAUDE.md** - Architectural decisions and patterns
- **PLAN.md** - Development roadmap and future features
- **API Tests** - `source/__tests__/` for behavior examples
- **large.ts** - Reference for conditional children pattern (Issue #1)
- **background.ts** - Reference for conditional style switching (Issue #2)

---

---

## V1 Styled Elements to V2 Styles Library Mapping

When migrating from V1 `ElementBuilder.styled.X` patterns to V2, you need to know how the old styled element methods map to Styles library imports. This section provides complete mappings for all V1 styled elements.

**Reference Files**: V1 styled element definitions were located at:
- https://github.com/UMD-Digital/design-system/blob/release/1.16/packages/builder/source/styledElements/

### Headlines (Typography)

V1 methods: `ElementBuilder.styled.headline.X`
V2 import: `import * as Styles from '@universityofmaryland/web-styles-library';`

| V1 Method | V2 Styles Path |
|-----------|----------------|
| `sansExtraLarge` | `Styles.typography.sans.fonts.extraLarge` |
| `sansLargest` | `Styles.typography.sans.fonts.largest` |
| `sansLarger` | `Styles.typography.sans.fonts.larger` |
| `sansLarge` | `Styles.typography.sans.fonts.large` |
| `sansMedium` | `Styles.typography.sans.fonts.medium` |
| `sansSmall` | `Styles.typography.sans.fonts.small` |
| `sansSmaller` | `Styles.typography.sans.fonts.smaller` |
| `sansMin` | `Styles.typography.sans.fonts.min` |
| `sansScalingLarger` | `Styles.typography.sans.scalingFonts.larger` |
| `sansScalingMin` | `Styles.typography.sans.scalingFonts.min` |
| `campaignMaximum` | `Styles.typography.campaign.fonts.maximum` |
| `campaignExtraLarge` | `Styles.typography.campaign.fonts.extraLarge` |
| `campaignLarge` | `Styles.typography.campaign.fonts.large` |

**Example Migration**:
```typescript
// V1
ElementBuilder.styled.headline.campaignExtraLarge({
  element: headline,
  elementStyles: { element: { textTransform: 'uppercase' } },
  isThemeDark: true
})

// V2 (Updated)
import { theme } from '@universityofmaryland/web-utilities-library/theme';

const isThemeDark = true;
new ElementBuilder(headline)
  .styled(
    Styles.typography.campaign.compose('extraLarge', {
      theme: theme.fontColor(isThemeDark),
    })
  )
  .withStyles({ element: { textTransform: 'uppercase' } })
  .build()
```

### Actions (Links & Buttons)

V1 methods: `ElementBuilder.styled.action.X`
V2 import: `import * as Styles from '@universityofmaryland/web-styles-library';`

| V1 Method | V2 Styles Path | Notes |
|-----------|----------------|-------|
| `iconSmall` | `Styles.element.action.icon.small` | Light theme |
| `iconSmall` (dark) | `Styles.element.action.icon.smallDark` | Dark theme |
| `outline` | `Styles.element.action.outline.normal` | |
| `outlineLarge` | `Styles.element.action.outline.large` | |
| `outlineWhite` | `Styles.element.action.outline.white` | |
| `primary` | `Styles.element.action.primary.normal` | |
| `primaryLarge` | `Styles.element.action.primary.large` | |
| `primaryWhite` | `Styles.element.action.primary.white` | |
| `secondary` | `Styles.element.action.secondary.normal` | |
| `secondaryLarge` | `Styles.element.action.secondary.large` | |
| `secondaryWhite` | `Styles.element.action.secondary.white` | |
| `secondaryGold` | `Styles.element.action.secondary.gold` | |

**Example Migration**:
```typescript
// V1
ElementBuilder.styled.action.primary({
  element: linkElement,
  isThemeDark: false
})

// V2
new ElementBuilder(linkElement)
  .styled(Styles.element.action.primary.normal)
  .build()
```

### Rich Text

V1 methods: `ElementBuilder.styled.richText.X`
V2 import: `import * as Styles from '@universityofmaryland/web-styles-library';`

| V1 Method | V2 Styles Path | Dark Variant |
|-----------|----------------|--------------|
| `advanced()` | `Styles.element.text.rich.advanced` | `Styles.element.text.rich.advancedDark` |
| `simple()` | `Styles.element.text.rich.simple` | `Styles.element.text.rich.simpleDark` |
| `simpleLarge()` | `Styles.element.text.rich.simpleLarge` | `Styles.element.text.rich.simpleLargeDark` |
| `simpleLargest()` | `Styles.element.text.rich.simpleLargest` | `Styles.element.text.rich.simpleLargestDark` |
| `simpleScaling()` | `Styles.element.text.rich.simpleScaling` | `Styles.element.text.rich.simpleScalingDark` |

**Theme Handling**:
```typescript
import { theme } from '@universityofmaryland/web-utilities-library/theme';

// V1 - Theme handled automatically
ElementBuilder.styled.richText.simple({
  element: textElement,
  isThemeDark: true
})

// V2 - Use compose function with theme utility (RECOMMENDED)
new ElementBuilder(textElement)
  .styled(
    Styles.element.text.rich.composeSimple({
      theme: theme.fontColor(isThemeDark),
    }),
  )
  .build()

// V2 Alternative - Select dark variant directly (legacy)
new ElementBuilder(textElement)
  .styled(Styles.element.text.rich.simpleDark)
  .build()
```

### Layout

V1 methods: `ElementBuilder.styled.layout.X`
V2 import: `import * as Styles from '@universityofmaryland/web-styles-library';`

| V1 Method | V2 Styles Path |
|-----------|----------------|
| `alignedCenter` | `Styles.layout.alignment.block.center` |
| `backgroundBoxWhite` | `Styles.layout.background.box.white` |
| `gridInlineRow` | `Styles.layout.grid.inline.row` |
| `gridInlineTabletRows` | `Styles.layout.grid.inline.tabletRows` |
| `gridStacked` | `Styles.layout.grid.stacked` |
| `spaceHorizontalFull` | `Styles.layout.space.horizontal.full` |
| `spaceHorizontalLarger` | `Styles.layout.space.horizontal.larger` |
| `spaceHorizontalNormal` | `Styles.layout.space.horizontal.normal` |
| `spaceHorizontalSmall` | `Styles.layout.space.horizontal.small` |
| `spaceHorizontalSmallest` | `Styles.layout.space.horizontal.smallest` |

**Example Migration**:
```typescript
// V1
ElementBuilder.styled.layout.spaceHorizontalLarger({
  element: document.createElement('div'),
  children: [child1, child2]
})

// V2
new ElementBuilder()
  .styled(Styles.layout.space.horizontal.larger)
  .withChildren(child1, child2)
  .build()
```

### Text Decorations

V1 methods: `ElementBuilder.styled.text.X`
V2 import: `import * as Styles from '@universityofmaryland/web-styles-library';`

| V1 Method | V2 Styles Path |
|-----------|----------------|
| `eyebrow` | `Styles.typography.elements.fonts.eyebrow` |
| `ribbon` | `Styles.element.text.decoration.ribbon` |
| `lineAdjustment` | `Styles.element.text.line.adjustent` |
| `lineAdjustmentInset` | `Styles.element.text.line.adjustentInset` |

**Example Migration**:
```typescript
// V1
ElementBuilder.styled.text.ribbon({
  element: ribbonElement,
  elementStyles: { siblingAfter: { marginTop: token.spacing.sm } }
})

// V2
new ElementBuilder(ribbonElement)
  .styled(Styles.element.text.decoration.ribbon)
  .withStyles({ siblingAfter: { marginTop: token.spacing.sm } })
  .build()
```

### Buttons

V1 methods: `ElementBuilder.styled.button.X`
V2 import: `import * as Styles from '@universityofmaryland/web-styles-library';`

| V1 Method | V2 Styles Path |
|-----------|----------------|
| `fullScreen` | `Styles.element.action.button.fullScreen` |
| `videoState` | `Styles.element.action.button.videoState` |

**Example Migration**:
```typescript
// V1
ElementBuilder.styled.button.fullScreen({
  element: buttonElement
})

// V2
new ElementBuilder(buttonElement)
  .styled(Styles.element.action.button.fullScreen)
  .build()
```

### Event Metadata

V1 methods: `ElementBuilder.styled.event.X`
V2 import: `import * as Styles from '@universityofmaryland/web-styles-library';`

| V1 Method | V2 Styles Path |
|-----------|----------------|
| `metaContainer` | `Styles.element.event.meta.container` |
| `metaWrapper` | `Styles.element.event.meta.wrapper` |
| `metaItem` | `Styles.element.event.meta.item` |
| `signContainer` | `Styles.element.event.sign.container` |

**Example Migration**:
```typescript
// V1
ElementBuilder.styled.event.metaContainer({
  element: document.createElement('div'),
  children: [metaWrapper]
})

// V2
new ElementBuilder()
  .styled(Styles.element.event.meta.container)
  .withChild(metaWrapper)
  .build()
```

### Assets (Images/Media)

V1 methods: `ElementBuilder.styled.assets.X`
V2 import: `import * as Styles from '@universityofmaryland/web-styles-library';`

| V1 Method | V2 Styles Path | Notes |
|-----------|----------------|-------|
| `imageCaption()` | `Styles.element.asset.image.caption` | |
| `imageAspect()` | `Styles.element.asset.image.aspectSquare` or `aspectStandard` | Conditional on props |
| `imageWrapper()` | `Styles.element.asset.image.wrapper` or `wrapperScaled` | Conditional on `isScaled` |
| `gifToggle()` | `Styles.element.asset.gif.toggle` | |

**Conditional Style Selection**:
```typescript
// V1 - Conditional logic in styled element
ElementBuilder.styled.assets.imageWrapper({
  element: wrapper,
  isScaled: true  // Automatically selects wrapperScaled
})

// V2 - Manual conditional selection (Option 1 from Issue #2)
const styles = isScaled
  ? Styles.element.asset.image.wrapperScaled
  : Styles.element.asset.image.wrapper;

new ElementBuilder(wrapper)
  .styled(styles)
  .build()
```

### Migration Pattern Summary

**Step 1**: Identify V1 styled element method
```typescript
ElementBuilder.styled.headline.campaignLarge({ ... })
                      ^^^^^^^^  ^^^^^^^^^^^^
                      category    method
```

**Step 2**: Look up mapping in tables above
- Category: `headline` → Typography
- Method: `campaignLarge` → `Styles.typography.campaign.fonts.large`

**Step 3**: Apply V2 pattern
```typescript
import { theme } from '@universityofmaryland/web-utilities-library/theme';

new ElementBuilder(element)
  .styled(
    Styles.typography.campaign.compose('large', {
      theme: theme.fontColor(isThemeDark),
    }),
  )
  .withStyles({ /* custom styles */ })
  .build()
```

### Important Notes

1. **Theme Handling (Updated Pattern)**: V2 no longer uses `.withThemeDark()`. Instead, use compose functions with the theme utility:

   **Import the theme utility**:
   ```typescript
   import { theme } from '@universityofmaryland/web-utilities-library/theme';
   ```

   **Use compose functions with theme parameter**:
   ```typescript
   // Typography
   .styled(
     Styles.typography.sans.compose('large', {
       theme: theme.fontColor(isThemeDark),
     }),
   )

   // Rich text
   .styled(
     Styles.element.text.rich.composeSimple({
       theme: theme.fontColor(isThemeDark),
     }),
   )

   // Event metadata
   .styled(
     Styles.element.event.meta.composeItem({
       theme: theme.fontColor(isThemeDark),
     }),
   )
   ```

   **Why this pattern?**
   - ✅ Theme is embedded in the style definition (single source of truth)
   - ✅ More flexible - can use different theme values per element
   - ✅ Eliminates need for `.withThemeDark()` method
   - ✅ Works with all composable styles (typography, rich text, events, etc.)

   **Reference files**:
   - `/packages/elements/source/composite/person/bio/full.ts`
   - `/packages/feeds/source/macros/no-results.ts`

   **Legacy alternative**: Direct dark variant selection (e.g., `simpleDark` vs `simple`) still works but is not recommended for new code.

2. **Conditional Styles**: V1 had built-in conditional logic (e.g., `isScaled`). V2 requires manual selection:
   ```typescript
   const styles = condition ? StyleA : StyleB;
   builder.styled(styles)
   ```

3. **Custom Styles**: V1 used `elementStyles` parameter, V2 uses `.withStyles()` method

4. **Children**: V1 used `children` parameter, V2 uses `.withChild()` or `.withChildren()` methods

### When to Use This Reference

- ✅ Migrating existing V1 code to V2
- ✅ Finding correct Styles library path
- ✅ Understanding theme variant handling
- ✅ Converting styled element patterns

**See Also**:
- Issue #2 for conditional style selection patterns
- Pattern examples throughout this document
- Original V1 files: https://github.com/UMD-Digital/design-system/tree/release/1.16/packages/builder/source/styledElements

---

**Last Updated**: 2025-01-25
**Version**: 1.2
**Status**: V1 to V2 Mappings Documented
