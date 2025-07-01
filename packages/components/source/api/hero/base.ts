import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Lifecycle, Slots, Register } from 'model';
import { Markup } from 'utilities';
import { CommonHeroData } from './common';
import type { CreateComponentFunction, ComponentRegistration } from '../_types';

/**
 * Tag name for the base hero component
 * @internal
 */
const tagName = 'umd-element-hero';

/**
 * Creates a hero component based on type attribute
 * @param element - The host HTML element
 * @returns Configured hero component
 * @internal
 */
const createComponent: CreateComponentFunction = (element) => {
  const makeSlots = ({ element }: { element: HTMLElement }) => ({
    eyebrow: Slots.eyebrow.default({ element }),
    headline: Slots.headline.default({ element }),
    text: Slots.text.default({ element }),
    video: Slots.assets.video({ element }) as HTMLVideoElement | null,
    image: Slots.assets.image({ element }) as HTMLImageElement | null,
    actions: Slots.actions.default({ element }),
  });
  const includesAnimation = Attributes.includesFeature.animation({ element });

  if (Attributes.isDisplay.overlay({ element })) {
    return Composite.hero.overlay({
      ...makeSlots({ element }),
      includesAnimation,
    });
  }

  const type = element.getAttribute('type');

  const isThemeDark = Attributes.isTheme.dark({ element });
  let isTextCenter = Attributes.isLayout.textCentered({ element });

  let isInterior = false;
  let isWithLock = false;

  if (type === Attributes.values.layout.DEFAULT_CENTERED) {
    isTextCenter = true;
  }

  if (type === Attributes.values.layout.DEFAULT_INTERIOR) {
    isInterior = true;
  }

  if (type === Attributes.values.layout.DEFAULT_INTERIOR_CENTERED) {
    isInterior = true;
    isTextCenter = true;
  }

  if (type === Attributes.values.layout.STACKED_INTERIOR) {
    isWithLock = true;
  }

  if (
    type === Attributes.values.display.stacked ||
    type === Attributes.values.layout.STACKED_INTERIOR
  ) {
    return Composite.hero.stacked({
      ...makeSlots({ element }),
      isInterior,
      isWithLock,
      isThemeDark,
    });
  }

  return Composite.hero.standard({
    ...makeSlots({ element }),
    isInterior,
    isTextCenter,
    isThemeDark,
  });
};

/**
 * Base Hero Component
 *
 * A versatile hero component with multiple layout options for page headers.
 * Supports various content arrangements and visual styles.
 *
 * ## Custom Element
 * `<umd-element-hero>`
 *
 * ## Slots
 * - `eyebrow` - Small text above headline
 * - `headline` - Main hero heading (required)
 * - `text` - Supporting text content
 * - `image` - Hero image
 * - `video` - Hero video
 * - `actions` - Call-to-action buttons/links
 *
 * ## Attributes
 * - `type` - Layout type options:
 *   - `default-centered` - Default layout with centered text
 *   - `default-interior` - Interior page layout
 *   - `default-interior-centered` - Interior with centered text
 *   - `stacked` - Stacked content layout
 *   - `stacked-interior` - Stacked layout with lock element
 *   - `minimal` - Minimal hero style
 *   - `overlay` - Content overlaid on image/video
 * - `data-theme` - Theme options:
 *   - `dark` - Dark theme styling
 * - `data-feature` - Feature options:
 *   - `animation` - Enable animations
 * - `data-visual-align` - Alignment options:
 *   - `center` - Center align text
 *
 * @example
 * ```html
 * <!-- Basic hero -->
 * <umd-element-hero>
 *   <h1 slot="headline">Welcome to Maryland</h1>
 *   <p slot="text">Fearlessly Forward</p>
 *   <img slot="image" src="campus.jpg" alt="Campus view">
 * </umd-element-hero>
 * ```
 *
 * @example
 * ```html
 * <!-- Overlay hero with video -->
 * <umd-element-hero type="overlay" data-theme="dark">
 *   <p slot="eyebrow">Discover</p>
 *   <h1 slot="headline">Your Future Starts Here</h1>
 *   <p slot="text">Join a community of innovators and leaders</p>
 *   <video slot="video" autoplay muted loop>
 *     <source src="campus-video.mp4" type="video/mp4">
 *   </video>
 *   <div slot="actions">
 *     <a href="/apply">Apply Now</a>
 *     <a href="/visit">Plan Your Visit</a>
 *   </div>
 * </umd-element-hero>
 * ```
 *
 * @example
 * ```html
 * <!-- Minimal interior hero -->
 * <umd-element-hero type="minimal" data-visual-align="center">
 *   <h1 slot="headline">About the University</h1>
 *   <p slot="text">Founded in 1856, the University of Maryland...</p>
 * </umd-element-hero>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const BaseHero: ComponentRegistration = Register.webComponent({
  tagName,
  createComponent,
  afterConnect: Lifecycle.hooks.loadOnConnect,
});

export default BaseHero;
