import { token, typography } from '@universityofmaryland/web-styles-library';
import * as theme from 'helpers/theme';
import * as assets from 'helpers/assets';
import MenuButton from './elements/menu-button';
import NavigationItem from './elements/item';

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

const ANIMATION_TIME = 500;

const ATTRIBUTE_STICKY = 'data-sticky';
const ATTRIBUTE_CTA = 'data-cta';

const IS_STICKY = `[${ATTRIBUTE_STICKY}="true"]`;
const IS_CTA = `[${ATTRIBUTE_CTA}="true"]`;

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
const OVERWRITE_CTA_WRAPPER = `.${ELEMENT_HEADER_WRAPPER}${IS_CTA}`;
const OVERWRITE_CTA_WRAPPER_NAV_ROW = `${OVERWRITE_CTA_WRAPPER} .${ELEMENT_HEADER_NAVIGATION_ROW}`;
const OVERWRITE_CTA_WRAPPER_CTA = `${OVERWRITE_CTA_WRAPPER} .${ELEMENT_HEADER_MENU_CTA}`;

const OverwriteStickyStyles = `
  ${OVERWRITE_STICKY_CONTAINER} {
    padding: ${token.spacing.xs} 0;
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
    color: ${token.color.white};
    font-weight: ${token.font.weight.bold};
    font-size: ${token.font.size.sm};
    padding: ${token.spacing.xs};
    background-color: ${token.color.red};
    transition: background .5s;
    white-space: nowrap;
  }

  .${ELEMENT_HEADER_MENU_CTA}:hover,
  .${ELEMENT_HEADER_MENU_CTA}:focus {
    background-color: ${token.color.redDark};
  }

  ${OVERWRITE_CTA_WRAPPER_CTA} {
    margin-top: -${token.spacing.min};
  }
`;

const NavigationColumnStyles = `
  @media (max-width: 1240px) {
    .${ELEMENT_HEADER_NAVIGATION_COLUMN} {
      display: none;
    }
  }

  .${ELEMENT_HEADER_NAVIGATION_ROW} {
    display: grid;
    grid-auto-flow: column;
  }

  ${OVERWRITE_CTA_WRAPPER_NAV_ROW} {
    padding-top: ${token.spacing.sm};
  }

  .${ELEMENT_HEADER_NAVIGATION_ROW} > * {
    display: block;
  }

  .${ELEMENT_HEADER_NAVIGATION_ROW} > *:not(:first-child) {
    margin-left: ${token.spacing.md};
  }

  .${ELEMENT_HEADER_NAVIGATION_ROW} svg {
    width: 24px;
    height: 24px;
    fill: ${token.color.black};
  }

  .${ELEMENT_HEADER_UTILITY_ROW} {
    display: flex;
    justify-content: flex-end;
    margin-bottom: ${token.spacing.sm};
  }

  .${ELEMENT_HEADER_UTILITY_ROW} ::slotted(*) {
    display: flex;
    justify-content: flex-end;
    gap: ${token.spacing.md};
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
    border-right: 1px solid ${token.color.gray.light};
    padding-right: ${token.spacing.min};
    margin-right: ${token.spacing.sm};
  }

  .${ELEMENT_HEADER_LOGO} {
    display: grid;
    justify-content: flex-start;
    max-width: 350px;
  }

  .${ELEMENT_HEADER_LOGO}:has(img[src*=".svg"]) img {
    height: 240px;
  }

  ${theme.convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HEADER_LOGO}`]: typography.sans.larger,
    },
  })}

  ${theme.convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HEADER_LOGO} *`]: typography.sans.larger,
    },
  })}

  .${ELEMENT_HEADER_LOGO},
  .${ELEMENT_HEADER_LOGO} * {
    line-height: 1.05em;
    width: 100%;
  }

  ${theme.convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HEADER_LOGO}[size="large"]`]: typography.sans.extraLarge,
    },
  })}

  ${theme.convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HEADER_LOGO}[size="large"] *`]: typography.sans.extraLarge,
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

  @media (min-width: ${token.media.breakpoints.tablet.min}) {
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
    gap: ${token.spacing.lg};
    z-index: 999;
  }
`;

const STYLES_NAVIGATION_HEADER = `
  .${ELEMENT_HEADER_CONTAINTER} {
    background-color: ${token.color.white};
    display: block;
    padding: ${token.spacing.md} 0;
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
  searchLink.innerHTML = assets.icon.MAGNIFY_GLASS;
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
  const { ctaUrl, ctaText } = props;
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
  if (ctaUrl && ctaText) wrapper.setAttribute(ATTRIBUTE_CTA, 'true');

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
