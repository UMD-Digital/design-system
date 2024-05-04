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

export const CreateShadowDom = ({
  element,
}: {
  element: UMDSectionIntroElement;
}) =>
  SectionIntro.CreateElement({
    ...CommonIntroData({
      element,
      slots: element._slots,
      theme: element.getAttribute(ATTRIBUTE_THEME),
    }),
    text: SlotWithDefaultStyling({ element, slotRef: SLOTS.TEXT }),
    hasSeparator: element.hasAttribute(ATTRIBUTE_WITH_SEPARATOR),
  });

export class UMDSectionIntroElement extends HTMLElement {
  _shadow: ShadowRoot;
  _slots: Record<string, string>;

  constructor() {
    const template = MarkupCreate.Node.stylesTemplate({ styles });

    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._slots = SLOTS;
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const element = this;
    const shadowDom = this._shadow;

    shadowDom.appendChild(CreateShadowDom({ element }));

    SlotOberserver({
      element,
      shadowDom,
      slots: CommonSlots,
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
