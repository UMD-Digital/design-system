import { token } from '@universityofmaryland/web-styles-library';
import ButtonFullScreen from '../../atomic/buttons/full-screen';
import * as Utility from 'utilities';

type TypeDisplayLogic = {
  mobileCount: number;
  mobileBreakpoint: number;
  tabletCount: number;
  tabletBreakpoint: number;
  desktopCount: number;
  desktopBreakpoint: number;
  maxCount: number;
  blockGap: number;
  hasRightButton: boolean;
  hasLeftButton: boolean;
  showMobileHint: boolean;
  showHint: boolean;
  fullScreenCallback?: (index: number) => void;
};

type TypeDisplayLogicProps = Partial<TypeDisplayLogic>;

type TypeAnimationCarouselBlockProps = {
  slide: HTMLElement;
  shadowRef?: HTMLElement;
  blocks: HTMLElement[];
  overwriteDisplayLogic?: TypeDisplayLogicProps;
};

type TypeHelpers = {
  displayLogic: Record<string, any>;
  GetElements: {
    container: () => HTMLDivElement;
    slide: () => HTMLElement;
    blocks: () => HTMLElement[];
  };
  GetViewOptions: {
    isTabletView: () => boolean;
    showCount: () => number;
    shouldShowMobileHint: () => boolean;
    shouldShowHint: () => boolean;
    shouldShowLeftButton: () => boolean;
    shouldShowRightButton: () => boolean;
  };
  GetSizes: {
    carouselWidthBasedOnBlock: ({ count }: { count: number }) => number;
  };
  SetLayout: {
    blockWidth: ({ count }: { count: number }) => void;
    carouselWidth: ({ count }: { count: number }) => void;
  };
};

type TypeEventScroll = TypeHelpers & {
  isDirectionRight?: boolean;
};

const { convertPixelStringToNumber } = Utility.styles;

const ATTRIBUTE_SINGLE_BLOCK = 'single';
const ANIMATION_DURATION = 750;
const HINT_MULTIPLER_MOBILE_SIZING = 0.2;
const HINT_MULTIPLER_SIZING = 0.6;

const IS_SINGLE_BLOCK = `[${ATTRIBUTE_SINGLE_BLOCK}]`;

const ELEMENT_NAME = 'umd-element-animation-carousel-block';
const ELEMENT_ANIMATION_CAROUSEL_DECLARATION =
  'animation-carousel-block-declaration';
const ELEMENT_ANIMATION_CAROUSEL_CONTAINER =
  'animation-carousel-block-container';
const ELEMENT_ANIMATION_CAROUSEL_WRAPPER = 'animation-carousel-block-wrapper';
const ELEMENT_ANIMATION_CAROUSEL_BUTTON = `animation-carousel-block-button`;
const ELEMENT_ANIMATION_CAROUSEL_NEXT = `animation-carousel-block-button-next`;
const ELEMENT_ANIMATION_CAROUSEL_PREVIOUS = `animation-carousel-block-button-previous`;

const OVERWRITE_SINGLE_BLOCK_CONTAINER = `.${ELEMENT_ANIMATION_CAROUSEL_CONTAINER}${IS_SINGLE_BLOCK}`;

