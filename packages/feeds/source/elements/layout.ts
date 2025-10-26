import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { Composite } from '@universityofmaryland/web-elements-library';
import { type ElementModel } from '../_types';

export const stacked = (
  isThemeDark?: boolean,
): ElementModel =>
  new ElementBuilder()
    .styled(Styles.layout.grid.stacked)
    .withStyles({
      element: {
        gridGap: `${Styles.token.spacing.md}`,
        [` > *`]: {
          containerType: 'inline-size',
        },

        [` > *:not(:last-child)`]: {
          paddingBottom: `${Styles.token.spacing.md}`,
          marginBottom: `${Styles.token.spacing.md}`,
          borderBottom: `${
            isThemeDark
              ? `1px solid ${Styles.token.color.gray.dark}`
              : `1px solid ${Styles.token.color.gray.light}`
          }`,
        },

        [`& .${Styles.element.asset.image.wrapperScaled.className}`]: {
          alignSelf: 'flex-start',
        },
      },
    })
    .build();

export const grid = ({
  count = 2,
}: {
  count?: number;
  isTypeGap?: boolean;
}): ElementModel => {
  let gridStyle = Styles.layout.grid.columnsTwo;
  if (count === 3) gridStyle = Styles.layout.grid.columnsThree;
  if (count === 4) gridStyle = Styles.layout.grid.columnsFour;

  return new ElementBuilder()
    .styled(gridStyle)
    .withStyles({
      element: {
        [` > *`]: {
          containerType: 'inline-size',
          [`@media (${Styles.token.media.queries.large.min})`]: {
            minHeight: '560px !important',
          },
        },
      },
    })
    .build();
};

export const gridGap = ({
  count = 2,
}: {
  count?: number;
}): ElementModel => {
  let gridStyle = Styles.layout.grid.gap.two;
  if (count === 3) gridStyle = Styles.layout.grid.gap.three;
  if (count === 4) gridStyle = Styles.layout.grid.gap.four;

  return new ElementBuilder()
    .styled(gridStyle)
    .withStyles({
      element: {
        [` > *`]: {
          alignSelf: 'flex-start',
          containerType: 'inline-size',
        },
      },
    })
    .build();
};

export const gridOffsetGap = ({
  count = 2,
  isLayoutReversed,
  overwriteStickyPosition = 0,
}: {
  count?: number;
  isLayoutReversed?: boolean;
  overwriteStickyPosition?: number;
}): ElementModel => {
  let gridStyle = Styles.layout.grid.gap.two;
  if (count === 3) gridStyle = Styles.layout.grid.gap.three;
  if (count === 4) gridStyle = Styles.layout.grid.gap.four;

  return new ElementBuilder()
    .styled(gridStyle)
    .withStyles({
      element: {
        [` > *`]: {
          alignSelf: 'flex-start',
          containerType: 'inline-size',
        },

        [` > *:first-child`]: {
          order: isLayoutReversed ? 2 : -1,
        },

        [`& .${Composite.card.overlay.imageClassRef}`]: {
          [`@media (${Styles.token.media.queries.large.min})`]: {
            height: 'inherit',
            position: 'sticky',
            top: `${overwriteStickyPosition}px`,
          },

          [`*`]: {
            color: `${Styles.token.color.white}`,
          },

          [`& > div`]: {
            [`@media (${Styles.token.media.queries.large.min})`]: {
              minHeight: '560px !important',
            },
          },

          [`.${Styles.element.asset.image.wrapperScaled.className}`]: {
            position: 'absolute',
          },
        },
      },
    })
    .build();
};
