import * as token from '@universityofmaryland/web-styles-library/token';
import ElementBuilder from '@universityofmaryland/web-builder-library';
import { createTextLockupMedium } from './_common';
import { type ElementVisual } from '../../_types';
import { PathwayHighlightProps } from './_types';

const mediumSize = 1000;
const largeSize = 1200;

const createTextContent = (props: PathwayHighlightProps): ElementVisual => {
  const wrapper = ElementBuilder.create.div({
    className: 'pathway-text-container-wrapper',
    children: [createTextLockupMedium(props)],
    elementStyles: {
      element: {
        width: '100%',
        position: 'relative',
      },
    },
  });

  const container = ElementBuilder.create.div({
    className: 'pathway-text-container',
    children: [wrapper],
    elementStyles: {
      element: {
        container: 'inline-size',
        display: 'flex',
        alignItems: 'center',
        zIndex: '99',

        ...(props.isThemeDark && {
          backgroundColor: token.color.black,
          color: token.color.white,
        }),

        ...(props.isThemeMaryland && {
          backgroundColor: token.color.red,
          color: token.color.white,
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
    },
  });

  return container;
};

const createHighlightColumn = ({
  quote,
  attribution,
  isThemeDark,
}: Pick<
  PathwayHighlightProps,
  'quote' | 'attribution' | 'isThemeDark'
>): ElementVisual => {
  const children: ElementVisual[] = [];

  if (quote) {
    children.push(
      ElementBuilder.styled.headline.sansLarger({
        element: quote,
        isThemeDark,
        elementStyles: {
          element: {
            color: token.color.black,
            fontWeight: '700',
          },
        },
      }),
    );
  }

  if (attribution) {
    children.push(
      ElementBuilder.styled.headline.sansMedium({
        element: attribution,
        isThemeDark,
        elementStyles: {
          element: {
            marginTop: token.spacing.sm,
          },
        },
      }),
    );
  }

  const wrapper = ElementBuilder.create.div({
    className: 'pathway-highlight-column-wrapper',
    children,
    elementStyles: {
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
    },
  });

  return ElementBuilder.create.div({
    className: 'pathway-highlight-column-container',
    children: [wrapper],
    elementStyles: {
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

          [`& *`]: {
            color: token.color.white,
          },
        }),
      },
    },
  });
};

const createLock = (props: PathwayHighlightProps) => {
  const textContent = createTextContent(props);
  const highlightColumn = createHighlightColumn(props);
  const children: ElementVisual[] = [textContent, highlightColumn];

  return ElementBuilder.styled.layout.spaceHorizontalLarger({
    element: document.createElement('div'),
    children,
    elementStyles: {
      element: {
        [`@container (min-width: ${mediumSize}px)`]: {
          display: 'flex',
          alignItems: 'center',

          [`& > *`]: {
            width: '50%',
          },
        },
      },
    },
  });
};

export default (props: PathwayHighlightProps) =>
  ElementBuilder.create.div({
    className: 'pathway-highlight-container',
    children: [createLock(props)],
    elementStyles: {
      element: {
        container: 'inline-size',
      },
    },
  });
