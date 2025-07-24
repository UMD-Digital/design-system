import * as Styles from '@universityofmaryland/web-styles-library';
import { actions, textLockup } from 'atomic';
import { ElementModel } from 'model';
import { CardOverlayProps } from '../_types';
import { ElementVisual } from '../../../_types';

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
    ElementModel.createDiv({
      className: 'card-overlay-color-wrapper',
      elementStyles: {
        element: {
          paddingRight: `${ctaIcon ? Styles.token.spacing['2xl'] : 0}`,
          height: '100%',

          [`& > *`]: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 9,
            position: 'relative',
            maxWidth: `${Styles.token.spacing.maxWidth.smallest}`,
          },
        },
      },
      children: [textLockup.smallScaling(props)],
    }),
  );

  return ElementModel.createDiv({
    className: 'card-overlay-color',
    children,
    elementStyles: {
      element: {
        padding: `${Styles.token.spacing.lg} ${Styles.token.spacing.md}`,
        minHeight: '360px',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: Styles.token.color.gray.lightest,

        ...(isThemeDark && {
          backgroundColor: Styles.token.color.gray.darker,
        }),

        [`& .${Styles.layout.grid.inline.tabletRows.className}`]: {
          [`@media (${Styles.token.media.queries.tablet.min})`]: {
            marginTop: 'auto !important',
          },
        },
      },
    },
  });
};
