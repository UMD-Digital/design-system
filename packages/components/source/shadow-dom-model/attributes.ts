import AttributesNames from './attributes-names';
import AttributesValues from './attributes-value';

type AttributeElementProps = {
  element: HTMLElement;
  defaultValue?: boolean;
};

type AttributeProps = AttributeElementProps & {
  attributeName: string;
  attributeValue: string;
};

type DepcreatedAttributeProps = AttributeElementProps & {
  attributeNameOld: string;
  attributeNameNew: string;
  attributeValue: string;
};

const isAttributesEqual = ({
  element,
  attributeName,
  attributeValue,
  defaultValue = false,
}: AttributeProps) => {
  const name = element.getAttribute(attributeName);

  if (name && name === attributeValue) return !defaultValue;

  return defaultValue;
};

const isDepcreated = (props: DepcreatedAttributeProps) => {
  const { element, attributeNameOld, attributeValue, attributeNameNew } = props;

  const isDepcratedUsed = isAttributesEqual({
    ...props,
    attributeName: attributeNameOld,
    attributeValue: attributeValue,
  });

  if (isDepcratedUsed) {
    console.warn(
      `UMD Web Component: ${element.nodeName} - Attribute ${attributeNameOld} is deprecated. Use ${attributeNameNew} instead. This attribute will be removed with release 2.0.`,
    );
    return true;
  }

  return false;
};

const includesAnimation = (props: AttributeElementProps) =>
  isAttributesEqual({
    ...props,
    attributeName: AttributesNames.ANIMATION_STATE,
    attributeValue: AttributesValues.STATE_FALSE,
    defaultValue: true,
  });

const includesFullScreenOption = (props: AttributeElementProps) =>
  isAttributesEqual({
    ...props,
    attributeName: AttributesNames.OPTIONAL_FULLSCREEN,
    attributeValue: AttributesValues.STATE_FALSE,
    defaultValue: true,
  });

const includesVisualTime = (props: AttributeElementProps) =>
  isAttributesEqual({
    ...props,
    attributeName: AttributesNames.OPTIONAL_SHOW_TIME,
    attributeValue: AttributesValues.STATE_FALSE,
    defaultValue: true,
  });

const isDisplayFeature = (props: AttributeElementProps) =>
  isAttributesEqual({
    ...props,
    attributeName: AttributesNames.VISUAL_DISPLAY,
    attributeValue: AttributesValues.DISPLAY_FEATURE,
  });

const isDisplayList = (props: AttributeElementProps) =>
  isAttributesEqual({
    ...props,
    attributeName: AttributesNames.VISUAL_DISPLAY,
    attributeValue: AttributesValues.DISPLAY_LIST,
  });

const isDisplayPromo = (props: AttributeElementProps) =>
  isAttributesEqual({
    ...props,
    attributeName: AttributesNames.VISUAL_DISPLAY,
    attributeValue: AttributesValues.DISPLAY_PROMO,
  });

const isThemeLight = (props: AttributeElementProps) =>
  isThemeLightDepcreated(props) ||
  isAttributesEqual({
    ...props,
    attributeName: AttributesNames.THEME_DATA,
    attributeValue: AttributesValues.THEME_LIGHT,
  });

const isThemeDark = (props: AttributeElementProps) =>
  isThemeDarkDepcreated(props) ||
  isAttributesEqual({
    ...props,
    attributeName: AttributesNames.THEME_DATA,
    attributeValue: AttributesValues.THEME_DARK,
  });

const isTransparent = (props: AttributeElementProps) =>
  isAttributesEqual({
    ...props,
    attributeName: AttributesNames.VISUAL_TRANSPARENT,
    attributeValue: AttributesValues.STATE_TRUE,
  });

const isStateOpen = (props: AttributeElementProps) =>
  isAttributesEqual({
    ...props,
    attributeName: AttributesNames.STATE,
    attributeValue: AttributesValues.STATE_OPENED,
  });

const isShowIcon = (props: AttributeElementProps) =>
  isAttributesEqual({
    ...props,
    attributeName: AttributesNames.VISUAL_ICON,
    attributeValue: AttributesValues.STATE_TRUE,
  });

const isTypeImage = (props: AttributeElementProps) =>
  isAttributesEqual({
    ...props,
    attributeName: AttributesNames.TYPE,
    attributeValue: AttributesValues.DISPLAY_IMAGE,
  });

const isVisuallyAligned = (props: AttributeElementProps) =>
  isAttributesEqual({
    ...props,
    attributeName: AttributesNames.VISUAL_ALIGN,
    attributeValue: AttributesValues.STATE_TRUE,
  });

const isVisuallyBordered = (props: AttributeElementProps) =>
  isAttributesEqual({
    ...props,
    attributeName: AttributesNames.VISUAL_BORDER,
    attributeValue: AttributesValues.STATE_TRUE,
  });

const isVisuallyLogo = (props: AttributeElementProps) =>
  isAttributesEqual({
    ...props,
    attributeName: AttributesNames.VISUAL_HAS_LOGO,
    attributeValue: AttributesValues.STATE_TRUE,
  });

const isVisuallyQuote = (props: AttributeElementProps) =>
  isAttributesEqual({
    ...props,
    attributeName: AttributesNames.VISUAL_QUOTE,
    attributeValue: AttributesValues.STATE_TRUE,
  });

const daysToHide = ({ element }: AttributeElementProps) => {
  const defaultDaysToHide = '10';
  const value = element.getAttribute(AttributesNames.VISUAL_DAYS_TO_HIDE);

  if (value) {
    return value;
  }

  return defaultDaysToHide;
};

// Depcrated

const isThemeLightDepcreated = (props: AttributeElementProps) =>
  isDepcreated({
    ...props,
    attributeNameOld: AttributesNames.THEME,
    attributeNameNew: AttributesNames.THEME_DATA,
    attributeValue: AttributesValues.THEME_LIGHT,
  });

const isThemeDarkDepcreated = (props: AttributeElementProps) =>
  isDepcreated({
    ...props,
    attributeNameOld: AttributesNames.THEME,
    attributeNameNew: AttributesNames.THEME_DATA,
    attributeValue: AttributesValues.THEME_DARK,
  });

const attributesDefaultFalse = {
  includesAnimation,
  includesFullScreenOption,
  includesVisualTime,
};

const attributesDefaultTrue = {
  isDisplayFeature,
  isDisplayList,
  isDisplayPromo,
  isThemeLight,
  isThemeDark,
  isTransparent,
  isStateOpen,
  isShowIcon,
  isTypeImage,
  isVisuallyAligned,
  isVisuallyBordered,
  isVisuallyLogo,
  isVisuallyQuote,
};

const attributesWithValue = {
  daysToHide,
};

export default {
  ...attributesDefaultFalse,
  ...attributesDefaultTrue,
  ...attributesWithValue,
};
