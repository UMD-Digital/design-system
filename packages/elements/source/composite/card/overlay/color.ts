import * as token from '@universityofmaryland/web-styles-library/token';
import * as layout from '@universityofmaryland/web-styles-library/layout';
import ElementBuilder from '@universityofmaryland/web-builder-library';
import { ElementVisual } from '../../../_types';
import { actions, textLockup } from 'atomic';
import { CardOverlayProps } from '../_types';

export default (props: CardOverlayProps) => {
  const { isThemeDark, ctaIcon } = props;

  const children: ElementVisual[] = [];

  if (ctaIcon && ctaIcon instanceof HTMLElement) {
    children.push(
      actions.icon({
        ...props,
        ctaIcon,
        isThemeLight: !isThemeDark,
      }),
    );
  }

  children.push(
    ElementBuilder.create.div({
      className: 'card-overlay-color-wrapper',
      elementStyles: {
        element: {
          paddingRight: `${ctaIcon ? token.spacing['2xl'] : 0}`,
          height: '100%',

          [`& > *`]: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 9,
            position: 'relative',
            maxWidth: `${token.spacing.maxWidth.smallest}`,
          },
        },
      },
      children: [textLockup.smallScaling(props)],
    }),
  );

  return ElementBuilder.create.div({
    className: 'card-overlay-color',
    children,
    elementStyles: {
      element: {
        containerType: 'inline-size',
        padding: `${token.spacing.lg} ${token.spacing.md}`,
        minHeight: '360px',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: token.color.gray.lightest,

        ...(isThemeDark && {
          backgroundColor: token.color.gray.darker,
        }),

        [`& .${layout.grid.inline.tabletRows.className}`]: {
          [`@media (${token.media.queries.tablet.min})`]: {
            marginTop: 'auto !important',
          },
        },
      },
    },
  });
};
