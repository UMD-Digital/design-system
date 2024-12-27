import {
  ElementStyles,
  Layout,
  Tokens,
  Typography,
} from '@universityofmaryland/variables';
import Actions from 'composite/call-to-action';
import { Asset, Network, Styles } from 'utilities';

type AlertData = {
  id: string;
  type: string;
  title: string;
  headline?: string;
  text: string;
  ctaUrl: string;
  ctaText?: string;
  hidden?: boolean;
};

type AlertResponse = {
  data: {
    entries: AlertData[];
  };
};

type AlertProps = {
  alertUrl?: string | null;
};

export type TypeAlertProps = {
  alertUrl?: string | null;
};

type ElementAttributes = Record<string, string>;

type CacheCheckResult = {
  shouldCheck: boolean;
  cachedData: AlertData | null;
};

const { FetchGraphQL } = Network;
const { convertJSSObjectToStyles } = Styles;
const { Colors, Spacing } = Tokens;

const QUERY = `
  query CampusAlertsQuery {
    entries: entries(
      limit: 1
      type: "mainElementsCampusAlert"
    ) {
        id: uid
        type: optionsType
        headline
        title
        text
        ctaUrl: cta
        ctaText
    }
  }
`;

const ELEMENT_NAME = 'umd-element-nav-alert';
export const ALERT_CONSTANTS = {
  URLS: {
    DEFAULT: 'https://umd.edu/api/v2',
  },
  STORAGE_KEYS: {
    ALERT_TIME: 'umd-utility-alert-time',
    ALERT: 'umd-utility-alert',
    ALERT_ID: 'umd-utility-alert-id',
  },
  ELEMENTS: {
    ALERT_ID: 'umd-global-alert',
    DECLARATION: 'umd-element-nav-alert-declaration',
    CONTAINER: 'umd-element-nav-alert-container',
    LOCK: 'umd-element-nav-alert-lock',
    WRAPPER: 'umd-element-nav-alert-wrapper',
    TITLE: 'umd-element-nav-alert-title',
    TEXT: 'umd-element-nav-alert-text',
    CTA: 'umd-element-nav-alert-cta',
    CLOSE_BUTTON: 'umd-element-nav-alert-close',
  },
  ATTRIBUTES: {
    TYPE: 'type',
  },
  TYPES: {
    GENERAL: 'general',
    CLOSED: 'closed',
    OPEN: 'open',
  },
  ANIMATION: {
    SPEED: 800,
  },
  BREAKPOINTS: {
    MEDIUM: 768,
    LARGE: 1024,
  },
  CACHE: {
    DURATION: 60 * 1000, // One minute in milliseconds
  },
} as const;

const { ATTRIBUTES, ANIMATION, BREAKPOINTS, ELEMENTS, TYPES } = ALERT_CONSTANTS;
const IS_TYPE_GENERAL = `[${ATTRIBUTES.TYPE}=${TYPES.GENERAL}]`;
const IS_TYPE_CLOSED = `[${ATTRIBUTES.TYPE}=${TYPES.CLOSED}]`;

const DECLARATION = `.${ELEMENTS.DECLARATION}`;
const CONTAINER = `.${ELEMENTS.CONTAINER}`;
const WRAPPER = `.${ELEMENTS.WRAPPER}`;
const LOCK = `.${ELEMENTS.LOCK}`;
const ALERT_TITLE = `.${ELEMENTS.TITLE}`;
const ALERT_TEXT = `.${ELEMENTS.TEXT}`;
const CLOSE_BUTTON = `.${ELEMENTS.CLOSE_BUTTON}`;
const CTA = `.${ELEMENTS.CTA}`;

const OVERWRITE_CONTAINER_TYPE_GENERAL = `${CONTAINER}${IS_TYPE_GENERAL}`;
const OVERWRITE_CONTAINER_TYPE_CLOSED = `${CONTAINER}${IS_TYPE_CLOSED}`;

// prettier-ignore
const OverwriteTypeGeneral = `
  ${OVERWRITE_CONTAINER_TYPE_GENERAL} {
    background-color: ${Colors.black};
  }

  ${OVERWRITE_CONTAINER_TYPE_GENERAL} * {
    color: ${Colors.white};
  }

  ${OVERWRITE_CONTAINER_TYPE_GENERAL} ${ALERT_TITLE} {
    color: ${Colors.gold};
  }

   ${OVERWRITE_CONTAINER_TYPE_GENERAL} ${CLOSE_BUTTON} > svg {
    fill: ${Colors.white};
  }
`

