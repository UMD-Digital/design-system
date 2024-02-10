import { Reset } from 'helpers/styles';
import { CreateSummaryColumn, STYLES_PATHWAY_SUMMARY_COLUMN } from './summary';
import { ELEMENT_TYPE } from '../component';

const PATHWAY_CONTAINER = 'umd-pathway-container';

const STYLES_CONTAINER = `
  .${PATHWAY_CONTAINER} {
    container: umd-pathway / inline-size;
  }
`;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${STYLES_CONTAINER}
  ${STYLES_PATHWAY_SUMMARY_COLUMN}
`;

export const CreateShadowDom = ({ element }: { element: ELEMENT_TYPE }) => {
  const container = document.createElement('div');
  const summaryColumn = CreateSummaryColumn({ element });

  container.classList.add(PATHWAY_CONTAINER);

  container.appendChild(summaryColumn);
  return container;
};
