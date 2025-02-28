import * as Styles from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';
import { StyleModifierProps } from './_types';

export enum StyleType {
  Element = 'element',
  Child = 'child',
  SiblingAfter = 'sibling-after',
}

const getTextColor = (isTextColorWhite?: boolean, isThemeDark?: boolean) => {
  const colors = {
    white: { color: 'white' },
  } as const;

  if (isTextColorWhite) {
    return colors.white;
  }

  if (isThemeDark) {
    return colors.white;
  }

  return null;
};

const getLinkAnimationColor = ({
  isThemeDark,
  isAnimationLineRed,
}: {
  isThemeDark?: boolean;
  isAnimationLineRed?: boolean;
}) => {
  if (isAnimationLineRed) return Styles.animation.line.slideUnderRed;
  if (isThemeDark) return Styles.animation.line.slideUnderWhite;

  return Styles.animation.line.slideUnderBlack;
};

const getLinkColor = ({ isThemeDark }: { isThemeDark?: boolean }) => {
  if (isThemeDark) return Styles.element.text.link.white;

  return Styles.element.text.link.red;
};

const createSelector = (className: string, type: StyleType) => {
  const selectors = {
    [StyleType.Element]: `.${className}`,
    [StyleType.Child]: `.${className} *`,
    [StyleType.SiblingAfter]: `.${className} + *`,
  };
  return selectors[type];
};

const createStyles = (selector: string, styles: Record<string, any> | null) => {
  if (styles === null) return '';

  return Utility.styles.convertJSSObjectToStyles({
    styleObj: { [selector]: styles },
  });
};

const createStyleGenerator =
  (type: StyleType) =>
  (className: string, styles: Record<string, any> | null) =>
    createStyles(createSelector(className, type), styles);

const createModifier = (
  type: StyleType,
  styleGetter: (props: StyleModifierProps) => Record<string, any> | null,
) => {
  const generateStyles = createStyleGenerator(type);

  return (props: StyleModifierProps) =>
    generateStyles(props.className, styleGetter(props));
};

const styleGetters = {
  animationLink: ({ isThemeDark, isAnimationLineRed }: StyleModifierProps) => ({
    a: getLinkAnimationColor({ isThemeDark, isAnimationLineRed }),
    [`&a`]: getLinkAnimationColor({ isThemeDark, isAnimationLineRed }),
  }),
  baseStyles: ({ baseStyles }: StyleModifierProps) => baseStyles || {},
  child: ({ subElement }: StyleModifierProps) => subElement || {},
  childLink: ({ isThemeDark }: StyleModifierProps) =>
    getLinkColor({ isThemeDark }),
  element: ({ element }: StyleModifierProps) => element || {},
  sibling: ({ siblingAfter }: StyleModifierProps) => siblingAfter || {},
  textColor: ({ isTextColorWhite, isThemeDark }: StyleModifierProps) =>
    getTextColor(isTextColorWhite, isThemeDark),
};

export const modifiers = {
  animationLink: createModifier(StyleType.Element, styleGetters.animationLink),
  baseStyles: createModifier(StyleType.Element, styleGetters.baseStyles),
  childLink: createModifier(StyleType.Element, styleGetters.childLink),
  element: createModifier(StyleType.Element, styleGetters.element),
  elementSiblingAfter: createModifier(
    StyleType.SiblingAfter,
    styleGetters.sibling,
  ),
  elementChild: createModifier(StyleType.Child, styleGetters.child),
  textColor: createModifier(StyleType.Element, styleGetters.textColor),
};
