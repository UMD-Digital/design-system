import { animation } from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';
import { StyleModifierProps } from '../_types';

export enum StyleType {
  Element = 'element',
  Child = 'child',
  SiblingAfter = 'sibling-after',
}

const TextColors = {
  white: { color: 'white' },
  black: { color: 'black' },
} as const;

const getTextColor = (isTextColorWhite?: boolean) =>
  isTextColorWhite ? 'black' : 'white';

const getLinkAnimationColor = ({
  isColorWhite,
  isColorBlack,
}: {
  isColorWhite?: boolean;
  isColorBlack?: boolean;
}) => {
  if (isColorWhite) return animation.line.slideUnderWhite;
  if (isColorBlack) return animation.line.slideUnderBlack;
  return animation.line.slideUnderRed;
};

const createSelector = (className: string, type: StyleType) => {
  const selectors = {
    [StyleType.Element]: `.${className}`,
    [StyleType.Child]: `.${className} *`,
    [StyleType.SiblingAfter]: `.${className} + *`,
  };
  return selectors[type];
};

const createStyles = (selector: string, styles: Record<string, any>) =>
  Utility.styles.convertJSSObjectToStyles({
    styleObj: { [selector]: styles },
  });

const createStyleGenerator =
  (type: StyleType) => (className: string, styles: Record<string, any>) =>
    createStyles(createSelector(className, type), styles);

const createModifier = (
  type: StyleType,
  styleGetter: (props: StyleModifierProps) => Record<string, any>,
) => {
  const generateStyles = createStyleGenerator(type);
  return (props: StyleModifierProps) =>
    generateStyles(props.className, styleGetter(props));
};

const styleGetters = {
  animation: ({ isColorBlack, isColorWhite }: StyleModifierProps) =>
    getLinkAnimationColor({ isColorBlack, isColorWhite }),
  baseStyles: ({ baseStyles }: StyleModifierProps) => baseStyles || {},
  color: ({ isTextColorWhite }: StyleModifierProps) =>
    TextColors[getTextColor(isTextColorWhite)],
  element: ({ element }: StyleModifierProps) => element || {},
  sibling: ({ siblingAfter }: StyleModifierProps) => siblingAfter || {},
  child: ({ subElement }: StyleModifierProps) => subElement || {},
};

export const modifiers = {
  animationLink: createModifier(StyleType.Element, styleGetters.animation),
  baseStyles: createModifier(StyleType.Element, styleGetters.baseStyles),
  textColor: createModifier(StyleType.Element, styleGetters.color),
  element: createModifier(StyleType.Element, styleGetters.element),
  elementSiblingAfter: createModifier(
    StyleType.SiblingAfter,
    styleGetters.sibling,
  ),
  elementChild: createModifier(StyleType.Child, styleGetters.child),
};
