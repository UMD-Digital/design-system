import * as token from '@universityofmaryland/web-token-library';
import * as elementStyles from '@universityofmaryland/web-styles-library/element';
import * as layout from '@universityofmaryland/web-styles-library/layout';
import {
  jssToCSS,
  jssEntryToCSS,
} from '@universityofmaryland/web-utilities-library/styles';
import { handleKeyboardNavigation } from '@universityofmaryland/web-utilities-library/events';
import { search as iconSearch } from '@universityofmaryland/web-icons-library/search';
import { chevron_down as iconChevronDown } from '@universityofmaryland/web-icons-library/controls';
import {
  createNavAlert,
  STYLES_NAV_ALERT,
  ALERT_CONSTANTS,
  TypeAlertProps,
} from './alert';
import { createCompositeNavigationSearch as UtilitySearch } from './search';

type TypeMenuItemsRequirements = {
  alertUrl?: string | null;
  giftUrl?: string;
  isAdmissionsFeed: boolean;
  isAlertOff?: boolean;
  isEventsFeed: boolean;
  isGiftsFeed: boolean;
  isLockFull?: boolean;
  isNewsFeed: boolean;
  isSchoolsFeed: boolean;
  isSearch: boolean;
  isSearchDomain?: boolean;
};

type TypeUtilityRequirements = TypeMenuItemsRequirements & TypeAlertProps;

const flagIcon = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28"><title>Flag</title><path d="M5 4c0 .72-.39 1.36-1 1.72V25.5c0 .266-.234.5-.5.5h-1c-.266 0-.5-.234-.5-.5V5.72c-.61-.36-1-1-1-1.72 0-1.11.89-2 2-2s2 .89 2 2zm23 1v11.922c0 .578-.36.797-.812 1.03-1.766.954-3.72 1.814-5.766 1.814-2.875 0-4.25-2.188-7.656-2.188-2.484 0-5.094 1.125-7.25 2.28-.172.095-.328.142-.516.142-.547 0-1-.453-1-1V7.406c0-.375.187-.64.484-.86.375-.25.828-.468 1.234-.67 1.97-1 4.36-1.876 6.578-1.876 2.453 0 4.375.812 6.547 1.828.438.22.89.297 1.375.297C23.67 6.125 26.312 4 26.998 4c.548 0 1 .453 1 1z"></path></svg>`;
const homeIcon = `<svg aria-hidden="true"  xmlns="http://www.w3.org/2000/svg" width="26" height="28" viewBox="0 0 26 28"><title>School</title><path d="M22 15.5V23c0 .547-.453 1-1 1h-6v-6h-4v6H5c-.547 0-1-.453-1-1v-7.5c0-.03.016-.063.016-.094L13 8l8.984 7.406c.016.03.016.063.016.094zm3.484-1.078l-.97 1.156c-.077.094-.202.156-.327.172h-.047c-.125 0-.234-.03-.328-.11L13 6.626 2.185 15.64c-.11.08-.234.126-.375.11-.124-.016-.25-.078-.327-.172l-.97-1.156c-.17-.203-.14-.53.064-.703L11.81 4.36c.657-.547 1.72-.547 2.376 0L18 7.547V4.5c0-.28.218-.5.5-.5h3c.28 0 .5.22.5.5v6.375l3.42 2.844c.204.17.235.5.064.702z"></path></svg>`;
const starIcon = `<svg aria-hidden="true"  xmlns="http://www.w3.org/2000/svg" width="26" height="28" viewBox="0 0 26 28"><title>Star</title><path d="M26 10.11c0 .28-.203.546-.406.75l-5.672 5.53 1.344 7.812c.016.11.016.203.016.313 0 .406-.187.78-.64.78-.22 0-.44-.077-.626-.186L13 21.42 5.984 25.11c-.203.108-.406.186-.625.186-.454 0-.657-.375-.657-.78 0-.11.016-.204.03-.314L6.08 16.39.39 10.86c-.187-.204-.39-.47-.39-.75 0-.47.483-.657.874-.72l7.844-1.14 3.516-7.11c.14-.297.406-.64.766-.64s.625.343.766.64l3.516 7.11 7.844 1.14c.375.063.875.25.875.72z"></path></svg>`;
const calendarIcon = `<svg aria-hidden="true"  xmlns="http://www.w3.org/2000/svg" width="26" height="28" viewBox="0 0 26 28"><title>Calendar</title><path d="M2 26h22V10H2v16zM8 7V2.5c0-.28-.22-.5-.5-.5h-1c-.28 0-.5.22-.5.5V7c0 .28.22.5.5.5h1c.28 0 .5-.22.5-.5zm12 0V2.5c0-.28-.22-.5-.5-.5h-1c-.28 0-.5.22-.5.5V7c0 .28.22.5.5.5h1c.28 0 .5-.22.5-.5zm6-1v20c0 1.094-.906 2-2 2H2c-1.094 0-2-.906-2-2V6c0-1.094.906-2 2-2h2V2.5C4 1.125 5.125 0 6.5 0h1C8.875 0 10 1.125 10 2.5V4h6V2.5C16 1.125 17.125 0 18.5 0h1C20.875 0 22 1.125 22 2.5V4h2c1.094 0 2 .906 2 2z"></path></svg>`;
const mIcon = `<svg aria-hidden="true"  xmlns="http://www.w3.org/2000/svg" width="24" height="28" viewBox="0 0 35 28"><title>Gift</title><path d="M16 1.4C7.937 1.4 1.4 7.937 1.4 16S7.937 30.6 16 30.6c8.063 0 14.6-6.537 14.6-14.6S24.063 1.4 16 1.4zm3.38 22.66v-2.55h2L21 13l-4.68 8.36h-.38L11.11 13l-.27 8.55h2v2.55H6.08v-2.55H8l.45-11.5H6.42V7.5h4.54l5.16 9.19 5-9.27h4.51v2.55h-2.04l.61 11.49h2v2.55z"></path></svg>`;

