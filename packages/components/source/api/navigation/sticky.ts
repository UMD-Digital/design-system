import { Composite } from '@universityofmaryland/web-elements-library';
import { Markup } from 'utilities';
import {
  CreateComponentFunction,
  SlotConfiguration,
} from '../_types';
import { createComponentRegistration } from '../../model/utilities/register';

/**
 * Tag name for the sticky navigation web component
 */
const tagName = 'umd-element-navigation-sticky';

/**
 * Slot configuration for the sticky navigation component
 */
const slots: SlotConfiguration = {
  content: {
    required: true,
  },
};

/**
 * Creates a sticky navigation component with the provided configuration
 */
const createComponent: CreateComponentFunction = (element) =>
  Composite.navigation.elements.sticky({
    content: Markup.create.Node.slot({ type: 'content' }),
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
export default createComponentRegistration({
  tagName,
  slots,
  createComponent,
});
