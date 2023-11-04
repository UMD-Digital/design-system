import { CreateMain, MainContainerStyles } from './main-section';
import { CreateUtility, UtilityContainerStyles } from './utility-section';
import { ELEMENT_TYPE, ELEMENT_WRAPPER } from '../variables';

export const ComponentStyles = `
  :host {
    display: none;
    position: relative !important;
    text-wrap: pretty;
    container: umd-footer / inline-size;
  }

  ${MainContainerStyles}
  ${UtilityContainerStyles}
`;

export const CreateElement = ({ element }: { element: ELEMENT_TYPE }) => {
  const wrapper = document.createElement('div');
  wrapper.classList.add(ELEMENT_WRAPPER);

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
