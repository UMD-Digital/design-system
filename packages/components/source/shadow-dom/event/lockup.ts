declare global {
  interface Window {
    UMDEventsDateElement: typeof UMDEventsDateElement;
  }
}

import { MarkupCreate, MarkupEvent, Styles } from 'utilities';
import { EventLockupDate, EventElements } from 'elements';

const { Node } = MarkupCreate;
const { ResetString } = Styles;
const { SlotWithDefaultStyling } = MarkupCreate;

const SLOTS = {
  START_DATE_ISO: 'start-date-iso',
  END_DATE_ISO: 'end-date-iso',
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
  const startDateSlot = element.querySelector(
    `[slot="${SLOTS.START_DATE_ISO}"]`,
  );
  const endDateSlot = element.querySelector(`[slot="${SLOTS.END_DATE_ISO}"]`);
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
