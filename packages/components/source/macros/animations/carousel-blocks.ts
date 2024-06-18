import { Tokens } from '@universityofmaryland/variables';
import { AssetIcon, EventsUtility, Performance, Styles } from 'utilities';

type TypeDisplayLogic = {
  mobileCount: number;
  mobileBreakpoint: number;
  tabletCount: number;
  tabletBreakpoint: number;
  desktopCount: number;
  desktopBreakpoint: number;
  maxCount: number;
  blockGap: number;
  minBlockHeightMobile: number;
  minBlockHeightTablet: number;
  hasRightButton: boolean;
  hasLeftButton: boolean;
  showMobileHint: boolean;
};

type TypeDisplayLogicProps = Partial<TypeDisplayLogic>;

type TypeAnimationCarouselBlockProps = {
  slide: HTMLElement;
  shadowRef?: HTMLElement;
  blocks: HTMLElement[];
  showHint?: boolean;
  overwriteDisplayLogic?: TypeDisplayLogicProps;
};

type TypeHelpers = {
  displayLogic: Record<string, number | boolean>;
  GetElements: {
    container: () => HTMLDivElement;
    slide: () => HTMLElement;
    blocks: () => HTMLElement[];
  };
  GetOptions: {
    isTabletView: () => boolean;
    showCount: () => number;
    shouldShowMobileHint: () => boolean;
    shouldShowLeftButton: () => boolean;
    shouldShowRightButton: () => boolean;
  };
  GetSizes: {
    blockWidth: () => number | undefined;
    carouselWidthBasedOnBlock: () => number;
  };
  SetLayout: {
    cardHeight: () => void;
    blockWidth: () => void;
    carouselWidthBasedOnBlock: () => void;
  };
};

type TypeEventScroll = TypeHelpers & {
  isDirectionRight?: boolean;
};

const { Debounce } = Performance;
const { Colors, Spacing } = Tokens;
const { ConvertPixelStringToNumber } = Styles;

const ANIMATION_DURATION = 500;
const HINT_MULTIPLER_SIZING = 0.2;

const ELEMENT_NAME = 'umd-element-animation-carousel-block';
const ELEMENT_ANIMATION_CAROUSEL_DECLARATION =
  'animation-carousel-block-declaration';
const ELEMENT_ANIMATION_CAROUSEL_CONTAINER =
  'animation-carousel-block-container';
const ELEMENT_ANIMATION_CAROUSEL_WRAPPER = 'animation-carousel-block-wrapper';
const ELEMENT_ANIMATION_CAROUSEL_BUTTON = `animation-carousel-block-button`;
const ELEMENT_ANIMATION_CAROUSEL_NEXT = `animation-carousel-block-button-next`;
const ELEMENT_ANIMATION_CAROUSEL_PREVIOUS = `animation-carousel-block-button-previous`;

// prettier-ignore
const ButtonStyles = `
  .${ELEMENT_ANIMATION_CAROUSEL_BUTTON} {
    background-color: ${Colors.red};
    padding: ${Spacing.xs};
    position: absolute;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    display: none;
  }

  .${ELEMENT_ANIMATION_CAROUSEL_BUTTON}:disabled {
    opacity: 0.5;
  }

  .${ELEMENT_ANIMATION_CAROUSEL_BUTTON} svg {
    width: 24px;
    height: 24px;
    fill: ${Colors.white};
  }

  .${ELEMENT_ANIMATION_CAROUSEL_PREVIOUS} svg {
    transform: rotate(180deg);
  }
`;

// prettier-ignore
const ContainerStyles = `
  .${ELEMENT_ANIMATION_CAROUSEL_CONTAINER} {
    position: relative;
  }

  .${ELEMENT_ANIMATION_CAROUSEL_WRAPPER} {
    overflow: hidden;
    padding-right: 0;
    width: 100%;
  }
`;

// prettier-ignore
const STYLES_CAROUSEL_CARDS_ELEMENT = `
  .${ELEMENT_ANIMATION_CAROUSEL_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
    width: 100%;
  }

  ${ContainerStyles}
  ${ButtonStyles}
`;

