import { Reset } from 'helpers/styles';
import { CreateBody, bodyStyles } from './body';
import { CreateHeadline, headlineStyles } from './headline';
import { ELEMENT_TYPE } from '../component';
import { ELEMENT_NAME, ELEMENTS } from '../globals';

export default `
  :host {
    display: block;
  }
  .${ELEMENTS.CONTAINER_NAME} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  ${Reset}
  ${headlineStyles}
  ${bodyStyles}
`;

export const CreateShadowDom = ({ element }: { element: ELEMENT_TYPE }) => {
  const container = document.createElement('div');
  const headline = CreateHeadline({ element });
  const body = CreateBody({ element });

  container.classList.add(ELEMENTS.CONTAINER_NAME);

  if (headline && body) {
    container.appendChild(headline);
    container.appendChild(body);
  }

  return container;
};
