import * as token from '@universityofmaryland/web-token-library';
import * as layout from '@universityofmaryland/web-styles-library/layout';
import {
  ElementBuilder,
  ElementModel,
  createStyleTag,
} from '@universityofmaryland/web-builder-library';
import { handleKeyboardNavigation } from '@universityofmaryland/web-utilities-library/events';
import { search as iconSearch } from '@universityofmaryland/web-icons-library/search';
import { chevron_down as iconChevronDown } from '@universityofmaryland/web-icons-library/controls';
import { createNavAlert, ALERT_CONSTANTS, TypeAlertProps } from './alert';
import { createCompositeNavigationSearch } from './search';

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

const ANIMATION_OUT_SPEED = 400;
const ANIMATION_IN_SPEED = 800;

const ATTRIBUTE_LOCK = 'lock';
const WITH_ITEMS = 'data-items';
const LOCK_FULL = 'full';

const ELEMENT_NAME = 'umd-element-utility-header';

const isDesktop = () =>
  window.innerWidth >= token.media.breakpointValues.desktop.min;

const isValidUrl = (url: string) => {
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
};

const TOP_TWENTY_TEXT = `A Top 20 Public Research University`;

const createLogoElement = () => {
  return new ElementBuilder('a')
    .withClassName('umd-element-nav-utility-logo')
    .withAttribute('href', 'https://umd.edu')
    .withAttribute('target', '_blank')
    .withAttribute('rel', 'noopener noreferrer')
    .withHTML('University of Maryland')
    .withStyles({
      element: {
        color: token.color.white,
        fontFamily: token.font.family.serif,
        letterSpacing: '1px',
        fontSize: token.font.size.sm,
        textTransform: 'uppercase',
      },
    });
};

const createLogoText = () => {
  return new ElementBuilder('p')
    .withClassName('umd-element-nav-utility-logo-text')
    .withHTML(TOP_TWENTY_TEXT)
    .withStyles({
      element: {
        color: token.color.white,
        display: 'block',
        fontSize: '11px',

        [`@media (${token.media.queries.tablet.min})`]: {
          position: 'relative',
          fontSize: '13px',

          '&:before': {
            content: "''",
            position: 'absolute',
            left: '-7px',
            height: '100%',
            width: '1px',
            backgroundColor: token.color.white,
          },
        },
      },
    });
};

const createLogoColumn = () => {
  const logo = createLogoElement();
  const text = createLogoText();

  const container = new ElementBuilder()
    .withClassName('umd-element-nav-utility-logo-column')
    .withChildren(logo, text)
    .withStyles({
      element: {
        display: 'flex',
        opacity: 0,
        transition: 'opacity .3s ease-in',
        padding: '10px 0',

        [`@media (${token.media.queries.large.max})`]: {
          flexDirection: 'column',
          gap: token.spacing.min,
          textAlign: 'center',
        },

        [`@media (${token.media.queries.tablet.min})`]: {
          alignItems: 'center',
          gap: token.spacing.xs,
        },
      },
    });

  const containerElement = container.getElement();

  setTimeout(() => {
    containerElement.style.opacity = '1';
  }, 400);

  return container;
};

