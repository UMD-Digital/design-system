import { Tokens, Layout } from '@universityofmaryland/variables';
import { AnimationCarouselBlocks } from 'macros';
import { Styles } from 'utilities';

type TypeCarouselRequirements = {
  slide: HTMLElement;
  shadowRef?: HTMLElement;
  blocks: HTMLElement[];
};

const { ConvertJSSObjectToStyles } = Styles;
const { Colors, Spacing } = Tokens;
const { LockMax } = Layout;

const MEDIUM = 768;
const LARGE = 1024;

const ELEMENT_NAME = 'umd-element-carousel';

const ELEMENT_DECLARATION = 'carousel-default-declaration';
const CAROUSEL_CONTAINER = 'element-carousel-default-container';
const CAROUSEL_LOCK = 'element-carousel-default-lock';

const OVERWRITE_ANIMATION_CAROUSEL_DECLARATION = `.${CAROUSEL_CONTAINER} .${AnimationCarouselBlocks.Elements.declaration}`;
const OVERWRITE_ANIMATION_CAROUSEL_CONTAINER = `.${CAROUSEL_CONTAINER} .${AnimationCarouselBlocks.Elements.container}`;
const OVERWRITE_ANIMATION_CAROUSEL_BUTTON = `.${CAROUSEL_CONTAINER} .${AnimationCarouselBlocks.Elements.button}`;

// prettier-ignore
const OverwriteCarouselStyles = `
  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    ${OVERWRITE_ANIMATION_CAROUSEL_CONTAINER} {
      padding-bottom: 60px;
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON} {
      bottom: 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON} {
      top: 50%;
      transform: translateY(-50%);
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON}:first-of-type {
      left: 49px;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON}:first-of-type {
      right: -52px;
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON}:last-of-type {
      left: 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON}:last-of-type {
      left: -52px;
    }
  }
`;

// prettier-ignore
const ContainerLock = `
  .${CAROUSEL_LOCK} {
    position: relative;
    ${ConvertJSSObjectToStyles({
      styleObj: LockMax ,
    })}
  }

  @media (min-width: ${LARGE}px) {
    .${CAROUSEL_LOCK} {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  @media umd-carousel-card (max-width: ${LARGE - 1}px) {
    .${CAROUSEL_LOCK} {
      max-width: inherit;
      padding: 0;
    }
  }
`;

// prettier-ignore
const ContainerStyles = `
  .${CAROUSEL_CONTAINER} {
    background-color: ${Colors.black};
    padding: ${Spacing['3xl']} 0;
    position: relative;
    overflow: hidden;
  }

  @container ${ELEMENT_NAME} (max-width: 300px) {
    .${CAROUSEL_CONTAINER} {
      display: none;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${CAROUSEL_CONTAINER} {
      padding: ${Spacing['4xl']} 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${CAROUSEL_CONTAINER} {
      padding: ${Spacing['max']} 0;
    }
  }

  .${CAROUSEL_CONTAINER} > svg {
    width: auto;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
  }
`

// prettier-ignore
const STYLES_CAROUSEL_ELEMENT = `
  .${ELEMENT_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_DECLARATION} * {
    color: ${Colors.white};
  }
  
  ${AnimationCarouselBlocks.Styles}
  ${ContainerStyles}
  ${ContainerLock}
  ${OverwriteCarouselStyles}
`;

const CreateCarouselElement = (props: TypeCarouselRequirements) =>
  (() => {
    const declaration = document.createElement('div');
    const container = document.createElement('div');
    const wrapper = document.createElement('div');
    const carouselContainer = AnimationCarouselBlocks.CreateElement({
      ...props,
      blocks: props.blocks,
      overwriteDisplayLogic: {
        mobileBreakpoint: 600,
        tabletBreakpoint: 900,
        desktopCount: 3,
        desktopBreakpoint: 1400,
        maxCount: 4,
        minBlockHeightTablet: 320,
        minBlockHeightMobile: 240,
      },
    });

    wrapper.classList.add(CAROUSEL_LOCK);
    wrapper.appendChild(carouselContainer.element);

    container.classList.add(CAROUSEL_CONTAINER);
    container.appendChild(wrapper);

    declaration.classList.add(ELEMENT_DECLARATION);
    declaration.appendChild(container);

    return {
      element: declaration,
      events: {
        resize: carouselContainer.events.resize,
        load: carouselContainer.events.load,
      },
    };
  })();

export default {
  CreateElement: CreateCarouselElement,
  Styles: STYLES_CAROUSEL_ELEMENT,
};
