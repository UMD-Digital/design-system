declare global {
  interface Window {
    UMDNavSlider: typeof UMDNavSlider;
  }
}

import { MarkupCreate, Styles } from 'utilities';
import { NavigationElements } from 'elements';
import { MakeNavSlider, SLOTS } from './common';

const ELEMENT_NAME = 'umd-element-nav-slider';
const ATTRIBUTE_RESIZE = 'resize';

export const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${NavigationElements.Slider.Styles}
`;

const CreateShadowDom = ({ element }: { element: HTMLElement }) =>
  MakeNavSlider({ element, ...SLOTS });

class UMDNavSlider extends HTMLElement {
  _shadow: ShadowRoot;
  _elementRef: {
    container: HTMLElement;
    events: {
      resize: () => void;
    };
  } | null;

  constructor() {
    const template = MarkupCreate.Node.stylesTemplate({ styles });
    super();
    this._elementRef = null;
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return [ATTRIBUTE_RESIZE];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (!this._elementRef) return;

    if (name === ATTRIBUTE_RESIZE && newValue === 'true') {
      this._elementRef.events.resize();
    }
  }

  connectedCallback() {
    this._elementRef = CreateShadowDom({ element: this });

    this._shadow.appendChild(this._elementRef.container);
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
