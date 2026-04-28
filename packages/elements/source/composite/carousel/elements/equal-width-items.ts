import * as token from '@universityofmaryland/web-token-library';
import * as element from '@universityofmaryland/web-styles-library/element';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { debounce } from '@universityofmaryland/web-utilities-library/performance';
import { setupSwipeDetection } from '@universityofmaryland/web-utilities-library/events';
import { parsePixelValue } from '@universityofmaryland/web-utilities-library/styles';
import { CreateButton, ButtonVisibility } from './nav-button';

export type TypeButtonConfig = {
  backgroundColor?: string;
  verticalCenter?: boolean;
  outsetOffset?: string;
};

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

type TypeAnimationCarouselBlockProps = {
  slide: HTMLElement;
  shadowRef?: HTMLElement;
  blocks: HTMLElement[];
  mobileBreakpoint?: number;
  tabletBreakpoint?: number;
  desktopBreakpoint?: number;
  mobileCount?: number;
  tabletCount?: number;
  desktopCount?: number;
  maxCount?: number;
  blockGap?: number;
  hasLeftButton?: boolean;
  hasRightButton?: boolean;
  showMobileHint?: boolean;
  showHint?: boolean;
  fullScreenCallback?: (index: number) => void;
  button?: TypeButtonConfig;
};

