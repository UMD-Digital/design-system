declare global {
  interface Window {
    UMDSectionIntroElement: typeof UMDSectionIntroElement;
  }
}

import { SectionIntro } from 'elements';
import { Attributes, Slots } from 'shadow-dom-model';
import { Styles, MarkupCreate } from 'utilities';
import { CommonIntroData } from '../common';

const ELEMENT_NAME = 'umd-element-section-intro';

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${SectionIntro.Styles}
`;

const styleTemplate = MarkupCreate.Node.stylesTemplate({ styles });

export const CreateShadowDom = ({
  element,
}: {
  element: UMDSectionIntroElement;
}) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const includesAnimation = Attributes.checks.includesAnimation({ element });
  const intro = SectionIntro.CreateElement({
    ...CommonIntroData({
      element,
      isThemeDark: Attributes.checks.isThemeDark({ element }),
    }),
    text: Slots.defined.text({ element }),
    hasSeparator: element.hasAttribute(Attributes.names.OPTIONAL_HAS_SEPARATOR),
    includesAnimation,
  });

  shadow.appendChild(styleTemplate.content.cloneNode(true));
  shadow.appendChild(intro.element);

  setTimeout(() => {
    if (intro.element.getBoundingClientRect().top > 0) {
      intro.events.loadAnimation();
    }
  }, 10);
};

export class UMDSectionIntroElement extends HTMLElement {
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
    window.UMDSectionIntroElement = UMDSectionIntroElement;
    window.customElements.define(ELEMENT_NAME, UMDSectionIntroElement);
  }
};

export default {
  Load,
};
