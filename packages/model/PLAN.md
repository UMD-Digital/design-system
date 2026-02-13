# Model Package Refactoring Plan (v1.1.0)

## Overview

Enhance `@universityofmaryland/web-model-library` with testing utilities, improved event/slot handling, type-safe attributes, and a reactive update cycle. All changes are backwards compatible and opt-in — existing APIs remain unchanged.

**Current Version**: 1.0.3
**Target Version**: 1.1.0

## Module Implementation Order

Each module builds on the previous. Complete and test each before moving to the next.

```
1. Testing  →  2. Utilities  →  3. Slots  →  4. Attributes  →  5. Model
```

---

## Module 1: Testing

**New export**: `./testing`
**Directory**: `source/testing/`

Provides test helpers for component authors across the design system. Used in dev/test environments only.

### Files

| File | Exports | Purpose |
|------|---------|---------|
| `fixture.ts` | `createFixture`, `cleanupFixtures` | Mount components in JSDOM isolation |
| `shadow.ts` | `queryShadow`, `queryShadowAll` | Traverse shadow DOM boundaries |
| `events.ts` | `simulateEvent`, `waitForEvent` | Fire and await custom events |
| `slots.ts` | `createSlotContent`, `assertSlot` | Create slot children, assert slot state |
| `index.ts` | Re-exports all | Entry point |

### API Design

```typescript
// fixture.ts
interface FixtureOptions {
  /** Whether to wait for connectedCallback to complete */
  awaitConnect?: boolean;
  /** Container element to mount into (defaults to document.body) */
  container?: HTMLElement;
}

function createFixture<T extends HTMLElement>(
  html: string,
  options?: FixtureOptions,
): Promise<T>;

function cleanupFixtures(): void;

// shadow.ts
function queryShadow<T extends Element>(
  host: HTMLElement,
  selector: string,
): T | null;

function queryShadowAll<T extends Element>(
  host: HTMLElement,
  selector: string,
): T[];

// events.ts
function simulateEvent(
  target: EventTarget,
  type: string,
  detail?: unknown,
): void;

function waitForEvent(
  target: EventTarget,
  type: string,
  timeout?: number,
): Promise<Event>;

// slots.ts
function createSlotContent(
  slotName: string,
  content: string | HTMLElement,
  tag?: string,
): HTMLElement;

function assertSlot(
  host: HTMLElement,
  slotName: string,
  options?: { exists?: boolean; count?: number },
): void;
```

### Build Changes

- Add `source/testing/index.ts` as a Vite entry point
- Add `./testing` to `package.json` exports map
- Exclude from production CDN builds

### Tasks

- [ ] Create `source/testing/fixture.ts`
- [ ] Create `source/testing/shadow.ts`
- [ ] Create `source/testing/events.ts`
- [ ] Create `source/testing/slots.ts`
- [ ] Create `source/testing/index.ts`
- [ ] Add `./testing` export to `package.json`
- [ ] Add entry point to `vite.config.ts`
- [ ] Write tests in `__tests__/testing/`
- [ ] Verify build output includes `dist/testing.js` and `dist/testing.d.ts`

---

## Module 2: Utilities Enhancements

**Existing export**: `./utilities`
**Directory**: `source/utilities/` (add new files)

### Files

| File | Exports | Purpose |
|------|---------|---------|
| `debug.ts` | `isDev`, `createLogger` | Dev-mode conditional logging |
| `events.ts` | `createCustomEvent`, `dispatchCustomEvent`, `defineEvents`, `createEventListener`, `delegate` | Event creation and delegation |

### API Design

```typescript
// debug.ts
function isDev(): boolean;

interface Logger {
  log: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
}

function createLogger(namespace: string): Logger;

// events.ts
function createCustomEvent<T>(
  type: string,
  detail: T,
  options?: { bubbles?: boolean; composed?: boolean },
): CustomEvent<T>;

function dispatchCustomEvent<T>(
  target: EventTarget,
  type: string,
  detail: T,
): boolean;

interface EventDefinition {
  type: string;
  bubbles?: boolean;
  composed?: boolean;
}

function defineEvents<T extends Record<string, EventDefinition>>(
  definitions: T,
): T;

function createEventListener(
  target: EventTarget,
  type: string,
  handler: EventListener,
  options?: AddEventListenerOptions,
): () => void; // returns cleanup function

function delegate(
  container: EventTarget,
  type: string,
  selector: string,
  handler: (event: Event, matchedTarget: Element) => void,
): () => void; // returns cleanup function
```

