import { Tokens } from '@universityofmaryland/variables';
import { LayoutBlockOverlay, TextLockupSmall } from 'macros';
import CtaIcon, { TypeCardOverlayCtaIcon } from './elements/icon-cta';

type TypeCardOverlayImageElement = TypeCardOverlayCtaIcon & {
  image: HTMLImageElement | null;
  headline: HTMLElement | null;
  text: HTMLElement | null;
  eyebrow?: HTMLElement | null;
  actions?: HTMLElement | null;
};

const { Spacing, Colors } = Tokens;

const ELEMENT_NAME = 'umd-card-overlay-image';
const ATTRIBUTE_CTA_ICON = 'cta-icon';

const ELEMENT_CARD_OVERLAY_IMAGE_DECLARATION = 'card-overlay-image-declaration';

const IS_WITH_CTA_ICON = `[${ATTRIBUTE_CTA_ICON}]`;

const OVERWRITE_CTA_ICON_BLOCK_CONTAINER = `.${ELEMENT_CARD_OVERLAY_IMAGE_DECLARATION}${IS_WITH_CTA_ICON} .${LayoutBlockOverlay.Elements.container}`;
const OVERWRITE_CTA_ICON_BLOCK_RICH_TEXT = `.${ELEMENT_CARD_OVERLAY_IMAGE_DECLARATION}${IS_WITH_CTA_ICON} .${TextLockupSmall.Elements.richText}`;
const OVERWRITE_CTA_ICON_BLOCK_DATE = `.${ELEMENT_CARD_OVERLAY_IMAGE_DECLARATION}${IS_WITH_CTA_ICON} .${TextLockupSmall.Elements.date}`;

const OverwriteCtaIcon = `
  ${OVERWRITE_CTA_ICON_BLOCK_CONTAINER} {
    padding-right: ${Spacing.xl};
  }

  ${OVERWRITE_CTA_ICON_BLOCK_RICH_TEXT} {
    padding-right: ${Spacing.xs};
  }

  ${OVERWRITE_CTA_ICON_BLOCK_DATE} {
    padding-right: ${Spacing.xs};
  }
`;

// prettier-ignore
const STYLES_OVERLAY_CARD_ELEMENT = `
  .${ELEMENT_CARD_OVERLAY_IMAGE_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
    height: 100%;
  }

  .${ELEMENT_CARD_OVERLAY_IMAGE_DECLARATION} * {
    color: ${Colors.white} !important;
  }

  ${LayoutBlockOverlay.Styles}
  ${OverwriteCtaIcon}
`;

const CreateCardOverlayElement = (props: TypeCardOverlayImageElement) => {
  const elementDeclaration = document.createElement('div');
  const blockOverlayContainer = LayoutBlockOverlay.CreateElement({
    ...props,
    theme: 'dark',
  });
  const ctaIcon = CtaIcon.CreateElement({ ...props, theme: 'dark' });

  if (blockOverlayContainer) {
    if (ctaIcon) {
      elementDeclaration.setAttribute(ATTRIBUTE_CTA_ICON, '');
      blockOverlayContainer.appendChild(ctaIcon);
    }

    elementDeclaration.appendChild(blockOverlayContainer);
    elementDeclaration.classList.add(ELEMENT_CARD_OVERLAY_IMAGE_DECLARATION);

    return elementDeclaration;
  }

  return null;
};

export default {
  CreateElement: CreateCardOverlayElement,
  Styles: STYLES_OVERLAY_CARD_ELEMENT,
};
