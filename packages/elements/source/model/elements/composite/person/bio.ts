import * as Styles from '@universityofmaryland/web-styles-library';
import { createStyledElement } from '../../../modifiers';
import { type ElementProps } from '../../../modifiers/_types';

export default (props: ElementProps) => {
  const { isThemeDark } = props;

  if (isThemeDark) {
    return createStyledElement(
      props,
      Styles.element.composite.person.bio.smallDark,
    );
  }

  return createStyledElement(props, Styles.element.composite.person.bio.small);
};
