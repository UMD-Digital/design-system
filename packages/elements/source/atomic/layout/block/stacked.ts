import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-styles-library/token';
import { asset as assetElement } from '@universityofmaryland/web-styles-library/element';
import {
  createMediaQuery,
  createMediaQueryRange,
} from '@universityofmaryland/web-utilities-library/styles';
import { type ElementModel } from '../../../_types';

const smallBreakpoint = token.media.breakpointValues.small.max;
const mediumBreakpointStart = token.media.breakpointValues.medium.min;
const mediumBreakpoint = token.media.breakpointValues.large.min;

interface BoxProps {
  hasBorder?: boolean;
  isThemeDark?: boolean;
  isTransparent?: boolean;
}

export const image = ({
  customStyles = {},
  children,
  hasBorder = false,
  isThemeDark = false,
}: BoxProps & {
  children: ElementModel[];
  customStyles?: Record<string, any>;
}) => {
  return new ElementBuilder()
    .withClassName('layout-block-stacked-image')
    .withStyles({
      element: {
        height: 'auto',
        position: 'relative',
        zIndex: 99,

        // Gif Overwrite
        [`&:has(.${assetElement.gif.toggle.className})`]: {
          aspectRatio: '4 / 3',
        },

        ...createMediaQuery('max-width', smallBreakpoint, {
          marginLeft: token.spacing.sm,
          marginBottom: token.spacing.md,
          width: '120px',
          float: 'right',
          alignSelf: 'flex-start',

          ...(isThemeDark && {
            marginRight: 0,
            marginTop: 0,
          }),
        }),

        ...createMediaQuery('min-width', mediumBreakpointStart, {
          display: 'block',
        }),

        ...createMediaQueryRange(mediumBreakpointStart, mediumBreakpoint, {
          ...(hasBorder && {
            marginLeft: token.spacing.sm,
          }),
        }),

        ...customStyles,

        '& img': {
          ...createMediaQuery('max-width', smallBreakpoint, {
            height: 'auto !important',
          }),
        },
      },
    })
    .withChildren(...children)
    .build();
};

export const textContainer = ({
  children,
  customStyles = {},
  hasBorder = false,
  isThemeDark = false,
  isTransparent = false,
}: BoxProps & {
  customStyles?: Record<string, any>;
  children: ElementModel[];
}) => {
  return new ElementBuilder()
    .withClassName('layout-block-stacked-text')
    .withStyles({
      element: {
        maxWidth: `${token.spacing.maxWidth.smallest}`,

        ...createMediaQuery('min-width', mediumBreakpointStart, {
          paddingTop: token.spacing.md,
        }),

        ...createMediaQuery('min-width', mediumBreakpointStart, {
          paddingTop: token.spacing.lg,

          ...(hasBorder && {
            padding: token.spacing.md,
          }),

          ...(isThemeDark &&
            !isTransparent && {
              padding: token.spacing.md,
            }),
        }),

        ...customStyles,
      },
    })
    .withChildren(...children)
    .build();
};

export const container = ({
  children,
  customStyles = {},
  hasBorder = false,
  isThemeDark = false,
  isTransparent = false,
}: BoxProps & {
  customStyles?: Record<string, any>;
  children: ElementModel[];
}) => {
  return new ElementBuilder()
    .withClassName('layout-block-stacked-container')
    .withStyles({
      element: {
        containerType: 'inline-size',
        height: '100%',

        ...(isThemeDark && {
          backgroundColor: token.color.gray.darker,
        }),

        ...(isTransparent && {
          backgroundColor: 'transparent',
        }),

        ...(hasBorder && {
          border: `1px solid ${token.color.gray.light}`,
        }),

        ...(hasBorder &&
          isThemeDark && {
            border: `1px solid ${token.color.gray.darker}`,
          }),

        ...createMediaQuery('max-width', smallBreakpoint, {
          ...(isThemeDark &&
            !isTransparent && {
              padding: token.spacing.md,
            }),

          ...(hasBorder && {
            padding: token.spacing.md,
          }),
        }),

        ...customStyles,
      },
    })
    .withChildren(...children)
    .build();
};
