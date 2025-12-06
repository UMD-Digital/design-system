import { layout } from '@universityofmaryland/web-elements-library/composite';
import { Attributes, Register, Lifecycle } from '@universityofmaryland/web-model-library';
import { CreateComponentFunction, LayoutProps } from '../../_types';

interface ScrollTopProps extends Pick<LayoutProps, 'isFixed'> {}

const tagName = 'umd-element-scroll-top';

const createComponent: CreateComponentFunction = (element) => {
  const props: ScrollTopProps = {
    isFixed: element.hasAttribute(
      Attributes.names.deprecated.layout.LAYOUT_FIXED,
    ),
  };

  return layout.scrollTop(props);
};

/**
 * Scroll to Top
 *
 * A utility component that provides a smooth scroll-to-top functionality.
 * Displays a button that appears after scrolling down and returns users to the top of the page.
 * Can be positioned fixed or absolute within its container.
 *
 * ## Custom Element
 * `<umd-element-scroll-top>`
 *
 * ## Attributes
 * - `data-layout-fixed` - Positioning mode:
 *   - When present - Fixed positioning relative to viewport
 *   - When absent - Absolute positioning within parent container
 *
 * @example
 * ```html
 * <!-- Basic scroll to top button -->
 * <umd-element-scroll-top></umd-element-scroll-top>
 * ```
 *
 * @example
 * ```html
 * <!-- Fixed position scroll to top -->
 * <umd-element-scroll-top data-layout-fixed></umd-element-scroll-top>
 * ```
 *
 * @example
 * ```html
 * <!-- Within a specific container -->
 * <div class="content-wrapper" style="position: relative;">
 *   <article>
 *     <!-- Long content here -->
 *   </article>
 *   <umd-element-scroll-top></umd-element-scroll-top>
 * </div>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
export default Register.webComponent({
  tagName,
  createComponent,
  afterConnect: Lifecycle.hooks.loadOnConnect,
});
