import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import * as Styles from '@universityofmaryland/web-styles-library';
import { theme } from '@universityofmaryland/web-utilities-library/theme';
import { type ElementModel } from '../../../_types';

export interface SectionIntroProps {
  headline?: HTMLElement | null;
  actions?: HTMLElement | null;
  text?: HTMLElement | null;
  hasSeparator?: boolean;
  isThemeDark?: boolean;
  includesAnimation?: boolean;
}

const ANIMATION_CONFIGS = {
  line: `
    @keyframes intro-line {
      from {
        height: 0;
        transform: translateY(${token.spacing.lg});
      }
      to {
        height: ${token.spacing['4xl']};
        transform: translateY(0);
      }
    }
  `,
  fadeIn: `
    @keyframes intro-fade-in {
      from {
        opacity: 0;
        transform: translateY(100px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
};

const createHeadline = (
  props: Pick<SectionIntroProps, 'headline' | 'isThemeDark'>,
): ElementModel<HTMLElement> | null => {
  const { headline, isThemeDark } = props;
  if (!headline) return null;

  return new ElementBuilder(headline)
    .styled(
      Styles.typography.sans.compose('largest', {
        theme: theme.fontColor(isThemeDark),
      }),
    )
    .withStyles({
      element: {
        fontWeight: 800,
        textTransform: 'uppercase',
      },
    })
    .build();
};

const createText = (
  props: Pick<SectionIntroProps, 'text' | 'isThemeDark'>,
): ElementModel<HTMLElement> | null => {
  const { text, isThemeDark } = props;
  if (!text) return null;

  return new ElementBuilder(text)
    .styled(
      Styles.element.text.rich.composeSimple({
        size: 'large',
        theme: theme.fontColor(isThemeDark),
      }),
    )
    .withStyles({
      element: {
        [`* + &`]: {
          marginTop: token.spacing.sm,
        },
      },
    })
    .build();
};

const createActions = (
  props: Pick<SectionIntroProps, 'actions'>,
): ElementModel<HTMLElement> | null => {
  const { actions } = props;
  if (!actions) return null;

  return new ElementBuilder(actions)
    .styled(Styles.layout.grid.inline.tabletRows)
    .withStyles({
      element: {
        justifyContent: 'center',
        alignItems: 'center',

        [`* + &`]: {
          marginTop: token.spacing.md,
        },
      },
    })
    .build();
};

const createTextContainer = (
  props: Pick<
    SectionIntroProps,
    'headline' | 'text' | 'actions' | 'isThemeDark' | 'includesAnimation'
  >,
): ElementModel<HTMLElement> => {
  const { headline, text, actions, includesAnimation, isThemeDark } = props;

  const headlineElement = createHeadline({ headline, isThemeDark });
  const textElement = createText({ text, isThemeDark });
  const actionsElement = createActions({ actions });

  const container = new ElementBuilder()
    .withClassName('intro-default-container-text')
    .withStyles({
      element: {
        ...(includesAnimation && {
          opacity: 0,
        }),

        ['& > *, p']: {
          ...(!headline && {
            ...typography.sans.transformations.largerBold,
            color: token.color.black,

            ...(isThemeDark && {
              color: token.color.white,
            }),
          }),
        },

        ['.intro-default-animated &']: {
          transform: 'translateY(100px)',
          animation: 'intro-fade-in 1s forwards',
          animationDelay: '0.2s',
        },

        [`&:before`]: {
          ...(includesAnimation && {
            height: 0,
            transform: `translateY(${token.spacing.lg})`,
          }),
        },
      },
    });

  if (headlineElement) {
    container.withChild(headlineElement);
  }

  if (textElement) {
    container.withChild(textElement);
  }

  if (actionsElement) {
    container.withChild(actionsElement);
  }

  return container.build();
};

const createWrapper = (
  props: Pick<
    SectionIntroProps,
    'headline' | 'text' | 'actions' | 'isThemeDark'
  >,
): ElementModel<HTMLElement> => {
  const textContainerElement = createTextContainer(props);

  return new ElementBuilder()
    .withClassName('intro-default-container-wrapper')
    .withChild(textContainerElement)
    .withStyles({
      element: {
        textAlign: 'center',
      },
    })
    .build();
};

const createContainer = (
  props: Pick<
    SectionIntroProps,
    | 'isThemeDark'
    | 'hasSeparator'
    | 'headline'
    | 'text'
    | 'actions'
    | 'includesAnimation'
  >,
): ElementModel<HTMLElement> => {
  const { isThemeDark, hasSeparator, includesAnimation } = props;

  const wrapperElement = createWrapper(props);

  return new ElementBuilder()
    .withClassName('intro-default-container')
    .withChild(wrapperElement)
    .withStyles({
      element: {
        maxWidth: token.spacing.maxWidth.small,
        margin: '0 auto',

        ...(hasSeparator && {
          paddingTop: token.spacing['6xl'],
          position: 'relative',
        }),

        [`&:before`]: {
          ...(hasSeparator && {
            content: '""',
            backgroundColor: token.color.red,
            position: 'absolute',
            height: token.spacing['4xl'],
            width: '2px',
            left: 'calc(50% - 1px)',
            top: 0,
          }),
        },

        ['&.intro-default-animated:before']: {
          ...(includesAnimation && {
            animation: 'intro-line 1.2s forwards',
          }),
        },
      },
    })
    .build();
};

const setupAnimation = (
  props: Pick<SectionIntroProps, 'includesAnimation'> & {
    container: HTMLElement;
  },
) => {
  const { includesAnimation, container } = props;
  if (!includesAnimation) return;

  const animation: IntersectionObserverCallback = (entries, observer) => {
    entries.map((entry) => {
      const target = entry.target as HTMLElement;

      if (entry.isIntersecting) {
        target.classList.add('intro-default-animated');
        observer.unobserve(target);
      }
    });
  };

  const observer = new IntersectionObserver(animation, {
    root: null,
    rootMargin: '0px',
    threshold: [0.35],
  });

  observer.observe(container);
};

export default (props: SectionIntroProps) => {
  const containerElement = createContainer(props);

  const loadAnimation = () =>
    setupAnimation({
      includesAnimation: props.includesAnimation,
      container: containerElement.element,
    });

  if (props.includesAnimation) {
    containerElement.styles += ANIMATION_CONFIGS.line;
    containerElement.styles += ANIMATION_CONFIGS.fadeIn;
  }

  return {
    ...containerElement,
    events: { loadAnimation },
  };
};
