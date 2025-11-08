import * as token from '@universityofmaryland/web-styles-library/token';
import * as animation from '@universityofmaryland/web-styles-library/animation';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import * as layout from '@universityofmaryland/web-styles-library/layout';
import * as elementStyles from '@universityofmaryland/web-styles-library/element';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import type { ElementVisual } from '../../../_types';

export interface AlertTextProps {
  headline?: HTMLElement | null;
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
  isThemeDark?: boolean;
}

const createHeadline = (
  props: Pick<AlertTextProps, 'headline' | 'isThemeDark'>,
) => {
  const { headline, isThemeDark } = props;
  if (!headline) return;

  const styleElements = {
    ...typography.sans.fonts.large,
    ...animation.line.slideUnderBlack,
  };

  return new ElementBuilder(headline)
    .styled(styleElements)
    .withThemeDark(isThemeDark)
    .withStyles({
      element: {
        paddingRight: token.spacing.md,
      },
      siblingAfter: { marginTop: token.spacing.sm },
    })
    .build();
};

const createText = (props: Pick<AlertTextProps, 'text' | 'isThemeDark'>) => {
  const { text, isThemeDark } = props;
  if (!text) return;

  return new ElementBuilder(text)
    .styled(
      elementStyles.text.rich.composeSimple({
        theme: isThemeDark ? 'dark' : 'light',
      }),
    )
    .withThemeDark(isThemeDark)
    .withStyles({
      element: {
        fontWeight: 500,
      },
      siblingAfter: { marginTop: token.spacing.sm },
    })
    .build();
};

const createActions = (props: Pick<AlertTextProps, 'actions'>) => {
  const { actions } = props;
  if (!actions) return;

  return new ElementBuilder(actions)
    .styled(layout.grid.inline.tabletRows)
    .withStyles({
      element: {
        [`* + &`]: {
          marginTop: token.spacing.sm,
        },
      },
    })
    .build();
};

export const CreateAlertText = (
  props: Pick<AlertTextProps, 'headline' | 'text' | 'actions' | 'isThemeDark'>,
): ElementVisual => {
  const { headline, text, actions, isThemeDark } = props;

  const headlineModel = createHeadline({ headline, isThemeDark });
  const textModel = createText({ text, isThemeDark });
  const actionsModel = createActions({ actions });

  const childElements = [headlineModel, textModel, actionsModel].filter(
    Boolean,
  ) as ElementVisual[];

  const model = new ElementBuilder()
    .withClassName('wrapper')
    .withChildren(...childElements)
    .withStyles({
      element: {
        maxWidth: token.spacing.maxWidth.small,
        ...(isThemeDark && { color: token.color.white }),
      },
    })
    .build();

  return {
    ...model,
    className: 'wrapper',
  };
};
