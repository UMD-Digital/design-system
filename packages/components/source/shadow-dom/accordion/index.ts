declare global {
  interface Window {
    UMDAccordionElement: typeof UMDAccordionElement;
  }
}

import { MarkupCreate, Styles } from 'utilities';
import { Accordion } from 'elements';

const { SlotWithDefaultStyling, SlotOberserver, Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-accordion-item';
const ATTRIBUTE_RESIZE = 'resize';
const ATTRIBUTE_STATE = 'state';
const ATTRIBUTE_THEME = 'theme';
const THEME_LIGHT = 'light';
const STATE_OPEN = 'open';
const STATE_CLOSED = 'closed';

const SLOTS = { HEADLINE: 'headline', BODY: 'body' };

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${Accordion.Styles}
`;

const CreateShadowDom = ({ element }: { element: UMDAccordionElement }) => {
  const theme = element.getAttribute(ATTRIBUTE_THEME) || THEME_LIGHT;
  const state = element.getAttribute(ATTRIBUTE_STATE);
  const shouldBeOpen = state === STATE_OPEN;
  element._elementRef = Accordion.CreateElement({
    theme,
    shouldBeOpen,
    body: Node.slot({ type: SLOTS.BODY }),
    headline: SlotWithDefaultStyling({
      element,
      slotRef: SLOTS.HEADLINE,
    }),
  });

  return element._elementRef.element;
};

export class UMDAccordionElement extends HTMLElement {
  _shadow: ShadowRoot;
  _elementRef: {
    element: HTMLDivElement;
    events: {
      SetOpen: (arg: { hasAnimation?: boolean }) => void;
      SetClosed: (arg: { hasAnimation?: boolean }) => void;
    };
  } | null;

  constructor() {
    const template = MarkupCreate.Node.stylesTemplate({ styles });
    super();
    this._elementRef = null;
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return [ATTRIBUTE_RESIZE, ATTRIBUTE_STATE];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (!this._elementRef) return;

    if (name === ATTRIBUTE_RESIZE && newValue === 'true') {
      this._elementRef.events.SetOpen({ hasAnimation: false });
    }

    if (
      name == ATTRIBUTE_STATE &&
      newValue === STATE_CLOSED &&
      oldValue === STATE_OPEN
    ) {
      this._elementRef.events.SetClosed({});
    }

    if (
      name == ATTRIBUTE_STATE &&
      newValue === STATE_OPEN &&
      oldValue === STATE_CLOSED
    ) {
      this._elementRef.events.SetOpen({});
    }
  }

  connectedCallback() {
    const element = this;
    const shadowDom = this._shadow;

    element._shadow.appendChild(CreateShadowDom({ element }));

    SlotOberserver({
      element,
      shadowDom,
      slots: SLOTS,
      CreateShadowDom,
    });
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDAccordionElement = UMDAccordionElement;
    window.customElements.define(ELEMENT_NAME, UMDAccordionElement);
  }
};