const TABLET = 768;
const DESKTOP = 1024;
const ANIMATION_OUT_SPEED = 400;
const ANIMATION_IN_SPEED = 800;

const ATTRIBUTE_LOCK = 'lock';
const WITH_ITEMS = 'data-items';
const LOCK_FULL = 'full';

const ELEMENT_NAME = 'umd-element-utility-header';

const IS_LOCK_FULL = `[${ATTRIBUTE_LOCK}=${LOCK_FULL}]`;
const IS_HAS_ITEMS = `[${WITH_ITEMS}="true"]`;
const IS_WITHOUT_ITEMS = `[${WITH_ITEMS}="false"]`;

const ELEMENT_UTILITY_DECLARATION = 'element-utility-declaration';
const ELEMENT_UTILITY_CONTAINTER = 'element-utility-container';
const ELEMENT_UTILITY_LOCK = 'umd-element-nav-utility-lock';
const ELEMENT_UTILITY_WRAPPER = 'umd-element-nav-utility-wrapper';
const ELEMENT_UTILITY_LOGO = 'umd-element-nav-utility-logo';
const ELEMENT_UTILITY_LOGO_COLUMN = 'umd-element-nav-utility-logo-column';
const ELEMENT_UTILITY_MENU = 'umd-element-nav-utility-menu';
const ELEMENT_UTILITY_MOBILE_MENU = 'umd-element-nav-utility-mobile-menu';
const ELEMENT_UTILITY_MOBILE_BUTTON = 'umd-element-nav-utility-mobile-button';
const ELEMENT_UTILITY_SEARCH_BUTTON = 'umd-element-nav-utility-search-button';

const OVERWRITE_LOCK_FULL = `.${ELEMENT_UTILITY_CONTAINTER}${IS_LOCK_FULL} .${ELEMENT_UTILITY_LOCK}`;

const OVERWRITE_CONTAINER_WITH_ITEMS = `.${ELEMENT_UTILITY_CONTAINTER}${IS_HAS_ITEMS}`;
const OVERWRITE_CONTAINER_WITHOUT_ITEMS = `.${ELEMENT_UTILITY_CONTAINTER}${IS_WITHOUT_ITEMS}`;
const OVERWRIE_WRAPPER_WITH_ITEMS = `${OVERWRITE_CONTAINER_WITH_ITEMS} .${ELEMENT_UTILITY_WRAPPER}`;
const OVERWRIE_WRAPPER_WITHOUT_ITEMS = `${OVERWRITE_CONTAINER_WITHOUT_ITEMS} .${ELEMENT_UTILITY_WRAPPER}`;

