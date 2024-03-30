declare global {
  interface Window {
    UMDCardElement: typeof UMDCardElement;
  }
}

import { EventBlock, EventList, EventElements } from 'elements';
import { Reset } from 'helpers/styles';
import { CheckForImageAlt, SlotDefaultStyling, MakeTemplate } from 'helpers/ui';

const ELEMENT_NAME = 'umd-element-event';
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_DISPLAY = 'display';
const THEME_LIGHT = 'light';
const DISPLAY_LIST = 'list';
const SLOTS = {
  IMAGE: 'image',
  HEADLINE: 'headline',
  TEXT: 'text',
  ACTIONS: 'actions',
  START_DATE_ISO: 'start-date-iso',
  END_DATE_ISO: 'end-date-iso',
  LOCATION: 'location',
};
const styles = `
  :host {
    display: block;
  }
  
  ${Reset}
  ${EventElements.Details.Styles}
  ${EventElements.Sign.Styles}
  ${EventBlock.Styles}
  ${EventList.Styles}
`;

const GetImage = ({ element }: { element: UMDCardElement }) => {
  const { IMAGE } = element._slots;
  const isProperImage = CheckForImageAlt({ element, slotRef: IMAGE });
  const slotImage = SlotDefaultStyling({ element, slotRef: IMAGE });

  if (isProperImage && slotImage) {
    return slotImage.cloneNode(true) as HTMLImageElement;
  }

  return null;
};

const MakeDateSlot = ({
  element,
  slot,
}: {
  element: UMDCardElement;
  slot: string;
}) => {
  const slotElement = element.querySelector(`[slot="${slot}"]`);

  if (slotElement && slotElement.textContent) {
    const dateString = slotElement.textContent.trim();
    const parsedDate = Date.parse(dateString);
    const date = new Date(parsedDate);
    const dayOfWeek = date.toLocaleString('en-US', {
      weekday: 'short',
    });
    const month = date.toLocaleString('en-US', {
      month: 'short',
    });
    const day = date.toLocaleString('en-US', {
      day: 'numeric',
    });
    const time = date
      .toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'America/New_York',
      })
      .replace(' AM', 'am')
      .replace(' PM', 'pm');

    return {
      dayOfWeek,
      month,
      day,
      time,
    };
  }

  return null;
};

const MakeEventDetailsData = ({
  element,
  startDate,
  endDate,
}: {
  element: UMDCardElement;
  startDate: Record<string, string>;
  endDate?: Record<string, string> | null;
}) => {
  const theme = element.getAttribute(ATTRIBUTE_THEME) || THEME_LIGHT;
  const { LOCATION } = element._slots;
  const locationElement = element.querySelector(`[slot="${LOCATION}"]`);
  const obj: any = {
    startDayOfWeek: startDate.dayOfWeek,
    startMonth: startDate.month,
    startDay: startDate.day,
    startTime: startDate.time,
    theme,
  };

  if (locationElement && locationElement.textContent) {
    obj.location = [{ title: locationElement.textContent }];
  }

  if (endDate) {
    obj.endDayOfWeek = endDate.dayOfWeek;
    obj.endMonth = endDate.month;
    obj.endDay = endDate.day;
    obj.endTime = endDate.time;
  }

  return obj;
};

const CreateShadowDom = ({ element }: { element: UMDCardElement }) => {
  const { HEADLINE, TEXT, CTA, START_DATE_ISO, END_DATE_ISO } = element._slots;
  const theme = element.getAttribute(ATTRIBUTE_THEME) || THEME_LIGHT;
  const isDisplayList =
    element.getAttribute(ATTRIBUTE_DISPLAY) === DISPLAY_LIST;
  const startDate = MakeDateSlot({
    element,
    slot: START_DATE_ISO,
  });
  const endDate = MakeDateSlot({
    element,
    slot: END_DATE_ISO,
  });

  if (!startDate) {
    console.error('Missing start date for event web component');
    return null;
  }

  if (isDisplayList) {
    return EventList.CreateElement({
      image: GetImage({ element }),
      headline: SlotDefaultStyling({ element, slotRef: HEADLINE }),
      text: SlotDefaultStyling({ element, slotRef: TEXT }),
      actions: SlotDefaultStyling({ element, slotRef: CTA }),
      eventDetails: EventElements.Details.CreateElement(
        MakeEventDetailsData({ element, startDate, endDate }),
      ),
      dateBlock: EventElements.Sign.CreateElement(
        MakeEventDetailsData({ element, startDate, endDate }),
      ),
      theme,
    });
  }

  return EventBlock.CreateElement({
    image: GetImage({ element }),
    headline: SlotDefaultStyling({ element, slotRef: HEADLINE }),
    text: SlotDefaultStyling({ element, slotRef: TEXT }),
    actions: SlotDefaultStyling({ element, slotRef: CTA }),
    eventDetails: EventElements.Details.CreateElement(
      MakeEventDetailsData({ element, startDate, endDate }),
    ),
    theme,
  });
};

export class UMDCardElement extends HTMLElement {
  _shadow: ShadowRoot;
  _slots: Record<string, string>;

  constructor() {
    const template = MakeTemplate({ styles });

    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._slots = SLOTS;
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const element = this;
    const shadowDom = this._shadow;
    const content = CreateShadowDom({ element });

    if (content) {
      shadowDom.appendChild(content);
    }
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDCardElement = UMDCardElement;
    window.customElements.define(ELEMENT_NAME, UMDCardElement);
  }
};
