import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import * as Styles from '@universityofmaryland/web-styles-library';
import { theme } from '@universityofmaryland/web-utilities-library/theme';
import { type ElementModel } from '../../../_types';
import { SimpleRichTextOptions } from '../../../../../styles/dist/element/text/rich';

export interface SectionIntroProps {
  headline?: HTMLElement | null;
  actions?: HTMLElement | null;
  text?: HTMLElement | null;
  hasSeparator?: boolean;
  isThemeDark?: boolean;
}

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
  props: Pick<SectionIntroProps, 'text' | 'isThemeDark' | 'headline'>,
): ElementModel<HTMLElement> | null => {
  const { text, headline, isThemeDark } = props;
  const simpleRichTextOptions: SimpleRichTextOptions = {
    size: 'large',
    theme: theme.fontColor(isThemeDark),
  };
  if (!text) return null;
  if (!headline) simpleRichTextOptions.size = 'largest';

  return new ElementBuilder(text)
    .styled(Styles.element.text.rich.composeSimple(simpleRichTextOptions))
    .withStyles({
      element: {
        [`* + &`]: {
          marginTop: token.spacing.sm,
        },

        [`&, & > *`]: {
          ...(!headline && {
            ...typography.sans.transformations.largerBold,
            color: token.color.black,

            ...(isThemeDark && {
              color: token.color.white,
            }),
          }),
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
    'headline' | 'text' | 'actions' | 'isThemeDark'
  >,
): ElementModel<HTMLElement> => {
  const { headline, text, actions, isThemeDark } = props;

  const headlineElement = createHeadline({ headline, isThemeDark });
  const textElement = createText({ text, headline, isThemeDark });
  const actionsElement = createActions({ actions });

  const container = new ElementBuilder().withClassName(
    'intro-default-container-text',
  );

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
    'isThemeDark' | 'hasSeparator' | 'headline' | 'text' | 'actions'
  >,
): ElementModel<HTMLElement> => {
  const { hasSeparator } = props;

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
      },
    })
    .build();
};

export const createCompositeLayoutSectionIntroSmall = (
  props: SectionIntroProps,
) => createContainer(props);
