/**
 * Attribute Check Utilities
 *
 * Provides a comprehensive set of functions to check attribute states on HTML elements.
 * These utilities form the foundation of the component attribute system.
 *
 * ## Function Categories:
 *
 * 1. **isTheme**: Theme-related checks (dark, light, gold, maryland)
 * 2. **isVisual**: Visual state checks (aligned, bordered, transparent, etc.)
 * 3. **isDisplay**: Display mode checks (feature, list, promo, etc.)
 * 4. **isLayout**: Layout configuration checks (fixed, hidden, position)
 * 5. **isInfo**: Content type checks (admissions, events, news, etc.)
 * 6. **includesFeature**: Feature flag checks (animation, lazyLoad, etc.)
 * 7. **getValue**: Attribute value getters (url, title, styleProps)
 *
 * ## Naming Convention:
 * - `is*` functions return boolean values
 * - `includes*` functions check for feature presence
 * - `getValue*` functions return string values
 *
 * ## Deprecation Handling:
 * Many functions handle both current (data-*) and deprecated attribute names,
 * logging warnings when deprecated attributes are used.
 */
import * as Styles from '@universityofmaryland/web-styles-library';
import AttributeNames from './names';
import AttributesValues from './values';

// Types
/**
 * Properties for attribute checking functions
 */
interface AttributeElementProps {
  /** The HTML element to check attributes on */
  element: HTMLElement;
  /** Default value to return if attribute is not found */
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

/**
 * Checks if an attribute equals a specific value.
 * Returns defaultValue if attribute is not present.
 * Special handling: 'false' string always returns false.
 *
 * @internal
 */
const isAttributeTrue = ({
  element,
  attributeName,
  attributeValue,
  defaultValue = false,
}: AttributeProps): boolean => {
  const value = element.getAttribute(attributeName);

  if (value === null) {
    return defaultValue;
  }

  if (value === 'false') {
    return false;
  }

  return value === attributeValue;
};

const isAttributeNotNull = ({
  element,
  attributeName,
}: AttributeNullProps): boolean => {
  const value = element.getAttribute(attributeName);

  if (value === 'true') return true;
  if (value === 'false') return false;

  return value !== null;
};

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
  const isDeprecatedUsed = isAttributeTrue({
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
    isAttributeTrue({
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

        return deprecatedValue;
      }
    }

    const value = element.getAttribute(currentName);
    if (value !== null) {
      return value;
    }

    return null;
  };
};

// Value checks with null checks
const hasInfo = {
  gifts: (props: AttributeElementProps) =>
    isAttributeNotNull({
      ...props,
      attributeName: AttributeNames.information.gift,
    }),
  search: (props: AttributeElementProps) =>
    isAttributeNotNull({
      ...props,
      attributeName: AttributeNames.information.search,
    }),
};

// Decoration checks
const hasDecoration = {
  line: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.deprecated.option.OPTIONAL_HAS_LINE,
      attributeNameNew: AttributeNames.decoration.line,
      attributeValue: '',
    }) ||
    isAttributeNotNull({
      ...props,
      attributeName: AttributeNames.decoration.line,
    }),
};

// Feature checks
const includesFeature = {
  animation: createAttributeCheck(
    AttributeNames.feature.animation,
    AttributesValues.state.TRUE,
    true,
  ),
  fullScreenOption: createAttributeCheck(
    AttributeNames.deprecated.feature.FULLSCREEN,
    AttributesValues.state.TRUE,
    true,
  ),
  visualTime: createAttributeCheck(
    AttributeNames.deprecated.feature.SHOW_TIME,
    AttributesValues.state.TRUE,
    true,
  ),
  lazyLoad: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.deprecated.feed.FEED_LAZY_LOAD,
      attributeNameNew: AttributeNames.feature.lazyLoad,
      attributeValue: AttributesValues.state.TRUE,
    }) ||
    isAttributeTrue({
      ...props,
      attributeName: AttributeNames.feature.lazyLoad,
      attributeValue: AttributesValues.state.TRUE,
    }),
} as const;

// Data checks
const isData = {
  type: {
    academic: (props: AttributeElementProps): boolean =>
      checkDeprecatedAttribute({
        ...props,
        attributeNameOld: AttributeNames.deprecated.type.TYPE,
        attributeNameNew: AttributeNames.feed.type,
        attributeValue: AttributesValues.data.type.academic,
      }) ||
      isAttributeTrue({
        ...props,
        attributeName: AttributeNames.feed.type,
        attributeValue: AttributesValues.data.type.academic,
      }),
  },
  union: createAttributeCheck(
    AttributeNames.deprecated.feed.FEED_UNION,
    AttributesValues.state.FALSE,
    true,
  ),
} as const;

