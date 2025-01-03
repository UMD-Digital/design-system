import {
  element,
  token,
  typography,
} from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';

type TypeContent = {
  eyebrow?: HTMLElement | null;
  headline?: HTMLElement | null;
  actions?: HTMLElement | null;
  additional?: HTMLSlotElement | null;
};

type TypeAssets = {
  image?: HTMLImageElement;
  video?: HTMLVideoElement;
};

type TypeLayoutImageExpandProps = TypeContent & TypeAssets;

const { convertJSSObjectToStyles } = Utility.styles;

const ELEMENT_NAME = 'umd-hero-expand';
const ELEMENT_EXPLAND_DECLARATION = 'hero-expand-declaration';
const ELEMENT_EXPAND_STICKY = 'hero-expand-sticky';

const ELEMENT_EXPAND_IMAGE_CONTAINER = 'hero-expand-image-container';
const ELEMENT_EXPAND_IMAGE_SIZE = 'hero-expand-image-size';
const ELEMENT_EXPAND_IMAGE_OVERLAY = 'hero-expand-image-overlay';

const ELEMENT_EXPAND_TEXT_CONTAINER = 'hero-expand-text-container';
const ELEMENT_EXPAND_TEXT_TOP_CONTAINER = 'hero-expand-text-top-container';
const ELEMENT_EXPAND_TEXT_BOTTOM_CONTAINER =
  'hero-expand-text-bottom-container';
const ELEMENT_EXPAND_TEXT_EYEBROW = 'hero-expand-text-eyebrow';
const ELEMENT_EXPAND_TEXT_HEADLINE = 'hero-expand-text-headline';
const ELEMENT_EXPAND_TEXT_ACTIONS = 'hero-expand-text-actions';
const ELEMENT_EXPAND_TEXT_ADDITIONAL = 'hero-expand-text-additional';

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
        opacity: 0;
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
    from { height: 50vh; }
    to { height: 100vh; }
  }

  .${ELEMENT_EXPAND_IMAGE_SIZE} {
    overflow: hidden;
    position: relative;
    height: 100%;
    width: 100%;
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .${ELEMENT_EXPAND_IMAGE_SIZE} {
        height: 50vh;
        animation: img-size ease-in-out forwards;
        animation-timeline: view();
        animation-range-start: 60vh;
        animation-range-end: 140vh;
      }
    }
  }

  @media (${token.media.queries.tablet.min}) {
    @media (prefers-reduced-motion: no-preference) {
      @supports (animation-timeline: view()) {
        .${ELEMENT_EXPAND_IMAGE_SIZE} {
          animation: img-size ease-in-out forwards;
          animation-timeline: view();
          animation-range-start: 40vh;
          animation-range-end: 200vh;
        }
      }
    }
  }
`;

// prettier-ignore
const ImageContainer = `
  @keyframes component-size {
    from { width: 10%; }
    to { width: 100vw; }
  }

  @keyframes component-size-tablet {
    from { width: 100%; }
    to { width: 100vw; }
  }

  .${ELEMENT_EXPAND_IMAGE_CONTAINER} {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    height: 100%;
    overflow: clip;
    display: flex;
    align-items: center;
  }

 @supports (not (animation-timeline: view())) {
    .${ELEMENT_EXPAND_IMAGE_CONTAINER} {
      height: 56vw;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .${ELEMENT_EXPAND_IMAGE_CONTAINER} {
        width: 10%;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        animation: component-size ease-in-out forwards;
        animation-timeline: view();
        animation-range-start: 60vh;
        animation-range-end: 120vh;
      }
    }
  }

  @media (${token.media.queries.tablet.min}) {
    @media (prefers-reduced-motion: no-preference) {
      @supports (animation-timeline: view()) {
        .${ELEMENT_EXPAND_IMAGE_CONTAINER} {
          width: 100%;
          animation: component-size-tablet ease-in-out forwards;
          animation-timeline: view();
          animation-range-start: 60vh;
          animation-range-end: 200vh;
        }
      }
    }
  }
`;

// prettier-ignore
const TextContainer = `
  .${ELEMENT_EXPAND_TEXT_CONTAINER} {
    position: relative;
    height: 100%;
    z-index: 9999;
    text-align: center;
    padding: ${token.spacing.md} 0;
  }

  @media (${token.media.queries.tablet.min}) {
    .${ELEMENT_EXPAND_TEXT_CONTAINER} {
      padding: ${token.spacing['3xl']} 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  @media (${token.media.queries.highDef.min}) {
    .${ELEMENT_EXPAND_TEXT_CONTAINER} {
      padding: ${token.spacing['6xl']} 0;
    }
  }

  .${ELEMENT_EXPAND_TEXT_TOP_CONTAINER} + * {
    margin-top: ${token.spacing.lg};
  }

  .${ELEMENT_EXPAND_TEXT_EYEBROW} + * {
    margin-top: ${token.spacing.md};
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_EXPAND_TEXT_EYEBROW}`]: element.text.decoration.ribbon,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_EXPAND_TEXT_HEADLINE}`]: typography.campaign.maxium,
    },
  })}

  .${ELEMENT_EXPAND_TEXT_HEADLINE} {
    color: ${token.color.white};
    font-weight: 800;
    text-transform: uppercase;
    text-wrap: balance;
  }

  .${ELEMENT_EXPAND_TEXT_ACTIONS} + * {
    margin-top: ${token.spacing.lg};
  }
