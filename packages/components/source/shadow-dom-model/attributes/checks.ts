import AttributeNames from './names';
import AttributesValues from './values';

// Types
interface AttributeElementProps {
  element: HTMLElement;
  defaultValue?: boolean;
}

interface AttributeProps extends AttributeElementProps {
  attributeName: string;
  attributeValue: string;
}

type AttributeNullProps = Omit<AttributeProps, 'attributeValue'>;

interface DeprecatedAttributeProps extends AttributeElementProps {
  attributeNameOld: string;
  attributeNameNew: string;
  attributeValue: string;
}

interface ValueGetterConfig {
  currentName: string;
  deprecatedName?: string;
}

// Core attribute check utilities
const isAttributeEqual = ({
  element,
  attributeName,
  attributeValue,
  defaultValue = false,
}: AttributeProps): boolean => {
  const value = element.getAttribute(attributeName);
  if (value === null) {
    return defaultValue;
  }

  if (attributeValue === 'true' || attributeValue === 'false') {
    return value.toLowerCase() === 'true';
  }

  if (value === '') {
    return true;
  }

  return value === attributeValue;
};

const isAttributeNotNull = ({
  element,
  attributeName,
}: AttributeNullProps): boolean => element.getAttribute(attributeName) !== null;

const depcreationWarning = ({
  element,
  attributeNameOld,
  attributeNameNew,
}: {
  element: HTMLElement;
  attributeNameOld: string;
  attributeNameNew: string;
}) => {
  console.warn(
    `UMD Web Component: ${element.nodeName} - Attribute "${attributeNameOld}" is deprecated. ` +
      `Use "${attributeNameNew}" instead. This attribute will be removed in version 2.0.`,
  );
};

const checkDeprecatedAttribute = (props: DeprecatedAttributeProps): boolean => {
  const {
    element,
    attributeNameOld,
    attributeNameNew,
    attributeValue,
    ...rest
  } = props;
  const isDeprecatedUsed = isAttributeEqual({
    ...rest,
    element,
    attributeName: attributeNameOld,
    attributeValue,
  });

  if (isDeprecatedUsed) {
    depcreationWarning(props);
    return true;
  }

  return false;
};

const createAttributeCheck =
  (attributeName: string, attributeValue: string, defaultValue = false) =>
  (props: AttributeElementProps): boolean =>
    isAttributeEqual({
      ...props,
      attributeName,
      attributeValue,
      defaultValue,
    });

const createValueGetter = ({
  currentName,
  deprecatedName,
}: ValueGetterConfig) => {
  return ({ element }: AttributeElementProps): string | null => {
    if (deprecatedName) {
      const deprecatedValue = element.getAttribute(deprecatedName);
      if (deprecatedValue !== null) {
        depcreationWarning({
          element,
          attributeNameOld: deprecatedName,
          attributeNameNew: currentName,
        });
      }
    }

    const value = element.getAttribute(currentName);
    if (value !== null) {
      return value;
    }

    return null;
  };
};

// Feature checks
const includesFeature = {
  animation: createAttributeCheck(
    AttributeNames.feature.ANIMATION,
    AttributesValues.state.FALSE,
    true,
  ),
  fullScreenOption: createAttributeCheck(
    AttributeNames.FULLSCREEN,
    AttributesValues.state.FALSE,
    true,
  ),
  visualTime: createAttributeCheck(
    AttributeNames.SHOW_TIME,
    AttributesValues.state.FALSE,
    true,
  ),
  lazyLoad: createAttributeCheck(
    AttributeNames.FEED_LAZY_LOAD,
    AttributesValues.state.TRUE,
  ),
} as const;

// Data checks
const isData = {
  union: createAttributeCheck(
    AttributeNames.FEED_UNION,
    AttributesValues.state.FALSE,
    true,
  ),
} as const;

