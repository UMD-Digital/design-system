# Components Package Migration to New Model APIs

## Summary

Migrate all 66 components from deprecated `Register.webComponent()` / `Register.registerWebComponent()` / manual `customElements.define()` to the new `Model.registerComponent()` + `Model.createCustomElement()` APIs.

All changes are internal — no external API changes to tag names, attributes, or slots.

---

## Phase 1A: Pattern A — `Register.webComponent()` (60 files)

### Transform

**Import change:**
```typescript
// Before
import { Attributes, Slots, Register, Lifecycle } from '@universityofmaryland/web-model-library';

// After
import { Attributes, Lifecycle, Model, Slots } from '@universityofmaryland/web-model-library';
```

**Registration change:**
```typescript
// Before
export const AccordionItem = Register.webComponent({
  tagName,
  slots,
  createComponent,
  attributes,
});

// After
export const AccordionItem: ComponentRegistration = () => {
  Model.registerComponent(
    tagName,
    Model.createCustomElement({
      tagName,
      slots,
      createComponent,
      attributes,
    }),
    { eager: false },
  );
};
```

### Attribute normalization

`createCustomElement` expects `attributes` as `AttributeConfig[]`. The old `webComponent()` auto-normalized single handlers to arrays. Each file must ensure attributes is an array:

| Handler return type | Already array? | Action needed |
|---|---|---|
| `Attributes.handler.common.resize(cb)` | No (single object) | Wrap in `[...]` |
| `Attributes.handler.common.accordion()` | Yes (from `combine`) | None |
| `Attributes.handler.common.visualShowHide(...)` | Yes (from `combine`) | None |
| `Attributes.handler.common.visualToggle(...)` | Yes (from `combine`) | None |
| `Attributes.handler.combine(...)` | Yes | None |
| `Attributes.handler.observe.*(...)` | No (single object) | Wrap in `[...]` |

### Files — no attributes (simplest transform)

These only have `tagName`, `createComponent`, and optionally `slots` / lifecycle hooks.

| File | Notes |
|---|---|
| `brand/chevron-scroll.ts` | imports Register only |
| `feed/events/grouped.ts` | |
| `feed/in-the-news/grid.ts` | |
| `feed/in-the-news/list.ts` | |
| `hero/base.ts` | has `afterConnect` |
| `hero/logo.ts` | has `afterConnect` |
| `hero/minimal.ts` | has `afterConnect` |
| `hero/custom/expand.ts` | has `afterConnect` |
| `hero/custom/grid.ts` | has `afterConnect` |
| `hero/custom/video.ts` | has `afterConnect` |
| `layout/box-logo.ts` | |
| `layout/image-expand.ts` | has `afterConnect` |
| `layout/scroll-top.ts` | |
| `layout/section-intro/small.ts` | multi-line assignment |
| `layout/section-intro/wide.ts` | |
| `media/gif.ts` | |
| `navigation/breadcrumb.ts` | no type annotation |
| `navigation/sticky.ts` | no type annotation |
| `pathway/highlight.ts` | has `afterConnect` |
| `pathway/image.ts` | has `afterConnect` |
| `person/bio.ts` | |
| `person/display.ts` | |
| `person/hero.ts` | |
| `quote/display.ts` | |
| `social/sharing.ts` | has `afterConnect` |
| `stat/display.ts` | |

### Files — with attributes (need normalization check)

