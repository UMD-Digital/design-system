import * as Styles from '@universityofmaryland/web-styles-library';
import { createStyledElement } from '../modifiers';
import { type ElementProps } from '../modifiers/_types';

export const simple = (props: ElementProps) => {
  const { isThemeDark } = props;

  if (isThemeDark) {
    return createStyledElement(props, Styles.element.text.rich.simpleDark);
  }

  return createStyledElement(props, Styles.element.text.rich.simple);
};

export const simpleLarge = (props: ElementProps) => {
  const { isThemeDark } = props;

  if (isThemeDark) {
    return createStyledElement(props, Styles.element.text.rich.simpleLargeDark);
  }

  return createStyledElement(props, Styles.element.text.rich.simpleLarge);
};

export const simpleScaling = (props: ElementProps) => {
  const { isThemeDark } = props;

  if (isThemeDark) {
    return createStyledElement(
      props,
      Styles.element.text.rich.simpleScalingDark,
    );
  }

  return createStyledElement(props, Styles.element.text.rich.simpleScaling);
};
