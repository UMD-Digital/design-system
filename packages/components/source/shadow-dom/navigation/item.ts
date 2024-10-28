declare global {
  interface Window {
    UMDNavItemElement: typeof UMDNavItemElement;
  }
}

import { MarkupCreate, Styles } from 'utilities';
import { NavigationElements } from 'elements';

const { SlotWithDefaultStyling, Node } = MarkupCreate;

const SLOTS = {
  PRIMARY_LINK: 'primary-link',
  DROPDOWN_LINKS: 'dropdown-links',
  DROPDOWN_CALLOUT: 'dropdown-callout',
};

const ELEMENT_NAME = 'umd-element-nav-item';

// prettier-ignore
export const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${NavigationElements.Item.Styles}
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
    const primaryLinkContainer = element.querySelector(
      `[slot="${SLOTS.PRIMARY_LINK}"]`,
    ) as HTMLElement;
    const dropdownLinksSlot = element.querySelector(
      '[slot="dropdown-links"]',
    ) as HTMLElement;
    const dropdownCalloutsSlot = Node.slot({
      type: SLOTS.DROPDOWN_CALLOUT,
    });
    const dropdownLinksContainer = dropdownLinksSlot
      ? (dropdownLinksSlot.cloneNode(true) as HTMLElement)
      : null;

    if (!primaryLinkContainer) {
      throw new Error('Primary link is required for a nav item');
    }

    const navItem = NavigationElements.Item.CreateElement({
      primaryLinkContainer,
      dropdownLinksContainer,
      dropdownCalloutsSlot,
    });

    element._shadow.appendChild(navItem);
  }
}

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDNavItemElement = UMDNavItemElement;
    window.customElements.define(ELEMENT_NAME, UMDNavItemElement);
  }
};

export default {
  Load,
};
