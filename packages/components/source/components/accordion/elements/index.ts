import { Reset } from 'helpers/styles';
import { CreateBody, bodyStyles } from './body';
import { CreateHeadline, headlineStyles } from './headline';
import { ELEMENT_TYPE } from '../index';
import { ELEMENT_NAME, ELEMENTS } from '../globals';

const { CONTAINER_NAME } = ELEMENTS;

export default `
  :host {
    display: block;
  }
  .${CONTAINER_NAME} {
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

  container.classList.add(CONTAINER_NAME);

  if (headline && body) {
    container.appendChild(headline);
    container.appendChild(body);
  }

  return container;
};
