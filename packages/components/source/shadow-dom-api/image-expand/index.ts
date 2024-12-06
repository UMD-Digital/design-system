declare global {
  interface Window {
    UMDLayoutImageExpand: typeof UMDLayoutImageExpand;
  }
}

import { Components } from '@universityofmaryland/web-elements-library';
import { Slots } from 'shadow-dom-model';
import { MarkupCreate, MarkupValidate, Styles } from 'utilities';

const { Node } = MarkupCreate;
const { LayoutImageExpand } = Components;

const ELEMENT_NAME = 'umd-layout-image-expand';

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${LayoutImageExpand.Styles}
`;

const styleTemplate = MarkupCreate.Node.stylesTemplate({ styles });

export const CreateShadowDom = ({
  element,
}: {
  element: UMDLayoutImageExpand;
}) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const content = Node.slot({ type: 'content' });
  const image = MarkupValidate.ImageSlot({
    element,
    ImageSlot: Slots.name.assets.image,
  });

  if (content && image) {
    const component = LayoutImageExpand.CreateElement({
      content,
      image,
    });

    shadow.appendChild(styleTemplate.content.cloneNode(true));
    shadow.appendChild(component);
  }
};

export class UMDLayoutImageExpand extends HTMLElement {
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
    window.UMDLayoutImageExpand = UMDLayoutImageExpand;
    window.customElements.define(ELEMENT_NAME, UMDLayoutImageExpand);
  }
};

export default {
  Load,
};
