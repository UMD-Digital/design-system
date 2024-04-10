declare global {
  interface Window {
    UMDHeaderElement: typeof UMDHeaderElement;
  }
}

import { MarkupCreate, MarkupValidate, Styles } from 'utilities';
import { NavigationHeader } from 'elements';
import { SLOTS as GlobalSlots, MakeSliderData } from './common';

const { Node } = MarkupCreate;
const { SlotWithDefaultStyling } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-header';
const SLOTS = {
  LOGO: 'logo',
  NAVIGATION: 'navigation',
  UTILITY: 'utility',
  ...GlobalSlots,
};

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${NavigationHeader.Styles}
`;

const CreateShadowDom = ({ element }: { element: HTMLElement }) => {
  const { LOGO, NAVIGATION } = SLOTS;
  const logoSlot = element.querySelector(`[slot="${LOGO}"]`);

  if (!logoSlot) {
    console.error('UMDHeaderElement: Logo slot is required');
    return null;
  }

  return NavigationHeader.CreateElement({
    logo: MarkupValidate.ImageSlot({ element, ImageSlot: LOGO }),
    navRow: SlotWithDefaultStyling({
      element,
      slotRef: NAVIGATION,
    }),
    ...MakeSliderData({ element, ...SLOTS }),
  });
};

export class UMDHeaderElement extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    const template = Node.stylesTemplate({ styles });

    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const element = this;
    const { _shadow } = element;
    const shadowElement = CreateShadowDom({ element });

    if (!shadowElement) return;
    _shadow.appendChild(shadowElement);
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDHeaderElement = UMDHeaderElement;
    window.customElements.define(ELEMENT_NAME, UMDHeaderElement);
  }
};
