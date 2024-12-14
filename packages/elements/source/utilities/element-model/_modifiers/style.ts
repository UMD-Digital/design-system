import { Animations } from '@universityofmaryland/variables';
import { Styles } from 'utilities';

export enum StyleType {
  Element = 'element',
  Child = 'child',
  SiblingAfter = 'sibling-after',
}

export interface ElementStyles {
  element?: Record<string, any>;
  siblingAfter?: Record<string, any>;
  subElement?: Record<string, any>;
}

export interface ElementStyleOptions extends ElementStyles {
  fontStyles?: Record<string, any>;
  isColorWhite?: boolean;
}

export interface ModifierProps extends ElementStyleOptions {
  className: string;
}

const Colors = {
  white: { color: 'white' },
  black: { color: 'black' },
} as const;

const LinkAnimations = {
  white: Animations.Link.LineSlideUnder.white,
  black: Animations.Link.LineSlideUnder.black,
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
  styleGetter: (props: ModifierProps) => Record<string, any>,
) => {
  const generateStyles = createStyleGenerator(type);
  return (props: ModifierProps) =>
    generateStyles(props.className, styleGetter(props));
};

const styleGetters = {
  animation: ({ isColorWhite }: ModifierProps) => ({
    a: LinkAnimations[getColor(isColorWhite)],
  }),
  font: ({ fontStyles }: ModifierProps) => fontStyles || {},
  color: ({ isColorWhite }: ModifierProps) => Colors[getColor(isColorWhite)],
  element: ({ element }: ModifierProps) => element || {},
  sibling: ({ siblingAfter }: ModifierProps) => siblingAfter || {},
  child: ({ subElement }: ModifierProps) => subElement || {},
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
