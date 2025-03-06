import * as Styles from '@universityofmaryland/web-styles-library';
import { createStyledElement } from '../../../modifiers';
import { type ElementProps } from '../../../modifiers/_types';

interface CardListProps extends ElementProps {
  isDisplayEvent?: boolean;
}

export default (props: CardListProps) => {
  const { isDisplayEvent, ...elementProps } = props;
  const { isThemeDark } = elementProps;

  if (isDisplayEvent && isThemeDark) {
    return createStyledElement(
      elementProps,
      Styles.element.composite.card.list.eventDark,
    );
  }

  if (isDisplayEvent) {
    return createStyledElement(
      elementProps,
      Styles.element.composite.card.list.eventLight,
    );
  }

  if (isThemeDark) {
    return createStyledElement(
      elementProps,
      Styles.element.composite.card.list.dark,
    );
  }

  return createStyledElement(
    elementProps,
    Styles.element.composite.card.list.light,
  );
};
