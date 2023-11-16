import { colors } from '@universityofmaryland/umd-web-configuration/dist/tokens/colors.js';
import { MakeSlot } from 'helpers/ui';
import { CHEVRON_SMALL_ICON } from 'assets/icons';
import { ElementType } from '../component';
import { CreateDropdown, DropdownStyles } from './dropdown';
import { SLOTS, ELEMENTS } from '../globals';

const PRIMARY_LINK_CONTAINER = 'primary-link-container';

export const PrimaryStyles = `
  .${PRIMARY_LINK_CONTAINER} {
    position: relative;
  }

  .${ELEMENTS.PRIMARLY_LINK_WRAPPER} {
    display: inline-flex;
    position: relative;
  }

  .${ELEMENTS.PRIMARLY_LINK_WRAPPER} ::slotted(a) {
    font-size: 16px;
    white-space: nowrap;
  }

  .${ELEMENTS.PRIMARY_LINK_CONTAINER_BUTTON} {
    align-self: flex-start;
    margin-top: 5px;
    margin-left: 8px;
    transition: transform .5s;
  }

  .${ELEMENTS.PRIMARY_LINK_CONTAINER_BUTTON} svg {
    fill: ${colors.red};
    height: 16px;
    transform: rotate(0deg) translateY(0);
    transition: fill .5s,transform .5s;
    width: 16px;
  }

  ${DropdownStyles}
`;

const CreateButton = ({ element }: { element: ElementType }) => {
  const button = document.createElement('button');

  button.classList.add(ELEMENTS.PRIMARY_LINK_CONTAINER_BUTTON);
  button.innerHTML = CHEVRON_SMALL_ICON;
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

  if (dropdown) wrapper.appendChild(dropdown);

  container.appendChild(wrapper);
  return container;
};
