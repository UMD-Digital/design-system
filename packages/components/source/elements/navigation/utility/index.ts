import { Tokens, Layout } from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import UtilityAlert, { TypeAlertProps } from './alert';
import UtilitySearch from './search';

type TypeMenuItemsRequirements = {
  alertUrl?: string | null;
  hasAdmissions: boolean;
  hasSchools: boolean;
  hasNews: boolean;
  hasEvents: boolean;
  hasGifts: boolean;
  hasSearch: boolean;
  giftUrl?: string;
  searchType?: string;
};

type TypeUtilityRequirements = TypeMenuItemsRequirements & TypeAlertProps & {};

const { ConvertJSSObjectToStyles } = Styles;
const { Colors, Spacing } = Tokens;
const { LockMax } = Layout;

const flagIcon = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28"><title>Flag</title><path d="M5 4c0 .72-.39 1.36-1 1.72V25.5c0 .266-.234.5-.5.5h-1c-.266 0-.5-.234-.5-.5V5.72c-.61-.36-1-1-1-1.72 0-1.11.89-2 2-2s2 .89 2 2zm23 1v11.922c0 .578-.36.797-.812 1.03-1.766.954-3.72 1.814-5.766 1.814-2.875 0-4.25-2.188-7.656-2.188-2.484 0-5.094 1.125-7.25 2.28-.172.095-.328.142-.516.142-.547 0-1-.453-1-1V7.406c0-.375.187-.64.484-.86.375-.25.828-.468 1.234-.67 1.97-1 4.36-1.876 6.578-1.876 2.453 0 4.375.812 6.547 1.828.438.22.89.297 1.375.297C23.67 6.125 26.312 4 26.998 4c.548 0 1 .453 1 1z"></path></svg>`;
const homeIcon = `<svg aria-hidden="true"  xmlns="http://www.w3.org/2000/svg" width="26" height="28" viewBox="0 0 26 28"><title>School</title><path d="M22 15.5V23c0 .547-.453 1-1 1h-6v-6h-4v6H5c-.547 0-1-.453-1-1v-7.5c0-.03.016-.063.016-.094L13 8l8.984 7.406c.016.03.016.063.016.094zm3.484-1.078l-.97 1.156c-.077.094-.202.156-.327.172h-.047c-.125 0-.234-.03-.328-.11L13 6.626 2.185 15.64c-.11.08-.234.126-.375.11-.124-.016-.25-.078-.327-.172l-.97-1.156c-.17-.203-.14-.53.064-.703L11.81 4.36c.657-.547 1.72-.547 2.376 0L18 7.547V4.5c0-.28.218-.5.5-.5h3c.28 0 .5.22.5.5v6.375l3.42 2.844c.204.17.235.5.064.702z"></path></svg>`;
const starIcon = `<svg aria-hidden="true"  xmlns="http://www.w3.org/2000/svg" width="26" height="28" viewBox="0 0 26 28"><title>Star</title><path d="M26 10.11c0 .28-.203.546-.406.75l-5.672 5.53 1.344 7.812c.016.11.016.203.016.313 0 .406-.187.78-.64.78-.22 0-.44-.077-.626-.186L13 21.42 5.984 25.11c-.203.108-.406.186-.625.186-.454 0-.657-.375-.657-.78 0-.11.016-.204.03-.314L6.08 16.39.39 10.86c-.187-.204-.39-.47-.39-.75 0-.47.483-.657.874-.72l7.844-1.14 3.516-7.11c.14-.297.406-.64.766-.64s.625.343.766.64l3.516 7.11 7.844 1.14c.375.063.875.25.875.72z"></path></svg>`;
const calendarIcon = `<svg aria-hidden="true"  xmlns="http://www.w3.org/2000/svg" width="26" height="28" viewBox="0 0 26 28"><title>Calendar</title><path d="M2 26h22V10H2v16zM8 7V2.5c0-.28-.22-.5-.5-.5h-1c-.28 0-.5.22-.5.5V7c0 .28.22.5.5.5h1c.28 0 .5-.22.5-.5zm12 0V2.5c0-.28-.22-.5-.5-.5h-1c-.28 0-.5.22-.5.5V7c0 .28.22.5.5.5h1c.28 0 .5-.22.5-.5zm6-1v20c0 1.094-.906 2-2 2H2c-1.094 0-2-.906-2-2V6c0-1.094.906-2 2-2h2V2.5C4 1.125 5.125 0 6.5 0h1C8.875 0 10 1.125 10 2.5V4h6V2.5C16 1.125 17.125 0 18.5 0h1C20.875 0 22 1.125 22 2.5V4h2c1.094 0 2 .906 2 2z"></path></svg>`;
const mIcon = `<svg aria-hidden="true"  xmlns="http://www.w3.org/2000/svg" width="24" height="28" viewBox="0 0 35 28"><title>Gift</title><path d="M16 1.4C7.937 1.4 1.4 7.937 1.4 16S7.937 30.6 16 30.6c8.063 0 14.6-6.537 14.6-14.6S24.063 1.4 16 1.4zm3.38 22.66v-2.55h2L21 13l-4.68 8.36h-.38L11.11 13l-.27 8.55h2v2.55H6.08v-2.55H8l.45-11.5H6.42V7.5h4.54l5.16 9.19 5-9.27h4.51v2.55h-2.04l.61 11.49h2v2.55z"></path></svg>`;
const searchIcon = `<svg aria-hidden="true"  xmlns="http://www.w3.org/2000/svg" width="26" height="28" viewBox="0 0 26 28"><title>Search</title><path d="M18 13c0-3.86-3.14-7-7-7s-7 3.14-7 7 3.14 7 7 7 7-3.14 7-7zm8 13c0 1.094-.906 2-2 2-.53 0-1.047-.22-1.406-.594l-5.36-5.344C15.408 23.328 13.22 24 11.002 24 4.924 24 0 19.076 0 13S4.924 2 11 2s11 4.92 11 11c0 2.218-.67 4.405-1.936 6.233l5.36 5.36c.358.358.577.874.577 1.405z"></path></svg>`;
const chevronIcon = `<svg aria-hidden="true"  xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28"><title>Menu</title><path d="M26.297 12.625L14.703 24.203c-.39.39-1.016.39-1.406 0L1.703 12.625c-.39-.39-.39-1.03 0-1.422l2.594-2.578c.39-.39 1.016-.39 1.406 0L14 16.922l8.297-8.297c.39-.39 1.016-.39 1.406 0l2.594 2.578c.39.39.39 1.03 0 1.422z"></path></svg>`;

