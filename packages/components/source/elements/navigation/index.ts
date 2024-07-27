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
};

type TypeHeaderRequirements = TypeLogoRequirments & TypeNavRow;

const { Colors, Spacing, Breakpoints } = Tokens;
const { SansExtraLarge } = Typography;
const { ConvertJSSObjectToStyles } = Styles;

const ELEMENT_HEADER_DECLARATION = 'element-header-declaration';
const ELEMENT_HEADER_CONTAINTER = 'element-header-container';
const ELEMENT_HEADER_WRAPPER = 'element-header-wrapper';
const ELEMENT_HEADER_LOGO_COLUMN = 'element-header-logo-column';
const ELEMENT_HEADER_NAVIGATION_COLUMN = 'element-header-navigation-column';
const ELEMENT_HEADER_LOGO = 'element-header-logo';
const ELEMENT_HEADER_MENU_BUTTON = 'element-header-menu-button';
const ELEMENT_HEADER_NAVIGATION_ROW = 'element-header-navigation-row';

const NavigationColumnStyles = `
  .${ELEMENT_HEADER_NAVIGATION_COLUMN} {
    display: flex;
    align-items: center;
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
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HEADER_LOGO}`]: SansExtraLarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HEADER_LOGO} *`]: SansExtraLarge,
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
    align-items: center;
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
  }
  
  ${WrapperStyles}
  ${LogoColumnStyles}
  ${NavigationColumnStyles}
  ${MenuButton.Styles}
  ${NavigationElements.Item.Styles}
`;

const CreateUtiltyRow = ({ element }: { element: any }) => {};

const CreateSearchLink = ({ searchUrl }: TypeSearchLink) => {
  if (!searchUrl) return null;

  const searchLink = document.createElement('a');

  searchLink.href = searchUrl;
  searchLink.ariaLabel = 'Visit the search page';
  searchLink.innerHTML = AssetIcon.MAGNIFY_GLASS;

  return searchLink;
};

const CreateNavigationColumn = ({ navRow, searchUrl }: TypeNavRow) => {
  if (!navRow) return null;

  const navColumnContainer = document.createElement('div');
  const navRowContainer = document.createElement('div');
  const searchLink = CreateSearchLink({
    searchUrl,
  });

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
    logo.classList.add(ELEMENT_HEADER_LOGO);
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

  wrapper.classList.add(ELEMENT_HEADER_WRAPPER);
  wrapper.appendChild(logoColumn);

  if (navigationColumn) wrapper.appendChild(navigationColumn);

  container.appendChild(wrapper);
  container.classList.add(ELEMENT_HEADER_CONTAINTER);

  declaration.classList.add(ELEMENT_HEADER_DECLARATION);
  declaration.appendChild(container);

  return declaration;
};

export default {
  CreateElement: CreateNavigationHeader,
  Styles: STYLES_NAVIGATION_HEADER,
};
