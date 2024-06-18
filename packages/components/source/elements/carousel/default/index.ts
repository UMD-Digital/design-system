import { Tokens } from '@universityofmaryland/variables';
import { AnimationCarouselBlocks } from 'macros';

type TypeCarouselRequirements = {
  slide: HTMLElement;
  shadowRef?: HTMLElement;
  blocks: HTMLElement[];
  theme?: string | null;
  gridGap?: string | null;
  hasLeftButton?: boolean;
  hasRightButton?: boolean;
  mobileHint?: boolean;
};

const { Colors, Spacing } = Tokens;

const ATTRIBUTE_THEME = 'data-theme';
const THEME_DARK = 'dark';
const LARGE = 1024;

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const ELEMENT_NAME = 'umd-element-carousel';
const ELEMENT_DECLARATION = 'carousel-default-declaration';
const CAROUSEL_CONTAINER = 'element-carousel-default-container';

const OVERWRITE_ANIMATION_CAROUSEL_CONTAINER = `.${CAROUSEL_CONTAINER} .${AnimationCarouselBlocks.Elements.container}`;
const OVERWRITE_ANIMATION_CAROUSEL_BUTTON = `.${CAROUSEL_CONTAINER} .${AnimationCarouselBlocks.Elements.button}`;
const OVERWRITE_ANIMATION_BUTTON_PREVIOUS = `.${CAROUSEL_CONTAINER} .${AnimationCarouselBlocks.Elements.previousButton}`;
const OVERWRITE_ANIMATION_BUTTON_NEXT = `.${CAROUSEL_CONTAINER} .${AnimationCarouselBlocks.Elements.nextButton}`;

const OVERWRITE_THEME_DARK_CONTAINER = `.${CAROUSEL_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_THEME_DARK_BUTTON = `${OVERWRITE_THEME_DARK_CONTAINER} .${AnimationCarouselBlocks.Elements.button}`;

// prettier-ignore
const OverwriteThemeDark = `
  ${OVERWRITE_THEME_DARK_BUTTON} {
    background-color: ${Colors.red};
  }

  ${OVERWRITE_THEME_DARK_BUTTON} > svg {
    fill: ${Colors.white};
  }
`;

// prettier-ignore
const OverwriteCarouselStyles = `
  ${OVERWRITE_ANIMATION_BUTTON_PREVIOUS} {
    left: 0;
  }

  ${OVERWRITE_ANIMATION_BUTTON_NEXT} {
    right: 0;
  }

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
      background-color: ${Colors.white};
    }

    ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON} > svg {
      fill: ${Colors.black};
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    ${OVERWRITE_ANIMATION_BUTTON_PREVIOUS} {
      left: ${Spacing.md};
      right: inherit;
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    ${OVERWRITE_ANIMATION_BUTTON_NEXT} {
      left: 74px;
      right: inherit;
    }
  }
`;

// prettier-ignore
const ContainerStyles = `
  .${CAROUSEL_CONTAINER} {
    position: relative;
    overflow: hidden;
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
  ${OverwriteCarouselStyles}
  ${OverwriteThemeDark}
`;

const CreateCarouselElement = (props: TypeCarouselRequirements) =>
  (() => {
    const {
      theme,
      gridGap,
      hasLeftButton = true,
      hasRightButton = true,
      mobileHint = true,
    } = props;
    const declaration = document.createElement('div');
    const container = document.createElement('div');
    const wrapper = document.createElement('div');
    const overwriteDisplayLogic: Record<string, number | boolean> = {
      mobileBreakpoint: 600,
      tabletBreakpoint: 1200,
      desktopBreakpoint: 1500,
      desktopCount: 3,
      maxCount: 4,
      hasLeftButton,
      hasRightButton,
      showMobileHint: true,
      showHint: true,
    };

    if (gridGap) {
      overwriteDisplayLogic.blockGap = parseInt(gridGap);
      overwriteDisplayLogic.tabletBreakpoint = 1000 + parseInt(gridGap);
      overwriteDisplayLogic.desktopBreakpoint = 1400 + parseInt(gridGap);
    }

    if (!mobileHint) overwriteDisplayLogic.showMobileHint = false;

    const carouselContainer = AnimationCarouselBlocks.CreateElement({
      ...props,
      blocks: props.blocks,
      overwriteDisplayLogic,
    });

    wrapper.appendChild(carouselContainer.element);

    container.classList.add(CAROUSEL_CONTAINER);
    container.appendChild(wrapper);
    if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);

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
