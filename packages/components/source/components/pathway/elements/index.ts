import { Reset } from 'helpers/styles';
import { CreateSummaryColumn, STYLES_PATHWAY_SUMMARY_COLUMN } from './summary';
import { CreateImageColumn, STYLES_PATHWAY_IMAGE_COLUMN } from './image';
import {
  CreateHighlightColumn,
  STYLES_PATHWAY_HIGHLIGHT_COLUMN,
} from './highlight';
import { ELEMENTS, BREAKPOINTS, VARIABLES } from '../globals';
import { ELEMENT_TYPE } from '../component';

const PATHWAY_CONTAINER_WRAPPER = 'umd-pathway-container-wrapper';

// prettier-ignore
const ImageVariation = `
  .${ELEMENTS.PATHWAY_CONTAINER}[${VARIABLES.ATTRIBUTE_IMAGE}] .${PATHWAY_CONTAINER_WRAPPER}{
    align-items: initial;
  }
`

// prettier-ignore
const STYLES_CONTAINER = `
  .${ELEMENTS.PATHWAY_CONTAINER} {
    container: umd-pathway / inline-size;
  }

  .${PATHWAY_CONTAINER_WRAPPER} {
    
  }

  @container umd-pathway (min-width: ${BREAKPOINTS.medium}px) {
    .${PATHWAY_CONTAINER_WRAPPER} {
      display: flex;
      align-items: center;
    }
  }

  @container umd-pathway (min-width: ${BREAKPOINTS.medium}px) {
    .${PATHWAY_CONTAINER_WRAPPER} > * {
      width: 50%;
    }
  }

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

export const CreateShadowDom = ({ element }: { element: ELEMENT_TYPE }) => {
  const imagePosition = element._isImageFirst ? 'left' : 'right';
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const summaryColumn = CreateSummaryColumn({ element });
  const imageColumn = CreateImageColumn({ element });
  const highlightColumn = CreateHighlightColumn({ element });

  if (imageColumn) {
    wrapper.appendChild(imageColumn);
    container.setAttribute(`${VARIABLES.ATTRIBUTE_IMAGE}`, '');
    container.setAttribute(VARIABLES.ATTRIBUTE_IMAGE_POSITION, imagePosition);
    if (!element._isImageScaled) {
      container.setAttribute(VARIABLES.ATTRIBUTE_IMAGE_SCALED, 'false');
    }
  }

  wrapper.classList.add(PATHWAY_CONTAINER_WRAPPER);
  wrapper.appendChild(summaryColumn);

  if (!imageColumn && highlightColumn) {
    wrapper.appendChild(highlightColumn);
    container.setAttribute(`${VARIABLES.ATTRIBUTE_HIGHLIGHT}`, '');
  }

  container.classList.add(ELEMENTS.PATHWAY_CONTAINER);
  container.appendChild(wrapper);
  return container;
};
