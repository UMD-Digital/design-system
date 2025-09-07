import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Register } from 'model';
import { CommonIntroData } from './common';
import { CreateComponentFunction, ComponentRegistration } from '../../../_types';

const tagName = 'umd-element-section-intro-wide';

const createComponent: CreateComponentFunction = (element) =>
  Composite.layout.sectionIntro.wide(
    CommonIntroData({
      element,
      isThemeDark: Attributes.isTheme.dark({ element }),
    }),
  );

/**
 * Section Introduction (Wide)
 *
 * A full-width section introduction component that spans the entire container width.
 * Provides a bold headline and optional action buttons for high-impact section openings.
 * Ideal for major content divisions or landing page sections.
 *
 * ## Custom Element
 * `<umd-element-section-intro-wide>`
 *
 * ## Slots
 * - `headline` - Section headline/title
 * - `actions` - Call-to-action buttons or links
 *
 * ## Attributes
 * - `data-theme` - Theme options:
 *   - `dark` - Dark background with light text
 *
 * @example
 * ```html
 * <!-- Basic wide section intro -->
 * <umd-element-section-intro-wide>
 *   <h1 slot="headline">Welcome to the University of Maryland</h1>
 * </umd-element-section-intro-wide>
 * ```
 *
 * @example
 * ```html
 * <!-- With call-to-action -->
 * <umd-element-section-intro-wide>
 *   <h2 slot="headline">Discover Your Path</h2>
 *   <div slot="actions">
 *     <a href="/programs" class="button">Explore Programs</a>
 *     <a href="/visit" class="button-outline">Plan a Visit</a>
 *   </div>
 * </umd-element-section-intro-wide>
 * ```
 *
 * @example
 * ```html
 * <!-- Dark theme variant -->
 * <umd-element-section-intro-wide data-theme="dark">
 *   <h1 slot="headline">Innovation Starts Here</h1>
 *   <a slot="actions" href="/innovation">Join the Movement</a>
 * </umd-element-section-intro-wide>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const registration: ComponentRegistration = Register.webComponent({
  tagName,
  createComponent,
});

export default registration;
