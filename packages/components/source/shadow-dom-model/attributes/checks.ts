import list from 'macros/layout/list';
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
    AttributeNames.ANIMATION_STATE,
    AttributesValues.STATE_FALSE,
    true,
  ),
  fullScreenOption: createAttributeCheck(
    AttributeNames.OPTIONAL_FULLSCREEN,
    AttributesValues.STATE_FALSE,
    true,
  ),
  visualTime: createAttributeCheck(
    AttributeNames.OPTIONAL_SHOW_TIME,
    AttributesValues.STATE_FALSE,
    true,
  ),
} as const;

// Display checks
const isDisplay = {
  feature: createAttributeCheck(
    AttributeNames.VISUAL_DISPLAY,
    AttributesValues.DISPLAY_FEATURE,
  ),
  list: createAttributeCheck(
    AttributeNames.VISUAL_DISPLAY,
    AttributesValues.DISPLAY_LIST,
  ),
  promo: createAttributeCheck(
    AttributeNames.VISUAL_DISPLAY,
    AttributesValues.DISPLAY_PROMO,
  ),
} as const;

// Information checks
const isInfo = {
  admissions: createAttributeCheck(
    AttributeNames.INFORMATION_ADMISSIONS,
    AttributesValues.STATE_TRUE,
  ),
  events: createAttributeCheck(
    AttributeNames.INFORMATION_EVENTS,
    AttributesValues.STATE_TRUE,
  ),
  news: createAttributeCheck(
    AttributeNames.INFORMATION_NEWS,
    AttributesValues.STATE_TRUE,
  ),
  schools: createAttributeCheck(
    AttributeNames.INFORMATION_SCHOOLS,
    AttributesValues.STATE_TRUE,
  ),
  searchDomain: createAttributeCheck(
    AttributeNames.INFORMATION_SEARCH_TYPE,
    AttributesValues.SEARCH_DOMAIN,
  ),
} as const;

const hasInfo = {
  gifts: (props: AttributeElementProps) =>
    isAttributeNotNull({
      ...props,
      attributeName: AttributeNames.INFORMATION_GIFT,
    }),
  search: (props: AttributeElementProps) =>
    isAttributeNotNull({
      ...props,
      attributeName: AttributeNames.INFORMATION_SEARCH_TYPE,
    }),
};

// Layout checks
const isLayout = {
  lockFull: createAttributeCheck(
    AttributeNames.LAYOUT_LOCK,
    AttributesValues.LAYOUT_FULL,
  ),
  image: createAttributeCheck(
    AttributeNames.TYPE,
    AttributesValues.DISPLAY_IMAGE,
  ),
} as const;

// Theme checks
const isTheme = {
  dark: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.THEME_DEPRECATD,
      attributeNameNew: AttributeNames.THEME,
      attributeValue: AttributesValues.THEME_DARK,
    }) ||
    isAttributeEqual({
      ...props,
      attributeName: AttributeNames.THEME,
      attributeValue: AttributesValues.THEME_DARK,
    }),
  gold: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.THEME_DEPRECATD,
      attributeNameNew: AttributeNames.THEME,
      attributeValue: AttributesValues.THEME_GOLD,
    }) ||
    isAttributeEqual({
      ...props,
      attributeName: AttributeNames.THEME,
      attributeValue: AttributesValues.THEME_GOLD,
    }),
  light: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.THEME_DEPRECATD,
      attributeNameNew: AttributeNames.THEME,
      attributeValue: AttributesValues.THEME_LIGHT,
    }) ||
    isAttributeEqual({
      ...props,
      attributeName: AttributeNames.THEME,
      attributeValue: AttributesValues.THEME_LIGHT,
    }),
  maryland: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.THEME_DEPRECATD,
      attributeNameNew: AttributeNames.THEME,
      attributeValue: AttributesValues.THEME_MARYLAND,
    }) ||
    isAttributeEqual({
      ...props,
      attributeName: AttributeNames.THEME,
      attributeValue: AttributesValues.THEME_MARYLAND,
    }),
} as const;

// Visual checks
const isVisual = {
  transparent: createAttributeCheck(
    AttributeNames.VISUAL_TRANSPARENT,
    AttributesValues.STATE_TRUE,
  ),
  showIcon: createAttributeCheck(
    AttributeNames.VISUAL_ICON,
    AttributesValues.STATE_TRUE,
  ),
  aligned: createAttributeCheck(
    AttributeNames.VISUAL_ALIGN,
    AttributesValues.STATE_TRUE,
  ),
  bordered: createAttributeCheck(
    AttributeNames.VISUAL_BORDER,
    AttributesValues.STATE_TRUE,
  ),
  list: createAttributeCheck(
    AttributeNames.VISUAL_DISPLAY,
    AttributesValues.DISPLAY_LIST,
  ),
  logo: createAttributeCheck(
    AttributeNames.VISUAL_HAS_LOGO,
    AttributesValues.STATE_TRUE,
  ),
  quote: createAttributeCheck(
    AttributeNames.VISUAL_QUOTE,
    AttributesValues.STATE_TRUE,
  ),
  open: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.STATE_DEPRECATD,
      attributeNameNew: AttributeNames.STATE,
      attributeValue: AttributesValues.STATE_OPENED,
    }) ||
    isAttributeEqual({
      ...props,
      attributeName: AttributeNames.STATE,
      attributeValue: AttributesValues.STATE_OPENED,
    }),
  stickyLast: createAttributeCheck(
    AttributeNames.OPTIONAL_STICKY_FIRST,
    AttributesValues.STATE_FALSE,
  ),
} as const;

// Value getters
const getValue = {
  alertUrl: ({ element }: AttributeElementProps): string | null =>
    element.getAttribute(AttributeNames.VALUE_ALERT_URL) || null,
  daysToHide: ({ element }: AttributeElementProps): string =>
    element.getAttribute(AttributeNames.VISUAL_DAYS_TO_HIDE) ?? '10',
  giftUrl: ({ element }: AttributeElementProps): string =>
    element.getAttribute(AttributeNames.INFORMATION_GIFT) ||
    'https://giving.umd.edu/giving',
  layoutLock: ({ element }: AttributeElementProps): string | null =>
    element.getAttribute(AttributeNames.LAYOUT_LOCK),
  topPosition: ({ element }: AttributeElementProps): string | null =>
    element.getAttribute(AttributeNames.LAYOUT_STICKY_TOP),
} as const;

// Public API
export {
  includesFeature,
  isDisplay,
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
