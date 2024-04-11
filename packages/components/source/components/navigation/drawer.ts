declare global {
  interface Window {
    UMDNavDrawerFeature: typeof UMDNavDrawerFeature;
  }
}

import { MarkupCreate, Styles } from 'utilities';
import { NavigationElements } from 'elements';
import { SLOTS, MakeNavDrawer } from './common';

const ELEMENT_NAME = 'umd-element-nav-drawer';

export const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${NavigationElements.Drawer.Styles}
  ${NavigationElements.MenuButton.Styles}
`;

const CreateShadowDom = ({ element }: { element: HTMLElement }) => {
  const container = document.createElement('div');
  const drawer = MakeNavDrawer({ element, ...SLOTS });
  const button = NavigationElements.MenuButton.CreateElement({
    eventOpen: drawer.events.eventOpen,
  });

  container.appendChild(drawer.element);
  container.appendChild(button);

  return container;
};

class UMDNavDrawerFeature extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    const template = MarkupCreate.Node.stylesTemplate({ styles });
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this._shadow.appendChild(CreateShadowDom({ element: this }));
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDNavDrawerFeature = UMDNavDrawerFeature;
    window.customElements.define(ELEMENT_NAME, UMDNavDrawerFeature);
  }
};
