import AttributeNames from './attributes-names';
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
  AttributeNames.ANIMATION_STATE,
  AttributesValues.STATE_FALSE,
  true,
);

const includesFullScreenOption = createAttributeCheck(
  AttributeNames.OPTIONAL_FULLSCREEN,
  AttributesValues.STATE_FALSE,
  true,
);

const includesVisualTime = createAttributeCheck(
  AttributeNames.OPTIONAL_SHOW_TIME,
  AttributesValues.STATE_FALSE,
  true,
);

// Display types (defaultValue = false)

const isDisplayFeature = createAttributeCheck(
  AttributeNames.VISUAL_DISPLAY,
  AttributesValues.DISPLAY_FEATURE,
);

const isDisplayList = createAttributeCheck(
  AttributeNames.VISUAL_DISPLAY,
  AttributesValues.DISPLAY_LIST,
);

const isDisplayPromo = createAttributeCheck(
  AttributeNames.VISUAL_DISPLAY,
  AttributesValues.DISPLAY_PROMO,
);

// Theme checks with deprecated fallbacks

const isThemeDarkDeprecated = (props: AttributeElementProps): boolean =>
  checkDeprecatedAttribute({
    ...props,
    attributeNameOld: AttributeNames.THEME,
    attributeNameNew: AttributeNames.THEME_DATA,
    attributeValue: AttributesValues.THEME_DARK,
  });

const isThemeGoldDeprecated = (props: AttributeElementProps): boolean =>
  checkDeprecatedAttribute({
    ...props,
    attributeNameOld: AttributeNames.THEME,
    attributeNameNew: AttributeNames.THEME_DATA,
    attributeValue: AttributesValues.THEME_GOLD,
  });

const isThemeLightDeprecated = (props: AttributeElementProps): boolean =>
  checkDeprecatedAttribute({
    ...props,
    attributeNameOld: AttributeNames.THEME,
    attributeNameNew: AttributeNames.THEME_DATA,
    attributeValue: AttributesValues.THEME_LIGHT,
  });

const isThemeMarylandDeprecated = (props: AttributeElementProps): boolean =>
  checkDeprecatedAttribute({
    ...props,
    attributeNameOld: AttributeNames.THEME,
    attributeNameNew: AttributeNames.THEME_DATA,
    attributeValue: AttributesValues.THEME_MARYLAND,
  });

const isThemeDark = (props: AttributeElementProps): boolean =>
  isThemeDarkDeprecated(props) ||
  isAttributeEqual({
    ...props,
    attributeName: AttributeNames.THEME_DATA,
    attributeValue: AttributesValues.THEME_DARK,
  });

const isThemeGold = (props: AttributeElementProps): boolean =>
  isThemeGoldDeprecated(props) ||
  isAttributeEqual({
    ...props,
    attributeName: AttributeNames.THEME_DATA,
    attributeValue: AttributesValues.THEME_GOLD,
  });

const isThemeLight = (props: AttributeElementProps): boolean =>
  isThemeLightDeprecated(props) ||
  isAttributeEqual({
    ...props,
    attributeName: AttributeNames.THEME_DATA,
    attributeValue: AttributesValues.THEME_LIGHT,
  });

const isThemeMaryland = (props: AttributeElementProps): boolean =>
  isThemeMarylandDeprecated(props) ||
  isAttributeEqual({
    ...props,
    attributeName: AttributeNames.THEME_DATA,
    attributeValue: AttributesValues.THEME_MARYLAND,
  });

// Visual state checks

const isTransparent = createAttributeCheck(
  AttributeNames.VISUAL_TRANSPARENT,
  AttributesValues.STATE_TRUE,
);

const isStateOpen = createAttributeCheck(
  AttributeNames.STATE,
  AttributesValues.STATE_OPENED,
);

const isShowIcon = createAttributeCheck(
  AttributeNames.VISUAL_ICON,
  AttributesValues.STATE_TRUE,
);

const isTypeImage = createAttributeCheck(
  AttributeNames.TYPE,
  AttributesValues.DISPLAY_IMAGE,
);

const isVisuallyAligned = createAttributeCheck(
  AttributeNames.VISUAL_ALIGN,
  AttributesValues.STATE_TRUE,
);

const isVisuallyBordered = createAttributeCheck(
  AttributeNames.VISUAL_BORDER,
  AttributesValues.STATE_TRUE,
);

const isVisuallyLogo = createAttributeCheck(
  AttributeNames.VISUAL_HAS_LOGO,
  AttributesValues.STATE_TRUE,
);

const isVisuallyQuote = createAttributeCheck(
  AttributeNames.VISUAL_QUOTE,
  AttributesValues.STATE_TRUE,
);

const isStickyLast = createAttributeCheck(
  AttributeNames.OPTIONAL_STICKY_FIRST,
  AttributesValues.STATE_FALSE,
);

// Value getters

const valueDaysToHide = ({ element }: AttributeElementProps): string =>
  element.getAttribute(AttributeNames.VISUAL_DAYS_TO_HIDE) ?? '10';

const valueTopPosition = ({ element }: AttributeElementProps): string | null =>
  element.getAttribute(AttributeNames.LAYOUT_STICKY_TOP);

export default {
  includesAnimation,
  includesFullScreenOption,
  includesVisualTime,
  isDisplayFeature,
  isDisplayList,
  isDisplayPromo,
  isThemeDark,
  isThemeGold,
  isThemeLight,
  isThemeMaryland,
  isTransparent,
  isStateOpen,
  isShowIcon,
  isTypeImage,
  isVisuallyAligned,
  isVisuallyBordered,
  isVisuallyLogo,
  isVisuallyQuote,
  isStickyLast,
  valueDaysToHide,
  valueTopPosition,
} as const;
