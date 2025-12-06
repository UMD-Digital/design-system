import { navigation } from '@universityofmaryland/web-elements-library/composite';
import { createSlot } from '@universityofmaryland/web-utilities-library/elements';
import { Register } from '@universityofmaryland/web-model-library';

import { CreateComponentFunction, SlotConfiguration } from '../../_types';

const tagName = 'umd-element-navigation-sticky';

const slots: SlotConfiguration = {
  content: {
    required: true,
  },
};

const createComponent: CreateComponentFunction = (element) =>
  navigation.elements.sticky({
    content: createSlot('content'),
    component: element,
  });

/**
 * Sticky Navigation
 *
 * A navigation component that sticks to the top of the viewport when scrolling.
 * Useful for keeping important navigation accessible as users scroll through content.
 *
 * ## Custom Element
 * `<umd-element-navigation-sticky>`
 *
 * ## Slots
 * - `content` - Navigation content to make sticky (required)
 *
 * @example
 * ```html
 * <!-- Basic sticky navigation -->
 * <umd-element-navigation-sticky>
 *   <nav slot="content">
 *     <ul>
 *       <li><a href="#overview">Overview</a></li>
 *       <li><a href="#features">Features</a></li>
 *       <li><a href="#pricing">Pricing</a></li>
 *       <li><a href="#contact">Contact</a></li>
 *     </ul>
 *   </nav>
 * </umd-element-navigation-sticky>
 * ```
 *
 * @example
 * ```html
 * <!-- Sticky navigation with breadcrumb -->
 * <umd-element-navigation-sticky>
 *   <div slot="content">
 *     <umd-element-breadcrumb>
 *       <ol slot="paths">
 *         <li><a href="/">Home</a></li>
 *         <li><a href="/programs">Programs</a></li>
 *         <li>Computer Science</li>
 *       </ol>
 *     </umd-element-breadcrumb>
 *   </div>
 * </umd-element-navigation-sticky>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
export default Register.webComponent({
  tagName,
  slots,
  createComponent,
});
