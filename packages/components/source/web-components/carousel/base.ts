import { carousel } from '@universityofmaryland/web-elements-library/composite';
import { createSlot } from '@universityofmaryland/web-utilities-library/elements';
import { Attributes, Slots, Register, Lifecycle } from '@universityofmaryland/web-model-library';
import type {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../../_types';

// Tag name for the base carousel component
const tagName = 'umd-element-carousel';

// Slot configuration for the base carousel component
const slots: SlotConfiguration = {
  blocks: {
    required: true,
  },
};

// Attribute handlers for the base carousel component
const attributes = Attributes.handler.common.resize((element) =>
  element.events?.resize(),
);

/**
 * Creates a base carousel component
 * @param element - The host HTML element
 * @returns Configured carousel component
 * @internal
 */
const createComponent: CreateComponentFunction = (element) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const isThemeDark = Attributes.isTheme.dark({
    element,
  });
  const attributeLeftButton = element.getAttribute('left-button');
  const attributeRightButton = element.getAttribute('right-button');
  const attributeMobileHint = element.getAttribute('mobile-hint');
  const attributeHint = element.getAttribute('hint');
  const tabletSize = element.getAttribute('tablet-size');
  const desktopSize = element.getAttribute('desktop-size');
  const tabletCount = element.getAttribute('tablet-count');
  const desktopCount = element.getAttribute('desktop-count');
  const maxCount = element.getAttribute('max-count');
  const gridGap = element.getAttribute('grid-gap-pixels');
  const slide = element.querySelector(
    `[slot="${Slots.name.BLOCKS}"]`,
  ) as HTMLElement;
  const blocks = Array.from(
    slide.querySelectorAll(':scope > *'),
  ) as HTMLElement[];
  let hasLeftButton = true;
  let hasRightButton = true;
  let mobileHint = true;
  let hint = true;

  if (attributeLeftButton === 'false') hasLeftButton = false;
  if (attributeRightButton === 'false') hasRightButton = false;
  if (attributeMobileHint === 'false') mobileHint = false;
  if (attributeHint === 'false') hint = false;

  const createCardShadowRef = () => {
    const slot = createSlot(Slots.name.BLOCKS);
    shadow.appendChild(slot);
  };

  createCardShadowRef();

  const shadowRef = shadow.querySelector(
    `[name="${Slots.name.BLOCKS}"]`,
  ) as HTMLElement;

  return carousel.macro({
    slide,
    shadowRef,
    blocks,
    isThemeDark,
    hasLeftButton,
    hasRightButton,
    mobileHint,
    hint,
    tabletSize: tabletSize ? parseInt(tabletSize) : undefined,
    desktopSize: desktopSize ? parseInt(desktopSize) : undefined,
    tabletCount: tabletCount ? parseInt(tabletCount) : undefined,
    desktopCount: desktopCount ? parseInt(desktopCount) : undefined,
    maxCount: maxCount ? parseInt(maxCount) : undefined,
    gridGap,
  });
};

/**
 * Base Carousel
 *
 * A versatile carousel component for displaying scrollable content blocks with navigation controls.
 *
 * ## Custom Element
 * `<umd-element-carousel>`
 *
 * ## Slots
 * - `blocks` - Container for carousel items (required, accepts: any element)
 *
 * ## Attributes
 * - `left-button` - Left navigation button visibility:
 *   - `true` - Show left navigation button (default)
 *   - `false` - Hide left navigation button
 * - `right-button` - Right navigation button visibility:
 *   - `true` - Show right navigation button (default)
 *   - `false` - Hide right navigation button
 * - `mobile-hint` - Mobile swipe hint visibility:
 *   - `true` - Show mobile swipe hint (default)
 *   - `false` - Hide mobile swipe hint
 * - `hint` - Navigation hint visibility:
 *   - `true` - Show navigation hint (default)
 *   - `false` - Hide navigation hint
 * - `data-theme` - Visual theme:
 *   - `light` - Light theme (default)
 *   - `dark` - Dark theme
 * - `tablet-size` - Number of visible items on tablet
 * - `desktop-size` - Number of visible items on desktop
 * - `tablet-count` - Total item count for tablet view
 * - `desktop-count` - Total item count for desktop view
 * - `max-count` - Maximum number of items to display
 * - `grid-gap-pixels` - Gap between items in pixels
 *
 * ## Observed Attributes
 * - `resize` - Triggers carousel size recalculation
 *
 * @example
 * ```html
 * <umd-element-carousel>
 *   <div slot="blocks">
 *     <div>Item 1</div>
 *     <div>Item 2</div>
 *     <div>Item 3</div>
 *   </div>
 * </umd-element-carousel>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
export const CarouselBase: ComponentRegistration = Register.webComponent({
  tagName,
  slots,
  createComponent,
  attributes: [attributes],
  afterConnect: Lifecycle.hooks.loadOnConnect,
});

/** Backwards compatibility alias for grouped exports */
export { CarouselBase as base };