const isDesktop = () => window.innerWidth >= DESKTOP;

const TOP_TWENTY_TEXT = `A Top 20 Public Research University`;

// prettier-ignore
const LockStyles = `
  ${jssToCSS({
    styleObj: {
      [`.${ELEMENT_UTILITY_LOCK}`]: layout.space.horizontal.larger,
    },
  })}

  ${jssToCSS({
    styleObj: {
      [`${OVERWRITE_LOCK_FULL}`]: layout.space.horizontal.full,
    },
  })}
`;

// prettier-ignore
const WrapperStyles = `
  .${ELEMENT_UTILITY_WRAPPER} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    min-height: 44px;
  }

  .${ELEMENT_UTILITY_WRAPPER} > a {
    color: ${token.color.white};
    text-transform: uppercase;
  }

  .${ELEMENT_UTILITY_WRAPPER} > a:hover,
  .${ELEMENT_UTILITY_WRAPPER} > a:focus {
    text-decoration: underline;
  }

  ${OVERWRIE_WRAPPER_WITHOUT_ITEMS} {
    display: flex;
    justify-content: center;
    justify-self: center;
  }
`;

// prettier-ignore
const MenuStyles = `
  .${ELEMENT_UTILITY_MENU} {
    display: flex;
  }

  @container (max-width: ${DESKTOP - 1}px) {
    .${ELEMENT_UTILITY_MENU} {
      flex-direction: column;
    }
  }

  @container (min-width: ${DESKTOP}px) {
    .${ELEMENT_UTILITY_MENU} {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .${ELEMENT_UTILITY_MENU} a {
    color: ${token.color.white};
    text-decoration: none;
    text-transform: uppercase;
  }

  .${ELEMENT_UTILITY_MENU} > * {
    display: flex;
    align-items: center;
    gap: 4px;
    height: 100%;
    padding: ${token.spacing.min} ${token.spacing.sm};
    font-weight: 700;
    font-size: 13px;
    transition: background ${ANIMATION_IN_SPEED}ms;
  }

  @container (min-width: ${DESKTOP}px) {
   .${ELEMENT_UTILITY_MENU} > * {
      justify-content: space-between;
    }
  }

  .${ELEMENT_UTILITY_MENU} > *[aria-expanded="true"] {
    background-color: ${token.color.redDark};
  }

  @container (max-width: ${DESKTOP - 1}px) {
    .${ELEMENT_UTILITY_CONTAINTER} .${ELEMENT_UTILITY_MENU} > * {
      border-top: 1px solid ${token.color.gray.lighter};
      color: ${token.color.red};
      order: 2;
      transition: background ${ANIMATION_OUT_SPEED}ms, color ${ANIMATION_OUT_SPEED}ms;
    }
  }

  @container (max-width: ${DESKTOP - 1}px) {
    .${ELEMENT_UTILITY_MENU} > *:first-child {
      border-top: none;
    }
  }

  @container (max-width: ${DESKTOP - 1}px) {
    .${ELEMENT_UTILITY_MENU} > a:hover,
    .${ELEMENT_UTILITY_MENU} > a:focus {
      background-color: ${token.color.red};
      color: ${token.color.white};
      transition: background ${ANIMATION_IN_SPEED}ms, color ${ANIMATION_IN_SPEED}ms;
    }
  }

  @container (min-width: ${DESKTOP}px) {
    .${ELEMENT_UTILITY_MENU} > *:hover,
    .${ELEMENT_UTILITY_MENU} > *:focus {
      background-color: ${token.color.redDark};
    }
  }

  @container (max-width: ${DESKTOP - 1}px) {
    .${ELEMENT_UTILITY_MENU} > a:hover svg,
    .${ELEMENT_UTILITY_MENU} > a:focus svg {
      fill: ${token.color.white};
    }
  }

  .${ELEMENT_UTILITY_SEARCH_BUTTON} svg {
    height: 22px;
    width: inherit;
  }

  @container (max-width: ${DESKTOP - 1}px) {
    .${ELEMENT_UTILITY_SEARCH_BUTTON} {
      display: none;
    }
  }

  .${ELEMENT_UTILITY_MENU} svg {
    max-width: 15px;
    transition: fill ${ANIMATION_OUT_SPEED}ms;
  }

  @container (max-width: ${DESKTOP - 1}px) {
    .${ELEMENT_UTILITY_MENU} svg {
      fill: ${token.color.red};
      transition: fill ${ANIMATION_IN_SPEED}ms;
    }
  }

  @container (min-width: ${DESKTOP}px) {
    .${ELEMENT_UTILITY_MENU} svg {
      fill: ${token.color.white};
    }
  }
`;

