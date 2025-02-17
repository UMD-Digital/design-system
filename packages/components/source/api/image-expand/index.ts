declare global {
  interface Window {
    UMDLayoutImageExpand: typeof UMDLayoutImageExpand;
  }
}

import { Composite } from '@universityofmaryland/web-elements-library';
import { Slots } from 'model';
import { Markup, Styles } from 'utilities';

const { Node } = Markup.create;

const ELEMENT_NAME = 'umd-layout-image-expand';

const styles = `
  :host {
    display: block;
  }

  ${Styles.reset}
  ${Composite.layout.image.expand.Styles}
`;

const styleTemplate = Markup.create.Node.stylesTemplate({ styles });

export const CreateShadowDom = ({
  element,
}: {
  element: UMDLayoutImageExpand;
}) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const content = Node.slot({ type: 'content' });
  const image = Markup.validate.ImageSlot({
    element,
    ImageSlot: Slots.name.assets.image,
  });

  if (content && image) {
    const component = Composite.layout.image.expand.CreateElement({
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
