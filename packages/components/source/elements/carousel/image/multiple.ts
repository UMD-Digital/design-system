import { Tokens } from '@universityofmaryland/variables';
import {
  AnimationCarouselBlocks,
  AnimationIndicator,
  LayoutImage,
} from 'macros';

type TypeCarouselMultipleProps = {
  images: HTMLImageElement[];
  theme?: string | null;
};

const { Colors, Spacing } = Tokens;

const MEDIUM = 500;

const ATTRIBUTE_THEME = 'data-theme';
const THEME_DARK = 'dark';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const ELEMENT_NAME = 'umd-carousel-image-standard';
const ELEMENT_CAROUSEL_MULTIPLE_DECLARATION =
  'carousel-image-multiple-declaration';
const ELEMENT_CAROUSEL_MULTIPLE_CONTAINER = 'carousel-image-multiple-container';
const ELEMENT_CAROUSEL_SLIDER_BUTTON = 'carousel-multiple-button';
const ELEMENT_CAROUSEL_INDICATOR_WRAPPER =
  'carousel-multiple-indicator-wrapper';

const OVERWRITE_LAYOUT_IMAGE = `.${ELEMENT_CAROUSEL_MULTIPLE_DECLARATION} .${LayoutImage.Elements.container}`;

const OVERWRITE_ANIMATION_CAROUSEL_BUTTON = `.${ELEMENT_CAROUSEL_MULTIPLE_DECLARATION} .${AnimationCarouselBlocks.Elements.button}`;

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
  }

  ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON}:last-of-type {
    left: 0;
  }

  ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON}:first-of-type {
    right: 0;
  }
`;

// prettier-ignore
const IndicatorContainerStyles = `
  .${ELEMENT_CAROUSEL_INDICATOR_WRAPPER} {
    padding: ${Spacing.md};
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
const STYLES_CAROUSEL_IMAGE_MULTIPLE_ELEMENT = `
  .${ELEMENT_CAROUSEL_MULTIPLE_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_CAROUSEL_MULTIPLE_CONTAINER} {
    overflow: hidden;
  }

  ${LayoutImage.Styles}
  ${AnimationIndicator.Styles}
  ${AnimationCarouselBlocks.Styles}
  ${IndicatorContainerStyles}
  ${OverwriteImageStyles}
  ${OverwriteCarouselStyles}
  ${OverwriteThemeDark}
`;

const CreateCarouselImageMultipleElement = (props: TypeCarouselMultipleProps) =>
  (() => {
    const { images, theme } = props;
    const elementDeclaration = document.createElement('div');
    const elementContainer = document.createElement('div');
    const elementIndicator = document.createElement('div');
    const clonedImages = images.map((image) =>
      image.cloneNode(true),
    ) as HTMLImageElement[];

    const slide = document.createElement('div');
    const blocks = clonedImages.map((image) =>
      LayoutImage.CreateElement({
        image,
        showCaption: true,
      }),
    );

    const carousel = AnimationCarouselBlocks.CreateElement({
      blocks,
      slide,
      showHint: false,
      overwriteDisplayLogic: {
        mobileBreakpoint: 500,
        tabletBreakpoint: 700,
        desktopCount: 3,
        desktopBreakpoint: 1000,
        maxCount: 4,
      },
    });

    const indicator = AnimationIndicator.CreateElement({
      count: images.length || 0,
      callback: () => {},
      theme: theme || 'light',
    });

    elementIndicator.classList.add(ELEMENT_CAROUSEL_INDICATOR_WRAPPER);
    elementIndicator.appendChild(indicator.element);

    elementContainer.appendChild(carousel.element);
    elementContainer.appendChild(elementIndicator);
    elementContainer.classList.add(ELEMENT_CAROUSEL_MULTIPLE_CONTAINER);
    if (theme) elementContainer.setAttribute(ATTRIBUTE_THEME, theme);

    elementDeclaration.classList.add(ELEMENT_CAROUSEL_MULTIPLE_DECLARATION);
    elementDeclaration.appendChild(elementContainer);

    images[images.length - 1].addEventListener('load', carousel.events.load);

    return {
      element: elementDeclaration,
      events: {
        SetEventReize: carousel.events.resize,
      },
    };
  })();

export default {
  CreateElement: CreateCarouselImageMultipleElement,
  Styles: STYLES_CAROUSEL_IMAGE_MULTIPLE_ELEMENT,
};