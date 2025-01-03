import { token } from '@universityofmaryland/web-styles-library';
import { BlockOverlay as LayoutBlockOverlay } from 'layout';
import { TextLockupSmall } from 'macros';

type TypeEventPromoProps = {
  image: HTMLImageElement | null;
  headline: HTMLElement | null;
  eventDetails: HTMLElement;
  dateSign: HTMLElement;
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
};

const ELEMENT_NAME = 'umd-event-promo';
const ELEMENT_EVENT_PROMO_CONTAINER = 'event-promo-container';
const ELEMENT_EVENT_PROMO_META_WRAPPER = 'event-promo-meta-wrapper';
const ELEMENT_EVENT_PROMO_SIGN_WRAPPER = 'event-promo-sign-wrapper';

// prettier-ignore
const DateSign = `
  .${ELEMENT_EVENT_PROMO_SIGN_WRAPPER} {
    display: inline-block;
    bottom: ${token.spacing.min};
    left: ${token.spacing.min};
    background-color: ${token.color.white};
    padding: ${token.spacing.min};
  }

  @media (${token.media.queries.tablet.min}) {
    .${ELEMENT_EVENT_PROMO_SIGN_WRAPPER} {
      padding: ${token.spacing.sm} ${token.spacing.sm} ${token.spacing.min} ${token.spacing.sm};
    }
  }
`;

// prettier-ignore
const DetailsMeta = `
  * + .${ELEMENT_EVENT_PROMO_META_WRAPPER} {
    margin-top: ${token.spacing.sm};
  }

  .${ELEMENT_EVENT_PROMO_META_WRAPPER} + * {
    margin-top: ${token.spacing.sm} !important;
  }
`;

// prettier-ignore
const STYLES_EVENT_PROMO_ELEMENT = `
  .${ELEMENT_EVENT_PROMO_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    height: 100%;
    max-width: ${token.spacing.maxWidth.smallest};
  }

  ${LayoutBlockOverlay.Styles}
  ${DetailsMeta}
  ${DateSign}
`;

const CreateEventPromoElement = (props: TypeEventPromoProps) => {
  const { eventDetails, dateSign } = props;
  const blockOverlayContainer = LayoutBlockOverlay.CreateElement(props);
  const elementContainer = document.createElement('div');
  const signWrapper = document.createElement('div');

  if (!blockOverlayContainer) return null;
  const headline = blockOverlayContainer.querySelector(
    `.${TextLockupSmall.Elements.headline}`,
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
