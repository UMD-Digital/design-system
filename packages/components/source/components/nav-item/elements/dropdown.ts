import { Animations, Tokens } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { CheckForAnimationLinkSpan } from 'helpers/ui';
import { ElementType } from 'components/nav-item';
import { SLOTS, ELEMENTS, VARIABLES } from 'components/nav-item/globals';

const { Colors, Spacing } = Tokens;

const { DROPDOWN_LINKS } = SLOTS;
const { DROPDOWN_CONTAINER } = ELEMENTS;
const { ATTRIBUTE_SELECTED } = VARIABLES;

const DROPDOWN_LIST_CONTAINER = 'dropdown-list-container';
const TWO_COLUMN_CONTAINER = 'two-column-container';
const MAX_COLUMN_ITEMS = 8;

// prettier-ignore
const columnStyles = `
  .${TWO_COLUMN_CONTAINER} {
    display: flex;
    justify-content: space-between;
  }

  .${TWO_COLUMN_CONTAINER} > * {
    min-width: 232px;
  }

  .${TWO_COLUMN_CONTAINER} > *:last-child {
    margin-left: 40px;
  }
`

// prettier-ignore
const linkStyles = `
  .${DROPDOWN_LIST_CONTAINER} a {
    display: block;
    min-width: 120px;
    max-width: 230px;
    font-weight: 700;
    font-size: 14px;
    line-height: 1.5em;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${DROPDOWN_LIST_CONTAINER} a`]:
      Animations.LinkLineSlide['.slidein-underline-red'],
    },
  })}

  .${DROPDOWN_LIST_CONTAINER} a:hover,
  .${DROPDOWN_LIST_CONTAINER} a:focus {
    color: ${Colors.red};
  }

  .${DROPDOWN_LIST_CONTAINER} a + a {
    margin-top: ${Spacing.md};
    display: block;
  }

  .${DROPDOWN_LIST_CONTAINER} a[${ATTRIBUTE_SELECTED}] span:not(.sr-only) {
    display: inline;
    position: relative;
    background-position: left calc(100% - 0px);
    background-repeat: no-repeat;
    background-size: 100% 2.5px;
    background-image: linear-gradient(${Colors.gold}, ${Colors.gold});
  }

  .${DROPDOWN_LIST_CONTAINER} a[${ATTRIBUTE_SELECTED}]:hover span,
  .${DROPDOWN_LIST_CONTAINER} a[${ATTRIBUTE_SELECTED}]:focus span {
    border-bottom: none;
  }
`

// prettier-ignore
export const DropdownStyles = `
  .${DROPDOWN_CONTAINER} {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    min-width: 250px;
    width: auto;
    padding-top: ${Spacing.sm};
    display: none;
  }

  .${DROPDOWN_LIST_CONTAINER} {
    background-color: ${Colors.white};
    border-top: 2px solid ${Colors.red};
    padding: ${Spacing.lg};
    box-shadow: -1px 9px 32px -10px rgba(0,0,0,0.19);
  }

  ${columnStyles}
  ${linkStyles}
`;

const CreateMultipleColumns = ({ links }: { links: HTMLAnchorElement[] }) => {
  const container = document.createElement('div');
  const column1 = document.createElement('div');
  const column2 = document.createElement('div');
  const firstColumnLinks = links.splice(0, Math.ceil(links.length / 2));

  firstColumnLinks.forEach((link) => {
    CheckForAnimationLinkSpan({ element: link });
    column1.appendChild(link);
  });
  links.forEach((link) => {
    CheckForAnimationLinkSpan({ element: link });
    column2.appendChild(link);
  });

  container.classList.add(TWO_COLUMN_CONTAINER);

  container.appendChild(column1);
  container.appendChild(column2);

  return container;
};

const CreateSingleColumn = ({ links }: { links: HTMLAnchorElement[] }) => {
  const container = document.createElement('div');
  links.forEach((link) => {
    CheckForAnimationLinkSpan({ element: link });
    container.appendChild(link);
  });

  return container;
};

export const CreateDropdown = ({ element }: { element: ElementType }) => {
  const dropdownSlot = element.querySelector(
    `[slot=${DROPDOWN_LINKS}]`,
  ) as HTMLSlotElement;

  if (!dropdownSlot) return;

  const links = Array.from(
    dropdownSlot.querySelectorAll('a'),
  ) as HTMLAnchorElement[];

  const container = document.createElement('div');
  const list = document.createElement('div');

  list.classList.add(DROPDOWN_LIST_CONTAINER);
  container.classList.add(DROPDOWN_CONTAINER);

  if (links.length > MAX_COLUMN_ITEMS) {
    list.appendChild(CreateMultipleColumns({ links }));
  } else {
    list.appendChild(CreateSingleColumn({ links }));
  }

  container.appendChild(list);

  return container;
};
