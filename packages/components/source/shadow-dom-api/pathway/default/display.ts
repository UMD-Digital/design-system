import {
  PathwayDefault,
  PathwayElements,
  PathwayHero,
  PathwayOverlay,
  PathwaySticky,
  EventElements,
} from 'elements';
import {
  Attributes,
  AttributesNames,
  AttributesValues,
  Slots,
} from 'shadow-dom-model';
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
  theme,
}: {
  element: UMDPathwayElement;
  theme: string | null;
}) => {
  const startDateSlot = element.querySelector(
    `[slot="${Slots.DATE_START_ISO}"]`,
  );
  const endDateSlot = element.querySelector(`[slot="${Slots.DATE_END_ISO}"]`);
  const locationSlot = element.querySelector(`[slot="${Slots.LOCATION}"]`);
  const isImageRight =
    element.getAttribute(AttributesNames.LAYOUT_IMAGE_POSITION) !== 'left';
  const showTime =
    element.getAttribute(AttributesNames.OPTIONAL_SHOW_TIME) !== 'false';

  const startDate = MarkupEvent.CreateDate({ element: startDateSlot });
  const endDate = MarkupEvent.CreateDate({ element: endDateSlot });
  const obj = {
    ...CommonPathwayData({
      element,
    }),
    isImageRight,
    stats: SlotWithDefaultStyling({ element, slotRef: Slots.STATS }),
    image: MarkupValidate.ImageSlot({ element, ImageSlot: Slots.IMAGE }),
    video: SlotWithDefaultStyling({ element, slotRef: Slots.VIDEO }),
    eventDetails: null as null | HTMLElement,
    eventSign: null as null | HTMLElement,
  };

  if (startDate) {
    const eventData = MarkupEvent.CreateDetailsData({
      locationElement: locationSlot,
      startDate,
      endDate,
    });
    let themeStyling = 'dark';
    if (theme === AttributesValues.THEME_LIGHT || !theme) {
      themeStyling = 'light';
    }

    obj.eventDetails = EventElements.Meta.CreateElement({
      ...eventData,
      theme: themeStyling,
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
    element.getAttribute(AttributesNames.LAYOUT_IMAGE_SCALED) !== 'false';
  const type = element.getAttribute(AttributesNames.TYPE);
  const themeAttribute = element.getAttribute(AttributesNames.THEME);
  const includesAnimation = Attributes.includesAnimation({ element });
  let theme = null;

  shadow.appendChild(element._styles.content.cloneNode(true));

  if (themeAttribute) {
    if (themeAttribute === AttributesValues.THEME_LIGHT)
      theme = AttributesValues.THEME_LIGHT;
    if (themeAttribute === AttributesValues.THEME_DARK)
      theme = AttributesValues.THEME_DARK;
    if (themeAttribute === AttributesValues.THEME_MARYLAND)
      theme = AttributesValues.THEME_MARYLAND;
  }

  if (type === AttributesValues.DISPLAY_HERO) {
    shadow.appendChild(
      PathwayHero.CreateElement({
        ...MakeCommonDefaultData({ element, theme }),
        includesAnimation,
      }),
    );

    return;
  }

  if (type === AttributesValues.DISPLAY_OVERLAY) {
    const overlay = PathwayOverlay.CreateElement({
      theme,
      isImageScaled,
      includesAnimation,
      ...MakeCommonDefaultData({ element, theme }),
    });

    shadow.appendChild(overlay.element);

    setTimeout(() => {
      if (overlay.element.getBoundingClientRect().top > 0) {
        overlay.events.loadAnimation();
      }
    }, 10);

    return;
  }

  if (type === AttributesValues.DISPLAY_STICKY) {
    shadow.appendChild(
      PathwaySticky.CreateElement({
        theme,
        isImageScaled,
        ...MakeCommonDefaultData({ element, theme }),
      }),
    );

    return;
  }

  shadow.appendChild(
    PathwayDefault.CreateElement({
      theme,
      isImageScaled,
      includesAnimation,
      ...MakeCommonDefaultData({ element, theme }),
    }),
  );
};