// prettier-ignore
const MobileMenuStyles = `
  @container (max-width: ${DESKTOP - 1}px) {
    .${ELEMENT_UTILITY_MOBILE_MENU} {
      position: absolute;
      left: -${token.spacing['2xl']};
      right: -${token.spacing['2xl']};
      top: 44px;
      box-shadow: 0 5px 5px 1px rgba(0, 0, 0, .2);
      height: 0;
      overflow: hidden;
      transition: height ${ANIMATION_OUT_SPEED}ms;
      display: flex;
      flex-direction: column;
      background-color: ${token.color.white};
    }
  }

  @container (max-width: ${TABLET - 1}px) {
    .${ELEMENT_UTILITY_MOBILE_MENU} {
      left: -${token.spacing.md};
      right: -${token.spacing.md};
    }
  }

  @container (min-width: ${DESKTOP}px) {
    .${ELEMENT_UTILITY_MOBILE_MENU} {
      display: flex;
      height: inherit !important;
      margin-left: auto;
      position: relative;
      margin-right: -${token.spacing.md};
    }
  }

  @container (max-width: ${DESKTOP - 1}px) {
    .${ELEMENT_UTILITY_MOBILE_MENU}[aria-hidden="true"] {
      transition: height ${ANIMATION_OUT_SPEED}ms;
      display: none;
    }
  }

  @container (max-width: ${DESKTOP - 1}px) {
    .${ELEMENT_UTILITY_MOBILE_MENU}[aria-hidden="false"] {
      transition: height ${ANIMATION_IN_SPEED}ms;
    }
  }

  @container (max-width: ${DESKTOP - 1}px) {
    .${ELEMENT_UTILITY_MOBILE_MENU} > button {
      display: none;
    }
  }

  @container (min-width: ${DESKTOP}px) {
    .${ELEMENT_UTILITY_MOBILE_MENU} > button {
      transition: background ${ANIMATION_OUT_SPEED}ms;
    }
  }
`

// prettier-ignore
const MobileButtonStyles = `
  .${ELEMENT_UTILITY_MOBILE_BUTTON} {
    margin-left: auto;
    height: 100%;
    padding: ${token.spacing.xs} ${token.spacing.md};
    margin-right: -${token.spacing.md};
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: ${TABLET}px) {
    margin-right: -${token.spacing['2xl']};
  }

  @container (min-width: ${DESKTOP}px) {
    .${ELEMENT_UTILITY_MOBILE_BUTTON} {
      display: none;
    }
  }

  .${ELEMENT_UTILITY_MOBILE_BUTTON}:hover,
  .${ELEMENT_UTILITY_MOBILE_BUTTON}:focus {
    background-color: ${token.color.redDark};
  }

  @container (max-width: ${DESKTOP - 1}px) {
    .${ELEMENT_UTILITY_MOBILE_BUTTON} svg {
      fill: ${token.color.white};
      width: 18px;
      height: 18px;
    }
  }
`;

