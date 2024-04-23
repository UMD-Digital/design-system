declare global {
  interface Window {
    UMDMediaInlineElement: typeof UMDMediaInlineElement;
  }
}

import { MediaInline } from 'elements';
import { MarkupCreate, MarkupValidate, Styles } from 'utilities';

const { Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-media-inline';

const SLOTS = {
  IMAGE: 'image',
  CAPTION: 'caption',
};

const styles = `
  :host {
    display: block;
  }
  
  ${Styles.ResetString}
  ${MediaInline.Styles}
`;

const CreateShadowDom = ({ element }: { element: UMDMediaInlineElement }) => {
  const { IMAGE } = element._slots;

  return MediaInline.CreateElement({
    image: MarkupValidate.ImageSlot({ element, ImageSlot: IMAGE }),
  });
};

export class UMDMediaInlineElement extends HTMLElement {
  _shadow: ShadowRoot;
  _slots: Record<string, string>;

  constructor() {
    const template = Node.stylesTemplate({ styles });

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
    window.UMDMediaInlineElement = UMDMediaInlineElement;
    window.customElements.define(ELEMENT_NAME, UMDMediaInlineElement);
  }
};
