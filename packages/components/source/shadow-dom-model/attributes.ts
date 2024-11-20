import AttributesNames from './attributes-names';
import AttributesValues from './attributes-value';

// Types
interface AttributeElementProps {
  element: HTMLElement;
  defaultValue?: boolean;
}

interface AttributeProps extends AttributeElementProps {
  attributeName: string;
  attributeValue: string;
}

interface DeprecatedAttributeProps extends AttributeElementProps {
  attributeNameOld: string;
  attributeNameNew: string;
  attributeValue: string;
}

// Core utilities
const isAttributeEqual = ({
  element,
  attributeName,
  attributeValue,
  defaultValue = false,
}: AttributeProps): boolean => {
  const value = element.getAttribute(attributeName);
  return value === attributeValue ? !defaultValue : defaultValue;
};

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

// Attribute check functions with default value = true
const createAttributeCheck =
  (attributeName: string, attributeValue: string, defaultValue = false) =>
  (props: AttributeElementProps): boolean =>
    isAttributeEqual({
      ...props,
      attributeName,
      attributeValue,
      defaultValue,
    });

// Feature toggles (defaultValue = true)
const includesAnimation = createAttributeCheck(
  AttributesNames.ANIMATION_STATE,
  AttributesValues.STATE_FALSE,
  true,
);

const includesFullScreenOption = createAttributeCheck(
  AttributesNames.OPTIONAL_FULLSCREEN,
  AttributesValues.STATE_FALSE,
  true,
);

const includesVisualTime = createAttributeCheck(
  AttributesNames.OPTIONAL_SHOW_TIME,
  AttributesValues.STATE_FALSE,
  true,
);

// Display types (defaultValue = false)
const isDisplayFeature = createAttributeCheck(
  AttributesNames.VISUAL_DISPLAY,
  AttributesValues.DISPLAY_FEATURE,
);

const isDisplayList = createAttributeCheck(
  AttributesNames.VISUAL_DISPLAY,
  AttributesValues.DISPLAY_LIST,
);

const isDisplayPromo = createAttributeCheck(
  AttributesNames.VISUAL_DISPLAY,
  AttributesValues.DISPLAY_PROMO,
);

// Theme checks with deprecated fallbacks
const isThemeLightDeprecated = (props: AttributeElementProps): boolean =>
  checkDeprecatedAttribute({
    ...props,
    attributeNameOld: AttributesNames.THEME,
    attributeNameNew: AttributesNames.THEME_DATA,
    attributeValue: AttributesValues.THEME_LIGHT,
  });

const isThemeDarkDeprecated = (props: AttributeElementProps): boolean =>
  checkDeprecatedAttribute({
    ...props,
    attributeNameOld: AttributesNames.THEME,
    attributeNameNew: AttributesNames.THEME_DATA,
    attributeValue: AttributesValues.THEME_DARK,
  });

const isThemeLight = (props: AttributeElementProps): boolean =>
  isThemeLightDeprecated(props) ||
  isAttributeEqual({
    ...props,
    attributeName: AttributesNames.THEME_DATA,
    attributeValue: AttributesValues.THEME_LIGHT,
  });

const isThemeDark = (props: AttributeElementProps): boolean =>
  isThemeDarkDeprecated(props) ||
  isAttributeEqual({
    ...props,
    attributeName: AttributesNames.THEME_DATA,
    attributeValue: AttributesValues.THEME_DARK,
  });

// Visual state checks
const isTransparent = createAttributeCheck(
  AttributesNames.VISUAL_TRANSPARENT,
  AttributesValues.STATE_TRUE,
);

const isStateOpen = createAttributeCheck(
  AttributesNames.STATE,
  AttributesValues.STATE_OPENED,
);

const isShowIcon = createAttributeCheck(
  AttributesNames.VISUAL_ICON,
  AttributesValues.STATE_TRUE,
);

const isTypeImage = createAttributeCheck(
  AttributesNames.TYPE,
  AttributesValues.DISPLAY_IMAGE,
);

const isVisuallyAligned = createAttributeCheck(
  AttributesNames.VISUAL_ALIGN,
  AttributesValues.STATE_TRUE,
);

const isVisuallyBordered = createAttributeCheck(
  AttributesNames.VISUAL_BORDER,
  AttributesValues.STATE_TRUE,
);

const isVisuallyLogo = createAttributeCheck(
  AttributesNames.VISUAL_HAS_LOGO,
  AttributesValues.STATE_TRUE,
);

const isVisuallyQuote = createAttributeCheck(
  AttributesNames.VISUAL_QUOTE,
  AttributesValues.STATE_TRUE,
);

const isStickyLast = createAttributeCheck(
  AttributesNames.OPTIONAL_STICKY_FIRST,
  AttributesValues.STATE_FALSE,
);

// Value getters
const valueDaysToHide = ({ element }: AttributeElementProps): string =>
  element.getAttribute(AttributesNames.VISUAL_DAYS_TO_HIDE) ?? '10';

const valueTopPosition = ({ element }: AttributeElementProps): string | null =>
  element.getAttribute(AttributesNames.LAYOUT_STICKY_TOP);

export default {
  // Feature toggles
  includesAnimation,
  includesFullScreenOption,
  includesVisualTime,

  // Display types
  isDisplayFeature,
  isDisplayList,
  isDisplayPromo,

  // Theme utilities
  isThemeLight,
  isThemeDark,

  // Visual state
  isTransparent,
  isStateOpen,
  isShowIcon,
  isTypeImage,
  isVisuallyAligned,
  isVisuallyBordered,
  isVisuallyLogo,
  isVisuallyQuote,
  isStickyLast,

  // Value getters
  valueDaysToHide,
  valueTopPosition,
} as const;
