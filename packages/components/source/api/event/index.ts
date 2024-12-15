declare global {
  interface Window {
    UMDEventElement: typeof UMDEventElement;
  }
}

import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots } from 'model';
import { Markup, Styles } from 'utilities';

const { EventBlock, EventElements, EventFeature, EventList, EventPromo } =
  Composite;
const { Node } = Markup.create;

const ELEMENT_NAME = 'umd-element-event';

const styles = `
  :host {
    display: block;
  }
  
  ${Styles.reset}
  ${EventElements.Meta.Styles}
  ${EventElements.Sign.Styles}
  ${EventBlock.Styles}
  ${EventFeature.Styles}
  ${EventList.Styles}
  ${EventPromo.Styles}
`;

const MakeCommonData = ({ element }: { element: UMDEventElement }) => ({
  image: Markup.validate.ImageSlot({
    element,
    ImageSlot: Slots.name.assets.image,
  }),
  headline: Slots.headline.default({ element }),
  text: Slots.text.default({ element }),
  actions: Slots.actions.default({ element }),
  isThemeDark: Attributes.isTheme.dark({ element }),
});

const CreateShadowDom = ({ element }: { element: UMDEventElement }) => {
  const isThemeDark = Attributes.isTheme.dark({ element });
  const showTime = Attributes.includesFeature.visualTime({ element });

  const startDateSlot = element.querySelector(
    `[slot="${Slots.name.DATE_START_ISO}"]`,
  );
  const endDateSlot = element.querySelector(
    `[slot="${Slots.name.DATE_END_ISO}"]`,
  );
  const locationSlot = element.querySelector(
    `[slot="${Slots.name.contact.location}"]`,
  );
  const startDate = Markup.event.createDate({ element: startDateSlot });
  const endDate = Markup.event.createDate({ element: endDateSlot });

  if (!startDate) {
    console.error('Missing start date for event web component');
    return null;
  }

  const EventDetailsData = Markup.event.createDetailsData({
    locationElement: locationSlot,
    startDate,
    endDate,
  });
  const EventDetailMeta = { ...EventDetailsData, showTime };

  const EventSignData = Markup.event.createDetailsData({
    locationElement: locationSlot,
    startDate,
    endDate,
  });
  const eventDetails = EventElements.Meta.CreateElement(EventDetailMeta);
  const eventDetailsDark = EventElements.Meta.CreateElement({
    ...EventDetailMeta,
    isThemeDark: true,
  });
  const dateSign = EventElements.Sign.CreateElement(EventSignData);
  const dateSignLarge = EventElements.Sign.CreateElement({
    ...EventSignData,
    isLargeSize: true,
  });
  const dateSignLargeLight = EventElements.Sign.CreateElement({
    ...EventSignData,
    isLargeSize: true,
    isThemeDark: false,
  });
  const dateSignLargeDark = EventElements.Sign.CreateElement({
    ...EventSignData,
    isLargeSize: true,
    isThemeDark: true,
  });

  if (Attributes.isDisplay.feature({ element })) {
    return EventFeature.CreateElement({
      ...MakeCommonData({ element }),
      eventDetails: isThemeDark ? eventDetails : eventDetailsDark,
      dateSign: isThemeDark ? dateSignLargeLight : dateSignLarge,
    });
  }

  if (Attributes.isDisplay.promo({ element })) {
    return EventPromo.CreateElement({
      ...MakeCommonData({ element }),
      eventDetails: eventDetails,
      dateSign,
    });
  }

  if (Attributes.isDisplay.list({ element })) {
    return EventList.CreateElement({
      ...MakeCommonData({ element }),
      eventDetails: isThemeDark ? eventDetails : eventDetailsDark,
      dateSign: isThemeDark ? dateSignLargeDark : dateSignLarge,
    });
  }

  return EventBlock.CreateElement({
    ...MakeCommonData({ element }),
    eventDetails: isThemeDark ? eventDetails : eventDetailsDark,
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