const createSearchFormButton = ({
  expandElement,
}: {
  expandElement: HTMLDivElement | HTMLFormElement;
}) => {
  let focusCallback = () => {};

  const buttonBuilder = new ElementBuilder('button')
    .withClassName('umd-element-nav-utility-search-button')
    .withAttribute('aria-label', 'enable the search form')
    .withAttribute('type', 'button')
    .withHTML(iconSearch)
    .withAttribute('aria-controls', 'element-utility-form')
    .withAttribute('aria-expanded', 'false')
    .withStyles({
      element: {
        '& svg': {
          height: '22px',
          width: 'inherit',
        },

        [`@container (${token.media.queries.tablet.max})`]: {
          display: 'none',
        },
      },
    });

  const buttonElement = buttonBuilder.getElement() as HTMLButtonElement;

  const eventClose = () => {
    expandElement.style.height = `0`;

    setTimeout(() => {
      expandElement.style.display = 'none';
      expandElement.setAttribute('aria-hidden', 'true');
      buttonElement.setAttribute('aria-expanded', 'false');
      buttonElement.focus();

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
      const elements = Array.from(expandElement.querySelectorAll('div'));
      const size = elements.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.offsetHeight;
      }, 0);

      expandElement.setAttribute('aria-hidden', 'false');
      expandElement.style.height = `${size}px`;
      buttonElement.setAttribute('aria-expanded', 'true');
      if (focusElement) focusElement.focus();
    }, 100);

    focusCallback = handleKeyboardNavigation({
      element: expandElement,
      action: () => eventClose(),
    });
  };

  buttonBuilder.on('click', () => {
    const isExpanded = buttonElement.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      eventClose();
    } else {
      eventOpen();
    }
  });

  return buttonBuilder;
};

