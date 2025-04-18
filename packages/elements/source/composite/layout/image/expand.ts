import { token, layout } from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';

type TypeLayoutImageExpandProps = {
  content: HTMLElement;
  image: HTMLImageElement;
};

const { convertJSSObjectToStyles, convertPixelStringToNumber } = Utility.styles;
const { spacing } = token;

const ELEMENT_NAME = 'umd-layout-image-expand';
const ELEMENT_EXPLAND_DECLARATION = 'layout-image-expand-declaration';
const ELEMENT_EXPAND_CONTAINER = 'layout-image-expand-container';

const ELEMENT_EXPAND_IMAGE_CONTAINER = 'layout-image-expand-image-container';
const ELEMENT_EXPAND_IMAGE_POSITION = 'layout-image-expand-image-position';
const ELEMENT_EXPAND_IMAGE_SIZE = 'layout-image-expand-image-size';
const ELEMENT_EXPAND_IMAGE_OVERLAY = 'layout-image-expand-image-overlay';

const ELEMENT_EXPAND_TEXT_CONTAINER = 'layout-image-expand-text-container';
const ELEMENT_EXPAND_TEXT_LOCK = 'layout-image-expand-text-lock';
const ELEMENT_EXPAND_TEXT_ANIMATION = 'layout-image-expand-text-animation';

// prettier-ignore
const TextLock = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_EXPAND_TEXT_LOCK}`]: layout.space.horizontal.max,
    },
  })}

  .${ELEMENT_EXPAND_TEXT_LOCK} {
    display: flex;
    height: 100%;
  }
`;

// prettier-ignore
const TextContainer = `
  .${ELEMENT_EXPAND_TEXT_CONTAINER} {
    position: relative;
    padding-top: ${token.spacing.max};
    padding-bottom: ${token.spacing.max};
    height: 100%;
    z-index: 9999;
  }
`;

// prettier-ignore
const TextAnimation = `
  .${ELEMENT_EXPAND_TEXT_ANIMATION} {
    width: 100vw;
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .${ELEMENT_EXPAND_TEXT_ANIMATION} {
        position: absolute;
        top: 0;
        height: 80vh;
        transform: translateY(80vh);
      }
    }
  }

  @media (${token.media.queries.tablet.min}) {
    @media (prefers-reduced-motion: no-preference) {
      @supports (animation-timeline: view()) {
        .${ELEMENT_EXPAND_TEXT_ANIMATION} {
          transform: translateY(100vh);
        }
      }
    }
  }
`;

// prettier-ignore
const ImageOverlayContainer = `
  @keyframes img-overlay {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .${ELEMENT_EXPAND_IMAGE_OVERLAY} {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,0.65);
    opacity: 1;
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .${ELEMENT_EXPAND_IMAGE_OVERLAY} {
        opacity: 1;
        animation: img-overlay forwards;
        animation-timeline: view();
        animation-range-start: 70vh;
        animation-range-end: 100vh;
      }
    }
  }
`;

// prettier-ignore
const ImageSizeContainer = `
  @keyframes img-size {
    to { width: 100%; height: 100vh; }
  }

  .${ELEMENT_EXPAND_IMAGE_SIZE} {
    overflow: hidden;
    position: relative;
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .${ELEMENT_EXPAND_IMAGE_SIZE} {
        width: ${token.spacing.maxWidth.smallest};
        height: 70vh;
        animation: img-size ease-in-out forwards;
        animation-timeline: view();
        animation-range-start: cover;
        animation-range-end: 200vh;
      }
    }
  }

  @supports not (animation-timeline: view()) {
    .${ELEMENT_EXPAND_IMAGE_SIZE} {
      height: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .${ELEMENT_EXPAND_IMAGE_SIZE} {
      height: 100%;
    }
  }
`;

// prettier-ignore
const ImagePosition = `
  .${ELEMENT_EXPAND_IMAGE_POSITION} {
    width: 100%;
    margin: 0 auto;
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .${ELEMENT_EXPAND_IMAGE_POSITION} {
        display: flex;
        justify-content: center;
        position: sticky;
        top: 0; 
        animation: img-position ease-in-out forwards;
        animation-timeline: view();
        animation-range-start: cover;
        animation-range-end: 200vh;
      }
    }
  }

  @supports not (animation-timeline: view()) {
    .${ELEMENT_EXPAND_IMAGE_POSITION} {
      height: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .${ELEMENT_EXPAND_IMAGE_POSITION} {
      height: 100%;
    }
  }
`;

