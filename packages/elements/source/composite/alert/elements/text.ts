import * as token from '@universityofmaryland/web-styles-library/token';
import ElementBuilder from '@universityofmaryland/web-builder-library';
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

  return ElementBuilder.styled.headline.sansLarge({
    element: headline,
    isThemeDark: isThemeDark,
    elementStyles: {
      element: {
        paddingRight: token.spacing.md,
      },
      siblingAfter: { marginTop: token.spacing.sm },
    },
  });
};

const createText = (props: Pick<AlertTextProps, 'text' | 'isThemeDark'>) => {
  const { text, isThemeDark } = props;
  if (!text) return;

  return ElementBuilder.styled.richText.simple({
    element: text,
    isThemeDark: isThemeDark,
    elementStyles: {
      element: {
        ...(isThemeDark && { color: token.color.white }),
        fontWeight: 500,
      },
      siblingAfter: { marginTop: token.spacing.sm },
    },
  });
};

const createActions = (props: Pick<AlertTextProps, 'actions'>) => {
  const { actions } = props;
  if (!actions) return;

  return ElementBuilder.styled.layout.gridInlineTabletRows({
    element: actions,
    elementStyles: {
      element: {
        [`* + &`]: {
          marginTop: token.spacing.sm,
        },
      },
    },
  });
};

export const CreateAlertText = (
  props: Pick<AlertTextProps, 'headline' | 'text' | 'actions' | 'isThemeDark'>,
): ElementVisual => {
  const { headline, text, actions, isThemeDark } = props;

  const headlineModel = createHeadline({ headline });
  const textModel = createText({ text, isThemeDark });
  const actionsModel = createActions({ actions });

  const childElements = [headlineModel, textModel, actionsModel].filter(
    Boolean,
  ) as ElementVisual[];

  const wrapperModel = ElementBuilder.create.div({
    className: 'wrapper',
    children: childElements,
    elementStyles: {
      element: {
        maxWidth: token.spacing.maxWidth.small,
        ...(isThemeDark && { color: token.color.white }),
      },
    },
  });

  return wrapperModel as ElementVisual;
};
