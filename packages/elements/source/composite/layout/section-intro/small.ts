import { token, typography } from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';
import { type ElementVisual } from '../../../_types';

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

const createHeadline = (props: Pick<SectionIntroProps, 'headline'>) => {
  const { headline } = props;
  if (!headline) return;

  return ElementModel.headline.sansLargest({
    element: headline,
    elementStyles: {
      element: {
        fontWeight: 800,
        textTransform: 'uppercase',
      },
    },
  });
};

const createText = (props: Pick<SectionIntroProps, 'text'>) => {
  const { text } = props;
  if (!text) return;

  return ElementModel.richText.simpleLarge({
    element: text,
    elementStyles: {
      element: {
        [`* + &`]: {
          marginTop: token.spacing.sm,
        },
      },
    },
  });
};

const createActions = (props: Pick<SectionIntroProps, 'actions'>) => {
  const { actions } = props;
  if (!actions) return;

  return ElementModel.layout.gridInlineTabletRows({
    element: actions,
    elementStyles: {
      element: {
        justifyContent: 'center',
        alignItems: 'center',

        [`* + &`]: {
          marginTop: token.spacing.md,
        },
      },
    },
  });
};

const createTextContainer = (
  props: Pick<
    SectionIntroProps,
    'headline' | 'text' | 'actions' | 'isThemeDark' | 'includesAnimation'
  >,
) => {
  const { headline, text, actions, includesAnimation, isThemeDark } = props;

  const headlineElement = createHeadline({ headline });
  const textElement = createText({ text });
  const actionsElement = createActions({ actions });

  const children = [headlineElement, textElement, actionsElement].filter(
    Boolean,
  ) as ElementVisual[];

  return ElementModel.createDiv({
    className: 'intro-default-container-text',
    children,
    elementStyles: {
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
    },
  });
};

const createWrapper = (
  props: Pick<
    SectionIntroProps,
    'headline' | 'text' | 'actions' | 'isThemeDark'
  >,
) => {
  const textContainerElement = createTextContainer(props);

  return ElementModel.createDiv({
    className: 'intro-default-container-wrapper',
    children: [textContainerElement],
    elementStyles: {
      element: {
        textAlign: 'center',
      },
    },
  });
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
) => {
  const { isThemeDark, hasSeparator, includesAnimation } = props;

  const wrapperElement = createWrapper(props);

  return ElementModel.createDiv({
    className: 'intro-default-container',
    children: [wrapperElement],
    elementStyles: {
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

        [`& *`]: {
          ...(isThemeDark && {
            color: token.color.white,
          }),
        },
      },
    },
  });
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