const createMobileMenuButton = ({
  expandElement,
}: {
  expandElement: HTMLDivElement;
}) => {
  let focusCallback = () => {};

  const buttonBuilder = new ElementBuilder('button')
    .withClassName('umd-element-nav-utility-mobile-button')
    .withHTML(iconChevronDown)
    .withAttribute('type', 'button')
    .withAttribute('aria-label', 'toggle mobile menu')
    .withAttribute('aria-controls', 'umd-element-nav-utility-mobile-menu')
    .withStyles({
      element: {
        marginLeft: 'auto',
        height: '100%',
        padding: `${token.spacing.xs} ${token.spacing.md}`,
        marginRight: `-${token.spacing.md}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '&:hover, &:focus': {
          backgroundColor: token.color.redDark,
        },

        [`@container (${token.media.queries.desktop.min})`]: {
          display: 'none',
        },

        [`@container (${token.media.queries.tablet.max})`]: {
          '& svg': {
            fill: token.color.white,
            width: '18px',
            height: '18px',
          },
        },
      },
    });

  const buttonElement = buttonBuilder.getElement() as HTMLButtonElement;

  const eventClose = () => {
    expandElement.style.height = `0`;

    setTimeout(() => {
      expandElement.style.display = 'none';
      expandElement.setAttribute('aria-hidden', 'true');
      buttonElement.setAttribute('aria-expanded', 'false');
      buttonElement.focus();

      if (focusCallback) {
        focusCallback();
        focusCallback = () => {};
      }
    }, ANIMATION_OUT_SPEED + 100);
  };

  const eventOpen = () => {
    const wrapper = expandElement.querySelector(
      '.umd-element-nav-utility-menu',
    ) as HTMLElement;
    const focusElement = expandElement.querySelector('a') as HTMLAnchorElement;

    expandElement.style.display = 'block';

    setTimeout(() => {
      expandElement.setAttribute('aria-hidden', 'false');
      expandElement.style.height = `${wrapper.offsetHeight}px`;
      buttonElement.setAttribute('aria-expanded', 'true');
      if (focusElement) focusElement.focus();
    }, 100);

    focusCallback = handleKeyboardNavigation({
      element: expandElement,
      action: () => eventClose(),
    });
  };

  buttonBuilder.on('click', () => {
    const isExpanded = buttonElement.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      eventClose();
    } else {
      eventOpen();
    }
  });

  return buttonBuilder;
};

const createLinkElement = ({
  name,
  icon,
  url,
}: {
  name: string;
  icon: string;
  url: string;
}) =>
  new ElementBuilder('a')
    .withClassName('umd-element-nav-utility-menu-link')
    .withAttribute('href', url)
    .withAttribute('target', '_blank')
    .withAttribute('rel', 'noopener noreferrer')
    .withHTML(`${icon} <span>${name}</span>`)
    .withStyles({
      element: {
        color: token.color.white,
        textDecoration: 'none',
        textTransform: 'uppercase',
      },
    });

const createAdmissionsLink = (isAdmissionsFeed?: boolean) => {
  if (!isAdmissionsFeed) return null;

  return createLinkElement({
    name: 'Admissions',
    url: 'https://umd.edu/admissions',
    icon: flagIcon,
  });
};

const createSchoolsLink = (isSchoolsFeed?: boolean) => {
  if (!isSchoolsFeed) return null;

  return createLinkElement({
    name: 'Colleges & Schools',
    url: 'https://umd.edu/colleges-and-schools',
    icon: homeIcon,
  });
};

const createNewsLink = (isNewsFeed?: boolean) => {
  if (!isNewsFeed) return null;

  return createLinkElement({
    name: 'News',
    url: 'https://today.umd.edu/',
    icon: starIcon,
  });
};

const createEventsLink = (isEventsFeed?: boolean) => {
  if (!isEventsFeed) return null;

  return createLinkElement({
    name: 'Events',
    url: 'https://calendar.umd.edu',
    icon: calendarIcon,
  });
};

const createGiftsLink = (isGiftsFeed?: boolean, giftUrl?: string) => {
  if (!isGiftsFeed) return null;

  const defaultURL = 'https://giving.umd.edu';
  const validURL = giftUrl ? isValidUrl(giftUrl) : null;
  const url = validURL && giftUrl ? giftUrl : defaultURL;

  return createLinkElement({ name: 'Make a Gift', url, icon: mIcon });
};

const createMenuItems = ({
  isAdmissionsFeed,
  isEventsFeed,
  isGiftsFeed,
  isNewsFeed,
  isSchoolsFeed,
  isSearch,
  giftUrl,
  isSearchDomain,
}: TypeMenuItemsRequirements) => {
  const linkItems = [
    createAdmissionsLink(isAdmissionsFeed),
    createSchoolsLink(isSchoolsFeed),
    createNewsLink(isNewsFeed),
    createEventsLink(isEventsFeed),
    createGiftsLink(isGiftsFeed, giftUrl),
  ];

  const children: Array<ElementBuilder<HTMLElement>> = linkItems.filter(
    (child): child is ElementBuilder<HTMLElement> => child !== null,
  );

  if (isSearch || isSearchDomain) {
    const searchForm = createCompositeNavigationSearch({
      isSearchDomain,
      isLayoutDesktop: isDesktop(),
      isLayoutMobile: !isDesktop(),
    });
    const searchButton = createSearchFormButton({
      expandElement: searchForm.getElement() as HTMLFormElement,
    });

    children.push(searchButton, searchForm);
  }

  if (children.length === 0) return null;

  return new ElementBuilder()
    .withClassName('umd-element-nav-utility-menu')
    .withChildren(...children)
    .withStyles({
      element: {
        display: 'flex',

        '& > *': {
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          height: '100%',
          padding: `${token.spacing.min} ${token.spacing.sm}`,
          fontWeight: token.font.weight.bold,
          fontSize: '13px',
          transition: `background ${ANIMATION_IN_SPEED}ms`,

          '&[aria-expanded="true"]': {
            backgroundColor: token.color.redDark,
          },
        },

        '& svg': {
          maxWidth: '15px',
          transition: `fill ${ANIMATION_OUT_SPEED}ms`,
        },

        [`@container (${token.media.queries.tablet.max})`]: {
          flexDirection: 'column',

          '& > *': {
            borderTop: `1px solid ${token.color.gray.lighter}`,
            color: token.color.red,
            order: 2,
            transition: `background ${ANIMATION_OUT_SPEED}ms, color ${ANIMATION_OUT_SPEED}ms`,
          },

          '& > *:first-child': {
            borderTop: 'none',
          },

          '& > a:hover, & > a:focus': {
            backgroundColor: token.color.red,
            color: token.color.white,
            transition: `background ${ANIMATION_IN_SPEED}ms, color ${ANIMATION_IN_SPEED}ms`,
          },

          '& > a:hover svg, & > a:focus svg': {
            fill: token.color.white,
          },

          '& svg': {
            fill: token.color.red,
            transition: `fill ${ANIMATION_IN_SPEED}ms`,
          },
        },

        [`@container (${token.media.queries.desktop.min})`]: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',

          '& > *': {
            justifyContent: 'space-between',
          },

          '& > *:hover, & > *:focus': {
            backgroundColor: token.color.redDark,
          },

          '& svg': {
            fill: token.color.white,
          },
        },
      },
    });
};

const createMobileMenu = ({
  menuItemsBuilder,
  isHidden,
}: {
  menuItemsBuilder: ReturnType<typeof createMenuItems>;
  isHidden: boolean;
}) => {
  const mobileMenuBuilder = new ElementBuilder()
    .withAttribute('id', 'umd-element-nav-utility-mobile-menu')
    .withClassName('umd-element-nav-utility-mobile-menu')
    .withAttribute('aria-hidden', isHidden.toString())
    .withStyles({
      element: {
        [`@container (${token.media.queries.tablet.max})`]: {
          position: 'absolute',
          left: `-${token.spacing['2xl']}`,
          right: `-${token.spacing['2xl']}`,
          top: '44px',
          boxShadow: '0 5px 5px 1px rgba(0, 0, 0, .2)',
          height: 0,
          overflow: 'hidden',
          transition: `height ${ANIMATION_OUT_SPEED}ms`,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: token.color.white,

          '&[aria-hidden="true"]': {
            transition: `height ${ANIMATION_OUT_SPEED}ms`,
            display: 'none',
          },

          '&[aria-hidden="false"]': {
            transition: `height ${ANIMATION_IN_SPEED}ms`,
          },

          '& > button': {
            display: 'none',
          },
        },

        [`@container (${token.media.queries.large.max})`]: {
          left: `-${token.spacing.md}`,
          right: `-${token.spacing.md}`,
        },

        [`@container (${token.media.queries.desktop.min})`]: {
          display: 'flex',
          height: 'inherit !important',
          marginLeft: 'auto',
          position: 'relative',
          marginRight: `-${token.spacing.md}`,

          '& > button': {
            transition: `background ${ANIMATION_OUT_SPEED}ms`,
          },
        },
      },
    });

  if (menuItemsBuilder) mobileMenuBuilder.withChild(menuItemsBuilder);

  return mobileMenuBuilder;
};

const createWrapper = (children: Array<ReturnType<typeof createLogoColumn>>) =>
  new ElementBuilder()
    .withClassName('umd-element-nav-utility-wrapper')
    .withChildren(...children)
    .withStyles({
      element: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        minHeight: '44px',

        '& > a': {
          color: token.color.white,
          textTransform: 'uppercase',

          '&:hover, &:focus': {
            textDecoration: 'underline',
          },
        },
      },
    });

const createLock = (content: ReturnType<typeof createWrapper>) =>
  new ElementBuilder()
    .withClassName('umd-element-nav-utility-lock')
    .withChild(content)
    .withStyles({ element: { ...layout.space.horizontal.larger } });

const createContainer = ({
  content,
  isLockFull,
}: {
  content: ReturnType<typeof createLock>;
  isLockFull?: boolean;
}) => {
  const containerBuilder = new ElementBuilder()
    .withClassName('element-utility-container')
    .withChild(content)
    .withStyles({
      element: {
        display: 'block',
        backgroundColor: token.color.red,
        position: 'relative',
        zIndex: 999,

        [`&[${ATTRIBUTE_LOCK}=${LOCK_FULL}] .umd-element-nav-utility-lock`]: {
          ...layout.space.horizontal.full,
        },

        [`&[${WITH_ITEMS}="false"] .umd-element-nav-utility-wrapper`]: {
          display: 'flex',
          justifyContent: 'center',
          justifySelf: 'center',
        },

        [`@media (${token.media.queries.large.max})`]: {
          [`&[${WITH_ITEMS}="true"] .umd-element-nav-utility-wrapper .umd-element-nav-utility-logo-column > p`]:
            {
              display: 'none',
            },
        },
      },
    });

  if (isLockFull) containerBuilder.withAttribute(ATTRIBUTE_LOCK, LOCK_FULL);

  return containerBuilder;
};

const createDeclaration = (content: ReturnType<typeof createContainer>) =>
  new ElementBuilder()
    .withClassName('element-utility-declaration')
    .withChild(content)
    .withStyles({
      element: {
        container: `${ELEMENT_NAME} / inline-size`,
      },
    });

const createNavigationUtility = (props: TypeUtilityRequirements) => {
  const { isLockFull, isAlertOff } = props;

  const logoColumn = createLogoColumn();
  const wrapperBuilder = createWrapper([logoColumn]);

  const lockBuilder = createLock(wrapperBuilder);
  const containerBuilder = createContainer({
    content: lockBuilder,
    isLockFull,
  });
  const containerElement = containerBuilder.getElement();

  const menuItemsBuilder = createMenuItems({ ...props });

  if (menuItemsBuilder) {
    const mobileMenuBuilder = createMobileMenu({
      menuItemsBuilder,
      isHidden: !isDesktop(),
    });
    const mobileMenuButton = createMobileMenuButton({
      expandElement: mobileMenuBuilder.getElement() as HTMLDivElement,
    });

    wrapperBuilder.withChildren(mobileMenuButton, mobileMenuBuilder);
    containerBuilder.withAttribute(WITH_ITEMS, 'true');
  } else {
    containerBuilder.withAttribute(WITH_ITEMS, 'false');
  }

  let alertStyleTag: HTMLStyleElement | null = null;

  const insertAlert = (alert: ElementModel) => {
    containerElement.insertBefore(alert.element, containerElement.firstChild);

    if (alertStyleTag || !alert.styles) return;

    alertStyleTag = createStyleTag(alert.styles);
    containerElement.appendChild(alertStyleTag);
  };

  const resizeEvent = () => {
    const isDesktopValue =
      window.innerWidth >= token.media.breakpointValues.desktop.min;

    const form = containerElement.querySelector('.element-utility-form');
    const menu = containerElement.querySelector(
      '.umd-element-nav-utility-mobile-menu',
    );

    if (!form || !menu) return;

    if (isDesktopValue) {
      menu.setAttribute('aria-hidden', 'false');
      form.setAttribute('aria-hidden', 'true');
      form.setAttribute('data-layout-desktop', 'true');
      form.setAttribute('data-layout-mobile', 'false');
    } else {
      menu.setAttribute('aria-hidden', 'true');
      form.setAttribute('aria-hidden', 'false');
      form.setAttribute('data-layout-desktop', 'false');
      form.setAttribute('data-layout-mobile', 'true');
    }
  };

  const load = async () => {
    if (!isAlertOff) {
      const alert = await createNavAlert(props);

      if (alert) {
        insertAlert(alert);
      }
    }

    resizeEvent();
  };

  const showAlert = async () => {
    const isCurrentAlert = containerElement.querySelector(
      `.${ALERT_CONSTANTS.ELEMENTS.CONTAINER}`,
    );

    if (isCurrentAlert) return;

    const alert = await createNavAlert(props);

    if (alert) {
      insertAlert(alert);
    }
  };

  const hideAlert = () => {
    const alert = containerElement.querySelector(
      `.${ALERT_CONSTANTS.ELEMENTS.CONTAINER}`,
    );

    if (alert) {
      alert.remove();
    }
  };

  const declarationModel = createDeclaration(containerBuilder)
    .withEvents({ showAlert, hideAlert })
    .build();

  load();
  window.addEventListener('resize', resizeEvent);

  return declarationModel;
};

export const createCompositeNavigationUtility = createNavigationUtility;
