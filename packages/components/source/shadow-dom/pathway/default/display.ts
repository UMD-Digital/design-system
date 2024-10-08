import {
  PathwayDefault,
  PathwayElements,
  PathwayHero,
  PathwayOverlay,
  PathwaySticky,
  EventElements,
} from 'elements';
import { MarkupCreate, MarkupEvent, MarkupValidate, Styles } from 'utilities';
import { CommonPathwayData } from '../common';
import { UMDPathwayElement } from './index';

const { SlotWithDefaultStyling } = MarkupCreate;

const ATTRIBUTE_IMAGE_POSITION = 'image-position';
const ATTRIBUTE_IMAGE_SCALED = 'image-scaled';
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_TYPE = 'type';
const ATTRIBUTE_SHOW_TIME = 'show-time';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const THEME_MARYLAND = 'maryland';
const TYPE_HERO = 'hero';
const TYPE_OVERLAY = 'overlay';
const TYPE_STICKY = 'sticky';

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
  const { IMAGE, VIDEO, START_DATE_ISO, END_DATE_ISO, LOCATION, STATS } =
    element._slots;
  const startDateSlot = element.querySelector(`[slot="${START_DATE_ISO}"]`);
  const endDateSlot = element.querySelector(`[slot="${END_DATE_ISO}"]`);
  const locationSlot = element.querySelector(`[slot="${LOCATION}"]`);
  const isImageRight =
    element.getAttribute(ATTRIBUTE_IMAGE_POSITION) !== 'left';
  const showTime = element.getAttribute(ATTRIBUTE_SHOW_TIME) !== 'false';

  const startDate = MarkupEvent.CreateDate({ element: startDateSlot });
  const endDate = MarkupEvent.CreateDate({ element: endDateSlot });
  const obj = {
    ...CommonPathwayData({
      element,
      slots: element._slots,
    }),
    isImageRight,
    stats: SlotWithDefaultStyling({ element, slotRef: STATS }),
    image: MarkupValidate.ImageSlot({ element, ImageSlot: IMAGE }),
    video: SlotWithDefaultStyling({ element, slotRef: VIDEO }),
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
    if (theme === THEME_LIGHT || !theme) {
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
    element.getAttribute(ATTRIBUTE_IMAGE_SCALED) !== 'false';
  const type = element.getAttribute(ATTRIBUTE_TYPE);
  const themeAttribute = element.getAttribute(ATTRIBUTE_THEME);
  let theme = null;

  shadow.appendChild(element._styles.content.cloneNode(true));

  if (themeAttribute) {
    if (themeAttribute === THEME_LIGHT) theme = THEME_LIGHT;
    if (themeAttribute === THEME_DARK) theme = THEME_DARK;
    if (themeAttribute === THEME_MARYLAND) theme = THEME_MARYLAND;
  }

  if (type === TYPE_HERO) {
    shadow.appendChild(
      PathwayHero.CreateElement({
        ...MakeCommonDefaultData({ element, theme }),
      }),
    );

    return;
  }

  if (type === TYPE_OVERLAY) {
    shadow.appendChild(
      PathwayOverlay.CreateElement({
        theme,
        isImageScaled,
        ...MakeCommonDefaultData({ element, theme }),
      }),
    );

    return;
  }

  if (type === TYPE_STICKY) {
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
      ...MakeCommonDefaultData({ element, theme }),
    }),
  );
};
