declare global {
  interface Window {
    UMDSectionIntroWideElement: typeof UMDSectionIntroWideElement;
  }
}

import { SectionIntroWide } from 'elements';
import { Styles, MarkupCreate, WebComponents } from 'utilities';
import { CommonIntroData } from '../common';

const { Node } = MarkupCreate;
const { AttributesNames } = WebComponents;

const ELEMENT_NAME = 'umd-element-section-intro-wide';

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${SectionIntroWide.Styles}
`;

const styleTemplate = Node.stylesTemplate({ styles });

export const CreateShadowDom = ({
  element,
}: {
  element: UMDSectionIntroWideElement;
}) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const intro = SectionIntroWide.CreateElement(
    CommonIntroData({
      element,
      theme: element.getAttribute(AttributesNames.THEME),
    }),
  );

  shadow.appendChild(styleTemplate.content.cloneNode(true));
  shadow.appendChild(intro);
};

export class UMDSectionIntroWideElement extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    CreateShadowDom({ element: this });
  }
}

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDSectionIntroWideElement = UMDSectionIntroWideElement;
    window.customElements.define(ELEMENT_NAME, UMDSectionIntroWideElement);
  }
};

export default {
  Load,
};