// Display checks
const isDisplay = {
  block: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.deprecated.display.DISPLAY_TYPE,
      attributeNameNew: AttributeNames.display.default,
      attributeValue: AttributesValues.display.block,
    }) ||
    isAttributeTrue({
      ...props,
      attributeName: AttributeNames.display.default,
      attributeValue: AttributesValues.display.block,
    }),
  feature: createAttributeCheck(
    AttributeNames.deprecated.display.DISPLAY,
    AttributesValues.display.feature,
  ),
  featured: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.deprecated.type.TYPE,
      attributeNameNew: AttributeNames.display.default,
      attributeValue: AttributesValues.display.featured,
    }) ||
    isAttributeTrue({
      ...props,
      attributeName: AttributeNames.display.default,
      attributeValue: AttributesValues.display.featured,
    }),
  list: createAttributeCheck(
    AttributeNames.deprecated.display.DISPLAY,
    AttributesValues.display.list,
  ),
  outline: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.deprecated.type.TYPE,
      attributeNameNew: AttributeNames.display.default,
      attributeValue: AttributesValues.type.OUTLINE,
    }) ||
    isAttributeTrue({
      ...props,
      attributeName: AttributeNames.display.default,
      attributeValue: AttributesValues.type.OUTLINE,
    }),
  overlay: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.deprecated.type.TYPE,
      attributeNameNew: AttributeNames.display.default,
      attributeValue: AttributesValues.display.overlay,
    }) ||
    isAttributeTrue({
      ...props,
      attributeName: AttributeNames.display.default,
      attributeValue: AttributesValues.display.overlay,
    }),
  promo: createAttributeCheck(
    AttributeNames.deprecated.display.DISPLAY,
    AttributesValues.display.promo,
  ),
  primary: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.deprecated.type.TYPE,
      attributeNameNew: AttributeNames.display.default,
      attributeValue: AttributesValues.type.PRIMARY,
    }) ||
    isAttributeTrue({
      ...props,
      attributeName: AttributeNames.display.default,
      attributeValue: AttributesValues.type.PRIMARY,
    }),
  secondary: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.deprecated.type.TYPE,
      attributeNameNew: AttributeNames.display.default,
      attributeValue: AttributesValues.type.SECONDARY,
    }) ||
    isAttributeTrue({
      ...props,
      attributeName: AttributeNames.display.default,
      attributeValue: AttributesValues.type.SECONDARY,
    }),
  short: createAttributeCheck(
    AttributeNames.display.default,
    AttributesValues.display.short,
  ),
  statement: createAttributeCheck(
    AttributeNames.deprecated.display.DISPLAY,
    AttributesValues.display.statement,
  ),
  sticky: createAttributeCheck(
    AttributeNames.deprecated.display.DISPLAY,
    AttributesValues.display.sticky,
  ),
  stacked: createAttributeCheck(
    AttributeNames.deprecated.display.DISPLAY,
    AttributesValues.display.stacked,
  ),
  tabular: createAttributeCheck(
    AttributeNames.deprecated.display.DISPLAY,
    AttributesValues.display.tabular,
  ),
} as const;

// Information checks
const isInfo = {
  admissions: createAttributeCheck(
    AttributeNames.information.admissions,
    AttributesValues.state.TRUE,
  ),
  events: createAttributeCheck(
    AttributeNames.information.events,
    AttributesValues.state.TRUE,
  ),
  news: createAttributeCheck(
    AttributeNames.information.news,
    AttributesValues.state.TRUE,
  ),
  schools: createAttributeCheck(
    AttributeNames.information.schools,
    AttributesValues.state.TRUE,
  ),
  searchDomain: createAttributeCheck(
    AttributeNames.information.searchType,
    AttributesValues.search.DOMAIN,
  ),
} as const;

