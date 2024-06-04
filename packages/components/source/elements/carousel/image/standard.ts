import { Elements, Tokens, Typography } from '@universityofmaryland/variables';
import {
  AssetIcon,
  AssetServices,
  EventsUtility,
  Performance,
  Styles,
} from 'utilities';
import { AnimationIndicator, LayoutImage } from 'macros';

const { Colors, Spacing } = Tokens;
const { SansLarge } = Typography;
const { Text } = Elements;
const { Debounce } = Performance;
const { ConvertJSSObjectToStyles } = Styles;
const { GetResponsiveImageSize } = AssetServices;

type TypeCarouselImageStandardProps = {
  images: HTMLImageElement[];
  headlines?: HTMLElement[] | null;
  texts?: HTMLElement[] | null;
  isFullScreenOption?: boolean;
  theme?: string | null;
};

const ANIMATION_DURATION = 500;
const MEDIUM = 500;

const ATTRIBUTE_REFERENCE = 'data-reference';
const ATTRIBUTE_THEME = 'data-theme';
const ATTRIBUTE_ACTIVE_SLIDE = 'data-active-slide';
const THEME_DARK = 'dark';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const ELEMENT_NAME = 'umd-carousel-image-standard';
const ELEMENT_CAROUSEL_IMAGE_DECLARATION =
  'carousel-image-standard-declaration';
const ELEMENT_CAROUSEL_IMAGE_CONTAINER = 'carousel-image-standard-container';

const ELEMENT_SLIDER_CONTAINER = 'carousel-image-standard-slider';
const ELEMENT_SLIDE = 'carousel-image-standard-slide';
const ELEMENT_SLIDE_IMAGE_CONTAINER = 'carousel-image-standard-slide-image';
const ELEMENT_SLIDE_IMAGE_WRAPPER = 'carousel-image-standard-slide-wrapper';
const ELEMENT_SLIDE_TEXT_CONTAINER = 'carousel-image-standard-slide-text';
const ELEMENT_SLIDE_HEADLINE = 'carousel-image-standard-slide-headline';
const ELEMENT_SLIDE_RICH_TEXT = 'carousel-image-standard-slide-rich-text';
const ELEMENT_CAROUSEL_SLIDER_BUTTON = 'carousel-slider-button';
const ELEMENT_CAROUSEL_INDICATOR_WRAPPER = 'carousel-indicator-wrapper';

const OVERWRITE_ACTIVE_SLIDE = `.${ELEMENT_SLIDE}[${ATTRIBUTE_ACTIVE_SLIDE}]`;

const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_CAROUSEL_IMAGE_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_THEME_DARK_TEXT_CONTAINER = `.${ELEMENT_CAROUSEL_IMAGE_CONTAINER}${IS_THEME_DARK} .${ELEMENT_SLIDE_TEXT_CONTAINER}`;
const OVERWRITE_THEME_DARK_IMAGE_CONTAINER = `.${ELEMENT_CAROUSEL_IMAGE_CONTAINER}${IS_THEME_DARK} .${ELEMENT_SLIDE_IMAGE_CONTAINER}`;
const OVERWRITE_THEME_DARK_INDICATOR = `.${ELEMENT_CAROUSEL_IMAGE_CONTAINER}${IS_THEME_DARK} .${ELEMENT_CAROUSEL_INDICATOR_WRAPPER}`;
const OVERWRITE_THEME_DARK_BUTTON = `.${ELEMENT_CAROUSEL_IMAGE_CONTAINER}${IS_THEME_DARK} .${ELEMENT_CAROUSEL_SLIDER_BUTTON}`;

// prettier-ignore
const OverwriteThemeDark = `
  ${OVERWRITE_THEME_DARK_CONTAINER},
  ${OVERWRITE_THEME_DARK_TEXT_CONTAINER},
  ${OVERWRITE_THEME_DARK_INDICATOR} {
    background-color: ${Colors.black};
  }

  ${OVERWRITE_THEME_DARK_IMAGE_CONTAINER} {
    background-color: ${Colors.gray.dark};
  }

  ${OVERWRITE_THEME_DARK_TEXT_CONTAINER} * {
    color: ${Colors.white};
  }

  ${OVERWRITE_THEME_DARK_BUTTON} {
    background-color: ${Colors.black};
  }

  ${OVERWRITE_THEME_DARK_BUTTON} > svg {
    fill: ${Colors.white};
  }
`;

