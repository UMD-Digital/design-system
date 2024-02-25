import { Reset } from 'helpers/styles';
import { ELEMENT_TYPE } from 'components/footer';
import { ELEMENTS } from 'components/footer/globals';
import { CreateMain, MainContainerStyles } from './main-section';
import { CreateUtility, UtilityContainerStyles } from './utility-section';

const { ELEMENT_WRAPPER } = ELEMENTS;

export const ComponentStyles = `
  :host {
    display: none;
    position: relative !important;
  }

  ${Reset}

  .${ELEMENT_WRAPPER} {
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
