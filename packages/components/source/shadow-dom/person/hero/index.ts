declare global {
  interface Window {
    UMDPersonHeroElement: typeof UMDPersonHeroElement;
  }
}

import { MarkupCreate, Styles } from 'utilities';
import { PersonHero } from 'elements';
import { SLOTS as CommonSlots, CommonPersonData } from '../common';

const { Node, SlotOberserver } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-person-hero';

const ATTRIBUTE_THEME = 'theme';
const THEME_LIGHT = 'light';

export const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${PersonHero.Styles}
`;

const styleTemplate = Node.stylesTemplate({
  styles,
});

export const CreateShadowDom = ({
  element,
}: {
  element: UMDPersonHeroElement;
}) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const theme = element.getAttribute(ATTRIBUTE_THEME) || THEME_LIGHT;

  shadow.appendChild(styleTemplate.content.cloneNode(true));

  shadow.appendChild(
    PersonHero.CreateElement(
      CommonPersonData({ element, slots: element._slots, theme }),
    ),
  );
};

export class UMDPersonHeroElement extends HTMLElement {
  _shadow: ShadowRoot;
  _slots: Record<string, string>;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._slots = CommonSlots;
  }

  connectedCallback() {
    CreateShadowDom({ element: this });

    SlotOberserver({
      element: this,
      shadowDom: this._shadow,
      slots: this._slots,
      CreateShadowDom,
    });
  }
}

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDPersonHeroElement = UMDPersonHeroElement;
    window.customElements.define(ELEMENT_NAME, UMDPersonHeroElement);
  }
};

export default {
  Load,
};