// prettier-ignore
const indicatorContainerStyles = `
  .${ELEMENT_CAROUSEL_INDICATOR_WRAPPER} {
    padding: ${Spacing.md};
    background-color: ${Colors.gray.lighter};
    display: flex;
    justify-content: center;
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${ELEMENT_CAROUSEL_INDICATOR_WRAPPER} {
      padding: ${Spacing.lg};
    }
  }
`;

// prettier-ignore
const TextContainerStyles = `
  .${ELEMENT_SLIDE_TEXT_CONTAINER} {
    padding: ${Spacing.md};
    padding-bottom: 0;
    background-color: ${Colors.gray.lighter};
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${ELEMENT_SLIDE_TEXT_CONTAINER} {
      padding: ${Spacing.lg};
      padding-bottom: 0;
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_SLIDE_HEADLINE}`]: SansLarge,
    },
  })}

  .${ELEMENT_SLIDE_RICH_TEXT} {
    margin-top: ${Spacing.min};
    color: ${Colors.gray.dark}
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_SLIDE_RICH_TEXT}`]: Text.RichText,
    },
  })}
`

// prettier-ignore
const ImageContainerStyles = `
  .${ELEMENT_SLIDE_IMAGE_CONTAINER} {
    position: relative;
    background-color: ${Colors.black};
  }

  .${ELEMENT_SLIDE_IMAGE_WRAPPER} {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .${ELEMENT_SLIDE_IMAGE_WRAPPER} > * {
    height: 100%;
  }

  .${ELEMENT_SLIDE_IMAGE_CONTAINER} img {
    object-fit: contain;
    max-height: 100%;
  }
`

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
  .${ELEMENT_SLIDE} {
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
  .${ELEMENT_SLIDER_CONTAINER} {
    position: relative;
  }
`

// prettier-ignore
const STYLES_CAROUSEL_IMAGE_STANDARD_ELEMENT = `
  .${ELEMENT_CAROUSEL_IMAGE_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_CAROUSEL_IMAGE_CONTAINER} {
    overflow: hidden;
    background-color: ${Colors.gray.lighter};
  }

  ${LayoutImage.Styles}
  ${AnimationIndicator.Styles}
  ${SliderStyles}
  ${SlideStyles}
  ${SliderButtons}
  ${ImageContainerStyles}
  ${TextContainerStyles}
  ${indicatorContainerStyles}
  ${OverwriteThemeDark}
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

  button.addEventListener('click', () => {
    if (isRight) EventSlide({});
    if (!isRight) EventSlide({ forward: false });
    button.disabled = true;

    setTimeout(() => {
      button.disabled = false;
    }, ANIMATION_DURATION + 100);
  });

  return button;
};

const CreateTextContainer = ({
  headlines,
  texts,
  reference,
}: {
  headlines?: HTMLElement[] | null;
  texts?: HTMLElement[] | null;
  reference: string | null;
}) => {
  const textContainer = document.createElement('div');

  const headline = headlines?.find(
    (headline) => headline.getAttribute(ATTRIBUTE_REFERENCE) === reference,
  );
  const richText = texts?.find(
    (text) => text.getAttribute(ATTRIBUTE_REFERENCE) === reference,
  );

  textContainer.classList.add(ELEMENT_SLIDE_TEXT_CONTAINER);

  if (headline || richText) {
    if (headline) {
      headline.classList.add(ELEMENT_SLIDE_HEADLINE);
      textContainer.appendChild(headline);
    }

    if (richText) {
      richText.classList.add(ELEMENT_SLIDE_RICH_TEXT);
      textContainer.appendChild(richText);
    }

    return textContainer;
  }

  return null;
};

const CreateImageContainer = (image: HTMLImageElement) => {
  const imageContainer = document.createElement('div');
  const imageWrapper = document.createElement('div');
  const imageBlock = LayoutImage.CreateElement({
    image,
    showCaption: true,
  });

  imageContainer.classList.add(ELEMENT_SLIDE_IMAGE_CONTAINER);

  imageWrapper.classList.add(ELEMENT_SLIDE_IMAGE_WRAPPER);
  imageWrapper.appendChild(imageBlock);

  imageContainer.appendChild(imageWrapper);

  return imageContainer;
};

