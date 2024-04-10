declare global {
  interface Window {
    UMDNavDrawerFeature: typeof UMDNavDrawerFeature;
  }
}

import { MarkupCreate, Styles } from 'utilities';
import { NavigationElements } from 'elements';

import { SLOTS, MakeNavDrawer } from './common';

const ELEMENT_NAME = 'umd-element-nav-drawer-future';

export const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${NavigationElements.Drawer.Styles}
`;

export const CreateShadowDom = ({ element }: { element: HTMLElement }) =>
  MakeNavDrawer({ element, ...SLOTS });

export class UMDNavDrawerFeature extends HTMLElement {
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