type TypeHelpers = {
  displayLogic: Record<string, any>;
  GetElements: {
    container: () => HTMLDivElement;
    slide: () => HTMLElement;
    blocks: () => HTMLElement[];
  };
  GetButtons: {
    prev: () => HTMLButtonElement;
    next: () => HTMLButtonElement;
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

type CarouselBlockModel = {
  element: HTMLElement;
  styles: string;
  events: {
    resize: () => void;
    load: () => void;
  };
};

const ANIMATION_DURATION = 750;
const HINT_MULTIPLER_MOBILE_SIZING = 0.2;
const HINT_MULTIPLER_SIZING = 0.6;

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

  const firstSlot = slotContent[0];
  if (!firstSlot) return;

  const elementSize = firstSlot.offsetWidth;

  const carouselSize = GetSizes.carouselWidthBasedOnBlock({ count });
  const { fullScreenCallback } = displayLogic;

  if (!elementSize) return;

  const elementSizeWithSpace = elementSize;
  const temporaryCarouselSize = carouselSize + elementSizeWithSpace;

  const cloneReferenceEvents = ({
    original,
    clone,
  }: {
    original: HTMLElement;
    clone: HTMLElement;
  }) => {
    const fullScreenClassName = element.action.button.fullScreen.className;
    const originalFullScreen = original.querySelector(`.${fullScreenClassName}`);
    const cloneFullScreen = clone.querySelector(`.${fullScreenClassName}`);

    if (originalFullScreen && cloneFullScreen) {
      const indexAttr = originalFullScreen.getAttribute('data-index');
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
    cloneReferenceEvents({ original: firstElement, clone: clonedElement });

    if (hintElement && (isShowMobileHint || isShowHint)) {
      hintElement.style.display = 'block';
    }

    carouselSlider.appendChild(clonedElement);
    clonedElement.style.display = 'none';

    carouselSlider.style.width = `${temporaryCarouselSize}px`;
    void carouselSlider.offsetHeight;

    requestAnimationFrame(() => {
      carouselSlider.style.transition = `transform ${ANIMATION_DURATION}ms ease-in-out`;
      carouselSlider.style.transform = `translateX(-${elementSizeWithSpace}px)`;

      setTimeout(() => {
        carouselSlider.removeChild(firstElement);
        SetLayout.carouselWidth({ count });
      }, ANIMATION_DURATION);
    });
  };

  const animateLeft = () => {
    const lastElement = slotContent[slotContent.length - 1];
    const removedElement = slotContent[count - 1];
    const hintElementSibiling = slotContent[count];
    const clonedElement = lastElement.cloneNode(true) as HTMLDivElement;

    cloneReferenceEvents({ original: lastElement, clone: clonedElement });

    carouselSlider.style.width = `${temporaryCarouselSize}px`;
    carouselSlider.prepend(clonedElement);
    clonedElement.style.display = 'block';
    carouselSlider.style.transform = `translateX(-${elementSizeWithSpace}px)`;

    void carouselSlider.offsetHeight;

    requestAnimationFrame(() => {
      carouselSlider.style.transition = `transform ${ANIMATION_DURATION}ms ease-in-out`;
      carouselSlider.style.transform = `translateX(0)`;

      setTimeout(() => {
        carouselSlider.removeChild(lastElement);

        if (!isShowMobileHint && !isShowHint) {
          removedElement.style.display = 'none';
        }

        if (isShowMobileHint || isShowHint) {
          hintElementSibiling.style.display = 'none';
        }

        SetLayout.carouselWidth({ count });
      }, ANIMATION_DURATION);
    });
  };

  if (isDirectionRight) {
    animateRight();
  } else {
    animateLeft();
  }
};

const EventSwipe = (props: TypeHelpers) => {
  const { GetElements } = props;
  const container = GetElements.container();

  const swipes = (isRightSwipe: boolean) => {
    if (!isRightSwipe) {
      EventScrollCarousel(props);
    } else {
      EventScrollCarousel({ ...props, isDirectionRight: false });
    }
  };

  setupSwipeDetection({ container, callback: swipes });
};


const CreateCarouselCardsElement = (props: TypeAnimationCarouselBlockProps) =>
  (() => {
    const {
      slide,
      shadowRef,
      blocks,
      mobileBreakpoint = token.media.breakpointValues.medium.max,
      tabletBreakpoint = token.media.breakpointValues.tablet.min,
      desktopBreakpoint = token.media.breakpointValues.desktop.min,
      mobileCount = 1,
      tabletCount = 2,
      desktopCount = 3,
      maxCount = 4,
      blockGap = parsePixelValue(token.spacing.lg),
      hasLeftButton = true,
      hasRightButton = true,
      showMobileHint = true,
      showHint = true,
      fullScreenCallback,
      button,
    } = props;

    const displayLogic: TypeDisplayLogic = {
      mobileBreakpoint,
      tabletBreakpoint,
      desktopBreakpoint,
      mobileCount,
      tabletCount,
      desktopCount,
      maxCount,
      blockGap,
      hasLeftButton,
      hasRightButton,
      showMobileHint,
      showHint,
      fullScreenCallback,
    };
    let blockWidth = 0;
    let hasInteractionOccured = false;
    let containerElement: HTMLDivElement | null = null;

    const GetElements = {
      container: () => containerElement as HTMLDivElement,
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

        if (isMobile) { count = displayLogic.mobileCount; }
        else if (isTablet) { count = displayLogic.tabletCount; }
        else if (isDesktop) { count = displayLogic.desktopCount; }
        else if (isHighDef) { count = displayLogic.maxCount; }

        return count;
      },
      shouldShowMobileHint: () => {
        const isMobileView = GetViewOptions.isMobileView();
        const showHintOnMobile = displayLogic.showMobileHint || displayLogic.showHint;

        return showHintOnMobile && isMobileView;
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
        if (!containerElement) return 0;
        return (containerElement.offsetWidth / count) * HINT_MULTIPLER_MOBILE_SIZING;
      },
      hintWidth: ({ count }: { count: number }) => {
        if (!containerElement) return 0;
        return (containerElement.offsetWidth / count) * HINT_MULTIPLER_SIZING;
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
        if (!containerElement) return 0;
        return containerElement.offsetWidth;
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

        if (isShowMobileHint) {
          containerBlocks[1].style.display = 'block';
        }
        if (isHint) {
          containerBlocks[count].style.display = 'block';
        }
      },
    };

    const buttonRefs: { next: HTMLButtonElement | null; prev: HTMLButtonElement | null } = {
      next: null,
      prev: null,
    };

    const GetButtons = {
      next: () => buttonRefs.next as HTMLButtonElement,
      prev: () => buttonRefs.prev as HTMLButtonElement,
    };

    const Event = {
      helpers: {
        displayLogic,
        GetElements,
        GetButtons,
        GetViewOptions,
        GetSizes,
        SetLayout,
      },
      resize: () => {
        if (!containerElement) { return; }
        const container = containerElement;
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
        ButtonVisibility({ ...Event.helpers });
      },
      load: () => {
        slide.style.display = 'flex';
        slide.style.gap = `${displayLogic.blockGap}px`;

        Event.resize();
        EventSwipe({ ...Event.helpers });
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

    const { verticalCenter, outsetOffset, backgroundColor } = button || {};
    const buttonConfig = {
      isVerticalCenter: verticalCenter !== false || Boolean(outsetOffset),
      outsetOffset,
      backgroundColor,
    };

    const nextButtonModel = CreateButton({
      EventMoveForward: Event.forward,
      EventMoveBackward: Event.backward,
      ...buttonConfig,
    });

    const prevButtonModel = CreateButton({
      EventMoveForward: Event.forward,
      EventMoveBackward: Event.backward,
      isRight: false,
      ...buttonConfig,
    });

    buttonRefs.next = nextButtonModel.element as HTMLButtonElement;
    buttonRefs.prev = prevButtonModel.element as HTMLButtonElement;

    const wrapperModel = new ElementBuilder()
      .withClassName('animation-carousel-block-wrapper')
      .withStyles({
        element: {
          overflow: 'hidden',
          width: '100%',
        },
      })
      .withModifier((element) => {
        if (shadowRef) {
          element.appendChild(shadowRef);
        } else {
          blocks.forEach((block) => slide.appendChild(block));
          element.appendChild(slide);
        }
      })
      .build();

    const buttonWrapperModel = new ElementBuilder()
      .withClassName('animation-carousel-block-buttons')
      .withStyles({
        element: {
          display: 'flex',
          justifyContent: 'center',
          gap: token.spacing.min,
          [`@media (max-width: ${tabletBreakpoint}px)`]: {
            marginTop: token.spacing.md,
            marginBottom: token.spacing.md,
          },
        },
      })
      .withChildren(prevButtonModel, nextButtonModel)
      .build();

    const containerModel = new ElementBuilder()
      .withClassName('animation-carousel-block-container')
      .withStyles({
        element: {
          position: 'relative',
          [`@media (max-width: ${tabletBreakpoint}px)`]: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          },
        },
      })
      .ref((element) => {
        containerElement = element as HTMLDivElement;
      })
      .withChildren(wrapperModel, buttonWrapperModel)
      .build();

    const declarationModel = new ElementBuilder()
      .withClassName('animation-carousel-block-declaration')
      .withStyles({
        element: {
          containerType: 'inline-size',
          width: '100%',
        },
      })
      .withChild(containerModel)
      .withEvents({ resize: Event.resize, load: Event.load })
      .build();

    window.addEventListener('resize', debounce(Event.resize, 30));

    return declarationModel as CarouselBlockModel;
  })();

export const createCompositeCarouselBlocks = {
  CreateElement: CreateCarouselCardsElement,
};
