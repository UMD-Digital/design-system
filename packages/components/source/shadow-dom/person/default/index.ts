declare global {
  interface Window {
    UMDPersonElement: typeof UMDPersonElement;
  }
}

import { MarkupCreate, Styles } from 'utilities';
import { PersonBlock, PersonList, PersonTabular } from 'elements';
import { SLOTS as CommonSlots, CommonPersonData } from '../common';

const { Node, SlotOberserver } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-person';

const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_DISPLAY = 'display';
const THEME_LIGHT = 'light';
const DISPLAY_LIST = 'list';
const DISPLAY_TABULAR = 'tabular';

export const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${PersonBlock.Styles}
  ${PersonList.Styles}
  ${PersonTabular.Styles}
`;

export const CreateShadowDom = ({ element }: { element: UMDPersonElement }) => {
  const isDisplayList =
    element.getAttribute(ATTRIBUTE_DISPLAY) === DISPLAY_LIST;
  const isDisplayTabular =
    element.getAttribute(ATTRIBUTE_DISPLAY) === DISPLAY_TABULAR;
  const theme = element.getAttribute(ATTRIBUTE_THEME) || THEME_LIGHT;

  if (isDisplayList) {
    return PersonList.CreateElement(
      CommonPersonData({ element, slots: element._slots, theme }),
    );
  }

  if (isDisplayTabular) {
    return PersonTabular.CreateElement(
      CommonPersonData({ element, slots: element._slots, theme }),
    );
  }

  return PersonBlock.CreateElement(
    CommonPersonData({ element, slots: element._slots, theme }),
  );
};

export class UMDPersonElement extends HTMLElement {
  _shadow: ShadowRoot;
  _slots: Record<string, string>;

  constructor() {
    const template = Node.stylesTemplate({
      styles,
    });

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
    window.UMDPersonElement = UMDPersonElement;
    window.customElements.define(ELEMENT_NAME, UMDPersonElement);
  }
};
