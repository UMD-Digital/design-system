import { Layout } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles, Reset } from 'helpers/styles';
import { CreateSummaryColumn, STYLES_PATHWAY_SUMMARY_COLUMN } from './summary';
import { CreateImageColumn, STYLES_PATHWAY_IMAGE_COLUMN } from './image';
import {
  CreateHighlightColumn,
  STYLES_PATHWAY_HIGHLIGHT_COLUMN,
} from './highlight';
import { ELEMENTS, BREAKPOINTS, VARIABLES, NAMING } from '../globals';
import { UMDPathwayElement } from '../index';

const { Lock } = Layout;

const { medium } = BREAKPOINTS;
const { PATHWAY_CONTAINER } = ELEMENTS;
const {
  ELEMENT_NAME,
  ATTRIBUTE_IMAGE,
  ATTRIBUTE_IMAGE_POSITION,
  ATTRIBUTE_IMAGE_SCALED,
  ATTRIBUTE_HIGHLIGHT,
  ATTRIBUTE_THEME,
  ATTRIBUTE_HERO,
} = VARIABLES;
const { IS_WITH_IMAGE, IS_WITH_HERO, IS_WITH_IMAGE_LEFT, IS_WITH_IMAGE_RIGHT } =
  NAMING;

const PATHWAY_CONTAINER_WRAPPER = 'umd-pathway-container-wrapper';
const PATHWAY_CONTAINER_LOCK = 'umd-pathway-container-lock';

// prettier-ignore
const ImageVariation = `
  .${PATHWAY_CONTAINER}${IS_WITH_IMAGE} .${PATHWAY_CONTAINER_LOCK} {
    align-items: initial;
  }

  @container ${ELEMENT_NAME} (max-width: ${medium - 1}px) {
    .${PATHWAY_CONTAINER}${IS_WITH_IMAGE} .${PATHWAY_CONTAINER_LOCK} {
      padding: 0;
    }
  }
`

const LockStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${PATHWAY_CONTAINER_LOCK}`]: Lock['.base'],
    },
  })}
  
  @container ${ELEMENT_NAME} (min-width: ${medium}px) {
    .${PATHWAY_CONTAINER_LOCK} {
      display: flex;
      align-items: center;
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${medium}px) {
    .${PATHWAY_CONTAINER_LOCK}:has(> :nth-of-type(2)) > * {
      width: 50%;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${medium}px) {
    .${PATHWAY_CONTAINER}${IS_WITH_HERO} .${PATHWAY_CONTAINER_LOCK} {
      min-height: 832px;
    }
  }
`;

// prettier-ignore
const STYLES_CONTAINER = `
  .${PATHWAY_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    position: relative;
  }

  @container ${ELEMENT_NAME} (min-width: ${medium}px) {
    .${PATHWAY_CONTAINER}${IS_WITH_HERO}${IS_WITH_IMAGE_LEFT} .${PATHWAY_CONTAINER_WRAPPER} {
      padding-left: 50%;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${medium}px) {
    .${PATHWAY_CONTAINER}${IS_WITH_HERO}${IS_WITH_IMAGE_RIGHT} .${PATHWAY_CONTAINER_WRAPPER} {
      padding-right: 50%;
    }
  }

  ${LockStyles}
  ${ImageVariation}
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
  const imagePosition = element._isImageFirst ? 'left' : 'right';
  const isTypeHero = element._isHeroType;
  const isImageDefaultSize = !element._isImageScaled;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const lock = document.createElement('div');
  const summaryColumn = CreateSummaryColumn({ element });
  const imageColumn = CreateImageColumn({ element });
  const highlightColumn = CreateHighlightColumn({ element });

  container.classList.add(PATHWAY_CONTAINER);
  wrapper.classList.add(PATHWAY_CONTAINER_WRAPPER);
  lock.classList.add(PATHWAY_CONTAINER_LOCK);

  if (isTypeHero && !imageColumn) {
    console.error('Hero type requires an image.');
    return null;
  }

  if (isTypeHero && imageColumn) {
    if (isImageDefaultSize) {
      console.error('Hero type requires an image to the scaled');
    }

    lock.appendChild(summaryColumn);

    wrapper.appendChild(imageColumn);
    wrapper.appendChild(lock);

    container.setAttribute(ATTRIBUTE_IMAGE_POSITION, imagePosition);
    container.setAttribute(ATTRIBUTE_HERO, '');
    container.appendChild(wrapper);
    return container;
  }

  if (!imageColumn && highlightColumn) {
    lock.appendChild(summaryColumn);
    lock.appendChild(highlightColumn);
    container.setAttribute(`${ATTRIBUTE_HIGHLIGHT}`, '');

    if (element._isThemeDark) container.setAttribute(ATTRIBUTE_THEME, '');

    wrapper.appendChild(lock);
    container.appendChild(wrapper);
    return container;
  }

  if (imageColumn) {
    lock.appendChild(imageColumn);
    lock.appendChild(summaryColumn);
    container.setAttribute(`${ATTRIBUTE_IMAGE}`, '');
    container.setAttribute(ATTRIBUTE_IMAGE_POSITION, imagePosition);

    if (isImageDefaultSize)
      container.setAttribute(ATTRIBUTE_IMAGE_SCALED, 'false');

    wrapper.appendChild(lock);
    container.appendChild(wrapper);
    return container;
  }

  return null;
};
