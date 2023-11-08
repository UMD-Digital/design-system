import { fontFamily } from '@universityofmaryland/umd-web-configuration/dist/tokens/fonts.js';
import { ElementType } from '../component';
import { CreatePrimaryLink, PrimaryStyles } from './primary';
import { ELEMENTS } from '../globals';

export const ComponentStyles = `
  :host {
    display: block !important;
    container: umd-nav-item / inline-size; 
  }

  ::slotted(a) {
    font-family: ${fontFamily.sans};
    font-size: 14px;
    font-weight: 800;
  }

  .${ELEMENTS.CONTAINER} {
    position: relative;
  }

  .${ELEMENTS.CONTAINER}[data-showing] .${ELEMENTS.DROPDOWN_CONTAINER} {
    display: block;
  }

  ${PrimaryStyles}
`;

export const CreateShadowDom = ({ element }: { element: ElementType }) => {
  const container = document.createElement('div');
  const primaryLink = CreatePrimaryLink({ element });

  container.appendChild(primaryLink);
  container.classList.add(ELEMENTS.CONTAINER);

  return container;
};
