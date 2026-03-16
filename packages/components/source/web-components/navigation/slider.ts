import { navigation } from '@universityofmaryland/web-elements-library/composite';
import { Model } from '@universityofmaryland/web-model-library';
import { reset } from '../../helpers/styles';
import { MakeNavSlider, SLOTS } from './common';
import { ComponentRegistration } from '../../_types';

const tagName = 'umd-element-nav-slider';

export const styles = `
  :host {
    display: block;
  }

  ${reset}
  ${navigation.elements.slider.Styles}
`;

const attributes = [
  {
    name: 'resize',
    handler: (ref: any, _oldValue: string, newValue: string) => {
      if (newValue === 'true') ref.events?.resize();
    },
  },
];

const createComponent = (element: HTMLElement) => {
  const ref = MakeNavSlider({ element, ...SLOTS });

  if (!ref) return { element: document.createElement('div'), styles };

  return {
    element: ref.container,
    styles,
    events: ref.events,
  };
};

/**
 * Navigation Slider
 *
 * A horizontal scrollable navigation component for displaying many navigation items.
 * Provides arrow controls and smooth scrolling for better user experience when
 * navigation items exceed the viewport width.
 *
 * ## Custom Element
 * `<umd-element-nav-slider>`
 *
 * ## Slots
 * - Default slot - Navigation list items
 *
 * ## Observed Attributes
 * - `resize` - Triggers recalculation of slider dimensions when set to "true"
 *
 * @example
 * ```html
 * <!-- Basic navigation slider -->
 * <umd-element-nav-slider>
 *   <ul>
 *     <li><a href="/college1">College of Arts & Humanities</a></li>
 *     <li><a href="/college2">College of Engineering</a></li>
 *     <li><a href="/college3">College of Science</a></li>
 *     <li><a href="/college4">School of Business</a></li>
 *     <li><a href="/college5">School of Public Health</a></li>
 *     <li><a href="/college6">School of Education</a></li>
 *   </ul>
 * </umd-element-nav-slider>
 * ```
 *
 * @example
 * ```html
 * <!-- Navigation slider with dynamic resize -->
 * <umd-element-nav-slider id="nav-slider">
 *   <ul>
 *     <li><a href="/dept1">Computer Science</a></li>
 *     <li><a href="/dept2">Mathematics</a></li>
 *     <li><a href="/dept3">Physics</a></li>
 *     <li><a href="/dept4">Chemistry</a></li>
 *     <li><a href="/dept5">Biology</a></li>
 *   </ul>
 * </umd-element-nav-slider>
 *
 * <script>
 *   // Trigger resize when content changes
 *   const slider = document.getElementById('nav-slider');
 *   window.addEventListener('resize', () => {
 *     slider.setAttribute('resize', 'true');
 *   });
 * </script>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
export const NavigationSlider: ComponentRegistration = Model.defineComponent({
  tagName,
  createComponent,
  attributes,
}, { eager: false });

/** Backwards compatibility alias for grouped exports */
export { NavigationSlider as slider };
