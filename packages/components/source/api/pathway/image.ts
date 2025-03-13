import { Atomic, Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { CommonPathwayData } from './common';
import { Markup } from 'utilities';

const tagName = 'umd-element-pathway';

const { SlotWithDefaultStyling } = Markup.create;

const MakeCommonDefaultData = ({
  element,
  isThemeDark,
  isThemeMaryland,
}: {
  element: HTMLElement;
  isThemeDark?: boolean;
  isThemeLight?: boolean;
  isThemeMaryland?: boolean;
}) => {
  const startDateSlot = element.querySelector(
    `[slot="${Slots.name.DATE_START_ISO}"]`,
  );
  const endDateSlot = element.querySelector(
    `[slot="${Slots.name.DATE_END_ISO}"]`,
  );
  const locationSlot = element.querySelector(
    `[slot="${Slots.name.contact.location}"]`,
  );
  const isImageRight =
    element.getAttribute(Attributes.names.LAYOUT_IMAGE_POSITION) !== 'left';
  const showTime = element.getAttribute(Attributes.names.SHOW_TIME) !== 'false';

  const startDate = Markup.event.createDate({ element: startDateSlot });
  const endDate = Markup.event.createDate({ element: endDateSlot });
  const obj = {
    ...CommonPathwayData({
      element,
    }),
    isImageRight,
    stats: SlotWithDefaultStyling({ element, slotRef: Slots.name.STATS }),
    image: Markup.validate.ImageSlot({
      element,
      ImageSlot: Slots.name.assets.image,
    }),
    video: SlotWithDefaultStyling({ element, slotRef: Slots.name.VIDEO }),
    eventDetails: null as null | HTMLElement,
    eventSign: null as null | HTMLElement,
    includedStyles: '',
  };
  let themeToggle = false;

  if (isThemeMaryland) themeToggle = true;
  if (isThemeDark) themeToggle = true;

  if (startDate) {
    const eventData = Markup.event.createDetailsData({
      locationElement: locationSlot,
      startDate,
      endDate,
    });
    let styles = '';

    const eventMeta = Atomic.events.meta({
      ...eventData,
      isThemeDark: themeToggle,
      showTime,
    });
    const eventSign = Atomic.events.sign({
      ...eventData,
    });

    obj.eventDetails = eventMeta.element;
    obj.eventSign = eventSign.element;

    styles += eventMeta.styles;
    styles += eventSign.styles;

    obj.includedStyles = styles;
  }

  return obj;
};

const createComponent = (element: HTMLElement) => {
  const isImageScaled =
    element.getAttribute(Attributes.names.LAYOUT_IMAGE_SCALED) !== 'false';

  const isThemeDark = Attributes.isTheme.dark({ element });
  const isThemeLight = Attributes.isTheme.light({ element });
  const isThemeMaryland = Attributes.isTheme.maryland({ element });
  const includesAnimation = Attributes.includesFeature.animation({ element });

  // Type Attribute should be deprecated for display
  const type = element.getAttribute(Attributes.names.TYPE);

  const themes = {
    isThemeDark,
    isThemeLight,
    isThemeMaryland,
  };

  if (type === Attributes.values.display.HERO) {
    return Composite.pathway.hero({
      ...MakeCommonDefaultData({ element, ...themes }),
      includesAnimation,
    });
  }

  if (type === Attributes.values.display.OVERLAY) {
    return Composite.pathway.overlay({
      isImageScaled,
      ...themes,
      includesAnimation,
      ...MakeCommonDefaultData({ element, ...themes }),
    });
  }

  if (type === Attributes.values.display.STICKY) {
    return Composite.pathway.sticky({
      isThemeDark: Attributes.isTheme.dark({ element }),
      isImageScaled,
      ...MakeCommonDefaultData({ element, ...themes }),
    });
  }

  return Composite.pathway.standard({
    ...themes,
    isImageScaled,
    includesAnimation,
    ...MakeCommonDefaultData({
      element,
      ...themes,
    }),
  });
};

export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      createComponent,
      afterConnect: (ref) => {
        setTimeout(() => {
          if (ref?.element?.getBoundingClientRect().top > 0) {
            ref?.events?.loadAnimation();
          }
        }, 10);
      },
    }),
  });
};
