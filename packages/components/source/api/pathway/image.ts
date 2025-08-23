import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots, Register, Lifecycle } from 'model';
import { extractEventData } from '../_event';
import { CreateComponentFunction } from '../_types';

/**
 * Tag name for the pathway web component
 */
const tagName = 'umd-element-pathway';

/**
 * Creates a pathway component with the provided configuration
 */
const createComponent: CreateComponentFunction = (element) => {
  const isImageScaledDeprecated =
    element.getAttribute('image-scaled') === 'false' ? false : undefined;

  const isImageScaled =
    isImageScaledDeprecated ?? Attributes.isLayout.imageScaled({ element });
  const isImagePositionLeft = Attributes.isLayout.imagePositionLeft({
    element,
  });
  const isThemeDark = Attributes.isTheme.dark({ element });
  const isThemeLight = Attributes.isTheme.light({ element });
  const isThemeMaryland = Attributes.isTheme.maryland({ element });
  const isDisplayHero = Attributes.isDisplay.hero({ element });
  const isDisplayOverlay = Attributes.isDisplay.overlay({ element });
  const isDisplaySticky = Attributes.isDisplay.sticky({ element });
  const includesAnimation = Attributes.includesFeature.animation({ element });

  if (isDisplayHero) {
    return Composite.pathway.hero({
      actions: Slots.actions.default({ element }),
      eyebrow: Slots.eyebrow.default({ element }),
      headline: Slots.headline.default({ element }),
      image: Slots.assets.image({ element }) as HTMLImageElement,
      includesAnimation,
      isImagePositionLeft,
      text: Slots.text.default({ element }),
      video: Slots.assets.video({ element }) as HTMLVideoElement,
    });
  }

  if (isDisplayOverlay) {
    return Composite.pathway.overlay({
      action: Slots.actions.default({ element }),
      eyebrow: Slots.eyebrow.default({ element }),
      headline: Slots.headline.default({ element }),
      image: Slots.assets.image({ element }) as HTMLImageElement,
      includesAnimation,
      isImagePositionLeft,
      isImageScaled,
      isThemeDark,
      isThemeLight,
      isThemeMaryland,
      stats: Slots.text.stats({ element }),
      text: Slots.text.default({ element }),
      video: Slots.assets.video({ element }) as HTMLVideoElement,
    });
  }

  if (isDisplaySticky) {
    return Composite.pathway.sticky({
      actions: Slots.actions.default({ element }),
      eyebrow: Slots.eyebrow.default({ element }),
      headline: Slots.headline.default({ element }),
      image: Slots.assets.image({ element }) as HTMLImageElement,
      isImagePositionLeft,
      isImageScaled,
      isThemeDark: Attributes.isTheme.dark({ element }),
      text: Slots.text.default({ element }),
      video: Slots.assets.video({ element }) as HTMLVideoElement,
    });
  }

  const featureEvents = extractEventData(element, {
    isLargeSize: true,
    isDateSignDark: false,
  });

  return Composite.pathway.standard({
    actions: Slots.actions.default({ element }),
    dateSign: featureEvents?.dateSign,
    eventDetails: featureEvents?.eventMeta,
    eyebrow: Slots.eyebrow.default({ element }),
    headline: Slots.headline.default({ element }),
    image: Slots.assets.image({ element }) as HTMLImageElement,
    includesAnimation,
    isImagePositionLeft,
    isImageScaled,
    isThemeDark,
    isThemeMaryland,
    stats: Slots.text.stats({ element }),
    text: Slots.text.default({ element }),
    video: Slots.assets.video({ element }) as HTMLVideoElement,
  });
};

