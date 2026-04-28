import * as token from '@universityofmaryland/web-token-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { debounce } from '@universityofmaryland/web-utilities-library/performance';
import { getResponsiveImageSize } from '@universityofmaryland/web-utilities-library/media';
import { setupSwipeDetection } from '@universityofmaryland/web-utilities-library/events';
import { createCarouselNavButton, buttonColorsOnGray } from './nav-button';

type TypeCarouselImageProps = {
  slides: HTMLElement[];
  callback?: (index: number) => void;
  maxHeight?: number;
  isThemeDark?: boolean;
  includeButtonWrapper?: boolean;
};

type CarouselImageModel = {
  element: HTMLElement;
  styles: string;
  buttons: { prev: { element: HTMLElement; styles: string }; next: { element: HTMLElement; styles: string } };
  events: {
    Load: () => void;
    EventMoveTo: (index: number) => void;
    EventResize: () => void;
    EventSlideLeft: () => void;
    EventSlideRight: () => void;
  };
};

const ANIMATION_DURATION = 500;
const ATTRIBUTE_ACTIVE_SLIDE = 'data-active-slide';
const BUTTON_CLASS_NEXT = 'carousel-slider-button--next';
const BUTTON_CLASS_PREV = 'carousel-slider-button--prev';

const CreateButton = ({
  EventSlide,
  isRight = true,
  isThemeDark,
}: {
  EventSlide: ({ forward }: { forward?: boolean }) => void;
  isRight?: boolean;
  isThemeDark?: boolean;
}) => {
  const buttonClassName = isRight ? BUTTON_CLASS_NEXT : BUTTON_CLASS_PREV;
  const buttonDirection = isRight ? 'next' : 'prev';

  return createCarouselNavButton({
    className: buttonClassName,
    direction: buttonDirection,
  })
    .withStyles({
      element: {
        position: 'relative',
        top: 'auto',
        left: 'auto',
        right: 'auto',
        zIndex: 99,
        ...buttonColorsOnGray(isThemeDark),
        [`@media (${token.media.queries.desktop.min})`]: {
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 'auto',
          ...(isRight && {
            left: 'auto',
            right: 0,
          }),
        },
      },
    })
    .on('click', (event) => {
      const button = event.currentTarget as HTMLButtonElement;
      event.stopPropagation();
      if (isRight) {
        EventSlide({});
      } else {
        EventSlide({ forward: false });
      }
      button.disabled = true;
      setTimeout(() => {
        button.disabled = false;
      }, ANIMATION_DURATION + 100);
    })
    .build();
};

const CreateSlide = ({ slide }: { slide: HTMLElement }) => {
  return new ElementBuilder(slide)
    .withClassName('carousel-image-slide')
    .withStyles({
      element: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        left: '100%',
        display: 'none',
        transition: `transform ${ANIMATION_DURATION}ms ease-in-out`,

        '&[data-active-slide]': {
          zIndex: 99,
          left: 0,
          display: 'block',
          transform: 'translateX(0)',
        },
      },
    })
    .build();
};

const SetCarouselSize = ({
  slider,
  activeSlide,
  maxHeight,
}: {
  slider: HTMLElement;
  activeSlide: HTMLElement;
  maxHeight?: number;
}) => {
  const windowHeight = window.innerHeight - 48;
  const children = Array.from(activeSlide.children) as HTMLDivElement[];
  const sliderContainer = slider.parentElement;
  const sliderWrapper = sliderContainer && sliderContainer.parentElement;
  const buttonRoot = sliderWrapper || sliderContainer;
  const buttons = buttonRoot
    ? (Array.from(buttonRoot.querySelectorAll(`.${BUTTON_CLASS_PREV}, .${BUTTON_CLASS_NEXT}`)) as HTMLButtonElement[])
    : [];
  const img = activeSlide.querySelector('img') as HTMLImageElement;
  const maxWindowHeight = Math.min(maxHeight || windowHeight, windowHeight);
  const imageSize = getResponsiveImageSize({
    image: img,
    parentNode: slider,
    maxWindowHeight,
  });
  const imageContainer = children.find((child) => child.contains(img)) as HTMLElement;
  const isMobile = window.matchMedia(`(${token.media.queries.tablet.max})`).matches;
  let size = imageSize;

  imageContainer.style.height = `${imageSize}px`;

  if (isMobile) {
    buttons.forEach((button) => { button.style.top = ''; });
  } else {
    buttons.forEach((button) => {
      button.style.top = `${imageSize / 2 - button.offsetHeight / 2}px`;
    });
  }

  if (children.length > 1) {
    size = children.reduce((accumulator, currentElement) => {
      return currentElement.offsetHeight + accumulator;
    }, 0);
  }

  slider.style.height = `${size}px`;
};

const SlideActiveSlide = ({
  slide,
  isRight = true,
}: {
  slide: HTMLElement;
  isRight: boolean;
}) => {
  const transformDirection = isRight ? '-100%' : '100%';

  slide.style.transform = `translateX(${transformDirection})`;

  setTimeout(() => {
    slide.removeAttribute(ATTRIBUTE_ACTIVE_SLIDE);
  }, ANIMATION_DURATION);

  setTimeout(() => {
    slide.style.transform = 'none';
  }, ANIMATION_DURATION + 100);
};