// Layout checks
const isLayout = {
  alertOff: createAttributeCheck(
    AttributeNames.layout.alertOff,
    AttributesValues.state.TRUE,
  ),
  alignmentRight: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.deprecated.layout.LAYOUT_ALIGNMENT,
      attributeNameNew: AttributeNames.layout.alignment,
      attributeValue: AttributesValues.layout.RIGHT,
    }) ||
    isAttributeTrue({
      ...props,
      attributeName: AttributeNames.layout.alignment,
      attributeValue: AttributesValues.layout.RIGHT,
    }),
  fixed: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.deprecated.layout.LAYOUT_FIXED,
      attributeNameNew: AttributeNames.layout.fixed,
      attributeValue: '',
    }) ||
    isAttributeTrue({
      ...props,
      attributeName: AttributeNames.layout.fixed,
      attributeValue: AttributesValues.state.TRUE,
    }),
  fullImage: createAttributeCheck(
    AttributeNames.deprecated.type.TYPE,
    AttributesValues.layout.FULL_IMAGE,
  ),
  hidden: createAttributeCheck(
    AttributeNames.layout.hidden,
    AttributesValues.state.TRUE,
  ),
  image: createAttributeCheck(
    AttributeNames.deprecated.type.TYPE,
    AttributesValues.display.image,
  ),
  lockFull: createAttributeCheck(
    AttributeNames.layout.lock,
    AttributesValues.layout.FULL,
  ),
  reverse: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.deprecated.layout.DEFAULT,
      attributeNameNew: AttributeNames.layout.reverse,
      attributeValue: AttributesValues.state.TRUE,
    }) ||
    isAttributeTrue({
      ...props,
      attributeName: AttributeNames.layout.reverse,
      attributeValue: AttributesValues.state.TRUE,
    }),
} as const;

// Social checks

const isSharing = {
  email: createAttributeCheck(
    AttributeNames.sharing.email,
    AttributesValues.state.TRUE,
  ),
  print: createAttributeCheck(
    AttributeNames.sharing.print,
    AttributesValues.state.TRUE,
  ),
} as const;

const includesSharing = {
  facebook: createAttributeCheck(
    AttributeNames.social.facebook,
    AttributesValues.state.TRUE,
    true,
  ),
  twitter: createAttributeCheck(
    AttributeNames.social.twitter,
    AttributesValues.state.TRUE,
    true,
  ),
} as const;

// Theme checks
const isTheme = {
  dark: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.deprecated.theme.THEME_DEPRECATD,
      attributeNameNew: AttributeNames.theme.default,
      attributeValue: AttributesValues.theme.DARK,
    }) ||
    isAttributeTrue({
      ...props,
      attributeName: AttributeNames.theme.default,
      attributeValue: AttributesValues.theme.DARK,
    }),
  gold: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.deprecated.theme.THEME_DEPRECATD,
      attributeNameNew: AttributeNames.theme.default,
      attributeValue: AttributesValues.theme.GOLD,
    }) ||
    isAttributeTrue({
      ...props,
      attributeName: AttributeNames.theme.default,
      attributeValue: AttributesValues.theme.GOLD,
    }),
  light: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.deprecated.theme.THEME_DEPRECATD,
      attributeNameNew: AttributeNames.theme.default,
      attributeValue: AttributesValues.theme.LIGHT,
    }) ||
    isAttributeTrue({
      ...props,
      attributeName: AttributeNames.theme.default,
      attributeValue: AttributesValues.theme.LIGHT,
    }),
  maryland: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.deprecated.theme.THEME_DEPRECATD,
      attributeNameNew: AttributeNames.theme.default,
      attributeValue: AttributesValues.theme.MARYLAND,
    }) ||
    isAttributeTrue({
      ...props,
      attributeName: AttributeNames.theme.default,
      attributeValue: AttributesValues.theme.MARYLAND,
    }),
} as const;

