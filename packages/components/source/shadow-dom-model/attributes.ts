import AttributesNames from './attributes-names';
import AttributesValues from './attributes-value';

type AttributeElementProps = {
  element: HTMLElement;
};

type AttributeProps = AttributeElementProps & {
  attributeName: string;
  attributeValue: string;
  defaultValue?: boolean;
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

const includesAnimation = (props: AttributeElementProps) =>
  isAttributesEqual({
    ...props,
    attributeName: AttributesNames.ANIMATION_STATE,
    attributeValue: AttributesValues.STATE_FALSE,
    defaultValue: true,
  });

const isThemeLight = (props: AttributeElementProps) =>
  isAttributesEqual({
    ...props,
    attributeName: AttributesNames.THEME,
    attributeValue: AttributesValues.THEME_LIGHT,
  });

const isThemeDark = (props: AttributeElementProps) =>
  isAttributesEqual({
    ...props,
    attributeName: AttributesNames.THEME,
    attributeValue: AttributesValues.THEME_DARK,
  });

const isTransparent = (props: AttributeElementProps) =>
  isAttributesEqual({
    ...props,
    attributeName: AttributesNames.VISUAL_TRANSPARENT,
    attributeValue: AttributesValues.STATE_TRUE,
  });

const isDisplayList = (props: AttributeElementProps) =>
  isAttributesEqual({
    ...props,
    attributeName: AttributesNames.VISUAL_DISPLAY,
    attributeValue: AttributesValues.DISPLAY_LIST,
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

const daysToHide = ({ element }: AttributeElementProps) => {
  const defaultDaysToHide = '10';
  const value = element.getAttribute(AttributesNames.VISUAL_DAYS_TO_HIDE);

  if (value) {
    return value;
  }

  return defaultDaysToHide;
};

export default {
  includesAnimation,
  isThemeLight,
  isThemeDark,
  isTransparent,
  isDisplayList,
  isStateOpen,
  isShowIcon,
  isVisuallyAligned,
  isVisuallyBordered,
  daysToHide,
};