### Integration Points

- `createLogger` replaces ad-hoc `console.error(`[${tagName}]`, ...)` calls in `model/index.ts`
- `createCustomEvent` replaces manual `new CustomEvent()` construction in `BaseComponent.dispatchComponentEvent`
- `delegate` provides event delegation missing from current utilities

### Tasks

- [ ] Create `source/utilities/debug.ts`
- [ ] Create `source/utilities/events.ts`
- [ ] Re-export from `source/utilities/index.ts`
- [ ] Write tests in `__tests__/utilities/`
- [ ] Verify existing utility exports unchanged

---

## Module 3: Slots Enhancements

**Existing export**: `./slots`
**Directory**: `source/slots/` (add new files)

### Files

| File | Exports | Purpose |
|------|---------|---------|
| `slot-validation.ts` | `SlotConfig` (enhanced), `validateSlotConfig` | Declarative slot configuration |
| `slot-query.ts` | `querySlotContent`, `getSlotElements`, `hasSlotContent` | Query helpers for assigned nodes |
| `slot-events.ts` | `createSlotchangeHandler`, `SlotCache`, `SlotchangeController` | Reactive slot change handling |

### API Design

```typescript
// slot-validation.ts
interface SlotConfigEnhanced {
  /** Existing fields from _types.ts SlotConfig */
  required?: boolean;
  allowedElements?: string[];
  deprecated?: string;
  replacement?: string;
  /** New fields */
  multiple?: boolean;
  defaultContent?: () => HTMLElement;
  transform?: (element: Element) => Element;
}

function validateSlotConfig(
  host: HTMLElement,
  config: Record<string, SlotConfigEnhanced>,
): SlotValidationResult;

// slot-query.ts
function querySlotContent(
  slot: HTMLSlotElement,
  selector?: string,
): Element[];

function getSlotElements(
  shadowRoot: ShadowRoot,
  slotName: string,
): Element[];

function hasSlotContent(
  shadowRoot: ShadowRoot,
  slotName: string,
): boolean;

// slot-events.ts
type SlotchangeCallback = (
  assignedNodes: Node[],
  previousNodes: Node[],
) => void;

function createSlotchangeHandler(
  callback: SlotchangeCallback,
): (event: Event) => void;

class SlotCache {
  constructor(shadowRoot: ShadowRoot);
  get(slotName: string): Node[];
  refresh(slotName?: string): void;
  observe(slotName: string, callback: SlotchangeCallback): () => void;
}

interface SlotchangeController {
  hostConnected(): void;
  hostDisconnected(): void;
}
```

### Integration Points

- `SlotConfigEnhanced` extends existing `SlotConfig` from `_types.ts` — no breaking change
- `SlotCache` wraps existing `query.ts` helpers with caching
- `SlotchangeController` can be adopted by `BaseComponent` in Module 5

### Tasks

- [ ] Create `source/slots/slot-validation.ts`
- [ ] Create `source/slots/slot-query.ts`
- [ ] Create `source/slots/slot-events.ts`
- [ ] Re-export from `source/slots/index.ts`
- [ ] Write tests in `__tests__/slots/`
- [ ] Verify existing slot exports unchanged

---

## Module 4: Attributes Enhancements

**Existing export**: `./attributes`
**Directory**: `source/attributes/` (add new files)

### Files

| File | Exports | Purpose |
|------|---------|---------|
| `converters.ts` | `AttributeConverter`, built-in converters | Type-safe string-to-value conversion |
| `config.ts` | `AttributeConfig` (declarative), `resolveAttributes` | Declarative attribute definitions |
| `change-detection.ts` | `ChangeDetectors`, `hasChanged` | Efficient dirty checking |
| `errors.ts` | `AttributeTypeError`, `AttributeValidationError` | Structured error types |

### API Design

