declare global {
  interface Window {
    UMDSectionIntroElement: typeof UMDSectionIntroElement;
  }
}

import { SectionIntro } from 'elements';
import { Styles, MarkupCreate } from 'utilities';
import { SLOTS as CommonSlots, CommonIntroData } from '../common';

const { SlotWithDefaultStyling, SlotOberserver } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-section-intro';
const ATTRIBUTE_WITH_SEPARATOR = 'include-separator';
const ATTRIBUTE_THEME = 'theme';
const SLOTS = {
  ...CommonSlots,
  TEXT: 'text',
};

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
  const intro = SectionIntro.CreateElement({
    ...CommonIntroData({
      element,
      slots: SLOTS,
      theme: element.getAttribute(ATTRIBUTE_THEME),
    }),
    text: SlotWithDefaultStyling({ element, slotRef: SLOTS.TEXT }),
    hasSeparator: element.hasAttribute(ATTRIBUTE_WITH_SEPARATOR),
  });

  shadow.appendChild(styleTemplate.content.cloneNode(true));
  shadow.appendChild(intro);
};

export class UMDSectionIntroElement extends HTMLElement {
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
      slots: SLOTS,
      CreateShadowDom,
    });
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDSectionIntroElement = UMDSectionIntroElement;
    window.customElements.define(ELEMENT_NAME, UMDSectionIntroElement);
  }
};
