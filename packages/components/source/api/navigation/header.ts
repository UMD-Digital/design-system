declare global {
  interface Window {
    UMDHeaderElement: typeof UMDHeaderElement;
  }
}

import { MarkupCreate, Styles } from 'utilities';
import { Composite } from '@universityofmaryland/web-elements-library';
import { SLOTS as GlobalSlots, MakeNavDrawer } from './common';

const { Node } = MarkupCreate;
const { SlotWithDefaultStyling } = MarkupCreate;
const { NavigationHeader, NavigationElements } = Composite;

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

  ${Styles.resetString}
  ${NavigationElements.Drawer.Styles}
  ${NavigationHeader.Styles}
`;

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

      navItems.push(Node.slot({ type: slotAttr }));
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
  const logoSlot = SlotWithDefaultStyling({
    element,
    slotRef: LOGO,
  });

  const utilitySlot = Node.slot({ type: UTILITY });
  const searchUrl = element.getAttribute(ATTRIBUTE_SEARCH_URL);
  const ctaUrl = element.getAttribute(ATTRIBUTE_CTA_URL);
  const ctaText = element.getAttribute(ATTRIBUTE_CTA_TEXT);

  if (!logoSlot) {
    console.error('UMDHeaderElement: Logo slot is required');
  }

  const value = NavigationHeader.CreateElement({
    logo: logoSlot,
    utilityRow: utilitySlot,
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
    const template = Node.stylesTemplate({ styles });

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

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDHeaderElement = UMDHeaderElement;
    window.customElements.define(ELEMENT_NAME, UMDHeaderElement);
  }
};

export default {
  Load,
};
