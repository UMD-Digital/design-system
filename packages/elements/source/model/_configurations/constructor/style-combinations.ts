import * as Utility from 'utilities';
import { modifiers } from '../../_modifiers/style';
import { type BuilderConfig, type StyleModifierProps } from '../../_types';

const defaultModifier = (props: StyleModifierProps) => [
  modifiers.baseStyles(props),
  modifiers.element(props),
  modifiers.elementChild(props),
  modifiers.elementSiblingAfter(props),
  modifiers.textColor(props),
];

export const base: BuilderConfig = {
  styleModifiers: (props) =>
    Utility.styles.combineStyles(...defaultModifier(props)),
};

export const text: BuilderConfig = {
  styleModifiers: (props) =>
    Utility.styles.combineStyles(
      modifiers.childLink(props),
      ...defaultModifier(props),
    ),
};

export const action: BuilderConfig = {
  styleModifiers: (props) =>
    Utility.styles.combineStyles(
      modifiers.baseStyles(props),
      modifiers.textColor(props),
      modifiers.element(props),
      modifiers.elementChild(props),
      modifiers.elementSiblingAfter(props),
    ),
};

export const animationLine: BuilderConfig = {
  styleModifiers: (props) =>
    Utility.styles.combineStyles(
      modifiers.animationLink(props),
      ...defaultModifier(props),
    ),
  elementModifiers: [
    (element) => Utility.markup.modify.wrapTextNodeInSpan(element),
  ],
};