// Display checks
const isDisplay = {
  feature: createAttributeCheck(
    AttributeNames.DISPLAY,
    AttributesValues.display.FEATURE,
  ),
  featured: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.TYPE,
      attributeNameNew: AttributeNames.display,
      attributeValue: AttributesValues.display.FEATURED,
    }) ||
    isAttributeEqual({
      ...props,
      attributeName: AttributeNames.display,
      attributeValue: AttributesValues.display.FEATURED,
    }),
  list: createAttributeCheck(
    AttributeNames.DISPLAY,
    AttributesValues.display.LIST,
  ),
  promo: createAttributeCheck(
    AttributeNames.DISPLAY,
    AttributesValues.display.PROMO,
  ),
  statement: createAttributeCheck(
    AttributeNames.DISPLAY,
    AttributesValues.display.STATEMENT,
  ),
  sticky: createAttributeCheck(
    AttributeNames.DISPLAY,
    AttributesValues.display.STICKY,
  ),
  stacked: createAttributeCheck(
    AttributeNames.DISPLAY,
    AttributesValues.display.STACKED,
  ),
  tabular: createAttributeCheck(
    AttributeNames.DISPLAY,
    AttributesValues.display.TABULAR,
  ),
} as const;

// Information checks
const isInfo = {
  admissions: createAttributeCheck(
    AttributeNames.information.ADMISSIONS,
    AttributesValues.state.TRUE,
  ),
  events: createAttributeCheck(
    AttributeNames.information.EVENTS,
    AttributesValues.state.TRUE,
  ),
  news: createAttributeCheck(
    AttributeNames.information.NEWS,
    AttributesValues.state.TRUE,
  ),
  schools: createAttributeCheck(
    AttributeNames.information.SCHOOLS,
    AttributesValues.state.TRUE,
  ),
  searchDomain: createAttributeCheck(
    AttributeNames.information.SEARCH_TYPE,
    AttributesValues.search.DOMAIN,
  ),
} as const;

const hasInfo = {
  gifts: (props: AttributeElementProps) =>
    isAttributeNotNull({
      ...props,
      attributeName: AttributeNames.information.GIFT,
    }),
  search: (props: AttributeElementProps) =>
    isAttributeNotNull({
      ...props,
      attributeName: AttributeNames.information.SEARCH,
    }),
};

// Layout checks
const isLayout = {
  alertOff: createAttributeCheck(
    AttributeNames.layout.ALERT_OFF,
    AttributesValues.state.TRUE,
  ),
  fullImage: createAttributeCheck(
    AttributeNames.TYPE,
    AttributesValues.Layout.FULL_IMAGE,
  ),
  image: createAttributeCheck(
    AttributeNames.TYPE,
    AttributesValues.display.IMAGE,
  ),
  fixed: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.LAYOUT_FIXED,
      attributeNameNew: AttributeNames.theme,
      attributeValue: '',
    }) ||
    isAttributeEqual({
      ...props,
      attributeName: AttributeNames.layout.FIXED,
      attributeValue: AttributesValues.state.TRUE,
    }),
  lockFull: createAttributeCheck(
    AttributeNames.layout.LOCK,
    AttributesValues.Layout.FULL,
  ),
} as const;

// Social checks

const isSharing = {
  email: createAttributeCheck(
    AttributeNames.sharing.EMAIL,
    AttributesValues.state.TRUE,
  ),
  print: createAttributeCheck(
    AttributeNames.sharing.PRINT,
    AttributesValues.state.TRUE,
  ),
} as const;

const includesSharing = {
  facebook: createAttributeCheck(
    AttributeNames.social.FACEBOOK,
    AttributesValues.state.TRUE,
    true,
  ),
  twitter: createAttributeCheck(
    AttributeNames.social.TWITTER,
    AttributesValues.state.TRUE,
    true,
  ),
} as const;

// Theme checks
const isTheme = {
  dark: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.THEME_DEPRECATD,
      attributeNameNew: AttributeNames.theme,
      attributeValue: AttributesValues.theme.DARK,
    }) ||
    isAttributeEqual({
      ...props,
      attributeName: AttributeNames.theme,
      attributeValue: AttributesValues.theme.DARK,
    }),
  gold: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.THEME_DEPRECATD,
      attributeNameNew: AttributeNames.theme,
      attributeValue: AttributesValues.theme.GOLD,
    }) ||
    isAttributeEqual({
      ...props,
      attributeName: AttributeNames.theme,
      attributeValue: AttributesValues.theme.GOLD,
    }),
  light: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.THEME_DEPRECATD,
      attributeNameNew: AttributeNames.theme,
      attributeValue: AttributesValues.theme.LIGHT,
    }) ||
    isAttributeEqual({
      ...props,
      attributeName: AttributeNames.theme,
      attributeValue: AttributesValues.theme.LIGHT,
    }),
  maryland: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.THEME_DEPRECATD,
      attributeNameNew: AttributeNames.theme,
      attributeValue: AttributesValues.theme.MARYLAND,
    }) ||
    isAttributeEqual({
      ...props,
      attributeName: AttributeNames.theme,
      attributeValue: AttributesValues.theme.MARYLAND,
    }),
} as const;