// Visual checks
const isVisual = {
  aligned: createAttributeCheck(
    AttributeNames.deprecated.visual.VISUAL_ALIGN,
    AttributesValues.state.TRUE,
  ),
  bordered: createAttributeCheck(
    AttributeNames.deprecated.visual.VISUAL_BORDER,
    AttributesValues.state.TRUE,
  ),
  list: createAttributeCheck(
    AttributeNames.deprecated.display.DISPLAY,
    AttributesValues.display.list,
  ),
  icon_seal: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.deprecated.visual.VISUAL_HAS_LOGO,
      attributeNameNew: AttributeNames.visual.icon_seal,
      attributeValue: AttributesValues.state.TRUE,
    }) ||
    isAttributeTrue({
      ...props,
      attributeName: AttributeNames.visual.icon_seal,
      attributeValue: AttributesValues.state.TRUE,
    }),
  open: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.deprecated.state.STATE_DEPRECATD,
      attributeNameNew: AttributeNames.visual.open,
      attributeValue: AttributesValues.state.OPENED,
    }) ||
    isAttributeTrue({
      ...props,
      attributeName: AttributeNames.visual.open,
      attributeValue: AttributesValues.state.TRUE,
    }),
  quote: createAttributeCheck(
    AttributeNames.deprecated.visual.VISUAL_QUOTE,
    AttributesValues.state.TRUE,
  ),
  showIcon: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.deprecated.visual.VISUAL_ICON,
      attributeNameNew: AttributeNames.visual.icon,
      attributeValue: AttributesValues.state.TRUE,
    }) ||
    isAttributeTrue({
      ...props,
      attributeName: AttributeNames.visual.icon,
      attributeValue: AttributesValues.state.TRUE,
    }),
  sizeNormal: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.deprecated.display.DISPLAY_SIZE,
      attributeNameNew: AttributeNames.visual.size,
      attributeValue: AttributesValues.size.NORMAL,
    }) ||
    isAttributeTrue({
      ...props,
      attributeName: AttributeNames.visual.size,
      attributeValue: AttributesValues.size.NORMAL,
    }),
  sizeLarge: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.deprecated.display.DISPLAY_SIZE,
      attributeNameNew: AttributeNames.visual.size,
      attributeValue: AttributesValues.size.LARGE,
    }) ||
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.deprecated.display.DISPLAY_SIZE,
      attributeNameNew: AttributeNames.visual.size,
      attributeValue: '',
    }) ||
    isAttributeTrue({
      ...props,
      attributeName: AttributeNames.visual.size,
      attributeValue: AttributesValues.size.LARGE,
    }),
  stickyFirst: createAttributeCheck(
    AttributeNames.deprecated.option.OPTIONAL_STICKY_FIRST,
    AttributesValues.state.TRUE,
    true,
  ),
  textCentered: createAttributeCheck(
    AttributeNames.deprecated.visual.VISUAL_TEXT_CENTER,
    AttributesValues.layout.CENTER,
  ),
  transparent: (props: AttributeElementProps): boolean =>
    checkDeprecatedAttribute({
      ...props,
      attributeNameOld: AttributeNames.deprecated.visual.VISUAL_TRANSPARENT,
      attributeNameNew: AttributeNames.visual.transparent,
      attributeValue: AttributesValues.state.TRUE,
    }) ||
    isAttributeTrue({
      ...props,
      attributeName: AttributeNames.visual.transparent,
      attributeValue: AttributesValues.state.TRUE,
    }),
} as const;

// Value getters
const getValue = {
  alertUrl: createValueGetter({
    currentName: AttributeNames.information.alertUrl,
  }),
  daysToHide: createValueGetter({
    currentName: AttributeNames.visual.hidden_days,
    deprecatedName: AttributeNames.deprecated.visual.VISUAL_DAYS_TO_HIDE,
  }),
  feedEntryRemoveIds: createValueGetter({
    currentName: AttributeNames.information.removeIds,
    deprecatedName: AttributeNames.deprecated.feed.FEED_NOT_ENTRIES,
  }),
  feedFilterIds: createValueGetter({
    currentName: AttributeNames.information.filterIds,
    deprecatedName: AttributeNames.deprecated.feed.FEED_CATEGORIES,
  }),
  feedToken: createValueGetter({
    currentName: AttributeNames.information.token,
    deprecatedName: AttributeNames.deprecated.feed.FEED_TOKEN,
  }),
  giftUrl: createValueGetter({
    currentName: AttributeNames.information.gift,
  }),
  layoutColumnCount: createValueGetter({
    currentName: AttributeNames.layout.columnCount,
    deprecatedName: AttributeNames.deprecated.feed.FEED_COLUMN_COUNT,
  }),
  layoutLock: createValueGetter({
    currentName: AttributeNames.layout.lock,
  }),
  layoutRowCount: createValueGetter({
    currentName: AttributeNames.layout.rowCount,
    deprecatedName: AttributeNames.deprecated.feed.FEED_ROW_COUNT,
  }),
  title: createValueGetter({
    currentName: AttributeNames.information.title,
  }),
  topPosition: createValueGetter({
    currentName: AttributeNames.layout.position,
    deprecatedName: AttributeNames.deprecated.layout.LAYOUT_STICKY_TOP,
  }),
  styleProps: (props: AttributeElementProps) => {
    const cssString = createValueGetter({
      ...props,
      currentName: AttributeNames.deprecated.visual.VISUAL_STYLE_PROPS,
    });

    if (cssString && typeof cssString === 'string') {
      return Styles.utilities.create.jss.objectFromString(cssString);
    }
  },
  url: createValueGetter({
    currentName: AttributeNames.information.url,
  }),
} as const;

// Public API
export {
  hasInfo,
  hasDecoration,
  includesFeature,
  isDisplay,
  isData,
  isInfo,
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
