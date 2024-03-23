import { Reset } from 'helpers/styles';
import { CheckForImageAlt, SlotDefaultStyling } from 'helpers/ui';
import {
  CreateImagePathway,
  STYLES_PATHWAY_IMAGE,
} from 'elements/pathway/image';
import {
  CreateHighlightPathway,
  STYLES_PATHWAY_HIGHLIGHT,
} from 'elements/pathway/highlight';
import { CreateHeroPathway, STYLES_PATHWAY_HERO } from 'elements/pathway/hero';
import { STYLES_PATHWAY_TEXT_CONTAINER } from 'elements/pathway/container-text';
import { STYLES_PATHWAY_IMAGE_CONTAINER } from 'elements/pathway/container-image';

import { UMDPathwayElement } from '../index';

const IMAGE = 'image';
const HEADLINE = 'headline';
const EYEBROW = 'eyebrow';
const TEXT = 'text';
const ACTIONS = 'actions';
const HIGHLIGHT = 'highlight';
const HIGHLIGHT_ATTRIBUTION = 'highlight-attribution';

const ATTRIBUTE_IMAGE_POSITION = 'image-position';
const ATTRIBUTE_IMAGE_SCALED = 'image-scaled';
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_TYPE = 'type';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const THEME_MARYLAND = 'maryland';
const THEME_WHITE = 'white';
const TYPE_HERO = 'hero';
const TYPE_HIGHLIGHT = 'highlight';

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${STYLES_PATHWAY_IMAGE}
  ${STYLES_PATHWAY_HERO}
  ${STYLES_PATHWAY_HIGHLIGHT}
  ${STYLES_PATHWAY_TEXT_CONTAINER}
  ${STYLES_PATHWAY_IMAGE_CONTAINER}
`;

const GetImage = ({ element }: { element: UMDPathwayElement }) => {
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

  if (type === TYPE_HIGHLIGHT) {
    return CreateHighlightPathway({
      theme,
      isImageRight,
      eyebrow: SlotDefaultStyling({ element, slotRef: EYEBROW }),
      headline: SlotDefaultStyling({ element, slotRef: HEADLINE }),
      text: SlotDefaultStyling({ element, slotRef: TEXT }),
      action: SlotDefaultStyling({ element, slotRef: ACTIONS }),
      quote: SlotDefaultStyling({
        element,
        slotRef: HIGHLIGHT,
      }),
      attribution: SlotDefaultStyling({
        element,
        slotRef: HIGHLIGHT_ATTRIBUTION,
      }),
    });
  }

  if (type === TYPE_HERO) {
    return CreateHeroPathway({
      theme,
      isImageRight,
      eyebrow: SlotDefaultStyling({ element, slotRef: EYEBROW }),
      headline: SlotDefaultStyling({ element, slotRef: HEADLINE }),
      text: SlotDefaultStyling({ element, slotRef: TEXT }),
      action: SlotDefaultStyling({ element, slotRef: ACTIONS }),
      image: GetImage({ element }),
    });
  }

  return CreateImagePathway({
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
