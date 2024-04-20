import { Tokens } from '@universityofmaryland/variables';
import BlockImageOverlay, {
  TypeBlockOverlayImageElement,
} from '../../macros/layout/block/overlay';
import CtaIcon, { TypeCardOverlayCtaIcon } from './icon-cta';
import { ELEMENT_TEXT_LOCKUP_SMALL_WRAPPER } from '../../macros/text-lockup/small';

type TypeCardOverlayImageElement = TypeCardOverlayCtaIcon &
  TypeBlockOverlayImageElement & {
    image?: HTMLImageElement | null;
  };

const { Spacing, Colors } = Tokens;

const ELEMENT_NAME = 'umd-card-overlay-image';
const ATTRIBUTE_CTA_ICON = 'cta-icon';

const ELEMENT_CARD_OVERLAY_IMAGE_DECLARATION = 'card-overlay-image-declaration';

const IS_WITH_CTA_ICON = `[${ATTRIBUTE_CTA_ICON}]`;

const OVERWRITE_CTA_ICON_TEXT_LOCKUP = `.${ELEMENT_CARD_OVERLAY_IMAGE_DECLARATION}${IS_WITH_CTA_ICON} .${ELEMENT_TEXT_LOCKUP_SMALL_WRAPPER}`;

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

  ${BlockImageOverlay.Styles}
  ${OverwriteCtaIcon}
`;

const CreateCardOverlayElement = (element: TypeCardOverlayImageElement) => {
  const elementDeclaration = document.createElement('div');
  const blockOverlayContainer = BlockImageOverlay.CreateElement(element);
  const ctaIcon = CtaIcon.CreateElement({ ...element, theme: 'dark' });

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
