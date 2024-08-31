import { Tokens, Typography } from '@universityofmaryland/variables';
import { AssetIcon, Styles } from 'utilities';
import MenuButton from './elements/menu-button';
import { NavigationElements } from 'elements';

type TypeLogoRequirments = {
  logo?: HTMLElement | null;
  eventOpen?: () => void;
};

type TypeSearchLink = {
  searchUrl: string | null;
};

type TypeNavRow = TypeSearchLink & {
  navRow?: HTMLElement | null;
  utilityRow?: HTMLElement | null;
};

type TypeHeaderRequirements = TypeLogoRequirments & TypeNavRow;

const { Colors, Spacing, Breakpoints } = Tokens;
const { SansLarger, SansExtraLarge } = Typography;
const { ConvertJSSObjectToStyles } = Styles;
const ANIMATION_TIME = 500;

const ATTRIBUTE_STICKY = 'sticky';

const IS_STICKY = `[${ATTRIBUTE_STICKY}="true"]`;

const ELEMENT_HEADER_DECLARATION = 'element-header-declaration';
const ELEMENT_HEADER_CONTAINTER = 'element-header-container';
const ELEMENT_HEADER_WRAPPER = 'element-header-wrapper';
const ELEMENT_HEADER_LOGO_COLUMN = 'element-header-logo-column';
const ELEMENT_HEADER_NAVIGATION_COLUMN = 'element-header-navigation-column';
const ELEMENT_HEADER_LOGO = 'element-header-logo';
const ELEMENT_HEADER_MENU_BUTTON = 'element-header-menu-button';
const ELEMENT_HEADER_NAVIGATION_ROW = 'element-header-navigation-row';
const ELEMENT_HEADER_UTILITY_ROW = 'element-header-utility-row';

const OVERWRITE_STICKY_CONTAINER = `.${ELEMENT_HEADER_CONTAINTER}${IS_STICKY}`;
const OVERWRITE_STICKY_LOGO = `${OVERWRITE_STICKY_CONTAINER} .${ELEMENT_HEADER_LOGO}`;

const OverwriteStickyStyles = `
  ${OVERWRITE_STICKY_CONTAINER} {
    padding: ${Spacing.xs} 0;
  }

  .${ELEMENT_HEADER_WRAPPER} {
     align-items: center;
  }

  ${OVERWRITE_STICKY_LOGO} img {
    max-height: 30px;
  }
`;

const NavigationColumnStyles = `
  .${ELEMENT_HEADER_NAVIGATION_COLUMN} {

  }

  @media (max-width: ${Breakpoints.tablet.max}) {
    .${ELEMENT_HEADER_NAVIGATION_COLUMN} {
      display: none;
    }
  }

  .${ELEMENT_HEADER_NAVIGATION_ROW} {
    display: flex;
    gap: ${Spacing.md};
    justify-content flex-end;
    align-items: center;
  }

  .${ELEMENT_HEADER_NAVIGATION_ROW} svg {
    width: 24px;
    height: 24px;
    fill: ${Colors.black};
  }

  .${ELEMENT_HEADER_UTILITY_ROW} {
    display: flex;
    justify-content: flex-end;
    margin-bottom: ${Spacing.sm};
  }

  .${ELEMENT_HEADER_UTILITY_ROW} ::slotted(*) {
    display: flex;
    justify-content: flex-end;
    gap: ${Spacing.md};
  }
`;

const LogoColumnStyles = `
  .${ELEMENT_HEADER_LOGO_COLUMN} {
    align-items: center;
    display: flex;
    justify-content: flex-start;
    position: relative;
  }

  .${ELEMENT_HEADER_MENU_BUTTON} {
    border-right: 1px solid ${Colors.gray.light};
    padding-right: ${Spacing.min};
    margin-right: ${Spacing.sm};
  }

  .${ELEMENT_HEADER_LOGO} {
    display: block;
    max-width: 350px;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HEADER_LOGO}`]: SansLarger,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HEADER_LOGO} *`]: SansLarger,
    },
  })}

  .${ELEMENT_HEADER_LOGO},
  .${ELEMENT_HEADER_LOGO} * {
    line-height: 1.05em;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HEADER_LOGO}[size="large"]`]: SansExtraLarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HEADER_LOGO}[size="large"] *`]: SansExtraLarge,
    },
  })}

  .${ELEMENT_HEADER_LOGO},
  .${ELEMENT_HEADER_LOGO} * {
    font-weight: 700;
  }

  .${ELEMENT_HEADER_LOGO} img {
    width: 100%;
    max-height: 48px;
    max-width: 190px;
  }

  @media (min-width: ${Breakpoints.tablet.min}) {
    .${ELEMENT_HEADER_LOGO} img {
      max-width: 240px;
    }
  }
`;

const WrapperStyles = `
  .${ELEMENT_HEADER_WRAPPER} {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: ${Spacing.lg};
    z-index: 999;
  }
`;

