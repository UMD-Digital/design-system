import { tokens } from '@universityofmaryland/web-elements-styles';
import { Markup, Performance } from 'utilities';
import { TextLockupSmallScaling, type TypeTextLockupSmall } from 'macros';

export type TypeBlockOverlayImageElement = TypeTextLockupSmall & {
  image?: HTMLImageElement | HTMLAnchorElement | null;
};

const { spacing } = tokens;

const SMALL = 350;

const ELEMENT_NAME = 'umd-block-overlay-image';

const ELEMENT_BLOCK_OVERLAY_IMAGE_DECLARATION =
  'block-overlay-image-declaration';
const ELEMENT_BLOCK_OVERLAY_IMAGE_CONTAINER = 'block-overlay-image-container';
const ELEMENT_BLOCK_OVERLAY_IMAGE_WRAPPER = 'block-overlay-image-wrapper';
const ELEMENT_BLOCK_OVERLAY_IMAGE = 'block-overlay-image';
const ELEMENT_TINT_OVERLAY = 'block-overlay-image-tint';

// prettier-ignore
const ImageTint = `
  .${ELEMENT_TINT_OVERLAY} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .55) 60%, rgba(0, 0, 0, 0.9) 100%);
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
  }

  .${ELEMENT_TINT_OVERLAY}[size="large"] {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .55) 30%, rgba(0, 0, 0, 0.9) 100%);
  }

  .${ELEMENT_BLOCK_OVERLAY_IMAGE_CONTAINER}:hover .${ELEMENT_TINT_OVERLAY} {
    opacity: .7;
  }

  .${ELEMENT_BLOCK_OVERLAY_IMAGE_CONTAINER}:hover img,
  .${ELEMENT_BLOCK_OVERLAY_IMAGE_CONTAINER}:focus-within img {
    transform: scale(1.025);
  }
`

// prettier-ignore
const ImageStyles = `
  .${ELEMENT_BLOCK_OVERLAY_IMAGE} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
  }

  .${ELEMENT_BLOCK_OVERLAY_IMAGE} img,
  .${ELEMENT_BLOCK_OVERLAY_IMAGE} canvas {
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

  .${ELEMENT_BLOCK_OVERLAY_IMAGE} canvas {
    display: block;
    opacity: 0;
  }

  .${ELEMENT_BLOCK_OVERLAY_IMAGE} button {
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

  .${ELEMENT_BLOCK_OVERLAY_IMAGE} button svg {
    fill: white;
    width: 24px;
  }
`;

// prettier-ignore
const WrapperStyles = `
  .${ELEMENT_BLOCK_OVERLAY_IMAGE_WRAPPER} {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
  }
`;

// prettier-ignore
const STYLES_BLOCK_OVERLAY_ELEMENT = `
  .${ELEMENT_BLOCK_OVERLAY_IMAGE_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
    height: 100%;
  }

  .${ELEMENT_BLOCK_OVERLAY_IMAGE_CONTAINER} {
    height: 100%;
    padding: ${spacing.md};
    padding-bottom: ${spacing.lg};
    padding-top: ${spacing['4xl']};
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  
  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    .${ELEMENT_BLOCK_OVERLAY_IMAGE_CONTAINER} {
      min-height: 360px;
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${ELEMENT_BLOCK_OVERLAY_IMAGE_CONTAINER} {
      padding-top: ${spacing['8xl']};
      min-height: 450px;
    }
  }

  ${WrapperStyles}
  ${ImageStyles}
  ${ImageTint}
  ${TextLockupSmallScaling.Styles}
`;

const CreateBlockOverlayElement = (props: TypeBlockOverlayImageElement) => {
  const { image, text } = props;
  const elementDeclaration = document.createElement('div');
  const elementContainer = document.createElement('div');
  const elementWrapper = document.createElement('div');
  const imageWrapper = document.createElement('div');
  const tintOverlay = document.createElement('div');
  const textCopy = text?.innerHTML;

  const scalingFontContainer = TextLockupSmallScaling.CreateElement({
    ...props,
    isThemeDark: true,
  });

  if (!image) return;

  const sizeElements = () => {
    if (text && textCopy) {
      const modifiedText = Markup.modify.truncateTextBasedOnSize({
        text: textCopy,
        size: elementContainer.offsetWidth,
      });

      text.innerHTML = modifiedText;

      if (modifiedText.length >= 220) {
        tintOverlay.setAttribute('size', 'large');
      }
    }
  };

  tintOverlay.classList.add(ELEMENT_TINT_OVERLAY);
  imageWrapper.classList.add(ELEMENT_BLOCK_OVERLAY_IMAGE);
  elementWrapper.classList.add(ELEMENT_BLOCK_OVERLAY_IMAGE_WRAPPER);

  imageWrapper.appendChild(image);
  elementWrapper.appendChild(imageWrapper);
  elementWrapper.appendChild(tintOverlay);
  elementWrapper.appendChild(scalingFontContainer);

  elementContainer.appendChild(elementWrapper);
  elementContainer.classList.add(ELEMENT_BLOCK_OVERLAY_IMAGE_CONTAINER);

  elementDeclaration.classList.add(ELEMENT_BLOCK_OVERLAY_IMAGE_DECLARATION);
  elementDeclaration.appendChild(elementContainer);

  sizeElements();
  Markup.create.gif({ container: imageWrapper });
  window.addEventListener('resize', Performance.debounce(sizeElements, 50));

  return elementDeclaration;
};

export default {
  CreateElement: CreateBlockOverlayElement,
  Styles: STYLES_BLOCK_OVERLAY_ELEMENT,
  Elements: {
    container: ELEMENT_BLOCK_OVERLAY_IMAGE_CONTAINER,
  },
};
