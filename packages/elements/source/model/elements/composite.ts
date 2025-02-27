import * as Styles from '@universityofmaryland/web-styles-library';
import { createStyledElement } from '../modifiers';
import { type ElementProps } from '../modifiers/_types';

interface CardProps extends ElementProps {
  isTransparent?: boolean;
  isBordered?: boolean;
}

export const card = (props: CardProps) => {
  const { isTransparent, isBordered, ...elementProps } = props;
  const { isThemeDark } = elementProps;

  if (isTransparent) {
    return createStyledElement(
      elementProps,
      Styles.element.composite.card.transparent,
    );
  }

  if (isThemeDark) {
    return createStyledElement(
      elementProps,
      Styles.element.composite.card.dark,
    );
  }

  if (isBordered) {
    return createStyledElement(
      elementProps,
      Styles.element.composite.card.border,
    );
  }

  return createStyledElement(elementProps, Styles.element.composite.card.light);
};
