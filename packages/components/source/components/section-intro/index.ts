declare global {
  interface Window {
    UMDSectionIntroElement: typeof UMDSectionIntroElement;
  }
}

import { SectionIntro } from 'elements';
import { MakeTemplate, SlotDefaultStyling } from 'helpers/ui';
import { Reset } from 'helpers/styles';

const ELEMENT_NAME = 'umd-element-section-intro';
const ATTRIBUTE_WITH_SEPARATOR = 'include-separator';
const SLOTS = {
  HEADLINE: 'headline',
  ACTIONS: 'actions',
};

const styles = `
  :host {
    display: block;
  }

  ${Reset}
  ${SectionIntro.Styles}
`;

export const CreateShadowDom = ({
  element,
}: {
  element: UMDSectionIntroElement;
}) => {
  const { HEADLINE, ACTIONS } = element._slots;
  const hasSeparator = element.hasAttribute(ATTRIBUTE_WITH_SEPARATOR);
  const headline = SlotDefaultStyling({ element, slotRef: HEADLINE });
  const actions = SlotDefaultStyling({ element, slotRef: ACTIONS });

  return SectionIntro.CreateElement({
    headline,
    actions,
    hasSeparator,
  });
};

export class UMDSectionIntroElement extends HTMLElement {
  _shadow: ShadowRoot;
  _slots: Record<string, string>;

  constructor() {
    const template = MakeTemplate({ styles });

    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._slots = SLOTS;
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this._shadow.appendChild(CreateShadowDom({ element: this }));
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
