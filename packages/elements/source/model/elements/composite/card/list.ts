import * as Styles from '@universityofmaryland/web-styles-library';
import { createStyledElement } from '../../../modifiers';
import { type ElementProps } from '../../../modifiers/_types';

interface ListProps extends ElementProps {
  isDisplayEvent?: boolean;
  isDisplayPerson?: boolean;
  isDisplayTabular?: boolean;
}

export const card = (props: ElementProps) => {
  const { isThemeDark } = props;

  if (isThemeDark) {
    return createStyledElement(props, Styles.element.composite.card.list.dark);
  }

  return createStyledElement(props, Styles.element.composite.card.list.light);
};

export const event = (props: ElementProps) => {
  const { isThemeDark } = props;

  if (isThemeDark) {
    return createStyledElement(
      props,
      Styles.element.composite.card.list.eventDark,
    );
  }

  return createStyledElement(
    props,
    Styles.element.composite.card.list.eventLight,
  );
};

export const person = (props: ElementProps) => {
  const { isThemeDark } = props;

  if (isThemeDark) {
    return createStyledElement(
      props,
      Styles.element.composite.card.list.personDark,
    );
  }

  return createStyledElement(props, Styles.element.composite.card.list.person);
};

export const personTabular = (props: ElementProps) => {
  const { isThemeDark } = props;

  if (isThemeDark) {
    return createStyledElement(
      props,
      Styles.element.composite.card.list.personTabularDark,
    );
  }

  return createStyledElement(
    props,
    Styles.element.composite.card.list.personTabular,
  );
};

export default (props: ListProps) => {
  const { isDisplayEvent, isDisplayPerson, isDisplayTabular, ...elementProps } =
    props;
  if (isDisplayEvent) {
    return event(elementProps);
  }

  if (isDisplayPerson) {
    return person(elementProps);
  }

  if (isDisplayTabular) {
    return personTabular(elementProps);
  }

  return card(elementProps);
};
