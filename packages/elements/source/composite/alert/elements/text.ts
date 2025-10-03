import { token, layout } from '@universityofmaryland/web-styles-library';
import { convertJSSObjectToStyles } from '@universityofmaryland/web-utilities-library/styles';
import { ElementModel } from 'model';

export type TypeAlertTextProps = {
  headline?: HTMLElement | null;
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
  isThemeDark?: boolean;
};

export const CONSTANTS = {
  className: {
    wrapper: 'wrapper',
    text: 'text',
    actions: 'actions',
  },
};

const { className } = CONSTANTS;

// prettier-ignore
const ctaStyles = `
  * + .${className.actions} {
    margin-top: ${token.spacing.sm};
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${className.actions}`]: layout.grid.inline.tabletRows,
    },
  })}
`;

const STYLES_ALERT_TEXT = `
  .${className.wrapper} {
     max-width: ${token.spacing.maxWidth.small};
  }

  ${ctaStyles}
`;

const headlineStyles = {
  element: {
    paddingRight: token.spacing.md,
  },
  siblingAfter: {
    marginTop: token.spacing.sm,
  },
  subElement: {
    color: 'currentColor',
  },
};

const richTextStyles: Record<string, any> = {
  element: {
    fontWeight: 500,
  },
  siblingAfter: {
    marginTop: token.spacing.sm,
  },
};

export const CreateAlertText = (props: TypeAlertTextProps) => {
  const { headline, text, actions, isThemeDark } = props;

  const wrapper = document.createElement('div');
  let styles = STYLES_ALERT_TEXT;

  if (headline) {
    const headlineModel = ElementModel.headline.sansLarge({
      ...props,
      elementStyles: headlineStyles,
      element: headline,
    });

    wrapper.appendChild(headlineModel.element);
    styles += headlineModel.styles;
  }

  if (text) {
    if (!isThemeDark) {
      richTextStyles.element.color = token.color.gray.dark;
    }

    const textModel = ElementModel.richText.simple({
      ...props,
      elementStyles: richTextStyles,
      element: text,
    });

    wrapper.appendChild(textModel.element);
    styles += textModel.styles;
  }

  if (actions) {
    actions.classList.add(className.actions);
    wrapper.appendChild(actions);
  }

  wrapper.classList.add(className.wrapper);

  return {
    element: wrapper,
    styles,
  };
};

