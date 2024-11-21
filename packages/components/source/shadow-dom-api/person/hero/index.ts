declare global {
  interface Window {
    UMDPersonHeroElement: typeof UMDPersonHeroElement;
  }
}

import { PersonHero } from 'elements';
import {
  Attributes,
  AttributeNames,
  AttributesValues,
  Slots,
} from 'shadow-dom-model';
import { MarkupCreate, Styles } from 'utilities';
import { CommonPersonData } from '../common';

const { Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-person-hero';

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
  const isThemeDark = Attributes.isThemeDark({
    element,
  });
  const breadcrumbSlot = Node.slot({ type: Slots.BREADCRUMB });

  if (breadcrumbSlot) {
    const breadcrumb = element.querySelector(`[slot="${Slots.BREADCRUMB}"]`);
    if (breadcrumb) {
      const copy = breadcrumb.cloneNode(true);

      element.appendChild(copy);
      breadcrumb.setAttribute('slot', Slots.BREADCRUMB_COPY);
    }
  }

  shadow.appendChild(styleTemplate.content.cloneNode(true));

  shadow.appendChild(
    PersonHero.CreateElement({
      ...CommonPersonData({ element, isThemeDark }),
      breadcrumbDesktop: Node.slot({ type: Slots.BREADCRUMB }),
      breadcrumbMobile: Node.slot({ type: Slots.BREADCRUMB_COPY }),
    }),
  );
};

export class UMDPersonHeroElement extends HTMLElement {
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
    window.UMDPersonHeroElement = UMDPersonHeroElement;
    window.customElements.define(ELEMENT_NAME, UMDPersonHeroElement);
  }
};

export default {
  Load,
};
