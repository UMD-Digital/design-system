import { Atomic, Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import * as Utilities from 'utilities';

const tagName = 'umd-element-events-date';

const attributes = Attributes.handler.combine(
  Attributes.handler.observe.resize({
    callback: (element) => element.events?.SetDateElementsSizes(),
  }),
);

const createComponent = (element: HTMLElement) => {
  const isThemeDark = Attributes.isTheme.dark({ element });

  const headline = Slots.headline.default({ element });
  const startDateSlot = element.querySelector(
    `[slot="${Slots.name.DATE_START_ISO}"]`,
  );
  const endDateSlot = element.querySelector(
    `[slot="${Slots.name.DATE_END_ISO}"]`,
  );
  const startDate = Utilities.Markup.event.createDate({
    element: startDateSlot,
  });
  const endDate = Utilities.Markup.event.createDate({ element: endDateSlot });

  if (!startDate) {
    return Atomic.textLockup.date({
      headline,
      isThemeDark,
    });
  }

  const EventSignData = Utilities.Markup.event.createDetailsData({
    startDate,
    endDate,
  });
  const dateSign = Atomic.events.sign({
    ...EventSignData,
    isThemeDark,
  });

  return Atomic.textLockup.date({
    headline,
    dateSign,
    isThemeDark,
  });
};

export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      createComponent,
      attributes,
      afterConnect: (ref) => ref?.events?.load(),
    }),
  });
};
