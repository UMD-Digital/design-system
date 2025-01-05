import * as Utility from 'utilities';
import ElementBuilder from '../_builder';
import { modifiers } from '../_modifiers/style';
import {
  type ConfigurationProps,
  type BuilderConfig,
  type ElementProps,
} from '../_types';

interface styleObject {
  className: string | string[];
  [key: string]: any;
}

const defaultConfig: BuilderConfig = {
  styleModifiers: (props) =>
    Utility.styles.combineStyles(
      modifiers.baseStyles(props),
      modifiers.element(props),
      modifiers.elementChild(props),
      modifiers.elementSiblingAfter(props),
    ),
};

export const createElementBuild = (
  props: ConfigurationProps,
  config: BuilderConfig,
) => {
  const { element, className, elementStyles, baseStyles, isThemeDark } = props;

  return new ElementBuilder(className, element).createElement({
    config,
    options: {
      baseStyles,
      ...elementStyles,
      isColorWhite: !isThemeDark,
    },
  });
};

export const createElement = (props: ElementProps, stylesObj: styleObject) => {
  const { className, ...baseStyles } = stylesObj;

  if (Array.isArray(className)) {
    return createElementBuild(
      { ...props, className: className[0], baseStyles },
      defaultConfig,
    );
  }

  return createElementBuild({ ...props, className, baseStyles }, defaultConfig);
};
