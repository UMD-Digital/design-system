import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { Markup } from 'utilities';

/**
 * Tag name for the base carousel component
 * @internal
 */
const tagName = 'umd-element-carousel';

/**
 * Slot configuration for the base carousel component
 * @internal
 */
const slots = {
  blocks: {
    required: true,
  },
};

/**
 * Attribute handlers for the base carousel component
 * @internal
 */
const attributes = Attributes.handler.combine(
  Attributes.handler.observe.resize({
    callback: (element) => element.events?.resize(),
  }),
);

/**
 * Creates a base carousel component
 * @param element - The host HTML element
 * @returns Configured carousel component
 * @internal
 */
const createComponent = (element: HTMLElement) => {
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
    const slot = Markup.create.Node.slot({ type: Slots.name.BLOCKS });
    shadow.appendChild(slot);
  };

  createCardShadowRef();

  const shadowRef = shadow.querySelector(
    `[name="${Slots.name.BLOCKS}"]`,
  ) as HTMLElement;

  return Composite.carousel.macro({
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
 * Base Carousel Component
 * 
 * A versatile carousel component for displaying scrollable content blocks with navigation controls.
 * Supports responsive layouts and customizable navigation options.
 * 
 * ## Custom Element
 * `<umd-element-carousel>`
 * 
 * ## Slots
 * - `blocks` - Container for carousel items (required)
 * 
 * ## Attributes
 * - `data-navigation-left` - Left button visibility options:
 *   - `true` - Show left navigation button (default)
 *   - `false` - Hide left navigation button
 * - `data-navigation-right` - Right button visibility options:
 *   - `true` - Show right navigation button (default)
 *   - `false` - Hide right navigation button
 * - `data-hint-mobile` - Mobile swipe hint options:
 *   - `true` - Show mobile swipe hint (default)
 *   - `false` - Hide mobile swipe hint
 * - `data-hint` - Navigation hint options:
 *   - `true` - Show navigation hint (default)
 *   - `false` - Hide navigation hint
 * - `data-theme` - Theme options:
 *   - `dark` - Dark theme styling
 * 
 * ## Layout Attributes
 * - `tablet-size` - Number of items visible on tablet
 * - `desktop-size` - Number of items visible on desktop
 * - `tablet-count` - Total item count for tablet view
 * - `desktop-count` - Total item count for desktop view
 * - `max-count` - Maximum number of items to display
 * - `grid-gap-pixels` - Gap between items in pixels
 * 
 * ## Observed Attributes
 * - `resize` - Triggers carousel recalculation
 * 
 * @example
 * ```html
 * <!-- Basic carousel -->
 * <umd-element-carousel>
 *   <div slot="blocks">
 *     <div>Item 1</div>
 *     <div>Item 2</div>
 *     <div>Item 3</div>
 *   </div>
 * </umd-element-carousel>
 * ```
 * 
 * @example
 * ```html
 * <!-- Carousel with custom navigation and dark theme -->
 * <umd-element-carousel 
 *   data-theme="dark"
 *   data-navigation-left="false"
 *   data-hint-mobile="false"
 *   desktop-size="3"
 *   tablet-size="2">
 *   <div slot="blocks">
 *     <article>Content 1</article>
 *     <article>Content 2</article>
 *     <article>Content 3</article>
 *     <article>Content 4</article>
 *   </div>
 * </umd-element-carousel>
 * ```
 * 
 * @example
 * ```html
 * <!-- Carousel with gap and max count -->
 * <umd-element-carousel 
 *   max-count="6"
 *   grid-gap-pixels="20"
 *   desktop-size="4">
 *   <div slot="blocks">
 *     <!-- Multiple items -->
 *   </div>
 * </umd-element-carousel>
 * ```
 * 
 * @category Components
 * @since 1.0.0
 */
export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      slots,
      createComponent,
      attributes,
      afterConnect: (ref) => ref?.events?.load(),
    }),
  });
};
