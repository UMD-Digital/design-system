import { ELEMENT_TYPE } from '../component';
import { ELEMENTS } from '../globals';
import { CreateMain, MainContainerStyles } from './main-section';
import { CreateUtility, UtilityContainerStyles } from './utility-section';

export const ComponentStyles = `
  :host {
    display: none;
    position: relative !important;
    container: umd-footer / inline-size;
  }

  :host * {
    box-sizing: border-box;
    text-wrap: pretty;
  }

  :host a {
    text-decoration: none;
  }

  ${MainContainerStyles}
  ${UtilityContainerStyles}
`;

export const CreateElement = ({ element }: { element: ELEMENT_TYPE }) => {
  const wrapper = document.createElement('div');
  wrapper.classList.add(ELEMENTS.ELEMENT_WRAPPER);

  wrapper.setAttribute('theme', element._theme);
  wrapper.setAttribute('type', element._type);
  wrapper.appendChild(
    CreateMain({
      element,
    }),
  );
  wrapper.appendChild(CreateUtility({ element }));

  return wrapper;
};
