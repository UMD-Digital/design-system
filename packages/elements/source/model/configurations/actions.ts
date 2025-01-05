import * as Styles from '@universityofmaryland/web-styles-library';
import { createElement } from './_base';
import { type ElementProps } from '../_types';

export const primary = (props: ElementProps) =>
  createElement(props, Styles.element.action.primary.normal);

export const primaryLarge = (props: ElementProps) =>
  createElement(props, Styles.element.action.primary.large);

export const primaryWhite = (props: ElementProps) =>
  createElement(props, Styles.element.action.primary.white);
