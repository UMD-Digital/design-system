declare global {
  interface Window {
    UMDNavItemElement: typeof UMDNavItemElement;
  }
}

import { Composite } from '@universityofmaryland/web-elements-library';
import { MarkupCreate, Styles } from 'utilities';

const { Node } = MarkupCreate;
const { NavigationElements } = Composite;

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

  ${Styles.resetString}
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

    const navItem = NavigationElements.Item.CreateElement({
      ...elementData,
    });

    element._shadow.appendChild(navItem);
    dropdownLinksSlot?.remove();
    primaryLinkSlot?.remove();
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
