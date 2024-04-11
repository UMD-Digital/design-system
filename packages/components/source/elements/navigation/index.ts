import { Tokens } from '@universityofmaryland/variables';
import { MarkupCreate } from 'utilities';
import MenuButton from './elements/menu-button';

type TypeLogoRequirments = {
  logo?: HTMLElement | null;
  eventOpen?: () => void;
};

type TypeNavRow = {
  navRow?: HTMLElement | null;
};

type TypeHeaderRequirements = TypeLogoRequirments & TypeNavRow;

const { Colors, Spacing, Breakpoints } = Tokens;
const { SlotWithDefaultStyling, Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-header';
const ELEMENT_HEADER_DECLARATION = 'element-header-declaration';
const ELEMENT_HEADER_CONTAINTER = 'element-header-container';
const ELEMENT_HEADER_WRAPPER = 'element-header-wrapper';
const ELEMENT_HEADER_LOGO_COLUMN = 'element-header-logo-column';
const ELEMENT_HEADER_NAVIGATION_COLUMN = 'element-header-navigation-column';
const ELEMENT_HEADER_LOGO = 'element-header-logo';
const ELEMENT_HEADER_DRAWER = 'element-header-drawer';
const ELEMENT_HEADER_NAVIGATION_ROW = 'element-header-navigation-row';

const NavigationColumnStyles = `
  .${ELEMENT_HEADER_NAVIGATION_COLUMN} {
    display: flex;
    alignItems: center;
  }

  @container ${ELEMENT_NAME} (max-width: ${Breakpoints.tablet.max}) {
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

  .${ELEMENT_HEADER_DRAWER} {
    border-right: 1px solid ${Colors.gray.light};
    padding-right: ${Spacing.min};
    margin-right: ${Spacing.sm};
  }

  .${ELEMENT_HEADER_LOGO} {
    display: block;
  }

  .${ELEMENT_HEADER_LOGO} img {
    width: 100%;
    max-width: 160px;
    max-height: 48px;
  }

  @container ${ELEMENT_NAME} (min-width: ${Breakpoints.tablet.min}) {
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
  }
`;

const STYLES_NAVIGATION_HEADER = `
  .${ELEMENT_HEADER_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }
  
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
`;

const CreateUtiltyRow = ({ element }: { element: any }) => {};

const CreateNavigationRow = ({ navRow }: TypeNavRow) => {
  if (!navRow) return null;
  navRow.classList.add(ELEMENT_HEADER_NAVIGATION_ROW);
  return navRow;
};

const CreateNavigationColumn = (props: TypeNavRow) => {
  const container = document.createElement('div');
  const navigationRow = CreateNavigationRow(props);

  if (!navigationRow) return null;

  if (navigationRow) {
    container.appendChild(navigationRow);
  }
  return container;
};

const CreateLogoColumn = ({ logo, eventOpen }: TypeLogoRequirments) => {
  const container = document.createElement('div');

  if (eventOpen) {
    const menuButton = MenuButton.CreateElement({ eventOpen });
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
