import * as Styles from '@universityofmaryland/web-styles-library';
import * as theme from 'helpers/theme';
import { ElementModel } from 'model';
import { type UMDElement } from '../../../_types';

const smallBreakpoint = Styles.token.media.breakpointValues.small.max;
const mediumBreakpointStart = Styles.token.media.breakpointValues.medium.min;
const mediumBreakpoint = Styles.token.media.breakpointValues.large.min;

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
  children: UMDElement[];
  customStyles?: Record<string, any>;
}) =>
  ElementModel.createDiv({
    className: 'layout-block-stacked-image',
    children,
    elementStyles: {
      element: {
        height: 'auto',
        position: 'relative',
        zIndex: 99,

        // Gif Overwrite
        [`&:has(.${Styles.element.asset.gif.toggle.className})`]: {
          aspectRatio: '4 / 3',
        },

        ...theme.media.createContainerQuery('max-width', smallBreakpoint, {
          marginLeft: Styles.token.spacing.sm,
          marginBottom: Styles.token.spacing.md,
          width: '120px',
          float: 'right',
          alignSelf: 'flex-start',

          ...(isThemeDark && {
            marginRight: 0,
            marginTop: 0,
          }),
        }),

        ...theme.media.createContainerQuery(
          'min-width',
          mediumBreakpointStart,
          {
            display: 'block',
          },
        ),

        ...theme.media.createRangeContainerQuery(
          mediumBreakpointStart,
          mediumBreakpoint,
          {
            ...(hasBorder && {
              marginLeft: Styles.token.spacing.sm,
            }),
          },
        ),

        ...customStyles,

        '& img': {
          ...theme.media.createContainerQuery('max-width', smallBreakpoint, {
            height: 'auto !important',
          }),
        },
      },
    },
  });

export const textContainer = ({
  children,
  customStyles = {},
  hasBorder = false,
  isThemeDark = false,
  isTransparent = false,
}: BoxProps & {
  customStyles?: Record<string, any>;
  children: UMDElement[];
}) =>
  ElementModel.createDiv({
    className: 'layout-block-stacked-text',
    children,
    elementStyles: {
      element: {
        maxWidth: `${Styles.token.spacing.maxWidth.smallest}`,

        ...theme.media.createContainerQuery(
          'min-width',
          mediumBreakpointStart,
          {
            paddingTop: Styles.token.spacing.md,
          },
        ),

        ...theme.media.createContainerQuery(
          'min-width',
          mediumBreakpointStart,
          {
            paddingTop: Styles.token.spacing.lg,

            ...(hasBorder && {
              padding: Styles.token.spacing.md,
            }),

            ...(isThemeDark &&
              !isTransparent && {
                padding: Styles.token.spacing.md,
              }),
          },
        ),

        ...customStyles,
      },
    },
  });

export const container = ({
  children,
  customStyles = {},
  hasBorder = false,
  isThemeDark = false,
  isTransparent = false,
}: BoxProps & {
  customStyles?: Record<string, any>;
  children: UMDElement[];
}) =>
  ElementModel.createDiv({
    className: 'layout-block-stacked-container',
    children,
    elementStyles: {
      element: {
        containerType: 'inline-size',
        height: '100%',

        ...(isThemeDark && {
          backgroundColor: Styles.token.color.gray.darker,
        }),

        ...(isTransparent && {
          backgroundColor: 'transparent',
        }),

        ...(hasBorder && {
          border: `1px solid ${Styles.token.color.gray.light}`,
        }),

        ...(hasBorder &&
          isThemeDark && {
            border: `1px solid ${Styles.token.color.gray.darker}`,
          }),

        ...theme.media.createContainerQuery('max-width', smallBreakpoint, {
          ...(isThemeDark &&
            !isTransparent && {
              padding: Styles.token.spacing.md,
            }),

          ...(hasBorder && {
            padding: Styles.token.spacing.md,
          }),
        }),

        ...customStyles,
      },
    },
  });
