import * as Styles from '@universityofmaryland/web-styles-library';
import ElementBuilder from '@universityofmaryland/web-builder-library';
import { Composite } from '@universityofmaryland/web-elements-library';

export const stacked = (
  isThemeDark?: boolean,
): { element: HTMLElement; styles: string } =>
  ElementBuilder.styled.layout.gridStacked({
    element: document.createElement('div'),
    elementStyles: {
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
    },
  });

export const grid = ({
  count = 2,
}: {
  count?: number;
  isTypeGap?: boolean;
}): { element: HTMLElement; styles: string } =>
  ElementBuilder.styled.layout.grid({
    element: document.createElement('div'),
    elementStyles: {
      element: {
        [` > *`]: {
          containerType: 'inline-size',
          [`@media (${Styles.token.media.queries.large.min})`]: {
            minHeight: '560px !important',
          },
        },
      },
    },
    isGap: false,
    isColumnsTwo: count === 2,
    isColumnsThree: count === 3,
    isColumnsFour: count === 4,
  });

export const gridGap = ({
  count = 2,
}: {
  count?: number;
}): { element: HTMLElement; styles: string } =>
  ElementBuilder.styled.layout.grid({
    element: document.createElement('div'),
    elementStyles: {
      element: {
        [` > *`]: {
          alignSelf: 'flex-start',
          containerType: 'inline-size',
        },
      },
    },
    isGap: true,
    isColumnsTwo: count === 2,
    isColumnsThree: count === 3,
    isColumnsFour: count === 4,
  });

export const gridOffsetGap = ({
  count = 2,
  isLayoutReversed,
  overwriteStickyPosition = 0,
}: {
  count?: number;
  isLayoutReversed?: boolean;
  overwriteStickyPosition?: number;
}) =>
  ElementBuilder.styled.layout.grid({
    element: document.createElement('div'),
    elementStyles: {
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
    },
    isGap: true,
    isColumnsTwo: count === 2,
    isColumnsThree: count === 3,
    isColumnsFour: count === 4,
  });