const MEDIUM = 768;
const LARGE = 1024;

const ELEMENT_NAME = 'umd-utility-header';

const ELEMENT_UTILITY_DECLARATION = 'element-utility-declaration';
const ELEMENT_UTILITY_CONTAINTER = 'element-utility-container';
const ELEMENT_UTILITY_LOCK = 'umd-element-nav-utility-lock';
const ELEMENT_UTILITY_WRAPPER = 'umd-element-nav-utility-wrapper';
const ELEMENT_UTILITY_LOGO = 'umd-element-nav-utility-logo';
const ELEMENT_UTILITY_MENU = 'umd-element-nav-utility-menu';
const ELEMENT_UTILITY_MOBILE_MENU = 'umd-element-nav-utility-mobile-menu';
const ELEMENT_UTILITY_MOBILE_BUTTON = 'umd-element-nav-utility-mobile-button';

const ANIMATION_OUT_SPEED = 400;
const ANIMATION_IN_SPEED = 800;

const isDesktop = () => window.innerWidth >= LARGE;

// prettier-ignore
const LockStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_UTILITY_LOCK}`]: LockMax,
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
`;

// prettier-ignore
const MenuStyles = `
  .${ELEMENT_UTILITY_MENU} {

  }

  @container (min-width: ${LARGE}px) {
    .${ELEMENT_UTILITY_MENU} {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: ${Spacing.lg}
    }
  }

  .${ELEMENT_UTILITY_MENU} * {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
    font-weight: 700;
    font-size: 13px;
  }

  @container (max-width: ${MEDIUM - 1}px) {
    .${ELEMENT_UTILITY_MOBILE_MENU} > * {
      border-top: 1px solid ${Colors.gray.lighter};
      color: ${Colors.red};
      order: 2;
      transition: background ${ANIMATION_OUT_SPEED}ms, color ${ANIMATION_OUT_SPEED}ms;
    }
  }

  @container (max-width: ${MEDIUM - 1}px) {
    .${ELEMENT_UTILITY_MOBILE_MENU} > *:first-child {
      border-top: none;
    }
  }

  @container (max-width: ${MEDIUM - 1}px) {
    .${ELEMENT_UTILITY_MOBILE_MENU} > a:hover,
    .${ELEMENT_UTILITY_MOBILE_MENU} > a:focus {
      background-color: ${Colors.red};
      color: ${Colors.white};
      transition: background ${ANIMATION_IN_SPEED}ms, color ${ANIMATION_IN_SPEED}ms;
    }
  }

  @container (min-width: ${LARGE}px) {
    .${ELEMENT_UTILITY_MOBILE_MENU} > a:hover,
    .${ELEMENT_UTILITY_MOBILE_MENU} > a:focus {
      background-color: ${Colors.redDark};
      transition: background ${ANIMATION_IN_SPEED}ms;
    }
  }

  @container (max-width: ${MEDIUM - 1}px) {
    .${ELEMENT_UTILITY_MOBILE_MENU} > a:hover svg,
    .${ELEMENT_UTILITY_MOBILE_MENU}> a:focus svg {
      fill: ${Colors.white};
    }
  }
`;

