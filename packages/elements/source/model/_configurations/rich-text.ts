import * as Styles from '@universityofmaryland/web-styles-library';
import { createElement } from './constructor';
import { type ElementProps } from '../_types';

export const simple = (props: ElementProps) =>
  createElement(props, Styles.element.text.rich.simpleLarge);
