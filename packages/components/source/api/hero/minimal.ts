import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Register, Lifecycle } from 'model';
import { CommonHeroData } from './common';
import type { CreateComponentFunction, ComponentRegistration } from '../_types';

/**
 * Tag name for the minimal hero component
 * @internal
 */
const tagName = 'umd-element-hero-minimal';

const createComponent: CreateComponentFunction = (element) =>
  Composite.hero.minimal({
    isThemeDark: Attributes.isTheme.dark({
      element,
    }),
    isThemeLight: Attributes.isTheme.light({
      element,
    }),
    isThemeMaryland: Attributes.isTheme.maryland({
      element,
    }),
    ...CommonHeroData({
      element,
    }),
  });

/**
 * Minimal Hero Component
 *
 * A simplified hero component with clean design and multiple theme options.
 * Ideal for interior pages and content-focused layouts.
 *
 * ## Custom Element
 * `<umd-element-hero-minimal>`
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
 *   - `maryland` - Maryland brand theme
 *
 * @example
 * ```html
 * <!-- Basic minimal hero -->
 * <umd-element-hero-minimal>
 *   <h1 slot="headline">Academic Programs</h1>
 *   <p slot="text">Explore over 100 undergraduate majors</p>
 * </umd-element-hero-minimal>
 * ```
 *
 * @example
 * ```html
 * <!-- Minimal hero with light theme and image -->
 * <umd-element-hero-minimal data-theme="light">
 *   <p slot="eyebrow">College of Engineering</p>
 *   <h1 slot="headline">Aerospace Engineering</h1>
 *   <p slot="text">
 *     Prepare for a career designing the next generation of
 *     aircraft and spacecraft.
 *   </p>
 *   <img slot="image" src="aerospace-lab.jpg" alt="Aerospace laboratory">
 *   <div slot="actions">
 *     <a href="/aerospace/apply">Apply to Program</a>
 *   </div>
 * </umd-element-hero-minimal>
 * ```
 *
 * @example
 * ```html
 * <!-- Maryland theme minimal hero -->
 * <umd-element-hero-minimal data-theme="maryland">
 *   <h1 slot="headline">Go Terps!</h1>
 *   <p slot="text">Follow Maryland Athletics</p>
 *   <div slot="actions">
 *     <a href="/athletics">View Schedule</a>
 *   </div>
 * </umd-element-hero-minimal>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const MinimalHero: ComponentRegistration = Register.webComponent({
  tagName,
  createComponent,
  afterConnect: Lifecycle.hooks.loadOnConnect,
});

export default MinimalHero;
