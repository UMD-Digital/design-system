import * as Styles from '@universityofmaryland/web-styles-library';
import * as Atomic from 'atomic';
import { ElementModel } from 'model';
import { type ElementVisual } from '_types';

interface PathwayHighlightProps {
  actions?: HTMLElement | null;
  attribution?: HTMLElement | null;
  eyebrow?: HTMLElement | null;
  headline?: HTMLElement | null;
  isThemeDark?: boolean;
  isThemeMaryland?: boolean;
  quote?: HTMLElement | null;
  text?: HTMLElement | null;
}

const mediumSize = 1000;
const largeSize = 1200;

const createHeadline = ({
  headline,
  isThemeDark,
}: Pick<PathwayHighlightProps, 'headline' | 'isThemeDark'>) => {
  const characterCount = headline?.textContent?.trim().length || 0;
  const isOverwriteHeadline = characterCount > 30;

  if (!headline) return null;

  const desktopStyles = {
    [`@container (${Styles.token.media.queries.desktop.min})`]: {
      ...(isOverwriteHeadline && {
        fontSize: '40px',
      }),
    },
  };

  return ElementModel.headline.sansLargest({
    element: headline,
    isThemeDark,
    elementStyles: {
      element: {
        fontWeight: 800,
        textTransform: 'uppercase',
        textWrap: 'balance',
        ...desktopStyles,
      },
      siblingAfter: {
        marginTop: Styles.token.spacing.md,
      },
    },
  });
};

const createTextContent = (props: PathwayHighlightProps): ElementVisual => {
  const children: ElementVisual[] = [];

  children.push(
    Atomic.textLockup.medium({
      actions: props.actions,
      compositeHeadline: createHeadline(props),
      isThemeDark: props.isThemeDark,
      ribbon: props.eyebrow,
      text: props.text,
    }),
  );

  const wrapper = ElementModel.createDiv({
    className: 'pathway-text-container-wrapper',
    children,
    elementStyles: {
      element: {
        width: '100%',
        position: 'relative',
      },
    },
  });

  const container = ElementModel.createDiv({
    className: 'pathway-text-container',
    children: [wrapper],
    elementStyles: {
      element: {
        container: 'inline-size',
        display: 'flex',
        alignItems: 'center',
        zIndex: '99',

        ...(props.isThemeDark && {
          backgroundColor: Styles.token.color.black,
          color: Styles.token.color.white,
        }),

        ...(props.isThemeMaryland && {
          backgroundColor: Styles.token.color.red,
          color: Styles.token.color.white,
        }),

        [`@container (max-width: ${mediumSize - 1}px)`]: {
          paddingBottom: Styles.token.spacing.md,
        },

        [`@container (min-width: ${mediumSize}px)`]: {
          paddingRight: Styles.token.spacing['4xl'],
        },

        [`@container (min-width: ${largeSize}px)`]: {
          paddingRight: Styles.token.spacing['6xl'],
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
      ElementModel.headline.sansLarger({
        element: quote,
        isThemeDark,
        elementStyles: {
          element: {
            fontWeight: '700',
          },
        },
      }),
    );
  }

  if (attribution) {
    children.push(
      ElementModel.headline.sansMedium({
        element: attribution,
        isThemeDark,
        elementStyles: {
          element: {
            marginTop: Styles.token.spacing.sm,
          },
        },
      }),
    );
  }

  const wrapper = ElementModel.createDiv({
    className: 'pathway-highlight-column-wrapper',
    children,
    elementStyles: {
      element: {
        [`@container (min-width: ${mediumSize}px)`]: {
          paddingLeft: Styles.token.spacing['xl'],
          position: 'relative',
        },

        '&:before': {
          content: "''",
          position: 'absolute',
          backgroundColor: Styles.token.color.red,

          [`@container (max-width: ${mediumSize - 1}px)`]: {
            top: Styles.token.spacing['2xl'],
            width: Styles.token.spacing['5xl'],
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

  return ElementModel.createDiv({
    className: 'pathway-highlight-column-container',
    children: [wrapper],
    elementStyles: {
      element: {
        backgroundColor: Styles.token.color.gray.lightest,
        position: 'relative',
        padding: `${Styles.token.spacing['5xl']} ${Styles.token.spacing.md} ${Styles.token.spacing.md} ${Styles.token.spacing.md}`,

        [`@container (min-width: ${mediumSize}px)`]: {
          padding: `${Styles.token.spacing['4xl']} ${Styles.token.spacing['2xl']}`,
        },

        [`@container (min-width: ${largeSize}px)`]: {
          padding: `${Styles.token.spacing['8xl']} ${Styles.token.spacing['xl']}`,
        },

        ...(isThemeDark && {
          backgroundColor: Styles.token.color.gray.darker,

          [`& *`]: {
            color: Styles.token.color.white,
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

  return ElementModel.layout.spaceHorizontalLarger({
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
  ElementModel.createDiv({
    className: 'pathway-highlight-container',
    children: [createLock(props)],
    elementStyles: {
      element: {
        container: 'inline-size',
      },
    },
  });
