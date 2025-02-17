declare global {
  interface Window {
    UMDEventElement: typeof UMDEventElement;
  }
}

import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots } from 'model';
import { Markup, Styles } from 'utilities';

const { Node } = Markup.create;

const ELEMENT_NAME = 'umd-element-event';

const styles = `
  :host {
    display: block;
  }
  
  ${Styles.reset}
  ${Composite.event.elements.meta.Styles}
  ${Composite.event.elements.sign.Styles}
  ${Composite.event.block.Styles}
  ${Composite.event.feature.Styles}
  ${Composite.event.list.Styles}
  ${Composite.event.promo.Styles}
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
  const eventDetails =
    Composite.event.elements.meta.CreateElement(EventDetailMeta);
  const eventDetailsDark = Composite.event.elements.meta.CreateElement({
    ...EventDetailMeta,
    isThemeDark: true,
  });
  const dateSign = Composite.event.elements.sign.CreateElement(EventSignData);
  const dateSignLarge = Composite.event.elements.sign.CreateElement({
    ...EventSignData,
    isLargeSize: true,
  });
  const dateSignLargeLight = Composite.event.elements.sign.CreateElement({
    ...EventSignData,
    isLargeSize: true,
    isThemeDark: false,
  });
  const dateSignLargeDark = Composite.event.elements.sign.CreateElement({
    ...EventSignData,
    isLargeSize: true,
    isThemeDark: true,
  });

  if (Attributes.isDisplay.feature({ element })) {
    return Composite.event.feature.CreateElement({
      ...MakeCommonData({ element }),
      eventDetails: isThemeDark ? eventDetails : eventDetailsDark,
      dateSign: isThemeDark ? dateSignLargeLight : dateSignLarge,
    });
  }

  if (Attributes.isDisplay.promo({ element })) {
    return Composite.event.promo.CreateElement({
      ...MakeCommonData({ element }),
      eventDetails: eventDetails,
      dateSign,
    });
  }

  if (Attributes.isDisplay.list({ element })) {
    return Composite.event.list.CreateElement({
      ...MakeCommonData({ element }),
      eventDetails: isThemeDark ? eventDetails : eventDetailsDark,
      dateSign: isThemeDark ? dateSignLargeDark : dateSignLarge,
    });
  }

  return Composite.event.block.CreateElement({
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