// prettier-ignore
const OverwriteTypeClosed = `
  ${OVERWRITE_CONTAINER_TYPE_CLOSED} {
    background-color: ${Colors.gold};
  }

  ${OVERWRITE_CONTAINER_TYPE_CLOSED} * {
    color: ${Colors.black};
  }

   ${OVERWRITE_CONTAINER_TYPE_CLOSED} .${CLOSE_BUTTON} > svg {
    fill: ${Colors.black};
  }
`

// prettier-ignore
const CloseButtonStyles = `
  ${CLOSE_BUTTON} {
    position: absolute;
    top: 30px;
    right: 10px;
  }
  
  @container (max-width: ${BREAKPOINTS.MEDIUM - 1}px) {
    ${CLOSE_BUTTON} {
      top: 25px;
      right: 5px;
    }
  }

  ${CLOSE_BUTTON} > svg {
    fill: ${Colors.black};
    width: 24px;
    height: 24px;
  }
`

// prettier-ignore
const TextStyles = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`${ALERT_TITLE}`]: Typography.sans.large,
    },
  })}

  ${ALERT_TITLE} {
    text-transform: uppercase;
  }

  ${ALERT_TITLE} + * {
    margin-top: ${Spacing.sm};
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`${ALERT_TEXT}`]: ElementStyles.text.rich.advanced,
    },
  })}

  ${ALERT_TEXT},
  ${ALERT_TEXT} * {
    font-size: 16px;;
  }

  ${ALERT_TEXT} + * {
    margin-top: ${Spacing.lg};
  }

  ${CTA} {
    text-decoration: none;
  }
`

// prettier-ignore
const WrapperStyles = `
  ${WRAPPER} {
    position: relative;
    padding-top: ${Spacing.md};
    padding-bottom: ${Spacing.md};
    padding-right: ${Spacing.lg};
  }

  @container (min-width: ${BREAKPOINTS.MEDIUM}px) {
    ${WRAPPER} {
      padding-top: ${Spacing.lg};
      padding-bottom: ${Spacing.lg};
    }
  }
`

// prettier-ignore
const LockStyles = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`${LOCK}`]: Layout.space.horizontal.full,
    },
  })}
`

// prettier-ignore
const ContainerStyles = `
  ${CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    background-color: ${Colors.gray.lighter};
    border-left: 4px solid ${Colors.red};
    transition: height ${ANIMATION.SPEED}ms;
    overflow: hidden;
    position: relative;
  }

  @container (min-width: ${BREAKPOINTS.LARGE}px) {
    ${CONTAINER} {
      border-left: 8px solid ${Colors.red};
    }
  }
`

// prettier-ignore
export const STYLES_NAV_ALERT = `
  ${DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  ${Actions.Styles}
  ${ContainerStyles}
  ${LockStyles}
  ${WrapperStyles}
  ${TextStyles}
  ${CloseButtonStyles}
  ${OverwriteTypeGeneral}
  ${OverwriteTypeClosed}
`;

// storage.ts
const logStorageError = (operation: string, error: Error): void => {
  console.error(`UMD Component - Alert Storage: ${operation} failed:`, error);
};

const getStoredValue = <T>(key: string): T | null => {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    logStorageError(`Reading ${key}`, error as Error);
    return null;
  }
};

const setStoredValue = (key: string, value: unknown): void => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    logStorageError('Saving value', error as Error);
  }
};

const clearAlertStorage = (): void => {
  const { STORAGE_KEYS } = ALERT_CONSTANTS;
  window.localStorage.removeItem(STORAGE_KEYS.ALERT_TIME);
  window.localStorage.removeItem(STORAGE_KEYS.ALERT);
};

const checkAlertCache = (): CacheCheckResult => {
  const currentTime = new Date().getTime();
  const { STORAGE_KEYS, CACHE } = ALERT_CONSTANTS;

  try {
    const alertTimeStr = getStoredValue<string>(STORAGE_KEYS.ALERT_TIME);
    const cachedResponse = getStoredValue<AlertData>(STORAGE_KEYS.ALERT);

    if (!alertTimeStr) {
      setStoredValue(STORAGE_KEYS.ALERT_TIME, currentTime.toString());
      return { shouldCheck: true, cachedData: null };
    }

    const alertTime = parseInt(alertTimeStr, 10);
    const timeElapsed = currentTime - alertTime;

    if (timeElapsed < CACHE.DURATION && cachedResponse) {
      return { shouldCheck: false, cachedData: cachedResponse };
    }

    setStoredValue(STORAGE_KEYS.ALERT_TIME, currentTime.toString());
    return { shouldCheck: true, cachedData: null };
  } catch (error) {
    console.error('Cache check failed:', error);
    return { shouldCheck: true, cachedData: null };
  }
};

const updateAlertCache = (alert: AlertData): void => {
  setStoredValue(ALERT_CONSTANTS.STORAGE_KEYS.ALERT, alert);
};

