import { fontFamily } from '@universityofmaryland/umd-web-configuration/dist/tokens/fonts.js';
import { MakeSlot } from 'helpers/ui';
import { CHEVRON_SMALL } from 'assets/icons';
import { ElementType } from '../component';
import { CreateDropdown, DropdownStyles } from './dropdown';
import { SLOTS, ELEMENTS } from '../globals';

const PRIMARY_LINK_CONTAINER = 'primary-link-container';
const PRIMARY_LINK_CONTAINER_BUTTON = 'primary-link-container-button';

export const PrimaryStyles = `
  .${PRIMARY_LINK_CONTAINER} {
    position: relative;
  }

  .${ELEMENTS.PRIMARLY_LINK_WRAPPER} {
    display: inline-flex;
    position: relative;
    white-space: nowrap;
  }

  .${PRIMARY_LINK_CONTAINER} button {
    margin-left: 8px;
  }

  .${PRIMARY_LINK_CONTAINER} button svg {
    fill: #e21833;
    height: 16px;
    transform: rotate(0deg);
    transition: fill .5s,transform .5s;
    width: 16px;
  }

  ${DropdownStyles}
`;

const CreateButton = ({ element }: { element: ElementType }) => {
  const button = document.createElement('button');

  button.classList.add(PRIMARY_LINK_CONTAINER_BUTTON);
  button.innerHTML = CHEVRON_SMALL;
  button.addEventListener('click', () => element.buttonClick());
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', `nav-links-`);
  button.setAttribute(
    'aria-label',
    `List of menu items for ${element._navItemName}`,
  );

  return button;
};

export const CreatePrimaryLink = ({ element }: { element: ElementType }) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('span');
  const titleSlot = MakeSlot({ type: SLOTS.PRIMARY_LINK });
  const dropdown = CreateDropdown({ element });

  container.classList.add(PRIMARY_LINK_CONTAINER);
  wrapper.classList.add(ELEMENTS.PRIMARLY_LINK_WRAPPER);

  wrapper.appendChild(titleSlot);

  if (element._hasDropdown) {
    const button = CreateButton({ element });
    wrapper.appendChild(button);
  }

  wrapper.appendChild(dropdown);

  container.appendChild(wrapper);
  return container;
};