`;

// prettier-ignore
const elementPosition = `
  .${ELEMENT_EXPAND_STICKY} {
    position: relative;
  }

  @media (${token.media.queries.tablet.min}) {
    @media (prefers-reduced-motion: no-preference) {
      @supports (animation-timeline: view()) {
        .${ELEMENT_EXPAND_STICKY} {
          position: sticky;
          top: 0;
          height: 100vh;
        }
      }
    }
  }

  @supports (not (animation-timeline: view())) {
    .${ELEMENT_EXPAND_STICKY} {
      top: 0 !important;
    }
  }
`;

// prettier-ignore
const STYLES_HERO_EXPAND = `
  .${ELEMENT_EXPLAND_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .${ELEMENT_EXPLAND_DECLARATION} {
        position: relative;
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

  .${ELEMENT_EXPLAND_DECLARATION} img,
  .${ELEMENT_EXPLAND_DECLARATION} video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${elementPosition}
  ${TextContainer}
  ${ImageContainer}
  ${ImageSizeContainer}
  ${ImageOverlayContainer}
`;

const CreateAssetContainer = ({ image, video }: TypeAssets) => {
  const container = document.createElement('div');
  const imageSize = document.createElement('div');
  const imageOverlay = document.createElement('div');

  imageOverlay.classList.add(ELEMENT_EXPAND_IMAGE_OVERLAY);

  imageSize.classList.add(ELEMENT_EXPAND_IMAGE_SIZE);

  if (video) {
    imageSize.appendChild(video);
  } else {
    if (image) imageSize.appendChild(image);
  }

  imageSize.appendChild(imageOverlay);

  container.appendChild(imageSize);
  container.classList.add(ELEMENT_EXPAND_IMAGE_CONTAINER);

  container.classList.add(ELEMENT_EXPAND_IMAGE_CONTAINER);
  return container;
};

const CreateTextContainer = ({
  headline,
  eyebrow,
  actions,
  additional,
}: TypeContent) => {
  const textContainer = document.createElement('div');

  textContainer.classList.add(ELEMENT_EXPAND_TEXT_CONTAINER);

  if (eyebrow || headline) {
    const topText = document.createElement('div');

    if (eyebrow) {
      eyebrow.classList.add(ELEMENT_EXPAND_TEXT_EYEBROW);
      topText.appendChild(eyebrow);
    }

    if (headline) {
      headline.classList.add(ELEMENT_EXPAND_TEXT_HEADLINE);
      topText.appendChild(headline);
    }

    topText.classList.add(ELEMENT_EXPAND_TEXT_TOP_CONTAINER);
    textContainer.appendChild(topText);
  }

  if (actions || additional) {
    const bottomText = document.createElement('div');

    if (actions) {
      const actionsContainer = document.createElement('div');
      actionsContainer.appendChild(actions);
      actionsContainer.classList.add(ELEMENT_EXPAND_TEXT_ACTIONS);
      bottomText.appendChild(actionsContainer);
    }

    if (additional) {
      const additionalContainer = document.createElement('div');
      additionalContainer.classList.add(ELEMENT_EXPAND_TEXT_ADDITIONAL);
      additionalContainer.appendChild(additional);
      bottomText.appendChild(additionalContainer);
    }

    bottomText.classList.add(ELEMENT_EXPAND_TEXT_BOTTOM_CONTAINER);
    textContainer.appendChild(bottomText);
  }

  return textContainer;
};

const CreateHeroExpand = (props: TypeLayoutImageExpandProps) => {
  const declaration = document.createElement('div');
  const sticky = document.createElement('div');
  const SetPosition = ({ value }: { value: string | null }) => {
    sticky.style.top = value || '0';
  };

  sticky.appendChild(CreateAssetContainer(props));
  sticky.appendChild(CreateTextContainer(props));
  sticky.classList.add(ELEMENT_EXPAND_STICKY);

  declaration.appendChild(sticky);
  declaration.classList.add(ELEMENT_EXPLAND_DECLARATION);

  return {
    element: declaration,
    events: {
      SetPosition,
    },
  };
};

export default {
  CreateElement: CreateHeroExpand,
  Styles: STYLES_HERO_EXPAND,
};
