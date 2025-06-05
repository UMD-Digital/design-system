import { Composite } from '@universityofmaryland/web-elements-library';
import type { CreateComponentFunction, ComponentRegistration, SlotConfiguration } from '../_types';
import { createComponentRegistration } from '../../model/utilities/register';
import { Attributes, Slots } from 'model';
import { Markup } from 'utilities';

// Tag name for the icon card component
const tagName = 'umd-element-card-icon';

// Slot configuration for the icon card component
const slots: SlotConfiguration = {
  headline: {
    ...Slots.element.allowed.headline,
    required: true,
  },
  text: Slots.element.allowed.text,
  image: {
    ...Slots.element.allowed.image,
    required: true,
  },
};

/**
 * Creates an icon card component with overlay styling
 * @param element - The host HTML element
 * @returns Configured icon card component
 * @internal
 */
const createComponent: CreateComponentFunction = (element) =>
  Composite.card.overlay.icon({
    image: Markup.validate.ImageSlot({
      element,
      ImageSlot: Slots.name.assets.image,
    }),
    headline: Slots.headline.default({ element }),
    text: Slots.text.default({ element }),
    isThemeDark: Attributes.isTheme.dark({ element }),
  });

/**
 * Icon Card
 * 
 * A card component with an icon overlay design, perfect for highlighting
 * services, features, or categories with visual emphasis.
 * 
 * ## Custom Element
 * `<umd-element-card-icon>`
 * 
 * ## Slots
 * - `headline` - Card title (required, accepts: h2-h6, p)
 * - `text` - Card description (optional, accepts: p)
 * - `image` - Icon or image (required)
 * 
 * ## Attributes
 * - `data-theme` - Theme styling options:
 *   - `dark` - Dark theme styling
 * 
 * @example
 * ```html
 * <!-- Basic icon card -->
 * <umd-element-card-icon>
 *   <img slot="image" src="/icons/research.svg" alt="Research icon">
 *   <h3 slot="headline">Research Excellence</h3>
 *   <p slot="text">Cutting-edge research across disciplines</p>
 * </umd-element-card-icon>
 * ```
 * 
 * @example
 * ```html
 * <!-- Dark theme icon card -->
 * <umd-element-card-icon data-theme="dark">
 *   <img slot="image" src="/icons/education.svg" alt="Education icon">
 *   <h3 slot="headline">Academic Programs</h3>
 *   <p slot="text">Over 200 degree programs to choose from</p>
 * </umd-element-card-icon>
 * ```
 * 
 * @example
 * ```html
 * <!-- Service highlight cards -->
 * <div class="services-grid">
 *   <umd-element-card-icon>
 *     <img slot="image" src="/icons/library.svg" alt="Library">
 *     <h4 slot="headline">Libraries</h4>
 *     <p slot="text">Access to millions of resources</p>
 *   </umd-element-card-icon>
 *   <umd-element-card-icon>
 *     <img slot="image" src="/icons/support.svg" alt="Support">
 *     <h4 slot="headline">Student Support</h4>
 *     <p slot="text">Comprehensive academic assistance</p>
 *   </umd-element-card-icon>
 * </div>
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
