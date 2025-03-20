import * as Styles from '@universityofmaryland/web-styles-library';
import { buttons } from 'atomic';
import { Image as LayoutImage } from 'layout';
import {
  AnimationCarouselOverlay,
  AnimationCarouselImage,
  AnimationIndicator,
} from 'macros';
import * as Utility from 'utilities';

type TypeImage = {
  image: HTMLImageElement;
};

type TypeFullScreen = {
  isFullScreenOption?: boolean;
};

type TypesetFullScreen = {
  setFullScreen: (arg: number) => void;
};

type TypeSlideContent = {
  images: HTMLImageElement[];
  headlines?: HTMLElement[] | null;
  texts?: HTMLElement[] | null;
};

type TypeImageContainerProps = TypeImage &
  TypeFullScreen &
  TypesetFullScreen & {
    index: number;
  };

type TypeCarouselSlideProps = TypeSlideContent &
  TypesetFullScreen &
  TypeFullScreen;

type TypeCarouselImageStandardProps = TypeSlideContent &
  TypeFullScreen & {
    isThemeDark?: boolean;
  };

const { convertJSSObjectToStyles } = Utility.styles;
const { element, token, typography } = Styles;

const MEDIUM = 500;

const ATTRIBUTE_REFERENCE = 'data-reference';
const ATTRIBUTE_THEME = 'data-theme';
const THEME_DARK = 'dark';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const ELEMENT_NAME = 'umd-carousel-image-standard';
const ELEMENT_CAROUSEL_IMAGE_DECLARATION =
  'carousel-image-standard-declaration';
const ELEMENT_CAROUSEL_IMAGE_CONTAINER = 'carousel-image-standard-container';

const ELEMENT_SLIDE = 'carousel-image-standard-slide';
const ELEMENT_SLIDE_IMAGE_CONTAINER = 'carousel-image-standard-slide-image';
const ELEMENT_SLIDE_IMAGE_WRAPPER = 'carousel-image-standard-slide-wrapper';
const ELEMENT_SLIDE_TEXT_CONTAINER = 'carousel-image-standard-slide-text';
const ELEMENT_SLIDE_HEADLINE = 'carousel-image-standard-slide-headline';
const ELEMENT_SLIDE_RICH_TEXT = 'carousel-image-standard-slide-rich-text';
const ELEMENT_CAROUSEL_SLIDER_BUTTON = 'carousel-slider-button';

const ELEMENT_CAROUSEL_INDICATOR_WRAPPER = 'carousel-indicator-wrapper';
const ELEMENT_CAROUSEL_OVERLAY_IMAGE_COINTAINER =
  'carousel-overlay-image-container';

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
    background-color: ${token.color.black};
  }

  ${OVERWRITE_THEME_DARK_IMAGE_CONTAINER} {
    background-color: ${token.color.gray.dark};
  }

  ${OVERWRITE_THEME_DARK_TEXT_CONTAINER} * {
    color: ${token.color.white};
  }

  ${OVERWRITE_THEME_DARK_BUTTON} {
    background-color: ${token.color.black};
  }

  ${OVERWRITE_THEME_DARK_BUTTON} > svg {
    fill: ${token.color.white};
  }
`;

// prettier-ignore
const IndicatorContainerStyles = `
  .${ELEMENT_CAROUSEL_INDICATOR_WRAPPER} {
    padding: ${token.spacing.md};
    background-color: ${token.color.gray.lightest};
    display: flex;
    justify-content: center;
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${ELEMENT_CAROUSEL_INDICATOR_WRAPPER} {
      padding: ${token.spacing.lg};
    }
  }
`;

// prettier-ignore
const OverlayImageContainerStyles = `
  .${ELEMENT_CAROUSEL_OVERLAY_IMAGE_COINTAINER} {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${token.color.gray.dark};
  }

  .${ELEMENT_CAROUSEL_OVERLAY_IMAGE_COINTAINER} img {
    object-fit: contain;
    max-height: 100%;
  }
`;

// prettier-ignore
const TextContainerStyles = `
  .${ELEMENT_SLIDE_TEXT_CONTAINER} {
    padding: ${token.spacing.md};
    padding-bottom: 0;
    background-color: ${token.color.gray.lightest};
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${ELEMENT_SLIDE_TEXT_CONTAINER} {
      padding: ${token.spacing.lg};
      padding-bottom: 0;
    }
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_SLIDE_HEADLINE}`]: typography.sans.large,
    },
  })}

  .${ELEMENT_SLIDE_RICH_TEXT} {
    margin-top: ${token.spacing.min};
    color: ${token.color.gray.dark}
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_SLIDE_RICH_TEXT}`]: element.text.rich.advanced,
    },
  })}
