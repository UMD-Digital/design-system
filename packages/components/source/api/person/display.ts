declare global {
  interface Window {
    UMDPersonElement: typeof UMDPersonElement;
  }
}

import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes } from 'model';
import { Markup, Styles } from 'utilities';
import { CommonPersonData } from './common';

const { Node } = Markup.create;

const ELEMENT_NAME = 'umd-element-person';

export const styles = `
  :host {
    display: block;
  }

  ${Styles.reset}
  ${Composite.person.block.Styles}
  ${Composite.person.list.Styles}
  ${Composite.person.tabular.Styles}
`;

const styleTemplate = Node.stylesTemplate({
  styles,
});

export const CreateShadowDom = ({ element }: { element: UMDPersonElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const isDisplayList = Attributes.isDisplay.list({ element });
  const isDisplayTabular = Attributes.isDisplay.tabular({ element });
  const isThemeDark = Attributes.isTheme.dark({ element });

  shadow.appendChild(styleTemplate.content.cloneNode(true));

  if (isDisplayList) {
    shadow.appendChild(
      Composite.person.list.CreateElement(
        CommonPersonData({ element, isThemeDark }),
      ),
    );
    return;
  }

  if (isDisplayTabular) {
    shadow.appendChild(
      Composite.person.tabular.CreateElement(
        CommonPersonData({ element, isThemeDark }),
      ),
    );
    return;
  }

  shadow.appendChild(
    Composite.person.block.CreateElement(
      CommonPersonData({ element, isThemeDark }),
    ),
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

export default () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDPersonElement = UMDPersonElement;
    window.customElements.define(ELEMENT_NAME, UMDPersonElement);
  }
};
