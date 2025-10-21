import * as Styles from '@universityofmaryland/web-styles-library';
import { createStyledElement } from '../core';
import { type ElementProps } from '../core/_types';

interface GridColumns extends ElementProps {
  isColumnsTwo?: boolean;
  isColumnsThree?: boolean;
  isColumnsFour?: boolean;
  isGap?: boolean;
}

export const alignedCenter = (props: ElementProps) =>
  createStyledElement(props, Styles.layout.alignment.block.center);

export const backgroundBoxWhite = (props: ElementProps) =>
  createStyledElement(props, Styles.layout.background.box.white);

export const grid = (props: GridColumns) => {
  const {
    isColumnsTwo = true,
    isColumnsThree,
    isColumnsFour,
    isGap = true,
    ...elementProps
  } = props;

  if (isColumnsTwo && isGap) {
    return createStyledElement(elementProps, Styles.layout.grid.gap.two);
  }

  if (isColumnsThree && isGap) {
    return createStyledElement(elementProps, Styles.layout.grid.gap.three);
  }

  if (isColumnsFour && isGap) {
    return createStyledElement(elementProps, Styles.layout.grid.gap.four);
  }

  if (isColumnsTwo) {
    return createStyledElement(elementProps, Styles.layout.grid.columnsTwo);
  }

  if (isColumnsThree) {
    return createStyledElement(elementProps, Styles.layout.grid.columnsThree);
  }

  return createStyledElement(elementProps, Styles.layout.grid.columnsFour);
};

export const gridInlineRow = (props: ElementProps) =>
  createStyledElement(props, Styles.layout.grid.inline.row);

export const gridInlineTabletRows = (props: ElementProps) =>
  createStyledElement(props, Styles.layout.grid.inline.tabletRows);

export const gridStacked = (props: ElementProps) =>
  createStyledElement(props, Styles.layout.grid.stacked);

export const spaceHorizontalFull = (props: ElementProps) =>
  createStyledElement(props, Styles.layout.space.horizontal.full);

export const spaceHorizontalLarger = (props: ElementProps) =>
  createStyledElement(props, Styles.layout.space.horizontal.larger);

export const spaceHorizontalNormal = (props: ElementProps) =>
  createStyledElement(props, Styles.layout.space.horizontal.normal);

export const spaceHorizontalSmall = (props: ElementProps) =>
  createStyledElement(props, Styles.layout.space.horizontal.small);

export const spaceHorizontalSmallest = (props: ElementProps) =>
  createStyledElement(props, Styles.layout.space.horizontal.smallest);
