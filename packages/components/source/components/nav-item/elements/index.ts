import { Tokens } from '@universityofmaryland/variables';
import { Reset } from 'helpers/styles';
import { CreatePrimaryLink, PrimaryStyles } from './primary';
import { UMDNavItemElement } from '../index';
import { ELEMENTS, VARIABLES, REFERENCES } from '../globals';

const { Colors, FontFamily, FontSize } = Tokens;

const { ELEMENT_NAME, ATTRIBUTE_DROPDOWN, ATTRIBUTE_SHOWING } = VARIABLES;
const { IS_SELECTED, IS_SHOWING, IS_DROPDOWN } = REFERENCES;
const {
  CONTAINER,
  DROPDOWN_CONTAINER,
  PRIMARLY_LINK_WRAPPER,
  PRIMARY_LINK_CONTAINER_BUTTON,
} = ELEMENTS;

// prettier-ignore
const hasDropdownStyles = `
  .${CONTAINER}${IS_DROPDOWN}${IS_SHOWING} .${DROPDOWN_CONTAINER} {
    display: block;
  }

  .${CONTAINER}${IS_DROPDOWN}${IS_SHOWING} .${PRIMARY_LINK_CONTAINER_BUTTON} {
    transform: rotate(180deg) translateY(4px);
  }

  .${CONTAINER}${IS_DROPDOWN} .${PRIMARLY_LINK_WRAPPER} > a${IS_SELECTED}:before {
    bottom: 1px;
    right: 20px;
  }
`

// prettier-ignore
export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}

  a {
    font-family: ${FontFamily.sans};
    font-size: ${FontSize.sm};
    font-weight: 700;
    color: ${Colors.black};
    text-decoration: none;
  }

  .${CONTAINER} {
    position: relative;
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${CONTAINER}:foucs-within .${DROPDOWN_CONTAINER} {
    display: block;
  }

  ${PrimaryStyles}
  ${hasDropdownStyles}
`;

export const CreateShadowDom = ({
  element,
}: {
  element: UMDNavItemElement;
}) => {
  const container = document.createElement('div');
  const primaryLink = CreatePrimaryLink({ element });

  container.appendChild(primaryLink);
  container.classList.add(CONTAINER);

  return container;
};
