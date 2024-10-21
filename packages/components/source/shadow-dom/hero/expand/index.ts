declare global {
  interface Window {
    UMDHeroExpandElement: typeof UMDHeroExpandElement;
  }
}

import { MarkupCreate, MarkupValidate, Styles } from 'utilities';
import { HeroExpand } from 'elements';
import { SlotWithDefaultStyling } from 'utilities/markup/create';

const { Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-hero-expand';
const SLOTS = {
  VIDEO: 'video',
  IMAGE: 'image',
};

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${HeroExpand.Styles}
`;

const template = MarkupCreate.Node.stylesTemplate({ styles });

const CreateShadowDom = ({ element }: { element: UMDHeroExpandElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const image = MarkupValidate.ImageSlot({ element, ImageSlot: SLOTS.IMAGE });
  const videoSlot = Node.slot({ type: SLOTS.VIDEO });
  shadow.appendChild(videoSlot);

  if (!image) {
    console.error('Hero Expand Element: An image or video is required');
    return null;
  }

  const expandElement = HeroExpand.CreateElement({
    image,
  });

  shadow.appendChild(template.content.cloneNode(true));
  shadow.appendChild(expandElement);
};

export class UMDHeroExpandElement extends HTMLElement {
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
    window.UMDHeroExpandElement = UMDHeroExpandElement;
    window.customElements.define(ELEMENT_NAME, UMDHeroExpandElement);
  }
};

export default {
  Load,
};