```typescript
// converters.ts
interface AttributeConverter<T = unknown> {
  fromAttribute(value: string | null): T;
  toAttribute(value: T): string | null;
}

const StringConverter: AttributeConverter<string>;
const NumberConverter: AttributeConverter<number>;
const BooleanConverter: AttributeConverter<boolean>;
const JsonConverter: AttributeConverter<unknown>;

function createConverter<T>(
  fromAttribute: (value: string | null) => T,
  toAttribute: (value: T) => string | null,
): AttributeConverter<T>;

// config.ts
interface AttributeConfigEntry<T = unknown> {
  type?: AttributeConverter<T>;
  reflect?: boolean;
  default?: T;
  attribute?: string; // custom attribute name
}

type AttributeConfigMap = Record<string, AttributeConfigEntry>;

function resolveAttributes(
  config: AttributeConfigMap,
): {
  observedAttributes: string[];
  defaults: Record<string, unknown>;
  converters: Record<string, AttributeConverter>;
};

// change-detection.ts
type ChangeDetector<T = unknown> = (oldValue: T, newValue: T) => boolean;

const ChangeDetectors: {
  strict: ChangeDetector;       // oldValue !== newValue
  shallow: ChangeDetector;      // shallow object comparison
  json: ChangeDetector;         // JSON.stringify comparison
};

function hasChanged<T>(
  oldValue: T,
  newValue: T,
  detector?: ChangeDetector<T>,
): boolean;

// errors.ts
class AttributeTypeError extends TypeError {
  constructor(
    attributeName: string,
    expectedType: string,
    receivedValue: string,
  );
  readonly attributeName: string;
}

class AttributeValidationError extends Error {
  constructor(
    attributeName: string,
    message: string,
    allowedValues?: string[],
  );
  readonly attributeName: string;
  readonly allowedValues?: string[];
}
```

### Integration Points

- `AttributeConverter` provides typed parsing for values currently handled by `checks.ts` `createValueGetter`
- `AttributeConfigMap` is a declarative alternative to the existing `AttributeConfig` interface in `model/index.ts`
- `ChangeDetectors` can be used by Module 5's update cycle to skip no-op renders
- Error types replace ad-hoc `console.warn` calls with structured errors

### Naming Considerations

The existing `model/index.ts` has a local `AttributeConfig` interface. The new `config.ts` uses `AttributeConfigEntry` and `AttributeConfigMap` to avoid collision. The existing interface remains unchanged.

### Tasks

- [ ] Create `source/attributes/converters.ts`
- [ ] Create `source/attributes/config.ts`
- [ ] Create `source/attributes/change-detection.ts`
- [ ] Create `source/attributes/errors.ts`
- [ ] Re-export from `source/attributes/index.ts`
- [ ] Write tests in `__tests__/attributes/`
- [ ] Verify existing attribute exports unchanged

---

## Module 5: Model Enhancements

**Existing export**: `./model`
**Directory**: `source/model/` (add new files)

This module ties together Modules 2-4 into an enhanced base component with reactive updates and controller support.

### Files

| File | Exports | Purpose |
|------|---------|---------|
| `base-component.ts` | `EnhancedBaseComponent` | Extended lifecycle hooks |
| `update-cycle.ts` | `requestUpdate`, `updateComplete`, `UpdateScheduler` | Batched microtask updates |
| `controllers.ts` | `ReactiveController`, `ReactiveControllerHost` | Controller interface |
| `registration.ts` | `registerComponent` | Validated registration helper |

### API Design

