import { Composite } from '@universityofmaryland/web-elements-library';
import {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../../_types';
import { Attributes, Model, Register, Slots } from 'model';
import { Markup } from 'utilities';

const tagName = 'umd-element-quote';

/**
 * Quote Display
 *
 * A component for displaying quotes, testimonials, and pull quotes with attribution.
 * Supports both inline and featured layouts with optional imagery and call-to-action.
 * Perfect for highlighting testimonials, expert opinions, or memorable statements.
 *
 * ## Custom Element
 * `<umd-element-quote>`
 *
 * ## Slots
 * - `quote` - The quote text content (required, accepts: text elements)
 * - `attribution` - Person or source of the quote (optional, accepts: text elements)
 * - `attribution-sub-text` - Additional attribution info like title or affiliation (optional, accepts: text elements)
 * - `image` - Portrait or related image (optional, accepts: img)
 * - `actions` - Call-to-action links (optional, accepts: a, button)
 *
 * ## Attributes
 * - `data-theme` - Color theme of the component:
 *   - `dark` - Dark background with light text
 *   - `maryland` - University brand colors
 * - `data-visual` - Visual styling options:
 *   - `transparent` - Transparent background
 *   - `size-large` - Larger text size for emphasis
 * - `data-display` - Layout variant:
 *   - `featured` - Featured quote with enhanced styling
 *   - Default - Inline quote layout
 *
 * @example
 * ```html
 * <!-- Basic inline quote -->
 * <umd-element-quote>
 *   <blockquote slot="quote">
 *     "The University of Maryland has provided me with countless opportunities
 *     to grow both academically and personally."
 *   </blockquote>
 *   <cite slot="attribution">Sarah Johnson</cite>
 *   <span slot="attribution-sub-text">Class of 2024</span>
 * </umd-element-quote>
 * ```
 *
 * @example
 * ```html
 * <!-- Featured quote with image -->
 * <umd-element-quote data-display="featured" data-visual="size-large">
 *   <img slot="image" src="alumnus.jpg" alt="John Smith" />
 *   <blockquote slot="quote">
 *     "My education at Maryland prepared me to tackle real-world challenges
 *     and make a difference in my community."
 *   </blockquote>
 *   <cite slot="attribution">John Smith</cite>
 *   <span slot="attribution-sub-text">CEO, Tech Innovations Inc.</span>
 *   <a slot="actions" href="/alumni-stories">Read More Alumni Stories</a>
 * </umd-element-quote>
 * ```
 *
 * @example
 * ```html
 * <!-- Large quote with dark theme -->
 * <umd-element-quote data-theme="dark" data-visual="size-large">
 *   <blockquote slot="quote">
 *     "Research at the University of Maryland is pushing the boundaries
 *     of what's possible in quantum computing."
 *   </blockquote>
 *   <cite slot="attribution">Dr. Michelle Lee</cite>
 *   <span slot="attribution-sub-text">Director, Quantum Research Lab</span>
 * </umd-element-quote>
 * ```
 *
 * @example
 * ```html
 * <!-- Maryland theme testimonial -->
 * <umd-element-quote data-theme="maryland" data-visual="transparent">
 *   <blockquote slot="quote">
 *     "The diversity of perspectives and experiences at UMD enriches
 *     every classroom discussion and research project."
 *   </blockquote>
 *   <cite slot="attribution">Professor David Chen</cite>
 *   <span slot="attribution-sub-text">Department of Sociology</span>
 *   <a slot="actions" href="/diversity">Learn About Our Community</a>
 * </umd-element-quote>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const slots: SlotConfiguration = {
  quote: {
    required: true,
  },
};

const MakeData = ({ element }: { element: HTMLElement }) => {
  const isThemeDark = Attributes.isTheme.dark({ element });
  const isThemeMaryland = Attributes.isTheme.maryland({ element });
  const isTransparent = Attributes.isVisual.transparent({ element });

  return {
    quote: Markup.create.SlotWithDefaultStyling({
      element,
      slotRef: Slots.name.QUOTE,
    }),
    image: Markup.create.SlotWithDefaultStyling({
      element,
      slotRef: Slots.name.assets.image,
    }),
    attribution: Markup.create.SlotWithDefaultStyling({
      element,
      slotRef: Slots.name.ATTRIBUTION,
    }),
    attributionSubText: Markup.create.SlotWithDefaultStyling({
      element,
      slotRef: Slots.name.ATTRIBUTION_SUB_TEXT,
    }),
    action: Slots.actions.default({ element }),
    isTransparent,
    isThemeDark,
    isThemeMaryland,
  };
};

const createComponent: CreateComponentFunction = (element) => {
  const isSizeLarge = Attributes.isVisual.sizeLarge({ element });
  const isTypeFeatured = Attributes.isDisplay.featured({ element });

  if (isTypeFeatured) {
    return Composite.quote.featured({
      ...MakeData({ element }),
      isSizeLarge,
    });
  }

  return Composite.quote.inline({
    ...MakeData({ element }),
    isSizeLarge,
  });
};

/**
 * Quote Display
 *
 * A component for displaying quotes, testimonials, and pull quotes with attribution.
 * Supports both inline and featured layouts with optional imagery and call-to-action.
 * Perfect for highlighting testimonials, expert opinions, or memorable statements.
 *
 * ## Custom Element
 * `<umd-element-quote>`
 *
 * ## Slots
 * - `quote` - The quote text content (required, accepts: text elements)
 * - `attribution` - Person or source of the quote (optional, accepts: text elements)
 * - `attribution-sub-text` - Additional attribution info like title or affiliation (optional, accepts: text elements)
 * - `image` - Portrait or related image (optional, accepts: img)
 * - `actions` - Call-to-action links (optional, accepts: a, button)
 *
 * ## Attributes
 * - `data-theme` - Color theme of the component:
 *   - `dark` - Dark background with light text
 *   - `maryland` - University brand colors
 * - `data-visual` - Visual styling options:
 *   - `transparent` - Transparent background
 *   - `size-large` - Larger text size for emphasis
 * - `data-display` - Layout variant:
 *   - `featured` - Featured quote with enhanced styling
 *   - Default - Inline quote layout
 *
 * @example
 * ```html
 * <!-- Basic inline quote -->
 * <umd-element-quote>
 *   <blockquote slot="quote">
 *     "The University of Maryland has provided me with countless opportunities
 *     to grow both academically and personally."
 *   </blockquote>
 *   <cite slot="attribution">Sarah Johnson</cite>
 *   <span slot="attribution-sub-text">Class of 2024</span>
 * </umd-element-quote>
 * ```
 *
 * @example
 * ```html
 * <!-- Featured quote with image -->
 * <umd-element-quote data-display="featured" data-visual="size-large">
 *   <img slot="image" src="alumnus.jpg" alt="John Smith" />
 *   <blockquote slot="quote">
 *     "My education at Maryland prepared me to tackle real-world challenges
 *     and make a difference in my community."
 *   </blockquote>
 *   <cite slot="attribution">John Smith</cite>
 *   <span slot="attribution-sub-text">CEO, Tech Innovations Inc.</span>
 *   <a slot="actions" href="/alumni-stories">Read More Alumni Stories</a>
 * </umd-element-quote>
 * ```
 *
 * @example
 * ```html
 * <!-- Large quote with dark theme -->
 * <umd-element-quote data-theme="dark" data-visual="size-large">
 *   <blockquote slot="quote">
 *     "Research at the University of Maryland is pushing the boundaries
 *     of what's possible in quantum computing."
 *   </blockquote>
 *   <cite slot="attribution">Dr. Michelle Lee</cite>
 *   <span slot="attribution-sub-text">Director, Quantum Research Lab</span>
 * </umd-element-quote>
 * ```
 *
 * @example
 * ```html
 * <!-- Maryland theme testimonial -->
 * <umd-element-quote data-theme="maryland" data-visual="transparent">
 *   <blockquote slot="quote">
 *     "The diversity of perspectives and experiences at UMD enriches
 *     every classroom discussion and research project."
 *   </blockquote>
 *   <cite slot="attribution">Professor David Chen</cite>
 *   <span slot="attribution-sub-text">Department of Sociology</span>
 *   <a slot="actions" href="/diversity">Learn About Our Community</a>
 * </umd-element-quote>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const registration: ComponentRegistration = Register.webComponent({
  tagName,
  slots,
  createComponent,
});

export default registration;
