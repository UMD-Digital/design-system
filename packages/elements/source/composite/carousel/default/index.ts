import { tokens } from '@universityofmaryland/web-elements-styles';
import { AnimationCarouselBlocks } from 'macros';

type TypeCarouselRequirements = {
  slide: HTMLElement;
  shadowRef?: HTMLElement;
  blocks: HTMLElement[];
  isThemeDark?: boolean;
  gridGap?: string | null;
  hasLeftButton?: boolean;
  hasRightButton?: boolean;
  mobileHint?: boolean;
  hint?: boolean;
  mobileSize?: number | null;
  tabletSize?: number | null;
  desktopSize?: number | null;
  mobileCount?: number | null;
  tabletCount?: number | null;
  desktopCount?: number | null;
  maxCount?: number | null;
};

const { colors, spacing } = tokens;

const ATTRIBUTE_THEME = 'data-theme';
const THEME_DARK = 'dark';

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

const OVERWRITE_SINGLE_COLUMN = `.${CAROUSEL_CONTAINER} ${AnimationCarouselBlocks.Elements.containerSingleBlock}`;
const OVERWRITE_SINGLE_COLUMN_BUTTONS = `${OVERWRITE_SINGLE_COLUMN} .${AnimationCarouselBlocks.Elements.button}`;
const OVERWRITE_SINGLE_COLUMN_PREVIOUS = `${OVERWRITE_SINGLE_COLUMN} .${AnimationCarouselBlocks.Elements.previousButton}`;
const OVERWRITE_SINGLE_COLUMN_NEXT = `${OVERWRITE_SINGLE_COLUMN} .${AnimationCarouselBlocks.Elements.nextButton}`;

// prettier-ignore
const OverwriteThemeDark = `
  ${OVERWRITE_THEME_DARK_BUTTON} {
    background-color: ${colors.red} !important;
  }

  ${OVERWRITE_THEME_DARK_BUTTON} > svg {
    fill: ${colors.white} !important;
  }
`;

// prettier-ignore
const OverwriteCarouselStyles = `
  .${OVERWRITE_ANIMATION_CAROUSEL_CONTAINER} {
    padding-bottom: 0;
  }

  ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON} {
    top: 50%;
    transform: translateY(-50%);
    background-color: ${colors.white};
  }

  ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON} > svg {
    fill: ${colors.black};
  }

  ${OVERWRITE_ANIMATION_BUTTON_PREVIOUS} {
    left: 0;
  }

  ${OVERWRITE_ANIMATION_BUTTON_NEXT} {
    right: 0;
  }

  ${OVERWRITE_SINGLE_COLUMN} {
    padding-bottom: 70px;
  }

  ${OVERWRITE_SINGLE_COLUMN_BUTTONS} {
    bottom: -19px;
    top: inherit;
    background-color: ${colors.gray.lighter};
  }

  ${OVERWRITE_SINGLE_COLUMN_PREVIOUS} {
    left: calc(50% - 44px);
  }

  ${OVERWRITE_SINGLE_COLUMN_NEXT} {
    left: calc(50% + 4px);
    right: inherit;
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
    color: ${colors.white};
  }
  
  ${AnimationCarouselBlocks.Styles}
  ${ContainerStyles}
  ${OverwriteCarouselStyles}
  ${OverwriteThemeDark}
`;

const CreateCarouselElement = (props: TypeCarouselRequirements) =>
  (() => {
    const {
      isThemeDark,
      gridGap,
      hasLeftButton = true,
      hasRightButton = true,
      mobileHint,
      hint,
      tabletSize,
      desktopSize,
      tabletCount,
      desktopCount,
      maxCount,
    } = props;

    const declaration = document.createElement('div');
    const container = document.createElement('div');
    const wrapper = document.createElement('div');
    const overwriteDisplayLogic: Record<string, number | boolean> = {
      tabletBreakpoint: tabletSize || 768,
      desktopBreakpoint: desktopSize || 1024,
      tabletCount: tabletCount || 2,
      desktopCount: desktopCount || 3,
      maxCount: maxCount || 4,
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
    if (!hint) overwriteDisplayLogic.showHint = false;

    const carouselContainer = AnimationCarouselBlocks.CreateElement({
      ...props,
      blocks: props.blocks,
      overwriteDisplayLogic,
    });

    wrapper.appendChild(carouselContainer.element);

    container.classList.add(CAROUSEL_CONTAINER);
    container.appendChild(wrapper);
    if (isThemeDark) container.setAttribute(ATTRIBUTE_THEME, THEME_DARK);

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
