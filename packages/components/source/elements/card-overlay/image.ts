import { Tokens } from '@universityofmaryland/variables';
import { LayoutBlockOverlay, TextLockupSmall } from 'macros';
import CtaIcon, { TypeCardOverlayCtaIcon } from './icon-cta';

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

const OVERWRITE_CTA_ICON_TEXT_LOCKUP = `.${ELEMENT_CARD_OVERLAY_IMAGE_DECLARATION}${IS_WITH_CTA_ICON} .${TextLockupSmall.Elements.wrapper}`;

const OverwriteCtaIcon = `
  ${OVERWRITE_CTA_ICON_TEXT_LOCKUP} {
    padding-right: ${Spacing.xl};
  }
`;

// prettier-ignore
const STYLES_OVERLAY_CARD_ELEMENT = `
  .${ELEMENT_CARD_OVERLAY_IMAGE_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
    height: 100%;
  }

  .${ELEMENT_CARD_OVERLAY_IMAGE_DECLARATION} * {
    color: ${Colors.white};
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
