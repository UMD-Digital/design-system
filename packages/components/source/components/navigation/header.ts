declare global {
  interface Window {
    UMDHeaderElement: typeof UMDHeaderElement;
  }
}

import { MarkupCreate, MarkupValidate, Styles } from 'utilities';
import { NavigationHeader, NavigationElements } from 'elements';
import { SLOTS as GlobalSlots, MakeSliderData, MakeNavDrawer } from './common';

const { Node } = MarkupCreate;
const { SlotWithDefaultStyling } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-header';
const SLOTS = {
  LOGO: 'logo',
  NAVIGATION: 'navigation',
  UTILITY: 'utility',
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
  const { LOGO, NAVIGATION } = SLOTS;
  const logoSlot = element.querySelector(`[slot="${LOGO}"]`);

  if (!logoSlot) {
    console.error('UMDHeaderElement: Logo slot is required');
    return null;
  }

  const navigationSlot = element.querySelector(
    `[slot="${NAVIGATION}"]`,
  ) as HTMLElement;

  const value = NavigationHeader.CreateElement({
    logo: MarkupValidate.ImageSlot({ element, ImageSlot: LOGO }),
    navRow: navigationSlot,
    eventOpen,
  });

  return value;
};

export class UMDHeaderElement extends HTMLElement {
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
    const eventOpen = drawer.events.eventOpen;
    const header = CreateHeader({ element, eventOpen });

    if (header) {
      if (drawer) _shadow.appendChild(drawer.element);
      _shadow.appendChild(header);
    }
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDHeaderElement = UMDHeaderElement;
    window.customElements.define(ELEMENT_NAME, UMDHeaderElement);
  }
};
