import { animations } from '@universityofmaryland/web-elements-library/atomic';
import { Register } from '@universityofmaryland/web-model-library';
import { CreateComponentFunction, ComponentRegistration } from '../../_types';

const tagName = 'umd-element-brand-logo-animation';

const createComponent: CreateComponentFunction = () =>
  animations.brand.chevronScroll();

/**
 * Brand Chevron Scroll Animation
 *
 * Creates an animated University of Maryland brand chevron logo.
 * The animation provides a dynamic visual element for brand presence.
 *
 * ## Custom Element
 * `<umd-element-brand-logo-animation>`
 *
 * ## Notes
 * - Uses the University of Maryland's atomic animations library
 * - Animation runs continuously
 * - Purely decorative element
 *
 * @example
 * ```html
 * <!-- Basic chevron animation -->
 * <umd-element-brand-logo-animation></umd-element-brand-logo-animation>
 * ```
 *
 * @example
 * ```html
 * <!-- In a hero section -->
 * <div class="hero-section">
 *   <h1>Welcome to UMD</h1>
 *   <umd-element-brand-logo-animation></umd-element-brand-logo-animation>
 * </div>
 * ```
 *
 * @example
 * ```html
 * <!-- As a loading indicator -->
 * <div class="loading-container" aria-busy="true">
 *   <umd-element-brand-logo-animation></umd-element-brand-logo-animation>
 *   <p>Loading...</p>
 * </div>
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
