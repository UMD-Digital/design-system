import { layout } from '@universityofmaryland/web-elements-library/composite';
import * as validation from '@universityofmaryland/web-utilities-library/validation';
import { Attributes, Slots, Register } from '@universityofmaryland/web-model-library';
import {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../../_types';

const tagName = 'umd-element-logo';

const slots: SlotConfiguration = {
  image: {
    required: true,
  },
};

const createComponent: CreateComponentFunction = (element) =>
  layout.box.logo({
    image: validation.getValidatedSlotImage({
      element,
      slotName: Slots.name.assets.image,
    }) as HTMLImageElement,
    text: Slots.text.default({ element }),
    isThemeDark: Attributes.isTheme.dark({ element }),
    isBordered: Attributes.isVisual.bordered({ element }),
  });

/**
 * Box Logo
 *
 * A layout component that displays a logo image with optional text content in a boxed layout.
 * Commonly used for brand identity sections, partner logos, or featured organization displays.
 *
 * ## Custom Element
 * `<umd-element-logo>`
 *
 * ## Slots
 * - `image` - Logo image (required, accepts: img)
 * - Default slot - Optional text content to display alongside the logo
 *
 * ## Attributes
 * - `data-theme` - Theme options:
 *   - `dark` - Dark background with light text
 * - `data-visual` - Visual styling options:
 *   - `bordered` - Adds a border around the component
 *
 * @example
 * ```html
 * <!-- Basic logo display -->
 * <umd-element-logo>
 *   <img slot="image" src="logo.png" alt="Company Logo" />
 * </umd-element-logo>
 * ```
 *
 * @example
 * ```html
 * <!-- Logo with text and dark theme -->
 * <umd-element-logo data-theme="dark">
 *   <img slot="image" src="partner-logo.png" alt="Partner Logo" />
 *   <p>Official University Partner</p>
 * </umd-element-logo>
 * ```
 *
 * @example
 * ```html
 * <!-- Bordered logo box -->
 * <umd-element-logo data-visual="bordered">
 *   <img slot="image" src="sponsor.png" alt="Sponsor Logo" />
 *   <span>Gold Sponsor</span>
 * </umd-element-logo>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
export const LayoutBoxLogo: ComponentRegistration = Register.webComponent({
  tagName,
  slots,
  createComponent,
});

/** Backwards compatibility alias for grouped exports */
export { LayoutBoxLogo as boxLogo };
