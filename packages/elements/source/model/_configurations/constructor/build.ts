import ElementBuilder from '../../_builder';
import { type ConfigurationProps, type BuilderConfig } from '../../_types';

export const createElementBuild = (
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
