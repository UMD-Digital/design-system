import { Reset } from 'helpers/styles';
import { CreateBody, bodyStyles } from './body';
import { CreateHeadline, headlineStyles } from './headline';
import { ELEMENT_TYPE } from '../index';
import { ELEMENT_NAME, ELEMENTS, VARIABLES } from '../globals';

const { CONTAINER_NAME } = ELEMENTS;
const { ATTRIBUTE_THEME, ATTRIBUTE_OPEN } = VARIABLES;

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

  container.setAttribute(ATTRIBUTE_THEME, element._theme);
  if (element._open) container.setAttribute(ATTRIBUTE_OPEN, '');

  if (headline && body) {
    container.appendChild(headline);
    container.appendChild(body);
  }

  return container;
};
