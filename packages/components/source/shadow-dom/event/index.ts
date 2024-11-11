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
import {
  MarkupCreate,
  MarkupEvent,
  MarkupValidate,
  Styles,
  WebComponents,
} from 'utilities';

const { Node, SlotWithDefaultStyling } = MarkupCreate;
const { AttributesNames, AttributesValues, Slots } = WebComponents;

const ELEMENT_NAME = 'umd-element-event';

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
  const theme =
    element.getAttribute(AttributesNames.THEME) || AttributesValues.THEME_LIGHT;

  return {
    image: MarkupValidate.ImageSlot({ element, ImageSlot: Slots.IMAGE }),
    headline: Slots.SlottedHeadline({ element }),
    text: Slots.SlottedText({ element }),
    actions: Slots.SlottedActions({ element }),
    theme,
  };
};

const CreateShadowDom = ({ element }: { element: UMDEventElement }) => {
  const displayAttribute = element.getAttribute(AttributesNames.VISUAL_DISPLAY);
  const theme =
    element.getAttribute(AttributesNames.THEME) || AttributesValues.THEME_LIGHT;
  const showTime =
    element.getAttribute(AttributesNames.OPTIONAL_SHOW_TIME) !== 'false';
  const isDisplayList = displayAttribute === AttributesValues.DISPLAY_LIST;
  const isDisplayFeature =
    displayAttribute === AttributesValues.DISPLAY_FEATURE;
  const isDisplayPromo = displayAttribute === AttributesValues.DISPLAY_PROMO;
  const startDateSlot = element.querySelector(
    `[slot="${Slots.DATE_START_ISO}"]`,
  );
  const endDateSlot = element.querySelector(`[slot="${Slots.DATE_END_ISO}"]`);
  const locationSlot = element.querySelector(`[slot="${Slots.LOCATION}"]`);
  const startDate = MarkupEvent.CreateDate({ element: startDateSlot });
  const endDate = MarkupEvent.CreateDate({ element: endDateSlot });
  const isThemeLight = theme === AttributesValues.THEME_LIGHT;

  if (!startDate) {
    console.error('Missing start date for event web component');
    return null;
  }

  const EventDetailsData = MarkupEvent.CreateDetailsData({
    locationElement: locationSlot,
    startDate,
    endDate,
  });
  const EventDetailMeta = { ...EventDetailsData, showTime };

  const EventSignData = MarkupEvent.CreateDetailsData({
    locationElement: locationSlot,
    startDate,
    endDate,
  });
  const eventDetails = EventElements.Meta.CreateElement(EventDetailMeta);
  const eventDetailsDark = EventElements.Meta.CreateElement({
    ...EventDetailMeta,
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
      eventDetails: isThemeLight ? eventDetails : eventDetailsDark,
      dateSign: isThemeLight ? dateSignLarge : dateSignLargeLight,
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
      eventDetails: isThemeLight ? eventDetails : eventDetailsDark,
      dateSign: isThemeLight ? dateSignLarge : dateSignLargeDark,
    });
  }

  return EventBlock.CreateElement({
    ...MakeCommonData({ element }),
    eventDetails: isThemeLight ? eventDetails : eventDetailsDark,
  });
};

class UMDEventElement extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    const template = Node.stylesTemplate({ styles });

    super();
    this._shadow = this.attachShadow({ mode: 'open' });
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

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDEventElement = UMDEventElement;
    window.customElements.define(ELEMENT_NAME, UMDEventElement);
  }
};

export default {
  Load,
};