// prettier-ignore
const ButtonStyles = `
  .${ELEMENT_ANIMATION_CAROUSEL_BUTTON} {
    background-color: ${token.color.red};
    padding: 10px ${token.spacing.xs};
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
    width: 20px;
    height: 20px;
    fill: ${token.color.white};
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
    GetViewOptions,
    GetSizes,
    SetLayout,
    isDirectionRight = true,
    displayLogic,
  } = props;
  const carouselSlider = GetElements.slide();
  const slotContent = Array.from(
    carouselSlider.querySelectorAll(':scope > *'),
  ) as HTMLDivElement[];

  const isShowMobileHint = GetViewOptions.shouldShowMobileHint();
  const isShowHint = GetViewOptions.shouldShowHint();
  const count = GetViewOptions.showCount();
  const elementSize = slotContent[0]?.offsetWidth || 0;
  const carouselSize = GetSizes.carouselWidthBasedOnBlock({ count });
  const { fullScreenCallback } = displayLogic;

  if (!elementSize) return;

  const elementSizeWithSpace = elementSize;
  const temporaryCarouselSize = carouselSize + elementSizeWithSpace;

  const cloneReferenceEvents = ({
    orginal,
    clone,
  }: {
    orginal: HTMLElement;
    clone: HTMLElement;
  }) => {
    const orginalFullScreen = orginal.querySelector(
      `.${ButtonFullScreen.Elements.button}`,
    );
    const cloneFullScreen = clone.querySelector(
      `.${ButtonFullScreen.Elements.button}`,
    );

    if (orginalFullScreen && cloneFullScreen) {
      const indexAttr = orginalFullScreen.getAttribute('data-index');
      const index = indexAttr ? parseInt(indexAttr) : 0;
      cloneFullScreen.addEventListener('click', () =>
        fullScreenCallback(index),
      );
    }
  };

  const animateRight = () => {
    const firstElement = slotContent[0];
    const clonedElement = firstElement.cloneNode(true) as HTMLDivElement;
    const upcomingElement = slotContent[count];
    const hintElement = slotContent[count + 1];

    upcomingElement.style.display = 'block';
    carouselSlider.style.width = `${temporaryCarouselSize}px`;
    cloneReferenceEvents({ orginal: firstElement, clone: clonedElement });

    if (hintElement && (isShowMobileHint || isShowHint)) {
      hintElement.style.display = 'block';
    }

    carouselSlider.appendChild(clonedElement);
    clonedElement.style.display = 'none';

    setTimeout(() => {
      carouselSlider.style.transition = `transform ${ANIMATION_DURATION}ms ease-in-out`;
      carouselSlider.style.transform = `translateX(-${elementSizeWithSpace}px)`;
    }, 10);

    setTimeout(() => {
      SetLayout.carouselWidth({ count });

      carouselSlider.removeChild(firstElement);
    }, ANIMATION_DURATION + 100);
  };

  const animateLeft = () => {
    const lastElement = slotContent[slotContent.length - 1];
    const removedElement = slotContent[count - 1];
    const hintElementSibiling = slotContent[count];
    const clonedElement = lastElement.cloneNode(true) as HTMLDivElement;

    carouselSlider.style.width = `${temporaryCarouselSize}px`;
    carouselSlider.prepend(clonedElement);
    clonedElement.style.display = 'block';
    carouselSlider.style.transform = `translateX(-${elementSizeWithSpace}px)`;
    cloneReferenceEvents({ orginal: lastElement, clone: clonedElement });

    setTimeout(() => {
      carouselSlider.style.transition = `transform ${ANIMATION_DURATION}ms ease-in-out`;
      carouselSlider.style.transform = `translateX(0)`;
    }, 10);

    setTimeout(() => {
      carouselSlider.removeChild(lastElement);

      if (!isShowMobileHint && !isShowHint) {
        removedElement.style.display = 'none';
      }

      if (isShowMobileHint || isShowHint) {
        hintElementSibiling.style.display = 'none';
      }

      SetLayout.carouselWidth({ count });
    }, ANIMATION_DURATION + 10);
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

  Utility.javascriptEvents.CreateEventSwipe({ container, callback: swipes });
};

const ButtonVisibility = (props: TypeHelpers) => {
  const { GetElements, GetViewOptions } = props;
  const prevousButton = GetElements.container().querySelector(
    `.${ELEMENT_ANIMATION_CAROUSEL_PREVIOUS}`,
  ) as HTMLButtonElement;
  const nextButton = GetElements.container().querySelector(
    `.${ELEMENT_ANIMATION_CAROUSEL_NEXT}`,
  ) as HTMLButtonElement;
  const buttons = [nextButton, prevousButton];

  const shouldShowLeftButton = GetViewOptions.shouldShowLeftButton();
  const shouldShowRightButton = GetViewOptions.shouldShowRightButton();
  const showCount = GetViewOptions.showCount();
  const cardsTotal = GetElements.blocks().length;
  const shouldHideLeftButton = showCount > 1 && !shouldShowLeftButton;
  const shouldHideRightButton = showCount > 1 && !shouldShowRightButton;

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

const ButtonDisplay = (props: TypeHelpers) => {
  const { GetElements } = props;
  const prevousButton = GetElements.container().querySelector(
    `.${ELEMENT_ANIMATION_CAROUSEL_PREVIOUS}`,
  ) as HTMLButtonElement;
  const nextButton = GetElements.container().querySelector(
    `.${ELEMENT_ANIMATION_CAROUSEL_NEXT}`,
  ) as HTMLButtonElement;

  prevousButton.setAttribute('aria-label', 'Previous');
  nextButton.setAttribute('aria-label', 'Next');

  ButtonVisibility(props);
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
  button.innerHTML = Utility.asset.icon.FORWARD_ARROW;

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
      mobileBreakpoint: 550,
      tabletBreakpoint: 768,
      desktopBreakpoint: 1000,
      mobileCount: 1,
      tabletCount: 2,
      desktopCount: 3,
      maxCount: 4,
      blockGap: convertPixelStringToNumber(token.spacing.lg),
      hasRightButton: true,
      hasLeftButton: true,
      showMobileHint: true,
      showHint: true,
      fullScreenCallback: undefined,
    };
    let blockWidth = 0;
    let hasInteractionOccured = false;

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

    const GetViewOptions = {
      isMobileView: () => {
        return GetSizes.containerWidth() <= displayLogic.mobileBreakpoint;
      },
      isTabletView: () => {
        return (
          GetSizes.containerWidth() > displayLogic.mobileBreakpoint &&
          GetSizes.containerWidth() <= displayLogic.tabletBreakpoint
        );
      },

      isDesktopView: () => {
        return (
          GetSizes.containerWidth() > displayLogic.tabletBreakpoint &&
          GetSizes.containerWidth() <= displayLogic.desktopBreakpoint
        );
      },
      isHighView: () => {
        return GetSizes.containerWidth() > displayLogic.desktopBreakpoint;
      },
      showCount: () => {
        const isMobile = GetViewOptions.isMobileView();
        const isTablet = GetViewOptions.isTabletView();
        const isDesktop = GetViewOptions.isDesktopView();
        const isHighDef = GetViewOptions.isHighView();
        let count = 1;

        if (isMobile) count = displayLogic.mobileCount;
        if (isTablet) count = displayLogic.tabletCount;
        if (isDesktop) count = displayLogic.desktopCount;
        if (isHighDef) count = displayLogic.maxCount;

        return count;
      },
      shouldShowMobileHint: () => {
        const isMobileView = GetViewOptions.isMobileView();
        const isShowMobileHint = displayLogic.showMobileHint;
        const isShowHint = displayLogic.showHint;

        return (
          (isShowMobileHint && isMobileView) || (isShowHint && isMobileView)
        );
      },
      shouldShowHint: () => {
        return displayLogic.showHint && !GetViewOptions.isMobileView();
      },
      shouldShowLeftButton: () => {
        return displayLogic.hasLeftButton || hasInteractionOccured;
      },
      shouldShowRightButton: () => {
        return displayLogic.hasRightButton || hasInteractionOccured;
      },
    };

    const GetSizes = {
      mobileHintWidth: ({ count }: { count: number }) => {
        const containerWidth = container.offsetWidth;
        return (containerWidth / count) * HINT_MULTIPLER_MOBILE_SIZING;
      },
      hintWidth: ({ count }: { count: number }) => {
        const containerWidth = container.offsetWidth;
        return (containerWidth / count) * HINT_MULTIPLER_SIZING;
      },
      carouselWidthBasedOnBlock: ({ count }: { count: number }) => {
        const elementSize = blockWidth;
        const isShowMobileHint = GetViewOptions.shouldShowMobileHint();
        const isShowHint = GetViewOptions.shouldShowHint();

        if (!elementSize) return window.innerWidth;

        if (isShowMobileHint || isShowHint) {
          return elementSize * (count + 1);
        }

        return elementSize * count;
      },
      containerWidth: () => {
        return container.offsetWidth;
      },
    };

    const SetLayout = {
      blockWidth: () =>
        blocks.forEach((block) => (block.style.width = `${blockWidth}px`)),
      carouselWidth: ({ count }: { count: number }) => {
        const elementSize = GetSizes.carouselWidthBasedOnBlock({ count });

        slide.style.width = `${elementSize}px`;
        slide.style.transition = 'none';
        slide.style.transform = 'translateX(0)';
      },
      blockDisplay: ({ count }: { count: number }) => {
        const containerBlocks = Array.from(
          slide.querySelectorAll(':scope > *'),
        ) as HTMLElement[];
        const isHint = GetViewOptions.shouldShowHint();
        const isShowMobileHint = GetViewOptions.shouldShowMobileHint();

        containerBlocks.forEach((block, index) => {
          if (index >= count) {
            block.style.display = 'none';
          } else {
            block.style.display = 'block';
          }
        });

        if (isShowMobileHint) containerBlocks[1].style.display = 'block';
        if (isHint) containerBlocks[count].style.display = 'block';
      },
    };

    const Event = {
      helpers: {
        displayLogic,
        GetElements,
        GetViewOptions,
        GetSizes,
        SetLayout,
      },
      resize: () => {
        const count = GetViewOptions.showCount();
        const cacluateBlockWidth = ({ count }: { count: number }) => {
          const isShowMobileHint = GetViewOptions.shouldShowMobileHint();
          const isShowHint = GetViewOptions.shouldShowHint();
          const containerWidth = container.offsetWidth;

          if (isShowMobileHint || isShowHint) {
            let hintElementSize = GetSizes.hintWidth({ count });

            if (isShowMobileHint) {
              hintElementSize = GetSizes.mobileHintWidth({ count });
            }

            blockWidth = (containerWidth - hintElementSize) / count;
          } else {
            blockWidth = containerWidth / count;
          }
        };

        cacluateBlockWidth({ count });
        SetLayout.blockWidth();
        SetLayout.blockDisplay({ count });
        SetLayout.carouselWidth({ count });
        ButtonDisplay({ ...Event.helpers });

        if (count === 1) {
          container.setAttribute(ATTRIBUTE_SINGLE_BLOCK, '');
        } else {
          container.removeAttribute(ATTRIBUTE_SINGLE_BLOCK);
        }
      },
      load: () => {
        slide.style.display = 'flex';
        slide.style.gap = `${displayLogic.blockGap}px`;

        setTimeout(() => {
          Event.resize();
          EventSwipe({ ...Event.helpers });
        }, 100);
      },
      forward: () => {
        hasInteractionOccured = true;
        EventScrollCarousel({
          ...Event.helpers,
        });
        ButtonVisibility({ ...Event.helpers });
      },
      backward: () => {
        hasInteractionOccured = true;
        EventScrollCarousel({
          ...Event.helpers,
          isDirectionRight: false,
        });
        ButtonVisibility({ ...Event.helpers });
      },
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

    window.addEventListener(
      'resize',
      Utility.performance.debounce(Event.resize, 30),
    );

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
    containerSingleBlock: OVERWRITE_SINGLE_BLOCK_CONTAINER,
    button: ELEMENT_ANIMATION_CAROUSEL_BUTTON,
    nextButton: ELEMENT_ANIMATION_CAROUSEL_NEXT,
    previousButton: ELEMENT_ANIMATION_CAROUSEL_PREVIOUS,
  },
};
