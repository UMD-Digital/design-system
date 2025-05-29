import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';

/**
 * Tag name for the thumbnail carousel component
 * @internal
 */
const tagName = 'umd-element-carousel-thumbnail';

const slots = {
  blocks: {
    required: true,
  },
};

const attributes = Attributes.handler.combine(
  Attributes.handler.observe.resize({
    callback: (element) => element.events?.resize(),
  }),
);

const createComponent = (element: HTMLElement) => {
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
 * Thumbnail Carousel Component
 * 
 * A carousel component with thumbnail navigation for browsing through content.
 * Each item can have an associated thumbnail for visual navigation.
 * 
 * ## Custom Element
 * `<umd-element-carousel-thumbnail>`
 * 
 * ## Slots
 * - `blocks` - Container for carousel items with thumbnails (required)
 * 
 * ## Attributes
 * - `data-theme` - Theme options:
 *   - `dark` - Dark theme styling
 * 
 * ## Observed Attributes
 * - `resize` - Triggers carousel recalculation
 * 
 * @example
 * ```html
 * <!-- Basic thumbnail carousel -->
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
 * @example
 * ```html
 * <!-- Dark theme thumbnail carousel -->
 * <umd-element-carousel-thumbnail data-theme="dark">
 *   <div slot="blocks">
 *     <article data-thumbnail="preview1.jpg">
 *       <h3>Article 1</h3>
 *       <p>Article content with thumbnail navigation</p>
 *     </article>
 *     <article data-thumbnail="preview2.jpg">
 *       <h3>Article 2</h3>
 *       <p>Article content with thumbnail navigation</p>
 *     </article>
 *   </div>
 * </umd-element-carousel-thumbnail>
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
