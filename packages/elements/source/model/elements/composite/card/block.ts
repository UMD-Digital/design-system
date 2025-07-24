import * as Styles from '@universityofmaryland/web-styles-library';
import { createStyledElement } from '../../../modifiers';
import { type ElementProps } from '../../../modifiers/_types';

interface CardBlockProps extends ElementProps {
  isTransparent?: boolean;
  hasBorder?: boolean;
  isPerson?: boolean;
}

export const person = (props: ElementProps) =>
  createStyledElement(props, Styles.element.composite.card.block.person);

export const personDark = (props: ElementProps) =>
  createStyledElement(props, Styles.element.composite.card.block.personDark);

export default (props: CardBlockProps) => {
  const { isTransparent, hasBorder, isPerson, ...elementProps } = props;
  const { isThemeDark } = elementProps;

  if (isPerson && isThemeDark) {
    return personDark(elementProps);
  }

  return person(elementProps);
};