// prettier-ignore
const MobileMenuStyles = `
  @container (max-width: ${MEDIUM - 1}px) {
    .${ELEMENT_UTILITY_MOBILE_MENU} {
      position: absolute;
      width: 100%;
      left: 0;
      top: 39px;
      box-shadow: 0 5px 5px 1px rgba(0, 0, 0, .2);
      height: 0;
      overflow: hidden;
      transition: height ${ANIMATION_OUT_SPEED}ms;
      display: flex;
      -ms-flex-direction: column;
      flex-direction: column;
      background-color: ${Colors.white};
    }
  }

  @container (min-width: ${LARGE}px) {
    .${ELEMENT_UTILITY_MOBILE_MENU} {
      display: flex;
      height: inherit;
      margin-left: auto;
      position: relative;
    }
  }

  @container (max-width: ${MEDIUM - 1}px) {
    .${ELEMENT_UTILITY_MOBILE_MENU}[aria-hidden="true"] {
      transition: height ${ANIMATION_OUT_SPEED}ms;
      display: none;
    }
  }

  @container (max-width: ${MEDIUM - 1}px) {
    .${ELEMENT_UTILITY_MOBILE_MENU}[aria-hidden="false"] {
      transition: height ${ANIMATION_IN_SPEED}ms;
    }
  }


  @container (max-width: ${MEDIUM - 1}px) {
    .${ELEMENT_UTILITY_MOBILE_MENU} button {
      display: none;
    }
  }

  @container (min-width: ${LARGE}px) {
    .${ELEMENT_UTILITY_MOBILE_MENU} > button {
      transition: background ${ANIMATION_OUT_SPEED}ms;
    }
  }

  .${ELEMENT_UTILITY_MOBILE_MENU} > * > span {
    margin-left: 10px;
  }
`

// prettier-ignore
const MobileButtonStyles = `
  .${ELEMENT_UTILITY_MOBILE_BUTTON} {
    margin-left: auto;
  }

  @container (min-width: ${LARGE}px) {
    .${ELEMENT_UTILITY_MOBILE_BUTTON} {
      display: none;
    }
  }

  .${ELEMENT_UTILITY_MOBILE_BUTTON}:hover,
  .${ELEMENT_UTILITY_MOBILE_BUTTON}:focus {
    background-color: ${Colors.redDark};
  }

  @container (max-width: ${MEDIUM - 1}px) {
    .${ELEMENT_UTILITY_MOBILE_BUTTON} svg {
      fill: ${Colors.white};
      max-width: 20px;
    }
  }

  @container (min-width: ${LARGE}px) {
    .${ELEMENT_UTILITY_MOBILE_BUTTON} {
      display: none;
    }
  }
`;

// prettier-ignore
const LogoStyles = `
  .${ELEMENT_UTILITY_LOGO} {
    font-size: 14px;
    font-family: Crimson Text, Georgia, serif;
    letter-spacing: 1px;
    padding: 10px 0;
  }
`;

