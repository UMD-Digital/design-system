import * as Styles from '@universityofmaryland/web-styles-library';
import { blockOverlay } from 'layout';
import { textLockup } from 'atomic';
import { default as eventElements } from './elements';
import * as Utility from 'utilities';

type TypeEventPromoProps = {
  image: HTMLImageElement;
  headline: HTMLElement | null;
  eventDetails: HTMLElement;
  dateSign: HTMLElement;
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
};

const { convertJSSObjectToStyles } = Utility.styles;
const { token, element } = Styles;

const ELEMENT_NAME = 'umd-event-promo';
const ELEMENT_EVENT_PROMO_CONTAINER = 'event-promo-container';
const ELEMENT_EVENT_PROMO_META_WRAPPER = 'event-promo-meta-wrapper';
const ELEMENT_EVENT_PROMO_SIGN_WRAPPER = 'event-promo-sign-wrapper';

const OVERRIDE_RICH_TEXT = `.${ELEMENT_EVENT_PROMO_CONTAINER} .${textLockup.smallScaleElements.text}`;
const OVERRIDE_HEADLINE = `.${ELEMENT_EVENT_PROMO_CONTAINER} .${textLockup.smallScaleElements.headline}`;

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

  ${convertJSSObjectToStyles({
    styleObj: {
      [`${OVERRIDE_RICH_TEXT}`]: element.text.rich.simpleScalingDark,
    },
  })}

  ${OVERRIDE_HEADLINE} {
    margin-top: ${token.spacing.min};
    color: ${token.color.white} !important;
  }

  ${DetailsMeta}
  ${DateSign}
  ${eventElements.meta.Styles}
  ${eventElements.sign.Styles}
`;

export default (props: TypeEventPromoProps) => {
  const { eventDetails, dateSign } = props;
  const blockOverlayContainer = blockOverlay({ ...props });
  const elementContainer = document.createElement('div');
  const signWrapper = document.createElement('div');
  let styles = STYLES_EVENT_PROMO_ELEMENT;

  const headline = blockOverlayContainer.element.querySelector(
    `.${textLockup.smallScaleElements.headline}`,
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

  elementContainer.appendChild(blockOverlayContainer.element);
  styles += blockOverlayContainer.styles;

  elementContainer.classList.add(ELEMENT_EVENT_PROMO_CONTAINER);

  return { element: elementContainer, styles };
};
