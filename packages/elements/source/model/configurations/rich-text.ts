import * as Styles from '@universityofmaryland/web-styles-library';
import { createElement } from './_base';
import { type ElementProps } from '../_types';

export const simple = (props: ElementProps) =>
  createElement(props, Styles.element.text.rich.simpleLarge);