const STYLES_NAVIGATION_UTILITY = `
  .${ELEMENT_UTILITY_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_UTILITY_CONTAINTER} {
    display: block;
    background-color: ${Colors.red};
    position: relative;
    z-index: 999;
  }

  .${ELEMENT_UTILITY_CONTAINTER} p {
    max-width: 800px;
    margin: 0 auto;
  }

  .${ELEMENT_UTILITY_CONTAINTER} a {
    color: ${Colors.white};
    text-decoration: none;
    text-transform: uppercase;
  }

  .${ELEMENT_UTILITY_CONTAINTER} svg {
    max-width: 15px;
    transition: fill ${ANIMATION_OUT_SPEED}ms;
  }

  @container (max-width: ${MEDIUM - 1}px) {
    .${ELEMENT_UTILITY_CONTAINTER} svg {
      fill: ${Colors.red};
      transition: fill ${ANIMATION_IN_SPEED}ms;
    }
  }

  @container (min-width: ${LARGE}px) {
    .${ELEMENT_UTILITY_CONTAINTER} svg {
      fill: ${Colors.white};
    }
  }

  ${LockStyles}
  ${WrapperStyles}
  ${LogoStyles}
  ${MenuStyles}
  ${MobileButtonStyles}
  ${MobileMenuStyles}
  ${UtilityAlert.Styles}
  ${UtilitySearch.Styles}
`;

const toggleExpandElements = ({
  expandElement,
  elements,
  button,
}: {
  expandElement: HTMLElement;
  elements: Array<HTMLElement>;
  button: HTMLButtonElement;
}) => {
  const isOpen = expandElement.getAttribute('aria-hidden') === 'false';

  const elementToFocus = () => {
    const formElement = elements.find(
      (element: HTMLElement) => element.nodeName === 'DIV',
    ) as HTMLFormElement;
    const isFirstNodeAnchor = elements[0].nodeName === 'A';

    if (!formElement) return elements[0];

    if (!isFirstNodeAnchor && formElement) {
      const input = formElement.querySelector('input') as HTMLInputElement;

      return input;
    }

    return elements[0];
  };

  const eventKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Esc' || event.keyCode == 27) {
      close(true);
    }
  };

  const eventKeyUp = (event: KeyboardEvent) => {
    const path = event.composedPath();
    const currentElement = path[0] as HTMLElement;

    if (!expandElement) return;

    if (event.key === 'Tab' || event.keyCode == 9) {
      if (!expandElement.contains(currentElement)) {
        close();
      }
    }

    if (event.key === 'ArrowDown' || event.keyCode == 40) {
      const nextElement = currentElement.nextElementSibling as HTMLElement;

      if (expandElement.contains(nextElement)) {
        nextElement.focus();
      }
    }

    if (event.key === 'ArrowUp' || event.keyCode == 38) {
      const previousElement =
        currentElement.previousElementSibling as HTMLElement;

      if (expandElement.contains(previousElement)) {
        previousElement.focus();
      }
    }
  };

  const eventClick = (event: MouseEvent) => {
    const globalHeaderElement = event.target as HTMLElement;

    if (globalHeaderElement.nodeName !== ELEMENT_NAME.toUpperCase()) {
      close();
    }
  };

  const open = () => {
    const focusElement = elementToFocus();
    expandElement.style.display =
      expandElement.nodeName === 'FORM' ? 'block' : 'flex';

    setTimeout(() => {
      const size = elements.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.offsetHeight;
      }, 0);

      expandElement.setAttribute('aria-hidden', 'false');
      expandElement.style.height = `${size}px`;
      focusElement.focus();

      window.addEventListener('keydown', eventKeyDown);
      window.addEventListener('keyup', eventKeyUp);
      window.addEventListener('click', eventClick);
    }, 100);
  };

  const close = (focus = false) => {
    expandElement.style.height = `0`;

    setTimeout(() => {
      expandElement.style.display = 'none';
      expandElement.setAttribute('aria-hidden', 'true');

      if (focus) {
        button.focus();
      }

      window.removeEventListener('keydown', eventKeyDown);
      window.removeEventListener('keyup', eventKeyUp);
      window.removeEventListener('click', eventClick);
    }, ANIMATION_OUT_SPEED + 100);
  };

  isOpen ? close() : open();
};

const CreateSearchFormButton = ({
  expandElement,
}: {
  expandElement: HTMLDivElement | HTMLFormElement;
}) => {
  const button = document.createElement('button');
  const elements = Array.from(expandElement.querySelectorAll('div'));

  button.setAttribute('aria-label', 'enable the search form');
  button.setAttribute('type', 'button');
  button.innerHTML = `${searchIcon}`;
  button.setAttribute('aria-controls', UtilitySearch.Elements.form);

  button.addEventListener('click', () => {
    toggleExpandElements({ expandElement, elements, button });
  });

  return button;
};