const STYLES_NAVIGATION_HEADER = `
  .${ELEMENT_HEADER_CONTAINTER} {
    background-color: ${Colors.white};
    display: block;
    padding: ${Spacing.md} 0;
    position: relative;
    transition: padding ${ANIMATION_TIME}ms;
  }

  ${WrapperStyles}
  ${LogoColumnStyles}
  ${NavigationColumnStyles}
  ${OverwriteStickyStyles}
  ${NavigationElements.Item.Styles}
  ${MenuButton.Styles}
`;

const CreateSearchLink = ({ searchUrl }: TypeSearchLink) => {
  if (!searchUrl) return null;

  const searchLink = document.createElement('a');

  searchLink.href = searchUrl;
  searchLink.ariaLabel = 'Visit the search page';
  searchLink.innerHTML = AssetIcon.MAGNIFY_GLASS;

  return searchLink;
};

const CreateNavigationColumn = ({
  navRow,
  utilityRow,
  searchUrl,
}: TypeNavRow) => {
  if (!navRow) return null;

  const navColumnContainer = document.createElement('div');
  const utilityRowContainer = document.createElement('div');
  const navRowContainer = document.createElement('div');
  const searchLink = CreateSearchLink({
    searchUrl,
  });

  if (utilityRow) {
    utilityRowContainer.classList.add(ELEMENT_HEADER_UTILITY_ROW);
    utilityRowContainer.appendChild(utilityRow);
    navColumnContainer.appendChild(utilityRowContainer);
  }

  const navItems = Array.from(navRow.querySelectorAll('umd-element-nav-item'));
  const createdNavItems = navItems.map((navItem) => {
    const primaryLinkContainer = navItem.querySelector(
      '[slot="primary-link"]',
    ) as HTMLElement;
    const dropdownLinksContainer = navItem.querySelector(
      '[slot="dropdown-links"]',
    ) as HTMLElement;

    return NavigationElements.Item.CreateElement({
      primaryLinkContainer,
      dropdownLinksContainer,
    });
  });

  navRowContainer.classList.add(ELEMENT_HEADER_NAVIGATION_ROW);
  navRowContainer.append(...createdNavItems);
  if (searchLink) navRowContainer.appendChild(searchLink);

  navColumnContainer.classList.add(ELEMENT_HEADER_NAVIGATION_COLUMN);
  navColumnContainer.appendChild(navRowContainer);

  return navColumnContainer;
};

const CreateLogoColumn = ({ logo, eventOpen }: TypeLogoRequirments) => {
  const container = document.createElement('div');

  if (eventOpen) {
    const menuButton = MenuButton.CreateElement({ eventOpen });
    menuButton.classList.add(ELEMENT_HEADER_MENU_BUTTON);
    container.appendChild(menuButton);
  }

  if (logo) {
    const childrenText = Array.from(logo.children).reduce((acc, child) => {
      if (child.nodeName === 'IMG') return acc;

      if (child.textContent) {
        return acc + child.textContent.length;
      }

      return acc;
    }, 0);
    logo.classList.add(ELEMENT_HEADER_LOGO);

    if (childrenText < 30) {
      logo.setAttribute('size', 'large');
    }

    container.appendChild(logo);
  }
  container.classList.add(ELEMENT_HEADER_LOGO_COLUMN);
  return container;
};

const CreateNavigationHeader = (props: TypeHeaderRequirements) => {
  const declaration = document.createElement('div');
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const logoColumn = CreateLogoColumn(props);
  const navigationColumn = CreateNavigationColumn(props);
  const eventSticky = ({ isSticky }: { isSticky: boolean }) => {
    const utility = container.querySelector(
      `.${ELEMENT_HEADER_UTILITY_ROW}`,
    ) as HTMLDivElement;

    if (isSticky && isElementSticky) return;

    if (isSticky) {
      isElementSticky = true;
      container.setAttribute(ATTRIBUTE_STICKY, 'true');

      if (utility) {
        utility.style.display = 'none';
      }
    }
    if (!isSticky) {
      isElementSticky = false;
      container.removeAttribute(ATTRIBUTE_STICKY);

      if (utility) {
        utility.style.display = 'block';
      }
    }
  };
  let isElementSticky = false;

  wrapper.classList.add(ELEMENT_HEADER_WRAPPER);
  wrapper.appendChild(logoColumn);

  if (navigationColumn) wrapper.appendChild(navigationColumn);

  container.appendChild(wrapper);
  container.classList.add(ELEMENT_HEADER_CONTAINTER);

  declaration.classList.add(ELEMENT_HEADER_DECLARATION);
  declaration.appendChild(container);

  return {
    element: declaration,
    events: {
      sticky: eventSticky,
    },
  };
};

export default {
  CreateElement: CreateNavigationHeader,
  Styles: STYLES_NAVIGATION_HEADER,
};
