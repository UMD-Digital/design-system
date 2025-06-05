import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots, Register } from 'model';
import { CommonLifecycleHooks } from '../../model/utilities/lifecycle';
import type {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../_types';

// Tag name for the thumbnail carousel component
const tagName = 'umd-element-carousel-thumbnail';

// Slot configuration for the thumbnail carousel component
const slots: SlotConfiguration = {
  blocks: {
    required: true,
  },
};

// Attribute handlers for the thumbnail carousel component
const attributes = Attributes.handler.common.resize((element) =>
  element.events?.resize(),
);

/**
 * Creates a thumbnail carousel component
 * @param element - The host HTML element
 * @returns Configured thumbnail carousel component
 * @internal
 */
const createComponent: CreateComponentFunction = (element) => {
  const slottedBlocks = Array.from(
    element.querySelectorAll(`[slot="${Slots.name.BLOCKS}"] > *`),
  ) as HTMLElement[];

  const blocks = slottedBlocks.map((block) =>
    block.cloneNode(true),
  ) as HTMLElement[];

  return Composite.carousel.thumbnail({
    blocks,
    isThemeDark: Attributes.isTheme.dark({ element }),
  });
};

/**
 * Thumbnail Carousel
 *
 * A carousel component with thumbnail navigation for browsing through content.
 *
 * ## Custom Element
 * `<umd-element-carousel-thumbnail>`
 *
 * ## Slots
 * - `blocks` - Container for carousel items with thumbnails (required, accepts: elements with data-thumbnail attribute)
 *
 * ## Attributes
 * - `data-theme` - Visual theme:
 *   - `light` - Light theme (default)
 *   - `dark` - Dark theme
 *
 * ## Observed Attributes
 * - `resize` - Triggers carousel size recalculation
 *
 * @example
 * ```html
 * <umd-element-carousel-thumbnail>
 *   <div slot="blocks">
 *     <div data-thumbnail="thumb1.jpg">
 *       <img src="image1.jpg" alt="Image 1">
 *       <p>Caption for image 1</p>
 *     </div>
 *     <div data-thumbnail="thumb2.jpg">
 *       <img src="image2.jpg" alt="Image 2">
 *       <p>Caption for image 2</p>
 *     </div>
 *   </div>
 * </umd-element-carousel-thumbnail>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const registration: ComponentRegistration = Register.webComponent({
  tagName,
  slots,
  createComponent,
  attributes: [attributes],
  afterConnect: CommonLifecycleHooks.loadOnConnect,
});

export default registration;
