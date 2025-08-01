import { animation, token } from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';

type TypePrimaryLinkRequirements = {
  primaryLinkContainer?: HTMLElement | null;
  context?: HTMLElement;
};

type TypeDropdownProps = {
  dropdownLinksContainer?: HTMLElement | null;
  dropdownCalloutsSlot?: HTMLSlotElement | null;
};

type TypePrimaryLinkButtonProps = {
  buttonClick: () => void;
  navItemName: string;
};

type TypePrimaryLinkProps = TypePrimaryLinkRequirements &
  TypeDropdownProps &
  TypePrimaryLinkButtonProps & {
    hasDropdown: boolean;
  };

export type TypeNavItemRequirements = TypeDropdownProps &
  TypePrimaryLinkRequirements;

type TypeNavItem = TypeNavItemRequirements;

const ELEMENT_NAME = 'umd-element-nav-item';
const ATTRIBUTE_DROPDOWN = 'data-dropdown';
const ATTRIBUTE_SHOWING = 'data-showing';
const ATTRIBUTE_SELECTED = 'data-selected';

const BOUNDS_SHIFT = 140;
const MAX_COLUMN_ITEMS = 8;

const ELEMENT_NAV_ITEM_CONTAINER = `nav-item-container`;
const ELEMENT_PRIMARY_LINK_CONTAINER = 'nav-item-primary-link-container';
const ELEMENT_PRIMARLY_LINK_WRAPPER = `nav-item-primary-link-wrapper`;
const ELEMENT_PRIMARY_LINK_CONTAINER_BUTTON = `nav-item-primary-link-button`;

const ELEMENT_DROPDOWN_CONTAINER = `nav-item-dropdown-container`;
const ELEMENT_DROPDOWN_LIST_CONTAINER = 'nav-item-dropdown-list';
const ELEMENT_DROPDOWN_MULTIPLE_COLUMN = 'nav-item-dropdown-multiple-column';
const ELEMENT_DROPDOWN_CTA_COLUMN = 'nav-item-dropdown-cta-column';

const IS_SELECTED = `[${ATTRIBUTE_SELECTED}]`;
const IS_SHOWING = `[${ATTRIBUTE_SHOWING}]`;
const IS_DROPDOWN = `[${ATTRIBUTE_DROPDOWN}]`;

const OVERWRITE_DROPDOWN_CONTAINER = `.${ELEMENT_NAV_ITEM_CONTAINER}${IS_DROPDOWN}`;
const OVERWRITE_IS_SHOWING_DROPDOWN_CONTAINER = `${OVERWRITE_DROPDOWN_CONTAINER}${IS_SHOWING} .${ELEMENT_DROPDOWN_CONTAINER}`;
const OVERWRITE_IS_SHOWING_PRIMARY_LINK = `${OVERWRITE_DROPDOWN_CONTAINER} .${ELEMENT_PRIMARLY_LINK_WRAPPER}`;
const OVERWRITE_IS_SHOWING_PRIMARY_BUTTON = `${OVERWRITE_DROPDOWN_CONTAINER}${IS_SHOWING} .${ELEMENT_PRIMARY_LINK_CONTAINER_BUTTON}`;

// prettier-ignore
const OverwriteDropdownStyles = `
  ${OVERWRITE_IS_SHOWING_DROPDOWN_CONTAINER} {
    display: block;
  }

  ${OVERWRITE_IS_SHOWING_PRIMARY_BUTTON} {
    transform: rotate(180deg) translateY(4px);
  }

  ${OVERWRITE_IS_SHOWING_PRIMARY_LINK} > a${IS_SELECTED}:before {
    bottom: 1px;
    right: 20px;
  }
`

