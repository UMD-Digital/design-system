import { Tokens } from '@universityofmaryland/variables';
import { SlotDefaultStyling } from 'helpers/ui';
import { CHEVRON_SMALL_ICON } from 'assets/icons';
import { CreateDropdown, DropdownStyles } from './dropdown';
import { UMDNavItemElement } from '../index';
import { SLOTS, ELEMENTS, VARIABLES } from '../globals';

const { Colors, FontSize } = Tokens;

const { PRIMARY_LINK } = SLOTS;
const { PRIMARY_LINK_CONTAINER_BUTTON, PRIMARLY_LINK_WRAPPER } = ELEMENTS;
const { ATTRIBUTE_SELECTED } = VARIABLES;

const PRIMARY_LINK_CONTAINER = 'primary-link-container';

// prettier-ignore
export const PrimaryStyles = `
  .${PRIMARY_LINK_CONTAINER} {
    position: relative;
  }

  .${PRIMARLY_LINK_WRAPPER} {
    display: inline-flex;
    position: relative;
  }

  .${PRIMARLY_LINK_WRAPPER} > a {
    color: ${Colors.black};
    font-size: ${FontSize.base};
    white-space: nowrap;
    transition: color 0.2s ease-in-out;
    line-height: 1.45em;
    font-weight: 700;
  }

  .${PRIMARLY_LINK_WRAPPER} > a:hover,
  .${PRIMARLY_LINK_WRAPPER} > a:focus {
    color: ${Colors.red};
   }

  .${PRIMARLY_LINK_WRAPPER} > a[${ATTRIBUTE_SELECTED}] span {
    display: inline;
    position: relative;
    background-position: left calc(100% - 0px);
    background-repeat: no-repeat;
    background-size: 100% 2.5px;
    background-image: linear-gradient(${Colors.gold}, ${Colors.gold});
  }

  .${PRIMARY_LINK_CONTAINER_BUTTON} {
    align-self: flex-start;
    margin-top: 5px;
    margin-left: 8px;
    transition: transform .5s;
  }

  .${PRIMARY_LINK_CONTAINER_BUTTON} svg {
    fill: ${Colors.red};
    height: 14px;
    width: 14px;
    transform: rotate(0deg) translateY(0);
    transition: fill .5s,transform .5s;
  }

  ${DropdownStyles}
`;

const CreateButton = ({ element }: { element: UMDNavItemElement }) => {
  const button = document.createElement('button');

  button.classList.add(PRIMARY_LINK_CONTAINER_BUTTON);
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

export const CreatePrimaryLink = ({
  element,
}: {
  element: UMDNavItemElement;
}) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const titleSlot = SlotDefaultStyling({
    element,
    slotRef: PRIMARY_LINK,
  });
  const dropdown = CreateDropdown({ element });

  container.classList.add(PRIMARY_LINK_CONTAINER);
  wrapper.classList.add(PRIMARLY_LINK_WRAPPER);

  if (titleSlot) wrapper.appendChild(titleSlot);

  if (element._hasDropdown) {
    const button = CreateButton({ element });
    wrapper.appendChild(button);
  }

  if (dropdown) wrapper.appendChild(dropdown);

  container.appendChild(wrapper);
  return container;
};
