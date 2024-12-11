import { Tokens } from '@universityofmaryland/variables';
import { AssetIcon, EventsUtility, Performance, Styles } from 'utilities';

const { Colors, Spacing } = Tokens;

type TypeCarouselImageProps = {
  slides: HTMLElement[];
  callback?: (index: number) => void;
  maxHeight?: number;
};

const ANIMATION_DURATION = 500;
const ATTRIBUTE_ACTIVE_SLIDE = 'data-active-slide';

const ELEMENT_CAROUSEL_DECLARATION = 'carousel-image-slider-container';
const ELEMENT_CAROUSEL_CONTAINER = 'carousel-image-slider';
const ELEMENT_CAROUSEL_SLIDE = 'carousel-image-slide';
const ELEMENT_CAROUSEL_SLIDER_BUTTON = 'carousel-slider-button';

const OVERWRITE_ACTIVE_SLIDE = `.${ELEMENT_CAROUSEL_SLIDE}[${ATTRIBUTE_ACTIVE_SLIDE}]`;

// prettier-ignore
const SliderButtons = `
  .${ELEMENT_CAROUSEL_SLIDER_BUTTON} {
    background-color: ${Colors.white};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    position: absolute;
    top: 50%;
    z-index: 99;
  }

  .${ELEMENT_CAROUSEL_SLIDER_BUTTON}:first-of-type {
    left: ${Spacing.sm};
  }

  .${ELEMENT_CAROUSEL_SLIDER_BUTTON}:first-of-type svg {
    transform: rotate(180deg);
  }

  .${ELEMENT_CAROUSEL_SLIDER_BUTTON}:last-of-type {
    right: ${Spacing.sm};
  }

  .${ELEMENT_CAROUSEL_SLIDER_BUTTON} svg {
    fill: ${Colors.black};
    width: 16px;
  }
`

// prettier-ignore
const SlideStyles = `
  .${ELEMENT_CAROUSEL_SLIDE} {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 100%;
    display: none;
    transition: transform ${ANIMATION_DURATION}ms ease-in-out;
  }

  ${OVERWRITE_ACTIVE_SLIDE} {
    z-index: 99;
    left: 0;
    display: block;
    transform: translateX(0);
  }
`

// prettier-ignore
const SliderStyles = `
  .${ELEMENT_CAROUSEL_CONTAINER} {
    position: relative;
  }
`

// prettier-ignore
const STYLES_CAROUSEL_IMAGE_ELEMENT = `
  .${ELEMENT_CAROUSEL_DECLARATION} {
    overflow: hidden;
  }

  ${SliderStyles}
  ${SlideStyles}
  ${SliderButtons}
`;

const CreateButton = ({
  EventSlide,
  isRight = true,
}: {
  EventSlide: ({ forward }: { forward?: boolean }) => void;
  isRight?: boolean;
}) => {
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.classList.add(ELEMENT_CAROUSEL_SLIDER_BUTTON);
  button.innerHTML = AssetIcon.FORWARD_ARROW;

  if (!isRight) {
    button.setAttribute('aria-label', 'Previous');
  } else {
    button.setAttribute('aria-label', 'Next');
  }

  button.addEventListener('click', (event) => {
    event.stopPropagation();
    if (isRight) EventSlide({});
    if (!isRight) EventSlide({ forward: false });
    button.disabled = true;

    setTimeout(() => {
      button.disabled = false;
    }, ANIMATION_DURATION + 100);
  });

  return button;
};