// prettier-ignore
const ImageContainer = `
  .${ELEMENT_EXPAND_IMAGE_CONTAINER} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .${ELEMENT_EXPAND_IMAGE_CONTAINER} {
        position: relative;
      }
    }
  }
`;

// prettier-ignore
const Container = `
  .${ELEMENT_EXPAND_CONTAINER} {
    height: 100%;
    width: 100%;
    position: relative;
  }
`;

// prettier-ignore
const STYLES_LAYOUT_IMAGE_EXPAND = `
  .${ELEMENT_EXPLAND_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
    overflow: clip;
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .${ELEMENT_EXPLAND_DECLARATION} {
        height: 180vh;
      }
    }
  }

  @media (${token.media.queries.tablet.min}) {
    @media (prefers-reduced-motion: no-preference) {
      @supports (animation-timeline: view()) {
        .${ELEMENT_EXPLAND_DECLARATION} {
          height: 200vh;
        }
      }
    }
  }

  .${ELEMENT_EXPLAND_DECLARATION} img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${Container}
  ${ImageContainer}
  ${ImageSizeContainer}
  ${ImagePosition}
  ${ImageOverlayContainer}
  ${TextAnimation}
  ${TextContainer}
  ${TextLock}
`;

const CreateImageContainer = ({ image }: TypeLayoutImageExpandProps) => {
  const imageContainer = document.createElement('div');
  const imagePosition = document.createElement('div');
  const imageSize = document.createElement('div');
  const imageOverlay = document.createElement('div');

  imageOverlay.classList.add(ELEMENT_EXPAND_IMAGE_OVERLAY);

  imageSize.classList.add(ELEMENT_EXPAND_IMAGE_SIZE);
  imageSize.appendChild(image);
  imageSize.appendChild(imageOverlay);

  imagePosition.classList.add(ELEMENT_EXPAND_IMAGE_POSITION);
  imagePosition.appendChild(imageSize);

  imageContainer.appendChild(imagePosition);
  imageContainer.classList.add(ELEMENT_EXPAND_IMAGE_CONTAINER);

  return imageContainer;
};

const CreateTextContainer = ({ content }: TypeLayoutImageExpandProps) => {
  const textAnimation = document.createElement('div');
  const textContainer = document.createElement('div');
  const textLock = document.createElement('div');

  textLock.classList.add(ELEMENT_EXPAND_TEXT_LOCK);
  textLock.appendChild(content);

  textContainer.appendChild(textLock);
  textContainer.classList.add(ELEMENT_EXPAND_TEXT_CONTAINER);

  textAnimation.classList.add(ELEMENT_EXPAND_TEXT_ANIMATION);
  textAnimation.appendChild(textContainer);

  return textAnimation;
};

export default (props: TypeLayoutImageExpandProps) => {
  const declaration = document.createElement('div');
  const container = document.createElement('div');
  const imageContainer = CreateImageContainer(props);
  const textContainer = CreateTextContainer(props);
  const sizeImageForText = () => {
    const textContainerHeight =
      textContainer.clientHeight +
      convertPixelStringToNumber(spacing['2xl']) * 2;
    const imageContainerHeight = container.clientHeight;

    if (textContainerHeight > imageContainerHeight) {
      container.style.minHeight = `${textContainerHeight}px`;
    }
  };

  if (
    Utility.accessibility.isScreenZoomed() &&
    !Utility.accessibility.isPrefferdReducedMotion()
  ) {
    textContainer.style.height = '90vh';
    textContainer.style.transform = 'translateY(0)';
  }

  if (!CSS.supports('animation-timeline', 'view()')) {
    setTimeout(() => {
      sizeImageForText();
    }, 1000);
    window.addEventListener('resize', () => sizeImageForText());
  }

  container.appendChild(imageContainer);
  container.appendChild(textContainer);
  container.classList.add(ELEMENT_EXPAND_CONTAINER);

  declaration.appendChild(container);
  declaration.classList.add(ELEMENT_EXPLAND_DECLARATION);

  return { element: declaration, styles: STYLES_LAYOUT_IMAGE_EXPAND };
};
