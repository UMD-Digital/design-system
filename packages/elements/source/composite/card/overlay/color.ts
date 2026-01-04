import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import * as layout from '@universityofmaryland/web-styles-library/layout';
import { actions, textLockup } from 'atomic';
import { CardOverlayProps } from '../_types';
import { type UMDElement } from '../../../_types';

export const createCompositeCardOverlayColor = (props: CardOverlayProps) => {
  const { isThemeDark, ctaIcon } = props;

  const children: UMDElement[] = [];

  if (ctaIcon && ctaIcon instanceof HTMLElement) {
    children.push(
      actions.icon({
        ...props,
        ctaIcon,
        isThemeLight: !isThemeDark,
      }),
    );
  }

  const lockup = textLockup.smallScaling(props);

  const wrapper = new ElementBuilder()
    .withClassName('card-overlay-color-wrapper')
    .withStyles({
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
    })
    .withChild(lockup)
    .build();

  children.push(wrapper);

  return new ElementBuilder()
    .withClassName('card-overlay-color')
    .withStyles({
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
    })
    .withChildren(...children)
    .build();
};