// Visual checks
const isVisual = {
  aligned: createAttributeCheck(
    AttributeNames.VISUAL_ALIGN,
    AttributesValues.state.TRUE,
  ),
  bordered: createAttributeCheck(
    AttributeNames.VISUAL_BORDER,
    AttributesValues.state.TRUE,
  ),
  list: createAttributeCheck(
    AttributeNames.DISPLAY,
    AttributesValues.display.LIST,
  ),
  icon_seal: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.VISUAL_HAS_LOGO,
      attributeNameNew: AttributeNames.visual.icon_seal,
      attributeValue: AttributesValues.state.TRUE,
    }) ||
    isAttributeEqual({
      ...props,
      attributeName: AttributeNames.visual.icon_seal,
      attributeValue: AttributesValues.state.TRUE,
    }),
  open: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.STATE_DEPRECATD,
      attributeNameNew: AttributeNames.visual.open,
      attributeValue: AttributesValues.state.OPENED,
    }) ||
    isAttributeEqual({
      ...props,
      attributeName: AttributeNames.visual.open,
      attributeValue: AttributesValues.state.TRUE,
    }),
  quote: createAttributeCheck(
    AttributeNames.VISUAL_QUOTE,
    AttributesValues.state.TRUE,
  ),
  showIcon: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.VISUAL_ICON,
      attributeNameNew: AttributeNames.visual.icon,
      attributeValue: AttributesValues.state.TRUE,
    }) ||
    isAttributeEqual({
      ...props,
      attributeName: AttributeNames.visual.icon,
      attributeValue: AttributesValues.state.TRUE,
    }),
  sizeNormal: createAttributeCheck(
    AttributeNames.DISPLAY_SIZE,
    AttributesValues.size.NORMAL,
  ),
  sizeLarge: createAttributeCheck(
    AttributeNames.DISPLAY_SIZE,
    AttributesValues.size.LARGE,
  ),
  stickyLast: createAttributeCheck(
    AttributeNames.OPTIONAL_STICKY_FIRST,
    AttributesValues.state.FALSE,
  ),
  textCentered: createAttributeCheck(
    AttributeNames.VISUAL_TEXT_CENTER,
    AttributesValues.Layout.TEXT_CENTER,
  ),
  transparent: createAttributeCheck(
    AttributeNames.VISUAL_TRANSPARENT,
    AttributesValues.state.TRUE,
  ),
} as const;

// Value getters
const getValue = {
  alertUrl: createValueGetter({
    currentName: AttributeNames.value.ALERT_URL,
  }),
  daysToHide: createValueGetter({
    currentName: AttributeNames.visual.hidden_days,
    deprecatedName: AttributeNames.VISUAL_DAYS_TO_HIDE,
  }),
  giftUrl: createValueGetter({
    currentName: AttributeNames.information.GIFT,
  }),
  layoutLock: createValueGetter({
    currentName: AttributeNames.layout.LOCK,
  }),
  title: createValueGetter({
    currentName: AttributeNames.information.TITLE,
  }),
  topPosition: createValueGetter({
    currentName: AttributeNames.LAYOUT_STICKY_TOP,
  }),
  url: createValueGetter({
    currentName: AttributeNames.information.URL,
  }),
} as const;

// Public API
export {
  includesFeature,
  isDisplay,
  isData,
  isInfo,
  hasInfo,
  isLayout,
  isSharing,
  includesSharing,
  isTheme,
  isVisual,
  getValue,
};

export type {
  AttributeElementProps,
  AttributeProps,
  AttributeNullProps,
  DeprecatedAttributeProps,
};
