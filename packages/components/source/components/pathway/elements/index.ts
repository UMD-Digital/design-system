import { Layout, Tokens } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles, Reset } from 'helpers/styles';
import { CreateSummaryColumn, STYLES_PATHWAY_SUMMARY_COLUMN } from './summary';
import { CreateImageColumn, STYLES_PATHWAY_IMAGE_COLUMN } from './image';
import {
  CreateHighlightColumn,
  STYLES_PATHWAY_HIGHLIGHT_COLUMN,
} from './highlight';
import { ELEMENTS, BREAKPOINTS, VARIABLES, REFERENCES } from '../globals';
import { UMDPathwayElement } from '../index';

const { Colors, Spacing } = Tokens;
const { Lock } = Layout;

const { MEDIUM, LARGE } = BREAKPOINTS;
const { PATHWAY_CONTAINER } = ELEMENTS;
const {
  ELEMENT_NAME,
  ATTRIBUTE_IMAGE_POSITION,
  ATTRIBUTE_IMAGE_SCALED,
  ATTRIBUTE_HIGHLIGHT,
  ATTRIBUTE_THEME,
  ATTRIBUTE_HERO,
} = VARIABLES;
const {
  IS_WITH_IMAGE,
  IS_WITH_HERO,
  IS_WITH_IMAGE_LEFT,
  IS_WITH_IMAGE_RIGHT,
  IS_THEME_DARK,
  IS_THEME_LIGHT,
  IS_THEME_MARYLAND,
  IS_THEME_WHITE,
} = REFERENCES;

const PATHWAY_CONTAINER_WRAPPER = 'umd-pathway-container-wrapper';
const PATHWAY_CONTAINER_LOCK = 'umd-pathway-container-lock';
const PATHWAY_CONTAINER_LOCK_WRAPPER = 'umd-pathway-container-lock-wrapper';
const PATHWAY_CONTAINER_BACKGROUND = 'umd-pathway-container-background';

// prettier-ignore
const VarationThemeDark = `
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_CONTAINER}${IS_THEME_DARK} * {
      color: ${Colors.white};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_CONTAINER}${IS_THEME_DARK} .${PATHWAY_CONTAINER_BACKGROUND} {
      background-color: ${Colors.black};
    }
  }
`

// prettier-ignore
const VarationThemeLight = `
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_CONTAINER}${IS_THEME_LIGHT} * {
      color: ${Colors.black};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_CONTAINER}${IS_THEME_LIGHT} .${PATHWAY_CONTAINER_BACKGROUND} {
      background-color: ${Colors.gray.lightest};
    }
  }
`

// prettier-ignore
const VarationThemeMaryland = `
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_CONTAINER}${IS_THEME_MARYLAND} * {
      color: ${Colors.white};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_CONTAINER}${IS_THEME_MARYLAND} .${PATHWAY_CONTAINER_BACKGROUND} {
      background-color: ${Colors.red};
    }
  }
`

// prettier-ignore
const VarationThemeWhite = `
  .${PATHWAY_CONTAINER}${IS_THEME_WHITE} * {
    color: ${Colors.black};
  }
`

// prettier-ignore
const ImageVariation = `
  .${PATHWAY_CONTAINER}${IS_WITH_IMAGE} .${PATHWAY_CONTAINER_LOCK_WRAPPER} {
    align-items: initial;
  }

  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    .${PATHWAY_CONTAINER}${IS_WITH_IMAGE} .${PATHWAY_CONTAINER_LOCK_WRAPPER} {
      padding: 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_CONTAINER}${IS_WITH_IMAGE} .${PATHWAY_CONTAINER_LOCK_WRAPPER} > * {
      width: 100%;
    }
  }
`

const BackgroundStyles = `
  .${PATHWAY_CONTAINER_BACKGROUND} {
    position: absolute;
    top: 0;
    bottom: 0;
    right: -1000px;
    width: calc(100% + 1000px) !important;
    background-color: ${Colors.white};
  }

  .${PATHWAY_CONTAINER}${IS_WITH_IMAGE_RIGHT} .${PATHWAY_CONTAINER_BACKGROUND} {
    left: -1000px;
  }

  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    .${PATHWAY_CONTAINER_BACKGROUND} { 
      display: none;
    }
  }
`;

const LockWrapperStyles = `
  .${PATHWAY_CONTAINER_LOCK_WRAPPER} {
    position: relative;
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_CONTAINER_LOCK_WRAPPER} {
      display: flex;
      align-items: center;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_CONTAINER_LOCK_WRAPPER} > * {
      width: 50%;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_CONTAINER}${IS_WITH_HERO} .${PATHWAY_CONTAINER_LOCK_WRAPPER} {
      min-height: 832px;
    }
  }
`;

const LockStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${PATHWAY_CONTAINER_LOCK}`]: Lock['.base'],
    },
  })}
`;

// prettier-ignore
const STYLES_CONTAINER = `
  .${PATHWAY_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    position: relative;
    overflow: hidden;
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_CONTAINER}${IS_WITH_HERO}${IS_WITH_IMAGE_LEFT} .${PATHWAY_CONTAINER_WRAPPER} {
      padding-left: 50%;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_CONTAINER}${IS_WITH_HERO}${IS_WITH_IMAGE_RIGHT} .${PATHWAY_CONTAINER_WRAPPER} {
      padding-right: 50%;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${PATHWAY_CONTAINER}${IS_THEME_LIGHT} .${PATHWAY_CONTAINER_LOCK_WRAPPER},
    .${PATHWAY_CONTAINER}${IS_THEME_DARK} .${PATHWAY_CONTAINER_LOCK_WRAPPER},
    .${PATHWAY_CONTAINER}${IS_THEME_MARYLAND} .${PATHWAY_CONTAINER_LOCK_WRAPPER} {
      padding: ${Spacing['6xl']} 0;
    }
  }


  ${LockStyles}
  ${LockWrapperStyles}
  ${BackgroundStyles}
  ${ImageVariation}
  ${VarationThemeDark}
  ${VarationThemeLight}
  ${VarationThemeMaryland}
  ${VarationThemeWhite}
`;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${STYLES_CONTAINER}
  ${STYLES_PATHWAY_SUMMARY_COLUMN}
  ${STYLES_PATHWAY_HIGHLIGHT_COLUMN}
  ${STYLES_PATHWAY_IMAGE_COLUMN}
`;

export const CreateShadowDom = ({
  element,
}: {
  element: UMDPathwayElement;
}) => {
  const theme = element._theme;
  const imagePosition = element._isImageFirst ? 'left' : 'right';
  const isTypeHero = element._isHeroType;
  const isImageDefaultSize = !element._isImageScaled;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const lock = document.createElement('div');
  const lockWrapper = document.createElement('div');
  const background = document.createElement('div');
  const summaryColumn = CreateSummaryColumn({ element });
  const imageColumn = CreateImageColumn({ element });
  const highlightColumn = CreateHighlightColumn({ element });

  container.classList.add(PATHWAY_CONTAINER);
  container.setAttribute(ATTRIBUTE_THEME, theme);

  wrapper.classList.add(PATHWAY_CONTAINER_WRAPPER);

  lock.classList.add(PATHWAY_CONTAINER_LOCK);

  lockWrapper.classList.add(PATHWAY_CONTAINER_LOCK_WRAPPER);
  background.classList.add(PATHWAY_CONTAINER_BACKGROUND);

  lockWrapper.appendChild(background);

  if (isTypeHero && !imageColumn) {
    console.error('Hero type requires an image.');
    return null;
  }

  if (isTypeHero && imageColumn) {
    if (isImageDefaultSize) {
      console.error('Hero type requires an image to the scaled');
    }

    lockWrapper.appendChild(summaryColumn);
    lock.appendChild(lockWrapper);

    wrapper.appendChild(imageColumn);
    wrapper.appendChild(lock);

    container.setAttribute(ATTRIBUTE_IMAGE_POSITION, imagePosition);
    container.setAttribute(ATTRIBUTE_HERO, '');
    container.appendChild(wrapper);
    return container;
  }

  if (!imageColumn && highlightColumn) {
    lockWrapper.appendChild(summaryColumn);
    lockWrapper.appendChild(highlightColumn);
    container.setAttribute(`${ATTRIBUTE_HIGHLIGHT}`, '');

    lock.appendChild(lockWrapper);
    wrapper.appendChild(lock);
    container.appendChild(wrapper);
    return container;
  }

  if (imageColumn) {
    lockWrapper.appendChild(imageColumn);
    lockWrapper.appendChild(summaryColumn);
    container.setAttribute(ATTRIBUTE_IMAGE_POSITION, imagePosition);

    if (isImageDefaultSize)
      container.setAttribute(ATTRIBUTE_IMAGE_SCALED, 'false');

    lock.appendChild(lockWrapper);
    wrapper.appendChild(lock);
    container.appendChild(wrapper);
    return container;
  }

  return null;
};
