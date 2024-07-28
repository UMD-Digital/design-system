declare global {
  interface Window {
    UMDHeaderElement: typeof UMDHeaderElement;
  }
}

import { MarkupCreate, Styles } from 'utilities';
import { NavigationHeader, NavigationElements } from 'elements';
import { SLOTS as GlobalSlots, MakeNavDrawer } from './common';

const { Node } = MarkupCreate;
const { SlotWithDefaultStyling } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-navigation-header';
const ATTRIBUTE_SEARCH_URL = 'search-url';
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

  ${Styles.ResetString}
  ${NavigationElements.Drawer.Styles}
  ${NavigationHeader.Styles}
`;

const CreateHeader = ({
  element,
  eventOpen,
}: {
  element: HTMLElement;
  eventOpen?: () => void;
}) => {
  const { LOGO, NAVIGATION, UTILITY } = SLOTS;
  const logoSlot = SlotWithDefaultStyling({
    element,
    slotRef: LOGO,
  });
  const navigationSlot = element.querySelector(
    `[slot="${NAVIGATION}"]`,
  ) as HTMLElement;
  const utilitySlot = Node.slot({ type: UTILITY });
  const searchUrl = element.getAttribute(ATTRIBUTE_SEARCH_URL);

  if (!logoSlot) {
    console.error('UMDHeaderElement: Logo slot is required');
  }

  const value = NavigationHeader.CreateElement({
    logo: logoSlot,
    navRow: navigationSlot,
    utilityRow: utilitySlot,
    eventOpen,
    searchUrl,
  });

  return value;
};

class UMDHeaderElement extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    const template = Node.stylesTemplate({ styles });

    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
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

    _shadow.appendChild(CreateHeader(headerProps));
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
