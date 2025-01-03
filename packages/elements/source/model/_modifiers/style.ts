import { animations } from '@universityofmaryland/web-elements-styles';
import { Styles } from 'utilities';
import { StyleModifierProps } from '../_types';

export enum StyleType {
  Element = 'element',
  Child = 'child',
  SiblingAfter = 'sibling-after',
}

const colors = {
  white: { color: 'white' },
  black: { color: 'black' },
} as const;

const LinkAnimations = {
  white: animations.line.slideUnderWhite,
  black: animations.line.slideUnderBlack,
} as const;

const getColor = (isColorWhite?: boolean) => (isColorWhite ? 'black' : 'white');

const createSelector = (className: string, type: StyleType) => {
  const selectors = {
    [StyleType.Element]: `.${className}`,
    [StyleType.Child]: `.${className} *`,
    [StyleType.SiblingAfter]: `.${className} + *`,
  };
  return selectors[type];
};

const createStyles = (selector: string, styles: Record<string, any>) =>
  Styles.convertJSSObjectToStyles({
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
  animation: ({ isColorWhite }: StyleModifierProps) => ({
    a: LinkAnimations[getColor(isColorWhite)],
  }),
  font: ({ fontStyles }: StyleModifierProps) => fontStyles || {},
  color: ({ isColorWhite }: StyleModifierProps) =>
    colors[getColor(isColorWhite)],
  element: ({ element }: StyleModifierProps) => element || {},
  sibling: ({ siblingAfter }: StyleModifierProps) => siblingAfter || {},
  child: ({ subElement }: StyleModifierProps) => subElement || {},
};

export const modifiers = {
  animationLink: createModifier(StyleType.Element, styleGetters.animation),
  fontStyles: createModifier(StyleType.Element, styleGetters.font),
  textColor: createModifier(StyleType.Element, styleGetters.color),
  element: createModifier(StyleType.Element, styleGetters.element),
  elementSiblingAfter: createModifier(
    StyleType.SiblingAfter,
    styleGetters.sibling,
  ),
  elementChild: createModifier(StyleType.Child, styleGetters.child),
};
