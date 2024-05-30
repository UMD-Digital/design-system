declare global {
  interface Window {
    UMDSectionIntroWideElement: typeof UMDSectionIntroWideElement;
  }
}

import { SectionIntroWide } from 'elements';
import { Styles, MarkupCreate } from 'utilities';
import { SLOTS as CommonSlots, CommonIntroData } from '../common';

const { Node, SlotOberserver } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-section-intro-wide';
const ATTRIBUTE_THEME = 'theme';

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
      slots: CommonSlots,
      theme: element.getAttribute(ATTRIBUTE_THEME),
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

    SlotOberserver({
      element: this,
      shadowDom: this._shadow,
      slots: CommonSlots,
      CreateShadowDom,
    });
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
