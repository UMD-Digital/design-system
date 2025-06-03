import { Composite } from '@universityofmaryland/web-elements-library';
import { Slots } from 'model';
import { Markup } from 'utilities';
import {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../_types';
import { createComponentRegistration } from '../../model/utilities/register';

const tagName = 'umd-layout-image-expand';

const slots: SlotConfiguration = {
  content: {
    required: true,
  },
  image: {
    required: true,
  },
};

const createComponent: CreateComponentFunction = (element) =>
  Composite.layout.image.expand({
    content: Markup.create.Node.slot({ type: 'content' }),
    image: Markup.validate.ImageSlot({
      element,
      ImageSlot: Slots.name.assets.image,
    }) as HTMLImageElement,
  });

/**
 * Image Expand Layout
 *
 * A layout component that presents content alongside an expandable image. The image can extend
 * beyond the normal content boundaries to create visual impact. Ideal for showcasing featured
 * content, hero sections, or highlighting important information with striking visuals.
 *
 * ## Custom Element
 * `<umd-layout-image-expand>`
 *
 * ## Slots
 * - `content` - Main content area (required, accepts: any elements)
 * - `image` - Featured image that can expand (required, accepts: img)
 *
 * @example
 * ```html
 * <!-- Basic image expand layout -->
 * <umd-layout-image-expand>
 *   <div slot="content">
 *     <h2>Featured Research</h2>
 *     <p>Breakthrough discoveries in quantum computing...</p>
 *   </div>
 *   <img slot="image" src="research-lab.jpg" alt="Quantum Lab" />
 * </umd-layout-image-expand>
 * ```
 *
 * @example
 * ```html
 * <!-- With rich content -->
 * <umd-layout-image-expand>
 *   <article slot="content">
 *     <h1>Campus Innovation Hub</h1>
 *     <p>The new Innovation Hub brings together students, faculty, and industry partners...</p>
 *     <a href="/innovation">Learn More</a>
 *   </article>
 *   <img slot="image" src="innovation-hub.jpg" alt="Innovation Hub Interior" />
 * </umd-layout-image-expand>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const registration: ComponentRegistration = createComponentRegistration({
  tagName,
  slots,
  createComponent,
});

export default registration;