/**
 * Pathway
 *
 * A versatile component for creating visual pathways that guide users to take action.
 * Supports multiple display types including standard, hero, overlay, and sticky layouts.
 * Can include images, videos, event information, statistics, and rich text content.
 *
 * ## Custom Element
 * `<umd-element-pathway>`
 *
 * ## Slots
 * - `eyebrow` - Small text above headline (optional, accepts: text elements)
 * - `headline` - Main heading (optional, accepts: heading elements)
 * - `text` - Descriptive body text (optional, accepts: text elements)
 * - `actions` - Call-to-action links or buttons (optional, accepts: a, button)
 * - `image` - Featured image (optional, accepts: img)
 * - `video` - Video content (optional, accepts: video, iframe)
 * - `stats` - Statistical information or metrics (optional, accepts: any elements)
 * - `date-start-iso` - Event start date in ISO format (optional, accepts: time)
 * - `date-end-iso` - Event end date in ISO format (optional, accepts: time)
 * - `location` - Event location information (optional, accepts: text elements)
 *
 * ## Attributes
 * - `data-display` - Display variant (deprecated, use specific pathway components):
 *   - `hero` - Large hero display
 *   - `overlay` - Text overlaid on image
 *   - `sticky` - Sticky positioned elements
 *   - Default - Standard layout
 * - `data-theme` - Color theme options:
 *   - `dark` - Dark background with light text
 *   - `light` - Light background with dark text
 *   - `maryland` - University brand colors
 * - `data-animation` - Enable scroll-triggered animations:
 *   - `true` - Enables entrance animations
 * - `data-layout-image-position` - Image placement:
 *   - `left` - Image on the left side
 *   - Default - Image on the right side
 * - `data-layout-image-scaled` - Image scaling behavior:
 *   - `false` - Disable image scaling
 *   - Default - Enable responsive scaling
 * - `data-visual-time` - Show time in event details:
 *   - `false` - Hide time display
 *   - Default - Show time if available
 *
 * @example
 * ```html
 * <!-- Basic pathway -->
 * <umd-element-pathway>
 *   <span slot="eyebrow">Discover</span>
 *   <h2 slot="headline">Your Path to Success</h2>
 *   <p slot="text">Explore programs designed to help you achieve your goals.</p>
 *   <img slot="image" src="pathway.jpg" alt="Student success" />
 *   <a slot="actions" href="/programs">Explore Programs</a>
 * </umd-element-pathway>
 * ```
 *
 * @example
 * ```html
 * <!-- Event pathway with details -->
 * <umd-element-pathway data-theme="maryland" data-visual-time="true">
 *   <h2 slot="headline">Open House</h2>
 *   <p slot="text">Visit campus and discover what makes UMD special.</p>
 *   <time slot="date-start-iso" datetime="2024-04-15T10:00:00">April 15, 2024 10:00 AM</time>
 *   <time slot="date-end-iso" datetime="2024-04-15T16:00:00">April 15, 2024 4:00 PM</time>
 *   <span slot="location">McKeldin Mall</span>
 *   <img slot="image" src="open-house.jpg" alt="Campus open house" />
 *   <a slot="actions" href="/register">Register Now</a>
 * </umd-element-pathway>
 * ```
 *
 * @example
 * ```html
 * <!-- Hero pathway with video and stats -->
 * <umd-element-pathway data-display="hero" data-theme="dark" data-animation="true">
 *   <span slot="eyebrow">Research Excellence</span>
 *   <h1 slot="headline">Pushing Boundaries</h1>
 *   <p slot="text">Our researchers are tackling the world's biggest challenges.</p>
 *   <iframe slot="video" src="https://youtube.com/embed/..." title="Research video"></iframe>
 *   <div slot="stats">
 *     <div class="stat">
 *       <span class="number">$500M</span>
 *       <span class="label">Research Funding</span>
 *     </div>
 *     <div class="stat">
 *       <span class="number">2,000+</span>
 *       <span class="label">Active Projects</span>
 *     </div>
 *   </div>
 *   <div slot="actions">
 *     <a href="/research">Explore Research</a>
 *     <a href="/partnerships">Partner With Us</a>
 *   </div>
 * </umd-element-pathway>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
export default Register.webComponent({
  tagName,
  createComponent,
  afterConnect: Lifecycle.hooks.loadAnimation,
});
