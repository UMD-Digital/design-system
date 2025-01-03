import { tokens, layout } from '@universityofmaryland/web-elements-styles';
import * as Utility from 'utilities';
import { ElementModel } from 'model';

export type TypeAlertTextProps = {
  headline?: HTMLElement | null;
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
  isThemeDark?: boolean;
};

const { colors, spacing } = tokens;
const { convertJSSObjectToStyles } = Utility.styles;

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
    margin-top: ${spacing.sm};
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${className.actions}`]: layout.grid.inline.tabletRows,
    },
  })}
`;

const STYLES_ALERT_TEXT = `
  .${className.wrapper} {
     max-width: ${spacing.maxWidth.small};
  }

  ${ctaStyles}
`;

const headlineStyles = {
  element: {
    color: colors.black,
    paddingRigh: spacing.md,
  },
  siblingAfter: {
    marginTop: spacing.sm,
  },
  subElement: {
    color: 'currentColor',
  },
};

const richTextStyles = {
  element: {
    color: colors.gray.dark,
    fontWeight: 500,
  },
  siblingAfter: {
    marginTop: spacing.sm,
  },
};

export const CreateAlertText = (props: TypeAlertTextProps) => {
  const { headline, text, actions } = props;

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

export default CreateAlertText;
