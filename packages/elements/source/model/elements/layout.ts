import * as Styles from '@universityofmaryland/web-styles-library';
import { createStyledElement } from '../modifiers';
import { type ElementProps } from '../modifiers/_types';

export const backgroundBoxWhite = (props: ElementProps) =>
  createStyledElement(props, Styles.layout.background.box.white);

export const gridStacked = (props: ElementProps) =>
  createStyledElement(props, Styles.layout.grid.stacked);

export const gridInlineTabletRows = (props: ElementProps) =>
  createStyledElement(props, Styles.layout.grid.inline.tabletRows);