// prettier-ignore
const LogoStyles = `
  .${ELEMENT_UTILITY_LOGO_COLUMN} {
    display: flex;
    opacity: 0;
    transition: opacity .3s ease-in;
    padding: 10px 0;
  }

  @media (max-width: ${TABLET - 1}px) {
    .${ELEMENT_UTILITY_LOGO_COLUMN} {
      flex-direction: column;
      gap: ${token.spacing.min};
      text-align: center;
    }
  }

  @media (min-width: ${TABLET}px) {
    .${ELEMENT_UTILITY_LOGO_COLUMN} {
      align-items: center;
      gap: ${token.spacing.xs};
    }
  }

  .${ELEMENT_UTILITY_LOGO_COLUMN} * {
    color: ${token.color.white};

  }

  .${ELEMENT_UTILITY_LOGO_COLUMN} > p {
    display: block;
    font-size: 11px;
  }

  @media (max-width: ${TABLET - 1}px) {
    ${OVERWRIE_WRAPPER_WITH_ITEMS} .${ELEMENT_UTILITY_LOGO_COLUMN} > p {
      display: none;
    }
  }

  @media (min-width: ${TABLET}px) {
    .${ELEMENT_UTILITY_LOGO_COLUMN} > p {
      position: relative;
      font-size: 13px;
    }

    .${ELEMENT_UTILITY_LOGO_COLUMN} > p:before {
      content: '';
      position: absolute;
      left: -7px;
      height: 100%;
      width: 1px;
      background-color: ${token.color.white};
    }
  }

  .${ELEMENT_UTILITY_LOGO} {
    font-family: Crimson Text, Georgia, serif;
    letter-spacing: 1px;
    font-size: 14px;
    text-transform: uppercase;
  }
`;

let STYLES_NAVIGATION_UTILITY = `
  .${ELEMENT_UTILITY_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_UTILITY_CONTAINTER} {
    display: block;
    background-color: ${token.color.red};
    position: relative;
    z-index: 999;
  }

  ${LockStyles}
  ${WrapperStyles}
  ${LogoStyles}
  ${MenuStyles}
  ${MobileButtonStyles}
  ${MobileMenuStyles}
  ${STYLES_NAV_ALERT}
  ${UtilitySearch.Styles}
`;

const CreateSearchFormButton = ({
  expandElement,
}: {
  expandElement: HTMLDivElement | HTMLFormElement;
}) => {
  const button = document.createElement('button');
  const elements = Array.from(expandElement.querySelectorAll('div'));
  let focusCallback = () => {};

  const eventClose = () => {
    expandElement.style.height = `0`;

    setTimeout(() => {
      expandElement.style.display = 'none';
      expandElement.setAttribute('aria-hidden', 'true');
      button.setAttribute('aria-expanded', 'false');
      button.focus();

      if (focusCallback) {
        focusCallback();
        focusCallback = () => {};
      }
    }, ANIMATION_OUT_SPEED + 100);
  };

  const eventOpen = () => {
    const focusElement = expandElement.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement;

    expandElement.style.display = 'block';

    setTimeout(() => {
      const size = elements.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.offsetHeight;
      }, 0);

      expandElement.setAttribute('aria-hidden', 'false');
      expandElement.style.height = `${size}px`;
      button.setAttribute('aria-expanded', 'true');
      if (focusElement) focusElement.focus();
    }, 100);

    focusCallback = handleKeyboardNavigation({
      element: expandElement,
      action: () => eventClose(),
    });
  };

  button.setAttribute('aria-label', 'enable the search form');
  button.setAttribute('type', 'button');
  button.innerHTML = `${iconSearch}`;
  button.setAttribute('aria-controls', UtilitySearch.Elements.form);
  button.classList.add(ELEMENT_UTILITY_SEARCH_BUTTON);
  button.setAttribute('aria-expanded', 'false');

  button.addEventListener('click', () => {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      eventClose();
    } else {
      eventOpen();
    }
  });

  return button;
};

