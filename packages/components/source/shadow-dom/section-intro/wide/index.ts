declare global {
  interface Window {
    UMDSectionIntroElement: typeof UMDSectionIntroElement;
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

export const CreateShadowDom = ({
  element,
}: {
  element: UMDSectionIntroElement;
}) =>
  SectionIntroWide.CreateElement(
    CommonIntroData({
      element,
      slots: element._slots,
      theme: element.getAttribute(ATTRIBUTE_THEME),
    }),
  );

export class UMDSectionIntroElement extends HTMLElement {
  _shadow: ShadowRoot;
  _slots: Record<string, string>;

  constructor() {
    const template = Node.stylesTemplate({ styles });

    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._slots = CommonSlots;
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
