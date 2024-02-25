import { Tokens } from '@universityofmaryland/variables';
import { Reset } from 'helpers/styles';
import { ElementType } from 'components/nav-item';
import { ELEMENTS, VARIABLES } from 'components/nav-item/globals';
import { CreatePrimaryLink, PrimaryStyles } from './primary';

const { Colors, FontFamily, FontSize, FontWeight } = Tokens;

const { ATTRIBUTE_DROPDOWN, ATTRIBUTE_SHOWING, ATTRIBUTE_SELECTED } = VARIABLES;
const {
  CONTAINER,
  DROPDOWN_CONTAINER,
  PRIMARLY_LINK_WRAPPER,
  PRIMARY_LINK_CONTAINER_BUTTON,
} = ELEMENTS;

// prettier-ignore
const hasDropdownStyles = `
  .${CONTAINER}[${ATTRIBUTE_DROPDOWN}][${ATTRIBUTE_SHOWING}] .${DROPDOWN_CONTAINER} {
    display: block;
  }

  .${CONTAINER}[${ATTRIBUTE_DROPDOWN}][${ATTRIBUTE_SHOWING}] .${PRIMARY_LINK_CONTAINER_BUTTON} {
    transform: rotate(180deg) translateY(4px);
  }

  .${CONTAINER}[${ATTRIBUTE_DROPDOWN}] .${PRIMARLY_LINK_WRAPPER} > a[${ATTRIBUTE_SELECTED}]:before {
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
    container: umd-nav-item / inline-size;
  }

  .${CONTAINER}:foucs-within .${DROPDOWN_CONTAINER} {
    display: block;
  }

  ${PrimaryStyles}
  ${hasDropdownStyles}
`;

export const CreateShadowDom = ({ element }: { element: ElementType }) => {
  const container = document.createElement('div');
  const primaryLink = CreatePrimaryLink({ element });

  container.appendChild(primaryLink);
  container.classList.add(CONTAINER);

  return container;
};
