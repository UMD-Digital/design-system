import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots, Register } from 'model';
import { Markup } from 'utilities';
import { CreateComponentFunction, SlotConfiguration } from '../../_types';

const { SlotWithDefaultStyling } = Markup.create;

/**
 * Tag name for the breadcrumb navigation web component
 */
const tagName = 'umd-element-breadcrumb';

/**
 * Slot configuration for the breadcrumb component
 */
const slots: SlotConfiguration = {
  paths: {
    required: true,
  },
};

/**
 * Creates a breadcrumb navigation component with the provided configuration
 */
const createComponent: CreateComponentFunction = (element) => {
  const linkListSlot = SlotWithDefaultStyling({
    element,
    slotRef: Slots.name.PATHS,
  });

  if (!linkListSlot)
    return { element: document.createElement('div'), styles: '' };

  return Composite.navigation.elements.breadcrumb({
    isThemeDark: Attributes.isTheme.dark({ element }),
    linkListSlot,
  });
};

/**
 * Breadcrumb Navigation
 *
 * A breadcrumb navigation component that displays a hierarchical trail of links.
 * Helps users understand their location within the site structure and navigate back to parent pages.
 *
 * ## Custom Element
 * `<umd-element-breadcrumb>`
 *
 * ## Slots
 * - `paths` - Navigation list containing breadcrumb links (required, accepts: ol, ul)
 *
 * ## Attributes
 * - `data-theme` - Theme options:
 *   - `dark` - Dark theme styling
 *
 * @example
 * ```html
 * <!-- Basic breadcrumb -->
 * <umd-element-breadcrumb>
 *   <ol slot="paths">
 *     <li><a href="/">Home</a></li>
 *     <li><a href="/academics">Academics</a></li>
 *     <li><a href="/academics/programs">Programs</a></li>
 *     <li>Computer Science</li>
 *   </ol>
 * </umd-element-breadcrumb>
 * ```
 *
 * @example
 * ```html
 * <!-- Dark theme breadcrumb -->
 * <umd-element-breadcrumb data-theme="dark">
 *   <ul slot="paths">
 *     <li><a href="/">UMD</a></li>
 *     <li><a href="/research">Research</a></li>
 *     <li>Quantum Computing Lab</li>
 *   </ul>
 * </umd-element-breadcrumb>
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
