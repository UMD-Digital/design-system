import { Tokens, Elements } from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import BlockContainer, { TypeBlockContainer } from '../block/container';
import BlockImageContainer, {
  ELEMENT_BLOCK_IMAGE_CONTAINER,
} from '../block/image';
import LockupTextContainer, {
  TypeTextLockupSmall,
  ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE,
} from '../lockup/text-small';

type TypeEventFeatureProps = TypeTextLockupSmall &
  TypeBlockContainer & {
    image?: HTMLImageElement | null;
    eventDetails: HTMLElement;
    dateSign: HTMLElement;
  };

const { Spacing, Colors } = Tokens;
const { ConvertJSSObjectToStyles } = Styles;
const { Eyebrow } = Elements;

const ELEMENT_NAME = 'umd-event-feature';
const ELEMENT_EVENT_FEATURE_CONTAINER = 'event-feature-container';
const ELEMENT_EVENT_FEATURE_META_WRAPPER = 'event-feature-meta-wrapper';
const ELEMENT_EVENT_SIGN_WRAPPER = 'event-feature-sign-wrapper';
const ELEMENT_EVENT_FEATURE_EYEBROW = 'event-feature-details-eyebrow';

const OVERWRITE_IMAGE_CONTAINER = `.${ELEMENT_EVENT_FEATURE_CONTAINER} .${ELEMENT_BLOCK_IMAGE_CONTAINER} `;

// prettier-ignore
const OverwriteImageContainer = `
  ${OVERWRITE_IMAGE_CONTAINER} {
    position: relative;
  }

  .${ELEMENT_EVENT_SIGN_WRAPPER} {
    position: absolute;
    z-index: 9;
    bottom: ${Spacing.min};
    left: ${Spacing.min};
    background-color: ${Colors.white};
    padding: ${Spacing.sm} ${Spacing.sm} ${Spacing.min} ${Spacing.sm};
  }
`;

// prettier-ignore
const DetailsMeta = `
  * + .${ELEMENT_EVENT_FEATURE_META_WRAPPER} {
    margin-top: ${Spacing.sm};
  }

  .${ELEMENT_EVENT_FEATURE_META_WRAPPER} + * {
    margin-top: ${Spacing.sm} !important;
  }
`;

// prettier-ignore
const EyebrowStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_EVENT_FEATURE_EYEBROW}`]: Eyebrow.Ribbon,
    },
  })}

  .${ELEMENT_EVENT_FEATURE_EYEBROW} {
    margin-bottom: ${Spacing.sm};
  }
`;

// prettier-ignore
const STYLES_EVENT_FEATURE_ELEMENT = `
  .${ELEMENT_EVENT_FEATURE_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  ${BlockImageContainer.Styles}
  ${LockupTextContainer.Styles}
  ${BlockContainer.Styles}
  ${DetailsMeta}
  ${EyebrowStyles}
  ${OverwriteImageContainer}
`;

const MakeEyebrow = () => {
  const eyebrow = document.createElement('span');
  eyebrow.innerHTML = 'Featured Event';
  eyebrow.classList.add(ELEMENT_EVENT_FEATURE_EYEBROW);
  return eyebrow;
};

const CreateEventFeatureElement = (element: TypeEventFeatureProps) => {
  const { theme, image, eventDetails, dateSign } = element;

  const textContainer = LockupTextContainer.CreateElement({
    ...element,
    eyebrow: MakeEyebrow(),
  });
  const elementContainer = document.createElement('div');
  const imageContainer = image
    ? BlockImageContainer.CreateElement({ image })
    : null;
  const container = BlockContainer.CreateElement({
    textContainer,
    imageContainer,
    theme,
  });

  if (eventDetails) {
    const headline = textContainer.querySelector(
      `.${ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE}`,
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

  return elementContainer;
};

export default {
  CreateElement: CreateEventFeatureElement,
  Styles: STYLES_EVENT_FEATURE_ELEMENT,
};