const createElement = (
  tag: string,
  className?: string,
  attributes?: ElementAttributes,
): HTMLElement => {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }
  return element;
};

const createCloseButton = (container: HTMLElement): HTMLButtonElement => {
  const { ELEMENTS, ANIMATION } = ALERT_CONSTANTS;
  const button = createElement('button', ELEMENTS.CLOSE_BUTTON, {
    'aria-label': 'remove alert',
  }) as HTMLButtonElement;

  button.innerHTML = Asset.icon.X;
  button.addEventListener('click', () => {
    const cachedAlert = getStoredValue<AlertData>(
      ALERT_CONSTANTS.STORAGE_KEYS.ALERT,
    );
    if (cachedAlert) {
      // Animate close
      container.style.height = `${container.offsetHeight}px`;
      container.style.transition = `height ${ANIMATION.SPEED}ms`;

      updateAlertCache({ ...cachedAlert, hidden: true });

      setTimeout(() => {
        container.style.height = '0px';
      }, 100);

      setTimeout(() => {
        container.remove();
      }, ANIMATION.SPEED + 100);
    }
  });

  return button;
};

const createCTAElement = ({
  ctaText,
  ctaUrl,
}: {
  ctaText: string;
  ctaUrl: string;
}): HTMLElement => {
  const link = createElement('a', ALERT_CONSTANTS.ELEMENTS.CTA, {
    href: ctaUrl,
    rel: 'noopener noreferrer',
    target: '_blank',
  });
  link.innerHTML = ctaText;

  return Actions.CreateElement({
    cta: link,
    type: 'secondary',
  });
};

const createAlertContent = (
  alert: AlertData,
  container: HTMLElement,
): HTMLElement => {
  const { ELEMENTS } = ALERT_CONSTANTS;
  const wrapper = createElement('div', ELEMENTS.WRAPPER);
  const lock = createElement('div', ELEMENTS.LOCK);
  const headlineText = alert.headline || alert.title;

  // Create elements
  const title = createElement('p', ELEMENTS.TITLE);
  title.innerHTML = headlineText;

  const closeButton = createCloseButton(container);

  wrapper.append(closeButton, title);

  if (alert.text) {
    const message = createElement('div', ELEMENTS.TEXT);
    message.innerHTML = alert.text;
    wrapper.append(closeButton, title, message);
  }

  // Add CTA if exists
  if (alert.ctaUrl) {
    wrapper.appendChild(
      createCTAElement({
        ctaText: alert.ctaText || headlineText,
        ctaUrl: alert.ctaUrl,
      }),
    );
  }

  lock.appendChild(wrapper);
  return lock;
};

const createAlertComponent = (alert: AlertData): HTMLElement => {
  const { ELEMENTS, ATTRIBUTES } = ALERT_CONSTANTS;

  const declaration = createElement('div', ELEMENTS.DECLARATION);
  const container = createElement('div', ELEMENTS.CONTAINER, {
    id: ELEMENTS.ALERT_ID,
    [ATTRIBUTES.TYPE]: alert.type,
  });

  const content = createAlertContent(alert, container);
  container.appendChild(content);
  declaration.appendChild(container);

  return declaration;
};

const fetchAlerts = async ({
  alertUrl,
}: AlertProps): Promise<AlertResponse | null> => {
  try {
    const url = alertUrl || ALERT_CONSTANTS.URLS.DEFAULT;

    return await FetchGraphQL({
      query: QUERY,
      url,
      token: 'VIDnMeNYHTrLvWPtPpK5MNpjuv5WmmhU',
    });
  } catch (error) {
    console.error('Failed to fetch alerts:', error);
    return null;
  }
};

export const createNavAlert = async ({ alertUrl }: AlertProps) => {
  const alertCache = checkAlertCache();

  // Show cached alert if valid
  if (
    !alertCache.shouldCheck &&
    alertCache.cachedData &&
    !alertCache.cachedData.hidden
  ) {
    return { element: createAlertComponent(alertCache.cachedData) };
  }

  // Fetch new alerts
  const response = await fetchAlerts({ alertUrl });
  if (!response?.data?.entries[0]) return null;

  const alert = response.data?.entries[0];
  const cachedAlert = getStoredValue<AlertData>(
    ALERT_CONSTANTS.STORAGE_KEYS.ALERT,
  );

  // Handle alert updates
  if (cachedAlert?.id === alert.id) {
    if (!cachedAlert.hidden && alertCache.shouldCheck) {
      return { element: createAlertComponent(cachedAlert) };
    }
  } else {
    clearAlertStorage();
    updateAlertCache(alert);
    return { element: createAlertComponent(alert) };
  }

  return null;
};
