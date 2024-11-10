declare global {
  interface Window {
    UMDHeroExpandElement: typeof UMDHeroExpandElement;
  }
}

import { HeroExpand } from 'elements';
import { MarkupCreate, MarkupValidate, Styles, WebComponents } from 'utilities';

const { Node, SlotWithDefaultStyling } = MarkupCreate;
const { Attributes, Slots } = WebComponents;

const ELEMENT_NAME = 'umd-element-hero-expand';

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
  const topPosition = element.getAttribute(Attributes.LAYOUT_STICKY_TOP);

  const image = MarkupValidate.ImageSlot({ element, ImageSlot: Slots.IMAGE });
  const videoSlot = element.querySelector(
    `[slot="${Slots.VIDEO}"]`,
  ) as HTMLElement;

  const elementData: {
    image?: HTMLImageElement;
    video?: HTMLVideoElement;
    eyebrow?: HTMLElement | null;
    headline?: HTMLElement | null;
    actions?: HTMLElement | null;
    additional?: HTMLSlotElement | null;
    topPosition?: string | null;
  } = {
    eyebrow: Slots.SlottedEyebrow({ element }),
    headline: Slots.SlottedHeadline({ element }),
    actions: Node.slot({ type: Slots.ACTIONS }),
    additional: Node.slot({ type: Slots.ADDITIONAL }),
    topPosition,
  };
  const isVideo = videoSlot instanceof HTMLVideoElement;

  if (image) {
    elementData.image = image;
  }

  if (isVideo) {
    elementData.video = videoSlot as HTMLVideoElement;
  }

  if (!isVideo && videoSlot && videoSlot.children.length > 0) {
    const video = videoSlot.querySelector('video') as HTMLVideoElement;
    if (video) elementData.video = video;
  }

  element._elementRef = HeroExpand.CreateElement(elementData);

  shadow.appendChild(template.content.cloneNode(true));
  shadow.appendChild(element._elementRef.element);

  if (topPosition) {
    element._elementRef.events.SetPosition({ value: topPosition });
  }
};

export class UMDHeroExpandElement extends HTMLElement {
  _shadow: ShadowRoot;
  _elementRef: {
    element: HTMLDivElement;
    events: {
      SetPosition: ({ value }: { value: string | null }) => void;
    };
  } | null;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._elementRef = null;
  }

  static get observedAttributes() {
    return [Attributes.LAYOUT_STICKY_TOP];
  }

  attributeChangedCallback(name: string) {
    if (name == Attributes.LAYOUT_STICKY_TOP && this._elementRef) {
      this._elementRef.events.SetPosition({
        value: this.getAttribute(Attributes.LAYOUT_STICKY_TOP),
      });
    }
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
