import * as Utility from 'utilities';
import { modifiers } from '../../_modifiers/style';
import { type BuilderConfig, type StyleModifierProps } from '../../_types';

const defaultModifier = (props: StyleModifierProps) => [
  modifiers.textColor(props),
  modifiers.baseStyles(props),
  modifiers.element(props),
  modifiers.elementChild(props),
  modifiers.elementSiblingAfter(props),
];

export const defaultConfig: BuilderConfig = {
  styleModifiers: (props) =>
    Utility.styles.combineStyles(...defaultModifier(props)),
};

export const textConfig: BuilderConfig = {
  styleModifiers: (props) =>
    Utility.styles.combineStyles(
      modifiers.childLink(props),
      ...defaultModifier(props),
    ),
};

export const animationLineConfig: BuilderConfig = {
  styleModifiers: (props) =>
    Utility.styles.combineStyles(
      modifiers.animationLink(props),
      ...defaultModifier(props),
    ),
  elementModifiers: [
    (element) => Utility.markup.modify.wrapTextNodeInSpan(element),
  ],
};
