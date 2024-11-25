import {
  PathwayDefault,
  PathwayElements,
  PathwayHero,
  PathwayOverlay,
  PathwaySticky,
  EventElements,
} from 'elements';
import { Attributes, Slots } from 'shadow-dom-model';
import { MarkupCreate, MarkupEvent, MarkupValidate, Styles } from 'utilities';
import { CommonPathwayData } from '../common';
import { UMDPathwayElement } from './index';

const { SlotWithDefaultStyling } = MarkupCreate;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${EventElements.Meta.Styles}
  ${EventElements.Sign.Styles}
  ${PathwayElements.Image.Styles}
  ${PathwayElements.Text.Styles}
  ${PathwayDefault.Styles}
  ${PathwayHero.Styles}
  ${PathwayOverlay.Styles}
  ${PathwaySticky.Styles}
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
  const locationSlot = element.querySelector(`[slot="${Slots.name.LOCATION}"]`);
  const isImageRight =
    element.getAttribute(Attributes.names.LAYOUT_IMAGE_POSITION) !== 'left';
  const showTime =
    element.getAttribute(Attributes.names.OPTIONAL_SHOW_TIME) !== 'false';

  const startDate = MarkupEvent.CreateDate({ element: startDateSlot });
  const endDate = MarkupEvent.CreateDate({ element: endDateSlot });
  const obj = {
    ...CommonPathwayData({
      element,
    }),
    isImageRight,
    stats: SlotWithDefaultStyling({ element, slotRef: Slots.name.STATS }),
    image: MarkupValidate.ImageSlot({ element, ImageSlot: Slots.name.IMAGE }),
    video: SlotWithDefaultStyling({ element, slotRef: Slots.name.VIDEO }),
    eventDetails: null as null | HTMLElement,
    eventSign: null as null | HTMLElement,
  };
  let themeToggle = true;

  if (isThemeMaryland) themeToggle = false;
  if (isThemeDark) themeToggle = false;

  if (startDate) {
    const eventData = MarkupEvent.CreateDetailsData({
      locationElement: locationSlot,
      startDate,
      endDate,
    });

    obj.eventDetails = EventElements.Meta.CreateElement({
      ...eventData,
      isThemeDark: themeToggle,
      showTime,
    });

    obj.eventSign = EventElements.Sign.CreateElement({
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
  const type = element.getAttribute(Attributes.names.TYPE);
  const isThemeDark = Attributes.isTheme.dark({ element });
  const isThemeLight = Attributes.isTheme.light({ element });
  const isThemeMaryland = Attributes.isTheme.maryland({ element });
  const includesAnimation = Attributes.includesFeature.animation({ element });

  shadow.appendChild(element._styles.content.cloneNode(true));

  const themes = {
    isThemeDark,
    isThemeLight,
    isThemeMaryland,
  };

  const makeHeroType = () => {
    shadow.appendChild(
      PathwayHero.CreateElement({
        ...MakeCommonDefaultData({ element, ...themes }),
        includesAnimation,
      }),
    );
  };

  const makeOverlayType = () => {
    const overlay = PathwayOverlay.CreateElement({
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
      PathwaySticky.CreateElement({
        isThemeDark: Attributes.isTheme.dark({ element }),
        isImageScaled,
        ...MakeCommonDefaultData({ element, ...themes }),
      }),
    );
  };

  const makeDefaultType = () => {
    const defaultElement = PathwayDefault.CreateElement({
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

  if (type === Attributes.values.DISPLAY_HERO) {
    makeHeroType();
    return;
  }

  if (type === Attributes.values.DISPLAY_OVERLAY) {
    makeOverlayType();

    return;
  }

  if (type === Attributes.values.DISPLAY_STICKY) {
    makeStickyType();

    return;
  }

  makeDefaultType();
};
