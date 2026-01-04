import { media } from '@universityofmaryland/web-elements-library/composite';
import * as validation from '@universityofmaryland/web-utilities-library/validation';
import { Attributes, Slots, Register, Lifecycle } from '@universityofmaryland/web-model-library';
import { CreateComponentFunction, SlotConfiguration } from '../../../_types';

/**
 * Tag name for the media inline web component
 */
const tagName = 'umd-element-media-inline';

/**
 * Media Inline
 *
 * A versatile media component for displaying images inline with optional captions or wrapping text.
 * Supports multiple display modes including standard image display, image with caption, and
 * text-wrapped image layouts. Ideal for article content, blog posts, and rich text sections.
 *
 * ## Custom Element
 * `<umd-element-media-inline>`
 *
 * ## Slots
 * - `image` - The media image to display (required, accepts: img)
 * - `caption` - Image caption text (accepts: div, p)
 * - `text` - Text content that wraps around the image (accepts: div, p)
 * - `wrapping-text` - Deprecated: Use "text" slot instead (accepts: div, p)
 *
 * ## Attributes
 * - `data-theme` - Theme options:
 *   - `dark` - Dark background with light text
 * - `data-align` - Image alignment:
 *   - `right` - Aligns image to the right (text wraps on left)
 *
 * @example
 * ```html
 * <!-- Basic inline image -->
 * <umd-element-media-inline>
 *   <img slot="image" src="campus.jpg" alt="Campus view" />
 * </umd-element-media-inline>
 * ```
 *
 * @example
 * ```html
 * <!-- Image with caption -->
 * <umd-element-media-inline>
 *   <img slot="image" src="research-lab.jpg" alt="Research laboratory" />
 *   <p slot="caption">State-of-the-art research facility opened in 2023</p>
 * </umd-element-media-inline>
 * ```
 *
 * @example
 * ```html
 * <!-- Right-aligned image with wrapping text -->
 * <umd-element-media-inline data-align="right">
 *   <img slot="image" src="professor.jpg" alt="Professor teaching" />
 *   <div slot="text">
 *     <p>Our distinguished faculty members bring decades of experience and expertise
 *     to the classroom. They are committed to student success and advancing knowledge
 *     in their fields through groundbreaking research.</p>
 *     <p>With a student-to-faculty ratio of 18:1, students benefit from personalized
 *     attention and mentorship opportunities.</p>
 *   </div>
 * </umd-element-media-inline>
 * ```
 *
 * @example
 * ```html
 * <!-- Dark theme with caption -->
 * <umd-element-media-inline data-theme="dark">
 *   <img slot="image" src="night-campus.jpg" alt="Campus at night" />
 *   <p slot="caption">The campus comes alive with evening activities and events</p>
 * </umd-element-media-inline>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
/**
 * Slot configuration for the media inline component
 */
const slots: SlotConfiguration = {
  caption: {
    allowedElements: ['div', 'p'],
  },
  text: Slots.element.allowed.text,
  wrappingText: {
    allowedElements: ['div', 'p'],
    deprecated:
      'Use "text" instead. This attribute will be removed in version 2.0.',
  },
};

/**
 * Creates a media inline component with the provided configuration
 */
const createComponent: CreateComponentFunction = (element) => {
  const caption = Slots.text.caption({ element });
  const wrappingText =
    Slots.text.default({ element, isDefaultStyling: false }) ||
    Slots.deprecated.wrappingText({ element, isDefaultStyling: false });
  const isAlignmentRight = Attributes.isLayout.alignmentRight({ element });
  const isThemeDark = Attributes.isTheme.dark({ element });
  const hasWrappingText = wrappingText !== null;
  const hasCaption = caption !== null;

  const content = {
    isAlignmentRight,
    isThemeDark,
    caption,
    image: validation.getValidatedSlotImage({
      element,
      slotName: Slots.name.assets.image,
    }),
    wrappingText,
  };

  if (hasWrappingText) {
    return media.inline.wrapped(content);
  }

  if (hasCaption) {
    return media.inline.caption(content);
  }

  return media.inline.standard(content);
};

/**
 * Media Inline
 *
 * A versatile media component for displaying images inline with optional captions or wrapping text.
 * Supports multiple display modes including standard image display, image with caption, and
 * text-wrapped image layouts. Ideal for article content, blog posts, and rich text sections.
 *
 * ## Custom Element
 * `<umd-element-media-inline>`
 *
 * ## Slots
 * - `image` - The media image to display (required, accepts: img)
 * - `caption` - Image caption text (accepts: div, p)
 * - `text` - Text content that wraps around the image (accepts: div, p)
 * - `wrapping-text` - Deprecated: Use "text" slot instead (accepts: div, p)
 *
 * ## Attributes
 * - `data-theme` - Theme options:
 *   - `dark` - Dark background with light text
 * - `data-align` - Image alignment:
 *   - `right` - Aligns image to the right (text wraps on left)
 *
 * @example
 * ```html
 * <!-- Basic inline image -->
 * <umd-element-media-inline>
 *   <img slot="image" src="campus.jpg" alt="Campus view" />
 * </umd-element-media-inline>
 * ```
 *
 * @example
 * ```html
 * <!-- Image with caption -->
 * <umd-element-media-inline>
 *   <img slot="image" src="research-lab.jpg" alt="Research laboratory" />
 *   <p slot="caption">State-of-the-art research facility opened in 2023</p>
 * </umd-element-media-inline>
 * ```
 *
 * @example
 * ```html
 * <!-- Right-aligned image with wrapping text -->
 * <umd-element-media-inline data-align="right">
 *   <img slot="image" src="professor.jpg" alt="Professor teaching" />
 *   <div slot="text">
 *     <p>Our distinguished faculty members bring decades of experience and expertise
 *     to the classroom. They are committed to student success and advancing knowledge
 *     in their fields through groundbreaking research.</p>
 *     <p>With a student-to-faculty ratio of 18:1, students benefit from personalized
 *     attention and mentorship opportunities.</p>
 *   </div>
 * </umd-element-media-inline>
 * ```
 *
 * @example
 * ```html
 * <!-- Dark theme with caption -->
 * <umd-element-media-inline data-theme="dark">
 *   <img slot="image" src="night-campus.jpg" alt="Campus at night" />
 *   <p slot="caption">The campus comes alive with evening activities and events</p>
 * </umd-element-media-inline>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
export const MediaInline = Register.webComponent({
  tagName,
  slots,
  createComponent,
  onReady: Lifecycle.hooks.loadOnConnect,
});

/** Backwards compatibility alias for grouped exports */
export { MediaInline as inline };
