import { Elements, Tokens, Typography } from '@universityofmaryland/variables';
import { AssetIcon, Styles } from 'utilities';
import {
  AnimationCarousel,
  AnimationIndicator,
  LayoutFixedFullScreen,
  LayoutImage,
} from 'macros';
import overlay from 'macros/layout/overlay';

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
    theme?: string | null;
  };

const { Colors, Spacing } = Tokens;
const { SansLarge, SansMin } = Typography;
const { Text } = Elements;
const { ConvertJSSObjectToStyles } = Styles;

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
const ELEMENT_CAROUSEL_FULL_SCREEN = 'carousel-full-screen';
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
const IndicatorContainerStyles = `
  .${ELEMENT_CAROUSEL_INDICATOR_WRAPPER} {
    padding: ${Spacing.md};
    background-color: ${Colors.gray.lightest};
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
const OverlayImageContainerStyles = `
  .${ELEMENT_CAROUSEL_OVERLAY_IMAGE_COINTAINER} {
    display: flex;
    justify-content: center;
    background-color: ${Colors.gray.dark};
  }
`;

// prettier-ignore
const FullScreenButtonStyles = `
  .${ELEMENT_CAROUSEL_FULL_SCREEN} {
    position: absolute;
    bottom: 0;
    left: 0;
    color: ${Colors.white};
    text-transform: uppercase;
    font-weight: 700;
    padding: ${Spacing.min};
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_CAROUSEL_FULL_SCREEN}`]: SansMin,
    },
  })}

  .${ELEMENT_CAROUSEL_FULL_SCREEN} > span {
    display: block;
    height: 12px;
    width: 1px;
    background-color: ${Colors.gray.mediumAA};
    margin: 0 4px;
  }
`;

// prettier-ignore
const TextContainerStyles = `
  .${ELEMENT_SLIDE_TEXT_CONTAINER} {
    padding: ${Spacing.md};
    padding-bottom: 0;
    background-color: ${Colors.gray.lightest};
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
const STYLES_CAROUSEL_IMAGE_STANDARD_ELEMENT = `
  .${ELEMENT_CAROUSEL_IMAGE_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_CAROUSEL_IMAGE_CONTAINER} {
    overflow: hidden;
    background-color: ${Colors.gray.lightest};
  }

  ${LayoutImage.Styles}
  ${LayoutFixedFullScreen.Styles}
  ${AnimationIndicator.Styles}
  ${AnimationCarousel.Styles}
  ${ImageContainerStyles}
  ${TextContainerStyles}
  ${FullScreenButtonStyles}
  ${OverlayImageContainerStyles}
  ${IndicatorContainerStyles}
  ${OverwriteThemeDark}
`;

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
  isFullScreenOption = true,
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
    const fullScreenbutton = document.createElement('button');
    fullScreenbutton.classList.add(ELEMENT_CAROUSEL_FULL_SCREEN);
    fullScreenbutton.addEventListener('click', () => {
      setFullScreen(index);
    });
    fullScreenbutton.innerHTML = `Full Screen <span></span>${AssetIcon.FULL_SCREEN}`;

    imageBlock.appendChild(fullScreenbutton);
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

const CreateOverlaySlide = ({ images }: TypeCarouselSlideProps) =>
  images.map((image) => {
    const slide = document.createElement('div');
    const imageContainer = document.createElement('div');
    const imageBlock = LayoutImage.CreateElement({
      image,
      showCaption: true,
    });

    imageContainer.classList.add(ELEMENT_CAROUSEL_OVERLAY_IMAGE_COINTAINER);
    imageContainer.appendChild(imageBlock);

    slide.appendChild(imageContainer);
    slide.classList.add(ELEMENT_SLIDE);

    return slide;
  });

const CreateCarouselImageStandardElement = (
  props: TypeCarouselImageStandardProps,
) =>
  (() => {
    const { images, theme } = props;
    const elementDeclaration = document.createElement('div');
    const elementContainer = document.createElement('div');
    const elementIndicator = document.createElement('div');
    const setFullScreen = (index: number) => {
      let canMove = true;

      const checkKeyEvents = (event: KeyboardEvent) => {
        if (!canMove) return;
        canMove = false;
        if (event.key == 'ArrowLeft') overlayCarousel.events.EventSlideLeft();
        if (event.key == 'ArrowRight') overlayCarousel.events.EventSlideRight();

        setTimeout(() => {
          canMove = true;
        }, 700);
      };

      overlayCarousel.events.EventMoveTo(index);
      setTimeout(() => fixedFullScreen.events.show(), 100);

      setTimeout(() => {
        overlayCarousel.events.EventResize();
      }, 100);

      isFullScreenEvents = window.addEventListener('keyup', checkKeyEvents);
    };
    const slides = CreateSlide({ ...props, setFullScreen });
    const overlaySlides = CreateOverlaySlide({ ...props, setFullScreen });
    const carousel = AnimationCarousel.CreateElement({
      slides,
      callback: (activeIndex) => {
        indicator.position(activeIndex);
      },
      maxHeight: 500,
    });
    const overlayCarousel = AnimationCarousel.CreateElement({
      slides: overlaySlides,
      maxHeight: (window.innerHeight / 10) * 8,
    });

    const fixedFullScreen = LayoutFixedFullScreen.CreateElement({
      content: overlayCarousel.element,
      callback: () => {
        if (isFullScreenEvents)
          window.removeEventListener('keyup', isFullScreenEvents);
      },
    });

    const indicator = AnimationIndicator.CreateElement({
      count: images.length || 0,
      callback: carousel.events.EventMoveTo,
      theme: theme || 'light',
    });
    let isFullScreenEvents: any = null;

    elementIndicator.classList.add(ELEMENT_CAROUSEL_INDICATOR_WRAPPER);
    elementIndicator.appendChild(indicator.element);

    elementContainer.classList.add(ELEMENT_CAROUSEL_IMAGE_CONTAINER);
    elementContainer.appendChild(carousel.element);
    elementContainer.appendChild(elementIndicator);
    if (theme) elementContainer.setAttribute(ATTRIBUTE_THEME, theme);

    elementDeclaration.classList.add(ELEMENT_CAROUSEL_IMAGE_DECLARATION);
    elementDeclaration.appendChild(elementContainer);

    images[images.length - 1].addEventListener('load', carousel.events.Load);

    return {
      element: elementDeclaration,
      overlay: fixedFullScreen ? fixedFullScreen.element : null,
      events: {
        SetEventReize: carousel.events.EventResize,
      },
    };
  })();

export default {
  CreateElement: CreateCarouselImageStandardElement,
  Styles: STYLES_CAROUSEL_IMAGE_STANDARD_ELEMENT,
};
