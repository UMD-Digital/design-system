import * as Styles from '@universityofmaryland/web-styles-library';
import { createStyledElement } from '../../../modifiers';
import { type ElementProps } from '../../../modifiers/_types';

interface CardBlockProps extends ElementProps {
  isTransparent?: boolean;
  isBordered?: boolean;
}

export default (props: CardBlockProps) => {
  const { isTransparent, isBordered, ...elementProps } = props;
  const { isThemeDark } = elementProps;

  if (isTransparent) {
    return createStyledElement(
      elementProps,
      Styles.element.composite.card.block.transparent,
    );
  }

  if (isThemeDark) {
    return createStyledElement(
      elementProps,
      Styles.element.composite.card.block.dark,
    );
  }

  if (isBordered) {
    return createStyledElement(
      elementProps,
      Styles.element.composite.card.block.border,
    );
  }

  return createStyledElement(
    elementProps,
    Styles.element.composite.card.block.light,
  );
};
