import * as Styles from '@universityofmaryland/web-styles-library';
import { buttons } from 'atomic';
import { Image as LayoutImage } from 'layout';
import * as carouselElements from '../elements';

type TypeCarouselMultipleProps = {
  images: HTMLImageElement[];
  isThemeDark?: boolean;
  isFullScreenOption?: boolean;
};

const { token } = Styles;
const fullScreenClassName = Styles.element.action.button.fullScreen.className;

const ATTRIBUTE_THEME = 'data-theme';
const THEME_DARK = 'dark';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const ELEMENT_NAME = 'umd-carousel-image-standard';
const ELEMENT_CAROUSEL_MULTIPLE_DECLARATION =
  'carousel-image-multiple-declaration';
const ELEMENT_CAROUSEL_MULTIPLE_CONTAINER = 'carousel-image-multiple-container';
const ELEMENT_CAROUSEL_SLIDER_BUTTON = 'carousel-multiple-button';

const OVERWRITE_LAYOUT_IMAGE = `.${ELEMENT_CAROUSEL_MULTIPLE_DECLARATION} .${LayoutImage.Elements.container}`;

const OVERWRITE_ANIMATION_CAROUSEL_BUTTON = `.${ELEMENT_CAROUSEL_MULTIPLE_DECLARATION} .${carouselElements.blocks.Elements.button}`;
const OVERWRITE_FULL_SCREEN_BUTTON = `.${ELEMENT_CAROUSEL_MULTIPLE_DECLARATION} .${fullScreenClassName}`;

const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_CAROUSEL_MULTIPLE_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_THEME_DARK_BUTTON = `.${ELEMENT_CAROUSEL_MULTIPLE_CONTAINER}${IS_THEME_DARK} .${ELEMENT_CAROUSEL_SLIDER_BUTTON}`;

// prettier-ignore
const OverwriteThemeDark = `
  ${OVERWRITE_THEME_DARK_CONTAINER} {
    background-color: ${token.color.black};
  }

  ${OVERWRITE_THEME_DARK_BUTTON} {
    background-color: ${token.color.black};
  }

  ${OVERWRITE_THEME_DARK_BUTTON} > svg {
    fill: ${token.color.white};
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

  ${OVERWRITE_LAYOUT_IMAGE}:focus-within .${fullScreenClassName},
  ${OVERWRITE_LAYOUT_IMAGE}:hover .${fullScreenClassName} {
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
    background-color: ${token.color.white};
  }

  ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON} svg {
    fill: ${token.color.black};
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


  ${carouselElements.blocks.Styles}
  ${LayoutImage.Styles}
  ${OverwriteImageStyles}
  ${OverwriteCarouselStyles}
  ${OverwriteFullScreenOption}
  ${OverwriteThemeDark}
`;

export default (props: TypeCarouselMultipleProps) =>
  (() => {
    const { images, isThemeDark, isFullScreenOption } = props;
    const elementDeclaration = document.createElement('div');
    const elementContainer = document.createElement('div');
    const clonedImages = images.map((image) =>
      image.cloneNode(true),
    ) as HTMLImageElement[];
    let styles = STYLES_CAROUSEL_IMAGE_MULTIPLE_ELEMENT;

    const overlayCarousel = carouselElements.overlay({
      images,
    });

    styles += overlayCarousel.styles;

    const slide = document.createElement('div');
    const blocks = clonedImages.map((image, index) => {
      const block = LayoutImage.CreateElement({
        image,
        showCaption: true,
      });

      if (isFullScreenOption) {
        const button = buttons.fullscreen.create({
          callback: overlayCarousel.events.setFullScreen,
          index,
        });

        block.appendChild(button.element);
        styles += button.styles;
      }

      return block;
    });

    const carousel = carouselElements.blocks.CreateElement({
      blocks,
      slide,
      overwriteDisplayLogic: {
        mobileBreakpoint: 600,
        tabletBreakpoint: 900,
        desktopBreakpoint: 1400,
        desktopCount: 3,
        maxCount: 4,
        showHint: false,
        fullScreenCallback: overlayCarousel.events.setFullScreen,
      },
    });

    elementContainer.appendChild(carousel.element);
    elementContainer.classList.add(ELEMENT_CAROUSEL_MULTIPLE_CONTAINER);
    if (isThemeDark) elementContainer.setAttribute(ATTRIBUTE_THEME, THEME_DARK);

    elementDeclaration.classList.add(ELEMENT_CAROUSEL_MULTIPLE_DECLARATION);
    elementDeclaration.appendChild(elementContainer);

    images[images.length - 1].addEventListener('load', () => {
      carousel.events.load();

      setTimeout(() => {
        const maxHeight = clonedImages.reduce(
          (acc, image) => (image.offsetHeight > acc ? image.offsetHeight : acc),
          300,
        );

        slide.style.minHeight = `${maxHeight}px`;
      }, 100);
    });

    const responseOptions = {
      styles,
      events: {
        SetEventReize: carousel.events.resize,
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