const EventScrollCarousel = (props: TypeEventScroll) => {
  const {
    GetElements,
    GetOptions,
    GetSizes,
    SetLayout,
    isDirectionRight = true,
  } = props;
  const carouselSlider = GetElements.slide();
  const slotContent = Array.from(
    carouselSlider.querySelectorAll(':scope > *'),
  ) as HTMLDivElement[];

  const isShowHint = GetOptions.shouldShowMobileHint();
  const elementCount = GetOptions.showCount();
  const elementSize = GetSizes.blockWidth();
  const carouselSize = GetSizes.carouselWidthBasedOnBlock();

  if (!elementSize) return;

  const elementSizeWithSpace = elementSize;
  const temporaryCarouselSize = carouselSize + elementSizeWithSpace;

  const animateRight = () => {
    const firstElement = slotContent[0];
    const clonedElement = firstElement.cloneNode(true) as HTMLDivElement;
    const upcomingElement = slotContent[elementCount];
    const hintElement = slotContent[elementCount + 1];

    upcomingElement.style.display = 'block';
    carouselSlider.style.width = `${temporaryCarouselSize}px`;
    carouselSlider.style.transition = `transform ${ANIMATION_DURATION}ms ease-in-out`;
    carouselSlider.style.transform = `translateX(-${elementSizeWithSpace}px)`;

    setTimeout(() => {
      if (isShowHint) {
        hintElement.style.display = 'block';
      }

      carouselSlider.appendChild(clonedElement);
      clonedElement.style.display = 'none';
    }, 10);

    setTimeout(() => {
      SetLayout.carouselWidthBasedOnBlock();

      carouselSlider.removeChild(firstElement);
    }, ANIMATION_DURATION + 10);
  };

  const animateLeft = () => {
    const lastElement = slotContent[slotContent.length - 1];
    const removedElement = slotContent[elementCount - 1];
    const hintElementSibiling = slotContent[elementCount];
    const clonedElement = lastElement.cloneNode(true) as HTMLDivElement;

    carouselSlider.style.width = `${temporaryCarouselSize}px`;
    carouselSlider.prepend(clonedElement);
    clonedElement.style.display = 'block';
    carouselSlider.style.transform = `translateX(-${elementSizeWithSpace}px)`;

    setTimeout(() => {
      carouselSlider.style.transition = `transform ${ANIMATION_DURATION}ms ease-in-out`;
      carouselSlider.style.transform = `translateX(0)`;
    }, 10);

    setTimeout(() => {
      carouselSlider.removeChild(lastElement);

      if (!isShowHint) {
        removedElement.style.display = 'none';
      } else {
        hintElementSibiling.style.display = 'none';
      }

      SetLayout.carouselWidthBasedOnBlock();
    }, ANIMATION_DURATION - 10);
  };

  isDirectionRight ? animateRight() : animateLeft();
};

const EventSwipe = (props: TypeHelpers) => {
  const { GetElements } = props;
  const container = GetElements.container();

  const swipes = (isrightswipe: Boolean) => {
    if (!isrightswipe) {
      EventScrollCarousel(props);
    } else {
      EventScrollCarousel({ ...props, isDirectionRight: false });
    }
  };

  EventsUtility.CreateEventSwipe({ container, callback: swipes });
};

const ButtonDisplay = (props: TypeHelpers) => {
  const { GetElements, GetOptions } = props;
  const prevousButton = GetElements.container().querySelector(
    `.${ELEMENT_ANIMATION_CAROUSEL_PREVIOUS}`,
  ) as HTMLButtonElement;
  const nextButton = GetElements.container().querySelector(
    `.${ELEMENT_ANIMATION_CAROUSEL_NEXT}`,
  ) as HTMLButtonElement;
  const buttons = [nextButton, prevousButton];

  const cardsTotal = GetElements.blocks().length;
  const showCount = GetOptions.showCount();
  const containerWidth = GetElements.container().offsetWidth;
  const shouldShowLeftButton = GetOptions.shouldShowLeftButton();
  const shouldShowRightButton = GetOptions.shouldShowRightButton();
  const shouldHideLeftButton = containerWidth >= 1024 && !shouldShowLeftButton;
  const shouldHideRightButton =
    containerWidth >= 1024 && !shouldShowRightButton;

  if (cardsTotal === showCount) {
    buttons.forEach((button) => (button.style.display = 'none'));
    return;
  }

  if (shouldHideLeftButton) {
    prevousButton.style.display = 'none';
  } else {
    prevousButton.style.display = 'block';
  }

  if (shouldHideRightButton) {
    nextButton.style.display = 'none';
  } else {
    nextButton.style.display = 'block';
  }
};

