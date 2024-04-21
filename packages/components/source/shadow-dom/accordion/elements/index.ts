import { Styles } from 'utilities';
import { CreateBody, bodyStyles } from './body';
import { CreateHeadline, headlineStyles } from './headline';
import { ELEMENT_TYPE } from '../index';
import { ELEMENT_NAME, ELEMENTS, VARIABLES } from '../globals';

const { CONTAINER_NAME } = ELEMENTS;
const { ATTRIBUTE_THEME } = VARIABLES;

export default `
  :host {
    display: block;
  }
  
  .${CONTAINER_NAME} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  ${Styles.ResetString}
  ${headlineStyles}
  ${bodyStyles}
`;

export const CreateShadowDom = ({ element }: { element: ELEMENT_TYPE }) => {
  const container = document.createElement('div');
  const headline = CreateHeadline({ element });
  const body = CreateBody({ element });

  container.classList.add(CONTAINER_NAME);

  container.setAttribute(ATTRIBUTE_THEME, element._theme);

  if (headline && body) {
    container.appendChild(headline);
    container.appendChild(body);
  }

  return container;
};
