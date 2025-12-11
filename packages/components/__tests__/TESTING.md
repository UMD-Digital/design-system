# Components Package - Unit Testing Guide

## Overview

This directory contains **unit tests** for the Components package. These tests focus on verifying that Web Components register correctly, handle attributes and slots properly, and render expected DOM structures using **mocked dependencies**.

## Testing Philosophy

### What to Test in This Package

✅ **Test OUR Web Component logic:**
- Component registration and lifecycle
- Attribute handling and property synchronization
- Slot distribution and content projection
- Shadow DOM rendering
- Custom event emission
- Accessibility attributes (ARIA)
- Lifecycle callbacks (connectedCallback, disconnectedCallback)

❌ **Don't test external package logic:**
- Element creation from `@universityofmaryland/web-elements-library`
- Feed functionality from `@universityofmaryland/web-feeds-library`
- Style compilation from `@universityofmaryland/web-styles-library`

### Example: Good vs Bad Tests

```typescript
// ❌ BAD: Testing elements package logic
import { createHero } from '@universityofmaryland/web-elements-library/composite';

it('validates hero element structure', () => {
  const hero = createHero({ headline: 'Test' });
  expect(hero.element.tagName).toBe('DIV');  // Tests elements package!
});

// ✅ GOOD: Testing OUR Web Component
describe('umd-hero', () => {
  it('registers custom element', () => {
    expect(customElements.get('umd-hero')).toBeDefined();
  });

  it('renders with headline attribute', () => {
    const hero = document.createElement('umd-hero');
    hero.setAttribute('headline', 'Welcome');
    document.body.appendChild(hero);

    expect(hero.shadowRoot.textContent).toContain('Welcome');
  });
});
```

## What We're Testing

### Component Registration

Test that Web Components:
- Register with customElements
- Use correct tag names (umd-*)
- Extend HTMLElement properly

**Example:**
```typescript
describe('Component Registration', () => {
  it('registers umd-card component', () => {
    const CardElement = customElements.get('umd-card');
    expect(CardElement).toBeDefined();
    expect(new CardElement()).toBeInstanceOf(HTMLElement);
  });
});
```

### Attribute Handling

Test that components:
- Accept expected attributes
- Sync attributes to properties
- Handle attribute changes
- Use correct default values

**Example:**
```typescript
describe('Attribute Handling', () => {
  it('applies theme attribute', () => {
    const card = document.createElement('umd-card');
    card.setAttribute('theme', 'dark');

    expect(card.getAttribute('theme')).toBe('dark');
  });

  it('reflects deprecated attributes with warnings', async () => {
    const warnSpy = jest.spyOn(console, 'warn');
    const card = document.createElement('umd-card');
    card.setAttribute('old-attr', 'value');

    expect(warnSpy).toHaveBeenCalled();
  });
});
```

### Slot Distribution

Test that components:
- Define named slots
- Project slotted content
- Handle missing slot content gracefully

**Example:**
```typescript
describe('Slot Distribution', () => {
  it('projects headline slot content', () => {
    const card = document.createElement('umd-card');
    const headline = document.createElement('h3');
    headline.slot = 'headline';
    headline.textContent = 'My Title';
    card.appendChild(headline);

    document.body.appendChild(card);

    const slot = card.shadowRoot.querySelector('slot[name="headline"]');
    expect(slot).toBeDefined();
  });
});
```

### Shadow DOM Rendering

Test that components:
- Attach shadow root
- Inject styles into shadow DOM
- Render expected structure

**Example:**
```typescript
describe('Shadow DOM', () => {
  it('attaches shadow root', () => {
    const hero = document.createElement('umd-hero');
    expect(hero.shadowRoot).toBeDefined();
  });

  it('injects component styles', () => {
    const hero = document.createElement('umd-hero');
    const styleEl = hero.shadowRoot.querySelector('style');
    expect(styleEl).toBeDefined();
    expect(styleEl.textContent.length).toBeGreaterThan(0);
  });
});
```

## Mocked Dependencies

All external packages are automatically mocked via Jest configuration:

- `@universityofmaryland/web-elements-library` → Element builders
- `@universityofmaryland/web-feeds-library` → Feed components
- `@universityofmaryland/web-styles-library` → Style objects
- `@universityofmaryland/web-utilities-library` → Utility functions
- `@universityofmaryland/web-icons-library` → SVG icons

**Mocks are auto-generated** - see `/__mocks__/MOCKS.md` for details.

## Common Test Patterns

### Pattern 1: Component Creation

```typescript
it('creates component instance', () => {
  const component = document.createElement('umd-hero');
  expect(component).toBeInstanceOf(HTMLElement);
  expect(component.shadowRoot).toBeDefined();
});
```

### Pattern 2: Attribute Observation

```typescript
it('responds to attribute changes', () => {
  const component = document.createElement('umd-card');
  component.setAttribute('theme', 'light');
  expect(component.getAttribute('theme')).toBe('light');

  component.setAttribute('theme', 'dark');
  expect(component.getAttribute('theme')).toBe('dark');
});
```

### Pattern 3: Event Emission

```typescript
it('emits custom events', () => {
  const component = document.createElement('umd-carousel');
  const handler = jest.fn();
  component.addEventListener('slide-change', handler);

  // Trigger slide change
  component.setAttribute('active-slide', '1');

  expect(handler).toHaveBeenCalled();
});
```

### Pattern 4: Cleanup

```typescript
afterEach(() => {
  document.body.innerHTML = '';
  jest.clearAllMocks();
});
```

## Test Organization

```
__tests__/
├── TESTING.md              # This file
├── test-helpers/           # Shared test utilities
│   ├── setup.ts           # Test environment setup
│   ├── component.ts       # Component creation helpers
│   └── validation.ts      # Validation utilities
├── alert/                  # Alert component tests
├── card/                   # Card component tests
├── carousel/              # Carousel component tests
├── feed/                   # Feed component tests
├── hero/                   # Hero component tests
└── ...
```

## Running Tests

```bash
# From package directory
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage

# From repository root
npx lerna run test --scope=@universityofmaryland/web-components-library
```

## Best Practices

1. ✅ **Clean up after tests** - Remove elements from DOM
2. ✅ **Test accessibility** - Verify ARIA attributes
3. ✅ **Test slot content** - Ensure slots work correctly
4. ✅ **Test lifecycle** - connectedCallback, disconnectedCallback
5. ✅ **Mock external deps** - Don't test other packages
6. ✅ **Test deprecated warnings** - Ensure warnings fire

## Resources

- **Mock System Documentation**: `/__mocks__/MOCKS.md`
- **Package Documentation**: `/packages/components/CLAUDE.md`
- **Web Components Spec**: https://developer.mozilla.org/en-US/docs/Web/Web_Components
- **Jest Documentation**: https://jestjs.io/
- **Testing Philosophy**: `/__mocks__/MOCKS.md#testing-philosophy`

## Questions?

Review the comprehensive mock system documentation at `/__mocks__/MOCKS.md` for:
- Testing philosophy and strategy
- Mock generation details
- Troubleshooting guide
- Integration vs unit testing
