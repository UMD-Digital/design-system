import {
  PathwayDefault,
  PathwayElements,
  PathwayHero,
  PathwayOverlay,
  EventElements,
} from 'elements';
import { MarkupCreate, MarkupEvent, MarkupValidate, Styles } from 'utilities';
import { UMDPathwayElement } from './index';

const { SlotWithDefaultStyling } = MarkupCreate;

const ATTRIBUTE_IMAGE_POSITION = 'image-position';
const ATTRIBUTE_IMAGE_SCALED = 'image-scaled';
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_TYPE = 'type';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const THEME_MARYLAND = 'maryland';
const THEME_WHITE = 'white';
const TYPE_HERO = 'hero';
const TYPE_OVERLAY = 'overlay';

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
`;

const MakeCommonData = ({
  element,
  theme,
}: {
  element: UMDPathwayElement;
  theme: string;
}) => {
  const {
    EYEBROW,
    HEADLINE,
    TEXT,
    ACTIONS,
    IMAGE,
    START_DATE_ISO,
    END_DATE_ISO,
    LOCATION,
  } = element._slots;
  const startDateSlot = element.querySelector(`[slot="${START_DATE_ISO}"]`);
  const endDateSlot = element.querySelector(`[slot="${END_DATE_ISO}"]`);
  const locationSlot = element.querySelector(`[slot="${LOCATION}"]`);
  const isImageRight =
    element.getAttribute(ATTRIBUTE_IMAGE_POSITION) !== 'left';

  const startDate = MarkupEvent.CreateDate({ element: startDateSlot });
  const endDate = MarkupEvent.CreateDate({ element: endDateSlot });
  const obj = {
    isImageRight,
    eyebrow: SlotWithDefaultStyling({ element, slotRef: EYEBROW }),
    headline: SlotWithDefaultStyling({ element, slotRef: HEADLINE }),
    text: SlotWithDefaultStyling({ element, slotRef: TEXT }),
    action: SlotWithDefaultStyling({ element, slotRef: ACTIONS }),
    image: MarkupValidate.ImageSlot({ element, ImageSlot: IMAGE }),
    eventDetails: null as null | HTMLElement,
  };

  if (startDate) {
    let themeStyling = 'dark';
    if (theme === THEME_LIGHT || theme === THEME_WHITE) themeStyling = 'light';
    obj.eventDetails = EventElements.Meta.CreateElement({
      ...MarkupEvent.CreateDetailsData({
        locationElement: locationSlot,
        startDate,
        endDate,
      }),
      theme: themeStyling,
    });
  }

  return obj;
};

export const CreateShadowDom = ({
  element,
}: {
  element: UMDPathwayElement;
}) => {
  const isImageScaled =
    element.getAttribute(ATTRIBUTE_IMAGE_SCALED) !== 'false';
  const type = element.getAttribute(ATTRIBUTE_TYPE);
  const themeAttribute = element.getAttribute(ATTRIBUTE_THEME);
  let theme = THEME_WHITE;

  if (themeAttribute) {
    if (themeAttribute === THEME_LIGHT) theme = THEME_LIGHT;
    if (themeAttribute === THEME_DARK) theme = THEME_DARK;
    if (themeAttribute === THEME_MARYLAND) theme = THEME_MARYLAND;
  }

  if (type === TYPE_HERO) {
    return PathwayHero.CreateElement({
      ...MakeCommonData({ element, theme }),
    });
  }

  if (type === TYPE_OVERLAY) {
    return PathwayOverlay.CreateElement({
      theme,
      isImageScaled,
      ...MakeCommonData({ element, theme }),
    });
  }

  return PathwayDefault.CreateElement({
    theme,
    isImageScaled,
    ...MakeCommonData({ element, theme }),
  });
};
