import {
  elementStyles,
  tokens,
} from '@universityofmaryland/web-elements-styles';
import { Block as LayoutBlock, Image as LayoutImage } from 'layout';
import { TextLockupSmall, TextLockupSmallScaling } from 'macros';
import { Styles } from 'utilities';

type TypeEventFeatureProps = {
  headline: HTMLElement | null;
  image: HTMLImageElement | null;
  eventDetails: HTMLElement;
  dateSign: HTMLElement;
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
  isThemeDark?: boolean;
};

const { spacing, colors } = tokens;
const { convertJSSObjectToStyles } = Styles;

const MEDIUM = 650;
const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const ELEMENT_NAME = 'umd-event-feature';
const ELEMENT_EVENT_FEATURE_CONTAINER = 'event-feature-container';
const ELEMENT_EVENT_FEATURE_META_WRAPPER = 'event-feature-meta-wrapper';
const ELEMENT_EVENT_SIGN_WRAPPER = 'event-feature-sign-wrapper';
const ELEMENT_EVENT_FEATURE_EYEBROW = 'event-feature-details-eyebrow';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const OVERWRITE_THEME_DARK_EYEBROW = `.${ELEMENT_EVENT_FEATURE_CONTAINER}${IS_THEME_DARK} .${ELEMENT_EVENT_FEATURE_EYEBROW}`;

// prettier-ignore
const OverwriteThemeDark = `
  ${OVERWRITE_THEME_DARK_EYEBROW} {
    color: ${colors.black} !important;
  }
`;

// prettier-ignore
const OverwriteImageContainer = `
  .${ELEMENT_EVENT_SIGN_WRAPPER} {
    position: absolute;
    z-index: 9;
    bottom: ${spacing.min};
    left: ${spacing.min};
    background-color: ${colors.white};
    padding: ${spacing.sm} ${spacing.sm} ${spacing.min} ${spacing.sm};
  }

  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    .${ELEMENT_EVENT_SIGN_WRAPPER} {
      display: none;
    }
  }
`;

// prettier-ignore
const DetailsMeta = `
  * + .${ELEMENT_EVENT_FEATURE_META_WRAPPER} {
    margin-top: ${spacing.sm};
  }

  .${ELEMENT_EVENT_FEATURE_META_WRAPPER} + * {
    margin-top: ${spacing.sm} !important;
  }
`;

// prettier-ignore
const EyebrowStyles = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_EVENT_FEATURE_EYEBROW}`]: elementStyles.text.decoration.ribbon,
    },
  })}

  .${ELEMENT_EVENT_FEATURE_EYEBROW} {
    margin-bottom: ${spacing.sm};
  }

  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    .${ELEMENT_EVENT_FEATURE_EYEBROW} {
      display: none;
    }
  }
`;

// prettier-ignore
const STYLES_EVENT_FEATURE_ELEMENT = `
  .${ELEMENT_EVENT_FEATURE_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  ${TextLockupSmallScaling.Styles}
  ${LayoutImage.Styles}
  ${LayoutBlock.Styles}
  ${DetailsMeta}
  ${EyebrowStyles}
  ${OverwriteImageContainer}
  ${OverwriteThemeDark}
`;

const MakeEyebrow = () => {
  const eyebrow = document.createElement('span');
  eyebrow.innerHTML = 'Featured Event';
  eyebrow.classList.add(ELEMENT_EVENT_FEATURE_EYEBROW);
  return eyebrow;
};

const CreateEventFeatureElement = (element: TypeEventFeatureProps) => {
  const { isThemeDark, image, eventDetails, dateSign } = element;

  const textContainer = TextLockupSmallScaling.CreateElement({
    ...element,
    eyebrow: MakeEyebrow(),
  });
  const elementContainer = document.createElement('div');
  const imageContainer = image ? LayoutImage.CreateElement({ image }) : null;
  const container = LayoutBlock.CreateElement({
    textContainer,
    imageContainer,
    isThemeDark,
  });

  if (eventDetails) {
    const headline = textContainer.querySelector(
      `.${TextLockupSmall.Elements.headline}`,
    ) as HTMLElement;
    eventDetails.classList.add(ELEMENT_EVENT_FEATURE_META_WRAPPER);
    headline.insertAdjacentElement('afterend', eventDetails);
  }

  if (imageContainer) {
    const signWrapper = document.createElement('div');
    signWrapper.classList.add(ELEMENT_EVENT_SIGN_WRAPPER);
    signWrapper.appendChild(dateSign);
    imageContainer.appendChild(signWrapper);
  }

  elementContainer.appendChild(container);
  elementContainer.classList.add(ELEMENT_EVENT_FEATURE_CONTAINER);
  if (isThemeDark) elementContainer.setAttribute('theme', THEME_DARK);

  return elementContainer;
};

export default {
  CreateElement: CreateEventFeatureElement,
  Styles: STYLES_EVENT_FEATURE_ELEMENT,
};