const SlideUpcomingSlide = ({
  slide,
  isRight = true,
}: {
  slide: HTMLElement;
  isRight: boolean;
}) => {
  const amount = '90';
  const translate = isRight ? `translateX(-${amount}%)` : `translateX(${amount}%)`;
  const startingPosition = isRight ? `${amount}%` : `-${amount}%`;

  slide.style.zIndex = '9';
  slide.style.transition = `transform ${ANIMATION_DURATION}ms ease-in-out`;
  slide.style.display = 'block';
  slide.style.left = `${startingPosition}`;

  setTimeout(() => {
    slide.style.transform = translate;
  }, 1);

  setTimeout(() => {
    slide.style.transition = 'none';
    slide.style.left = '0';
    slide.style.transform = 'none';
    slide.setAttribute(ATTRIBUTE_ACTIVE_SLIDE, '');
  }, ANIMATION_DURATION);

  setTimeout(() => {
    slide.removeAttribute('style');
  }, ANIMATION_DURATION + 100);
};

export const createCompositeCarouselImage = (props: TypeCarouselImageProps) =>
  (() => {
    const { slides, callback, maxHeight, isThemeDark, includeButtonWrapper = true } = props;
    let activeIndex = 0;
    let sliderElement: HTMLElement | null = null;

    const EventSlide = ({ forward = true }: { forward?: boolean }) => {
      SlideActiveSlide({ slide: slides[activeIndex], isRight: forward });

      if (forward) {
        activeIndex = activeIndex + 1;
        if (activeIndex >= slides.length) {
          activeIndex = 0;
        }
      } else {
        activeIndex = activeIndex - 1;
        if (activeIndex < 0) {
          activeIndex = slides.length - 1;
        }
      }

      SlideUpcomingSlide({ slide: slides[activeIndex], isRight: forward });
      if (sliderElement) {
        SetCarouselSize({
          slider: sliderElement,
          activeSlide: slides[activeIndex],
          maxHeight,
        });
      }
      if (callback) {
        callback(activeIndex);
      }
    };

    const EventMoveTo = (index: number) => {
      SlideActiveSlide({ slide: slides[activeIndex], isRight: true });
      activeIndex = index;
      SlideUpcomingSlide({ slide: slides[activeIndex], isRight: true });
      if (sliderElement) {
        SetCarouselSize({
          slider: sliderElement,
          activeSlide: slides[activeIndex],
          maxHeight,
        });
      }
      if (callback) {
        callback(activeIndex);
      }
    };

    const EventSlideLeft = () => EventSlide({ forward: false });
    const EventSlideRight = () => EventSlide({ forward: true });

    const EventSwipe = () => {
      const swipes = (isRightSwipe: boolean) => {
        if (!isRightSwipe) {
          EventSlide({ forward: true });
        } else {
          EventSlide({ forward: false });
        }
      };
      if (sliderElement) {
        setupSwipeDetection({ container: sliderElement, callback: swipes });
      }
    };

    const EventResize = () => {
      if (sliderElement) {
        SetCarouselSize({
          slider: sliderElement,
          activeSlide: slides[activeIndex],
          maxHeight,
        });
      }
    };

    const Load = () => {
      const setSize = () => {
        if (!sliderElement) return;
        const activeSlide = slides[activeIndex];
        SetCarouselSize({ slider: sliderElement, activeSlide, maxHeight });
        activeSlide.setAttribute(ATTRIBUTE_ACTIVE_SLIDE, '');
      };
      setTimeout(setSize, 100);
      setTimeout(setSize, 300);
    };

    const prevButtonModel = CreateButton({ EventSlide, isRight: false, isThemeDark });
    const nextButtonModel = CreateButton({ EventSlide, isRight: true, isThemeDark });
    const slidesElements = slides.map((slide) => CreateSlide({ slide: slide }));
    const sliderModel = new ElementBuilder()
      .withClassName('carousel-image-slider')
      .withStyles({
        element: {
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
        },
      })
      .ref((element) => {
        sliderElement = element;
      })
      .withChildren(...slidesElements)
      .build();

    const containerBuilder = new ElementBuilder()
      .withClassName('carousel-image-slider-container')
      .withStyles({
        element: {
          position: 'relative',
          width: '100%',
          ...(includeButtonWrapper && {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            [`@media (${token.media.queries.desktop.min})`]: {
              display: 'block',
            },
          }),
        },
      })
      .withChild(sliderModel);

    if (includeButtonWrapper) {
      const buttonWrapperModel = new ElementBuilder()
        .withClassName('carousel-image-slider-buttons')
        .withStyles({
          element: {
            display: 'flex',
            justifyContent: 'center',
            gap: token.spacing.min,
            width: '100%',
            marginTop: token.spacing.md,
            marginBottom: token.spacing.md,
            [`@media (${token.media.queries.desktop.min})`]: {
              width: 'auto',
              marginTop: 0,
              marginBottom: 0,
            },
          },
        })
        .withChildren(prevButtonModel, nextButtonModel)
        .build();
      containerBuilder.withChild(buttonWrapperModel);
    }

    const containerModel = containerBuilder
      .withEvents({
        Load,
        EventMoveTo,
        EventResize,
        EventSlideLeft,
        EventSlideRight,
      })
      .build();

    window.addEventListener('resize', debounce(EventResize, 10));
    EventSwipe();

    return {
      element: containerModel.element,
      styles: containerModel.styles,
      buttons: { prev: prevButtonModel, next: nextButtonModel },
      events: containerModel.events,
    } as CarouselImageModel;
  })();
