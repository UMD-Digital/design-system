import * as Utility from 'utilities';
import ElementBuilder from '../_builder';
import { modifiers } from '../_modifiers/style';
import {
  type ConfigurationProps,
  type BuilderConfig,
  type ElementProps,
  type StyleModifierProps,
} from '../_types';

interface styleObject {
  className: string | string[];
  [key: string]: any;
}

const defaultModifier = (props: StyleModifierProps) => [
  modifiers.baseStyles(props),
  modifiers.element(props),
  modifiers.elementChild(props),
  modifiers.elementSiblingAfter(props),
];

const defaultConfig: BuilderConfig = {
  styleModifiers: (props) =>
    Utility.styles.combineStyles(...defaultModifier(props)),
};

const animationLineConfig: BuilderConfig = {
  styleModifiers: (props) =>
    Utility.styles.combineStyles(
      modifiers.animationLink(props),
      modifiers.baseStyles(props),
      ...defaultModifier(props),
    ),
  elementModifiers: [
    (element) => Utility.markup.modify.wrapTextNodeInSpan(element),
  ],
};

const createElementBuild = (
  props: ConfigurationProps,
  config: BuilderConfig,
) => {
  const { element, className, elementStyles, isThemeDark, ...rest } = props;

  return new ElementBuilder(className, element).createElement({
    config,
    options: {
      ...elementStyles,
      ...rest,
      isTextColorWhite: !isThemeDark,
    },
  });
};

const elementWithConfig = (
  props: ElementProps,
  stylesObj: styleObject,
  config: BuilderConfig,
) => {
  const { className, ...baseStyles } = stylesObj;

  if (Array.isArray(className)) {
    return createElementBuild(
      { ...props, className: className[0], baseStyles },
      config,
    );
  }

  return createElementBuild({ ...props, className, baseStyles }, config);
};

// exported options for creating elements

export const createElement = (props: ElementProps, stylesObj: styleObject) =>
  elementWithConfig(props, stylesObj, defaultConfig);

export const createLinkAnimationElement = (
  props: ElementProps,
  stylesObj: styleObject,
) => elementWithConfig(props, stylesObj, animationLineConfig);

export const createFontStyleElement = (
  props: ElementProps,
  getFontFn: () => { className: string; fontStyles: Record<string, any> },
) => {
  const { className, fontStyles } = getFontFn();

  return createElementBuild(
    { ...props, className, baseStyles: fontStyles },
    animationLineConfig,
  );
};