```typescript
// controllers.ts
interface ReactiveController {
  hostConnected?(): void;
  hostDisconnected?(): void;
  hostUpdate?(): void;
  hostUpdated?(): void;
}

interface ReactiveControllerHost {
  addController(controller: ReactiveController): void;
  removeController(controller: ReactiveController): void;
  requestUpdate(): void;
  readonly updateComplete: Promise<boolean>;
}

// update-cycle.ts
class UpdateScheduler {
  constructor(host: ReactiveControllerHost);
  schedule(): Promise<boolean>;
  readonly pending: boolean;
  readonly updateComplete: Promise<boolean>;
}

// base-component.ts
/**
 * Extended base component with reactive update cycle and controller support.
 * Extends the existing BaseComponent — opt-in for new components.
 */
class EnhancedBaseComponent
  extends BaseComponent
  implements ReactiveControllerHost
{
  private __controllers: Set<ReactiveController>;
  private __scheduler: UpdateScheduler;
  private __firstConnected: boolean;

  addController(controller: ReactiveController): void;
  removeController(controller: ReactiveController): void;
  requestUpdate(): void;
  get updateComplete(): Promise<boolean>;

  /** Called once on first connectedCallback. Override in subclasses. */
  protected firstConnected?(): void;
  /** Called before the first update. Override in subclasses. */
  protected willFirstUpdate?(): void;
  /** Called before each update. Override in subclasses. */
  protected willUpdate?(): void;
  /** Called after each update. Override in subclasses. */
  protected updated?(): void;
}

// registration.ts
interface RegisterOptions {
  /** Skip the DOM presence check (registerWebComponent requires elements in DOM) */
  eager?: boolean;
  /** Custom registry (defaults to window.customElements) */
  registry?: CustomElementRegistry;
}

function registerComponent(
  tagName: string,
  element: CustomElementConstructor,
  options?: RegisterOptions,
): boolean;
```

### Integration Points

- `EnhancedBaseComponent` extends existing `BaseComponent` — no changes to `BaseComponent` itself
- `ReactiveController` mirrors the Lit controller interface for familiarity
- `UpdateScheduler` uses `queueMicrotask` for batching, same as Lit's scheduling
- `registerComponent` wraps existing `registerWebComponent` with validation and options
- Controllers integrate with the slot/event/attribute systems from Modules 2-4

### Migration Path

Existing components using `createCustomElement` continue to use `BaseComponent` unchanged. New components can opt into `EnhancedBaseComponent`:

```typescript
// Existing pattern (unchanged)
const element = createCustomElement({
  tagName: 'umd-card',
  createComponent: (host) => createCard(host),
});

// New pattern (opt-in)
class UmdCardEnhanced extends EnhancedBaseComponent {
  firstConnected() {
    const focusCtrl = new FocusController(this);
    this.addController(focusCtrl);
  }
}
```

### Tasks

- [ ] Create `source/model/controllers.ts`
- [ ] Create `source/model/update-cycle.ts`
- [ ] Create `source/model/base-component.ts`
- [ ] Create `source/model/registration.ts`
- [ ] Re-export from `source/model/index.ts`
- [ ] Write tests in `__tests__/model/`
- [ ] Verify existing `createCustomElement` and `BaseComponent` exports unchanged
- [ ] Integration test: controller + update cycle + enhanced base component

---

## Build & Configuration Changes

### vite.config.ts

Add `testing` entry point:

```typescript
input: {
  index: 'source/index.ts',
  attributes: 'source/attributes/index.ts',
  model: 'source/model/index.ts',
  slots: 'source/slots/index.ts',
  utilities: 'source/utilities/index.ts',
  testing: 'source/testing/index.ts',  // new
},
```

### package.json

Add exports entry:

```json
"./testing": {
  "types": "./dist/testing.d.ts",
  "import": "./dist/testing.js"
}
```

### Main index.ts

Add re-export for testing:

```typescript
export * as Testing from './testing';
```

---

## Testing Strategy

Each module includes its own test suite in `__tests__/<module>/`.

| Module | Test Focus |
|--------|-----------|
| Testing | Fixture lifecycle, shadow DOM queries, event waiting, slot assertions |
| Utilities | Logger output suppression in prod, event creation/dispatch, delegate matching |
| Slots | Config validation, query results, slotchange observation, cache invalidation |
| Attributes | Converter round-trips, config resolution, change detection accuracy, error messages |
| Model | Controller lifecycle, update batching, firstConnected timing, registration validation |

### Integration Tests

After all modules are complete:

- [ ] End-to-end: create a component with `EnhancedBaseComponent`, attach controllers, test update cycle
- [ ] Verify `createFixture` works with both `BaseComponent` and `EnhancedBaseComponent`
- [ ] Verify all existing tests still pass with no modifications

---

## Compatibility Guarantees

1. **No breaking changes** — all existing exports remain identical
2. **No required migration** — existing components work without modification
3. **Opt-in adoption** — new features are used by importing new files or extending new classes
4. **No new peer dependencies** — only uses existing `postcss` and `@universityofmaryland/web-styles-library`
5. **Tree-shakeable** — unused modules are eliminated from production bundles