const CreateMobileMenuButton = ({
  expandElement,
}: {
  expandElement: HTMLDivElement;
}) => {
  const button = document.createElement('button');
  const elements = Array.from(
    expandElement.querySelectorAll('a, form'),
  ) as Array<HTMLElement>;

  button.innerHTML = `${chevronIcon}`;
  button.setAttribute('type', 'button');
  button.setAttribute('aria-label', 'toggle mobile menu');
  button.setAttribute('aria-controls', `#${ELEMENT_UTILITY_MOBILE_MENU}`);
  button.classList.add(ELEMENT_UTILITY_MOBILE_BUTTON);

  button.addEventListener('click', () => {
    toggleExpandElements({ expandElement, elements, button });
  });

  return button;
};

const CreateLogoElement = () => {
  const logo = document.createElement('a');

  logo.innerHTML = 'University of Maryland';
  logo.setAttribute('href', 'https://umd.edu');
  logo.setAttribute('target', '_blank');
  logo.setAttribute('rel', 'noopener noreferrer');
  logo.classList.add(ELEMENT_UTILITY_LOGO);

  return logo;
};

const CreateMenuItems = ({
  hasAdmissions,
  hasSchools,
  hasEvents,
  hasGifts,
  hasNews,
  hasSearch,
  giftUrl,
  searchType,
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

  if (hasAdmissions) {
    hasItems = true;

    container.appendChild(
      makeLinkElement({
        name: 'Admissions',
        url: 'https://umd.edu/admissions',
        icon: flagIcon,
      }),
    );
  }

  if (hasSchools) {
    hasItems = true;

    container.appendChild(
      makeLinkElement({
        name: 'Colleges & Schools',
        url: 'https://umd.edu/colleges-and-schools',
        icon: homeIcon,
      }),
    );
  }

  if (hasNews) {
    hasItems = true;

    container.appendChild(
      makeLinkElement({
        name: 'News',
        url: 'https://today.umd.edu/',
        icon: starIcon,
      }),
    );
  }

  if (hasEvents) {
    hasItems = true;

    container.appendChild(
      makeLinkElement({
        name: 'Events',
        url: 'https://calendar.umd.edu',
        icon: calendarIcon,
      }),
    );
  }

  if (hasGifts) {
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

  if (hasSearch) {
    hasItems = true;
    const formElement = UtilitySearch.CreateElement({ searchType });
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
      const declaration = document.createElement('div');
      const container = document.createElement('div');
      const lock = document.createElement('div');
      const wrapper = document.createElement('div');
      const logoElement = CreateLogoElement();
      let shouldReize = false;

      const layoutWithItems = () => {
        const mobileMenuButton = CreateMobileMenuButton({
          expandElement: container,
        });

        mobileMenuButton.setAttribute('id', `#${ELEMENT_UTILITY_MOBILE_MENU}`);
        mobileMenuButton.setAttribute('aria-hidden', (!isDesktop()).toString());

        wrapper.appendChild(mobileMenuButton);

        shouldReize = true;
      };

      const layoutWithOutItems = () => {
        wrapper.style.display = 'flex';
        wrapper.style.justifyContent = 'center';
      };

      const resizeEvent = () => {
        const form = container.querySelector(`.${UtilitySearch.Elements.form}`);
        const menu = container.querySelector(`#${ELEMENT_UTILITY_MOBILE_MENU}`);

        if (menu) {
          menu.setAttribute('aria-hidden', (!isDesktop()).toString());
        }

        if (form) {
          form.setAttribute('aria-hidden', isDesktop().toString());
        }
      };

      const load = async () => {
        const alert = await UtilityAlert.CreateElement(props);
        const menu = CreateMenuItems({ ...props });

        if (alert) {
          container.insertBefore(alert, container.firstChild);
        }

        if (menu) {
          layoutWithItems();
          wrapper.appendChild(menu);
        } else {
          layoutWithOutItems();
        }

        if (shouldReize) {
          window.addEventListener('resize', () => resizeEvent());
        }
      };

      wrapper.appendChild(logoElement);
      wrapper.classList.add(ELEMENT_UTILITY_WRAPPER);

      lock.appendChild(wrapper);
      lock.classList.add(ELEMENT_UTILITY_LOCK);

      container.appendChild(lock);
      container.classList.add(ELEMENT_UTILITY_CONTAINTER);

      declaration.appendChild(container);
      declaration.classList.add(ELEMENT_UTILITY_DECLARATION);

      load();

      return declaration;
    }
  })();

export default {
  CreateElement: CreateNavigationUtility,
  Styles: STYLES_NAVIGATION_UTILITY,
};
