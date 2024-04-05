import { Tokens, Typography } from '@universityofmaryland/variables';
import { AssetServices, MarkupModify, Performance, Styles } from 'utilities';
import CtaIcon from './icon-cta';
import LockupTextContainer, {
  TypeTextLockupSmall,
  ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER,
  ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE,
} from '../lockup/text-small';

type TypeCardOverlayImageElement = TypeTextLockupSmall & {
  image?: HTMLImageElement | null;
};

const { Spacing } = Tokens;
const { Debounce } = Performance;
const { ConvertJSSObjectToStyles } = Styles;

const { SansLarger, SansExtraLarge } = Typography;

const SMALL = 300;
const MEDIUM = 500;

const ELEMENT_NAME = 'umd-card-overlay-image';
const ATTRIBUTE_CTA_ICON = 'cta-icon';

const ELEMENT_CARD_OVERLAY_IMAGE_DECLARATION = 'card-overlay-image-declaration';
const ELEMENT_CARD_OVERLAY_IMAGE_CONTAINER = 'card-overlay-image-container';
const ELEMENT_CARD_OVERLAY_IMAGE_WRAPPER = 'card-overlay-image-wrapper';
const ELEMENT_IMAGE_WRAPPER = 'card-overlay-image';
const ELEMENT_TINT_OVERLAY = 'card-overlay-image-tint';

const IS_WITH_CTA_ICON = `[${ATTRIBUTE_CTA_ICON}]`;

const OVERWRITE_CTA_ICON_TEXT_LOCKUP = `.${ELEMENT_CARD_OVERLAY_IMAGE_CONTAINER}${IS_WITH_CTA_ICON} .${ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER}`;

const OverwriteCtaIcon = `
  ${OVERWRITE_CTA_ICON_TEXT_LOCKUP} {
    padding-right: ${Spacing.xl};
  }
`;

const OverwriteHeadline = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE}`]: SansLarger,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE} *`]: SansLarger,
    },
  })}

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`.${ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE}`]: SansExtraLarge,
      },
    })}
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`.${ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE} *`]: SansExtraLarge,
      },
    })}
  }
`;

// prettier-ignore
const ImageTint = `
  .${ELEMENT_TINT_OVERLAY} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%);
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
  }

  .${ELEMENT_CARD_OVERLAY_IMAGE_CONTAINER}:hover .${ELEMENT_TINT_OVERLAY} {
    opacity: .7;
  }

  .${ELEMENT_CARD_OVERLAY_IMAGE_CONTAINER}:hover img,
  .${ELEMENT_CARD_OVERLAY_IMAGE_CONTAINER}:focus-within img {
    transform: scale(1.025);
  }
`

// prettier-ignore
const ImageStyles = `
  .${ELEMENT_IMAGE_WRAPPER} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
  }

  .${ELEMENT_IMAGE_WRAPPER} img,
  .${ELEMENT_IMAGE_WRAPPER} canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transform: scale(1);
    transition: transform 0.5s ease-in-out;
  }

  .${ELEMENT_IMAGE_WRAPPER} canvas {
    display: block;
    opacity: 0;
  }

  .${ELEMENT_IMAGE_WRAPPER} button {
    position: absolute;
    top: 0;
    right: 0;
    width: 44px;
    height: 44px;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .${ELEMENT_IMAGE_WRAPPER} button svg {
    fill: white;
    width: 24px;
  }
`;

// prettier-ignore
const WrapperStyles = `
  .${ELEMENT_CARD_OVERLAY_IMAGE_WRAPPER} {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
  }

  .${ELEMENT_CARD_OVERLAY_IMAGE_WRAPPER} .${ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER} {
    z-index: 9;
    position: relative;
  }
`;

// prettier-ignore
const STYLES_OVERLAY_CARD_ELEMENT = `
  .${ELEMENT_CARD_OVERLAY_IMAGE_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
    height: 100%;
  }

  .${ELEMENT_CARD_OVERLAY_IMAGE_CONTAINER} {
    height: 100%;
    padding: ${Spacing.md};
    padding-bottom: ${Spacing.lg};
    padding-top: ${Spacing['4xl']};
    overflow: hidden;
    position: relative;
  }
  
  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    .${ELEMENT_CARD_OVERLAY_IMAGE_CONTAINER} {
      min-height: 400px;
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${ELEMENT_CARD_OVERLAY_IMAGE_CONTAINER} {
      padding-top: ${Spacing['8xl']};
      min-height: 456px;
    }
  }

  ${WrapperStyles}
  ${ImageStyles}
  ${ImageTint}
  ${OverwriteHeadline}
  ${OverwriteCtaIcon}
`;

const CreateCardOverlayElement = (element: TypeCardOverlayImageElement) => {
  const { image, text } = element;
  const elementDeclaration = document.createElement('div');
  const elementContainer = document.createElement('div');
  const elementWrapper = document.createElement('div');
  const imageWrapper = document.createElement('div');
  const tintOverlay = document.createElement('div');
  const textCopy = text?.textContent?.trim();
  const ctaIcon = CtaIcon.CreateElement({ ...element, theme: 'dark' });
  const content = LockupTextContainer.CreateElement({
    ...element,
    theme: 'dark',
  });

  if (!image) return;

  const sizeElements = () => {
    if (text && textCopy) {
      const modifiedText = MarkupModify.TruncateText({
        text: textCopy,
        size: elementContainer.offsetWidth,
      });

      text.innerHTML = modifiedText;
    }
  };

  tintOverlay.classList.add(ELEMENT_TINT_OVERLAY);
  imageWrapper.classList.add(ELEMENT_IMAGE_WRAPPER);
  elementWrapper.classList.add(ELEMENT_CARD_OVERLAY_IMAGE_WRAPPER);

  imageWrapper.appendChild(image);
  elementWrapper.appendChild(imageWrapper);
  elementWrapper.appendChild(tintOverlay);
  elementWrapper.appendChild(content);
  if (ctaIcon) {
    elementContainer.setAttribute(ATTRIBUTE_CTA_ICON, '');
    elementWrapper.appendChild(ctaIcon);
  }

  elementContainer.appendChild(elementWrapper);
  elementContainer.classList.add(ELEMENT_CARD_OVERLAY_IMAGE_CONTAINER);

  elementDeclaration.classList.add(ELEMENT_CARD_OVERLAY_IMAGE_DECLARATION);
  elementDeclaration.appendChild(elementContainer);

  sizeElements();
  AssetServices.CreateGif({ container: imageWrapper });
  window.addEventListener('resize', Debounce(sizeElements, 50));

  return elementDeclaration;
};

export default {
  CreateElement: CreateCardOverlayElement,
  Styles: STYLES_OVERLAY_CARD_ELEMENT,
};
