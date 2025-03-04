import { token } from '@universityofmaryland/web-styles-library';
import {
  blockOverlay,
  blockOverlayElements,
  STYLES_BLOCK_OVERLAY_ELEMENT,
} from 'layout';
import { actions, textLockup } from 'atomic';
import * as Utility from 'utilities';

type TypeCardOverlayImageElement = {
  image: HTMLImageElement | HTMLAnchorElement;
  headline: HTMLElement | null;
  text: HTMLElement | null;
  eyebrow?: HTMLElement | null;
  actions?: HTMLElement | null;
  isQuote?: boolean;
  ctaIcon?: HTMLElement | null;
  isThemeDark?: boolean;
  isThemeLight?: boolean;
};

const ELEMENT_NAME = 'umd-card-overlay-image';
const ATTRIBUTE_CTA_ICON = 'cta-icon';

const ELEMENT_CARD_OVERLAY_IMAGE_DECLARATION = 'card-overlay-image-declaration';
const ELEMENT_CARD_OVERLAY_QUOTE = 'card-overlay-image-quote';

const IS_WITH_CTA_ICON = `[${ATTRIBUTE_CTA_ICON}]`;

const OVERWRITE_CTA_ICON_BLOCK_CONTAINER = `.${ELEMENT_CARD_OVERLAY_IMAGE_DECLARATION}${IS_WITH_CTA_ICON} .${blockOverlayElements.container}`;
const OVERWRITE_CTA_ICON_BLOCK_RICH_TEXT = `.${ELEMENT_CARD_OVERLAY_IMAGE_DECLARATION}${IS_WITH_CTA_ICON} .${textLockup.smallElements.text}`;
const OVERWRITE_CTA_ICON_BLOCK_DATE = `.${ELEMENT_CARD_OVERLAY_IMAGE_DECLARATION}${IS_WITH_CTA_ICON} .${textLockup.smallElements.date}`;

const OverwriteCtaIcon = `
  ${OVERWRITE_CTA_ICON_BLOCK_CONTAINER} {
    padding-right: ${token.spacing.xl};
  }

  ${OVERWRITE_CTA_ICON_BLOCK_RICH_TEXT} {
    padding-right: ${token.spacing.xs};
  }

  ${OVERWRITE_CTA_ICON_BLOCK_DATE} {
    padding-right: ${token.spacing.xs};
  }
`;

const QuoteStyles = `
  .${ELEMENT_CARD_OVERLAY_QUOTE} {
    width: 41px;
    height: 30px;
    margin-bottom: ${token.spacing.xs};
  }

  .${ELEMENT_CARD_OVERLAY_QUOTE} svg {
    fill: ${token.color.red};
  }
`;

// prettier-ignore
export const STYLES_OVERLAY_CARD_IMAGE = `
  .${ELEMENT_CARD_OVERLAY_IMAGE_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
    height: 100%;
    position: relative;
  }

  .${ELEMENT_CARD_OVERLAY_IMAGE_DECLARATION} * {
    color: ${token.color.white} !important;
  }

  ${OverwriteCtaIcon}
  ${QuoteStyles}
  ${STYLES_BLOCK_OVERLAY_ELEMENT}
`;

export default (props: TypeCardOverlayImageElement) => {
  const { isQuote, ctaIcon } = props;
  const elementDeclaration = document.createElement('div');
  const blockOverlayContainer = blockOverlay({
    ...props,
    isThemeDark: true,
  });

  let styles = STYLES_OVERLAY_CARD_IMAGE;

  if (blockOverlayContainer) {
    if (isQuote) {
      const lockup = blockOverlayContainer.element.querySelector(
        `.${textLockup.smallElements.container}`,
      );

      if (lockup) {
        const quoteWrapper = document.createElement('div');
        quoteWrapper.classList.add(ELEMENT_CARD_OVERLAY_QUOTE);
        quoteWrapper.innerHTML = Utility.asset.icon.QUOTE;

        lockup.insertBefore(quoteWrapper, lockup.firstChild);
      }
    }

    if (ctaIcon && ctaIcon instanceof HTMLElement) {
      const actionIcon = actions.icon({ ...props, ctaIcon, isThemeDark: true });

      elementDeclaration.setAttribute(ATTRIBUTE_CTA_ICON, '');
      blockOverlayContainer.element.appendChild(actionIcon.element);
      styles += actionIcon.styles;
    }

    elementDeclaration.appendChild(blockOverlayContainer.element);
    styles += blockOverlayContainer.styles;

    elementDeclaration.classList.add(ELEMENT_CARD_OVERLAY_IMAGE_DECLARATION);

    return { element: elementDeclaration, styles };
  }

  return null;
};
