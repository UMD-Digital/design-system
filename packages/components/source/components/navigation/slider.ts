declare global {
  interface Window {
    UMDNavSlider: typeof UMDNavSlider;
  }
}

import { MarkupCreate, Styles } from 'utilities';
import { NavigationElements } from 'elements';
import { MakeNavSlider, SLOTS } from './common';

const ELEMENT_NAME = 'umd-element-nav-slider';

export const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${NavigationElements.Slider.Styles}
`;

export const CreateShadowDom = ({ element }: { element: HTMLElement }) =>
  MakeNavSlider({ element, ...SLOTS });

export class UMDNavSlider extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    const template = MarkupCreate.Node.stylesTemplate({ styles });
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  async connectedCallback() {
    const shadowElement = CreateShadowDom({ element: this });

    this._shadow.appendChild(shadowElement);
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDNavSlider = UMDNavSlider;
    window.customElements.define(ELEMENT_NAME, UMDNavSlider);
  }
};