const CreateButton = ({
  EventMoveForward,
  EventMoveBackward,
  isRight = true,
}: {
  EventMoveForward: () => void;
  EventMoveBackward: () => void;
  isRight?: boolean;
}) => {
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.setAttribute('aria-label', 'Next');
  button.classList.add(ELEMENT_ANIMATION_CAROUSEL_BUTTON);
  button.innerHTML = AssetIcon.FORWARD_ARROW;

  if (isRight) {
    button.classList.add(ELEMENT_ANIMATION_CAROUSEL_NEXT);
  }

  if (!isRight) {
    button.setAttribute('aria-label', 'Previous');
    button.classList.add(ELEMENT_ANIMATION_CAROUSEL_PREVIOUS);
  }

  button.addEventListener('click', () => {
    if (isRight) EventMoveForward();
    if (!isRight) EventMoveBackward();
    button.disabled = true;

    setTimeout(() => {
      button.disabled = false;
    }, ANIMATION_DURATION + 100);
  });

  return button;
};

const CreateCarouselCardsElement = (props: TypeAnimationCarouselBlockProps) =>
  (() => {
    const { slide, shadowRef, blocks, overwriteDisplayLogic } = props;
    const declaration = document.createElement('div');
    const container = document.createElement('div');
    const wrapper = document.createElement('div');
    const displayLogic: TypeDisplayLogic = {
      mobileCount: 1,
      mobileBreakpoint: 650,
      tabletCount: 2,
      tabletBreakpoint: 1024,
      desktopCount: 2,
      desktopBreakpoint: 1200,
      maxCount: 2,
      blockGap: ConvertPixelStringToNumber(Spacing.md),
      minBlockHeightMobile: 360,
      minBlockHeightTablet: 400,
      hasRightButton: true,
      hasLeftButton: true,
      showMobileHint: false,
    };

    if (overwriteDisplayLogic) {
      Object.keys(overwriteDisplayLogic).forEach((key) => {
        const refKey = key as keyof typeof displayLogic;
        const refValue = overwriteDisplayLogic[refKey] as never;

        displayLogic[refKey] = refValue;
      });
    }

    const GetElements = {
      container: () => container,
      slide: () => slide,
      blocks: () => blocks,
    };

    const GetOptions = {
      isMobileView: () => {
        return (
          GetSizes.carouselWidthMinusGap() <= displayLogic.mobileBreakpoint
        );
      },
      isTabletView: () => {
        return (
          GetSizes.carouselWidthMinusGap() > displayLogic.mobileBreakpoint &&
          GetSizes.carouselWidthMinusGap() <= displayLogic.tabletBreakpoint
        );
      },

      isDesktopView: () => {
        return (
          GetSizes.carouselWidthMinusGap() > displayLogic.tabletBreakpoint &&
          GetSizes.carouselWidthMinusGap() <= displayLogic.desktopBreakpoint
        );
      },
      isHighView: () => {
        return (
          GetSizes.carouselWidthMinusGap() > displayLogic.desktopBreakpoint
        );
      },
      showCount: () => {
        const isMobile = GetOptions.isMobileView();
        const isTablet = GetOptions.isTabletView();
        const isDesktop = GetOptions.isDesktopView();
        const isHighDef = GetOptions.isHighView();
        let count = 1;

        if (isMobile) count = displayLogic.mobileCount;
        if (isTablet) count = displayLogic.tabletCount;
        if (isDesktop) count = displayLogic.desktopCount;
        if (isHighDef) count = displayLogic.maxCount;

        return count;
      },
      shouldShowMobileHint: () => {
        return displayLogic.showMobileHint && GetOptions.isMobileView();
      },
      shouldShowLeftButton: () => {
        return displayLogic.hasLeftButton;
      },
      shouldShowRightButton: () => {
        return displayLogic.hasRightButton;
      },
    };

    const GetSizes = {
      blockWidth: () => {
        const isShowHint = GetOptions.shouldShowMobileHint();
        const containerWidth = container.offsetWidth;
        const count = GetOptions.showCount();

        if (isShowHint) {
          const hintElementSize = containerWidth * HINT_MULTIPLER_SIZING;

          return (containerWidth - hintElementSize) / count;
        }

        return containerWidth / count;
      },
      carouselWidthBasedOnBlock: () => {
        const isShowHint = GetOptions.shouldShowMobileHint();
        const count = GetOptions.showCount();
        const elementSize = GetSizes.blockWidth();

        if (!elementSize) return window.innerWidth;

        if (isShowHint) {
          const updatedCount = count + 1;
          return elementSize * updatedCount;
        }

        return elementSize * count;
      },
      carouselWidthMinusGap: () => {
        return container.offsetWidth - displayLogic.blockGap;
      },
    };

    const SetLayout = {
      cardHeight: () => {
        const minimumHeight =
          window.innerWidth > 768
            ? displayLogic.minBlockHeightTablet
            : displayLogic.minBlockHeightMobile;
        const maxHeight = blocks.reduce((acc, currentElement) => {
          if (acc > currentElement.offsetHeight) return acc;
          return currentElement.offsetHeight;
        }, minimumHeight);

        blocks.forEach((block) => {
          block.style.height = `${maxHeight}px`;
        });
      },
      blockWidth: () => {
        const elementSize = GetSizes.blockWidth();

        blocks.forEach((block) => {
          block.style.width = `${elementSize}px`;
        });
      },
      carouselWidthBasedOnBlock: () => {
        const elementSize = GetSizes.carouselWidthBasedOnBlock();

        slide.style.width = `${elementSize}px`;
        slide.style.transition = 'none';
        slide.style.transform = 'translateX(0)';
      },
      blockDisplay: () => {
        const count = GetOptions.showCount() - 1;

        blocks.forEach((block, index) => {
          if (index > count) {
            block.style.display = 'none';
          } else {
            block.style.display = 'block';
          }
        });

        if (displayLogic.showMobileHint) {
          blocks[1].style.display = 'block';
        }
      },
    };

    const Event = {
      helpers: {
        displayLogic,
        GetElements,
        GetOptions,
        GetSizes,
        SetLayout,
      },
      resize: () => {
        SetLayout.blockDisplay();
        SetLayout.blockWidth();
        SetLayout.carouselWidthBasedOnBlock();
        ButtonDisplay({ ...Event.helpers });

        setTimeout(() => {
          SetLayout.cardHeight();
        }, 100);
      },
      load: () => {
        SetLayout.blockDisplay();
        slide.style.display = 'flex';
        slide.style.gap = `${displayLogic.blockGap}px`;

        setTimeout(() => {
          Event.resize();
          EventSwipe({ ...Event.helpers });
        }, 100);
      },
      forward: () =>
        EventScrollCarousel({
          ...Event.helpers,
        }),
      backward: () =>
        EventScrollCarousel({
          ...Event.helpers,
          isDirectionRight: false,
        }),
    };

    container.appendChild(
      CreateButton({
        EventMoveForward: Event.forward,
        EventMoveBackward: Event.backward,
      }),
    );

    container.appendChild(
      CreateButton({
        EventMoveForward: Event.forward,
        EventMoveBackward: Event.backward,
        isRight: false,
      }),
    );

    wrapper.classList.add(ELEMENT_ANIMATION_CAROUSEL_WRAPPER);

    if (shadowRef) {
      wrapper.appendChild(shadowRef);
    } else {
      blocks.forEach((block) => slide.appendChild(block));
      wrapper.appendChild(slide);
    }

    container.classList.add(ELEMENT_ANIMATION_CAROUSEL_CONTAINER);
    container.appendChild(wrapper);

    declaration.classList.add(ELEMENT_ANIMATION_CAROUSEL_DECLARATION);
    declaration.appendChild(container);

    window.addEventListener('resize', Debounce(Event.resize, 5));

    return {
      element: declaration,
      events: {
        resize: Event.resize,
        load: Event.load,
      },
    };
  })();

export default {
  CreateElement: CreateCarouselCardsElement,
  Styles: STYLES_CAROUSEL_CARDS_ELEMENT,
  Elements: {
    declaration: ELEMENT_ANIMATION_CAROUSEL_DECLARATION,
    container: ELEMENT_ANIMATION_CAROUSEL_CONTAINER,
    button: ELEMENT_ANIMATION_CAROUSEL_BUTTON,
    nextButton: ELEMENT_ANIMATION_CAROUSEL_NEXT,
    previousButton: ELEMENT_ANIMATION_CAROUSEL_PREVIOUS,
  },
};
