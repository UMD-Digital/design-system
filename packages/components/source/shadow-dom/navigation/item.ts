declare global {
  interface Window {
    UMDNavItemElement: typeof UMDNavItemElement;
  }
}

import { MarkupCreate, Styles } from 'utilities';
import { NavigationElements } from 'elements';

const SLOTS = {
  PRIMARY_LINK: 'primary-link',
  DROPDOWN_LINKS: 'dropdown-links',
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
    const template = MarkupCreate.Node.stylesTemplate({ styles });
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const element = this;
    const primaryLinkContainer = element.querySelector(
      `[slot="${SLOTS.PRIMARY_LINK}"]`,
    ) as HTMLElement;
    const dropdownLinksContainer = element.querySelector(
      `[slot="${SLOTS.DROPDOWN_LINKS}"]`,
    ) as HTMLElement;

    if (!primaryLinkContainer) {
      throw new Error('Primary link is required for a nav item');
    }

    const navItem = NavigationElements.Item.CreateElement({
      primaryLinkContainer,
      dropdownLinksContainer,
    });

    element._shadow.appendChild(navItem);
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDNavItemElement = UMDNavItemElement;
    window.customElements.define(ELEMENT_NAME, UMDNavItemElement);
  }
};