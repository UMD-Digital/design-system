import { PathwayHero, PathwayDefault, PathwayElements } from 'elements';
import { Reset } from 'helpers/styles';
import { CheckForImageAlt, SlotDefaultStyling } from 'helpers/ui';
import { UMDPathwayElement } from './index';

const ATTRIBUTE_IMAGE_POSITION = 'image-position';
const ATTRIBUTE_IMAGE_SCALED = 'image-scaled';
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_TYPE = 'type';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const THEME_MARYLAND = 'maryland';
const THEME_WHITE = 'white';
const TYPE_HERO = 'hero';

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${PathwayDefault.Styles}
  ${PathwayHero.Styles}
  ${PathwayElements.Image.Styles}
  ${PathwayElements.Text.Styles}
`;

const GetImage = ({ element }: { element: UMDPathwayElement }) => {
  const { IMAGE } = element._slots;
  const isProperImage = CheckForImageAlt({ element, slotRef: IMAGE });
  const slotImage = SlotDefaultStyling({ element, slotRef: IMAGE });

  if (isProperImage && slotImage) {
    return slotImage.cloneNode(true) as HTMLImageElement;
  }

  return null;
};

export const CreateShadowDom = ({
  element,
}: {
  element: UMDPathwayElement;
}) => {
  const { EYEBROW, HEADLINE, TEXT, ACTIONS } = element._slots;
  const isImageRight =
    element.getAttribute(ATTRIBUTE_IMAGE_POSITION) !== 'left';
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
      theme,
      isImageRight,
      eyebrow: SlotDefaultStyling({ element, slotRef: EYEBROW }),
      headline: SlotDefaultStyling({ element, slotRef: HEADLINE }),
      text: SlotDefaultStyling({ element, slotRef: TEXT }),
      action: SlotDefaultStyling({ element, slotRef: ACTIONS }),
      image: GetImage({ element }),
    });
  }

  return PathwayDefault.CreateElement({
    theme,
    isImageRight,
    isImageScaled,
    eyebrow: SlotDefaultStyling({ element, slotRef: EYEBROW }),
    headline: SlotDefaultStyling({ element, slotRef: HEADLINE }),
    text: SlotDefaultStyling({ element, slotRef: TEXT }),
    action: SlotDefaultStyling({ element, slotRef: ACTIONS }),
    image: GetImage({ element }),
  });
};
