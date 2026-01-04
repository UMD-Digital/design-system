import { navigation } from '@universityofmaryland/web-elements-library/composite';
import { createStyledSlotOrClone } from '@universityofmaryland/web-utilities-library/elements';
import { Attributes, Slots, Register } from '@universityofmaryland/web-model-library';
import { CreateComponentFunction, SlotConfiguration } from '../../_types';

const tagName = 'umd-element-breadcrumb';

const slots: SlotConfiguration = {
  paths: {
    required: true,
  },
};

const createComponent: CreateComponentFunction = (element) => {
  const linkListSlot = createStyledSlotOrClone({
    element,
    slotRef: Slots.name.PATHS,
  });

  if (!linkListSlot)
    return { element: document.createElement('div'), styles: '' };

  return navigation.elements.breadcrumb({
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
export const NavigationBreadcrumb = Register.webComponent({
  tagName,
  slots,
  createComponent,
});

/** Backwards compatibility alias for grouped exports */
export { NavigationBreadcrumb as breadcrumb };
