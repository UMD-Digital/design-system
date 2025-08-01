import * as Styles from '@universityofmaryland/web-styles-library';
import { theme } from 'utilities';
import { textLockup } from 'atomic';
import { ElementModel } from 'model';
import { type PersonTextLockupPropsWithStyles } from '../../_types';
import { type ElementVisual } from '../../../_types';

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
  children: ElementVisual[];
  customStyles?: Record<string, any>;
}) =>
  ElementModel.createDiv({
    className: 'layout-block-stacked-image',
    children,
    elementStyles: {
      element: {
        height: 'auto',

        ...theme.media.createContainerQuery('max-width', smallBreakpoint, {
          marginLeft: Styles.token.spacing.sm,
          marginBottom: Styles.token.spacing.md,
          width: '120px',
          float: 'right',
          alignSelf: 'flex-start',
        }),

        ...theme.media.createContainerQuery(
          'min-width',
          mediumBreakpointStart,
          {
            display: 'block',
          },
        ),

        ...customStyles,

        '& img': {
          ...theme.media.createContainerQuery('max-width', smallBreakpoint, {
            height: 'auto !important',
          }),
        },

        // Theme Dark
        ...(isThemeDark && {
          ...theme.media.createContainerQuery('max-width', smallBreakpoint, {
            marginRight: Styles.token.spacing.sm,
            marginTop: Styles.token.spacing.sm,
          }),
        }),

        // Border Overwrite
        ...(hasBorder && {
          ...theme.media.createRangeContainerQuery(
            mediumBreakpointStart,
            mediumBreakpoint,
            {
              marginLeft: Styles.token.spacing.sm,
            },
          ),
        }),
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
  children: Array<ElementVisual>;
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

        ...theme.media.createContainerQuery('min-width', mediumBreakpoint, {
          paddingTop: Styles.token.spacing.lg,
        }),

        // Theme Dark or Transparent or Bordered
        ...((isThemeDark || isTransparent || hasBorder) && {
          ...theme.media.createContainerQuery(
            'min-width',
            mediumBreakpointStart,
            {
              padding: Styles.token.spacing.md,
            },
          ),
        }),

        ...customStyles,
      },
    },
  });

const personDetails = ({
  actions,
  association,
  customStyles = {},
  isThemeDark,
  job,
  name,
  nameComposite,
  pronouns,
  subText,
}: PersonTextLockupPropsWithStyles & BoxProps) =>
  textContainer({
    customStyles,
    children: [
      textLockup.person({
        actions,
        name,
        nameComposite,
        job,
        association,
        pronouns,
        subText,
        isThemeDark,
      }),
    ],
  });

export const container = ({
  children,
  customStyles = {},
  hasBorder = false,
  isThemeDark = false,
  isTransparent = false,
}: BoxProps & {
  customStyles?: Record<string, any>;
  children: ElementVisual[];
}) =>
  ElementModel.createDiv({
    className: 'layout-block-stacked-container',
    children,
    elementStyles: {
      element: {
        containerType: 'inline-size',
        height: '100%',

        // Theme Dark
        ...(isThemeDark && {
          backgroundColor: Styles.token.color.gray.darker,

          ...theme.media.createContainerQuery('max-width', smallBreakpoint, {
            padding: Styles.token.spacing.md,
          }),
        }),

        // Transparent
        ...(isTransparent && {
          backgroundColor: 'transparent',
        }),

        // Bordered
        ...(hasBorder && {
          border: `1px solid ${Styles.token.color.gray.light}`,

          ...theme.media.createContainerQuery('max-width', smallBreakpoint, {
            padding: Styles.token.spacing.md,
          }),
        }),

        // Bordered & Theme Dark
        ...(hasBorder &&
          isThemeDark && {
            border: `1px solid ${Styles.token.color.gray.darker}`,
          }),

        ...customStyles,
      },
    },
  });