const CreateMobileMenuButton = ({
  expandElement,
}: {
  expandElement: HTMLDivElement;
}) => {
  const button = document.createElement('button');
  let focusCallback = () => {};

  const eventClose = () => {
    expandElement.style.height = `0`;

    setTimeout(() => {
      expandElement.style.display = 'none';
      expandElement.setAttribute('aria-hidden', 'true');
      button.setAttribute('aria-expanded', 'false');
      button.focus();

      if (focusCallback) {
        focusCallback();
        focusCallback = () => {};
      }
    }, ANIMATION_OUT_SPEED + 100);
  };

  const eventOpen = () => {
    const wrapper = expandElement.querySelector(
      `.${ELEMENT_UTILITY_MENU}`,
    ) as HTMLElement;
    const focusElement = expandElement.querySelector('a') as HTMLAnchorElement;

    expandElement.style.display = 'block';

    setTimeout(() => {
      expandElement.setAttribute('aria-hidden', 'false');
      expandElement.style.height = `${wrapper.offsetHeight}px`;
      button.setAttribute('aria-expanded', 'true');
      if (focusElement) focusElement.focus();
    }, 100);

    focusCallback = handleKeyboardNavigation({
      element: expandElement,
      action: () => eventClose(),
    });
  };

  button.innerHTML = `${iconChevronDown}`;
  button.setAttribute('type', 'button');
  button.setAttribute('aria-label', 'toggle mobile menu');
  button.setAttribute('aria-controls', `${ELEMENT_UTILITY_MOBILE_MENU}`);
  button.classList.add(ELEMENT_UTILITY_MOBILE_BUTTON);

  button.addEventListener('click', () => {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      eventClose();
    } else {
      eventOpen();
    }
  });

  return button;
};

const createLogoElement = () => {
  const logo = document.createElement('a');

  logo.innerHTML = 'University of Maryland';
  logo.setAttribute('href', 'https://umd.edu');
  logo.setAttribute('target', '_blank');
  logo.setAttribute('rel', 'noopener noreferrer');
  logo.classList.add(ELEMENT_UTILITY_LOGO);

  return logo;
};

const createLogoColumn = () => {
  const container = document.createElement('div');
  const text = document.createElement('p');
  const logo = createLogoElement();

  text.innerHTML = TOP_TWENTY_TEXT;

  container.appendChild(logo);
  container.appendChild(text);
  container.classList.add(ELEMENT_UTILITY_LOGO_COLUMN);

  setTimeout(() => {
    container.style.opacity = '1';
  }, 400);

  return container;
};

const CreateMenuItems = ({
  isAdmissionsFeed,
  isEventsFeed,
  isGiftsFeed,
  isNewsFeed,
  isSchoolsFeed,
  isSearch,
  giftUrl,
  isSearchDomain,
}: TypeMenuItemsRequirements) => {
  const container = document.createElement('div');

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
    } catch (e) {
      return false;
    }
    return true;
  };

  const makeLinkElement = ({
    name,
    icon,
    url,
  }: {
    name: string;
    icon: string;
    url: string;
  }) => {
    const tag = document.createElement('a');

    tag.setAttribute('href', url);
    tag.setAttribute('target', '_blank');
    tag.setAttribute('rel', 'noopener noreferrer');
    tag.innerHTML = `${icon} <span>${name}</span>`;

    return tag;
  };

  let hasItems = false;

  if (isAdmissionsFeed) {
    hasItems = true;

    container.appendChild(
      makeLinkElement({
        name: 'Admissions',
        url: 'https://umd.edu/admissions',
        icon: flagIcon,
      }),
    );
  }

  if (isSchoolsFeed) {
    hasItems = true;

    container.appendChild(
      makeLinkElement({
        name: 'Colleges & Schools',
        url: 'https://umd.edu/colleges-and-schools',
        icon: homeIcon,
      }),
    );
  }

  if (isNewsFeed) {
    hasItems = true;

    container.appendChild(
      makeLinkElement({
        name: 'News',
        url: 'https://today.umd.edu/',
        icon: starIcon,
      }),
    );
  }

  if (isEventsFeed) {
    hasItems = true;

    container.appendChild(
      makeLinkElement({
        name: 'Events',
        url: 'https://calendar.umd.edu',
        icon: calendarIcon,
      }),
    );
  }

  if (isGiftsFeed) {
    hasItems = true;
    const getURL = () => {
      const defaultURL = 'https://giving.umd.edu/giving';

      if (!giftUrl) return defaultURL;

      const validURL = giftUrl ? isValidUrl(giftUrl) : null;
      return validURL ? giftUrl : defaultURL;
    };

    container.appendChild(
      makeLinkElement({
        name: 'Make a Gift',
        url: getURL(),
        icon: mIcon,
      }),
    );
  }

  if (isSearch || isSearchDomain) {
    hasItems = true;
    const formElement = UtilitySearch.CreateElement({ isSearchDomain });
    const button = CreateSearchFormButton({
      expandElement: formElement,
    });

    container.appendChild(button);
    container.appendChild(formElement);
  }

  container.classList.add(ELEMENT_UTILITY_MENU);

  if (!hasItems) return null;

  return container;
};

