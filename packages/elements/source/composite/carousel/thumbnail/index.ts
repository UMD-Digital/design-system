import * as token from '@universityofmaryland/web-token-library';
import * as carouselElements from '../elements';

type TypeCarouselThumbnailProps = {
  blocks: HTMLElement[];
  isThemeDark?: boolean;
};

const ATTRIBUTE_THEME = 'data-theme';
const THEME_DARK = 'dark';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const ELEMENT_NAME = 'umd-carousel-thumbnail';
const ELEMENT_THUMBNAIL_DECLARATION = 'carousel-thumbnail-declaration';
const ELEMENT_THUMBNAIL_CONTAINER = 'carousel-thumbnail-container';
const ELEMENT_PERSON_SLIDE = 'carousel-person-slide';
const ELEMENT_CAROUSEL_THUMBNAIL_BUTTON = 'carousel-thumbnail-button';

const OVERWRITE_ANIMATION_CAROUSEL_BUTTON = `.${ELEMENT_THUMBNAIL_DECLARATION} .${carouselElements.blocks.Elements.button}`;

const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_THUMBNAIL_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_THEME_DARK_BUTTON = `.${ELEMENT_THUMBNAIL_CONTAINER}${IS_THEME_DARK} .${ELEMENT_CAROUSEL_THUMBNAIL_BUTTON}`;
const OVERWRITE_THEME_DARK_SLIDE = `.${ELEMENT_THUMBNAIL_CONTAINER}${IS_THEME_DARK} .${ELEMENT_PERSON_SLIDE}`;

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

  ${OVERWRITE_THEME_DARK_SLIDE} {
    border: 1px solid ${token.color.gray.dark};
    border-left: none;
  }

  ${OVERWRITE_THEME_DARK_SLIDE}:first-child {
    border-left: 1px solid ${token.color.gray.dark};
  }
`;

// prettier-ignore
const OverwriteCarouselStyles = `
  ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON} {
    top: 50%;
    transform: translateY(-50%);
  }

  ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON}:last-of-type {
    left: -${token.spacing.md};
  }

  ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON}:first-of-type {
    right: -${token.spacing.md};
  }
`;

// prettier-ignore
const PersonSlideStyles = `
  .${ELEMENT_PERSON_SLIDE} {
    border: 1px solid ${token.color.gray.light};
    border-left: none;
    padding: ${token.spacing.lg};
  }

  .${ELEMENT_THUMBNAIL_CONTAINER} .${ELEMENT_PERSON_SLIDE}:first-child {
    border-left: 1px solid ${token.color.gray.light};
  }
`;

// prettier-ignore
const STYLES_CAROUSEL_THUMBNAIL_ELEMENT = `
  .${ELEMENT_THUMBNAIL_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_THUMBNAIL_CONTAINER} {
    overflow: hidden;
    padding: 0 ${token.spacing.md};
  }

  ${carouselElements.blocks.Styles}
  ${PersonSlideStyles}
  ${OverwriteCarouselStyles}
  ${OverwriteThemeDark}
`;

const CreatePerson = ({ block }: { block: HTMLElement }) => {
  const container = document.createElement('div');

  container.appendChild(block);
  container.classList.add(ELEMENT_PERSON_SLIDE);

  return container;
};

export default (props: TypeCarouselThumbnailProps) =>
  (() => {
    const { blocks, isThemeDark } = props;
    const elementDeclaration = document.createElement('div');
    const elementContainer = document.createElement('div');
    const slide = document.createElement('div');
    const blocksWrapper = blocks.map((block) =>
      CreatePerson({
        block,
      }),
    );

    const carousel = carouselElements.blocks.CreateElement({
      blocks: blocksWrapper,
      slide,
      overwriteDisplayLogic: {
        mobileBreakpoint: 500,
        tabletBreakpoint: 900,
        desktopBreakpoint: 1200,
        desktopCount: 3,
        maxCount: 4,
        blockGap: 0,
        showHint: false,
        showMobileHint: false,
      },
    });

    elementContainer.appendChild(carousel.element);
    elementContainer.classList.add(ELEMENT_THUMBNAIL_CONTAINER);
    if (isThemeDark) elementContainer.setAttribute(ATTRIBUTE_THEME, THEME_DARK);

    elementDeclaration.classList.add(ELEMENT_THUMBNAIL_DECLARATION);
    elementDeclaration.appendChild(elementContainer);

    return {
      element: elementDeclaration,
      styles: STYLES_CAROUSEL_THUMBNAIL_ELEMENT,
      events: {
        reize: carousel.events.resize,
        load: carousel.events.load,
      },
    };
  })();