`

// prettier-ignore
const ImageContainerStyles = `
  .${ELEMENT_SLIDE_IMAGE_CONTAINER} {
    position: relative;
    background-color: ${token.color.black};
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
const STYLES_CAROUSEL_IMAGE_STANDARD_ELEMENT = `
  .${ELEMENT_CAROUSEL_IMAGE_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_CAROUSEL_IMAGE_CONTAINER} {
    overflow: hidden;
    background-color: ${token.color.gray.lightest};
  }

  ${AnimationIndicator.Styles}
  ${AnimationCarouselImage.Styles}
  ${LayoutImage.Styles}
  ${ImageContainerStyles}
  ${TextContainerStyles}
  ${OverlayImageContainerStyles}
  ${IndicatorContainerStyles}
  ${OverwriteThemeDark}
`;

export default (props: TypeCarouselImageStandardProps) =>
  (() => {
    const { images, isThemeDark, isFullScreenOption } = props;
    const elementDeclaration = document.createElement('div');
    const elementContainer = document.createElement('div');
    const elementIndicator = document.createElement('div');
    const overlayCarousel = AnimationCarouselOverlay({
      images,
    });
    let styles = STYLES_CAROUSEL_IMAGE_STANDARD_ELEMENT;

    styles += overlayCarousel.styles;

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

    const CreateImageContainer = ({
      image,
      isFullScreenOption,
      setFullScreen,
      index,
    }: TypeImageContainerProps) => {
      const imageContainer = document.createElement('div');
      const imageWrapper = document.createElement('div');
      const imageBlock = LayoutImage.CreateElement({
        image,
        showCaption: true,
      });

      imageContainer.classList.add(ELEMENT_SLIDE_IMAGE_CONTAINER);

      imageWrapper.classList.add(ELEMENT_SLIDE_IMAGE_WRAPPER);
      imageWrapper.appendChild(imageBlock);

      if (isFullScreenOption) {
        const button = buttons.fullscreen.create({
          callback: setFullScreen,
          index,
        });
        imageBlock.appendChild(button.element);

        styles += button.styles;
      }

      imageContainer.appendChild(imageWrapper);

      return imageContainer;
    };

    const CreateSlide = (props: TypeCarouselSlideProps) => {
      const { images, setFullScreen } = props;
      const clonedImages = images.map((image) =>
        image.cloneNode(true),
      ) as HTMLImageElement[];

      return clonedImages.map((image, index) => {
        const reference = image.getAttribute(ATTRIBUTE_REFERENCE);
        const slide = document.createElement('div');
        const imageContainer = CreateImageContainer({
          ...props,
          image,
          setFullScreen,
          index,
        });
        const textContainer = CreateTextContainer({ ...props, reference });

        slide.classList.add(ELEMENT_SLIDE);
        slide.appendChild(imageContainer);
        if (textContainer) slide.appendChild(textContainer);

        return slide;
      });
    };

    const slides = CreateSlide({
      ...props,
      setFullScreen: overlayCarousel.events.setFullScreen,
    });
    const carousel = AnimationCarouselImage.CreateElement({
      slides,
      callback: (activeIndex) => {
        indicator.position(activeIndex);
      },
      maxHeight: 500,
    });

    const indicator = AnimationIndicator.CreateElement({
      count: images.length || 0,
      callback: carousel.events.EventMoveTo,
      isThemeDark,
      isThemeLight: !isThemeDark,
    });

    elementIndicator.classList.add(ELEMENT_CAROUSEL_INDICATOR_WRAPPER);
    elementIndicator.appendChild(indicator.element);

    elementContainer.classList.add(ELEMENT_CAROUSEL_IMAGE_CONTAINER);
    elementContainer.appendChild(carousel.element);
    elementContainer.appendChild(elementIndicator);
    if (isThemeDark) elementContainer.setAttribute(ATTRIBUTE_THEME, THEME_DARK);

    elementDeclaration.classList.add(ELEMENT_CAROUSEL_IMAGE_DECLARATION);
    elementDeclaration.appendChild(elementContainer);

    images[images.length - 1].addEventListener('load', carousel.events.Load);

    const responseOptions = {
      styles,
      events: {
        SetEventReize: carousel.events.EventResize,
      },
    };

    if (isFullScreenOption) {
      const element = document.createElement('div');

      element.appendChild(overlayCarousel.element);
      element.appendChild(elementDeclaration);

      return {
        element,
        ...responseOptions,
      };
    }

    return {
      element: elementDeclaration,
      ...responseOptions,
    };
  })();
