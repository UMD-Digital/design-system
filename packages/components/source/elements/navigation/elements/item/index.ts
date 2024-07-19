import { Tokens, Animations } from '@universityofmaryland/variables';
import {
  AssetIcon,
  Accessibility,
  Performance,
  MarkupModify,
  Styles,
} from 'utilities';

type TypePrimaryLinkRequirements = {
  primaryLinkContainer?: HTMLElement | null;
};

type TypeDropdownProps = {
  dropdownLinksContainer?: HTMLElement | null;
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

const { Colors, Spacing, FontFamily, FontSize } = Tokens;
const { Debounce } = Performance;
const { EventAccessibilityFocus } = Accessibility;
const { AnimationLinkSpan } = MarkupModify;
const { ConvertJSSObjectToStyles } = Styles;

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
const ELEMENT_DROPDOWN_TWO_COLUMN = 'nav-item-dropdown-two-column';

const IS_SELECTED = `[${ATTRIBUTE_SELECTED}]`;
const IS_SHOWING = `[${ATTRIBUTE_SHOWING}]`;
const IS_DROPDOWN = `[${ATTRIBUTE_DROPDOWN}]`;

const OVERWRITE_IS_SHOWING_DROPDOWN_CONTAINER = `.${ELEMENT_NAV_ITEM_CONTAINER}${IS_DROPDOWN}${IS_SHOWING} .${ELEMENT_DROPDOWN_CONTAINER}`;
const OVERWRITE_IS_SHOWING_PRIMARY_LINK = `.${ELEMENT_NAV_ITEM_CONTAINER}${IS_DROPDOWN} .${ELEMENT_PRIMARLY_LINK_WRAPPER}`;
const OVERWRITE_IS_SHOWING_PRIMARY_BUTTON = `.${ELEMENT_NAV_ITEM_CONTAINER}${IS_DROPDOWN}${IS_SHOWING} .${ELEMENT_PRIMARY_LINK_CONTAINER_BUTTON}`;

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
    display: inline-flex;
    position: relative;
  }

  .${ELEMENT_PRIMARLY_LINK_WRAPPER} > a {
    color: ${Colors.black};
    font-size: ${FontSize.base};
    white-space: nowrap;
    transition: color 0.2s ease-in-out;
    line-height: 1.45em;
    font-weight: 700;
  }

  .${ELEMENT_PRIMARLY_LINK_WRAPPER} > a:hover,
  .${ELEMENT_PRIMARLY_LINK_WRAPPER} > a:focus {
    color: ${Colors.red};
   }

  .${ELEMENT_PRIMARLY_LINK_WRAPPER} > a[${ATTRIBUTE_SELECTED}] span {
    display: inline;
    position: relative;
    background-position: left calc(100% - 0px);
    background-repeat: no-repeat;
    background-size: 100% 2.5px;
    background-image: linear-gradient(${Colors.gold}, ${Colors.gold});
  }

  .${ELEMENT_PRIMARY_LINK_CONTAINER_BUTTON} {
    align-self: flex-start;
    margin-top: 5px;
    margin-left: 8px;
    transition: transform .5s;
  }

  .${ELEMENT_PRIMARY_LINK_CONTAINER_BUTTON} svg {
    fill: ${Colors.red};
    height: 14px;
    width: 14px;
    transform: rotate(0deg) translateY(0);
    transition: fill .5s,transform .5s;
  }

`;

// prettier-ignore
const DropdownColumnStyles = `
  .${ELEMENT_DROPDOWN_TWO_COLUMN} {
    display: flex;
    justify-content: space-between;
  }

  .${ELEMENT_DROPDOWN_TWO_COLUMN} > * {
    min-width: 232px;
  }

  .${ELEMENT_DROPDOWN_TWO_COLUMN} > *:last-child {
    margin-left: 40px;
  }
`

// prettier-ignore
const DropdownListStyles = `
  .${ELEMENT_DROPDOWN_LIST_CONTAINER} {
    background-color: ${Colors.white};
    border-top: 2px solid ${Colors.red};
    padding: ${Spacing.lg};
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

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_DROPDOWN_LIST_CONTAINER} a`]:
      Animations.Link.LineSlideUnder.red,
    },
  })}

  .${ELEMENT_DROPDOWN_LIST_CONTAINER} a:hover,
  .${ELEMENT_DROPDOWN_LIST_CONTAINER} a:focus {
    color: ${Colors.red};
  }

  .${ELEMENT_DROPDOWN_LIST_CONTAINER} a + a {
    margin-top: ${Spacing.md};
    display: block;
  }

  .${ELEMENT_DROPDOWN_LIST_CONTAINER} a${IS_SELECTED} span:not(.sr-only) {
    display: inline;
    position: relative;
    background-position: left calc(100% - 0px);
    background-repeat: no-repeat;
    background-size: 100% 2.5px;
    background-image: linear-gradient(${Colors.gold}, ${Colors.gold});
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
    transform: translateX(-50%);
    min-width: 250px;
    width: auto;
    padding-top: ${Spacing.sm};
    display: none;
  }
`;

