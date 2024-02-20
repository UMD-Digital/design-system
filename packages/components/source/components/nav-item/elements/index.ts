import { Tokens } from '@universityofmaryland/variables';
import { Reset } from 'helpers/styles';
import { ElementType } from 'components/nav-item/component';
import { ELEMENTS, VARIABLES } from 'components/nav-item/globals';
import { CreatePrimaryLink, PrimaryStyles } from './primary';

const { Colors, FontFamily, FontSize, FontWeight } = Tokens;

// prettier-ignore
const hasDropdownStyles = `
  .${ELEMENTS.CONTAINER}[${VARIABLES.ATTRIBUTE_DROPDOWN}][${VARIABLES.ATTRIBUTE_SHOWING}] .${ELEMENTS.DROPDOWN_CONTAINER} {
    display: block;
  }

  .${ELEMENTS.CONTAINER}[${VARIABLES.ATTRIBUTE_DROPDOWN}][${VARIABLES.ATTRIBUTE_SHOWING}] .${ELEMENTS.PRIMARY_LINK_CONTAINER_BUTTON} {
    transform: rotate(180deg) translateY(5px);
  }

  .${ELEMENTS.CONTAINER}[${VARIABLES.ATTRIBUTE_DROPDOWN}] .${ELEMENTS.PRIMARLY_LINK_WRAPPER} > a[${VARIABLES.ATTRIBUTE_SELECTED}]:before {
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
    font-weight: ${FontWeight.bold};
    color: ${Colors.black};
    text-decoration: none;
  }

  .${ELEMENTS.CONTAINER} {
    position: relative;
    container: umd-nav-item / inline-size;
  }

  .${ELEMENTS.CONTAINER}:foucs-within .${ELEMENTS.DROPDOWN_CONTAINER} {
    display: block;
  }

  ${PrimaryStyles}
  ${hasDropdownStyles}
`;

export const CreateShadowDom = ({ element }: { element: ElementType }) => {
  const container = document.createElement('div');
  const primaryLink = CreatePrimaryLink({ element });

  container.appendChild(primaryLink);
  container.classList.add(ELEMENTS.CONTAINER);

  return container;
};
