import * as Styles from '@universityofmaryland/web-styles-library';
import { createElement } from './constructor';
import { type ElementProps } from '../_types';

export const gridStacked = (props: ElementProps) =>
  createElement(props, Styles.layout.grid.stacked);

export const gridInlineTabletRows = (props: ElementProps) =>
  createElement(props, Styles.layout.grid.inline.tabletRows);
