import { Tokens } from '@universityofmaryland/variables';
import BlockImageOverlay, {
  TypeBlockOverlayImageElement,
  ELEMENT_BLOCK_OVERLAY_IMAGE_CONTAINER,
} from '../shared-elements/block/overlay';
import { ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE } from '../shared-elements/lockup/text-small';

type TypeEventPromoProps = TypeBlockOverlayImageElement & {
  image?: HTMLImageElement | null;
  eventDetails: HTMLElement;
  dateSign: HTMLElement;
};

const { Spacing, Colors, MaxWidth } = Tokens;

const ELEMENT_NAME = 'umd-event-promo';
const ELEMENT_EVENT_PROMO_CONTAINER = 'event-promo-container';
const ELEMENT_EVENT_PROMO_META_WRAPPER = 'event-promo-meta-wrapper';
const ELEMENT_EVENT_PROMO_SIGN_WRAPPER = 'event-promo-sign-wrapper';

// prettier-ignore
const DateSign = `
  .${ELEMENT_EVENT_PROMO_SIGN_WRAPPER} {
    display: inline-block;
    bottom: ${Spacing.min};
    left: ${Spacing.min};
    background-color: ${Colors.white};
    padding: ${Spacing.sm} ${Spacing.sm} ${Spacing.min} ${Spacing.sm};
  }
`;

// prettier-ignore
const DetailsMeta = `
  * + .${ELEMENT_EVENT_PROMO_META_WRAPPER} {
    margin-top: ${Spacing.sm};
  }

  .${ELEMENT_EVENT_PROMO_META_WRAPPER} + * {
    margin-top: ${Spacing.sm} !important;
  }
`;

// prettier-ignore
const STYLES_EVENT_PROMO_ELEMENT = `
  .${ELEMENT_EVENT_PROMO_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    height: 100%;
    max-width: ${MaxWidth.smallest};
  }

  ${BlockImageOverlay.Styles}
  ${DetailsMeta}
  ${DateSign}
`;

const CreateEventPromoElement = (element: TypeEventPromoProps) => {
  const { eventDetails, dateSign } = element;
  const blockOverlayContainer = BlockImageOverlay.CreateElement(element);
  const elementContainer = document.createElement('div');
  const signWrapper = document.createElement('div');

  if (!blockOverlayContainer) return null;
  const headline = blockOverlayContainer.querySelector(
    `.${ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE}`,
  ) as HTMLElement;

  if (eventDetails && headline) {
    eventDetails.classList.add(ELEMENT_EVENT_PROMO_META_WRAPPER);
    headline.insertAdjacentElement('afterend', eventDetails);
  }

  if (dateSign && headline) {
    signWrapper.classList.add(ELEMENT_EVENT_PROMO_SIGN_WRAPPER);
    signWrapper.appendChild(dateSign);

    headline.insertAdjacentElement('beforebegin', signWrapper);
  }

  elementContainer.appendChild(blockOverlayContainer);
  elementContainer.classList.add(ELEMENT_EVENT_PROMO_CONTAINER);

  return elementContainer;
};

export default {
  CreateElement: CreateEventPromoElement,
  Styles: STYLES_EVENT_PROMO_ELEMENT,
};
