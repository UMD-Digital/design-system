import * as Styles from '@universityofmaryland/web-styles-library';
import { createElement } from './constructor';
import { type ElementProps } from '../_types';

export const eyebrow = (props: ElementProps) =>
  createElement(props, Styles.typography.elements.fonts.eyebrow);
