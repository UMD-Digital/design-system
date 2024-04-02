declare global {
  interface Window {
    UMDSectionIntroElement: typeof UMDSectionIntroElement;
  }
}

import { SectionIntroWide } from 'elements';
import { MakeTemplate, SlotDefaultStyling } from 'helpers/ui';
import { Reset } from 'helpers/styles';

const ELEMENT_NAME = 'umd-element-section-intro-wide';
const ATTRIBUTE_THEME = 'theme';
const SLOTS = {
  HEADLINE: 'headline',
  ACTIONS: 'actions',
};

const styles = `
  :host {
    display: block;
  }

  ${Reset}
  ${SectionIntroWide.Styles}
`;

export const CreateShadowDom = ({
  element,
}: {
  element: UMDSectionIntroElement;
}) => {
  const { HEADLINE, ACTIONS } = element._slots;
  const theme = element.getAttribute(ATTRIBUTE_THEME);
  const headline = SlotDefaultStyling({ element, slotRef: HEADLINE });
  const actions = SlotDefaultStyling({ element, slotRef: ACTIONS });

  return SectionIntroWide.CreateElement({
    headline,
    actions,
    theme,
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
