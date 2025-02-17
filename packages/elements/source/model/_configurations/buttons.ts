import * as Styles from '@universityofmaryland/web-styles-library';
import { createElement } from './constructor';
import { type ElementProps } from '../_types';

export const fullScreen = (props: ElementProps) =>
  createElement(props, Styles.element.action.button.fullScreen);
