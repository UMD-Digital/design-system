declare global {
  interface Window {
    UMDNavDrawerFeature: typeof UMDNavDrawerFeature;
  }
}

import { Composite } from '@universityofmaryland/web-elements-library';
import { Markup, Styles } from 'utilities';
import { SLOTS, MakeNavDrawer } from './common';

const ELEMENT_NAME = 'umd-element-nav-drawer';

export const styles = `
  :host {
    display: block;
  }

  ${Styles.reset}
  ${Composite.navigation.elements.drawer.Styles}
  ${Composite.navigation.elements.menuButton.Styles}
`;

const CreateNavigationDrawerElement = ({
  element,
}: {
  element: HTMLElement;
}) => {
  const container = document.createElement('div');
  const drawer = MakeNavDrawer({ element, ...SLOTS });
  if (!drawer) return null;
  const button = Composite.navigation.elements.menuButton.CreateElement({
    eventOpen: drawer.events.eventOpen,
  });

  container.appendChild(drawer.element);
  container.appendChild(button);

  return container;
};

class UMDNavDrawerFeature extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    const template = Markup.create.Node.stylesTemplate({ styles });
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const navDrawer = CreateNavigationDrawerElement({ element: this });
    if (!navDrawer) return;

    this._shadow.appendChild(navDrawer);
  }
}

export default () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDNavDrawerFeature = UMDNavDrawerFeature;
    window.customElements.define(ELEMENT_NAME, UMDNavDrawerFeature);
  }
};