const CreateNavigationUtility = (props: TypeUtilityRequirements) =>
  (() => {
    {
      const { isLockFull, isAlertOff } = props;
      const declaration = document.createElement('div');
      const container = document.createElement('div');
      const lock = document.createElement('div');
      const wrapper = document.createElement('div');
      const logoColumn = createLogoColumn();

      const secondaryCta = {
        ...elementStyles.action.secondary.normal,
        className: `${ALERT_CONSTANTS.ELEMENTS.CTA}`,
      };

      let styles = STYLES_NAVIGATION_UTILITY + jssEntryToCSS(secondaryCta);

      const setLayout = () => {
        const menuItems = CreateMenuItems({ ...props });
        const mobileMenu = document.createElement('div');
        const mobileMenuButton = CreateMobileMenuButton({
          expandElement: mobileMenu,
        });

        mobileMenu.setAttribute('id', `${ELEMENT_UTILITY_MOBILE_MENU}`);
        mobileMenu.classList.add(ELEMENT_UTILITY_MOBILE_MENU);
        mobileMenu.setAttribute('aria-hidden', (!isDesktop()).toString());

        if (menuItems) {
          mobileMenu.appendChild(menuItems);
          wrapper.appendChild(mobileMenuButton);
          wrapper.appendChild(mobileMenu);
          container.setAttribute(WITH_ITEMS, 'true');
        } else {
          container.setAttribute(WITH_ITEMS, 'false');
        }
      };

      const resizeEvent = () => {
        const isDesktop = window.innerWidth >= DESKTOP;

        const form = container.querySelector(`.${UtilitySearch.Elements.form}`);
        const menu = container.querySelector(`.${ELEMENT_UTILITY_MOBILE_MENU}`);

        if (!form || !menu) return;

        if (isDesktop) {
          menu.setAttribute('aria-hidden', 'false');
          form.setAttribute('aria-hidden', 'true');
          form.setAttribute('layout', 'desktop');
        } else {
          menu.setAttribute('aria-hidden', 'true');
          form.setAttribute('aria-hidden', 'false');
          form.setAttribute('layout', 'mobile');
        }
      };

      const load = async () => {
        if (!isAlertOff) {
          const alert = await createNavAlert(props);

          if (alert) {
            container.insertBefore(alert?.element, container.firstChild);
          }
        }

        setLayout();
        resizeEvent();
      };

      const showAlert = async () => {
        const isCurrentAlert = container.querySelector(
          `.${ALERT_CONSTANTS.ELEMENTS.CONTAINER}`,
        );

        if (isCurrentAlert) return;

        const alert = await createNavAlert(props);

        if (alert) {
          container.insertBefore(alert?.element, container.firstChild);
        }
      };

      const hideAlert = () => {
        const alert = container.querySelector(
          `.${ALERT_CONSTANTS.ELEMENTS.CONTAINER}`,
        );

        if (alert) {
          alert.remove();
        }
      };

      wrapper.appendChild(logoColumn);
      wrapper.classList.add(ELEMENT_UTILITY_WRAPPER);

      lock.appendChild(wrapper);
      lock.classList.add(ELEMENT_UTILITY_LOCK);

      container.appendChild(lock);
      container.classList.add(ELEMENT_UTILITY_CONTAINTER);
      if (isLockFull) container.setAttribute(ATTRIBUTE_LOCK, LOCK_FULL);

      declaration.appendChild(container);
      declaration.classList.add(ELEMENT_UTILITY_DECLARATION);

      load();
      window.addEventListener('resize', resizeEvent);

      return {
        element: declaration,
        styles,
        events: {
          showAlert,
          hideAlert,
        },
      };
    }
  })();

export const createCompositeNavigationUtility = CreateNavigationUtility;
