import { Tokens } from '@universityofmaryland/variables';
import { AnimationCarouselBlocks } from 'macros';

type TypeCarouselPeopleProps = {
  people: HTMLElement[];
  theme?: string | null;
};

const { Colors, Spacing } = Tokens;

const ATTRIBUTE_THEME = 'data-theme';
const THEME_DARK = 'dark';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const ELEMENT_NAME = 'umd-carousel-people';
const ELEMENT_PEOPLE_DECLARATION = 'carousel-people-declaration';
const ELEMENT_PEOPLE_CONTAINER = 'carousel-people-container';
const ELEMENT_PERSON_SLIDE = 'carousel-person-slide';
const ELEMENT_CAROUSEL_PEOPLE_BUTTON = 'carousel-people-button';

const OVERWRITE_ANIMATION_CAROUSEL_BUTTON = `.${ELEMENT_PEOPLE_DECLARATION} .${AnimationCarouselBlocks.Elements.button}`;

const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_PEOPLE_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_THEME_DARK_BUTTON = `.${ELEMENT_PEOPLE_CONTAINER}${IS_THEME_DARK} .${ELEMENT_CAROUSEL_PEOPLE_BUTTON}`;
const OVERWRITE_THEME_DARK_SLIDE = `.${ELEMENT_PEOPLE_CONTAINER}${IS_THEME_DARK} .${ELEMENT_PERSON_SLIDE}`;

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

  ${OVERWRITE_THEME_DARK_SLIDE} {
    border: 1px solid ${Colors.gray.dark};
    border-left: none;
  }

  ${OVERWRITE_THEME_DARK_SLIDE}:first-child {
    border-left: 1px solid ${Colors.gray.dark};
  }
`;

// prettier-ignore
const OverwriteCarouselStyles = `
  ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON} {
    top: 50%;
    transform: translateY(-50%);
  }

  ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON}:last-of-type {
    left: -${Spacing.md};
  }

  ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON}:first-of-type {
    right: -${Spacing.md};
  }
`;

// prettier-ignore
const PersonSlideStyles = `
  .${ELEMENT_PERSON_SLIDE} {
    border: 1px solid ${Colors.gray.light};
    border-left: none;
    padding: ${Spacing.md};
  }

  .${ELEMENT_PEOPLE_CONTAINER} .${ELEMENT_PERSON_SLIDE}:first-child {
    border-left: 1px solid ${Colors.gray.light};
  }
`;

// prettier-ignore
const STYLES_CAROUSEL_PEOPLE_ELEMENT = `
  .${ELEMENT_PEOPLE_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_PEOPLE_CONTAINER} {
    overflow: hidden;
    padding: 0 ${Spacing.md};
  }

  ${AnimationCarouselBlocks.Styles}
  ${PersonSlideStyles}
  ${OverwriteCarouselStyles}
  ${OverwriteThemeDark}
`;

const CreatePerson = ({ person }: { person: HTMLElement }) => {
  const container = document.createElement('div');

  container.appendChild(person);
  container.classList.add(ELEMENT_PERSON_SLIDE);

  return container;
};

const CreateCarouselPeopleElement = (props: TypeCarouselPeopleProps) =>
  (() => {
    const { people, theme } = props;
    const elementDeclaration = document.createElement('div');
    const elementContainer = document.createElement('div');
    const slide = document.createElement('div');
    const blocks = people.map((person) =>
      CreatePerson({
        person,
      }),
    );

    const carousel = AnimationCarouselBlocks.CreateElement({
      blocks,
      slide,
      overwriteDisplayLogic: {
        mobileBreakpoint: 500,
        tabletBreakpoint: 900,
        desktopBreakpoint: 1200,
        desktopCount: 3,
        maxCount: 4,
        blockGap: 0,
        minBlockHeightTablet: 320,
        minBlockHeightMobile: 240,
        showHint: false,
        showMobileHint: false,
      },
    });

    elementContainer.appendChild(carousel.element);
    elementContainer.classList.add(ELEMENT_PEOPLE_CONTAINER);
    if (theme) elementContainer.setAttribute(ATTRIBUTE_THEME, theme);

    elementDeclaration.classList.add(ELEMENT_PEOPLE_DECLARATION);
    elementDeclaration.appendChild(elementContainer);

    return {
      element: elementDeclaration,
      events: {
        SetEventReize: carousel.events.resize,
        Load: carousel.events.load,
      },
    };
  })();

export default {
  CreateElement: CreateCarouselPeopleElement,
  Styles: STYLES_CAROUSEL_PEOPLE_ELEMENT,
};
