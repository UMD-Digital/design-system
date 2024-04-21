declare global {
  interface Window {
    UMDEventsDateElement: typeof UMDEventsDateElement;
  }
}

import { MarkupCreate, Styles } from 'utilities';
import { EventLockupDate } from 'elements';

const { Node } = MarkupCreate;
const { ResetString } = Styles;
const { SlotWithDefaultStyling } = MarkupCreate;

const SLOTS = {
  MONTH: 'month',
  DAY: 'day',
  HEADLINE: 'headline',
};

// prettier-ignore
const styles = `
  :host {
    display: block;
  }

  ${ResetString}
  ${EventLockupDate.Styles}
`;

const CreateShadowDom = ({ element }: { element: UMDEventsDateElement }) => {
  const theme = element.getAttribute('theme') || 'light';
  const headline = SlotWithDefaultStyling({
    element,
    slotRef: SLOTS.HEADLINE,
  });
  const month = SlotWithDefaultStyling({ element, slotRef: SLOTS.MONTH });
  const day = SlotWithDefaultStyling({ element, slotRef: SLOTS.DAY });

  return EventLockupDate.CreateElement({
    headline,
    month,
    day,
    theme,
  });
};

const ELEMENT_NAME = 'umd-element-events-date';
class UMDEventsDateElement extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    const template = Node.stylesTemplate({ styles });
    super();

    this._shadow = this.attachShadow({ mode: 'open' });
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
    window.UMDEventsDateElement = UMDEventsDateElement;
    window.customElements.define(ELEMENT_NAME, UMDEventsDateElement);
  }
};
