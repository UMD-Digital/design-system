import { Atomic, Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { Markup } from 'utilities';

const tagName = 'umd-element-event';

const MakeCommonData = ({ element }: { element: HTMLElement }) => ({
  image: Slots.assets.image({ element }) as HTMLImageElement,
  headline: Slots.headline.default({ element }),
  text: Slots.text.default({ element }),
  actions: Slots.actions.default({ element }),
  isTransparent: Attributes.isVisual.transparent({ element }),
  isThemeDark: Attributes.isTheme.dark({ element }),
});

const createComponent = (element: HTMLElement) => {
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
    return { element: document.createElement('div'), styles: '' };
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

  const eventMetaAtomic = Atomic.events.meta({
    ...EventDetailMeta,
    isThemeDark,
  });

  const dateSign = Composite.event.elements.sign.CreateElement(EventSignData);

  const dateSignAtomic = Atomic.events.sign({
    ...EventSignData,
    isThemeDark,
  });

  const dateSignAtomicLarge = Atomic.events.sign({
    ...EventSignData,
    isThemeDark,
    isLargeSize: true,
  });

  const dateSignLarge = Composite.event.elements.sign.CreateElement({
    ...EventSignData,
    isLargeSize: true,
  });

  const dateSignLargeDark = Composite.event.elements.sign.CreateElement({
    ...EventSignData,
    isLargeSize: true,
    isThemeDark: true,
  });

  if (Attributes.isDisplay.feature({ element })) {
    return Composite.card.block({
      ...MakeCommonData({ element }),
      eyebrow: Slots.eyebrow.default({ element }),
      isEyebrowRibbon: true,
      eventMeta: eventMetaAtomic,
      dateSign: Atomic.events.sign({
        ...EventSignData,
        isThemeDark: false,
        isLargeSize: true,
      }),
    });
  }

  if (Attributes.isDisplay.promo({ element })) {
    return Composite.event.promo({
      ...MakeCommonData({ element }),
      eventDetails: eventDetails,
      dateSign,
    });
  }

  if (Attributes.isDisplay.list({ element })) {
    return Composite.card.list({
      ...MakeCommonData({ element }),
      eventMeta: eventMetaAtomic,
      dateSign: dateSignAtomicLarge,
    });
  }

  return Composite.card.block({
    ...MakeCommonData({ element }),
    eventMeta: eventMetaAtomic,
  });
};

export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      createComponent,
    }),
  });
};
