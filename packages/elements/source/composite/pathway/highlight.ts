import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import * as Styles from '@universityofmaryland/web-styles-library';
import { theme } from '@universityofmaryland/web-utilities-library/theme';
import { createTextLockupMedium } from './_common';
import { PathwayHighlightProps } from './_types';
import { type ElementModel } from '../../_types';

const mediumSize = 1000;
const largeSize = 1200;

const createTextContent = (
  props: PathwayHighlightProps,
): ElementModel<HTMLElement> => {
  const wrapper = new ElementBuilder()
    .withClassName('pathway-text-container-wrapper')
    .withChild(createTextLockupMedium(props))
    .withStyles({
      element: {
        width: '100%',
        position: 'relative',
      },
    })
    .build();

  const container = new ElementBuilder()
    .withClassName('pathway-text-container')
    .withChild(wrapper)
    .withStyles({
      element: {
        container: 'inline-size',
        display: 'flex',
        alignItems: 'center',
        zIndex: '99',

        ...(props.isThemeDark && {
          backgroundColor: token.color.black,
        }),

        ...(props.isThemeMaryland && {
          backgroundColor: token.color.red,
        }),

        [`@container (max-width: ${mediumSize - 1}px)`]: {
          paddingBottom: token.spacing.md,
        },

        [`@container (min-width: ${mediumSize}px)`]: {
          paddingRight: token.spacing['4xl'],
        },

        [`@container (min-width: ${largeSize}px)`]: {
          paddingRight: token.spacing['6xl'],
        },
      },
    })
    .build();

  return container;
};

const createHighlightColumn = ({
  quote,
  attribution,
  isThemeDark,
}: Pick<
  PathwayHighlightProps,
  'quote' | 'attribution' | 'isThemeDark'
>): ElementModel<HTMLElement> => {
  const wrapper = new ElementBuilder()
    .withClassName('pathway-highlight-column-wrapper')
    .withStyles({
      element: {
        [`@container (min-width: ${mediumSize}px)`]: {
          paddingLeft: token.spacing['xl'],
          position: 'relative',
        },

        '&:before': {
          content: "''",
          position: 'absolute',
          backgroundColor: token.color.red,

          [`@container (max-width: ${mediumSize - 1}px)`]: {
            top: token.spacing['2xl'],
            width: token.spacing['5xl'],
            height: '2px',
          },

          [`@container (min-width: ${mediumSize}px)`]: {
            left: '0',
            width: '2px',
            height: '100%',
          },
        },
      },
    });

  if (quote) {
    wrapper.withChild(
      new ElementBuilder(quote)
        .styled(
          Styles.typography.sans.compose('larger', {
            theme: theme.fontColor(isThemeDark),
          }),
        )
        .withStyles({
          element: {
            fontWeight: '700',

            ['& *']: {
              color: 'currentColor',
            },
          },
        })
        .build(),
    );
  }

  if (attribution) {
    wrapper.withChild(
      new ElementBuilder(attribution)
        .styled(
          Styles.typography.sans.compose('medium', {
            theme: theme.fontColor(isThemeDark),
          }),
        )
        .withStyles({
          element: {
            marginTop: token.spacing.sm,
          },
        })
        .build(),
    );
  }

  const wrapperBuilt = wrapper.build();

  return new ElementBuilder()
    .withClassName('pathway-highlight-column-container')
    .withChild(wrapperBuilt)
    .withStyles({
      element: {
        backgroundColor: token.color.gray.lightest,
        position: 'relative',
        padding: `${token.spacing['5xl']} ${token.spacing.md} ${token.spacing.md} ${token.spacing.md}`,

        [`@container (min-width: ${mediumSize}px)`]: {
          padding: `${token.spacing['4xl']} ${token.spacing['2xl']}`,
        },

        [`@container (min-width: ${largeSize}px)`]: {
          padding: `${token.spacing['8xl']} ${token.spacing['xl']}`,
        },

        ...(isThemeDark && {
          backgroundColor: token.color.gray.darker,
        }),
      },
    })
    .build();
};

const createLock = (props: PathwayHighlightProps) => {
  const textContent = createTextContent(props);
  const highlightColumn = createHighlightColumn(props);

  return new ElementBuilder()
    .styled(Styles.layout.space.horizontal.larger)
    .withChild(textContent)
    .withChild(highlightColumn)
    .withStyles({
      element: {
        [`@container (min-width: ${mediumSize}px)`]: {
          display: 'flex',
          alignItems: 'center',

          [`& > *`]: {
            width: '50%',
          },
        },
      },
    })
    .build();
};

const CreatePathwayHighlightElement = (props: PathwayHighlightProps) =>
  new ElementBuilder()
    .withClassName('pathway-highlight-container')
    .withChild(createLock(props))
    .withStyles({
      element: {
        container: 'inline-size',
      },
    })
    .build();

export const createCompositePathwayHighlight = CreatePathwayHighlightElement;
