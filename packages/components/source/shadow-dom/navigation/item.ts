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
    const calloutSlot = element.querySelector(
      `[slot="${SLOTS.DROPDOWN_CALLOUT}"]`,
    ) as HTMLElement;
    const primaryLinkContainer = element.querySelector(
      `[slot="${SLOTS.PRIMARY_LINK}"]`,
    ) as HTMLElement;
    const dropdownLinksSlot = element.querySelector(
      '[slot="dropdown-links"]',
    ) as HTMLElement;

    const dropdownLinksContainer = dropdownLinksSlot
      ? (dropdownLinksSlot.cloneNode(true) as HTMLElement)
      : null;
    let elementData: {
      primaryLinkContainer: HTMLElement;
      dropdownLinksContainer: HTMLElement | null;
      dropdownCalloutsSlot?: HTMLSlotElement;
    } = {
      primaryLinkContainer,
      dropdownLinksContainer,
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

    const navItem = NavigationElements.Item.CreateElement({
      ...elementData,
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
