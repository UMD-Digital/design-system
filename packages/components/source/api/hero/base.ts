import { hero } from '@universityofmaryland/web-elements-library/composite';
import { Attributes, Lifecycle, Slots, Register } from 'model';
import type {
  CreateComponentFunction,
  ComponentRegistration,
} from '../../_types';

const tagName = 'umd-element-hero';

const createComponent: CreateComponentFunction = (element) => {
  const makeSlots = ({ element }: { element: HTMLElement }) => ({
    eyebrow: Slots.eyebrow.default({ element }),
    headline: Slots.headline.default({ element }),
    text: Slots.text.default({ element }),
    video: Slots.assets.video({ element }) as HTMLVideoElement | null,
    image: Slots.assets.image({ element }) as HTMLImageElement | null,
    actions: Slots.actions.default({ element }),
  });
  const isDisplayOverlay = Attributes.isDisplay.overlay({ element });
  const isDisplayStacked = Attributes.isDisplay.stacked({ element });
  const includesAnimation = Attributes.includesFeature.animation({ element });
  const isThemeDark = Attributes.isTheme.dark({ element });

  if (isDisplayOverlay) {
    return hero.overlay({
      ...makeSlots({ element }),
      includesAnimation,
    });
  }

  if (isDisplayStacked) {
    return hero.stacked({
      ...makeSlots({ element }),
      isHeightSmall: Attributes.isLayout.heightSmall({ element }) || false,
      isWidthLarge:
        Attributes.isLayout.spaceHorizontalLarge({ element }) || false,
      isThemeDark,
      includesAnimation,
      topPosition: Attributes.getValue.topPosition({
        element,
      }),
    });
  }

  // Deprecated usage
  if (
    Attributes.isDisplay.stackedInterior({
      element,
    })
  ) {
    return hero.stacked({
      ...makeSlots({ element }),
      isHeightSmall: true,
      isWidthLarge: true,
      isThemeDark,
      includesAnimation,
    });
  }

  // Deprecated usage
  if (
    Attributes.isDisplay.standardCentered({
      element,
    })
  ) {
    return hero.standard({
      ...makeSlots({ element }),
      isTextCenter: true,
      isHeightSmall: false,
      includesAnimation,
    });
  }

  // Deprecated usage
  if (
    Attributes.isDisplay.standardInterior({
      element,
    })
  ) {
    return hero.standard({
      ...makeSlots({ element }),
      isHeightSmall: true,
      isThemeDark,
      includesAnimation,
    });
  }

  // Deprecated usage
  if (
    Attributes.isDisplay.standardInteriorCentered({
      element,
    })
  ) {
    return hero.standard({
      ...makeSlots({ element }),
      isHeightSmall: true,
      isTextCenter: true,
      includesAnimation,
    });
  }

  return hero.standard({
    ...makeSlots({ element }),
    isHeightSmall: Attributes.isLayout.heightSmall({ element }) || false,
    isTextCenter: Attributes.isLayout.textCentered({ element }) || false,
    isThemeDark,
    includesAnimation,
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
 * - `data-display` - Display type options:
 *   - `standard` - Standard hero layout (default)
 *   - `stacked` - Stacked content layout
 *   - `overlay` - Content overlaid on image/video
 * - `data-layout-space-horizontal` - Horizontal spacing options:
 *   - `large` - Large horizontal spacing (see https://designsystem.umd.edu/foundation/horizontal-spacing)
 * - `data-layout-height` - Layout height options:
 *   - `small` - Smaller layout height
 * - `data-layout-text` - Text alignment options:
 *   - `center` - Center align text
 * - `data-theme` - Theme options:
 *   - `dark` - Dark theme styling
 * - `data-feature` - Feature options:
 *   - `animation` - Enable animations
 * - `data-layout-position` - Sticky position offset in pixels (e.g., `80` for 80px from top)
 *
 * ## Deprecated Attributes
 * The following attributes are deprecated and will be removed in v2.0:
 * - `type="default-centered"` → Use `data-display="standard" data-layout-text="center"`
 * - `type="default-interior"` → Use `data-display="standard" data-layout-height="small"`
 * - `type="default-interior-centered"` → Use `data-display="standard" data-layout-height="small" data-layout-text="center"`
 * - `type="stacked"` → Use `data-display="stacked"`
 * - `type="stacked-interior"` → Use `data-display="stacked" data-layout-height="small" data-layout-space-horizontal="large"`
 * - `type="overlay"` → Use `data-display="overlay"`
 * - `data-visual-align="center"` → Use `data-layout-text="center"`
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
 * <umd-element-hero data-display="overlay" data-theme="dark">
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
 * <!-- Stacked hero with small height and large horizontal spacing -->
 * <umd-element-hero data-display="stacked" data-layout-height="small" data-layout-space-horizontal="large" data-layout-position="80">
 *   <h1 slot="headline">Research Excellence</h1>
 *   <p slot="text">Advancing knowledge through groundbreaking research</p>
 *   <img slot="image" src="research-lab.jpg" alt="Research laboratory">
 * </umd-element-hero>
 * ```
 *
 * @example
 * ```html
 * <!-- Standard hero with centered text -->
 * <umd-element-hero data-display="standard" data-layout-text="center">
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
