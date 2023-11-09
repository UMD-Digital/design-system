import { colors } from '@universityofmaryland/umd-web-configuration/dist/tokens/colors.js';
import { spacing } from '@universityofmaryland/umd-web-configuration/dist/tokens/layout.js';
import { MakeSlot } from 'helpers/ui';
import { ElementType } from '../component';
import { SLOTS, ELEMENTS } from '../globals';

const DROPDOWN_LIST_CONTAINER = 'dropdown-list-container';

export const DropdownStyles = `
  .${ELEMENTS.DROPDOWN_CONTAINER} {
    position: absolute;
    top: 100%; 
    left: 50%;
    transform: translateX(-50%);
    min-width: 250px;
    max-width: 420px;
    width: 120%;
    padding-top: ${spacing.sm};
    display: none;
  }

  .${DROPDOWN_LIST_CONTAINER} {
    background-color: ${colors.white};
    border-top: 2px solid ${colors.red};
    padding: ${spacing.lg};
  }
`;

export const CreateDropdown = ({ element }: { element: ElementType }) => {
  const container = document.createElement('div');
  const list = document.createElement('div');
  const titleSlot = MakeSlot({ type: SLOTS.DROPDOWN_LINKS });
  const elementBounds = element.getBoundingClientRect();

  if (elementBounds.left < 100) {
    container.style.left = '0';
    container.style.transform = 'translateX(0)';
  }

  if (window.innerWidth - elementBounds.right < 100) {
    container.style.right = '0';
    container.style.left = 'inherit';
    container.style.transform = 'translateX(0)';
  }

  list.classList.add(DROPDOWN_LIST_CONTAINER);
  container.classList.add(ELEMENTS.DROPDOWN_CONTAINER);
  list.appendChild(titleSlot);
  container.appendChild(list);

  return container;
};
