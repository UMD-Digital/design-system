import * as token from '@universityofmaryland/web-styles-library/token';
import { ElementModel } from 'model';
import type { ElementVisual } from '../../../_types';

export type TypeAlertText = {
  headline?: HTMLElement | null;
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
  isThemeDark?: boolean;
};

const STYLES_ALERT_TEXT = `
  .wrapper {
     max-width: ${token.spacing.maxWidth.small};
  }
`;

const createHeadline = (props: Pick<TypeAlertText, 'headline'>) => {
  const { headline } = props;
  if (!headline) return;

  return ElementModel.headline.sansLarge({
    element: headline,
    elementStyles: {
      element: { paddingRight: token.spacing.md },
      siblingAfter: { marginTop: token.spacing.sm },
      subElement: { color: 'currentColor' },
    },
  });
};

const createText = (props: Pick<TypeAlertText, 'text' | 'isThemeDark'>) => {
  const { text, isThemeDark } = props;
  if (!text) return;

  return ElementModel.richText.simple({
    element: text,
    elementStyles: {
      element: {
        ...(!isThemeDark && { color: token.color.gray.dark }),
        fontWeight: 500,
      },
      siblingAfter: { marginTop: token.spacing.sm },
    },
    isThemeDark: isThemeDark || false,
  });
};

const createActions = (props: Pick<TypeAlertText, 'actions'>) => {
  const { actions } = props;
  if (!actions) return;

  return ElementModel.layout.gridInlineTabletRows({
    element: actions,
    elementStyles: {
      element: {
        [`* + &`]: {
          marginTop: `${token.spacing.sm}`,
        },
      },
    },
  });
};

export const CreateAlertText = (
  props: Pick<TypeAlertText, 'headline' | 'text' | 'actions' | 'isThemeDark'>,
): ElementVisual => {
  const { headline, text, actions, isThemeDark } = props;

  const headlineModel = createHeadline({ headline });
  const textModel = createText({ text, isThemeDark });
  const actionsModel = createActions({ actions });

  const childElements = [headlineModel, textModel, actionsModel].filter(
    Boolean,
  ) as ElementVisual[];

  const wrapperModel = ElementModel.createDiv({
    className: 'wrapper',
    children: childElements,
    elementStyles: {
      element: {
        maxWidth: token.spacing.maxWidth.small,
        ...(isThemeDark && { color: token.color.white }),
      },
    },
  });

  let styles = STYLES_ALERT_TEXT;
  if (headlineModel) styles += headlineModel.styles;
  if (textModel) styles += textModel.styles;
  if (actionsModel) styles += actionsModel.styles;
  styles += wrapperModel.styles;

  return {
    className: wrapperModel.className,
    element: wrapperModel.element,
    styles,
  };
};
