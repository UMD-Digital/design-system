declare global {
  interface Window {
    UMDPersonElement: typeof UMDPersonElement;
  }
}

import { PersonBlock, PersonList, PersonTabular } from 'elements';
import { Attributes } from 'shadow-dom-model';
import { MarkupCreate, Styles } from 'utilities';
import { CommonPersonData } from '../common';

const { Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-person';

export const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${PersonBlock.Styles}
  ${PersonList.Styles}
  ${PersonTabular.Styles}
`;

const styleTemplate = Node.stylesTemplate({
  styles,
});

export const CreateShadowDom = ({ element }: { element: UMDPersonElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const isDisplayList =
    element.getAttribute(Attributes.names.DISPLAY) ===
    Attributes.values.DISPLAY_LIST;
  const isDisplayTabular =
    element.getAttribute(Attributes.names.DISPLAY) ===
    Attributes.values.DISPLAY_TABULAR;
  const isThemeDark = Attributes.checks.isThemeDark({ element });

  shadow.appendChild(styleTemplate.content.cloneNode(true));

  if (isDisplayList) {
    shadow.appendChild(
      PersonList.CreateElement(CommonPersonData({ element, isThemeDark })),
    );
    return;
  }

  if (isDisplayTabular) {
    shadow.appendChild(
      PersonTabular.CreateElement(CommonPersonData({ element, isThemeDark })),
    );
    return;
  }

  shadow.appendChild(
    PersonBlock.CreateElement(CommonPersonData({ element, isThemeDark })),
  );
};

export class UMDPersonElement extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    CreateShadowDom({ element: this });
  }
}

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDPersonElement = UMDPersonElement;
    window.customElements.define(ELEMENT_NAME, UMDPersonElement);
  }
};

export default {
  Load,
};
