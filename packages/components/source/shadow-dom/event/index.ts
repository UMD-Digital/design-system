declare global {
  interface Window {
    UMDEventElement: typeof UMDEventElement;
  }
}

import {
  EventBlock,
  EventElements,
  EventFeature,
  EventList,
  EventPromo,
} from 'elements';
import { MarkupCreate, MarkupEvent, MarkupValidate, Styles } from 'utilities';

const { Node, SlotWithDefaultStyling } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-event';
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_DISPLAY = 'display';
const THEME_LIGHT = 'light';
const DISPLAY_LIST = 'list';
const DISPLAY_FEATURE = 'feature';
const DISPLAY_PROMO = 'promo';
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
  
  ${Styles.ResetString}
  ${EventElements.Meta.Styles}
  ${EventElements.Sign.Styles}
  ${EventBlock.Styles}
  ${EventFeature.Styles}
  ${EventList.Styles}
  ${EventPromo.Styles}
`;

const MakeCommonData = ({ element }: { element: UMDEventElement }) => {
  const { HEADLINE, TEXT, ACTIONS } = element._slots;
  const theme = element.getAttribute(ATTRIBUTE_THEME) || THEME_LIGHT;

  return {
    image: MarkupValidate.ImageSlot({ element, ImageSlot: SLOTS.IMAGE }),
    headline: SlotWithDefaultStyling({ element, slotRef: HEADLINE }),
    text: SlotWithDefaultStyling({ element, slotRef: TEXT }),
    actions: SlotWithDefaultStyling({ element, slotRef: ACTIONS }),
    theme,
  };
};

const CreateShadowDom = ({ element }: { element: UMDEventElement }) => {
  const { START_DATE_ISO, END_DATE_ISO, LOCATION } = element._slots;
  const displayAttribute = element.getAttribute(ATTRIBUTE_DISPLAY);
  const theme = element.getAttribute(ATTRIBUTE_THEME) || THEME_LIGHT;
  const isDisplayList = displayAttribute === DISPLAY_LIST;
  const isDisplayFeature = displayAttribute === DISPLAY_FEATURE;
  const isDisplayPromo = displayAttribute === DISPLAY_PROMO;
  const startDateSlot = element.querySelector(`[slot="${START_DATE_ISO}"]`);
  const endDateSlot = element.querySelector(`[slot="${END_DATE_ISO}"]`);
  const locationSlot = element.querySelector(`[slot="${LOCATION}"]`);
  const startDate = MarkupEvent.CreateDate({ element: startDateSlot });
  const endDate = MarkupEvent.CreateDate({ element: endDateSlot });

  if (!startDate) {
    console.error('Missing start date for event web component');
    return null;
  }

  const EventDetailsData = MarkupEvent.CreateDetailsData({
    locationElement: locationSlot,
    startDate,
    endDate,
  });
  const EventSignData = MarkupEvent.CreateDetailsData({
    locationElement: locationSlot,
    startDate,
    endDate,
  });
  const eventDetails = EventElements.Meta.CreateElement(EventDetailsData);
  const eventDetailsDark = EventElements.Meta.CreateElement({
    ...EventDetailsData,
    theme: 'dark',
  });
  const dateSign = EventElements.Sign.CreateElement(EventSignData);
  const dateSignLarge = EventElements.Sign.CreateElement({
    ...EventSignData,
    isLargeSize: true,
  });
  const dateSignLargeLight = EventElements.Sign.CreateElement({
    ...EventSignData,
    isLargeSize: true,
    theme: 'light',
  });
  const dateSignLargeDark = EventElements.Sign.CreateElement({
    ...EventSignData,
    isLargeSize: true,
    theme: 'dark',
  });

  if (isDisplayFeature) {
    return EventFeature.CreateElement({
      ...MakeCommonData({ element }),
      eventDetails: theme === THEME_LIGHT ? eventDetails : eventDetailsDark,
      dateSign: theme === THEME_LIGHT ? dateSignLarge : dateSignLargeLight,
    });
  }

  if (isDisplayPromo) {
    return EventPromo.CreateElement({
      ...MakeCommonData({ element }),
      eventDetails: eventDetailsDark,
      dateSign,
    });
  }

  if (isDisplayList) {
    return EventList.CreateElement({
      ...MakeCommonData({ element }),
      eventDetails: theme === THEME_LIGHT ? eventDetails : eventDetailsDark,
      dateSign: theme === THEME_LIGHT ? dateSignLarge : dateSignLargeDark,
    });
  }

  return EventBlock.CreateElement({
    ...MakeCommonData({ element }),
    eventDetails: theme === THEME_LIGHT ? eventDetails : eventDetailsDark,
  });
};

export class UMDEventElement extends HTMLElement {
  _shadow: ShadowRoot;
  _slots: Record<string, string>;

  constructor() {
    const template = Node.stylesTemplate({ styles });

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
    window.UMDEventElement = UMDEventElement;
    window.customElements.define(ELEMENT_NAME, UMDEventElement);
  }
};
