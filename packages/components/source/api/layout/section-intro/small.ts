declare global {
  interface Window {
    UMDSectionIntroElement: typeof UMDSectionIntroElement;
  }
}

import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots } from 'model';
import { Styles, Markup } from 'utilities';
import { CommonIntroData } from './common';

const ELEMENT_NAME = 'umd-element-section-intro';

const styles = `
  :host {
    display: block;
  }

  ${Styles.reset}
  ${Composite.layout.sectionIntro.small.Styles}
`;

const styleTemplate = Markup.create.Node.stylesTemplate({ styles });

export const CreateShadowDom = ({
  element,
}: {
  element: UMDSectionIntroElement;
}) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const includesAnimation = Attributes.includesFeature.animation({ element });
  const intro = Composite.layout.sectionIntro.small.CreateElement({
    ...CommonIntroData({
      element,
      isThemeDark: Attributes.isTheme.dark({ element }),
    }),
    text: Slots.text.default({ element }),
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

export default () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDSectionIntroElement = UMDSectionIntroElement;
    window.customElements.define(ELEMENT_NAME, UMDSectionIntroElement);
  }
};
