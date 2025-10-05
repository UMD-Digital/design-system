import { hero } from '@universityofmaryland/web-elements-library/composite';
import { Attributes, Register, Slots, Lifecycle } from 'model';
import type {
  CreateComponentFunction,
  ComponentRegistration,
} from '../../_types';

const tagName = 'umd-element-hero-logo';

const createComponent: CreateComponentFunction = (element) =>
  hero.logo({
    isThemeDark: Attributes.isTheme.dark({
      element,
    }),
    isThemeLight: Attributes.isTheme.light({
      element,
    }),
    isThemeMaryland: Attributes.isTheme.maryland({
      element,
    }),
    eyebrow: Slots.eyebrow.default({ element }),
    headline: Slots.headline.default({ element }),
    text: Slots.text.default({ element }),
    image: Slots.assets.image({ element }) as HTMLImageElement | null,
    actions: Slots.actions.default({ element }),
  });

/**
 * Logo Hero Component
 *
 * A hero component that emphasizes the University of Maryland logo.
 * Perfect for brand-focused pages and official communications.
 *
 * ## Custom Element
 * `<umd-element-hero-logo>`
 *
 * ## Slots
 * - `eyebrow` - Small text above headline
 * - `headline` - Main hero heading (required)
 * - `text` - Supporting text content
 * - `image` - Hero image
 * - `actions` - Call-to-action buttons/links
 *
 * ## Attributes
 * - `data-theme` - Theme options:
 *   - `dark` - Dark theme styling
 *   - `light` - Light theme styling
 *   - `maryland` - Maryland theme styling
 *
 * @example
 * ```html
 * <!-- Basic logo hero -->
 * <umd-element-hero-logo>
 *   <h1 slot="headline">University of Maryland</h1>
 *   <p slot="text">A global leader in research, entrepreneurship and innovation</p>
 *   <img slot="image" src="campus-beauty.jpg" alt="Campus scene">
 * </umd-element-hero-logo>
 * ```
 *
 * @example
 * ```html
 * <!-- Dark theme logo hero with actions -->
 * <umd-element-hero-logo data-theme="dark">
 *   <p slot="eyebrow">Office of the President</p>
 *   <h1 slot="headline">A Message from President Pines</h1>
 *   <p slot="text">
 *     Together, we are fearlessly forward in our pursuit of excellence
 *     and impact for the public good.
 *   </p>
 *   <div slot="actions">
 *     <a href="/president/message">Read Full Message</a>
 *     <a href="/president/initiatives">Presidential Initiatives</a>
 *   </div>
 * </umd-element-hero-logo>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const LogoHero: ComponentRegistration = Register.webComponent({
  tagName,
  createComponent,
  afterConnect: Lifecycle.hooks.loadOnConnect,
});

export default LogoHero;
