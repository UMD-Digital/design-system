declare global {
  interface Window {
    UMDEventsDateElement: typeof UMDEventsDateElement;
  }
}

import { EventLockupDate, EventElements } from 'elements';
import { MarkupCreate, MarkupEvent, Styles, WebComponents } from 'utilities';

const { Node } = MarkupCreate;
const { SlotWithDefaultStyling } = MarkupCreate;
const { ResetString } = Styles;
const { AttributesNames, AttributesValues, Slots } = WebComponents;

// prettier-ignore
const styles = `
  :host {
    display: block;
  }

  ${ResetString}
  ${EventLockupDate.Styles}
`;

const CreateShadowDom = ({ element }: { element: UMDEventsDateElement }) => {
  const theme =
    element.getAttribute(AttributesNames.THEME) || AttributesValues.THEME_LIGHT;
  const headline = SlotWithDefaultStyling({
    element,
    slotRef: Slots.HEADLINE,
  });
  const startDateSlot = element.querySelector(
    `[slot="${Slots.DATE_START_ISO}"]`,
  );
  const endDateSlot = element.querySelector(`[slot="${Slots.DATE_END_ISO}"]`);
  const startDate = MarkupEvent.CreateDate({ element: startDateSlot });
  const endDate = MarkupEvent.CreateDate({ element: endDateSlot });

  if (!startDate) {
    return EventLockupDate.CreateElement({
      headline,
      theme,
    });
  }

  const EventSignData = MarkupEvent.CreateDetailsData({
    startDate,
    endDate,
  });
  const dateSign = EventElements.Sign.CreateElement({
    ...EventSignData,
    theme,
  });

  return EventLockupDate.CreateElement({
    headline,
    dateSign,
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

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDEventsDateElement = UMDEventsDateElement;
    window.customElements.define(ELEMENT_NAME, UMDEventsDateElement);
  }
};

export default {
  Load,
};
