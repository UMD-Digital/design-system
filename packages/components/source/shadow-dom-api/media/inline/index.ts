declare global {
  interface Window {
    UMDMediaInlineElement: typeof UMDMediaInlineElement;
  }
}

import { MediaInline, MediaWithCaption, MediaWrapped } from 'elements';
import { Slots } from 'shadow-dom-model';
import { MarkupCreate, MarkupValidate, Styles } from 'utilities';

const { Node, SlotWithDefaultStyling } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-media-inline';

const styles = `
  :host {
    display: block;
  }
  
  ${Styles.ResetString}
  ${MediaInline.Styles}
  ${MediaWithCaption.Styles}
  ${MediaWrapped.Styles}
`;

const CreateShadowDom = ({ element }: { element: UMDMediaInlineElement }) => {
  const isAlignmentRight = element.getAttribute('alignment') === 'right';
  const hasWrappingText =
    element.querySelector(`[slot="${Slots.name.WRAPPING_TEXT}"]`) !== null;
  const hasCaption =
    element.querySelector(`[slot="${Slots.name.CAPTION}"]`) !== null;
  const obj = {
    image: MarkupValidate.ImageSlot({ element, ImageSlot: Slots.name.IMAGE }),
    isAlignmentRight,
  };

  if (hasWrappingText) {
    return MediaWrapped.CreateElement({
      ...obj,
      wrappingText: Node.slot({ type: Slots.name.WRAPPING_TEXT }),
      caption: hasCaption
        ? SlotWithDefaultStyling({ element, slotRef: Slots.name.CAPTION })
        : null,
    });
  }

  if (hasCaption) {
    return MediaWithCaption.CreateElement({
      ...obj,
      caption: SlotWithDefaultStyling({ element, slotRef: Slots.name.CAPTION }),
    });
  }

  return MediaInline.CreateElement({
    image: MarkupValidate.ImageSlot({ element, ImageSlot: Slots.name.IMAGE }),
  });
};

class UMDMediaInlineElement extends HTMLElement {
  _shadow: ShadowRoot;
  _shadowRef: {
    element: HTMLDivElement;
    events?: {
      SetLoad?: () => void;
    };
  } | null;

  constructor() {
    const template = Node.stylesTemplate({ styles });

    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadowRef = null;
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this._shadowRef = CreateShadowDom({ element: this });
    this._shadow.appendChild(this._shadowRef?.element);

    if (this._shadowRef?.events?.SetLoad) {
      this._shadowRef.events.SetLoad();
    }
  }
}

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDMediaInlineElement = UMDMediaInlineElement;
    window.customElements.define(ELEMENT_NAME, UMDMediaInlineElement);
  }
};

export default {
  Load,
};