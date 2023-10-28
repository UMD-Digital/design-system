import { CreateMain, MainContainerStyles } from './main';
import { CreateUtility, UtilityContainerStyles } from './utility';
import { ELEMENT_WRAPPER } from '../variables';

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

export const CreateElement = ({
  element,
  type,
  theme,
}: {
  element: HTMLElement;
  type: string;
  theme: string;
}) => {
  const wrapper = document.createElement('div');
  wrapper.classList.add(ELEMENT_WRAPPER);

  wrapper.setAttribute('theme', theme);
  wrapper.setAttribute('type', type);
  wrapper.appendChild(
    CreateMain({
      element,
      type,
      theme,
    }),
  );
  wrapper.appendChild(CreateUtility({ element }));

  return wrapper;
};
