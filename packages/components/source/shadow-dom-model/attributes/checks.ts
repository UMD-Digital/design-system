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

// Core attribute check utilities
const isAttributeEqual = ({
  element,
  attributeName,
  attributeValue,
  defaultValue = false,
}: AttributeProps): boolean => {
  const value = element.getAttribute(attributeName);
  return value === attributeValue ? !defaultValue : defaultValue;
};

const isAttributeNotNull = ({
  element,
  attributeName,
}: AttributeNullProps): boolean => element.getAttribute(attributeName) !== null;

const checkDeprecatedAttribute = ({
  element,
  attributeNameOld,
  attributeNameNew,
  attributeValue,
  ...rest
}: DeprecatedAttributeProps): boolean => {
  const isDeprecatedUsed = isAttributeEqual({
    ...rest,
    element,
    attributeName: attributeNameOld,
    attributeValue,
  });

  if (isDeprecatedUsed) {
    console.warn(
      `UMD Web Component: ${element.nodeName} - Attribute "${attributeNameOld}" is deprecated. ` +
        `Use "${attributeNameNew}" instead. This attribute will be removed in version 2.0.`,
    );
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
  fullImage: createAttributeCheck(
    AttributeNames.TYPE,
    AttributesValues.Layout.FULL_IMAGE,
  ),
  image: createAttributeCheck(
    AttributeNames.TYPE,
    AttributesValues.display.IMAGE,
  ),
  lockFull: createAttributeCheck(
    AttributeNames.layout.LOCK,
    AttributesValues.Layout.FULL,
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
  logo: createAttributeCheck(
    AttributeNames.VISUAL_HAS_LOGO,
    AttributesValues.state.TRUE,
  ),
  open: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.STATE_DEPRECATD,
      attributeNameNew: AttributeNames.STATE,
      attributeValue: AttributesValues.state.OPENED,
    }) ||
    isAttributeEqual({
      ...props,
      attributeName: AttributeNames.STATE,
      attributeValue: AttributesValues.state.OPENED,
    }),
  quote: createAttributeCheck(
    AttributeNames.VISUAL_QUOTE,
    AttributesValues.state.TRUE,
  ),
  showIcon: createAttributeCheck(
    AttributeNames.VISUAL_ICON,
    AttributesValues.state.TRUE,
  ),
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
  alertUrl: ({ element }: AttributeElementProps): string | null =>
    element.getAttribute(AttributeNames.value.ALERT_URL) || null,
  daysToHide: ({ element }: AttributeElementProps): string =>
    element.getAttribute(AttributeNames.VISUAL_DAYS_TO_HIDE) ?? '10',
  giftUrl: ({ element }: AttributeElementProps): string =>
    element.getAttribute(AttributeNames.information.GIFT) ||
    'https://giving.umd.edu/giving',
  layoutLock: ({ element }: AttributeElementProps): string | null =>
    element.getAttribute(AttributeNames.layout.LOCK),
  topPosition: ({ element }: AttributeElementProps): string | null =>
    element.getAttribute(AttributeNames.LAYOUT_STICKY_TOP),
} as const;

// Public API
export {
  includesFeature,
  isDisplay,
  isData,
  isInfo,
  hasInfo,
  isLayout,
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
