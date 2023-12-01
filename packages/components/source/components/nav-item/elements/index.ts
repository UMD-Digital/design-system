import {
  colors,
  fontFamily,
} from '@universityofmaryland/umd-web-configuration';
import { ElementType } from '../component';
import { CreatePrimaryLink, PrimaryStyles } from './primary';
import { ELEMENTS, VARIABLES } from '../globals';

export const ComponentStyles = `
  :host {
    display: block;
    container: umd-nav-item / inline-size; 
  }

  :host * {
    box-sizing: border-box;
  }

  :host button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }

  :host a,
  ::slotted(a) {
    font-family: ${fontFamily.sans};
    font-size: 14px;
    font-weight: 800;
    color: ${colors.black};
    text-decoration: none;
  }

  :host .sr-only {
    clip: rect(0,0,0,0);
    border-width: 0;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  .${ELEMENTS.CONTAINER} {
    position: relative;
  }

  .${ELEMENTS.CONTAINER}:foucs-within .${ELEMENTS.DROPDOWN_CONTAINER} {
    display: block;
  }

  .${ELEMENTS.CONTAINER}[${VARIABLES.ATTRIBUTE_DROPDOWN}][${VARIABLES.ATTRIBUTE_SHOWING}] 
  .${ELEMENTS.DROPDOWN_CONTAINER} {
    display: block;
  }

  .${ELEMENTS.CONTAINER}[${VARIABLES.ATTRIBUTE_DROPDOWN}][${VARIABLES.ATTRIBUTE_SHOWING}] 
  .${ELEMENTS.PRIMARY_LINK_CONTAINER_BUTTON} {
    transform: rotate(180deg) translateY(5px);
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
