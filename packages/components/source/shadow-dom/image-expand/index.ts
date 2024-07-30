declare global {
  interface Window {
    UMDLayoutImageExpand: typeof UMDLayoutImageExpand;
  }
}

import { LayoutImageExpand } from 'elements';
import { Styles, MarkupCreate, MarkupValidate } from 'utilities';

const { SlotOberserver, Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-layout-image-expand';
const SLOTS = {
  CONTENT: 'content',
  IMAGE: 'image',
};

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
  const image = MarkupValidate.ImageSlot({ element, ImageSlot: SLOTS.IMAGE });

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

    SlotOberserver({
      element: this,
      shadowDom: this._shadow,
      slots: SLOTS,
      CreateShadowDom,
    });
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
