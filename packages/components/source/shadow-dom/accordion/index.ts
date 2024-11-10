declare global {
  interface Window {
    UMDAccordionElement: typeof UMDAccordionElement;
  }
}

import { Accordion } from 'elements';
import { MarkupCreate, Styles, WebComponents } from 'utilities';

const { SlotWithDefaultStyling, Node } = MarkupCreate;
const { Attributes, AttributesValues, Slots } = WebComponents;

const ELEMENT_NAME = 'umd-element-accordion-item';

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${Accordion.Styles}
`;

const styleTemplate = MarkupCreate.Node.stylesTemplate({ styles });
const CreateShadowDom = ({ element }: { element: UMDAccordionElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const theme =
    element.getAttribute(Attributes.THEME) || AttributesValues.THEME_LIGHT;
  const state = element.getAttribute(Attributes.STATE);
  const shouldBeOpen = state === AttributesValues.STATE_OPENED;

  const accordion = Accordion.CreateElement({
    theme,
    shouldBeOpen,
    body: Node.slot({ type: Slots.BODY }),
    headline: Slots.SlottedHeadline({ element }),
  });

  element._elementRef = accordion;
  shadow.appendChild(styleTemplate.content.cloneNode(true));
  shadow.appendChild(accordion.element);
};

class UMDAccordionElement extends HTMLElement {
  _shadow: ShadowRoot;
  _elementRef: {
    element: HTMLDivElement;
    events: {
      SetOpen: (arg: { hasAnimation?: boolean }) => void;
      SetClosed: (arg: { hasAnimation?: boolean }) => void;
    };
  } | null;

  constructor() {
    super();
    this._elementRef = null;
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return [Attributes.RESIZE, Attributes.STATE];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (!this._elementRef) return;

    if (name === Attributes.RESIZE && newValue === 'true') {
      this._elementRef.events.SetOpen({ hasAnimation: false });
    }

    if (
      name == Attributes.STATE &&
      newValue === AttributesValues.STATE_CLOSED &&
      oldValue === AttributesValues.STATE_OPENED
    ) {
      this._elementRef.events.SetClosed({});
    }

    if (
      name == Attributes.STATE &&
      newValue === AttributesValues.STATE_OPENED &&
      oldValue === AttributesValues.STATE_CLOSED
    ) {
      this._elementRef.events.SetOpen({});
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
    window.UMDAccordionElement = UMDAccordionElement;
    window.customElements.define(ELEMENT_NAME, UMDAccordionElement);
  }
};

export default {
  Load,
};
