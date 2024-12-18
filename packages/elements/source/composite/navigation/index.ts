import { Tokens, Typography } from '@universityofmaryland/variables';
import { Asset, Styles } from 'utilities';
import MenuButton from './elements/menu-button';
import NavigationItem from './elements/item/';

type TypeLogoRequirments = {
  logo?: HTMLElement | null;
  eventOpen?: () => void;
};

type TypeSearchLink = {
  searchUrl: string | null;
};

type TypeCtaLink = {
  ctaUrl: string | null;
  ctaText: string | null;
};

type TypeNavRow = TypeSearchLink &
  TypeCtaLink & {
    utilityRow?: HTMLElement | null;
    navItems?: HTMLElement[];
  };

type TypeHeaderRequirements = TypeLogoRequirments & TypeNavRow;

const { Colors, Spacing, Breakpoints, FontWeight, FontSize } = Tokens;
const { SansLarger, SansExtraLarge } = Typography;
const { convertJSSObjectToStyles } = Styles;
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
const ELEMENT_HEADER_MENU_CTA = 'element-header-menu-cta';
const ELEMENT_HEADER_MENU_SEARCH = 'element-header-menu-search';
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

const CtaStyles = `
  .${ELEMENT_HEADER_MENU_CTA} {
    color: ${Colors.white};
    font-weight: ${FontWeight.bold};
    font-size: ${FontSize.sm};
    padding: ${Spacing.xs};
    background-color: ${Colors.red};
    transition: background .5s;
  }

  .${ELEMENT_HEADER_MENU_CTA}:hover,
  .${ELEMENT_HEADER_MENU_CTA}:focus {
    background-color: ${Colors.redDark};
  }
`;

const NavigationColumnStyles = `
  @media (max-width: ${Breakpoints.tablet.max}) {
    .${ELEMENT_HEADER_NAVIGATION_COLUMN} {
      display: none;
    }
  }

  .${ELEMENT_HEADER_NAVIGATION_ROW} {
    display: flex;
    justify-content flex-end;
    align-items: center;
    gap: ${Spacing.md};
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

  .${ELEMENT_HEADER_MENU_SEARCH} {
    margin-left: ${Spacing.md};
  }
`;

const LogoColumnStyles = `
  .${ELEMENT_HEADER_LOGO_COLUMN} {
    align-items: center;
    display: flex;
    justify-content: flex-start;
    position: relative;
    width: 100%;
    max-width: 400px;
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

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HEADER_LOGO}`]: SansLarger,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HEADER_LOGO} *`]: SansLarger,
    },
  })}

  .${ELEMENT_HEADER_LOGO},
  .${ELEMENT_HEADER_LOGO} * {
    line-height: 1.05em;
    width: 100%;
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HEADER_LOGO}[size="large"]`]: SansExtraLarge,
    },
  })}

  ${convertJSSObjectToStyles({
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
  ${CtaStyles}
  ${OverwriteStickyStyles}
  ${NavigationItem.Styles}
  ${MenuButton.Styles}
`;

const CreateSearchLink = ({ searchUrl }: TypeSearchLink) => {
  if (!searchUrl) return null;

  const searchLink = document.createElement('a');

  searchLink.href = searchUrl;
  searchLink.ariaLabel = 'Visit the search page';
  searchLink.innerHTML = Asset.icon.MAGNIFY_GLASS;
  searchLink.classList.add(ELEMENT_HEADER_MENU_SEARCH);

  return searchLink;
};

const CreateCtaLink = ({ ctaUrl, ctaText }: TypeCtaLink) => {
  if (!ctaUrl || !ctaText) return null;

  const cta = document.createElement('a');

  cta.innerHTML = ctaText;
  cta.setAttribute('target', '_blank');
  cta.setAttribute('href', ctaUrl);
  cta.classList.add(ELEMENT_HEADER_MENU_CTA);

  return cta;
};

const CreateNavigationColumn = ({
  utilityRow,
  navItems,
  searchUrl,
  ctaText,
  ctaUrl,
}: TypeNavRow) => {
  if (!navItems) return;

  const navColumnContainer = document.createElement('div');
  const utilityRowContainer = document.createElement('div');
  const navRowContainer = document.createElement('div');
  const searchLink = CreateSearchLink({
    searchUrl,
  });
  const ctaLink = CreateCtaLink({ ctaText, ctaUrl });

  if (utilityRow) {
    utilityRowContainer.classList.add(ELEMENT_HEADER_UTILITY_ROW);
    utilityRowContainer.appendChild(utilityRow);
    navColumnContainer.appendChild(utilityRowContainer);
  }

  navRowContainer.classList.add(ELEMENT_HEADER_NAVIGATION_ROW);

  navItems.forEach((item) => {
    navRowContainer.appendChild(item);
  });
  if (searchLink) navRowContainer.appendChild(searchLink);
  if (ctaLink) navRowContainer.appendChild(ctaLink);

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