| File | Attribute source | Already array? | Wrap needed |
|---|---|---|---|
| `accordion/item.ts` | `handler.common.accordion()` | Yes | No |
| `actions/display.ts` | Check file | — | — |
| `alert/page.ts` | Check file | — | — |
| `alert/promo.ts` | Check file | — | — |
| `alert/site.ts` | Check file | — | — |
| `brand/stack.ts` | Check file | — | — |
| `card/event.ts` | Check file | — | — |
| `card/icon.ts` | Check file | — | — |
| `card/overlay.ts` | Check file | — | — |
| `card/video.ts` | Check file | — | — |
| `carousel/base.ts` | `handler.common.resize(cb)` passed as `[attributes]` | Yes (manually) | No |
| `carousel/cards.ts` | Check — likely resize | — | — |
| `carousel/image/multiple.ts` | Check — likely resize | — | — |
| `carousel/image/single.ts` | Check — likely resize | — | — |
| `carousel/thumbnail.ts` | Check — likely resize | — | — |
| `carousel/wide.ts` | Check — likely resize | — | — |
| `feed/alert/index.ts` | Check file | — | — |
| `feed/events/grid.ts` | Check file | — | — |
| `feed/events/list.ts` | Check file | — | — |
| `feed/experts/bio.ts` | Check file | — | — |
| `feed/experts/grid.ts` | Check file | — | — |
| `feed/experts/in-the-news.ts` | No attributes, has `afterConnect` inline | — | — |
| `feed/experts/list.ts` | Check file | — | — |
| `feed/news/featured.ts` | Check — likely position | — | — |
| `feed/news/grid.ts` | Check file | — | — |
| `feed/news/list.ts` | Check file | — | — |
| `footer/options.ts` | Check file | — | — |
| `layout/modal.ts` | `handler.common.visualShowHide(...)` | Yes | No |
| `layout/sticky-columns.ts` | `handler.combine(...)` | Yes | No |
| `media/inline/index.ts` | Check file | — | — |
| `slider/event/display.ts` | Check — likely resize | — | — |
| `slider/event/feed.ts` | Check — likely resize | — | — |
| `tab/display.ts` | Check — likely resize | — | — |
| `text/event-lockup.ts` | Check — likely resize | — | — |

### Edge cases in Pattern A

1. **`layout/section-intro/small.ts`** — assignment spans two lines:
   ```typescript
   export const LayoutSectionIntroSmall: ComponentRegistration =
     Register.webComponent({...});
   ```

2. **`feed/experts/in-the-news.ts`** — call spans with line break:
   ```typescript
   export const FeedExpertInTheNews: ComponentRegistration = Register.webComponent(
     {...},
   );
   ```

3. **`media/inline/index.ts`** and **`navigation/breadcrumb.ts`** — no `: ComponentRegistration` type annotation.

4. **`feed/alert/index.ts`** — no type annotation (`export const FeedAlert = Register.webComponent({...})`).

---

## Phase 1B: Pattern B — `Register.registerWebComponent()` (2 files)

### Files

- `source/web-components/card/_model.ts`
- `source/web-components/alert/_model.ts`

### Transform

**Import change:**
```typescript
// Before
import { Attributes, Model, Register, Slots } from '@universityofmaryland/web-model-library';

// After
import { Attributes, Model, Slots } from '@universityofmaryland/web-model-library';
```

**Registration change:**
```typescript
// Before
return () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      slots,
      createComponent,
    }),
  });
};

// After
return () => {
  Model.registerComponent(
    tagName,
    Model.createCustomElement({
      tagName,
      slots,
      createComponent,
    }),
    { eager: false },
  );
};
```

---

## Phase 1C: Pattern C — Manual `HTMLElement` extension (4 files)

### Files

| File | Class | Tag name | Has observedAttributes |
|---|---|---|---|
| `navigation/header.ts` | `UMDHeaderElement` | `umd-element-navigation-header` | Yes (`sticky`) |
| `navigation/slider.ts` | `UMDNavSlider` | `umd-element-nav-slider` | Yes (`resize`) |
| `navigation/drawer.ts` | `UMDNavDrawerFeature` | `umd-element-nav-drawer` | No |
| `navigation/item.ts` | `UMDNavItemElement` | `umd-element-nav-item` | No |

### Transform strategy

Each file needs a manual rewrite:

1. Extract `connectedCallback` body into a `createComponent` function that returns `ElementRef`
2. Extract `observedAttributes` + `attributeChangedCallback` into `attributes` array
3. Delete the manual class
4. Remove `declare global { interface Window { ... } }` and `window.UMD*` assignments
5. Use `Model.registerComponent()` + `Model.createCustomElement()`

### `navigation/header.ts` — detailed plan

