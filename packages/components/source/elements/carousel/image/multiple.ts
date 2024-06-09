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

const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_CAROUSEL_MULTIPLE_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_THEME_DARK_INDICATOR = `.${ELEMENT_CAROUSEL_MULTIPLE_CONTAINER}${IS_THEME_DARK} .${ELEMENT_CAROUSEL_INDICATOR_WRAPPER}`;
const OVERWRITE_THEME_DARK_BUTTON = `.${ELEMENT_CAROUSEL_MULTIPLE_CONTAINER}${IS_THEME_DARK} .${ELEMENT_CAROUSEL_SLIDER_BUTTON}`;

// prettier-ignore
const OverwriteThemeDark = `
  ${OVERWRITE_THEME_DARK_CONTAINER},
  ${OVERWRITE_THEME_DARK_INDICATOR} {
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
const STYLES_CAROUSEL_IMAGE_STANDARD_ELEMENT = `
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
  ${OverwriteThemeDark}
`;

const CreateCarouselImageStandardElement = (props: TypeCarouselMultipleProps) =>
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
  CreateElement: CreateCarouselImageStandardElement,
  Styles: STYLES_CAROUSEL_IMAGE_STANDARD_ELEMENT,
};
