import { Typography, Tokens, Layout } from '@universityofmaryland/variables';
import { Styles } from 'utilities';

type TypeLayoutImageExpandProps = {
  content: HTMLElement;
  image: HTMLImageElement;
};

const { ConvertJSSObjectToStyles } = Styles;
const { Spacing, Queries, MaxWidth } = Tokens;
const { LockMax } = Layout;

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
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_EXPAND_TEXT_LOCK}`]: LockMax,
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
    padding-top: ${Spacing.md};
    padding-bottom: ${Spacing.md};
    height: 100%;
    z-index: 9999;
  }

  @media (${Queries.tablet.min}) {
    .${ELEMENT_EXPAND_TEXT_CONTAINER} {
      padding-top: ${Spacing['2xl']};
      padding-bottom: ${Spacing['2xl']};
    }
  }

  @media (${Queries.desktop.min}) {
    .${ELEMENT_EXPAND_TEXT_CONTAINER} {
      padding-top: ${Spacing['4xl']};
      padding-bottom: ${Spacing['4xl']};
    }
  }

  @media (${Queries.highDef.min}) {
    .${ELEMENT_EXPAND_TEXT_CONTAINER} {
      padding-top: ${Spacing.max};
      padding-bottom: ${Spacing.max};
    }
  }
`;

// prettier-ignore
const TextAnimation = `
  .${ELEMENT_EXPAND_TEXT_ANIMATION} {
    position: absolute;
    top: 0;
    height: 100vh;
    width: 100vw;
  }

  @media (prefers-reduced-motion: no-preference) {
    .${ELEMENT_EXPAND_TEXT_ANIMATION} {
      transform: translateY(300vh);
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
    background: rgba(0,0,0,0.75);
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
        width: ${MaxWidth.smallest};
        height: 70vh;
        animation: img-size ease-in-out forwards;
        animation-timeline: view();
        animation-range-start: cover;
        animation-range-end: 250vh;
      }
    }
  }
`;

// prettier-ignore
const ImagePosition = `
  .${ELEMENT_EXPAND_IMAGE_POSITION} {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .${ELEMENT_EXPAND_IMAGE_POSITION} {
        position: sticky;
        top: 0; 
        animation: img-position ease-in-out forwards;
        animation-timeline: view();
        animation-range-start: cover;
        animation-range-end: 250vh;
      }
    }
  }
`;

// prettier-ignore
const ImageContainer = `
  .${ELEMENT_EXPAND_IMAGE_CONTAINER} {
    width: 100%;
    height: 100%;
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
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .${ELEMENT_EXPLAND_DECLARATION} {
        height: 400vh;
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

const CreateLayoutImageExpand = (props: TypeLayoutImageExpandProps) => {
  const declaration = document.createElement('div');
  const container = document.createElement('div');
  const imageContainer = CreateImageContainer(props);
  const textContainer = CreateTextContainer(props);

  const eventLoad = () => {};

  container.appendChild(imageContainer);
  container.appendChild(textContainer);
  container.classList.add(ELEMENT_EXPAND_CONTAINER);

  declaration.appendChild(container);
  declaration.classList.add(ELEMENT_EXPLAND_DECLARATION);

  return {
    element: declaration,
    events: {
      load: eventLoad,
    },
  };
};

export default {
  CreateElement: CreateLayoutImageExpand,
  Styles: STYLES_LAYOUT_IMAGE_EXPAND,
};
