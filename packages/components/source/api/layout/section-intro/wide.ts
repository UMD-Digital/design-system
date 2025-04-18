declare global {
  interface Window {
    UMDSectionIntroWideElement: typeof UMDSectionIntroWideElement;
  }
}

import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes } from 'model';
import { Styles, Markup } from 'utilities';
import { CommonIntroData } from './common';

const { Node } = Markup.create;

const ELEMENT_NAME = 'umd-element-section-intro-wide';

const styles = `
  :host {
    display: block;
  }

  ${Styles.reset}
  ${Composite.layout.sectionIntro.wide.Styles}
`;

const styleTemplate = Node.stylesTemplate({ styles });

export const CreateShadowDom = ({
  element,
}: {
  element: UMDSectionIntroWideElement;
}) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const intro = Composite.layout.sectionIntro.wide.CreateElement(
    CommonIntroData({
      element,
      isThemeDark: Attributes.isTheme.dark({ element }),
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

export default () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDSectionIntroWideElement = UMDSectionIntroWideElement;
    window.customElements.define(ELEMENT_NAME, UMDSectionIntroWideElement);
  }
};