const SetCarouselSize = ({
  slider,
  activeSlide,
  transition = false,
  maxHeight,
}: {
  slider: HTMLElement;
  activeSlide: HTMLElement;
  transition?: boolean;
  maxHeight?: number;
}) => {
  const windowHeight = window.innerHeight - 48;
  const children = Array.from(activeSlide.children) as HTMLDivElement[];
  const buttons = Array.from(
    slider.querySelectorAll(`.${ELEMENT_CAROUSEL_SLIDER_BUTTON}`),
  ) as HTMLButtonElement[];
  const img = activeSlide.querySelector('img') as HTMLImageElement;
  const maxWindowHeight = maxHeight
    ? maxHeight > windowHeight
      ? windowHeight
      : maxHeight
    : windowHeight;
  const imageSize = Styles.assets.getResponsiveImageSize({
    image: img,
    parentNode: slider,
    maxWindowHeight,
  });
  const imageContainer = children.find((child) =>
    child.contains(img),
  ) as HTMLElement;
  let size = imageSize;

  imageContainer.style.height = `${imageSize}px`;

  if (children.length > 1) {
    size = children.reduce((acc, currentElement) => {
      return currentElement.offsetHeight + acc;
    }, 0);
  }

  buttons.forEach((button) => (button.style.top = `${imageSize / 2}px`));

  if (transition) {
    slider.style.transition = `height ${ANIMATION_DURATION}ms ease-in-out`;
  } else {
    slider.style.transition = `none`;
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
  const transformDirection = isRight ? 'translateX(-100%)' : 'translateX(100%)';
  slide.style.transform = `${transformDirection}`;

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
  const transformDirection = isRight
    ? `translateX(-${amount}%)`
    : `translateX(${amount}%)`;
  const startingPosition = isRight ? `${amount}%` : `-${amount}%`;

  slide.style.zIndex = '9';
  slide.style.transition = `transform ${ANIMATION_DURATION}ms ease-in-out`;
  slide.style.display = 'block';
  slide.style.left = `${startingPosition}`;

  setTimeout(() => {
    slide.style.transform = `${transformDirection}`;
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

const CreateCarouselImageElement = (props: TypeCarouselImageProps) =>
  (() => {
    const { slides, callback, maxHeight } = props;
    const container = document.createElement('div');
    const slider = document.createElement('div');
    let activeIndex = 0;

    const EventSlide = ({ forward = true }: { forward?: boolean }) => {
      SlideActiveSlide({ slide: slides[activeIndex], isRight: forward });

      if (forward) {
        activeIndex = activeIndex + 1;
        if (activeIndex >= slides.length) activeIndex = 0;
      } else {
        activeIndex = activeIndex - 1;
        if (activeIndex < 0) activeIndex = slides.length - 1;
      }

      SlideUpcomingSlide({ slide: slides[activeIndex], isRight: forward });
      SetCarouselSize({
        slider,
        activeSlide: slides[activeIndex],
        transition: true,
        maxHeight,
      });
      if (callback) callback(activeIndex);
    };

    const EventMoveTo = (index: number) => {
      SlideActiveSlide({ slide: slides[activeIndex], isRight: true });
      activeIndex = index;
      SlideUpcomingSlide({ slide: slides[activeIndex], isRight: true });
      SetCarouselSize({
        slider,
        activeSlide: slides[activeIndex],
        transition: true,
        maxHeight,
      });
      if (callback) callback(activeIndex);
    };

    const EventSlideLeft = () => EventSlide({ forward: false });
    const EventSlideRight = () => EventSlide({ forward: true });

    const EventSwipe = () => {
      const swipes = (isrightswipe: Boolean) => {
        if (!isrightswipe) {
          EventSlide({ forward: true });
        } else {
          EventSlide({ forward: false });
        }
      };

      EventsUtility.CreateEventSwipe({ container: slider, callback: swipes });
    };

    const EventResize = () => {
      SetCarouselSize({ slider, activeSlide: slides[activeIndex], maxHeight });
    };

    const Load = () => {
      const setSize = () => {
        const activeSlide = slides[activeIndex];
        SetCarouselSize({ slider, activeSlide, maxHeight });
        activeSlide.setAttribute(ATTRIBUTE_ACTIVE_SLIDE, '');
      };
      setTimeout(setSize, 100);
      setTimeout(setSize, 300);
    };

    slider.classList.add(ELEMENT_CAROUSEL_CONTAINER);
    slides.forEach((slide) => slide.classList.add(ELEMENT_CAROUSEL_SLIDE));
    slider.append(...slides);
    slider.appendChild(CreateButton({ EventSlide, isRight: false }));
    slider.appendChild(
      CreateButton({
        EventSlide,
        isRight: true,
      }),
    );

    container.classList.add(ELEMENT_CAROUSEL_DECLARATION);
    container.appendChild(slider);

    window.addEventListener('resize', Performance.debounce(EventResize, 10));
    EventSwipe();

    return {
      element: container,
      events: {
        Load,
        EventMoveTo,
        EventResize,
        EventSlideLeft,
        EventSlideRight,
      },
    };
  })();

export default {
  CreateElement: CreateCarouselImageElement,
  Styles: STYLES_CAROUSEL_IMAGE_ELEMENT,
};
