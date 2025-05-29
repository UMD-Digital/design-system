import { Atomic } from '@universityofmaryland/web-elements-library';
import { Model, Register } from 'model';

/**
 * Tag name for the brand chevron animation component
 * @internal
 */
const tagName = 'umd-element-brand-logo-animation';

/**
 * Brand Chevron Scroll Animation Component
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
export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      createComponent: () => Atomic.animations.brand.chevronScroll(),
    }),
  });
};
