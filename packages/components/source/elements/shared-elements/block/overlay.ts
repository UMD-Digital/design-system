import { Tokens } from '@universityofmaryland/variables';
import { AssetServices, MarkupModify, Performance } from 'utilities';
import LockupTextContainer, { TypeTextLockupSmall } from '../lockup/text-small';
import ScalingFontBlock from './scaling-font-container';

export type TypeBlockOverlayImageElement = TypeTextLockupSmall & {
  image?: HTMLImageElement | null;
};

const { Spacing } = Tokens;
const { Debounce } = Performance;

const SMALL = 300;

const ELEMENT_NAME = 'umd-block-overlay-image';

const ELEMENT_BLOCK_OVERLAY_IMAGE_DECLARATION =
  'block-overlay-image-declaration';
export const ELEMENT_BLOCK_OVERLAY_IMAGE_CONTAINER =
  'block-overlay-image-container';
const ELEMENT_BLOCK_OVERLAY_IMAGE_WRAPPER = 'block-overlay-image-wrapper';
export const ELEMENT_BLOCK_OVERLAY_IMAGE = 'block-overlay-image';
const ELEMENT_TINT_OVERLAY = 'block-overlay-image-tint';

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
    padding: ${Spacing.md};
    padding-bottom: ${Spacing.lg};
    padding-top: ${Spacing['4xl']};
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  
  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    .${ELEMENT_BLOCK_OVERLAY_IMAGE_CONTAINER} {
      min-height: 400px;
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${ELEMENT_BLOCK_OVERLAY_IMAGE_CONTAINER} {
      padding-top: ${Spacing['8xl']};
      min-height: 456px;
    }
  }

  ${WrapperStyles}
  ${ImageStyles}
  ${ImageTint}
  ${ScalingFontBlock.Styles}
`;

const CreateBlockOverlayElement = (element: TypeBlockOverlayImageElement) => {
  const { image, text } = element;
  const elementDeclaration = document.createElement('div');
  const elementContainer = document.createElement('div');
  const elementWrapper = document.createElement('div');
  const imageWrapper = document.createElement('div');
  const tintOverlay = document.createElement('div');
  const textCopy = text?.textContent?.trim();
  const scalingFontContainer = ScalingFontBlock.CreateElement();
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
  imageWrapper.classList.add(ELEMENT_BLOCK_OVERLAY_IMAGE);
  elementWrapper.classList.add(ELEMENT_BLOCK_OVERLAY_IMAGE_WRAPPER);

  scalingFontContainer.appendChild(content);

  imageWrapper.appendChild(image);
  elementWrapper.appendChild(imageWrapper);
  elementWrapper.appendChild(tintOverlay);
  elementWrapper.appendChild(scalingFontContainer);

  elementContainer.appendChild(elementWrapper);
  elementContainer.classList.add(ELEMENT_BLOCK_OVERLAY_IMAGE_CONTAINER);

  elementDeclaration.classList.add(ELEMENT_BLOCK_OVERLAY_IMAGE_DECLARATION);
  elementDeclaration.appendChild(elementContainer);

  sizeElements();
  AssetServices.CreateGif({ container: imageWrapper });
  window.addEventListener('resize', Debounce(sizeElements, 50));

  return elementDeclaration;
};

export default {
  CreateElement: CreateBlockOverlayElement,
  Styles: STYLES_BLOCK_OVERLAY_ELEMENT,
};