const CreateSlide = (props: TypeCarouselImageStandardProps) => {
  const { images } = props;
  return images.map((image) => {
    const { images } = props;
    const reference = image.getAttribute(ATTRIBUTE_REFERENCE);
    const slide = document.createElement('div');
    const imageContainer = CreateImageContainer(image);
    const textContainer = CreateTextContainer({ ...props, reference });

    slide.classList.add(ELEMENT_SLIDE);
    slide.appendChild(imageContainer);
    if (textContainer) slide.appendChild(textContainer);

    return slide;
  });
};

const SetCarouselSize = ({
  slider,
  activeSlide,
  transition = true,
}: {
  slider: HTMLElement;
  activeSlide: HTMLElement;
  transition?: boolean;
}) => {
  const textContainer = activeSlide.querySelector(
    `.${ELEMENT_SLIDE_TEXT_CONTAINER}`,
  ) as HTMLElement;
  const imageContainer = activeSlide.querySelector(
    `.${ELEMENT_SLIDE_IMAGE_CONTAINER}`,
  ) as HTMLElement;
  const buttons = Array.from(
    slider.querySelectorAll(`.${ELEMENT_CAROUSEL_SLIDER_BUTTON}`),
  ) as HTMLButtonElement[];
  const img = activeSlide.querySelector('img') as HTMLImageElement;
  const imageSize = GetResponsiveImageSize({ image: img, parentNode: slider });
  let size = imageSize;

  if (textContainer) size = textContainer.offsetHeight + imageSize;

  imageContainer.style.height = `${imageSize}px`;
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

const CreateCarouselImageStandardElement = (
  props: TypeCarouselImageStandardProps,
) =>
  (() => {
    const { isFullScreenOption = true, images, theme } = props;
    const elementDeclaration = document.createElement('div');
    const elementContainer = document.createElement('div');
    const elementIndicator = document.createElement('div');
    const slider = document.createElement('div');
    const slides = CreateSlide(props);
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
      SetCarouselSize({ slider, activeSlide: slides[activeIndex] });
      indicator.position(activeIndex);
    };
    const EventMoveTo = (index: number) => {
      SlideActiveSlide({ slide: slides[activeIndex], isRight: true });
      activeIndex = index;
      SlideUpcomingSlide({ slide: slides[activeIndex], isRight: true });
      SetCarouselSize({ slider, activeSlide: slides[activeIndex] });
      indicator.position(activeIndex);
    };
    const EventSwipe = () => {
      const swipes = (isrightswipe: Boolean) => {
        if (!isrightswipe) {
          EventSlide({ forward: false });
        } else {
          EventSlide({ forward: true });
        }
      };

      EventsUtility.CreateEventSwipe({ container: slider, callback: swipes });
    };

    const EventResize = () => {
      SetCarouselSize({ slider, activeSlide: slides[activeIndex] });
    };
    const Load = () => {
      const setSize = () => {
        const activeSlide = slides[activeIndex];
        SetCarouselSize({ slider, activeSlide, transition: false });
        activeSlide.setAttribute(ATTRIBUTE_ACTIVE_SLIDE, '');
      };
      setTimeout(setSize, 100);
      setTimeout(setSize, 300);
    };
    const indicator = AnimationIndicator.CreateElement({
      count: images.length || 0,
      callback: EventMoveTo,
      theme: theme || 'light',
    });
    let activeIndex = 0;

    slider.classList.add(ELEMENT_SLIDER_CONTAINER);
    slider.append(...slides);
    slider.appendChild(CreateButton({ EventSlide, isRight: false }));
    slider.appendChild(
      CreateButton({
        EventSlide,
        isRight: true,
      }),
    );

    elementIndicator.classList.add(ELEMENT_CAROUSEL_INDICATOR_WRAPPER);
    elementIndicator.appendChild(indicator.element);

    elementContainer.classList.add(ELEMENT_CAROUSEL_IMAGE_CONTAINER);
    elementContainer.appendChild(slider);
    elementContainer.appendChild(elementIndicator);
    if (theme) elementContainer.setAttribute(ATTRIBUTE_THEME, theme);

    elementDeclaration.classList.add(ELEMENT_CAROUSEL_IMAGE_DECLARATION);
    elementDeclaration.appendChild(elementContainer);

    window.addEventListener('resize', Debounce(EventResize, 10));
    images[images.length - 1].addEventListener('load', Load);
    EventSwipe();

    return {
      element: elementDeclaration,
      events: { Load },
    };
  })();

export default {
  CreateElement: CreateCarouselImageStandardElement,
  Styles: STYLES_CAROUSEL_IMAGE_STANDARD_ELEMENT,
};