```typescript
// Remove: declare global, class UMDHeaderElement, window assignments

// Add imports:
import { Model } from '@universityofmaryland/web-model-library';
import type { ComponentRegistration } from '../../_types';

// Extract styles into createComponent return:
const createComponent = (element: HTMLElement) => {
  const drawer = MakeNavDrawer({ element, ...SLOTS, displayType: 'drawer-nav' });
  const headerProps = { element, eventOpen: drawer?.events.eventOpen };
  const headerRef = CreateHeader(headerProps);

  // Build the shadow content
  const container = document.createDocumentFragment();
  if (drawer) container.appendChild(drawer.element);
  if (headerRef) container.appendChild(headerRef.element);

  return {
    element: container,
    styles,
    events: {
      sticky: (args: { isSticky: boolean }) => headerRef?.events.sticky(args),
    },
  };
};

const attributes = [{
  name: 'sticky',
  handler: (ref, _oldValue, newValue) => {
    ref.events?.sticky({ isSticky: newValue === 'true' });
  },
}];

export const NavigationHeader: ComponentRegistration = () => {
  Model.registerComponent(
    ELEMENT_NAME,
    Model.createCustomElement({
      tagName: ELEMENT_NAME,
      createComponent,
      attributes,
    }),
    { eager: false },
  );
};
```

**Note:** The header constructor calls `createStyleTemplate` and manually appends to shadow DOM. With `createCustomElement`, the `BaseComponent` handles shadow DOM creation and style injection via the `styles` property on the returned `ElementRef`. The `createComponent` function must return the styles string instead.

### `navigation/slider.ts` — detailed plan

Similar to header. Extract `CreateShadowDom` result into `createComponent`. Convert `resize` attribute to handler config. The `_elementRef.container` becomes `element` in the return.

### `navigation/drawer.ts` — simpler

No observed attributes. Just extract `connectedCallback` into `createComponent`.

### `navigation/item.ts` — simpler

No observed attributes. Extract `connectedCallback` into `createComponent`. Note: this component throws on missing primary-link, which should be preserved.

---

## Phase 1 Verification

```bash
cd packages/components
npm run build          # Verify compilation
npm test               # Existing tests pass
```

Additionally verify:
- CDN build (`dist/cdn.js`) still bundles correctly
- No `Register.registerWebComponent` or `Register.webComponent` calls remain:
  ```bash
  grep -r "Register\." source/web-components/
  ```
- `Register` import removed from all component files
- `window.WebComponents` global no longer written from component files

---

## Phase 2: Reactive Attributes for Handler-Based Attributes

**Scope:** Convert `Attributes.handler.*` patterns to `reactiveAttributes` with `onChange` callbacks.

**Deferred — not in this PR.** Phase 1 is independently shippable. Phase 2 should be a separate PR per handler type.

---

## Phase 3: Built-in Controllers

**Deferred.** Evaluate `IntersectionController` and `MediaQueryController` adoption per-component after Phase 1 ships.

---

## Phase 4: Cleanup

**Deferred until all components are migrated.** Then:
- Remove `source/utilities/register.ts` from model package
- Remove `Register` export from model `source/index.ts`
- Remove `window.WebComponents` global
- Bump model package to v1.2.0

---

## Execution Checklist

### Phase 1A — Pattern A (60 files)
- [ ] Update imports (Register → Model) in all 60 files
- [ ] Replace `Register.webComponent({...})` with `() => { Model.registerComponent(tagName, Model.createCustomElement({...}), { eager: false }); }`
- [ ] Ensure `attributes` is always an array where present
- [ ] Verify build compiles

### Phase 1B — Pattern B (2 files)
- [ ] `alert/_model.ts` — replace `Register.registerWebComponent(...)` with `Model.registerComponent(...)`
- [ ] `card/_model.ts` — replace `Register.registerWebComponent(...)` with `Model.registerComponent(...)`
- [ ] Remove `Register` from imports

### Phase 1C — Pattern C (4 files)
- [ ] `navigation/header.ts` — rewrite to createCustomElement
- [ ] `navigation/slider.ts` — rewrite to createCustomElement
- [ ] `navigation/drawer.ts` — rewrite to createCustomElement
- [ ] `navigation/item.ts` — rewrite to createCustomElement
- [ ] Remove `declare global` Window augmentations
- [ ] Remove `window.UMD*` assignments

### Verification
- [ ] `npm run build` passes
- [ ] `npm test` passes
- [ ] CDN build works
- [ ] No remaining `Register.` calls in component files
- [ ] No remaining `window.customElements.define` in component files
