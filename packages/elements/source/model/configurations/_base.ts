import ElementBuilder from '../_builder';
import { type ConfigurationProps, type BuilderConfig } from '../_types';

export const createElement = (
  props: ConfigurationProps,
  config: BuilderConfig,
) => {
  const { element, className, elementStyles, fontStyles, isThemeDark } = props;

  return new ElementBuilder(className, element).createElement({
    config,
    options: {
      fontStyles,
      ...elementStyles,
      isColorWhite: !isThemeDark,
    },
  });
};