// prettier-ignore
const PrimaryStyles = `
  .${ELEMENT_PRIMARY_LINK_CONTAINER} {
    position: relative;
  }

  .${ELEMENT_PRIMARLY_LINK_WRAPPER} {
    display: block;
    position: relative;
  }

  .${ELEMENT_PRIMARLY_LINK_WRAPPER} > a {
    color: ${token.color.black};
    font-size: ${token.font.size.base};
    transition: color 0.2s ease-in-out;
    line-height: 1.15em;
    font-weight: 700;
    text-wrap: pretty;
    display: block;
    display: flex;
    align-items: flex-end;
    text-align: right;
  }

  .${ELEMENT_PRIMARLY_LINK_WRAPPER} > a:hover,
  .${ELEMENT_PRIMARLY_LINK_WRAPPER} > a:focus {
    color: ${token.color.red};
   }

  .${ELEMENT_PRIMARLY_LINK_WRAPPER} > a[${ATTRIBUTE_SELECTED}] span {
    display: inline;
    position: relative;
    background-position: left calc(100% - 0px);
    background-repeat: no-repeat;
    background-size: 100% 2.5px;
    background-image: linear-gradient(${token.color.gold}, ${token.color.gold});
  }

  .${ELEMENT_PRIMARY_LINK_CONTAINER_BUTTON} {
    position: absolute;
    top: 2px;
    right: -20px;
    transition: transform .5s;
  }

  .${ELEMENT_PRIMARY_LINK_CONTAINER_BUTTON} svg {
    fill: ${token.color.red};
    height: 14px;
    width: 14px;
    transform: rotate(0deg) translateY(0);
    transition: fill .5s,transform .5s;
  }
`;

// prettier-ignore
const DropdownMultipleColumnStyles = `
  .${ELEMENT_DROPDOWN_MULTIPLE_COLUMN} {
    display: flex;
    justify-content: space-between;
  }

  .${ELEMENT_DROPDOWN_MULTIPLE_COLUMN} > * {
    min-width: 232px;
  }

  .${ELEMENT_DROPDOWN_MULTIPLE_COLUMN} > *:not(:first-child) {
    margin-left: 40px;
  }
`

// prettier-ignore
const DropdownListStyles = `
  .${ELEMENT_DROPDOWN_LIST_CONTAINER} {
    background-color: ${token.color.white};
    border-top: 2px solid ${token.color.red};
    padding: ${token.spacing.lg};
    box-shadow: -1px 9px 32px -10px rgba(0,0,0,0.19);
  }

  .${ELEMENT_DROPDOWN_LIST_CONTAINER} a {
    display: block;
    min-width: 120px;
    max-width: 230px;
    font-weight: 700;
    font-size: 14px;
    line-height: 1.5em;
  }

  ${Utility.theme.convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_DROPDOWN_LIST_CONTAINER} a`]:
      animation.line.slideUnderRed,
    },
  })}

  .${ELEMENT_DROPDOWN_LIST_CONTAINER} a:hover,
  .${ELEMENT_DROPDOWN_LIST_CONTAINER} a:focus {
    color: ${token.color.red};
  }

  .${ELEMENT_DROPDOWN_LIST_CONTAINER} a + a {
    margin-top: ${token.spacing.md};
    display: block;
  }

  .${ELEMENT_DROPDOWN_LIST_CONTAINER} a${IS_SELECTED} span:not(.sr-only) {
    display: inline;
    position: relative;
    background-position: left calc(100% - 0px);
    background-repeat: no-repeat;
    background-size: 100% 2.5px;
    background-image: linear-gradient(${token.color.gold}, ${token.color.gold});
  }

  .${ELEMENT_DROPDOWN_LIST_CONTAINER} a${IS_SELECTED}:hover span,
  .${ELEMENT_DROPDOWN_LIST_CONTAINER} a${IS_SELECTED}:focus span {
    border-bottom: none;
  }
`

// prettier-ignore
const DropdownStyles = `
  .${ELEMENT_DROPDOWN_CONTAINER} {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);v 
    min-width: 200px;
    width: auto;
    padding-top: ${token.spacing.sm};
    display: none;
  }
