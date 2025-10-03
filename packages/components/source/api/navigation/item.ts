declare global {
  interface Window {
    UMDNavItemElement: typeof UMDNavItemElement;
  }
}

import { Composite } from '@universityofmaryland/web-elements-library';
import { Markup, Styles } from 'helpers';
import {
  ComponentRegistration,
} from '../../_types';

const { Node } = Markup.create;

/**
 * Tag name for the navigation item web component
 */
const tagName = 'umd-element-nav-item';

const SLOTS = {
  PRIMARY_LINK: 'primary-link',
  DROPDOWN_LINKS: 'dropdown-links',
  DROPDOWN_CALLOUT: 'dropdown-callout',
};

// prettier-ignore
export const styles = `
  :host {
    display: block;
  }

  ${Styles.reset}
  ${Composite.navigation.elements.item.Styles}
`;

class UMDNavItemElement extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    const template = Node.stylesTemplate({ styles });
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const element = this;
    const calloutSlot = element.querySelector<HTMLElement>(
      `[slot="${SLOTS.DROPDOWN_CALLOUT}"]`,
    );

    const primaryLinkSlot = element.querySelector<HTMLElement>(
      `[slot="${SLOTS.PRIMARY_LINK}"]`,
    );
    const primaryLinkContainer = primaryLinkSlot?.cloneNode(
      true,
    ) as HTMLElement | null;

    const dropdownLinksSlot = element.querySelector<HTMLElement>(
      '[slot="dropdown-links"]',
    );
    const dropdownLinksContainer = dropdownLinksSlot?.cloneNode(
      true,
    ) as HTMLElement | null;

    if (!primaryLinkContainer) {
      throw new Error('Primary link is required for a nav item');
    }

    let elementData: {
      primaryLinkContainer: HTMLElement;
      dropdownLinksContainer: HTMLElement | null;
      dropdownCalloutsSlot?: HTMLSlotElement;
      context: HTMLElement;
    } = {
      primaryLinkContainer,
      dropdownLinksContainer,
      context: element,
    };

    if (calloutSlot && calloutSlot.children.length > 0) {
      const dropdownCalloutsSlot = Node.slot({
        type: SLOTS.DROPDOWN_CALLOUT,
      });
      elementData = { ...elementData, dropdownCalloutsSlot };
    }

    if (!primaryLinkContainer) {
      throw new Error('Primary link is required for a nav item');
    }

    const navItem = Composite.navigation.elements.item.CreateElement({
      ...elementData,
    });

    element._shadow.appendChild(navItem);
    dropdownLinksSlot?.remove();
    primaryLinkSlot?.remove();
  }
}

/**
 * Navigation Item
 *
 * A navigation menu item component that supports dropdown menus and callout sections.
 * Designed to be used within navigation header and drawer components for creating
 * hierarchical navigation structures.
 *
 * ## Custom Element
 * `<umd-element-nav-item>`
 *
 * ## Slots
 * - `primary-link` - Main navigation link (required)
 * - `dropdown-links` - Dropdown menu content
 * - `dropdown-callout` - Featured callout section in dropdown
 *
 * @example
 * ```html
 * <!-- Simple navigation item -->
 * <umd-element-nav-item>
 *   <a slot="primary-link" href="/about">About</a>
 * </umd-element-nav-item>
 * ```
 *
 * @example
 * ```html
 * <!-- Navigation item with dropdown -->
 * <umd-element-nav-item>
 *   <a slot="primary-link" href="/academics">Academics</a>
 *   <nav slot="dropdown-links">
 *     <ul>
 *       <li><a href="/undergraduate">Undergraduate Programs</a></li>
 *       <li><a href="/graduate">Graduate Programs</a></li>
 *       <li><a href="/online">Online Learning</a></li>
 *     </ul>
 *   </nav>
 * </umd-element-nav-item>
 * ```
 *
 * @example
 * ```html
 * <!-- Navigation item with dropdown and callout -->
 * <umd-element-nav-item>
 *   <a slot="primary-link" href="/research">Research</a>
 *   <nav slot="dropdown-links">
 *     <ul>
 *       <li><a href="/research/centers">Research Centers</a></li>
 *       <li><a href="/research/labs">Laboratories</a></li>
 *       <li><a href="/research/funding">Funding Opportunities</a></li>
 *     </ul>
 *   </nav>
 *   <div slot="dropdown-callout">
 *     <h3>Featured Research</h3>
 *     <p>Quantum computing breakthrough leads to new possibilities</p>
 *     <a href="/research/quantum">Learn More</a>
 *   </div>
 * </umd-element-nav-item>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const navItemRegistration: ComponentRegistration = () => {
  const hasElement =
    document.getElementsByTagName(tagName).length > 0;

  if (!window.customElements.get(tagName) && hasElement) {
    window.UMDNavItemElement = UMDNavItemElement;
    window.customElements.define(tagName, UMDNavItemElement);
  }
};

export default navItemRegistration;
