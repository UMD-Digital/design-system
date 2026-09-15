import {
  element,
  layout,
  token,
  typography,
} from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { close_large as iconCloseLarge } from '@universityofmaryland/web-icons-library/controls';
import { actions } from 'atomic';

type AlertData = {
  id: string;
  type: string;
  title: string;
  headline?: string;
  text?: string;
  ctaUrl?: string;
  ctaText?: string;
  hidden?: boolean;
};

/**
 * One alert exactly as the API Gateway serves it at
 * GET /v1/feeds/campus-alerts. Every key is always present; absent values are
 * null rather than omitted. Deliberately has no `hidden` key -- that flag is
 * client-only dismissal state and must never arrive from the network.
 */
type GatewayAlert = {
  id: string;
  type: string | null;
  title: string;
  headline: string | null;
  text: string | null;
  ctaUrl: string | null;
  ctaText: string | null;
};

type GatewayFeedResponse = {
  alerts: GatewayAlert[];
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

type CacheCheckResult = {
  shouldCheck: boolean;
  cachedData: AlertData | null;
};

const ELEMENT_NAME = 'umd-element-nav-alert';

export const ALERT_CONSTANTS = {
  URLS: {
    // API Gateway campus-alerts feed. Override per-instance with
    // data-alert-url (e.g. http://localhost:8080/v1/feeds/campus-alerts
    // against a local gateway).
    // TODO: replace with the production gateway host once it is deployed.
    DEFAULT: 'https://umd.edu/v1/feeds/campus-alerts',
  },
  STORAGE_KEYS: {
    ALERT_TIME: 'umd-utility-alert-time',
    ALERT: 'umd-utility-alert',
    ALERT_ID: 'umd-utility-alert-id',
  },
  ELEMENTS: {
    ALERT_ID: 'umd-global-alert',
    CONTAINER: 'umd-element-nav-alert-container',
    CTA: 'umd-element-nav-alert-cta',
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
  CACHE: {
    DURATION: 60 * 1000,
  },
} as const;

const { ATTRIBUTES, ANIMATION, ELEMENTS, TYPES } = ALERT_CONSTANTS;

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

const isSameAlertContent = (a: AlertData, b: AlertData): boolean =>
  a.title === b.title &&
  a.headline === b.headline &&
  a.text === b.text &&
  a.ctaUrl === b.ctaUrl &&
  a.ctaText === b.ctaText;

const updateAlertCache = (alert: AlertData): void => {
  setStoredValue(ALERT_CONSTANTS.STORAGE_KEYS.ALERT, alert);
};

const createCloseButton = (container: HTMLElement) => {
  return new ElementBuilder('button')
    .withClassName('umd-element-nav-alert-close')
    .withAria({ label: 'remove alert' })
    .withHTML(iconCloseLarge)
    .withStyles({
      element: {
        position: 'absolute',
        top: '30px',
        right: '10px',

        [`@container (${token.media.queries.large.max})`]: {
          top: '25px',
          right: '5px',
        },

        '& > svg': {
          fill: token.color.black,
          width: '24px',
          height: '24px',
        },

        [`.${ELEMENTS.CONTAINER}[${ATTRIBUTES.TYPE}=${TYPES.GENERAL}] & > svg`]:
          {
            fill: token.color.white,
          },
      },
    })
    .on('click', () => {
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
};

const DEFAULT_CTA_TEXT = 'Learn more';

const createCTAElement = ({
  ctaText,
  ctaUrl,
}: {
  ctaText: string;
  ctaUrl: string;
}) => {
  const link = new ElementBuilder('a')
    .withClassName(ELEMENTS.CTA)
    .withAttribute('href', ctaUrl)
    .withAttribute('rel', 'noopener noreferrer')
    .withAttribute('target', '_blank')
    .withHTML(ctaText)
    .build();

  return actions.options({
    element: link.element,
    isTypeSecondary: true,
  });
};

const createTitle = (headlineText: string) => {
  return new ElementBuilder('p')
    .withClassName('umd-element-nav-alert-title')
    .withHTML(headlineText)
    .withStyles({
      element: {
        ...typography.sans.large,
        textTransform: 'uppercase',

        '& + *': {
          marginTop: token.spacing.sm,
        },

        [`.${ELEMENTS.CONTAINER}[${ATTRIBUTES.TYPE}=${TYPES.GENERAL}] &`]: {
          color: token.color.gold,
        },
      },
    });
};

const createMessage = (alert: AlertData) => {
  if (!alert.text) return null;

  return new ElementBuilder('div')
    .withClassName('umd-element-nav-alert-text')
    .withHTML(alert.text)
    .withStyles({
      element: {
        ...element.text.rich.advanced,
        fontSize: '16px',

        '& *': {
          fontSize: '16px',
        },

        '& + *': {
          marginTop: token.spacing.lg,
        },
      },
    });
};

const createCta = (alert: AlertData) => {
  if (!alert.ctaUrl) return null;

  return createCTAElement({
    ctaText: alert.ctaText || DEFAULT_CTA_TEXT,
    ctaUrl: alert.ctaUrl,
  });
};

const buildAlertComponent = (alert: AlertData) => {
  const headlineText = alert.headline || alert.title;

  const containerBuilder = new ElementBuilder()
    .withClassName(ELEMENTS.CONTAINER)
    .withAttribute('id', ELEMENTS.ALERT_ID)
    .withAttribute(ATTRIBUTES.TYPE, alert.type)
    .withStyles({
      element: {
        container: `${ELEMENT_NAME} / inline-size`,
        backgroundColor: token.color.gray.lighter,
        borderLeft: `4px solid ${token.color.red}`,
        transition: `height ${ANIMATION.SPEED}ms`,
        overflow: 'hidden',
        position: 'relative',

        [`@container (${token.media.queries.desktop.min})`]: {
          borderLeft: `8px solid ${token.color.red}`,
        },

        [`&[${ATTRIBUTES.TYPE}=${TYPES.GENERAL}]`]: {
          backgroundColor: token.color.black,

          '& *': {
            color: token.color.white,
          },

          '& a:hover, & a:focus': {
            color: `${token.color.white} !important`,
          },
        },

        [`&[${ATTRIBUTES.TYPE}=${TYPES.CLOSED}]`]: {
          backgroundColor: token.color.gold,

          '& *': {
            color: token.color.black,
          },
        },
      },
    });

  const containerElement = containerBuilder.getElement();

  const closeButton = createCloseButton(containerElement);
  const title = createTitle(headlineText);
  const message = createMessage(alert);
  const cta = createCta(alert);

  const wrapperChildren = [closeButton, title, message, cta].filter(
    (child) => child != null,
  );

  const wrapper = new ElementBuilder()
    .withClassName('umd-element-nav-alert-wrapper')
    .withChildren(...wrapperChildren)
    .withStyles({
      element: {
        position: 'relative',
        paddingTop: token.spacing.md,
        paddingBottom: token.spacing.md,
        paddingRight: token.spacing.lg,

        [`@container (${token.media.queries.tablet.min})`]: {
          paddingTop: token.spacing.lg,
          paddingBottom: token.spacing.lg,
        },

        [`& .${ELEMENTS.CTA}`]: {
          textDecoration: 'none',
        },

        [`& .${ELEMENTS.CTA} svg`]: {
          maxWidth: '20px',
        },
      },
    });

  const lock = new ElementBuilder()
    .withClassName('umd-element-nav-alert-lock')
    .withChild(wrapper)
    .withStyles({ element: { ...layout.space.horizontal.full } });

  return new ElementBuilder()
    .withClassName('umd-element-nav-alert-declaration')
    .withChild(containerBuilder.withChild(lock))
    .withStyles({
      element: {
        container: `${ELEMENT_NAME} / inline-size`,
      },
    })
    .build();
};

/**
 * Maps one gateway alert onto the shape this module renders.
 *
 * Nulls become undefined so the existing falsy guards keep working, and a
 * missing type falls back to the default styling rather than writing the
 * literal string "null" into the type attribute. `hidden` is never copied
 * across: it is local dismissal state, and honouring a network-supplied value
 * would let the source permanently suppress an alert for a user.
 */
const normalizeAlert = (alert: GatewayAlert): AlertData => ({
  id: alert.id,
  type: alert.type ?? ALERT_CONSTANTS.TYPES.GENERAL,
  title: alert.title,
  headline: alert.headline ?? undefined,
  text: alert.text ?? undefined,
  ctaUrl: alert.ctaUrl ?? undefined,
  ctaText: alert.ctaText ?? undefined,
});

/**
 * Reads campus alerts from the API Gateway.
 *
 * The gateway serves cached snapshots over a plain unauthenticated GET, so
 * there is no query and no bearer token here. It also owns all selection --
 * entry type, ordering, live status and expiry -- so whatever arrives first is
 * the alert to show.
 *
 * Returns null when the feed could not be read, and an empty entries array
 * when the feed was read successfully and holds no alerts. Those two cases are
 * different: an empty feed is how an alert is turned off.
 */
const fetchAlerts = async ({
  alertUrl,
}: AlertProps): Promise<AlertResponse | null> => {
  const url = alertUrl || ALERT_CONSTANTS.URLS.DEFAULT;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch alerts: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const payload: GatewayFeedResponse = await response.json();

    if (!Array.isArray(payload?.alerts)) {
      console.error('Failed to fetch alerts: unexpected response shape');
      return null;
    }

    return { data: { entries: payload.alerts.map(normalizeAlert) } };
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
    return buildAlertComponent(alertCache.cachedData);
  }

  // Fetch new alerts
  const response = await fetchAlerts({ alertUrl });
  if (!response || !response.data || !response.data.entries[0]) {
    clearAlertStorage();
    return null;
  }

  const alert = response.data.entries[0];
  const cachedAlert = getStoredValue<AlertData>(
    ALERT_CONSTANTS.STORAGE_KEYS.ALERT,
  );

  // Handle alert updates
  if (cachedAlert && cachedAlert.id === alert.id) {
    const isUnchanged = isSameAlertContent(cachedAlert, alert);

    updateAlertCache({ ...alert, hidden: isUnchanged && cachedAlert.hidden });

    if (!isUnchanged) {
      return buildAlertComponent(alert);
    }

    if (!cachedAlert.hidden && alertCache.shouldCheck) {
      return buildAlertComponent(alert);
    }
  } else {
    clearAlertStorage();
    updateAlertCache(alert);
    return buildAlertComponent(alert);
  }

  return null;
};