`;

const STYLES_NAV_ITEM_ELEMENT = `
  .${ELEMENT_NAV_ITEM_CONTAINER} {
    position: relative;
    z-index: 9999;
  }

  ${OVERWRITE_DROPDOWN_CONTAINER} {
    padding-right: 20px;
  }

  .${ELEMENT_NAV_ITEM_CONTAINER} a {
    font-family: ${token.font.family.sans};
    font-size: ${token.font.size.sm};
    font-weight: 700;
    color: ${token.color.black};
    text-decoration: none;
  }
  
  .${ELEMENT_NAV_ITEM_CONTAINER}:foucs-within .${ELEMENT_DROPDOWN_CONTAINER} {
    display: block;
  }

  ${PrimaryStyles}
  ${DropdownStyles}
  ${DropdownMultipleColumnStyles}
  ${DropdownListStyles}
  ${OverwriteDropdownStyles}
`;

const CreateMultipleColumns = ({ links }: { links: HTMLAnchorElement[] }) => {
  const column1 = document.createElement('div');
  const column2 = document.createElement('div');
  const firstColumnLinks = links.splice(0, Math.ceil(links.length / 2));

  firstColumnLinks.forEach((link) => {
    Utility.markup.modify.animationLinkSpan({ element: link });
    column1.appendChild(link);
  });
  links.forEach((link) => {
    Utility.markup.modify.animationLinkSpan({ element: link });
    column2.appendChild(link);
  });

  return [column1, column2];
};

const CreateSingleColumn = ({ links }: { links: HTMLAnchorElement[] }) => {
  const container = document.createElement('div');
  links.forEach((link) => {
    Utility.markup.modify.animationLinkSpan({ element: link });
    container.appendChild(link);
  });

  return container;
};

const CreateDropdown = ({
  dropdownLinksContainer,
  dropdownCalloutsSlot,
}: TypeDropdownProps) => {
  if (!dropdownLinksContainer) return;

  const links = Array.from(
    dropdownLinksContainer.querySelectorAll('a'),
  ) as HTMLAnchorElement[];

  const container = document.createElement('div');
  const wrapper = document.createElement('div');

  wrapper.classList.add(ELEMENT_DROPDOWN_LIST_CONTAINER);
  container.classList.add(ELEMENT_DROPDOWN_CONTAINER);

  if (links.length > MAX_COLUMN_ITEMS) {
    const columns = CreateMultipleColumns({ links });
    columns.forEach((column) => {
      wrapper.appendChild(column);
    });
    wrapper.classList.add(ELEMENT_DROPDOWN_MULTIPLE_COLUMN);
  } else {
    wrapper.appendChild(CreateSingleColumn({ links }));

    if (dropdownCalloutsSlot) {
      wrapper.classList.add(ELEMENT_DROPDOWN_MULTIPLE_COLUMN);
    }
  }

  if (dropdownCalloutsSlot) {
    const dropdownWrapper = document.createElement('div');

    dropdownWrapper.classList.add(ELEMENT_DROPDOWN_CTA_COLUMN);
    dropdownWrapper.appendChild(dropdownCalloutsSlot);
    wrapper.appendChild(dropdownWrapper);
  }

  container.appendChild(wrapper);

  return container;
};

const CreateButton = ({
  buttonClick,
  navItemName,
}: TypePrimaryLinkButtonProps) => {
  const button = document.createElement('button');

  button.classList.add(ELEMENT_PRIMARY_LINK_CONTAINER_BUTTON);
  button.innerHTML = Utility.asset.icon.CHEVRON_SMALL;
  button.addEventListener('click', () => buttonClick());
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', `nav-links-`);
  button.setAttribute('aria-label', `List of menu items for ${navItemName}`);

  return button;
};

const CreatePrimaryLink = (props: TypePrimaryLinkProps) => {
  const { hasDropdown, primaryLinkContainer } = props;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');

  const dropdown = CreateDropdown(props);

  container.classList.add(ELEMENT_PRIMARY_LINK_CONTAINER);
  wrapper.classList.add(ELEMENT_PRIMARLY_LINK_WRAPPER);

  if (primaryLinkContainer) {
    const clonedPrimaryLink = primaryLinkContainer.cloneNode(
      true,
    ) as HTMLElement;
    wrapper.appendChild(clonedPrimaryLink);
  }

  if (hasDropdown) {
    const button = CreateButton(props);
    wrapper.appendChild(button);
  }

  if (dropdown) wrapper.appendChild(dropdown);

  container.appendChild(wrapper);
  return container;
};

const CreateNavItemElement = (props: TypeNavItem) =>
  (() => {
    const { dropdownLinksContainer, primaryLinkContainer, context } = props;

    if (!primaryLinkContainer) {
      throw new Error('Primary link is required for a nav item');
    }

    const elementContainer = document.createElement('div');
    const dropDownContainerLinks = dropdownLinksContainer?.children;
    const hasDropdown =
      (dropDownContainerLinks && dropDownContainerLinks.length > 0) || false;

    const navItemName = primaryLinkContainer.innerHTML
      .replace(/(<([^>]+)>)/gi, '')
      .trim();
    let isShowing = false;
    let focusCallback = () => {};

    const OnLoadDropdownSpans = () => {
      if (!dropdownLinksContainer) return;

      const links = Array.from(
        dropdownLinksContainer.querySelectorAll('a'),
      ) as HTMLAnchorElement[];

      links.forEach((link) => {
        const hasSpan = link.querySelector('span');

        if (!hasSpan) {
          Utility.markup.modify.animationLinkSpan({ element: link });
          link.appendChild(link);
        }
      });
    };

    const DropdownPositionPerViewPort = () => {
      const elementBounds = elementContainer.getBoundingClientRect();
      const dropdownContainer = elementContainer.querySelector(
        `.${ELEMENT_DROPDOWN_CONTAINER}`,
      ) as HTMLDivElement;
      const width = elementContainer.offsetWidth;

      if (!dropdownContainer) return;

      const size = dropdownContainer.offsetWidth + BOUNDS_SHIFT;

      if (elementBounds.left + width < size) {
        dropdownContainer.style.left = '0';
        dropdownContainer.style.transform = 'translateX(0)';
      }

      if (window.innerWidth - elementBounds.right < size / 2) {
        dropdownContainer.style.right = '0';
        dropdownContainer.style.left = 'inherit';
        dropdownContainer.style.transform = 'translateX(0)';
      }
    };

    const ShowDropdown = () => {
      elementContainer.setAttribute(ATTRIBUTE_SHOWING, '');
      DropdownPositionPerViewPort();
    };

    const HideDropdown = () => {
      elementContainer.removeAttribute(ATTRIBUTE_SHOWING);
      focusCallback();
      focusCallback = () => {};
    };

    const EventButtonClick = () => {
      if (isShowing && dropdownLinksContainer) {
        ShowDropdown();
        focusCallback = Utility.accessibility.eventAccessibilityFocus({
          element: elementContainer,
          action: () => HideDropdown(),
          shadowDomContext: context,
        });

        setTimeout(() => {
          const firstElement = dropdownLinksContainer.querySelector(
            'a',
          ) as HTMLAnchorElement;

          if (firstElement) firstElement.focus();
        }, 100);
      }

      if (!isShowing) HideDropdown();
    };

    const buttonClick = () => {
      isShowing = isShowing ? false : true;
      EventButtonClick();
    };

    // Load

    const linkContainer = CreatePrimaryLink({
      ...props,
      hasDropdown,
      buttonClick,
      navItemName,
    });

    elementContainer.addEventListener('mouseover', () => {
      isShowing = true;
      ShowDropdown();
    });

    elementContainer.addEventListener('mouseleave', () => {
      isShowing = false;
      HideDropdown();
    });

    setTimeout(() => {
      OnLoadDropdownSpans();
    }, 10);

    if (hasDropdown) elementContainer.setAttribute(ATTRIBUTE_DROPDOWN, '');
    elementContainer.classList.add(ELEMENT_NAV_ITEM_CONTAINER);
    elementContainer.appendChild(linkContainer);

    return elementContainer;
  })();

export default {
  CreateElement: CreateNavItemElement,
  Styles: STYLES_NAV_ITEM_ELEMENT,
};
