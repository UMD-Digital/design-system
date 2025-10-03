declare global {
  interface Window {
    UMDNavSlider: typeof UMDNavSlider;
  }
}

import { Composite } from '@universityofmaryland/web-elements-library';
import { Markup, Styles } from 'helpers';
import { MakeNavSlider, SLOTS } from './common';
import {
  ComponentRegistration,
} from '../../_types';

/**
 * Tag name for the navigation slider web component
 */
const tagName = 'umd-element-nav-slider';
const ATTRIBUTE_RESIZE = 'resize';

export const styles = `
  :host {
    display: block;
  }

  ${Styles.reset}
  ${Composite.navigation.elements.slider.Styles}
`;

const CreateShadowDom = ({ element }: { element: HTMLElement }) =>
  MakeNavSlider({ element, ...SLOTS });

class UMDNavSlider extends HTMLElement {
  _shadow: ShadowRoot;
  _elementRef: {
    container: HTMLElement;
    events: {
      resize: () => void;
    };
  } | null;

  constructor() {
    const template = Markup.create.Node.stylesTemplate({ styles });
    super();
    this._elementRef = null;
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return [ATTRIBUTE_RESIZE];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (!this._elementRef) return;

    if (name === ATTRIBUTE_RESIZE && newValue === 'true') {
      this._elementRef.events.resize();
    }
  }

  connectedCallback() {
    this._elementRef = CreateShadowDom({ element: this });

    if (!this._elementRef) return;
    this._shadow.appendChild(this._elementRef.container);
  }
}

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
const navSliderRegistration: ComponentRegistration = () => {
  const hasElement =
    document.getElementsByTagName(tagName).length > 0;

  if (!window.customElements.get(tagName) && hasElement) {
    window.UMDNavSlider = UMDNavSlider;
    window.customElements.define(tagName, UMDNavSlider);
  }
};

export default navSliderRegistration;
