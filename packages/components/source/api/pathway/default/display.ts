import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots } from 'model';
import { Markup, Styles } from 'utilities';
import { CommonPathwayData } from '../common';
import { UMDPathwayElement } from './index';

const { SlotWithDefaultStyling } = Markup.create;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Styles.reset}
  ${Composite.event.elements.meta.Styles}
  ${Composite.event.elements.sign.Styles}
  ${Composite.pathway.elements.image.Styles}
  ${Composite.pathway.elements.text.Styles}
  ${Composite.pathway.standard.Styles}
  ${Composite.pathway.hero.Styles}
  ${Composite.pathway.overlay.Styles}
  ${Composite.pathway.sticky.Styles}
`;

const MakeCommonDefaultData = ({
  element,
  isThemeDark,
  isThemeMaryland,
}: {
  element: UMDPathwayElement;
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
  };
  let themeToggle = true;

  if (isThemeMaryland) themeToggle = false;
  if (isThemeDark) themeToggle = false;

  if (startDate) {
    const eventData = Markup.event.createDetailsData({
      locationElement: locationSlot,
      startDate,
      endDate,
    });

    obj.eventDetails = Composite.event.elements.meta.CreateElement({
      ...eventData,
      isThemeDark: themeToggle,
      showTime,
    });

    obj.eventSign = Composite.event.elements.sign.CreateElement({
      ...eventData,
    });
  }

  return obj;
};

export const CreateShadowDom = ({
  element,
}: {
  element: UMDPathwayElement;
}) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const isImageScaled =
    element.getAttribute(Attributes.names.LAYOUT_IMAGE_SCALED) !== 'false';

  const isThemeDark = Attributes.isTheme.dark({ element });
  const isThemeLight = Attributes.isTheme.light({ element });
  const isThemeMaryland = Attributes.isTheme.maryland({ element });
  const includesAnimation = Attributes.includesFeature.animation({ element });

  // Type Attribute should be deprecated for display
  const type = element.getAttribute(Attributes.names.TYPE);

  shadow.appendChild(element._styles.content.cloneNode(true));

  const themes = {
    isThemeDark,
    isThemeLight,
    isThemeMaryland,
  };

  const makeHeroType = () => {
    shadow.appendChild(
      Composite.pathway.hero.CreateElement({
        ...MakeCommonDefaultData({ element, ...themes }),
        includesAnimation,
      }),
    );
  };

  const makeOverlayType = () => {
    const overlay = Composite.pathway.overlay.CreateElement({
      isImageScaled,
      ...themes,
      includesAnimation,
      ...MakeCommonDefaultData({ element, ...themes }),
    });

    shadow.appendChild(overlay.element);

    setTimeout(() => {
      if (overlay.element.getBoundingClientRect().top > 0) {
        overlay.events.loadAnimation();
      }
    }, 10);
  };

  const makeStickyType = () => {
    shadow.appendChild(
      Composite.pathway.sticky.CreateElement({
        isThemeDark: Attributes.isTheme.dark({ element }),
        isImageScaled,
        ...MakeCommonDefaultData({ element, ...themes }),
      }),
    );
  };

  const makeDefaultType = () => {
    const defaultElement = Composite.pathway.standard.CreateElement({
      ...themes,
      isImageScaled,
      includesAnimation,
      ...MakeCommonDefaultData({
        element,
        ...themes,
      }),
    });

    shadow.appendChild(defaultElement.element);

    setTimeout(() => {
      if (defaultElement.element.getBoundingClientRect().top > 0) {
        defaultElement.events.loadAnimation();
      }
    }, 10);
  };

  if (type === Attributes.values.display.HERO) {
    makeHeroType();
    return;
  }

  if (type === Attributes.values.display.OVERLAY) {
    makeOverlayType();

    return;
  }

  if (type === Attributes.values.display.STICKY) {
    makeStickyType();

    return;
  }

  makeDefaultType();
};
