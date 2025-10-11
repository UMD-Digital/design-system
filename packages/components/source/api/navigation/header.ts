declare global {
  interface Window {
    UMDHeaderElement: typeof UMDHeaderElement;
  }
}

import { navigation } from '@universityofmaryland/web-elements-library/composite';
import {
  createSlot,
  createStyledSlotOrClone,
  createStyleTemplate,
} from '@universityofmaryland/web-utilities-library/elements';
import { reset } from '../../helpers/styles';
import { SLOTS as GlobalSlots, MakeNavDrawer } from './common';

const ELEMENT_NAME = 'umd-element-navigation-header';
const ATTRIBUTE_SEARCH_URL = 'search-url';
const ATTRIBUTE_CTA_URL = 'cta-url';
const ATTRIBUTE_CTA_TEXT = 'cta-text';
const ATTRIBUTE_STICKY = 'sticky';
const SLOTS = {
  LOGO: 'logo',
  NAVIGATION: 'main-navigation',
  UTILITY: 'utility-navigation',
  ...GlobalSlots,
};

const styles = `
  :host {
    display: block;
  }

  ${reset}
  ${navigation.elements.drawer.Styles}
  ${navigation.header.Styles}
`;

/**
 * Navigation Header
 *
 * A comprehensive header navigation component that includes logo, main navigation,
 * utility navigation, search, and optional call-to-action. Supports sticky positioning
 * and responsive mobile drawer navigation.
 *
 * ## Custom Element
 * `<umd-element-navigation-header>`
 *
 * ## Slots
 * - `logo` - Site logo/branding (required)
 * - `main-navigation` - Container for umd-element-nav-item components
 * - `utility-navigation` - Utility/secondary navigation links
 *
 * ## Attributes
 * - `search-url` - URL for search functionality
 * - `cta-url` - URL for call-to-action button
 * - `cta-text` - Text for call-to-action button
 * - `sticky` - Enable sticky header behavior:
 *   - `true` - Header sticks to top on scroll
 *
 * ## Observed Attributes
 * - `sticky` - Dynamically toggle sticky behavior
 *
 * @example
 * ```html
 * <!-- Basic header -->
 * <umd-element-navigation-header>
 *   <a slot="logo" href="/">
 *     <img src="logo.svg" alt="University of Maryland">
 *   </a>
 *   <div slot="main-navigation">
 *     <umd-element-nav-item>
 *       <a slot="primary-link" href="/about">About</a>
 *     </umd-element-nav-item>
 *     <umd-element-nav-item>
 *       <a slot="primary-link" href="/academics">Academics</a>
 *     </umd-element-nav-item>
 *   </div>
 * </umd-element-navigation-header>
 * ```
 *
 * @example
 * ```html
 * <!-- Full header with search and CTA -->
 * <umd-element-navigation-header
 *   search-url="/search"
 *   cta-url="/apply"
 *   cta-text="Apply Now"
 *   sticky="true">
 *   <a slot="logo" href="/">Maryland</a>
 *   <div slot="main-navigation">
 *     <umd-element-nav-item>
 *       <a slot="primary-link" href="/academics">Academics</a>
 *       <nav slot="dropdown-links">
 *         <ul>
 *           <li><a href="/undergraduate">Undergraduate</a></li>
 *           <li><a href="/graduate">Graduate</a></li>
 *         </ul>
 *       </nav>
 *     </umd-element-nav-item>
 *   </div>
 *   <nav slot="utility-navigation">
 *     <ul>
 *       <li><a href="/news">News</a></li>
 *       <li><a href="/events">Events</a></li>
 *     </ul>
 *   </nav>
 * </umd-element-navigation-header>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const CreateNavItemSlots = ({ element }: { element: HTMLElement }) => {
  const { NAVIGATION } = SLOTS;
  const navigationSlot = element.querySelector(
    `[slot="${NAVIGATION}"]`,
  ) as HTMLElement;
  let navItems: HTMLElement[] = [];

  if (navigationSlot) {
    const navItem = Array.from(
      navigationSlot.querySelectorAll(':scope > umd-element-nav-item'),
    ) as HTMLElement[];

    navigationSlot.removeAttribute('slot');

    navItem.forEach((item, i) => {
      const slotAttr = `nav-item-${i}`;
      item.setAttribute(`slot`, slotAttr);

      navItems.push(createSlot(slotAttr));
      element.appendChild(item);
    });

    navigationSlot.remove();
  }

  return navItems;
};

const CreateHeader = ({
  element,
  eventOpen,
}: {
  element: HTMLElement;
  eventOpen?: () => void;
}) => {
  const { LOGO, UTILITY } = SLOTS;
  const logoSlot = createStyledSlotOrClone({
    element,
    slotRef: LOGO,
  });

  const utilitySlotElement = element.querySelector(
    `[slot="${UTILITY}"]`,
  ) as HTMLElement;
  const utilityRow =
    utilitySlotElement?.childElementCount > 0 ? createSlot(UTILITY) : null;
  const searchUrl = element.getAttribute(ATTRIBUTE_SEARCH_URL);
  const ctaUrl = element.getAttribute(ATTRIBUTE_CTA_URL);
  const ctaText = element.getAttribute(ATTRIBUTE_CTA_TEXT);

  if (!logoSlot) {
    console.error('UMDHeaderElement: Logo slot is required');
  }

  const value = navigation.header.CreateElement({
    logo: logoSlot,
    utilityRow,
    navItems: CreateNavItemSlots({ element }),
    eventOpen,
    searchUrl,
    ctaUrl,
    ctaText,
  });

  return value;
};

class UMDHeaderElement extends HTMLElement {
  _shadow: ShadowRoot;
  _elementRef: {
    element: HTMLDivElement;
    events: {
      sticky: ({ isSticky }: { isSticky: boolean }) => void;
    };
  } | null;

  constructor() {
    const template = createStyleTemplate(styles);

    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
    this._elementRef = null;
  }

  static get observedAttributes() {
    return [ATTRIBUTE_STICKY];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (name == ATTRIBUTE_STICKY && newValue === 'true' && this._elementRef) {
      this._elementRef.events.sticky({ isSticky: true });
    }

    if (name == ATTRIBUTE_STICKY && newValue !== 'true' && this._elementRef) {
      this._elementRef.events.sticky({ isSticky: false });
    }
  }

  connectedCallback() {
    const element = this;
    const { _shadow } = element;
    const drawer = MakeNavDrawer({
      element,
      ...SLOTS,
      displayType: 'drawer-nav',
    });
    const headerProps: { element: HTMLElement; eventOpen?: () => void } = {
      element,
    };

    if (drawer) {
      _shadow.appendChild(drawer.element);
      headerProps.eventOpen = drawer.events.eventOpen;
    }

    this._elementRef = CreateHeader(headerProps);
    if (this._elementRef) _shadow.appendChild(this._elementRef.element);
  }
}

export default () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDHeaderElement = UMDHeaderElement;
    window.customElements.define(ELEMENT_NAME, UMDHeaderElement);
  }
};
