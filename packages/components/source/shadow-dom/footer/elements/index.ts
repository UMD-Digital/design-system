import { Styles } from 'utilities';
import { CreateMain, MainContainerStyles } from './main-section';
import { CreateUtility, UtilityContainerStyles } from './utility-section';
import { ELEMENTS, VARIABLES } from '../globals';
import { UMDFooterElement } from '../index';

const { ELEMENT_WRAPPER } = ELEMENTS;
const { ELEMENT_NAME, ATTRIBUTE_THEME, ATTRIBUTE_TYPE } = VARIABLES;

export const ComponentStyles = `
  :host {
    display: none;
    position: relative !important;
  }

  ${Styles.ResetString}

  .${ELEMENT_WRAPPER} {
    container: ${ELEMENT_NAME} / inline-size;
  }
  ${MainContainerStyles}
  ${UtilityContainerStyles}
`;

export const CreateElement = ({ element }: { element: UMDFooterElement }) => {
  const wrapper = document.createElement('div');
  wrapper.classList.add(ELEMENT_WRAPPER);

  wrapper.setAttribute(ATTRIBUTE_THEME, element._theme);
  wrapper.setAttribute(ATTRIBUTE_TYPE, element._type);
  wrapper.appendChild(
    CreateMain({
      element,
    }),
  );
  wrapper.appendChild(CreateUtility({ element }));

  return wrapper;
};
