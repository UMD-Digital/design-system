import { Tokens } from '@universityofmaryland/variables';
import {
  AnimationCarouselOverlay,
  AnimationCarouselBlocks,
  AnimationIndicator,
  ButtonFullScreen,
  LayoutImage,
} from 'macros';
import fullScreen from 'macros/buttons/full-screen';

type TypeCarouselMultipleProps = {
  images: HTMLImageElement[];
  theme?: string | null;
  isFullScreenOption?: boolean;
};

const { Colors } = Tokens;

const ATTRIBUTE_THEME = 'data-theme';
const THEME_DARK = 'dark';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const ELEMENT_NAME = 'umd-carousel-image-standard';
const ELEMENT_CAROUSEL_MULTIPLE_DECLARATION =
  'carousel-image-multiple-declaration';
const ELEMENT_CAROUSEL_MULTIPLE_CONTAINER = 'carousel-image-multiple-container';
const ELEMENT_CAROUSEL_SLIDER_BUTTON = 'carousel-multiple-button';

const OVERWRITE_LAYOUT_IMAGE = `.${ELEMENT_CAROUSEL_MULTIPLE_DECLARATION} .${LayoutImage.Elements.container}`;

const OVERWRITE_ANIMATION_CAROUSEL_BUTTON = `.${ELEMENT_CAROUSEL_MULTIPLE_DECLARATION} .${AnimationCarouselBlocks.Elements.button}`;
const OVERWRITE_FULL_SCREEN_BUTTON = `.${ELEMENT_CAROUSEL_MULTIPLE_DECLARATION} .${fullScreen.Elements.button}`;

const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_CAROUSEL_MULTIPLE_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_THEME_DARK_BUTTON = `.${ELEMENT_CAROUSEL_MULTIPLE_CONTAINER}${IS_THEME_DARK} .${ELEMENT_CAROUSEL_SLIDER_BUTTON}`;

// prettier-ignore
const OverwriteThemeDark = `
  ${OVERWRITE_THEME_DARK_CONTAINER} {
    background-color: ${Colors.black};
  }

  ${OVERWRITE_THEME_DARK_BUTTON} {
    background-color: ${Colors.black};
  }

  ${OVERWRITE_THEME_DARK_BUTTON} > svg {
    fill: ${Colors.white};
  }
`;

// prettier-ignore
const OverwriteFullScreenOption = `
  ${OVERWRITE_FULL_SCREEN_BUTTON} {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.5s linear;
  }

  ${OVERWRITE_FULL_SCREEN_BUTTON}:focus {
    visibility: visible;
    opacity: 1;
  }

  ${OVERWRITE_LAYOUT_IMAGE}:focus-within .${fullScreen.Elements.button},
  ${OVERWRITE_LAYOUT_IMAGE}:hover .${fullScreen.Elements.button} {
    visibility: visible;
    opacity: 1;
  }
`

// prettier-ignore
const OverwriteImageStyles = `
  ${OVERWRITE_LAYOUT_IMAGE} img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

// prettier-ignore
const OverwriteCarouselStyles = `
  ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON} {
    top: 50%;
    transform: translateY(-50%);
    background-color: ${Colors.white};
  }

  ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON} svg {
    fill: ${Colors.black};
  };

  ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON}:last-of-type {
    left: 0;
  }

  ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON}:first-of-type {
    right: 0;
  }
`;

// prettier-ignore
const STYLES_CAROUSEL_IMAGE_MULTIPLE_ELEMENT = `
  .${ELEMENT_CAROUSEL_MULTIPLE_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_CAROUSEL_MULTIPLE_CONTAINER} {
    overflow: hidden;
  }

  ${AnimationIndicator.Styles}
  ${AnimationCarouselBlocks.Styles}
  ${AnimationCarouselOverlay.Styles}
  ${ButtonFullScreen.Styles}
  ${LayoutImage.Styles}
  ${OverwriteImageStyles}
  ${OverwriteCarouselStyles}
  ${OverwriteFullScreenOption}
  ${OverwriteThemeDark}
`;

const CreateCarouselImageMultipleElement = (props: TypeCarouselMultipleProps) =>
  (() => {
    const { images, theme, isFullScreenOption } = props;
    const elementDeclaration = document.createElement('div');
    const elementContainer = document.createElement('div');
    const clonedImages = images.map((image) =>
      image.cloneNode(true),
    ) as HTMLImageElement[];
    const overlayCarousel = AnimationCarouselOverlay.CreateElement({
      images,
    });
    const slide = document.createElement('div');
    const blocks = clonedImages.map((image, index) => {
      const block = LayoutImage.CreateElement({
        image,
        showCaption: true,
      });

      if (isFullScreenOption) {
        block.appendChild(
          ButtonFullScreen.CreateElement({
            callback: overlayCarousel.events.setFullScreen,
            index,
          }),
        );
      }

      return block;
    });

    const carousel = AnimationCarouselBlocks.CreateElement({
      blocks,
      slide,
      overwriteDisplayLogic: {
        mobileBreakpoint: 600,
        tabletBreakpoint: 900,
        desktopCount: 3,
        desktopBreakpoint: 1400,
        maxCount: 4,
        minBlockHeightTablet: 320,
        minBlockHeightMobile: 240,
        showHint: false,
      },
    });

    elementContainer.appendChild(carousel.element);
    elementContainer.classList.add(ELEMENT_CAROUSEL_MULTIPLE_CONTAINER);
    if (theme) elementContainer.setAttribute(ATTRIBUTE_THEME, theme);

    elementDeclaration.classList.add(ELEMENT_CAROUSEL_MULTIPLE_DECLARATION);
    elementDeclaration.appendChild(elementContainer);

    images[images.length - 1].addEventListener('load', carousel.events.load);

    return {
      element: elementDeclaration,
      overlay: isFullScreenOption ? overlayCarousel.element : null,
      events: {
        SetEventReize: carousel.events.resize,
      },
    };
  })();

export default {
  CreateElement: CreateCarouselImageMultipleElement,
  Styles: STYLES_CAROUSEL_IMAGE_MULTIPLE_ELEMENT,
};
