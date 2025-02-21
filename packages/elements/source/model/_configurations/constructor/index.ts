import { createElementBuild } from './build';
import { defaultConfig, animationLineConfig, textConfig } from './options';
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

export const createElement = (props: ElementProps, stylesObj: styleObject) =>
  elementWithConfig(props, stylesObj, defaultConfig);

export const createLinkAnimationElement = (
  props: ElementProps,
  stylesObj: styleObject,
) => elementWithConfig(props, stylesObj, animationLineConfig);

export const createHeadlineElement = (
  props: ElementProps,
  stylesObj: styleObject,
) => elementWithConfig(props, stylesObj, animationLineConfig);

export const createTextElement = (
  props: ElementProps,
  stylesObj: styleObject,
) => elementWithConfig(props, stylesObj, textConfig);
