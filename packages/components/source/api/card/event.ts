import { Atomic, Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { Markup } from 'utilities';

const tagName = 'umd-element-event';

const MakeCommonData = ({ element }: { element: HTMLElement }) => ({
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

  // construct events meta

  const EventDetailsData = Markup.event.createDetailsData({
    locationElement: locationSlot,
    startDate,
    endDate,
  });

  const EventDetailMeta = { ...EventDetailsData, showTime };

  // construct event sign

  const EventSignData = Markup.event.createDetailsData({
    locationElement: locationSlot,
    startDate,
    endDate,
  });

  // Display options

  if (Attributes.isDisplay.feature({ element })) {
    return Composite.card.block({
      ...MakeCommonData({ element }),
      image: Slots.assets.image({ element }) as HTMLImageElement,
      eyebrow: Slots.eyebrow.default({ element }),
      hasEyebrowRibbon: true,
      eventMeta: Atomic.events.meta({
        ...EventDetailMeta,
        isThemeDark,
      }),
      dateSign: Atomic.events.sign({
        ...EventSignData,
        isThemeDark: false,
        isLargeSize: true,
      }),
    });
  }

  if (Attributes.isDisplay.promo({ element })) {
    return Composite.card.overlay.image({
      ...MakeCommonData({ element }),
      backgroundImage: Slots.assets.image({ element }) as HTMLImageElement,
      eventMeta: Atomic.events.meta({
        ...EventDetailMeta,
        isThemeDark: true,
      }),
      dateSign: Atomic.events.sign({
        ...EventSignData,
        isThemeDark,
      }),
    });
  }

  if (Attributes.isDisplay.list({ element })) {
    return Composite.card.list({
      ...MakeCommonData({ element }),
      image: Slots.assets.image({ element }) as HTMLImageElement,
      eventMeta: Atomic.events.meta({
        ...EventDetailMeta,
        isThemeDark,
      }),
      dateSign: Atomic.events.sign({
        ...EventSignData,
        isThemeDark,
        isLargeSize: true,
      }),
    });
  }

  return Composite.card.block({
    ...MakeCommonData({ element }),
    image: Slots.assets.image({ element }) as HTMLImageElement,
    eventMeta: Atomic.events.meta({
      ...EventDetailMeta,
      isThemeDark,
    }),
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
