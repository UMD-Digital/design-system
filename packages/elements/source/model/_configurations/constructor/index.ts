import { createElementBuild } from './build';
import * as optionConfigs from './style-combinations';
import { type ElementProps, type BuilderConfig } from '../../_types';

interface styleObject {
  className: string | string[];
  [key: string]: any;
}

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

// Export functions

export const createActionElement = (
  props: ElementProps,
  stylesObj: styleObject,
) => elementWithConfig(props, stylesObj, optionConfigs.action);

export const createLinkAnimationElement = (
  props: ElementProps,
  stylesObj: styleObject,
) => elementWithConfig(props, stylesObj, optionConfigs.animationLine);

export const createHeadlineElement = (
  props: ElementProps,
  stylesObj: styleObject,
) => elementWithConfig(props, stylesObj, optionConfigs.animationLine);

export const createElement = (props: ElementProps, stylesObj: styleObject) =>
  elementWithConfig(props, stylesObj, optionConfigs.base);

export const createTextElement = (
  props: ElementProps,
  stylesObj: styleObject,
) => elementWithConfig(props, stylesObj, optionConfigs.text);