const STYLES_NAV_ITEM_ELEMENT = `
  .${ELEMENT_NAV_ITEM_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    position: relative;
    z-index: 9999;
  }

  .${ELEMENT_NAV_ITEM_CONTAINER} a {
    font-family: ${FontFamily.sans};
    font-size: ${FontSize.sm};
    font-weight: 700;
    color: ${Colors.black};
    text-decoration: none;
  }
  
  .${ELEMENT_NAV_ITEM_CONTAINER}:foucs-within .${ELEMENT_DROPDOWN_CONTAINER} {
    display: block;
  }

  ${PrimaryStyles}
  ${DropdownStyles}
  ${DropdownColumnStyles}
  ${DropdownListStyles}
  ${OverwriteDropdownStyles}
`;

const CreateMultipleColumns = ({ links }: { links: HTMLAnchorElement[] }) => {
  const container = document.createElement('div');
  const column1 = document.createElement('div');
  const column2 = document.createElement('div');
  const firstColumnLinks = links.splice(0, Math.ceil(links.length / 2));

  firstColumnLinks.forEach((link) => {
    MarkupModify.AnimationLinkSpan({ element: link });
    column1.appendChild(link);
  });
  links.forEach((link) => {
    MarkupModify.AnimationLinkSpan({ element: link });
    column2.appendChild(link);
  });

  container.classList.add(ELEMENT_DROPDOWN_TWO_COLUMN);

  container.appendChild(column1);
  container.appendChild(column2);

  return container;
};

const CreateSingleColumn = ({ links }: { links: HTMLAnchorElement[] }) => {
  const container = document.createElement('div');
  links.forEach((link) => {
    MarkupModify.AnimationLinkSpan({ element: link });
    container.appendChild(link);
  });

  return container;
};

const CreateDropdown = ({ dropdownLinksContainer }: TypeDropdownProps) => {
  if (!dropdownLinksContainer) return;

  const links = Array.from(
    dropdownLinksContainer.querySelectorAll('a'),
  ) as HTMLAnchorElement[];

  const container = document.createElement('div');
  const list = document.createElement('div');

  list.classList.add(ELEMENT_DROPDOWN_LIST_CONTAINER);
  container.classList.add(ELEMENT_DROPDOWN_CONTAINER);

  if (links.length > MAX_COLUMN_ITEMS) {
    list.appendChild(CreateMultipleColumns({ links }));
  } else {
    list.appendChild(CreateSingleColumn({ links }));
  }

  container.appendChild(list);

  return container;
};

const CreateButton = ({
  buttonClick,
  navItemName,
}: TypePrimaryLinkButtonProps) => {
  const button = document.createElement('button');

  button.classList.add(ELEMENT_PRIMARY_LINK_CONTAINER_BUTTON);
  button.innerHTML = AssetIcon.CHEVRON_SMALL;
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
    const { dropdownLinksContainer, primaryLinkContainer } = props;

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
          AnimationLinkSpan({ element: link });
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

      if (window.innerWidth - (elementBounds.right + width) < BOUNDS_SHIFT) {
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
        focusCallback = EventAccessibilityFocus({
          element: elementContainer,
          action: () => HideDropdown(),
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

    const EventSize = () => {
      const wrapperElement = elementContainer.querySelector(
        `.${ELEMENT_PRIMARLY_LINK_WRAPPER}`,
      ) as HTMLDivElement;

      if (!wrapperElement) return;
      let width = wrapperElement.offsetWidth;

      if (width > 230) {
        width = 230;
        const slottedLink = wrapperElement.querySelector(
          `a`,
        ) as HTMLAnchorElement;
        slottedLink.style.whiteSpace = `initial`;
      }

      elementContainer.style.width = `${width}px`;
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

    window.addEventListener(
      'resize',
      Debounce(() => {
        EventSize();
      }, 20),
    );

    elementContainer.addEventListener('mouseover', () => {
      isShowing = true;
      ShowDropdown();
    });

    elementContainer.addEventListener('mouseleave', () => {
      isShowing = false;
      HideDropdown();
    });

    setTimeout(() => {
      EventSize();
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
