import * as token from '@universityofmaryland/web-styles-library/token';
import * as layout from '@universityofmaryland/web-styles-library/layout';
import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { jssToCSS } from '@universityofmaryland/web-utilities-library/styles';

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

  ${jssToCSS({
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

  let styles = STYLES_ALERT_TEXT;
  const builder = new ElementBuilder().withClassName(className.wrapper);

  if (headline) {
    const headlineModel = new ElementBuilder(headline)
      .styled(Styles.typography.sans.large)
      .withStyles(headlineStyles)
      .build();

    builder.withChild(headlineModel.element);
    styles += headlineModel.styles;
  }

  if (text) {
    if (!isThemeDark) {
      richTextStyles.element.color = token.color.gray.dark;
    }

    const textModel = new ElementBuilder(text)
      .styled(Styles.element.text.rich.simple)
      .withStyles(richTextStyles)
      .build();

    builder.withChild(textModel.element);
    styles += textModel.styles;
  }

  if (actions) {
    actions.classList.add(className.actions);
    builder.withChild(actions);
  }

  const wrapper = builder.build();

  return {
    element: wrapper.element,
    styles,
  };
};
